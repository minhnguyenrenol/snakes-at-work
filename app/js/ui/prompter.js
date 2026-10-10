// The script prompter: for the moment you forget what to say. One switch, on every question and every follow-up.
import { h, clear } from '../dom.js';
import { app, persist } from './core.js';
import { icon } from './art.js';
import { cue } from './sound.js';
import { answerScripts } from './atlas.js';

export const prompterOn = () => app.save.settings.prompter === true;

/** A switch that flips the saved setting. onChange(on) lets the page react. */
export function prompterSwitch(onChange) {
  const btn = h('button', { class: 'btn ghost small prompt-switch', type: 'button' });
  const draw = () => {
    const on = prompterOn();
    btn.setAttribute('aria-pressed', String(on));
    clear(btn);
    btn.append(icon('script', 16), on ? 'Script prompter: on' : 'Script prompter: off');
  };
  btn.addEventListener('click', () => {
    app.save.settings.prompter = !prompterOn();
    persist();
    cue('select');
    draw();
    onChange?.(prompterOn());
  });
  draw();
  return btn;
}

/** The bar and script panel above a scene. used() is true once the script was on for this scene. */
export function prompterBar(scn) {
  const panel = h('section', { class: 'prompter-panel panel stack', hidden: true, 'aria-label': 'Script prompter' });
  let used = false, built = false;
  const show = on => {
    panel.hidden = !on;
    if (!on) return;
    used = true;
    if (built) return;
    built = true;
    panel.append(h('p', { class: 'muted', text: 'Read it, then say it in your own words. Using the script costs a little XP, never the grade.' }), answerScripts(scn));
  };
  const el = h('div', { class: 'stack prompter', style: { gap: '10px' } }, h('div', { class: 'row' }, prompterSwitch(show)), panel);
  show(prompterOn());
  return { el, used: () => used };
}
