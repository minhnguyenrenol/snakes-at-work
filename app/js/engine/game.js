// Progression engine: saves, attempts, derived stats, relationships, evidence, gates, schedule, endings.
// Pure functions over a plain save object, so they run identically in the browser and in Node tests.
import { gradeAtLeast, band, GRADE_ORDER } from './rubric.js';

export const SAVE_VERSION = 1;
export const STATS = {
  trust: { name: 'Trust', note: '(Credibility + Reliability + Intimacy) ÷ Self-orientation' },
  cred: { name: 'Credibility', note: 'Do people believe your numbers and judgement?' },
  vis: { name: 'Visibility', note: 'Do the right people know your work?' },
  deliv: { name: 'Delivery', note: 'Do things you touch get done?' },
  pol: { name: 'Political capital', note: 'Goodwill you can spend' },
  energy: { name: 'Energy', note: 'Your sustainable capacity: the hidden governor' },
  craft: { name: 'Craft', note: 'Design quality reputation' },
};
export const STAT_KEYS = Object.keys(STATS);
export const STAT_BASE = { trust: 30, cred: 30, vis: 20, deliv: 40, pol: 30, energy: 70, craft: 55 };

export const RUNGS = ['Cold', 'Wary', 'Stranger', 'Useful', 'Trusted', 'Mine'];
export function rung(points) {
  if (points <= -15) return 'Cold';
  if (points <= -6) return 'Wary';
  if (points < 6) return 'Stranger';
  if (points < 18) return 'Useful';
  if (points < 36) return 'Trusted';
  return 'Mine';
}
export function rungAtLeast(r, min) { return RUNGS.indexOf(r) >= RUNGS.indexOf(min); }
export const RUNG_FLOOR = { Useful: 6, Trusted: 18, Mine: 36 };

export function newSave(now = Date.now()) {
  return {
    v: SAVE_VERSION, createdAt: now, updatedAt: now, rev: 0,
    player: { name: 'Minh' },
    settings: { theme: 'system', sound: true, motion: 'system', encounter: 3, ai: true, playAhead: false, voice: true, amb: true, snakes: true, dyslexia: false, vol: { voice: 0.9, sfx: 0.6, amb: 0.35 }, names: {} },
    days: {},            // n -> { step, done, startedAt, doneAt, date }
    scn: {},             // scenario id -> record
    tags: {},            // tag -> day first acquired
    evidence: {},        // card id -> day earned
    cards: {},           // hook card id -> SRS state
    promises: [],
    scripts: [],
    moves: [],
    reflections: {},
    disagreements: [],
    slots: {},           // day -> option id
    bonus: [],           // [{fx, src, day}] from slots and Friday-15 notes
    invest: {},          // npc -> ordinal of last Friday-15 note
    branch: null,
    known: {},           // npc -> [pref ids discovered]
    notes: [],           // Friday-15 notes [{npc, kind, text, day}]
    level: 1,
    promotions: [],      // [{level, day, ts}]
    practised: [],       // date ordinals with any play
    coach: {},           // ordinal -> messages used
    ending: null,
    letter: '',
    snakeForm: 'human', // 'snake' once you have become an office snake, until you shed
  };
}

