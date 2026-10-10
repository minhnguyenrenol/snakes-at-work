// Study library and script prompter walkthrough. Usage: node tests/study.mjs [width=1280] [scheme=dark] [reduced=0]
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { open } from './smoke.mjs';

const [width = '1280', scheme = 'dark', reduced = '0'] = process.argv.slice(2);
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '../qa/shots', `study-${width}-${scheme}${reduced === '1' ? '-rm' : ''}`);
mkdirSync(out, { recursive: true });
const { browser, page, errors } = await open({ width: Number(width), height: 820, scheme, reduced: reduced === '1' });
const fails = [];
const expect = (ok, msg) => { if (!ok) fails.push(msg); };
const shot = async (name, full = false) => page.screenshot({ path: path.join(out, name + '.png'), fullPage: full });
const go = async hash => { await page.evaluate(h => { location.hash = h; }, hash); await page.waitForTimeout(500); };

await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('tlg.save.v1') || 'null') || { player: { name: 'Minh' }, settings: {} };
  s.settings = s.settings || {}; s.settings.playAhead = true; s.rev = 5; s.updatedAt = Date.now();
  localStorage.setItem('tlg.save.v1', JSON.stringify(s));
});
await page.reload(); await page.waitForTimeout(700);

// study library
await go('study');
const total = await page.locator('details.study-scn').count();
expect(total >= 139, `study lists every challenge (got ${total})`);
expect(await page.locator('.study-day').count() >= 20, 'study groups by day');
await shot('01-study', true);
await page.locator('details.study-scn').first().locator('summary').click();
await page.waitForTimeout(300);
expect(await page.locator('details.study-scn[open] .study-body').count() === 1, 'opening a challenge builds its body');
expect(await page.locator('details.study-scn[open] .study-fu li').count() >= 1, 'body lists follow-ups with sample answers');
expect(await page.locator('details.study-scn[open] .say').count() >= 2, 'body shows the answer scripts');
await shot('02-study-open');
await page.fill('#study-q', 'gossip');
await page.waitForTimeout(500);
const hits = await page.locator('details.study-scn').count();
expect(hits >= 1 && hits < total, `search narrows the list (got ${hits})`);
expect(await page.locator('details.study-scn[open]').count() >= 1, 'few matches open themselves');
await shot('03-study-search');
await page.fill('#study-q', '');
await page.waitForTimeout(400);
await page.selectOption('#s-mode', 'trap');
await page.waitForTimeout(300);
expect(await page.locator('details.study-scn').count() === 14, 'snake trap filter shows 14');
const dl = page.waitForEvent('download', { timeout: 8000 }).catch(() => null);
await page.getByRole('button', { name: /Save everything/ }).click();
const file = await dl;
expect(!!file && /study-guide\.md$/.test(file.suggestedFilename()), 'save-as-file downloads a .md');

// prompter in a scene
await go('scn-d1_first');
await page.locator('.opts .opt').first().waitFor({ timeout: 15000 });
expect(await page.locator('.prompter-panel:not([hidden])').count() === 0, 'prompter starts off');
await page.getByRole('button', { name: /Script prompter: off/ }).click();
await page.waitForTimeout(300);
expect(await page.locator('.prompter-panel:not([hidden]) .say').count() >= 1, 'prompter shows the script for the question');
await shot('04-prompter');
const onSaved = await page.evaluate(() => JSON.parse(localStorage.getItem('tlg.save.v1')).settings.prompter);
expect(onSaved === true, 'prompter setting persists');
await page.locator('.opts .opt', { hasText: 'two-line heads-up' }).click();
await page.waitForTimeout(2500);
await page.getByRole('button', { name: 'See the debrief' }).click();
await page.waitForTimeout(1500);
const hint = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('tlg.save.v1')); const a = s.scn.d1_first?.att?.slice(-1)[0]; return a ? a.h : null; });
expect(hint >= 1, `a prompted attempt is recorded as aided (h=${hint})`);

// follow-up drill reveals the sample while the prompter is on
await go('drill');
expect(await page.locator('.drill .sample:not([hidden])').count() >= 1, 'drill shows the sample answer when the prompter is on');
await page.getByRole('button', { name: /Script prompter: on/ }).click();
await page.waitForTimeout(300);
expect(await page.locator('.drill .sample:not([hidden])').count() === 0, 'switching the prompter off hides the sample again');
await go('settings');
expect(await page.getByText('Script prompter', { exact: true }).count() >= 1, 'settings has the prompter switch');
await go('more');
expect(await page.getByText('Study library').count() >= 1, 'More links to the study library');

console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'all study checks passed');
console.log(errors.length ? 'ERRORS\n' + errors.join('\n') : 'no page errors');
await browser.close();
process.exit(fails.length || errors.length ? 1 : 0);
