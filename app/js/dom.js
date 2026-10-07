// Safe DOM builder. Text is always set through textContent; there is no innerHTML path for dynamic data.
const SVGNS = 'http://www.w3.org/2000/svg';

export function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  applyAttrs(el, attrs);
  append(el, kids);
  return el;
}

export function s(tag, attrs, ...kids) {
  const el = document.createElementNS(SVGNS, tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'text') el.textContent = v;
    else el.setAttribute(k, String(v));
  }
  append(el, kids);
  return el;
}

function applyAttrs(el, attrs) {
  if (!attrs) return;
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, String(v));
  }
}

function append(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    el.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
}

export function clear(el) { while (el.firstChild) el.firstChild.remove(); return el; }

export const $ = (sel, root = document) => root.querySelector(sel);

export function reducedMotion() {
  try {
    const m = document.documentElement.dataset.motion;
    if (m === 'reduced') return true;
    if (m === 'full') return false;
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch { return false; }
}

// Web Animations helper that respects reduced motion and never leaves content hidden.
export function animate(el, frames, opts) {
  if (!el || !el.animate || reducedMotion()) return { finished: Promise.resolve() };
  try { return el.animate(frames, { fill: 'none', easing: 'cubic-bezier(.2,.7,.2,1)', ...opts }); }
  catch { return { finished: Promise.resolve() }; }
}

export function wait(ms) { return new Promise(r => setTimeout(r, reducedMotion() ? Math.min(ms, 60) : ms)); }

// Typewriter for NPC lines; returns when finished. Clicking skips.
export async function typewrite(el, text, cps = 55) {
  el.textContent = '';
  if (reducedMotion() || !text) { el.textContent = text || ''; return; }
  let skip = false;
  const onSkip = () => { skip = true; };
  el.addEventListener('click', onSkip, { once: true });
  for (let i = 0; i < text.length; i++) {
    if (skip || !el.isConnected) break;
    el.textContent = text.slice(0, i + 1);
    await new Promise(r => setTimeout(r, 1000 / cps));
  }
  el.textContent = text;
}