/** Defensive merge for loaded/imported saves: unknown keys dropped, wrong types replaced, sizes bounded. */
const isObj = v => v != null && typeof v === 'object' && !Array.isArray(v);
const str = (v, max = 400) => (typeof v === 'string' ? v.slice(0, max) : '');
const num = (v, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
const safeKey = k => typeof k === 'string' && k.length <= 64 && !['__proto__', 'constructor', 'prototype'].includes(k);
function dict(v, mapVal, maxKeys = 500) {
  const out = Object.create(null);
  if (!isObj(v)) return {};
  let n = 0;
  for (const k of Object.keys(v)) {
    if (!safeKey(k) || n++ >= maxKeys) continue;
    const m = mapVal(v[k]);
    if (m !== undefined) out[k] = m;
  }
  return Object.assign({}, out);
}
const GRADES = ['S', 'A', 'B', 'C', 'D'];
const grade = g => (GRADES.includes(g) ? g : 'D');
function scores(v) { return isObj(v) ? dict(v, x => Math.max(0, Math.min(4, Math.round(num(x))))) : null; }
function fxObj(v) { return dict(v, x => Math.max(-50, Math.min(50, num(x)))); }

export function normalizeSave(raw) {
  const base = newSave(0);
  if (!isObj(raw)) return base;
  const out = base;
  out.createdAt = num(raw.createdAt, 0); out.updatedAt = num(raw.updatedAt, 0); out.rev = num(raw.rev, 0);
  if (isObj(raw.player)) out.player.name = str(raw.player.name, 40) || base.player.name;
  if (isObj(raw.settings)) {
    const st = raw.settings;
    out.settings.theme = ['system', 'light', 'dark'].includes(st.theme) ? st.theme : 'system';
    out.settings.motion = ['system', 'full', 'reduced'].includes(st.motion) ? st.motion : 'system';
    out.settings.encounter = Math.max(0, Math.min(10, num(st.encounter, 3)));
    for (const k of ['sound', 'ai', 'playAhead', 'voice', 'amb', 'dyslexia', 'snakes']) out.settings[k] = typeof st[k] === 'boolean' ? st[k] : base.settings[k];
    // Saves from before recorded voices (no vol yet) get the new sound defaults once.
    if (!isObj(st.vol)) { out.settings.voice = true; out.settings.sound = true; out.settings.amb = true; }
    for (const k of ['voice', 'sfx', 'amb']) out.settings.vol[k] = Math.max(0, Math.min(1, num(st.vol?.[k], base.settings.vol[k])));
    out.settings.names = dict(st.names, x => (typeof x === 'string' ? x.slice(0, 40) : undefined), 40);
  }
  out.days = dict(raw.days, d => (isObj(d) ? { done: !!d.done, date: d.date == null ? null : num(d.date), step: Math.max(0, Math.min(40, num(d.step))), startedAt: num(d.startedAt), doneAt: num(d.doneAt) } : undefined), 40);
  out.scn = dict(raw.scn, r => {
    if (!isObj(r) || !Array.isArray(r.att)) return undefined;
    const att = r.att.slice(-6).filter(isObj).map(a => ({ g: grade(a.g), pct: Math.max(0, Math.min(100, num(a.pct))), ts: num(a.ts), h: Math.max(0, Math.min(3, num(a.h))), p: !!a.p, sc: scores(a.sc), o: a.o == null ? null : num(a.o), d: num(a.d), ...(typeof a.t === 'string' ? { t: a.t.slice(0, 1200) } : {}) }));
    const best = isObj(r.best) ? { g: grade(r.best.g), pct: Math.max(0, Math.min(100, num(r.best.pct))), sc: scores(r.best.sc), d: num(r.best.d) } : null;
    const tagList = v => (Array.isArray(v) ? v.filter(t => typeof t === 'string' && t.length <= 64).slice(0, 30) : []);
    return { att, best, fx: fxObj(r.fx), tags: tagList(r.tags), firstTags: tagList(r.firstTags), bestTags: tagList(r.bestTags) };
  });
  out.tags = dict(raw.tags, x => num(x, 0), 1000);
  out.evidence = dict(raw.evidence, x => num(x, 0), 100);
  out.cards = dict(raw.cards, c => (isObj(c) ? { box: Math.max(0, Math.min(5, num(c.box))), due: num(c.due), seen: num(c.seen), ok: num(c.ok), miss: num(c.miss), ...(c.last != null ? { last: num(c.last) } : {}) } : undefined), 400);
  const arr = (v, max, map) => (Array.isArray(v) ? v.slice(0, max).filter(isObj).map(map) : []);
  out.promises = arr(raw.promises, 100, p => ({ id: str(p.id, 64), text: str(p.text, 200), npc: str(p.npc, 32), made: num(p.made), due: num(p.due), status: ['open', 'kept', 'missed'].includes(p.status) ? p.status : 'open', ...(p.closed != null ? { closed: num(p.closed) } : {}) }));
  out.scripts = arr(raw.scripts, 200, x => ({ id: str(x.id, 64), text: str(x.text, 1200), title: str(x.title, 120), day: num(x.day), ts: num(x.ts) }));
  out.moves = arr(raw.moves, 200, x => ({ day: num(x.day), text: str(x.text, 280), when: str(x.when, 120), status: ['open', 'done', 'skipped'].includes(x.status) ? x.status : 'open' }));
  out.reflections = dict(raw.reflections, x => (typeof x === 'string' ? x.slice(0, 600) : undefined), 40);
  out.disagreements = arr(raw.disagreements, 100, x => ({ scn: str(x.scn, 64), text: str(x.text, 600), ts: num(x.ts) }));
  out.slots = dict(raw.slots, x => (typeof x === 'string' ? x.slice(0, 32) : undefined), 40);
  out.bonus = arr(raw.bonus, 200, b => ({ fx: fxObj(b.fx), src: str(b.src, 32), day: num(b.day) }));
  out.invest = dict(raw.invest, x => num(x), 40);
  out.branch = ['manager', 'principal'].includes(raw.branch) ? raw.branch : null;
  out.known = dict(raw.known, v => (Array.isArray(v) ? v.filter(x => typeof x === 'string').slice(0, 20).map(x => x.slice(0, 32)) : undefined), 40);
  out.notes = arr(raw.notes, 200, n => ({ npc: str(n.npc, 32), kind: n.kind === 'thanks' ? 'thanks' : 'result', text: str(n.text, 280), day: num(n.day) }));
  out.level = Math.max(1, Math.min(10, Math.round(num(raw.level, 1)) || 1));
  out.promotions = arr(raw.promotions, 20, p => ({ level: num(p.level), day: num(p.day), ts: num(p.ts) }));
  out.practised = Array.isArray(raw.practised) ? raw.practised.filter(Number.isFinite).slice(-400) : [];
  out.coach = dict(raw.coach, x => Math.max(0, num(x)), 400);
  out.ending = typeof raw.ending === 'string' && raw.ending in ENDINGS_KEYS ? raw.ending : null;
  out.letter = str(raw.letter, 4000);
  out.snakeForm = raw.snakeForm === 'snake' ? 'snake' : 'human';
  out.v = SAVE_VERSION;
  return out;
}
const ENDINGS_KEYS = { builder: 1, trusted: 1, visionary: 1, craft: 1, caution: 1 };

// ---------------- attempts ----------------

/**
 * result: { grade, pct, scores?, fx, tags, opt?, text?, hints, provisional, mode }
 * First attempt's tags persist (NPCs remember the first version); stats and evidence use the best attempt.
 */
export function recordAttempt(save, scn, result, day, now = Date.now()) {
  const rec = save.scn[scn.id] || { att: [], best: null, fx: {}, tags: [], firstTags: [] };
  const att = {
    g: result.grade, pct: result.pct, ts: now, h: result.hints || 0, p: !!result.provisional,
    sc: result.scores || null, o: result.opt ?? null, d: day,
  };
  if (result.text) att.t = String(result.text).slice(0, 1200);
  rec.att.push(att);
  if (rec.att.length > 6) rec.att.splice(1, rec.att.length - 6); // keep first + latest 5
  const isFirst = rec.att.length === 1 || !rec.best;
  if (isFirst) rec.firstTags = [...(result.tags || [])];
  const better = !rec.best || result.pct > rec.best.pct;
  if (better) {
    rec.best = { g: result.grade, pct: result.pct, sc: result.scores || null, d: day };
    rec.fx = { ...(result.fx || {}) };
    rec.bestTags = [...(result.tags || [])];
  }
  rec.tags = [...new Set([...(rec.firstTags || []), ...(rec.bestTags || [])])];
  save.scn[scn.id] = rec;
  for (const t of rec.tags) if (!(t in save.tags)) save.tags[t] = day;
  // Evidence
  const ev = result.ev || scn.ev;
  if (ev && !save.evidence[ev.id] && gradeAtLeast(rec.best.g, ev.min || 'B')) save.evidence[ev.id] = day;
  // Hook card unlock happens at first exposure
  if (scn.hook && !save.cards[scn.hook]) save.cards[scn.hook] = { box: 0, due: 0, seen: 0, ok: 0, miss: 0 };
  return rec;
}

export function xpFor(scn, grade, hints = 0) {
  const base = 10 * (scn.diff || 1) * (scn.boss ? 3 : 1);
  const mult = { S: 1.5, A: 1.2, B: 1, C: 0.7, D: 0.4 }[grade] ?? 0.5;
  const cost = [1, 0.9, 0.75, 0.5][Math.min(3, hints)];
  return Math.round(base * mult * cost);
}

export function totalXP(save, scnById) {
  let xp = 0;
  for (const [id, rec] of Object.entries(save.scn)) {
    const scn = scnById[id];
    if (!scn) continue;
    for (const a of rec.att) xp += xpFor(scn, a.g, a.h);
  }
  for (const [, c] of Object.entries(save.cards)) xp += (c.ok || 0) * 3;
  return xp;
}

// ---------------- derived state ----------------

export function derive(save, npcIds) {
  const stats = { ...STAT_BASE };
  const npcs = Object.fromEntries(npcIds.map(id => [id, 0]));
  const apply = fx => {
    for (const [k, v] of Object.entries(fx || {})) {
      const n = Number(v) || 0;
      if (k in stats) stats[k] += n;
      else if (k in npcs) npcs[k] += n;
    }
  };
  for (const rec of Object.values(save.scn)) apply(rec.fx);
  for (const b of save.bonus) apply(b.fx);
  // Promises
  for (const p of save.promises) {
    if (p.status === 'kept') { stats.trust += 2; if (p.npc in npcs) npcs[p.npc] += 2; }
    if (p.status === 'missed') { stats.trust -= 3; if (p.npc in npcs) npcs[p.npc] -= 3; }
  }
  const open = save.promises.filter(p => p.status === 'open').length;
  if (open >= 3) stats.energy -= 8;
  for (const k of Object.keys(stats)) stats[k] = Math.max(0, Math.min(100, Math.round(stats[k])));
  const rungs = Object.fromEntries(Object.entries(npcs).map(([k, v]) => [k, rung(v)]));
  return { stats, npcs, rungs };
}

export function sponsorsCount(rungs, min = 'Trusted') {
  return Object.values(rungs).filter(r => rungAtLeast(r, min)).length;
}

export function askRung(save) {
  if (save.tags.sponsored) return 'S';
  if (save.tags.access_given) return 'Access';
  if (save.tags.awareness_set) return 'Awareness';
  if (save.tags.asked_advice) return 'Advice';
  return ', ';
}

// ---------------- gates ----------------

export function gateStatus(save, boss, derived, evidenceDefs) {
  const g = boss.gate || {};
  const cards = (g.cards || []).map(id => ({ id, name: evidenceDefs[id]?.name || id, from: evidenceDefs[id]?.from, have: !!save.evidence[id] }));
  const npcs = Object.entries(g.npcs || {}).map(([id, min]) => ({ id, min, have: derived.rungs[id], ok: rungAtLeast(derived.rungs[id] || 'Stranger', min) }));
  const sponsors = g.sponsors ? { need: g.sponsors, min: g.sponsorMin || 'Trusted', have: sponsorsCount(derived.rungs, g.sponsorMin || 'Trusted') } : null;
  const ok = cards.every(c => c.have) && npcs.every(n => n.ok) && (!sponsors || sponsors.have >= sponsors.need);
  return { cards, npcs, sponsors, ok };
}

// ---------------- schedule ----------------

export function isStepVisible(save, scn) {
  if (!scn) return false;
  if (scn.when && !scn.when.every(t => t in save.tags)) return false;
  if (scn.unless && scn.unless.some(t => t in save.tags)) return false;
  if (scn.branch && save.branch !== scn.branch) return false;
  return true;
}

/** Expand a day's authored steps, dropping conditional scenarios whose conditions don't hold. */
export function daySteps(save, day, scnById) {
  return day.steps.filter(st => {
    const [kind, id] = st.split(':');
    if (kind === 's' || kind === 'boss' || kind === 'drill') return isStepVisible(save, scnById[id]);
    return true;
  });
}

export function dayAvailable(save, n, today) {
  if (n === 1) return { ok: true };
  const prev = save.days[n - 1];
  if (!prev || !prev.done) return { ok: false, why: `Finish Day ${n - 1} first.` };
  if (save.settings.playAhead) return { ok: true };
  if (prev.date != null && prev.date >= today) return { ok: false, why: 'Opens tomorrow. Sleep is when practice turns into memory; the Dojo and replays stay open.', tomorrow: true };
  return { ok: true };
}

export function currentDay(save, maxDay) {
  for (let n = 1; n <= maxDay; n++) if (!save.days[n]?.done) return n;
  return maxDay + 1; // finished
}

// ---------------- promises ----------------

export function addPromise(save, { id, text, npc, made, due }) {
  if (save.promises.some(p => p.id === id)) return;
  save.promises.push({ id, text, npc, made, due, status: 'open' });
}

export function resolvePromise(save, id, kept, day) {
  const p = save.promises.find(x => x.id === id);
  if (p && p.status === 'open') { p.status = kept ? 'kept' : 'missed'; p.closed = day; }
}

export function expirePromises(save, day) {
  for (const p of save.promises) if (p.status === 'open' && p.due < day) { p.status = 'missed'; p.closed = day; }
}

// ---------------- dimension trends ----------------

export function dimTrend(save) {
  const early = {}, late = {}, all = {};
  const atts = Object.values(save.scn).flatMap(r => r.att.filter(a => a.sc).map(a => a));
  atts.sort((a, b) => a.ts - b.ts);
  const half = Math.ceil(atts.length / 2);
  atts.forEach((a, i) => {
    for (const [d, v] of Object.entries(a.sc)) {
      (all[d] ||= []).push(v);
      ((i < half ? early : late)[d] ||= []).push(v);
    }
  });
  const avg = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.reduce((x, y) => x + y, 0) / v.length]));
  return { early: avg(early), late: avg(late), all: avg(all), n: atts.length };
}

