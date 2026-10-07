// Version 2 walkthrough: Atlas, scene sheets, spoken films, follow-up drill, scripts, dossier, lessons, practice runs.
// Usage: node tests/v2.mjs [width=1280] [scheme=light] [reduced=0]
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { open } from './smoke.mjs';

const [width = '1280', scheme = 'light', reduced = '0'] = process.argv.slice(2);
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '../qa/shots', `v2-${width}-${scheme}${reduced === '1' ? '-rm' : ''}`);
mkdirSync(out, { recursive: true });
const { browser, page, errors } = await open({ width: Number(width), height: 900, scheme, reduced: reduced === '1' });
const shot = async (name, full = true) => { await page.waitForTimeout(300); await page.screenshot({ path: path.join(out, name + '.png'), fullPage: full }); };
const go = async hash => { await page.evaluate(h => { location.hash = h; }, hash); await page.waitForTimeout(450); };
const fails = [];
const expect = (ok, msg) => { if (!ok) fails.push(msg); };
const overflow = async () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

// Atlas
await go('atlas');
expect(await page.locator('h1', { hasText: 'Practice Atlas' }).count() === 1, 'atlas heading');
const rows = await page.locator('.scn-row').count();
expect(rows === 139, `atlas shows all 139 scenes (got ${rows})`);
expect(await overflow() <= 0, 'atlas has no sideways scroll');
await shot('01-atlas');
await page.fill('#atlas-q', 'coffee');
await page.waitForTimeout(400);
const filtered = await page.locator('.scn-row').count();
expect(filtered > 0 && filtered < 139, `search narrows (got ${filtered})`);
await page.fill('#atlas-q', '');
await page.selectOption('#f-risk', 'H3');
await page.waitForTimeout(300);
const byRisk = await page.locator('.scn-row').count();
expect(byRisk > 0 && byRisk < 139, `risk filter narrows (got ${byRisk})`);
await page.selectOption('#f-risk', '');
await page.waitForTimeout(200);
// Queue two scenes, one far ahead of the story
await page.locator('.scn-row input').nth(0).check();
await page.locator('.scn-row input').nth(120).check();
expect(await page.locator('.tray-in').isVisible(), 'run tray appears');
await shot('02-atlas-run', false);

// Scene sheets of several modes
for (const id of ['d1_first', 'd3_coffee', 'd1_cut', 'd3_runsheet', 'd5_questions', 'd1_compress', 'd3_about']) {
  await go('sheet-' + id);
  expect(await page.locator('.sheet h1').count() === 1, `sheet ${id} renders`);
  expect(await page.locator('.drill-item').count() >= 2, `sheet ${id} has follow-ups`);
  expect(await page.locator('.foryou').count() === 1, `sheet ${id} has the for-you panel`);
  expect(await overflow() <= 0, `sheet ${id} has no sideways scroll`);
  if (id === 'd3_coffee' || id === 'd1_first') await shot('03-sheet-' + id);
}
// Follow-up reveal
await go('sheet-d1_first');
const rev = page.getByRole('button', { name: 'Reveal the sample answer' }).first();
await rev.click();
expect(await page.locator('.sample').first().isVisible(), 'sample answer reveals');
expect(/\d+ words/.test(await page.locator('.sample').first().innerText()), 'sample shows word count');

// Spoken film (only when a recording exists for this line and motion is allowed)
const watch = page.getByRole('button', { name: 'Watch it spoken' });
const nWatch = await watch.count();
let visibleWatch = null;
for (let i = 0; i < nWatch; i++) if (await watch.nth(i).isVisible()) { visibleWatch = watch.nth(i); break; }
if (reduced === '1') expect(!visibleWatch, 'reduced motion hides films');
else if (visibleWatch) {
  await visibleWatch.click();
  await page.waitForTimeout(1500);
  expect(await page.locator('.cine.spoken').count() === 1, 'spoken film mounts');
  await page.locator('.cine.spoken').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.locator('.cine.spoken').screenshot({ path: path.join(out, '04-spoken.png') });
} else console.log('note: no recorded clip visible on d1_first yet');

// Script library, dossier, lessons, drill
await go('scripts');
expect(await page.locator('.script').count() >= 30, 'script library lists scripts');
expect(await overflow() <= 0, 'scripts no sideways scroll');
await shot('05-scripts');
await go('dossier');
expect(await page.locator('.risk-row').count() === 10, 'dossier lists 10 risks');
expect(await overflow() <= 0, 'dossier no sideways scroll');
await shot('06-dossier');
await go('dossier-h3');
await page.waitForTimeout(300);
expect(await page.locator('#risk-h3.focus').count() === 1, 'dossier focuses a risk');
await go('lessons');
expect(await page.locator('.lesson-list li').count() === 21, 'lessons list');
await go('lessons-l1');
expect(await page.locator('.spoken').count() > 0, 'lesson has listen controls');
await shot('07-lesson');
await go('drill');
expect(await page.locator('.drill-item').count() === 1, 'drill shows one question');
await page.getByRole('button', { name: 'Next question' }).click();
await page.waitForTimeout(200);
expect(/Question 2 of/.test(await page.locator('main').innerText()), 'drill advances');
await shot('08-drill', false);
await go('settings');
expect(await page.locator('#vol_voice').count() === 1, 'voice volume slider');
await shot('09-settings');

// Practice a scene far ahead of the story: nothing is saved
const before = await page.evaluate(() => localStorage.getItem('tlg.save.v1'));
const futureId = 'd18_peer';
await go('practice-' + futureId);
await page.waitForTimeout(800);
expect(await page.locator('.stage').count() >= 1, 'practice run opens the stage');
await shot('10-practice', false);
const after = await page.evaluate(() => localStorage.getItem('tlg.save.v1'));
const strip = s => { try { const j = JSON.parse(s); delete j.updatedAt; delete j.rev; return JSON.stringify(j.scn) + JSON.stringify(j.evidence); } catch { return s; } };
expect(strip(before) === strip(after), 'practice run leaves the save alone');

console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'all v2 checks passed');
console.log(errors.length ? 'ERRORS\n' + errors.join('\n') : 'no page errors');
await browser.close();
process.exit(fails.length || errors.length ? 1 : 0);
