// WebAudio cues and generative room ambience. Never essential: every cue has a visual twin,
// and ambience is a quiet bed under each place (river at the tower, murmur in the café, hum in the lift).
let ctx = null;
let enabled = false;
let sfxVol = 0.6;
let ambOn = false;
let ambVol = 0.35;
let master = null;   // cue bus
let ambBus = null;   // ambience bus
let bed = null;      // { place, out, stop }
let wantPlace = null;

export function setSound(on, v) {
  enabled = !!on;
  if (Number.isFinite(v)) sfxVol = Math.max(0, Math.min(1, v));
  if (master) master.gain.value = sfxVol;
}

export function setAmbience(on, v) {
  ambOn = !!on;
  if (Number.isFinite(v)) ambVol = Math.max(0, Math.min(1, v));
  if (ambBus && ctx) ambBus.gain.setTargetAtTime(ambOn ? ambVol * 0.5 : 0, ctx.currentTime, 0.4);
  if (!ambOn) stopBed();
  else if (wantPlace && ctx) ambience(wantPlace);
}

function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { ctx = new C(); } catch { return null; }
    master = ctx.createGain(); master.gain.value = sfxVol; master.connect(ctx.destination);
    ambBus = ctx.createGain(); ambBus.gain.value = ambOn ? ambVol * 0.5 : 0; ambBus.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function tone(freq, start, dur, type = 'sine', gain = 0.06, out) {
  const a = ac();
  if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq;
  const t = a.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out || master);
  o.start(t); o.stop(t + dur + 0.05);
}

// A three-note motif (pentatonic, a nod to Vietnamese đàn bầu phrasing) and a few small cues.
const CUES = {
  motif: () => { tone(392, 0, 0.5, 'triangle'); tone(440, 0.18, 0.5, 'triangle'); tone(587.3, 0.36, 0.9, 'triangle'); },
  select: () => tone(660, 0, 0.12, 'sine', 0.04),
  good: () => { tone(523.3, 0, 0.25, 'triangle'); tone(784, 0.1, 0.4, 'triangle'); },
  soft: () => tone(330, 0, 0.3, 'sine', 0.05),
  stamp: () => { tone(110, 0, 0.18, 'square', 0.04); tone(220, 0.02, 0.2, 'triangle', 0.05); },
  lift: () => { tone(523.3, 0, 0.6, 'sine'); tone(659.3, 0.25, 0.8, 'sine'); },
  tick: () => tone(880, 0, 0.05, 'square', 0.02),
  reveal: () => { tone(587.3, 0, 0.35, 'triangle', 0.035); tone(880, 0.09, 0.5, 'sine', 0.03); },
  page: () => tone(1046.5, 0, 0.08, 'sine', 0.018),
};

// ---------------- snake effects: playful, cartoon-sized, never harsh ----------------

/** A burst of filtered noise: the body of a hiss, a whoosh or a rattle grain. */
function noiseBurst({ start = 0, dur = 0.5, type = 'bandpass', freq = 5200, q = 1.2, gain = 0.08, sweep = null, attack = 0.03 } = {}) {
  const a = ac();
  if (!a) return;
  const len = Math.ceil(a.sampleRate * (dur + 0.05));
  const buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = a.createGain();
  const t = a.currentTime + start;
  if (sweep) { f.frequency.setValueAtTime(sweep[0], t); f.frequency.exponentialRampToValueAtTime(sweep[1], t + dur); }
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t); src.stop(t + dur + 0.05);
}

function slide(from, to, start, dur, type = 'sine', gain = 0.05) {
  const a = ac();
  if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type;
  const t = a.currentTime + start;
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + dur + 0.05);
}

