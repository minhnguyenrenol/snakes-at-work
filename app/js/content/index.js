// One import for all content. Merges the three weeks and builds lookup tables.
import * as W1 from './week1.js';
import * as W2 from './week2.js';
import * as W3 from './week3.js';
import { TRAPS } from './traps.js';

export { NPCS, NPC_IDS, SPONSOR_IDS, COACH, displayName } from './npcs.js';
export { CARDS, CARD_BY_ID, unlockedCards } from './cards.js';
export { EVIDENCE, SLOTS, LEVELS, levelTitle, PLACES } from './meta.js';

export const LESSONS = { ...W1.LESSONS, ...W2.LESSONS, ...W3.LESSONS };
export const SCENARIOS = [...W1.SCENARIOS, ...W2.SCENARIOS, ...W3.SCENARIOS, ...TRAPS];
export const SCN_BY_ID = Object.fromEntries(SCENARIOS.map(s => [s.id, s]));
// Snake traps join their day after its last scene, before the drill, slot and evening steps.
function withTraps(d) {
  const traps = TRAPS.filter(t => t.day === d.n).map(t => 's:' + t.id);
  if (!traps.length) return d;
  const steps = d.steps.slice();
  let at = -1;
  steps.forEach((st, i) => { if (/^(s|boss):/.test(st)) at = i; });
  const bossAt = steps.findIndex(st => st.startsWith('boss:'));
  if (bossAt >= 0) at = bossAt - 1;
  steps.splice(at + 1, 0, ...traps);
  return { ...d, steps };
}
export const DAYS = [...W1.DAYS, ...W2.DAYS, ...W3.DAYS].map(withTraps).sort((a, b) => a.n - b.n);
export const DAY_BY_N = Object.fromEntries(DAYS.map(d => [d.n, d]));
export const MAX_DAY = DAYS.length;

/** Checks for a scenario (or a beat's type block), following checksRef to another scenario. */
export function checksFor(obj) {
  if (obj.checks) return obj.checks;
  if (obj.checksRef) return SCN_BY_ID[obj.checksRef]?.checks || [];
  return [];
}
