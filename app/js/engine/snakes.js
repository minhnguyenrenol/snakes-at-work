// Rắn công sở (Snakes at Work): who is a snake right now, derived from the save so old saves just work.
// A scene whose latest attempt graded C or D leaves one drop of venom and turns its stakeholder into a snake.
// Replaying it at B or better charms them back. Four drops and you become an office snake yourself;
// you shed your skin when you are back to one drop or fewer.

export const FAIL = new Set(['C', 'D']);
export const PLAYER_AT = 4;   // venom that turns you into a snake
export const SHED_AT = 1;     // venom at or below which a snake player sheds
export const SCALES_AT = 2;   // venom at which scales start to show

/** The stakeholder who strikes when a scene goes wrong: its npc, else its first speaking beat, else the office snake. */
export function attackerOf(scn) {
  if (!scn) return 'office';
  if (scn.npc) return scn.npc;
  const b = (scn.beats || []).find(x => x.speaker);
  return b ? b.speaker : 'office';
}

/**
 * snakeState(save, SCN_BY_ID) -> { venom, fails: [{id, npc, g, trap}], snakes: {npc: [scene ids]}, player: 'human'|'scaly'|'snake' }
 * wasSnake: pass the previous player form so a snake stays a snake until venom falls to SHED_AT.
 */
export function snakeState(save, SCN_BY_ID, wasSnake = false) {
  const fails = [];
  for (const [id, r] of Object.entries(save.scn || {})) {
    const last = r.att?.[r.att.length - 1];
    const scn = SCN_BY_ID[id];
    if (!last || !scn || !FAIL.has(last.g)) continue;
    fails.push({ id, npc: attackerOf(scn), g: last.g, trap: !!scn.trap });
  }
  fails.sort((a, b) => (SCN_BY_ID[a.id].day - SCN_BY_ID[b.id].day));
  const snakes = {};
  for (const f of fails) (snakes[f.npc] ||= []).push(f.id);
  const venom = fails.length;
  let player = venom >= PLAYER_AT ? 'snake' : venom >= SCALES_AT ? 'scaly' : 'human';
  if (wasSnake && venom > SHED_AT) player = 'snake';
  return { venom, fails, snakes, player };
}

/** What changed between two states, for the cinematics: strikes, charms, becoming and shedding. */
export function snakeDiff(before, after) {
  const was = new Set(before.fails.map(f => f.id));
  const now = new Set(after.fails.map(f => f.id));
  return {
    struck: after.fails.filter(f => !was.has(f.id)),
    charmed: before.fails.filter(f => !now.has(f.id)),
    became: before.player !== 'snake' && after.player === 'snake',
    shed: before.player === 'snake' && after.player !== 'snake',
  };
}
