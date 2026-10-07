// Turning a player's interaction into a result the progression engine records.
// Pure functions; the UI calls these, and the Node simulation test plays the whole game through them.
import { GRADE_PCT, gradeFor, gradeAtLeast, band } from './rubric.js';
import { recordAttempt, addPromise, resolvePromise } from './game.js';

const add = (a, b) => { const o = { ...a }; for (const [k, v] of Object.entries(b || {})) o[k] = (o[k] || 0) + (Number(v) || 0); return o; };

/** A choose / encounter option (or a timeout object) → result. */
export function choiceResult(scn, opt, index = null) {
  const g = opt.g || 'C';
  return { mode: scn.mode, grade: g, pct: GRADE_PCT[g], fx: { ...(opt.fx || {}) }, tags: [...(opt.tags || [])], opt: index, hints: 0 };
}

/** A graded typed/spoken answer plus the authored reaction band → result. */
export function gradedResult(scn, graded, text, hints = 0, reactSrc = scn.react) {
  const r = reactSrc ? reactSrc[band(graded.grade)] : null;
  return {
    mode: scn.mode, grade: graded.grade, pct: graded.pct, scores: graded.scores, text,
    fx: { ...(r?.fx || {}) }, tags: [...(r?.tags || [])], hints, provisional: graded.provisional,
  };
}

/** Sort: answers[i] = bin index chosen for items[i]. */
export function sortResult(scn, answers) {
  const n = scn.items.length;
  const right = scn.items.filter((it, i) => answers[i] === it.b).length;
  const pct = Math.round((right / n) * 100);
  return { mode: 'sort', grade: gradeFor(pct), pct, fx: {}, tags: [], hints: 0, right, n };
}

/** Order: order = array of original indices in the player's order. Kendall-style: share of correctly ordered pairs. */
export function orderResult(scn, order) {
  const n = order.length;
  let good = 0, all = 0;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { all++; if (order[i] < order[j]) good++; }
  const exact = order.filter((v, i) => v === i).length;
  const pct = Math.round((good / all) * 100);
  return { mode: 'order', grade: gradeFor(pct), pct, fx: {}, tags: [], hints: 0, exact, n };
}

/** Pick: picked = set/array of item indices. */
export function pickResult(scn, picked) {
  const set = new Set(picked);
  const goodPicked = scn.items.filter((it, i) => set.has(i) && it.good).length;
  const pct = Math.round((goodPicked / scn.pickN) * 100);
  return { mode: 'pick', grade: gradeFor(pct), pct, fx: {}, tags: [], hints: 0, right: goodPicked, n: scn.pickN };
}

/** Compress: keep-items present and word count ≤ target. matcher(text, any) is the grader's matchesAny. */
export function compressResult(scn, text, matcher, wordCount) {
  const kept = scn.keep.map(k => matcher(text, k.any));
  const keptN = kept.filter(Boolean).length;
  const n = wordCount(text);
  const lenOk = n <= scn.target;
  const lenScore = lenOk ? 1 : Math.max(0, 1 - (n - scn.target) / scn.target);
  const pct = Math.round((keptN / scn.keep.length) * 70 + lenScore * 30);
  return { mode: 'compress', grade: gradeFor(pct), pct, fx: {}, tags: [], hints: 0, kept, words: n, text };
}

/**
 * Convo: steps = [{ kind:'opt', opt, index } | { kind:'type', graded, beat, text } | { kind:'timeout', beat }].
 * The conversation grade is the mean of beat percentages; fx and tags accumulate; boss result band adds its own.
 */
