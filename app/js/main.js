// Shell, navigation and routing. Hash routes are bare tokens: #today, #day-3, #scn-d1_first, #review-boss_lunch, #npc-ethan.
import { h, clear } from './dom.js';
import { createStore, newer } from './store.js';
import { app, applySettings, go, stopSpeech } from './ui/core.js';
import { stopVoice, loadIndex } from './ui/voice.js';
import { ambience } from './ui/sound.js';
import { venomChip, den } from './ui/snakes.js';
import { study } from './ui/study.js';
import { atlas, sheet, practiceOpts, scriptLibrary, dossier, lessons, drillPage } from './ui/atlas.js';
import { icon } from './ui/art.js';
import { stopAllCine } from './ui/cinema.js';
import { home, people, progress, library, portfolio } from './ui/views.js';
import { runDay, openReview, freeDojo } from './ui/day.js';
import { runScenario } from './ui/scenario.js';
import { more, settings, coach, ending } from './ui/more.js';
import { SCN_BY_ID, NPCS, LEVELS, levelTitle, MAX_DAY } from './content/index.js';
import { currentDay } from './engine/game.js';

const NAV = [
  ['today', 'today', 'Today'],
  ['atlas', 'map', 'Atlas'],
  ['people', 'people', 'People'],
  ['progress', 'chart', 'Progress'],
  ['library', 'library', 'Library'],
  ['portfolio', 'cards', 'Portfolio'],
  ['coach', 'coach', 'Coach'],
  ['settings', 'gear', 'Settings'],
];
const BOTNAV = [['today', 'today', 'Today'], ['atlas', 'map', 'Atlas'], ['people', 'people', 'People'], ['progress', 'chart', 'Progress'], ['more', 'more', 'More']];
const SECTION_OF = { day: 'today', scn: 'library', review: 'today', dojo: 'library', npc: 'people', ending: 'today', sheet: 'atlas', practice: 'atlas', scripts: 'atlas', dossier: 'atlas', lessons: 'atlas', drill: 'atlas', study: 'atlas', den: 'today' };

let mainEl, whereEl, syncEl, navEls = [];

function shell() {
  const root = document.getElementById('app') || document.body.appendChild(h('div', { id: 'app' }));
  clear(root);
  root.className = 'app';
  whereEl = h('span', { class: 'where' });
  syncEl = h('span', { class: 'sync', title: 'Saved in this browser', role: 'img', 'aria-label': 'Saved in this browser' });
  const mark = h('span', { 'aria-hidden': 'true', style: { color: 'var(--marigold)', display: 'inline-flex' } }, icon('snake', 24));
  const nav = h('nav', { class: 'nav', 'aria-label': 'Main' }, NAV.map(([r, , label]) => h('button', { type: 'button', dataset: { r }, onclick: () => go(r), text: label })));
  const bot = h('nav', { class: 'botnav', 'aria-label': 'Main' }, BOTNAV.map(([r, ic, label]) => h('button', { type: 'button', dataset: { r }, onclick: () => go(r) }, icon(ic, 22), h('span', { text: label }))));
  mainEl = h('main', { id: 'main', class: 'main', tabindex: '-1' });
  app.venom = venomChip();
  root.append(
    h('a', { href: '#main', class: 'sr', onclick: e => { e.preventDefault(); mainEl.focus(); }, text: 'Skip to content' }),
    h('header', { class: 'topbar' }, h('button', { class: 'wordmark', type: 'button', onclick: () => go('today'), 'aria-label': 'Snakes at Work, Rắn công sở, home' }, mark, h('span', { class: 'wm-text' }, h('span', { text: 'Snakes at Work' }), h('small', { lang: 'vi', text: 'Rắn công sở' }))), whereEl, h('span', { class: 'spacer' }), nav, app.venom.el, syncEl),
    mainEl, bot);
  navEls = [...nav.children, ...bot.children];
}

function setWhere() {
  const s = app.save;
  const day = Math.min(currentDay(s, MAX_DAY), MAX_DAY);
  whereEl.textContent = `Day ${day}, Floor ${LEVELS[s.level].floor}, ${levelTitle(s.level, s.branch)}`;
}

