// Spaced retrieval for hook cards: Leitner boxes with expanding intervals (Roediger & Karpicke; Cepeda et al.).
// Box 0 = new (unseen). Boxes 1-5 with intervals below; reaching box 5 and passing again = Mastered.
export const INTERVALS = [0, 1, 2, 4, 8, 16];
export const MASTERY = ['New', 'Learning', 'Learning', 'Known', 'Known', 'Mastered'];

export function dayOrdinal(d = new Date()) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

export function masteryOf(st) {
  if (!st || !st.seen) return 'New';
  return MASTERY[Math.max(0, Math.min(5, st.box))];
}

/** Choose today's Dojo cards: due ones first (oldest due, lowest box), interleaved across parts, then new unlocked cards. */
export function pickDojo(cards, state, today, unlockedIds, { max = 10, min = 6 } = {}) {
  const byId = new Map(cards.map(c => [c.id, c]));
  const unlocked = unlockedIds.filter(id => byId.has(id));
  const due = unlocked.filter(id => state[id]?.seen && state[id].due <= today)
    .sort((a, b) => (state[a].due - state[b].due) || (state[a].box - state[b].box));
  const fresh = unlocked.filter(id => !state[id]?.seen);
  const picked = interleave(due.slice(0, max), byId);
  const want = Math.max(min, Math.min(max, picked.length + 3));
  for (const id of fresh) { if (picked.length >= want) break; picked.push(id); }
  // If nothing is due and nothing new, offer the weakest known cards for a light review.
  if (picked.length < min) {
    const extra = unlocked.filter(id => !picked.includes(id)).sort((a, b) => (state[a]?.box ?? 0) - (state[b]?.box ?? 0));
    for (const id of extra) { if (picked.length >= min) break; picked.push(id); }
  }
  return picked;
}

function interleave(ids, byId) {
  const groups = new Map();
  for (const id of ids) {
    const k = byId.get(id).part || 'x';
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(id);
  }
  const out = [];
  const lists = [...groups.values()];
  while (lists.some(l => l.length)) for (const l of lists) if (l.length) out.push(l.shift());
  return out;
}

/** result: 'again' | 'hard' | 'good' */
export function review(st, result, today) {
  const cur = st && st.seen ? { ...st } : { box: 0, due: today, seen: 0, ok: 0, miss: 0 };
  cur.seen = (cur.seen || 0) + 1;
  if (result === 'again') { cur.box = 1; cur.miss = (cur.miss || 0) + 1; cur.due = today + 1; }
  else if (result === 'hard') { cur.box = Math.max(1, cur.box); cur.due = today + 1; }
  else { cur.box = Math.min(5, Math.max(1, cur.box + 1)); cur.ok = (cur.ok || 0) + 1; cur.due = today + INTERVALS[cur.box]; }
  cur.last = today;
  return cur;
}

const STOP = new Set('the a an and or of to in on at for with your you his her their is are be it that this then than not never only one first by as from into what when who how why do does did if so but'.split(' '));

export function keyTerms(answer) {
  return [...new Set(String(answer).toLowerCase().normalize('NFC').match(/[\p{L}\p{N}%]+/gu) || [])]
    .filter(w => (w.length > 2 || /\d/.test(w)) && !STOP.has(w));
}

/** Rough meaning check: share of the card's key terms present in the attempt. Returns 0..1. */
export function overlap(attempt, card) {
  const keys = card.keys && card.keys.length ? card.keys.map(k => k.toLowerCase()) : keyTerms(card.a);
  if (!keys.length) return 0;
  const a = String(attempt).toLowerCase();
  const hit = keys.filter(k => a.includes(k)).length;
  return hit / keys.length;
}

export function suggestResult(attempt, card) {
  const o = overlap(attempt, card);
  if (o >= 0.6) return 'good';
  if (o >= 0.3) return 'hard';
  return 'again';
}
