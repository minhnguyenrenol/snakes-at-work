// Rắn công sở walkthrough: fail a scene, watch the strike, cross into snake form, redeem, shed, visit the den.
// Usage: node tests/snakes.mjs [width=1280] [scheme=dark] [reduced=0]
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { open } from './smoke.mjs';

const [width = '1280', scheme = 'dark', reduced = '0'] = process.argv.slice(2);
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '../qa/shots', `snakes-${width}-${scheme}${reduced === '1' ? '-rm' : ''}`);
mkdirSync(out, { recursive: true });
const { browser, page, errors } = await open({ width: Number(width), height: 820, scheme, reduced: reduced === '1' });
const fails = [];
const expect = (ok, msg) => { if (!ok) fails.push(msg); };
const shot = async (name, full = false) => page.screenshot({ path: path.join(out, name + '.png'), fullPage: full });
const go = async hash => { await page.evaluate(h => { location.hash = h; }, hash); await page.waitForTimeout(450); };

// Seed: day 1 done, three scenes failed (venom 3), play ahead on.
await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('tlg.save.v1') || 'null') || { player: { name: 'Minh' }, settings: {} };
  s.settings = s.settings || {};
  const now = Date.now();
  const att = g => ({ att: [{ g, pct: g === 'C' ? 50 : 20, ts: now, h: 0, p: true, sc: null, o: null, d: 1 }], best: { g, pct: 50, sc: null, d: 1 }, fx: {}, tags: [], firstTags: [], bestTags: [] });
  s.days = { 1: { done: true, date: 0, step: 0, startedAt: now, doneAt: now } };
  s.scn = { d1_heads: att('D'), d1_cut: att('C'), d1_compress: att('C') };
  s.settings.playAhead = true; s.rev = 5; s.updatedAt = now;
  localStorage.setItem('tlg.save.v1', JSON.stringify(s));
});
await page.reload(); await page.waitForTimeout(700);
await go('today');
expect(/Venom 3\/4/.test(await page.locator('.venom-chip').getAttribute('aria-label')), 'venom chip shows 3 of 4');
expect(await page.locator('.snake-banner').count() === 1, 'today shows the snake banner');
await shot('01-today', true);
await go('den');
expect(await page.locator('.den-snake').count() >= 1, 'den lists snakes');
await shot('02-den', true);
await go('npc-ethan');
expect(await page.locator('.snake-art').count() >= 1, 'Ethan shows as a snake on People');

// Fail d1_first: pick its lowest-graded option, then go to the debrief: a strike, then becoming a snake.
await go('scn-d1_first');
await page.locator('.opts .opt').first().waitFor({ timeout: 15000 });
const worst = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('.opts .opt')];
  return btns.length;
});
expect(worst > 0, 'options rendered');
// the last option text that grades lowest: find by content order in data
const idx = await page.evaluate(async () => 0);
await page.locator('.opts .opt', { hasText: 'right now' }).click(); // grades C
await page.waitForTimeout(2500);
await page.getByRole('button', { name: 'See the debrief' }).click();
await page.waitForTimeout(reduced === '1' ? 600 : 1300);
expect(await page.locator('.snake-overlay').count() === 1, 'strike film opens');
await shot('03-strike-a');
if (reduced !== '1') { await page.waitForTimeout(900); await shot('04-strike-b'); await page.waitForTimeout(1300); await shot('05-strike-c'); }
await page.getByRole('button', { name: 'Continue' }).first().click();
await page.waitForTimeout(reduced === '1' ? 600 : 2600);
expect(await page.locator('.snake-overlay').count() === 1, 'becoming film opens at 4 venom');
await shot('06-become');
if (reduced !== '1') { await page.waitForTimeout(2200); await shot('07-become-b'); }
await page.getByRole('button', { name: 'Continue' }).first().click();
await page.waitForTimeout(500);
expect(await page.locator('.verdict').count() === 1, 'debrief follows the films');
const form = await page.evaluate(() => JSON.parse(localStorage.getItem('tlg.save.v1')).snakeForm);
expect(form === 'snake', 'save records snake form');
expect(await page.evaluate(() => document.body.classList.contains('snake-mode')), 'snake mode skin on');
await go('today');
await shot('08-today-snake', true);

// Redeem three scenes by rewriting their last attempts, then replay d1_first well: charm + shed.
await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('tlg.save.v1'));
  for (const id of ['d1_cut', 'd1_compress']) s.scn[id].att.push({ g: 'A', pct: 90, ts: Date.now(), h: 0, p: true, sc: null, o: null, d: 1 });
  localStorage.setItem('tlg.save.v1', JSON.stringify(s));
});
await page.reload(); await page.waitForTimeout(700);
await go('scn-d1_first');
await page.waitForTimeout(2500);
await page.locator('.opts .opt', { hasText: 'two-line heads-up' }).click(); // grades S
await page.waitForTimeout(2500);
await page.getByRole('button', { name: 'See the debrief' }).click();
await page.waitForTimeout(1200);
const overlays = [];
for (let k = 0; k < 3; k++) {
  if (!(await page.locator('.snake-overlay').count())) break;
  overlays.push(await page.locator('.snake-overlay').getAttribute('aria-label'));
  await page.waitForTimeout(reduced === '1' ? 200 : 1800);
  await shot('09-redeem-' + k);
  await page.getByRole('button', { name: 'Continue' }).first().click();
  await page.waitForTimeout(800);
}
console.log('redeem overlays:', overlays.join(' | '));
const form2 = await page.evaluate(() => JSON.parse(localStorage.getItem('tlg.save.v1')).snakeForm);
expect(form2 === 'human', `shed back to human (got ${form2}, overlays ${overlays.length})`);

console.log(fails.length ? 'FAIL\n' + fails.join('\n') : 'all snake checks passed');
console.log(errors.length ? 'ERRORS\n' + errors.join('\n') : 'no page errors');
await browser.close();
process.exit(fails.length || errors.length ? 1 : 0);
