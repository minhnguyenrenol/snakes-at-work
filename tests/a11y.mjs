// axe-core WCAG 2.2 AA sweep over the main routes, in light and dark. Usage: TLG_TOOLS=<dir with node_modules> node tests/a11y.mjs
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { open } from './smoke.mjs';
const axe = readFileSync(path.join(process.env.TLG_TOOLS || '.', 'node_modules/axe-core/axe.min.js'), 'utf8');
const routes = ['#today', '#day-1', '#scn-d1_first', '#scn-d1_heads', '#scn-d1_cut', '#people', '#npc-ethan', '#progress', '#library', '#portfolio', '#settings', '#coach', '#more', '#dojo', '#atlas', '#sheet-d3_coffee', '#sheet-d1_cut', '#scripts', '#dossier', '#lessons', '#lessons-l1', '#drill', '#practice-d18_peer', '#den', '#sheet-trap_gossip', '#scn-trap_credit'];
let total = 0;
for (const scheme of ['light', 'dark']) for (const width of [1280, 390]) {
  const { browser, page } = await open({ width, scheme });
  for (const r of routes) {
    await page.evaluate(h => { location.hash = h; }, r); await page.waitForTimeout(500);
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'], exclude: [['.cine']] })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0, 2).map(x => x.target.join(' ') + ' :: ' + (x.failureSummary || '').split('\n')[1]) })));
    for (const v of res) { total++; console.log(scheme, width, r, v.id, v.impact, v.n, JSON.stringify(v.t)); }
  }
  await browser.close();
}
console.log(total ? `${total} violation groups` : 'no axe violations');
process.exit(total ? 1 : 0);
