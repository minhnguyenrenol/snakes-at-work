// End-to-end autoplayer: plays days through the real UI, screenshots each kind of screen,
// and fails on any page error. Usage: node tests/e2e.mjs [days=3] [width=1280] [scheme=light] [mock=none|claude]
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { open } from './smoke.mjs';

const [days = '3', width = '1280', scheme = 'light', mockKind = 'none'] = process.argv.slice(2);
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '../qa/shots', `${width}-${scheme}-${mockKind}`);
mkdirSync(out, { recursive: true });

// A mocked viewer: db (in-memory), user, sample (returns a fixed rubric grade), downloads.
const CLAUDE_MOCK = `
(() => {
  const store = new Map();
  const doc = p => ({
    async get() { return { exists: store.has(p), data: () => store.get(p) }; },
    async set(d) { if (JSON.stringify(d).length > 256 * 1024) throw { code: 'invalid_argument' }; store.set(p, JSON.parse(JSON.stringify(d))); window.__dbWrites = (window.__dbWrites || 0) + 1; },
  });
  const sample = async (input, opts) => { opts?.onText?.({ text: 'Lead with the outcome he cares about.', delta: '' }); return { text: 'Lead with the outcome he cares about, then one small ask.', truncated: false }; };
  sample.json = async (input) => {
    window.__prompts = (window.__prompts || []).concat([String(input).slice(0, 4000)]);
    return { scores: { answer_first: 4, brevity: 3, other: 3, honesty: 4, next_step: 3, loyalty: 4, culture: 3 }, strength: 'You put the point first.', fix: 'Cut the second sentence.', model_line: 'Quick heads-up: he suggested a coffee.', promises: [] };
  };
  const caps = { db: { doc }, user: { id: async () => 'u_test', isOwner: () => true }, sample, downloads: { save: async () => 'saved' } };
  window.claude = { use: async n => caps[n] || null };
})();`;

const { browser, page, errors } = await open({ width: Number(width), height: 900, scheme, mock: mockKind === 'claude' ? CLAUDE_MOCK : null });
const shot = async name => { await page.waitForTimeout(250); await page.screenshot({ path: path.join(out, name + '.png'), fullPage: true }); };
const seen = new Set();
const once = async (key, name) => { if (seen.has(key)) return; seen.add(key); await shot(name); };
const vis = async sel => (await page.locator(sel).count()) > 0 && await page.locator(sel).first().isVisible();
const clickText = async (re) => { const b = page.getByRole('button', { name: re }).first(); if (await b.count() && await b.isVisible() && await b.isEnabled()) { await b.click(); return true; } return false; };

