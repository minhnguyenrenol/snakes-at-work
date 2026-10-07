// Rắn công sở in the interface: snake portraits, the venom meter, the films after a scene, and the snake den.
import { h, s, clear, reducedMotion } from '../dom.js';
import { app, F, go, persist, npcName, sectionHead } from './core.js';
import { portrait, icon } from './art.js';
import { cue } from './sound.js';
import { playCine } from '../cine/index.jsx';
import { SFX } from '../cine/snakes.jsx';
import { snakeTree, renderTree, PLAYER_LOOK, OFFICE_LOOK } from '../cine/snake-art.js';
import { snakeState, snakeDiff, PLAYER_AT, SHED_AT } from '../engine/snakes.js';
import { NPCS, SCN_BY_ID, PLACES, MAX_DAY } from '../content/index.js';
import { currentDay } from '../engine/game.js';

export const snakesOn = () => app.save.settings.snakes !== false;
export const lookOf = id => (id === 'office' ? OFFICE_LOOK : id === 'me' ? PLAYER_LOOK : NPCS[id]?.look || OFFICE_LOOK);
export const nameOf = id => (id === 'office' ? 'The office snake' : npcName(id, true));

/** Current snake state for the live save. */
export function snakes() { return snakeState(app.save, SCN_BY_ID, app.save.snakeForm === 'snake'); }
export function isSnake(npc) { return snakesOn() && !!snakes().snakes[npc]; }

let uid = 0;
/** A snake portrait as DOM SVG (drop-in for portrait()). */
export function snakeArt(id, { title, mouth = 0, tongue = 0 } = {}) {
  const tree = snakeTree(lookOf(id), { id: 'u' + (++uid), title: title || `${nameOf(id)}, as an office snake`, mouth, tongue });
  const el = renderTree(tree, (tag, a, ...k) => s(tag, a, ...k));
  el.classList.add('snake-art');
  return el;
}

/** The small venom meter for the top bar: drops filled out of four; opens the snake den. */
export function venomChip() {
  const btn = h('button', { class: 'venom-chip', type: 'button', onclick: () => go('den') });
  const draw = () => {
    clear(btn);
    btn.hidden = !snakesOn();
    const st = snakes();
    const drops = h('span', { class: 'drops', 'aria-hidden': 'true' }, Array.from({ length: PLAYER_AT }, (_, i) => h('i', { class: i < st.venom ? 'on' : '' })));
    const label = st.player === 'snake' ? 'You are a snake' : `Venom ${Math.min(st.venom, PLAYER_AT)}/${PLAYER_AT}`;
    btn.append(icon('snake', 18), drops, h('span', { class: 'vlabel', text: label }));
    btn.setAttribute('aria-label', `${label}. ${Object.keys(st.snakes).length} stakeholders are snakes. Open the snake den.`);
    btn.classList.toggle('is-snake', st.player === 'snake');
    btn.classList.toggle('scaly', st.player === 'scaly');
    document.body.classList.toggle('snake-mode', snakesOn() && st.player === 'snake');
  };
  draw();
  return { el: btn, draw };
}

// ---------------- the films ----------------

function film(kind, props, label) {
  return new Promise(resolve => {
    const still = reducedMotion();
    const tall = innerWidth < 640;
    const host = h('div', { class: 'cine snakefilm' + (tall ? ' tall' : ''), role: 'img', 'aria-label': label });
    const live = h('p', { class: 'sr', 'aria-live': 'assertive', text: label });
    let ctl = null, fired = new Set();
    const done = () => { ctl?.unmount(); wrap.remove(); document.removeEventListener('keydown', onKey, true); resolve(); };
    const next = h('button', { class: 'btn lacquer', type: 'button', text: 'Continue', onclick: done });
    const onKey = e => { if (e.key === 'Escape') { e.preventDefault(); done(); } };
    const wrap = h('div', { class: 'lift open snake-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': label },
      h('div', { class: 'panelx' }, host, live, h('div', { class: 'row', style: { justifyContent: 'center' } }, next)));
    document.body.append(wrap);
    document.addEventListener('keydown', onKey, true);
    next.focus();
    const sfx = SFX[kind] || [];
    if (still) for (const [, n] of sfx.slice(0, 2)) cue(n);
    requestAnimationFrame(() => {
      ctl = playCine(host, kind, { ...props, tall }, {
        still,
        onFrame: f => { for (const [at, n] of sfx) if (f >= at && !fired.has(at)) { fired.add(at); cue(n); } },
      });
    });
  });
}

const portraitHtml = (id, expr = 'neutral') => portrait(lookOf(id), expr, { breathe: false }).outerHTML;

/**
 * Run after a scene is committed: strike films for new failures, a charm film for a redeemed snake,
 * then becoming or shedding when your own form changes. before/after are snakeState results.
 */