Object.assign(CUES, {
  hiss: () => { noiseBurst({ dur: 0.9, freq: 6200, q: 1.6, gain: 0.07, attack: 0.12 }); noiseBurst({ start: 0.05, dur: 0.7, type: 'highpass', freq: 8000, q: 0.7, gain: 0.03, attack: 0.1 }); },
  rattle: () => { for (let i = 0; i < 14; i++) noiseBurst({ start: i * 0.045, dur: 0.035, freq: 3800 + (i % 3) * 600, q: 3, gain: 0.05, attack: 0.004 }); },
  slither: () => noiseBurst({ dur: 0.8, freq: 1800, q: 0.8, gain: 0.04, sweep: [900, 2600], attack: 0.2 }),
  strike: () => { noiseBurst({ dur: 0.22, freq: 2200, q: 0.9, gain: 0.09, sweep: [800, 5000], attack: 0.01 }); tone(92, 0.16, 0.32, 'sine', 0.14); tone(61, 0.17, 0.4, 'triangle', 0.08); },
  venom: () => { slide(880, 330, 0, 0.16, 'sine', 0.05); tone(196, 0.12, 0.3, 'triangle', 0.04); },
  transform: () => { slide(220, 1320, 0, 1.1, 'triangle', 0.045); slide(330, 1760, 0.12, 1.0, 'sine', 0.025); noiseBurst({ start: 0.6, dur: 0.9, freq: 6000, q: 1.4, gain: 0.05, attack: 0.2 }); [523.3, 659.3, 784, 1046.5].forEach((f, i) => tone(f, 1.15 + i * 0.07, 0.4, 'triangle', 0.03)); },
  shed: () => { for (let i = 0; i < 10; i++) noiseBurst({ start: i * 0.06 + Math.random() * 0.03, dur: 0.05, freq: 2500 + Math.random() * 2500, q: 2, gain: 0.04, attack: 0.004 }); [784, 988, 1174.7, 1568].forEach((f, i) => tone(f, 0.7 + i * 0.09, 0.6, 'sine', 0.035)); },
  poof: () => { noiseBurst({ dur: 0.35, type: 'lowpass', freq: 900, q: 0.5, gain: 0.08, sweep: [1600, 300], attack: 0.01 }); slide(660, 990, 0.2, 0.25, 'sine', 0.04); tone(1318.5, 0.42, 0.3, 'sine', 0.03); },
});

export function cue(name) {
  if (!enabled) return;
  try { CUES[name]?.(); } catch { /* audio is optional */ }
}

// ---------------- ambience ----------------

function noise(a, kind = 'pink') {
  const len = a.sampleRate * 4;
  const buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    else { b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.16; }
  }
  const src = a.createBufferSource();
  src.buffer = buf; src.loop = true;
  return src;
}

function lfo(a, rate, depth, target) {
  const o = a.createOscillator(), g = a.createGain();
  o.frequency.value = rate; g.gain.value = depth;
  o.connect(g).connect(target);
  o.start();
  return o;
}

// Each recipe: noise colour, filter, level, slow swell, an optional mains hum, and a sparse texture (clinks, keys, drips).
const RECIPES = {
  river: { n: 'pink', f: ['bandpass', 420, 0.6], g: 0.5, swell: [0.09, 0.25] },
  desk: { n: 'brown', f: ['lowpass', 420, 0.7], g: 0.55, hum: 100, tex: { every: [0.6, 2.2], f: [1800, 2600], d: 0.03, g: 0.012 } },
  teams: { n: 'brown', f: ['lowpass', 300, 0.7], g: 0.35 },
  cafe: { n: 'pink', f: ['bandpass', 620, 0.9], g: 0.6, swell: [0.15, 0.3], tex: { every: [2, 6], f: [2600, 3400], d: 0.5, g: 0.012 } },
  lift: { n: 'brown', f: ['lowpass', 180, 0.8], g: 0.7, hum: 55 },
  pantry: { n: 'pink', f: ['bandpass', 520, 0.8], g: 0.45, tex: { every: [3, 8], f: [2200, 2800], d: 0.4, g: 0.01 } },
  meeting: { n: 'pink', f: ['highpass', 2400, 0.5], g: 0.14, hum: 120 },
  restaurant: { n: 'pink', f: ['bandpass', 560, 0.8], g: 0.7, swell: [0.12, 0.35], tex: { every: [1.5, 4.5], f: [2400, 3600], d: 0.45, g: 0.014 } },
  townhall: { n: 'pink', f: ['bandpass', 380, 0.7], g: 0.55, swell: [0.06, 0.3] },
  office: { n: 'pink', f: ['highpass', 2000, 0.5], g: 0.12, hum: 60 },
  melbourne: { n: 'pink', f: ['highpass', 900, 0.4], g: 0.5, swell: [0.05, 0.4], tex: { every: [0.2, 0.9], f: [3000, 5200], d: 0.02, g: 0.006 } },
  boardroom: { n: 'pink', f: ['highpass', 2600, 0.5], g: 0.1, hum: 60 },
  warroom: { n: 'brown', f: ['lowpass', 520, 0.7], g: 0.5, hum: 100, tex: { every: [0.4, 1.6], f: [1600, 2400], d: 0.03, g: 0.014 } },
};