await shot('00-home');
await page.getByRole('button', { name: /^Begin Day 1$/ }).click();
let steps = 0, idle = 0, lastSig = '';
const target = Number(days);
const log = [], trace = [];
while (steps++ < 900) {
  await page.waitForTimeout(120);
  const sig = await page.evaluate(() => location.hash + (document.querySelector('main')?.innerText.length || 0));
  if (sig !== lastSig) { idle = 0; lastSig = sig; trace.push(sig + ' | ' + (await page.locator('main h1, main h2').first().innerText().catch(() => '')).slice(0, 60)); }
  const hash = await page.evaluate(() => location.hash);
  if (hash === '#today' || hash === '') {
    const done = await page.evaluate(() => JSON.parse(localStorage.getItem('tlg.save.v1') || '{}').days);
    const n = Object.values(done || {}).filter(d => d.done).length;
    if (n >= target) break;
    // enable play-ahead so the next day opens today
    await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('tlg.save.v1')); s.settings.playAhead = true; localStorage.setItem('tlg.save.v1', JSON.stringify(s)); });
    await page.reload(); await page.waitForTimeout(400);
    if (!(await clickText(/^(Begin Day \d+|Continue)$/))) { log.push('stuck at home'); break; }
    continue;
  }
  if (await vis('.lift')) { await once('lift', 'promotion'); await clickText(/^(Step out|Back to the tower)$/); continue; }
  if (await clickText(/^Start the day$/)) { await once('brief', 'brief'); continue; }
  // Dojo
  if (await vis('.dojo textarea:not([readonly])')) { await page.fill('.dojo textarea', 'context useful proposal first manager'); await once('dojo', 'dojo'); await clickText(/^Reveal$/); continue; }
  if (await vis('.dojo') && await clickText(/^Good/)) continue;
  if (await clickText(/^On to the lesson$/)) continue;
  // Lesson
  if (await vis('.lesson')) {
    await once('lesson', 'lesson');
    const opt = page.locator('.lesson .opt:not([disabled])').first();
    if (await opt.count()) { await opt.click(); continue; }
    if (await clickText(/^Send A$/)) continue;
    if (await clickText(/^(Next|To the floor)$/)) continue;
  }
  // Gate
  if (await vis('.gate .req')) { await once('gate-' + hash, 'gate'); if (await clickText(/^Enter the review$/)) continue; if (await clickText(/^Carry on with the day$/)) continue; }
  // Debrief
  if (await vis('.debrief')) { await once('debrief', 'debrief'); if (await clickText(/^Continue$/)) continue; }
  // Scenes
  if (await clickText(/^(See the debrief|Continue|Finish)$/)) continue;
  const sendable = page.locator('.composer textarea:not([readonly])').first();
  if (await sendable.count() && await sendable.isVisible()) {
    const mode = await page.evaluate(() => document.querySelector('.ring') ? 'speak' : 'type');
    await once('mode-' + mode, 'mode-' + mode);
    await sendable.fill('Quick heads-up: anh Khải saw the Lantern slide and suggested a coffee. I will keep it to learning how his area uses AI. Anything you would like me to mention or avoid?');
    if (await clickText(/^(Send|Submit|Say it)$/)) { await page.waitForTimeout(300); continue; }
  }
  if (await vis('.sortboard')) {
    await once('mode-sort', 'mode-sort');
    const item = page.locator('.pool .item').first();
    if (await item.count()) { await item.click(); await page.locator('.bin > button.btn').first().click(); continue; }
    if (await clickText(/^Check$/)) continue;
  }
  if (await vis('.olist')) { await once('mode-order', 'mode-order'); if (await clickText(/^Lock in this order$/)) continue; }
  if (await vis('.checklist') && await vis('.composer textarea')) { /* compress */ await once('mode-compress', 'mode-compress'); if (await clickText(/^Submit the cut$/)) continue; }
  if (await clickText(/^Submit the cut$/)) continue;
  const pick = page.locator('.opt[aria-pressed="false"]:not([disabled])');
  if (await pick.count()) { await once('mode-pick', 'mode-pick'); const need = await page.evaluate(() => { const m = document.querySelector('.chip.num')?.textContent.match(/of (\d+)/); return m ? Number(m[1]) : 4; }); for (let i = 0; i < need; i++) await pick.nth(0).click(); await clickText(/^Lock in$/); continue; }
  const opt = page.locator('.opts .opt:not([disabled])').first();
  if (await opt.count() && await opt.isVisible()) { await once('mode-choose', 'mode-choose'); await opt.click(); continue; }
  // Free slot
  if (await vis('.radio-cards input[name=slot]')) { await once('slot', 'slot'); await page.locator('.radio-cards input[value=rest]').check().catch(() => page.locator('.radio-cards input[name=slot]').nth(1).check()); await clickText(/^Do it$/); continue; }
  // Evening
  if (await vis('#refl')) { await once('evening', 'evening'); await page.fill('#refl', 'Tell my manager first on Monday.'); await page.locator('.radio-cards input[name=move]').first().check(); await page.fill('#movewhen', 'Monday 9:00 at my desk'); await clickText(/^Close the (last )?day$/); await page.waitForTimeout(300); await once('nightfall', 'nightfall'); await clickText(/^Back to the tower$/); continue; }
  if (await clickText(/^(Keep it now)$/)) continue;
  if (++idle < 8) { await page.waitForTimeout(400); continue; }
  log.push('no action at ' + hash + ': ' + (await page.locator('main').innerText()).slice(0, 200).replace(/\n/g, ' | '));
  break;
}
await shot('99-home-after');
for (const r of ['people', 'progress', 'library', 'portfolio', 'settings', 'coach', 'more']) { await page.evaluate(h => { location.hash = h; }, r); await page.waitForTimeout(500); await shot('view-' + r); }
const save = await page.evaluate(() => JSON.parse(localStorage.getItem('tlg.save.v1')));
console.log(JSON.stringify({ steps, daysDone: Object.values(save.days).filter(d => d.done).length, level: save.level, evidence: Object.keys(save.evidence).length, scn: Object.keys(save.scn).length, dbWrites: await page.evaluate(() => window.__dbWrites || 0), prompts: await page.evaluate(() => (window.__prompts || []).length) }));
console.log(log.join('\n'));
console.log('TRACE\n' + trace.slice(-25).join('\n'));
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
await browser.close();
process.exit(errors.length ? 1 : 0);