export async function snakeAftermath(scn, before, after, { practice = false, failed = false, bait = null } = {}) {
  if (!snakesOn()) return;
  const pal = (PLACES[scn.place] || PLACES.desk).pal;
  const trap = scn.trap && bait ? `${scn.trap.sin} · ${scn.trap.vi}` : '';
  if (practice) {
    if (!failed) return;
    const id = scn.npc || 'office';
    await film('strike', { portrait: portraitHtml(id), look: lookOf(id), name: nameOf(id), pal, venomBefore: before.venom, venomAfter: before.venom, max: PLAYER_AT, practice: true, trap }, `${nameOf(id)} turned into a snake and hissed. Practice run, no venom.`);
    return;
  }
  const d = snakeDiff(before, after);
  for (const f of d.struck.filter(x => x.id === scn.id)) {
    await film('strike', { portrait: portraitHtml(f.npc), look: lookOf(f.npc), name: nameOf(f.npc), pal, venomBefore: before.venom, venomAfter: after.venom, max: PLAYER_AT, trap }, `${nameOf(f.npc)} turned into a snake and struck. Venom ${after.venom} of ${PLAYER_AT}.`);
  }
  for (const f of d.charmed.filter(x => x.id === scn.id)) {
    if (after.snakes[f.npc]) continue; // still a snake over another scene
    await film('charm', { portrait: portraitHtml(f.npc, 'smile'), look: lookOf(f.npc), name: nameOf(f.npc) }, `${nameOf(f.npc)} is human again.`);
  }
  const me = app.save.player.name;
  if (d.became || (after.player === 'snake' && app.save.snakeForm !== 'snake')) {
    app.save.snakeForm = 'snake'; persist();
    await film('become', { portrait: portraitHtml('me'), name: me, max: PLAYER_AT }, `You became an office snake. Shed your skin by charming stakeholders back until ${SHED_AT} drop of venom or fewer is left.`);
  } else if (app.save.snakeForm === 'snake' && after.venom <= SHED_AT) {
    app.save.snakeForm = 'human'; persist();
    await film('shed', { portrait: portraitHtml('me', 'smile'), name: me }, 'You shed your skin. Human again.');
  }
}

// ---------------- the snake den ----------------

export function den(main) {
  const st = snakes();
  const reached = Math.min(currentDay(app.save, MAX_DAY), MAX_DAY);
  const meForm = st.player;
  const me = h('section', { class: 'den-me panel' },
    h('div', { class: 'den-me-art' }, meForm === 'snake' ? snakeArt('me', { title: 'You, as an office snake', tongue: 0.6 }) : portrait(PLAYER_LOOK, meForm === 'scaly' ? 'skeptic' : 'warm', { title: 'You' })),
    h('div', { class: 'stack', style: { gap: '8px' } },
      h('h2', { class: 'h3', text: meForm === 'snake' ? 'You are an office snake' : meForm === 'scaly' ? 'Scales are showing' : 'Still human' }),
      h('div', { class: 'drops big', role: 'img', 'aria-label': `Venom ${st.venom} of ${PLAYER_AT}` }, Array.from({ length: PLAYER_AT }, (_, i) => h('i', { class: i < st.venom ? 'on' : '' }))),
      h('p', { text: meForm === 'snake'
        ? `${st.venom} drops of venom. Charm stakeholders back until ${SHED_AT} or fewer remain and you shed your skin.`
        : st.venom ? `${st.venom} of ${PLAYER_AT} drops. At ${PLAYER_AT} you become a snake yourself. Each scene below, replayed at B or better, takes one drop away.`
          : 'No venom. Every stakeholder is human. A grade of C or D, or taking the bait in a snake trap, turns someone into a snake.' })));
  const list = Object.entries(st.snakes).map(([npc, ids]) => h('li', { class: 'den-snake' },
    h('div', { class: 'den-art' }, snakeArt(npc)),
    h('div', { class: 'stack', style: { gap: '6px' } },
      h('b', { text: nameOf(npc) }),
      h('span', { class: 'muted', text: NPCS[npc] ? F(NPCS[npc].role) : 'Anyone, really' }),
      h('ul', { class: 'den-scenes' }, ids.map(id => {
        const scn = SCN_BY_ID[id];
        const g = app.save.scn[id]?.att?.slice(-1)[0]?.g;
        return h('li', null, h('span', null, F(scn.title), h('span', { class: 'muted', text: ` · Day ${scn.day}, last grade ${g}${scn.trap ? `, ${scn.trap.sin} trap` : ''}` })),
          h('button', { class: 'btn small', type: 'button', disabled: scn.boss && !app.save.days[scn.day], onclick: () => go((scn.boss ? 'review-' : 'scn-') + id), text: 'Charm them back' }));
      })))));
  clear(main);
  main.append(h('div', { class: 'section den', style: { maxWidth: '900px', margin: '0 auto' } },
    sectionHead('The snake den', 'Hang rắn. Who has turned into a snake, why, and the replay that turns them back.'),
    me,
    list.length ? h('ul', { class: 'den-list' }, list) : h('div', { class: 'panel' }, h('p', { class: 'muted', text: `No snakes yet. Keep it that way: on Day ${reached}, answer first, give credit, and walk away from the gossip.` })),
    h('details', { class: 'panel' }, h('summary', { text: 'How snakes work' }),
      h('ul', { class: 'checklist', style: { marginTop: '10px' } }, [
        'A grade of C or D turns the stakeholder in that scene into a snake, and you take one drop of venom.',
        'Snake traps tempt you with gossip, stolen credit, blame and other office politics. The tempting answer always looks clever. Take the bait and you get bitten.',
        `At ${PLAYER_AT} drops you become an office snake yourself.`,
        'Replay a scene at B or better and that stakeholder is charmed back to human, one drop lighter.',
        `When ${SHED_AT} drop or fewer is left, a snake sheds its skin.`,
        'Snakes never block your story. They are a mirror, and you can turn them off in Settings.',
      ].map(t => h('li', { text: t }))))));
}