function stopBed() {
  if (!bed || !ctx) { bed = null; return; }
  const b = bed; bed = null;
  const t = ctx.currentTime;
  b.out.gain.cancelScheduledValues(t);
  b.out.gain.setValueAtTime(b.out.gain.value, t);
  b.out.gain.linearRampToValueAtTime(0, t + 1.2);
  setTimeout(() => b.stop(), 1400);
}

/** Crossfade the room bed to a place (PLACES key, or 'river' for the tower). null stops it. */
export function ambience(place) {
  wantPlace = place;
  if (!place || !ambOn) { stopBed(); return; }
  // Browsers only start audio after a gesture; until then remember the place and start on the first one.
  if (!ctx && !gestured) return;
  const a = ac();
  if (!a) return;
  if (bed?.place === place) return;
  stopBed();
  const R = RECIPES[place] || RECIPES.desk;
  const out = a.createGain(); out.gain.value = 0; out.connect(ambBus);
  const src = noise(a, R.n);
  const f = a.createBiquadFilter(); f.type = R.f[0]; f.frequency.value = R.f[1]; f.Q.value = R.f[2];
  const level = a.createGain(); level.gain.value = R.g;
  src.connect(f).connect(level).connect(out);
  src.start();
  const stops = [() => src.stop()];
  if (R.swell) { const o = lfo(a, R.swell[0], R.g * R.swell[1], level.gain); stops.push(() => o.stop()); }
  if (R.hum) {
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sine'; o.frequency.value = R.hum; g.gain.value = 0.025;
    o.connect(g).connect(out); o.start(); stops.push(() => o.stop());
  }
  let timer = 0;
  if (R.tex) {
    const tick = () => {
      const [lo, hi] = R.tex.every;
      timer = setTimeout(() => {
        if (bed?.out !== out) return;
        tone(R.tex.f[0] + Math.random() * (R.tex.f[1] - R.tex.f[0]), 0, R.tex.d, 'sine', R.tex.g, out);
        tick();
      }, (lo + Math.random() * (hi - lo)) * 1000);
    };
    tick();
  }
  const t = a.currentTime;
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(1, t + 2.5);
  bed = { place, out, stop: () => { clearTimeout(timer); for (const s of stops) { try { s(); } catch { /* stopped */ } } try { out.disconnect(); } catch { /* gone */ } } };
}

let gestured = false;
if (typeof window !== 'undefined') {
  const first = () => { gestured = true; window.removeEventListener('pointerdown', first, true); window.removeEventListener('keydown', first, true); if (wantPlace && ambOn) ambience(wantPlace); };
  window.addEventListener('pointerdown', first, true);
  window.addEventListener('keydown', first, true);
}

/** Duck the room bed while someone speaks. */
export function duck(on) {
  if (!bed || !ctx) return;
  bed.out.gain.setTargetAtTime(on ? 0.35 : 1, ctx.currentTime, 0.25);
}