export function convoResult(scn, steps) {
  let fx = {}, tags = [], sum = 0, talk = 0, talkN = 0;
  for (const st of steps) {
    if (st.kind === 'opt') {
      const g = st.opt.g || 'C';
      sum += GRADE_PCT[g]; fx = add(fx, st.opt.fx); tags.push(...(st.opt.tags || []));
      if (typeof st.opt.talk === 'number') { talk += st.opt.talk; talkN++; }
    } else if (st.kind === 'timeout') {
      const t = st.beat.timeout || { g: 'C' };
      sum += GRADE_PCT[t.g || 'C']; fx = add(fx, t.fx);
    } else if (st.kind === 'type') {
      sum += st.graded.pct;
      const r = st.beat.type.react?.[band(st.graded.grade)];
      fx = add(fx, r?.fx); tags.push(...(r?.tags || []));
    }
  }
  let pct = steps.length ? Math.round(sum / steps.length) : 0;
  // Talk meter (70/30): if the player's share drifts far above target, cap the grade.
  let talkShare = null;
  if (scn.meter === 'talk' && talkN) {
    talkShare = Math.round(talk / talkN);
    const over = talkShare - (scn.meterTarget || 35);
    if (over > 15) pct = Math.min(pct, 74);
  }
  const grade = gradeFor(pct);
  const resBand = scn.result?.[band(grade)];
  if (resBand) { fx = add(fx, resBand.fx); tags.push(...(resBand.tags || [])); }
  const passed = scn.boss ? gradeAtLeast(grade, scn.pass || 'B') : null;
  return { mode: 'convo', grade, pct, fx, tags: [...new Set(tags)], hints: 0, passed, talkShare };
}

/** Side effects beyond the attempt record: promises, discoveries, branch choice, resolved promises. */
export function applyExtras(save, scn, result, day, extras = {}) {
  const ctxPromise = p => addPromise(save, { id: p.id, text: p.text, npc: p.npc, made: day, due: day + (p.due || 2) });
  for (const p of extras.promises || []) ctxPromise(p);
  for (const d of extras.discover || []) {
    const list = save.known[d.npc] || (save.known[d.npc] = []);
    if (!list.includes(d.pref)) list.push(d.pref);
  }
  if (extras.branch && !save.branch) save.branch = extras.branch;
  if (scn.resolves && gradeAtLeast(result.grade, 'B')) resolvePromise(save, scn.resolves, true, day);
}

/** Record a finished scenario: attempt + extras. Returns the scenario record. */
export function commit(save, scn, result, day, extras, now = Date.now()) {
  const rec = recordAttempt(save, scn, result, day, now);
  applyExtras(save, scn, result, day, extras);
  return rec;
}

/** Collect extras from chosen options (choose/encounter) or convo steps. */
export function extrasFrom(opts) {
  const ex = { promises: [], discover: [], branch: null };
  for (const o of opts) {
    if (!o) continue;
    if (o.promise) ex.promises.push(o.promise);
    if (o.discover) ex.discover.push(o.discover);
    if (o.branch) ex.branch = o.branch;
  }
  return ex;
}

/** After a boss: promote when passed (the gate was checked before entry). */
export function promoteIfPassed(save, scn, result, day, now = Date.now()) {
  if (!scn.boss || !result.passed || !scn.promote) return false;
  if (save.level >= scn.promote.level) return false;
  save.level = scn.promote.level;
  save.promotions.push({ level: scn.promote.level, day, ts: now });
  return true;
}

/** Apply a free-slot choice for a day. note: { npc, kind, text } for Friday-15. */
export function applySlot(save, day, slotId, slot, note) {
  if (save.slots[day]) return false;
  save.slots[day] = slotId;
  let fx = { ...(slot.fx || {}) };
  if (slot.kind === 'note' && note && note.npc) {
    fx[note.npc] = (fx[note.npc] || 0) + (slot.npcFx || 3);
    save.notes.push({ npc: note.npc, kind: note.kind === 'thanks' ? 'thanks' : 'result', text: String(note.text || '').slice(0, 280), day });
  }
  save.bonus.push({ fx, src: slotId, day });
  for (const t of slot.tags || []) if (!(t in save.tags)) save.tags[t] = day;
  return true;
}
