// "Watch it spoken": a recorded line as a short Remotion film (portrait, voice ring, word-by-word captions).
// Reduced motion plays the audio with the transcript instead. No recording: the Listen button uses the device voice.
import { h, reducedMotion } from '../dom.js';
import { app, F, npcName } from './core.js';
import { portrait, icon } from './art.js';
import { NPCS, PLACES } from '../content/index.js';
import { playCine } from '../cine/index.jsx';
import { stopAllCine, trackCine } from './cinema.js';
import { loadIndex, clipInfo, clipUrl, listenBtn, stopVoice, vol } from './voice.js';

/**
 * A line with Listen and Watch controls.
 * who: npc id, or null for T+10 (the narrator voice). kind: 'ask' | 'answer' | 'line'.
 */
export function spokenLine({ id, raw, who = null, kind = 'line', place = 'desk', role, text }) {
  const shown = text ?? F(raw);
  const stageHost = h('div', { class: 'spoken-stage', hidden: true });
  const watch = h('button', { class: 'btn ghost small', type: 'button', hidden: true }, icon('film', 16), h('span', { text: 'Watch it spoken' }));
  const listen = listenBtn(id, raw, { fallback: shown });
  let ctl = null;
  const close = () => { ctl?.unmount(); ctl = null; stageHost.hidden = true; stageHost.replaceChildren(); watch.lastChild.textContent = 'Watch it spoken'; };
  watch.onclick = async () => {
    if (ctl) { close(); return; }
    stopVoice();
    stopAllCine();
    const info = clipInfo(id, raw);
    const src = info && await clipUrl(id, raw);
    if (!info || !src) return;
    const P = PLACES[place] || PLACES.desk;
    const npc = who && NPCS[who];
    const props = {
      portrait: npc ? portrait(npc.look, kind === 'answer' ? 'warm' : 'neutral', { breathe: false }).outerHTML : '',
      name: npc ? npcName(who) : kind === 'answer' ? 'T+10' : 'The story',
      role: role || (npc ? F(npc.role) : kind === 'answer' ? 'Your coach, ten years up the track' : 'Narrator'),
      mono: npc ? '' : kind === 'answer' ? 'T+10' : 'Story',
      pal: P.pal, env: info.env, sents: info.sents, dur: info.dur, src, kind, volume: vol('voice'),
    };
    props.tall = stageHost.parentElement.getBoundingClientRect().width < 560;
    const cine = h('div', { class: 'cine spoken' + (props.tall ? ' tall' : ''), role: 'img', 'aria-label': `${props.name} says: ${shown}` });
    stageHost.replaceChildren(cine);
    stageHost.hidden = false;
    watch.lastChild.textContent = 'Close the film';
    requestAnimationFrame(() => { ctl = playCine(cine, 'spoken', props, { still: false }); trackCine(ctl); });
  };
  loadIndex().then(() => { if (clipInfo(id, raw) && !reducedMotion()) watch.hidden = false; });
  return h('div', { class: 'spoken' }, h('div', { class: 'row' }, listen, watch), stageHost);
}

export { app };
