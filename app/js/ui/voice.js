// Recorded narration: per-day MP3 sprites published next to the page, sliced into Blob URLs on demand.
// Every line falls back to the browser's voice when a clip is missing, stale (text changed) or audio is unavailable.
import { textHash } from '../content/voices.js';
import { app, say, stopSpeech, F } from './core.js';
import { duck } from './sound.js';
import { h } from '../dom.js';
import { icon } from './art.js';

let index = null;          // { files, clips: { id: [group, off, len, dur, env, sents, h] } }
let indexP = null;
const sprites = new Map(); // group -> Promise<ArrayBuffer>
const urls = new Map();    // id -> blob URL
let player = null;
let current = null;        // { id, resolve }
const listeners = new Set();

export function loadIndex() {
  if (indexP) return indexP;
  indexP = fetch('audio/index.json', { credentials: 'same-origin' })
    .then(r => (r.ok ? r.json() : null))
    .then(j => { index = j && j.clips ? j : { files: {}, clips: {} }; return index; })
    .catch(() => { index = { files: {}, clips: {} }; return index; });
  return indexP;
}

/** Clip metadata when a fresh recording exists for this raw template, else null. */
export function clipInfo(id, raw) {
  const c = index?.clips?.[id];
  if (!c) return null;
  if (raw != null && c[6] !== textHash(raw)) return null;
  // Recordings say the story name; a renamed player hears the device voice where their name is spoken.
  if (raw != null && /\{me\}/.test(raw) && app.save.player.name.trim().toLowerCase() !== 'minh') return null;
  return { id, group: c[0], dur: c[3], env: c[4], sents: c[5] };
}

function sprite(group) {
  if (!sprites.has(group)) {
    const name = index.files[group];
    const p = fetch('audio/' + name, { credentials: 'same-origin' }).then(r => { if (!r.ok) throw new Error('audio ' + r.status); return r.arrayBuffer(); });
    p.catch(() => sprites.delete(group));
    sprites.set(group, p);
  }
  return sprites.get(group);
}

/** Blob URL for a recorded clip, or null. */
export async function clipUrl(id, raw) {
  await loadIndex();
  const info = clipInfo(id, raw);
  if (!info) return null;
  if (urls.has(id)) return urls.get(id);
  try {
    const c = index.clips[id];
    const buf = await sprite(c[0]);
    const url = URL.createObjectURL(new Blob([buf.slice(c[1], c[1] + c[2])], { type: 'audio/mpeg' }));
    urls.set(id, url);
    return url;
  } catch { return null; }
}

export const vol = kind => {
  const v = app.save.settings.vol?.[kind];
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : kind === 'amb' ? 0.35 : 0.9;
};

export function onVoice(fn) { listeners.add(fn); return () => listeners.delete(fn); }
const emit = (state, id) => { duck(state === 'play'); for (const fn of listeners) { try { fn(state, id); } catch { /* listener */ } } };

let gen = 0;

export function stopVoice() {
  gen++;
  if (player) { try { player.pause(); } catch { /* ignore */ } }
  if (current) { const c = current; current = null; c.resolve(false); emit('stop', c.id); }
  stopSpeech();
}

/**
 * Speak one line. id is the recorded clip id, raw the content template (checked against the recording),
 * fallback the filled text for the device voice. Resolves true when it played to the end.
 * force: an explicit Listen press; plays even when "Read lines aloud" is off and falls back to the device voice.
 */
export function speak(id, raw, opts = {}) {
  if (!opts.force && !app.save.settings.voice) return Promise.resolve(false);
  stopVoice();
  return play(id, raw, opts, gen);
}

async function play(id, raw, { fallback, force = false } = {}, my) {
  const url = await clipUrl(id, raw);
  if (my !== gen) return false;
  // Only recorded lines play on their own; the device voice is a fallback for an explicit Listen press.
  if (!url) { if (force) say(fallback ?? F(raw), { force }); return false; }
  if (!player) player = new Audio();
  player.src = url;
  player.volume = vol('voice');
  return new Promise(resolve => {
    current = { id, resolve };
    const done = ok => { if (current?.id !== id) return; current = null; emit('end', id); resolve(ok); };
    player.onended = () => done(true);
    player.onerror = () => { done(false); if (force) say(fallback ?? F(raw), { force }); };
    emit('play', id);
    player.play().catch(() => done(false));
  });
}

export const playing = id => current?.id === id;

let chain = Promise.resolve();

/** Queue a line after whatever is playing now (a conversation keeps its order). stopVoice cancels the queue. */
export function enqueue(id, raw, opts = {}) {
  if (!opts.force && !app.save.settings.voice) return Promise.resolve(false);
  const my = gen;
  chain = chain.then(() => (my === gen ? play(id, raw, opts, my) : false)).catch(() => false);
  return chain;
}

/** Play several lines in a row (setting, then the cue), replacing anything playing. */
export function speakSeq(lines, opts = {}) {
  stopVoice();
  chain = Promise.resolve();
  let p = chain;
  for (const [id, raw] of lines) p = enqueue(id, raw, opts);
  return p;
}

/** A small Listen / Stop toggle for one line. Shows only when a recording exists or the device can speak. */
export function listenBtn(id, raw, { label = 'Listen', fallback } = {}) {
  const txt = h('span', { text: label });
  const b = h('button', { class: 'btn ghost small listen', type: 'button', 'aria-pressed': 'false' }, icon('speaker', 16), txt);
  const set = on => { b.setAttribute('aria-pressed', String(on)); txt.textContent = on ? 'Stop' : label; b.classList.toggle('on', on); };
  b.onclick = () => {
    if (playing(id)) { stopVoice(); return; }
    speak(id, raw, { force: true, fallback });
  };
  const off = onVoice((state, who) => { if (!b.isConnected) { off(); return; } set(state === 'play' && who === id); });
  loadIndex().then(() => { if (!clipInfo(id, raw) && !('speechSynthesis' in window)) b.hidden = true; });
  return b;
}
