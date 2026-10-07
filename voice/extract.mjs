// Collect every line worth recording into voice/jobs.json: { id, voice, raw, h, text, group }.
// raw is the content template; text is what the recorder says. Run: node voice/extract.mjs
import { writeFileSync } from 'node:fs';
import { SCENARIOS, DAYS, LESSONS } from '../app/js/content/index.js';
import { TOKENS } from '../app/js/engine/text.js';
import { NARRATOR, VOICE_OF, SPOKEN, SPOKEN_ME, textHash } from '../app/js/content/voices.js';
let DEEP = {};
let SCRIPTS = [];
try { ({ SCRIPTS } = await import('../app/js/content/scripts.js')); } catch { /* not written yet */ }
try { ({ DEEP } = await import('../app/js/content/deep.js')); } catch { /* not written yet */ }

const SUBS = [
  [/\bT\+10\b/g, 'T plus ten'], [/≤\s?/g, 'at most '], [/≥\s?/g, 'at least '], [/~\s?/g, 'about '], [/→/g, ', then '],
  [/&/g, 'and'], [/\bBLUF-R\b/g, 'bluff R'], [/\bBLUF\b/g, 'bluff'], [/\b1-3-1\b/g, 'one, three, one'], [/\b3-30-3\b/g, 'three, thirty, three'],
  [/\bA-A-A-S\b/g, 'the four rung'], [/\bHCMC\b/g, 'Ho Chi Minh City'], [/\be\.g\.\s?/g, 'for example, '], [/\bi\.e\.\s?/g, 'that is, '],
  [/\bvs\.?\s/g, 'versus '], [/\bEA\b/g, 'E A'], [/\bPREP\b/g, 'prep'], [/\bSTAR\b/g, 'star'], [/\bSBI\b/g, 'S B I'], [/\bCUP\b/g, 'cup'],
  [/\bOKRs?\b/g, m => m === 'OKR' ? 'O K R' : 'O K Rs'], [/\bFY(\d+)/g, 'F Y $1'], [/\bQ(\d)\b/g, 'Q $1'],
  [/\banh\b/g, 'ahn'], [/\bAnh\b(?! Kai)/g, 'Ahn'], [/\bchị\b/gi, 'chee'], [/\bạ\b/g, ''], [/ - /g, ', '], [/[“”"]/g, ''], [/…/g, '...'],
  [/\s+([,.;:!?])/g, '$1'], [/\s{2,}/g, ' '],
];

function spokenFill(s) {
  return String(s).replace(/\{(\w+)(\.s)?\}/g, (m, key, short) => {
    if (key === 'me') return SPOKEN_ME;
    const id = TOKENS[key];
    return id ? SPOKEN[id][short ? 1 : 0] : m;
  });
}
const deaccent = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
function speakable(raw) {
  let t = spokenFill(raw);
  for (const [re, rep] of SUBS) t = t.replace(re, rep);
  return deaccent(t).trim();
}
// Only the quoted part of a line is the character speaking; the rest is stage direction.
function quoted(raw) {
  const parts = [...String(raw).matchAll(/["“]([^"”]+)["”]/g)].map(m => m[1]);
  return parts.length ? parts.join(' ') : null;
}

const jobs = [];
const seen = new Set();
function add(id, voice, raw, group, textOverride) {
  if (!raw || seen.has(id)) return;
  const text = speakable(textOverride ?? raw);
  if (text.replace(/[^a-z]/gi, '').length < 4) return;
  seen.add(id);
  jobs.push({ id, voice, raw, h: textHash(raw), text, group });
}
function npcLine(id, raw, npc, group) {
  const q = quoted(raw);
  // The character's voice only when the line opens with their words; "X said: '...'" stays with the narrator.
  if (q && npc && VOICE_OF[npc] && /^\s*["“]/.test(raw)) add(id, VOICE_OF[npc], raw, group, q);
  else add(id, NARRATOR, raw, group);
}

const dayOfLesson = {};
for (const d of DAYS) {
  if (d.lesson) dayOfLesson[d.lesson] = d.n;
  add(`brief:${d.n}`, NARRATOR, d.brief, d.n);
}
for (const [lid, L] of Object.entries(LESSONS)) {
  const g = dayOfLesson[lid] || 0;
  (L.parts || []).forEach((p, i) => { if (p.type === 'teach') add(`teach:${lid}:${i}`, NARRATOR, [/[.?!:]$/.test(p.h) ? p.h : p.h + '.', ...(p.body || [])].join(' '), g); });
}
for (const s of SCENARIOS) {
  const g = s.day;
  add(`set:${s.id}`, NARRATOR, s.setting, g);
  npcLine(`cue:${s.id}`, s.cue, s.npc, g);
  if (s.model) add(`model:${s.id}`, NARRATOR, s.model, g);
  (s.beats || []).forEach((b, i) => { if (b.line) (b.narr ? add(`beat:${s.id}:${i}`, NARRATOR, b.line, g) : npcLine(`beat:${s.id}:${i}`, b.line, b.speaker || s.npc, g)); });
  const deep = DEEP[s.id];
  if (deep) {
    add(`you:${s.id}`, NARRATOR, deep.you, g);
    (deep.follow || []).forEach((f, i) => {
      add(`fq:${s.id}:${i}`, VOICE_OF[f.by || s.npc] || NARRATOR, f.q, g, quoted(f.q) || f.q);
      add(`fa:${s.id}:${i}`, NARRATOR, f.a, g);
    });
  }
}
// The script library is read by the narrator, in its own sprite (group 0).
for (const it of SCRIPTS) add(`script:${it.id}`, NARRATOR, it.text, 0);
writeFileSync(new URL('./jobs.json', import.meta.url), JSON.stringify(jobs, null, 0));
const words = jobs.reduce((n, j) => n + j.text.split(/\s+/).length, 0);
console.log(jobs.length, 'clips,', words, 'words, about', Math.round(words / 150), 'minutes of audio');
