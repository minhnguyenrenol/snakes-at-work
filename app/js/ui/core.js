// Shared UI state and helpers: the live save, persistence, name filling, toasts, dialogs, speech.
import { h, clear, animate } from '../dom.js';
import { derive } from '../engine/game.js';
import { dayOrdinal } from '../engine/srs.js';
import { fill } from '../engine/text.js';
import { NPCS, NPC_IDS, displayName } from '../content/index.js';
import { setSound, setAmbience } from './sound.js';
import { icon } from './art.js';

export const app = {
  save: null,
  store: null,
  caps: { sample: null, downloads: null },
  render: () => {},
};

export const today = () => dayOrdinal();
export const ctx = () => ({ me: app.save.player.name, names: app.save.settings.names });
/** Fill name tokens for display. */
export const F = str => fill(str, ctx());
export const D = () => derive(app.save, NPC_IDS);
/** Fill for anything sent to Claude: the fictional names, never the private relabels. */
export const FN = str => fill(str, { me: app.save.player.name, names: {} });

export function npcName(id, short = false) {
  const custom = app.save.settings.names?.[id];
  if (custom && custom.trim()) return custom.trim();
  const n = NPCS[id];
  if (!n) return id;
  return short ? n.short : displayName(id, app.save.settings.names);
}

/** Record a change: bump revision, mark today as practised, persist locally and to the db. */
export function persist() {
  const s = app.save;
  s.updatedAt = Date.now();
  s.rev += 1;
  const t = today();
  if (!s.practised.includes(t)) s.practised.push(t);
  app.store.save(s);
}

export function go(hash) {
  if (location.hash === '#' + hash) app.render();
  else location.hash = hash;
}

export function applySettings() {
  const st = app.save.settings;
  const root = document.documentElement;
  if (st.theme === 'system') delete root.dataset.theme; else root.dataset.theme = st.theme;
  if (st.motion === 'system') delete root.dataset.motion; else root.dataset.motion = st.motion;
  document.body.classList.toggle('dyslexia', !!st.dyslexia);
  setSound(st.sound, st.vol?.sfx);
  setAmbience(st.amb && st.sound !== false, st.vol?.amb);
}

export const aiOn = () => !!(app.save.settings.ai && app.caps.sample);

// ---------------- toasts ----------------
let toastHost = null;
export function toast(msg, ms = 2600) {
  if (!toastHost) {
    toastHost = h('div', { class: 'toasts', role: 'status', 'aria-live': 'polite' });
    document.body.append(toastHost);
  }
  const t = h('div', { class: 'toast', text: msg });
  toastHost.append(t);
  animate(t, [{ transform: 'translateY(10px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260 });
  setTimeout(() => { animate(t, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 }).finished.then(() => t.remove()); }, ms);
}

// ---------------- dialog (in-page; no alert/confirm/prompt) ----------------
export function dialog({ title, body, actions = [{ label: 'Close', value: null }] }) {
  return new Promise(resolve => {
    const prev = document.activeElement;
    const titleId = 'dlg' + Math.random().toString(36).slice(2, 8);
    const close = v => { back.remove(); document.removeEventListener('keydown', onKey, true); prev?.focus?.(); resolve(v); };
    const btns = actions.map(a => h('button', { class: 'btn ' + (a.kind || 'ghost'), onclick: () => close(typeof a.value === 'function' ? a.value() : a.value), text: a.label }));
    const box = h('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId },
      h('h2', { id: titleId, text: title }),
      body instanceof Node ? body : body ? h('p', { text: body }) : null,
      h('div', { class: 'row', style: { justifyContent: 'flex-end' } }, btns));
    const back = h('div', { class: 'dialog-back', onclick: e => { if (e.target === back) close(null); } }, box);
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(null); }
      if (e.key === 'Tab') {
        const f = [...box.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])')].filter(x => !x.disabled);
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    }
    document.addEventListener('keydown', onKey, true);
    document.body.append(back);
    animate(box, [{ transform: 'translateY(12px) scale(.98)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 240 });
    (box.querySelector('input, textarea') || btns[btns.length - 1])?.focus();
  });
}

// ---------------- speech (optional read-aloud of NPC lines) ----------------
export function say(text, { force = false } = {}) {
  if ((!force && !app.save.settings.voice) || !('speechSynthesis' in window) || !text) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/[“”"]/g, ''));
    u.rate = 1.02; u.lang = 'en-AU'; u.volume = Math.max(0, Math.min(1, app.save.settings.vol?.voice ?? 0.9));
    speechSynthesis.speak(u);
  } catch { /* optional */ }
}

export function stopSpeech() { try { speechSynthesis?.cancel(); } catch { /* ignore */ } }

// ---------------- small builders ----------------
export function page(main, ...kids) { clear(main); main.append(...kids.flat().filter(Boolean)); return main; }

export function sectionHead(title, sub, ...right) {
  return h('header', null, h('div', { class: 'stack', style: { gap: '4px' } }, h('h1', { class: 'h2', text: title }), sub ? h('p', { class: 'muted', text: sub }) : null), right.length ? h('div', { class: 'row' }, right) : null);
}

export function fxChips(fx) {
  const STAT_NAMES = { trust: 'Trust', cred: 'Credibility', vis: 'Visibility', deliv: 'Delivery', pol: 'Political capital', energy: 'Energy', craft: 'Craft' };
  return Object.entries(fx || {}).filter(([, v]) => v).map(([k, v]) => {
    const label = STAT_NAMES[k] || npcName(k, true);
    return h('span', { class: 'delta float-up ' + (v > 0 ? 'up' : 'down') }, icon(v > 0 ? 'up' : 'down', 14), `${v > 0 ? '+' : '-'}${Math.abs(v)} ${label}`);
  });
}

/** A drawn check or open mark with screen-reader text (never colour alone). */
export function mark(ok, label) {
  const el = h('span', { class: 'mk ' + (ok ? 'ok-ic' : 'no-ic') }, icon(ok ? 'check' : 'ring', 16));
  if (label) el.append(h('span', { class: 'sr', text: label }));
  return el;
}

export { NPC_IDS };