function render() {
  stopAllCine();
  stopSpeech();
  stopVoice();
  ambience('river');
  document.querySelectorAll('.lift').forEach(x => x.remove());
  const raw = (location.hash || '#today').slice(1);
  const token = /^[a-z0-9_-]{1,64}$/i.test(raw) ? raw : 'today';
  const dash = token.indexOf('-');
  const kind = dash > 0 ? token.slice(0, dash) : token;
  const arg = dash > 0 ? token.slice(dash + 1) : '';
  const section = SECTION_OF[kind] || kind;
  for (const b of navEls) {
    const on = b.dataset.r === section || (section === 'library' && b.dataset.r === 'more' && !BOTNAV.some(x => x[0] === 'library'));
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  }
  setWhere();
  app.venom?.draw();
  const main = mainEl;
  switch (kind) {
    case 'day': runDay(main, Math.max(1, Math.min(MAX_DAY, parseInt(arg, 10) || 1))); break;
    case 'scn': {
      const scn = SCN_BY_ID[arg];
      if (!scn) { home(main); break; }
      if (scn.boss) { openReview(main, scn); break; }
      const reached = Math.min(currentDay(app.save, MAX_DAY), MAX_DAY);
      if (scn.day > reached && !app.save.scn[arg]) { library(main); break; }
      runScenario(main, scn, { day: reached, onDone: () => go('library'), onExit: () => go('library') });
      break;
    }
    case 'review': { const scn = SCN_BY_ID[arg]; if (scn?.boss && app.save.days[scn.day]) openReview(main, scn); else home(main); break; }
    case 'dojo': freeDojo(main); break;
    case 'atlas': atlas(main, arg); break;
    case 'sheet': sheet(main, arg); break;
    case 'practice': {
      const scn = SCN_BY_ID[arg];
      if (!scn) { atlas(main); break; }
      const o = practiceOpts(arg);
      if (scn.boss) o.practice = true; // reviews only count from Today, where their gate is checked
      runScenario(main, scn, o);
      break;
    }
    case 'scripts': scriptLibrary(main); break;
    case 'dossier': dossier(main, arg); break;
    case 'lessons': lessons(main, arg.toUpperCase()); break;
    case 'drill': drillPage(main); break;
    case 'study': study(main); break;
    case 'den': den(main); break;
    case 'people': people(main); break;
    case 'npc': people(main, NPCS[arg] ? arg : null); break;
    case 'progress': progress(main); break;
    case 'library': library(main); break;
    case 'portfolio': portfolio(main); break;
    case 'coach': coach(main); break;
    case 'settings': settings(main); break;
    case 'more': more(main); break;
    case 'ending': ending(main); break;
    default: home(main);
  }
  window.scrollTo({ top: 0 });
  const heading = main.querySelector('h1, h2');
  if (heading && document.activeElement === document.body) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
}

function boot() {
  document.documentElement.lang = 'en-AU';
  app.store = createStore({
    onStatus: s => {
      if (!syncEl) return;
      syncEl.classList.toggle('on', s === 'synced');
      const t = s === 'synced' ? 'Saved to your account' : 'Saved in this browser';
      syncEl.title = t; syncEl.setAttribute('aria-label', t);
    },
    onRemote: remote => {
      if (!newer(remote, app.save)) return;
      remote.settings.names = app.save.settings.names; // private relabels are local-only
      app.save = remote;
      app.store.cacheLocal(remote);
      applySettings();
      render();
    },
  });
  app.save = app.store.load();
  app.render = render;
  shell();
  applySettings();
  window.addEventListener('hashchange', render);
  render();
  app.store.connect();
  loadIndex();
  if (window.claude?.use) {
    window.claude.use('sample').then(x => { app.caps.sample = x || null; if (/coach|settings/.test(location.hash)) render(); }).catch(() => {});
    window.claude.use('downloads').then(x => { app.caps.downloads = x || null; }).catch(() => {});
  }
  try { window.claude?.hot?.snapshot?.(() => ({ route: location.hash })); } catch { /* optional */ }
}

const start = data => {
  if (data && typeof data.route === 'string' && /^#[a-z0-9_-]{1,64}$/i.test(data.route) && !location.hash) history.replaceState(null, '', data.route);
  boot();
};
try {
  if (window.claude?.hot?.ready) window.claude.hot.ready(start);
  else start(window.claude?.hot?.data ?? {});
} catch { start({}); }
