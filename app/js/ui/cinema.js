// A framed Remotion moment with Replay and Skip. Reduced motion shows the final still frame instead.
import { h, reducedMotion } from '../dom.js';
import { playCine } from '../cine/index.jsx';

const live = new Set();

/** Let other modules register a mounted player so route changes unmount it. */
export function trackCine(ctl) { live.add(ctl); }

export function stopAllCine() {
  for (const c of live) c.unmount();
  live.clear();
}

/** kind: opening | day | promotion | recap. Returns the element to insert. */
export function cinema(kind, props, { label, onEnded } = {}) {
  const host = h('div', { class: 'cine', role: 'img', 'aria-label': label || 'Animated scene' });
  const still = reducedMotion();
  let ctl = null;
  const start = (asStill) => {
    if (ctl) { ctl.unmount(); live.delete(ctl); }
    host.replaceChildren();
    ctl = playCine(host, kind, props, { still: asStill, onEnded });
    live.add(ctl);
  };
  const replay = h('button', { class: 'btn ghost small', type: 'button', text: 'Replay', onclick: () => start(false) });
  const skip = h('button', { class: 'btn ghost small', type: 'button', text: 'Skip to the end', onclick: () => { start(true); onEnded?.(); } });
  const el = h('figure', { class: 'stack', style: { margin: 0, gap: '8px' } }, host, h('div', { class: 'row', style: { justifyContent: 'flex-end' } }, still ? null : skip, replay));
  // Mount after insertion so the Player can measure its box.
  requestAnimationFrame(() => start(still));
  return el;
}