// ---------------- endings ----------------

export const ENDINGS = {
  builder: { name: 'The Builder of Builders', tone: 'Twelve people you hired now lead teams.' },
  trusted: { name: 'The Trusted Hand', tone: 'When the bank had a crisis, they called you first.' },
  visionary: { name: 'The Visionary', tone: 'You changed how the bank builds, and made some enemies.' },
  craft: { name: 'The Craftsperson', tone: 'Your standards outlived three reorganisations.' },
  caution: { name: 'The Cautionary Tale', tone: 'You were brilliant. The bank wasn\'t sure it could trust you.' },
};

export function decideEnding(save, derived) {
  const s = derived.stats;
  const t = save.tags;
  const bad = ['leveraged_sponsor', 'gossiped', 'backchannel', 'public_conflict', 'overclaimed', 'bypassed_line', 'unethical_yes'].filter(x => x in t).length;
  if (bad >= 3 || s.trust < 30 || s.energy < 15) return 'caution';
  if (save.branch === 'principal' && s.craft >= 65) return 'craft';
  const people = ['credited_others', 'coached_vy', 'safety_created', 'care_and_clarity', 'grew_successor', 'sbi_feedback'].filter(x => x in t).length;
  if (people >= 4 && s.pol >= 45) return 'builder';
  if (s.vis >= 60 && s.deliv >= 60 && s.trust < 60) return 'visionary';
  return 'trusted';
}

export function bestGradeLetter(rec) { return rec?.best?.g || null; }
export function gradeIndex(g) { return GRADE_ORDER.indexOf(g); }
export { band };
