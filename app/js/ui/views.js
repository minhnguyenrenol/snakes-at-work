// Home (the tower), People (network map), Progress, Library and Portfolio.
import { snakes, snakesOn, isSnake, snakeArt } from './snakes.js';
import { h, s, clear, animate, reducedMotion } from '../dom.js';
import { app, F, D, persist, go, npcName, toast, dialog, sectionHead, today } from './core.js';
import { tower, portrait, icon, phaseNow } from './art.js';
import { stepLabel, bossPassed } from './day.js';
import { DAYS, DAY_BY_N, MAX_DAY, SCN_BY_ID, SCENARIOS, NPCS, NPC_IDS, SPONSOR_IDS, EVIDENCE, LEVELS, levelTitle, CARDS, unlockedCards } from '../content/index.js';
import { currentDay, daySteps, dayAvailable, STATS, STAT_KEYS, RUNGS, rung, askRung, dimTrend, gateStatus, totalXP } from '../engine/game.js';
import { DIMS, DIM_KEYS } from '../engine/rubric.js';
import { masteryOf } from '../engine/srs.js';

const RUNG_COLOR = { Cold: '#5E6E78', Wary: '#F08A72', Stranger: '#8EA5AE', Useful: '#6FA8C8', Trusted: '#5CC2A2', Mine: '#F2A93B' };

function statPanel(d) {
  return h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Your standing' }), h('div', { class: 'statgrid' }, STAT_KEYS.map(k => {
    const bar = h('i');
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transform = `scaleX(${d.stats[k] / 100})`; }));
    return h('div', { class: 'stat', title: STATS[k].note }, h('div', { class: 'lab' }, h('span', { text: STATS[k].name }), h('b', { class: 'num', text: d.stats[k] })), h('div', { class: 'bar ' + k, role: 'img', 'aria-label': `${STATS[k].name} ${d.stats[k]} of 100` }, bar));
  })));
}

// ---------------- home ----------------

const ROOM_ICON = { brief: 'sun', dojo: 'brain', lesson: 'book', slot: 'cup', evening: 'moon' };

/** Today's steps as rooms along a corridor (SimCity cutaway). */
function floorplan(steps, rec, stepIdx, cur) {
  const save = app.save;
  const plan = h('div', { class: 'floorplan', role: 'group', 'aria-label': 'Tonight on your floor' });
  steps.forEach((st, i) => {
    const id = st.split(':')[1];
    const scn = id && SCN_BY_ID[id];
    const r = id && save.scn[id];
    const done = !!rec && (rec.done || i < stepIdx);
    const now = !!rec && !rec.done && i === stepIdx || (!rec && i === 0);
    const ic = scn ? (scn.boss ? 'star' : scn.drill ? 'clock' : 'chat') : ROOM_ICON[st] || 'door';
    const kids = [
      h('span', { class: 'ri' }, icon(ic, 20)),
      h('span', { class: 'rt', text: stepLabel(st) }),
      r ? h('span', { class: 'rg', text: r.best.g, 'aria-label': `best grade ${r.best.g}` }) : h('span', { class: 'rn', text: scn?.boss ? 'Review' : done ? 'Done' : now ? 'Next' : '' }),
      h('span', { class: 'sr', text: done ? ', done' : now ? ', next' : '' }),
    ];
    const cls = 'room' + (done ? ' done' : '') + (now ? ' now' : '') + (scn?.boss ? ' boss' : '');
    const canOpen = now && (rec || dayAvailable(save, cur, today()).ok);
    const el = canOpen ? h('button', { class: cls, onclick: () => go('day-' + cur), 'aria-label': `Enter: ${stepLabel(st)}` }, kids)
      : done && scn ? h('button', { class: cls, onclick: () => go((scn.boss ? 'review-' : 'scn-') + id), 'aria-label': `Replay: ${stepLabel(st)}` }, kids)
      : h('div', { class: cls }, kids);
    plan.append(el);
  });
  if (!reducedMotion()) [...plan.children].forEach((el, i) => animate(el, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 40 * i, fill: 'backwards' }));
  requestAnimationFrame(() => plan.querySelector('.now')?.scrollIntoView?.({ block: 'nearest', inline: 'center' }));
  return plan;
}

export function home(main) {
  const save = app.save;
  const d = D();
  const cur = currentDay(save, MAX_DAY);
  const floor = LEVELS[save.level].floor;
  const tw = tower({ floor, rain: d.stats.energy < 35, phase: phaseNow(), animate: !reducedMotion(), label: `The tower at ${phaseNow()}. You are on floor ${floor} of 27, ${levelTitle(save.level, save.branch)}.` });
  const left = h('div', { class: 'towerwrap stack' }, tw,
    h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('div', null, h('b', { text: levelTitle(save.level, save.branch) }), h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: `Floor ${floor} of 27${save.branch ? ` · ${save.branch === 'manager' ? 'Manager track' : 'Principal track'}` : ''}` })), h('span', { class: 'chip', text: `${totalXP(save, SCN_BY_ID)} XP` })));
  const right = h('div', { class: 'today' });

  if (!save.rev) right.append(welcome());
  const sst = snakes();
  if (snakesOn() && sst.venom) {
    const n = Object.keys(sst.snakes).length;
    right.append(h('a', { class: 'snake-banner' + (sst.player === 'snake' ? ' is-snake' : ''), href: '#den' },
      h('span', { class: 'sb-art' }, snakeArt(sst.player === 'snake' ? 'me' : Object.keys(sst.snakes)[0], { tongue: 0.6 })),
      h('span', { class: 'stack', style: { gap: '2px' } },
        h('b', { text: sst.player === 'snake' ? 'You are an office snake' : `${n} stakeholder${n === 1 ? ' is a snake' : 's are snakes'}` }),
        h('span', { class: 'muted', text: sst.player === 'snake' ? 'Charm stakeholders back to shed your skin. Open the snake den.' : `Venom ${sst.venom} of 4. Open the snake den to charm them back.` }))));
  }

  if (cur > MAX_DAY) {
    right.append(h('div', { class: 'dayhead' }, h('h1', { text: 'The board has met.' }), h('p', { class: 'meta', text: 'Three weeks, done' }), h('p', { class: 'sub', text: 'Replays, the Dojo and your portfolio stay open.' })),
      h('div', { class: 'row' }, h('button', { class: 'btn lacquer', onclick: () => go('ending'), text: 'Read your ending' }), h('button', { class: 'btn ghost', onclick: () => go('dojo'), text: 'A Dojo round' })));
  } else {
    const day = DAY_BY_N[cur];
    const rec = save.days[cur];
    const av = dayAvailable(save, cur, today());
    const steps = daySteps(save, day, SCN_BY_ID);
    const stepIdx = rec ? rec.step : -1;
    right.append(h('div', { class: 'dayhead' }, h('h1', { text: F(day.title) }), h('p', { class: 'meta', text: `Act ${day.act.replace(' · ', ': ')}. Day ${cur} of ${MAX_DAY}.` }), h('p', { class: 'sub', text: F(day.sub) })));
    const cta = h('div', { class: 'row' });
    if (rec && !rec.done) cta.append(h('button', { class: 'btn lacquer', onclick: () => go('day-' + cur), text: 'Continue' }));
    else if (av.ok && save.rev) cta.append(h('button', { class: 'btn lacquer', onclick: () => go('day-' + cur), text: `Begin Day ${cur}` }));
    else if (!av.ok) cta.append(h('button', { class: 'btn', disabled: true, text: av.tomorrow ? 'Opens tomorrow' : 'Locked' }), h('span', { class: 'muted', text: av.why }));
    if (!av.ok) cta.append(h('button', { class: 'btn ghost', onclick: () => go('dojo'), text: 'Dojo round' }), h('button', { class: 'btn ghost', onclick: () => go('library'), text: 'Replay a scene' }));
    right.append(cta);
    right.append(floorplan(steps, rec, stepIdx, cur));
  }

  // Open reviews from earlier days
  const openReviews = SCENARIOS.filter(x => x.boss && x.day < Math.min(cur, MAX_DAY + 1) && save.days[x.day] && !bossPassed(x));
  if (openReviews.length) right.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Open reviews' }), openReviews.map(b => {
    const g = gateStatus(save, b, d, EVIDENCE);
    return h('div', { class: 'promise' }, h('span', { text: `Day ${b.day}: ${F(b.title)}` }), h('button', { class: 'btn small ' + (g.ok ? 'lacquer' : 'ghost'), onclick: () => go('review-' + b.id), text: g.ok ? 'Pack ready' : 'See the pack' }));
  })));

  right.append(statPanel(d));
  const open = save.promises.filter(p => p.status === 'open');
  if (open.length) right.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Promises' }), open.map(p => h('div', { class: 'promise' }, h('span', { text: F(p.text) }), h('span', { class: 'chip', text: `Day ${p.due}` })))));
  const sponsors = SPONSOR_IDS.filter(id => ['Trusted', 'Mine'].includes(d.rungs[id])).length;
  right.append(h('button', { class: 'panel row', style: { textAlign: 'left', justifyContent: 'space-between', cursor: 'pointer' }, onclick: () => go('people') },
    h('span', null, h('b', { text: 'Your network' }), h('span', { class: 'muted', text: ` · ${sponsors} trusted, ${NPC_IDS.filter(id => d.rungs[id] === 'Useful').length} useful` })), icon('people')));

  clear(main);
  main.append(h('div', { class: 'home' }, left, right));
}

function welcome() {
  const save = app.save;
  const name = h('input', { type: 'text', id: 'pname', maxlength: 40, value: save.player.name });
  return h('div', { class: 'panel stack', style: { borderColor: 'var(--marigold)' } },
    h('h2', { text: 'Welcome to the tower.' }),
    h('p', { text: 'Twenty-one days, about 45-60 minutes each. You start on Floor 6 as a senior product designer with one slide that got noticed. Promotions come from evidence and relationships, never from points.' }),
    h('p', { class: 'muted', text: 'No streaks to protect and no leaderboards. Miss a day and the story waits for you. Everything is saved privately to your account and this device.' }),
    h('div', { class: 'field' }, h('label', { for: 'pname', text: 'What should people in the story call you?' }), name),
    h('div', { class: 'row' }, h('button', { class: 'btn lacquer', onclick: () => { save.player.name = name.value.trim().slice(0, 40) || 'Minh'; persist(); go('day-1'); }, text: 'Begin Day 1' }), h('button', { class: 'link', onclick: () => go('settings'), text: 'Settings first' })));
}

// ---------------- people ----------------

export function people(main, focusId) {
  const save = app.save;
  const d = D();
  let overlay = 'rung';
  const W = 640, H = 490, cx = W / 2, cy = H / 2 - 6; // room below the outer ring for name labels
  const byTier = [1, 2, 3].map(t => NPC_IDS.filter(id => (NPCS[id].tier || 3) === t));
  const pos = {};
  byTier.forEach((ids, ti) => {
    const R = [118, 178, 214][ti];
    ids.forEach((id, k) => { const a = -Math.PI / 2 + (k / ids.length) * Math.PI * 2 + ti * 0.42; pos[id] = [cx + Math.cos(a) * R * 1.32, cy + Math.sin(a) * R * 0.86]; });
  });
  const sheet = h('div', { class: 'stack' });
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'map', role: 'group', 'aria-label': 'Your network map. Each person is a button.' });
  const legend = h('p', { class: 'muted', style: { fontSize: '.85rem' } });
  const tabs = h('div', { class: 'overlay-tabs', role: 'group', 'aria-label': 'Map overlay' });
  const OVER = { rung: 'Relationships', sponsor: 'Sponsors', known: 'What you know' };
  const drawTabs = () => { clear(tabs); for (const [k, v] of Object.entries(OVER)) tabs.append(h('button', { 'aria-pressed': String(overlay === k), onclick: () => { overlay = k; drawTabs(); draw(); }, text: v })); };
  function draw() {
    clear(svg);
    for (let r = 1; r <= 3; r++) svg.append(s('ellipse', { cx, cy, rx: [118, 178, 214][r - 1] * 1.32, ry: [118, 178, 214][r - 1] * 0.86, fill: 'none', stroke: '#ffffff', 'stroke-opacity': .06 }));
    for (const id of NPC_IDS) {
      const [x, y] = pos[id];
      const rg = d.rungs[id];
      const ri = RUNGS.indexOf(rg);
      const neg = ri < 2;
      svg.append(s('line', { x1: cx, y1: cy, x2: x, y2: y, stroke: RUNG_COLOR[rg], 'stroke-opacity': ri >= 3 ? .8 : .3, 'stroke-width': Math.max(1, ri - 1) * 1.4, 'stroke-dasharray': neg ? '4 4' : null }));
    }
    svg.append(s('circle', { cx, cy, r: 26, fill: '#F2A93B' }), s('text', { x: cx, y: cy + 4, 'text-anchor': 'middle', 'font-weight': 700, fill: '#1C1204', text: 'You' }));
    NPC_IDS.forEach((id, k) => {
      const [x, y] = pos[id];
      const rg = d.rungs[id];
      const r = 12 + RUNGS.indexOf(rg) * 2.2;
      const known = (save.known[id] || []).length;
      const isSponsor = SPONSOR_IDS.includes(id);
      const dim = (overlay === 'sponsor' && !isSponsor) || (overlay === 'known' && !known);
      const g = s('g', { class: 'node', tabindex: 0, role: 'button', 'aria-label': `${npcName(id)}, ${NPCS[id].role}. ${rg}.${known ? ` You know ${known} thing${known > 1 ? 's' : ''} about them.` : ''}`, opacity: dim ? .35 : 1 });
      g.append(s('circle', { cx: x, cy: y, r: r + 6, class: 'hit', fill: 'transparent', stroke: focusId === id ? '#F2A93B' : 'none', 'stroke-width': 3 }));
      g.append(s('circle', { cx: x, cy: y, r, fill: RUNG_COLOR[rg], stroke: '#0E1119', 'stroke-width': 2 }));
      if (overlay === 'sponsor' && isSponsor) g.append(s('circle', { cx: x, cy: y, r: r + 4, fill: 'none', stroke: '#F2A93B', 'stroke-width': 1.5, 'stroke-dasharray': '2 3' }));
      g.append(s('text', { x, y: y + 4, 'text-anchor': 'middle', 'font-size': 10, 'font-weight': 700, fill: '#0E1119', text: npcName(id, true).slice(0, 2) }));
      g.append(s('text', { x, y: y + r + 14, 'text-anchor': 'middle', text: npcName(id, true) }));
      g.append(s('text', { x, y: y + r + 27, 'text-anchor': 'middle', 'font-size': 10, opacity: .7, text: overlay === 'known' ? `${known}/${NPCS[id].prefs.length} known` : rg }));
      const open = () => { focusId = id; showSheet(id); draw(); };
      g.addEventListener('click', open);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      svg.append(g);
      if (!reducedMotion()) animate(g, [{ opacity: 0 }, { opacity: dim ? .35 : 1 }], { duration: 400, delay: 30 * k, fill: 'backwards' });
    });
    legend.textContent = overlay === 'rung' ? 'Thicker, brighter lines are stronger relationships. Dashed lines are cooling. Ladder: Cold · Wary · Stranger · Useful · Trusted · Mine.' : overlay === 'sponsor' ? 'People who can count toward the sponsor requirements at reviews. Never only one sponsor.' : 'Preferences you have discovered in conversation. Study people like users.';
  }
  function showSheet(id) {
    clear(sheet);
    const n = NPCS[id];
    const rg = d.rungs[id];
    const pts = d.npcs[id];
    const ri = RUNGS.indexOf(rg);
    const known = save.known[id] || [];
    const hist = SCENARIOS.filter(x => x.npc === id && save.scn[x.id]).map(x => ({ x, g: save.scn[x.id].best.g }));
    sheet.append(
      h('div', { class: 'npc-head' }, h('div', { class: 'face' }, isSnake(id) ? snakeArt(id, { title: `${npcName(id)}, a snake until you replay their scene` }) : portrait(n.look, ri >= 4 ? 'warm' : ri <= 1 ? 'cool' : 'neutral', { breathe: false, title: npcName(id) })),
        h('div', { class: 'stack', style: { gap: '4px' } }, h('h2', { text: npcName(id) }), h('p', { class: 'muted', text: n.role }), h('span', { class: 'chip', text: n.arch }))),
      h('div', { class: 'stack', style: { gap: '6px' } }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('b', { text: rg }), h('span', { class: 'muted num', text: `${pts} points` })),
        h('div', { class: 'rungs', role: 'img', 'aria-label': `Relationship: ${rg}` }, RUNGS.map((r, i) => h('i', { class: i <= ri && i >= 2 ? 'on' : i <= 1 && ri <= i ? 'neg' : '' })))),
      h('p', { class: 'narr', text: F(n.persona) }));
    if (id === 'anh_khai') {
      const ar = askRung(save);
      const L = ['Advice', 'Awareness', 'Access', 'S'];
      const ai = L.indexOf(ar);
      sheet.append(h('div', { class: 'stack', style: { gap: '6px' } }, h('b', { text: 'The ask ladder' }), h('div', { class: 'ladder' }, ['Advice', 'Awareness', 'Access', 'Sponsorship'].map((t, i) => h('span', { class: i <= ai ? 'on' : '', text: t }))), h('small', { class: 'muted', text: 'Earn each rung before asking for the next. Never ask for sponsorship by name.' })));
    }
    sheet.append(h('div', { class: 'stack', style: { gap: '6px' } }, h('b', { text: 'What you know' }), h('ul', { style: { margin: 0, paddingLeft: '18px' } }, n.prefs.map(p => h('li', { class: known.includes(p.id) ? '' : 'muted', text: known.includes(p.id) ? F(p.text) : '???,  discover it in conversation' })))));
    if (hist.length) sheet.append(h('div', { class: 'stack', style: { gap: '6px' } }, h('b', { text: 'History' }), hist.map(({ x, g }) => h('div', { class: 'promise' }, h('span', { text: `Day ${x.day} · ${F(x.title)}` }), h('button', { class: 'btn ghost small', onclick: () => go('scn-' + x.id), text: `${g} · replay` })))));
    const notes = save.notes.filter(x => x.npc === id);
    if (notes.length) sheet.append(h('div', { class: 'stack', style: { gap: '6px' } }, h('b', { text: 'Notes you sent' }), notes.map(x => h('p', { class: 'muted', text: `Day ${x.day} (${x.kind}): ${x.text}` }))));
    animate(sheet, [{ opacity: 0, transform: 'translateX(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300 });
  }
  drawTabs(); draw();
  if (focusId && NPCS[focusId]) showSheet(focusId);
  else sheet.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Pick a person' }), h('p', { class: 'muted', text: 'Select anyone on the map to see where you stand, what you know about them, and your history together.' })));
  clear(main);
  main.append(h('div', { class: 'section' }, sectionHead('People', 'SimCity for relationships: overlays show what a map hides.'), tabs,
    h('div', { class: 'people' }, h('div', { class: 'stack' }, svg, legend), h('div', { class: 'panel' }, sheet))));
}

// ---------------- progress ----------------

function radar(trend) {
  const W = 380, cx = 190, cy = 175, R = 120;
  const keys = DIM_KEYS;
  const pt = (i, v) => { const a = -Math.PI / 2 + (i / keys.length) * Math.PI * 2; return [cx + Math.cos(a) * R * (v / 4), cy + Math.sin(a) * R * (v / 4)]; };
  const svg = s('svg', { viewBox: `0 0 ${W} 360`, class: 'radar', role: 'img', 'aria-label': 'Skill radar: early attempts versus recent attempts. ' + keys.map(k => `${DIMS[k].name}: early ${(trend.early[k] ?? 0).toFixed(1)}, recent ${(trend.late[k] ?? 0).toFixed(1)}`).join('; ') });
  for (const lv of [1, 2, 3, 4]) svg.append(s('polygon', { class: 'grid-l', points: keys.map((_, i) => pt(i, lv).join(',')).join(' ') }));
  keys.forEach((k, i) => { const [x, y] = pt(i, 4.7); svg.append(s('text', { x, y, 'text-anchor': 'middle', text: DIMS[k].short })); });
  svg.append(s('polygon', { class: 'early', points: keys.map((k, i) => pt(i, trend.early[k] ?? 0).join(',')).join(' ') }));
  const late = s('polygon', { class: 'late', points: keys.map((k, i) => pt(i, trend.late[k] ?? 0).join(',')).join(' ') });
  svg.append(late);
  if (!reducedMotion()) animate(late, [{ transform: 'scale(.6)', opacity: 0, transformOrigin: `${cx}px ${cy}px` }, { transform: 'scale(1)', opacity: 1, transformOrigin: `${cx}px ${cy}px` }], { duration: 700 });
  return svg;
}

export function progress(main) {
  const save = app.save;
  const d = D();
  const trend = dimTrend(save);
  const mastery = { New: 0, Learning: 0, Known: 0, Mastered: 0 };
  const cur = Math.min(currentDay(save, MAX_DAY), MAX_DAY);
  for (const id of unlockedCards(cur)) mastery[masteryOf(save.cards[id])]++;
  const t = today();
  const cal = h('div', { class: 'cal', role: 'img', 'aria-label': `Days practised in the last 28 days: ${save.practised.filter(x => x > t - 28).length}` }, Array.from({ length: 28 }, (_, i) => h('i', { class: save.practised.includes(t - 27 + i) ? 'on' : '', title: i === 27 ? 'today' : '' })));
  const career = h('ol', { class: 'career' }, LEVELS.slice(1).map((L, i) => {
    const lvl = i + 1;
    return h('li', { class: (lvl <= save.level ? 'reached' : '') + (lvl === save.level ? ' now' : '') }, h('span', { class: 'fl', text: `F${L.floor}` }), h('span', { text: levelTitle(lvl, save.branch) }), lvl === save.level ? h('span', { class: 'chip lacquer', text: 'You' }) : lvl < save.level ? h('span', { class: 'muted', text: '✓' }) : h('span'));
  }).reverse());
  clear(main);
  main.append(h('div', { class: 'section' }, sectionHead('Progress', 'Growth you can see, measured on the seven dimensions the handbook cares about.'),
    h('div', { class: 'grid', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' } },
      h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Skill radar' }), trend.n >= 2 ? radar(trend) : h('p', { class: 'muted', text: 'Write a few answers and your radar appears here: early attempts (dashed) against recent ones (solid).' }),
        trend.n >= 2 ? h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: `From ${trend.n} graded answers. Dashed: your first half. Solid: your latest half.` }) : null),
      h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Career map' }), career, h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: save.branch ? `On Day 11 you chose the ${save.branch} track.` : 'On Day 11 the path forks: manager or principal.' })),
      statPanel(d),
      h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Dojo memory' }), h('div', { class: 'statgrid' }, Object.entries(mastery).map(([k, v]) => h('div', { class: 'stat' }, h('div', { class: 'lab' }, h('span', { text: k }), h('b', { class: 'num', text: v })))) ),
        h('h2', { class: 'h3', text: 'Days practised' }), cal, h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: 'A record, not a streak. Gaps cost nothing.' }),
        h('p', null, h('b', { class: 'num', text: `${Object.keys(save.evidence).length} / ${Object.keys(EVIDENCE).length}` }), ' evidence cards')))));
}

// ---------------- library ----------------

export function library(main) {
  const save = app.save;
  const reached = Math.min(currentDay(save, MAX_DAY), MAX_DAY);
  const list = h('div', { class: 'stack' });
  for (const day of DAYS) {
    if (day.n > reached) break;
    const ids = daySteps(save, day, SCN_BY_ID).filter(x => x.includes(':')).map(x => x.split(':')[1]);
    list.append(h('details', { class: 'panel', open: day.n === reached }, h('summary', null, h('b', { text: `Day ${day.n} · ${F(day.title)}` }), h('span', { class: 'muted', text: `  ${ids.filter(id => save.scn[id]).length}/${ids.length} played` })),
      h('div', { class: 'stack', style: { marginTop: '10px', gap: '6px' } }, ids.map(id => {
        const x = SCN_BY_ID[id];
        const r = save.scn[id];
        const playable = !!r || !!save.days[day.n];
        return h('div', { class: 'promise' }, h('span', null, F(x.title), h('span', { class: 'muted', style: { fontSize: '.8rem' }, text: ` · ${x.mode}${x.boss ? ' · review' : ''}` })),
          h('div', { class: 'row', style: { flexWrap: 'nowrap' } }, r ? h('b', { class: 'num', text: r.best.g }) : null, h('button', { class: 'btn ghost small', disabled: !playable, onclick: () => go((x.boss ? 'review-' : 'scn-') + id), text: r ? 'Replay' : 'Play' })));
      }))));
  }
  clear(main);
  main.append(h('div', { class: 'section' }, sectionHead('Library', 'Every scene you have reached. Replays keep your best grade and never cost anything.', h('button', { class: 'btn ghost small', onclick: () => go('dojo'), text: 'Dojo round' })), list));
}

// ---------------- portfolio ----------------

export function playbookMarkdown() {
  const save = app.save;
  const lines = [`# My stakeholder playbook: ${save.player.name}`, '', `Level: ${levelTitle(save.level, save.branch)} (Floor ${LEVELS[save.level].floor})`, ''];
  lines.push('## Evidence', ...Object.keys(save.evidence).map(id => `- ${F(EVIDENCE[id].name)}: ${F(EVIDENCE[id].desc)}`), '');
  lines.push('## My scripts', ...save.scripts.map(x => `### ${x.title} (Day ${x.day})\n\n${x.text}\n`), '');
  lines.push('## Real Moves', ...save.moves.map(m => `- [${m.status === 'done' ? 'x' : ' '}] ${m.text}${m.when ? `: ${m.when}` : ''}`), '');
  lines.push('## Reflections', ...Object.entries(save.reflections).map(([d, t]) => `- Day ${d}: ${t}`), '');
  return lines.join('\n');
}

export async function downloadText(filename, data) {
  const dl = app.caps.downloads;
  if (!dl) { toast('Saving files is not available here. Use Copy instead.'); return; }
  try { await dl.save({ filename, data }); } catch (e) { if (e?.code === 'unavailable') toast('Saving files is not available here. Use Copy instead.'); }
}

export function portfolio(main) {
  const save = app.save;
  const evGrid = h('div', { class: 'grid' }, Object.entries(EVIDENCE).map(([id, e]) => {
    const got = id in save.evidence;
    return h('div', { class: 'ev' + (got ? ' got' : '') }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('span', { class: 'chip ' + (got ? 'brass' : ''), text: got ? `Earned Day ${save.evidence[id]}` : 'Not yet' })),
      h('h2', { class: 'h3', text: F(e.name) }), h('p', { class: 'muted', style: { fontSize: '.9rem' }, text: F(e.desc) }),
      h('button', { class: 'link', style: { justifySelf: 'start', fontSize: '.85rem' }, onclick: () => go('scn-' + e.from), disabled: !save.days[SCN_BY_ID[e.from]?.day], text: `From: ${F(SCN_BY_ID[e.from]?.title || '')}` }));
  }));
  const scripts = save.scripts.length ? save.scripts.slice().reverse().map((x, i) => h('div', { class: 'panel stack' }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('b', { text: x.title }), h('span', { class: 'muted', text: `Day ${x.day}` })), h('p', { class: 'narr', style: { whiteSpace: 'pre-wrap' }, text: x.text }),
    h('div', { class: 'row' }, h('button', { class: 'btn ghost small', onclick: () => copy(x.text), text: 'Copy' }), h('button', { class: 'link', onclick: () => { save.scripts.splice(save.scripts.length - 1 - i, 1); persist(); portfolio(main); }, text: 'Remove' }))))
    : [h('p', { class: 'muted', text: 'After a written answer you like, tap “Save to My Scripts”. They become your real-life templates.' })];
  const moves = save.moves.length ? save.moves.map(m => h('div', { class: 'promise' }, h('span', null, m.text, m.when ? h('small', { class: 'muted', text: `: ${m.when}` }) : null),
    h('select', { 'aria-label': 'Status', onchange: e => { m.status = e.target.value; persist(); } }, ['open', 'done', 'skipped'].map(v => h('option', { value: v, selected: m.status === v, text: v === 'open' ? 'Planned' : v === 'done' ? 'Done' : 'Dropped' })))))
    : [h('p', { class: 'muted', text: 'Each evening you pick one Real Move for your actual week.' })];
  clear(main);
  main.append(h('div', { class: 'section' }, sectionHead('Portfolio', 'What you would bring to a real talent review.',
    h('button', { class: 'btn ghost small', onclick: () => copy(playbookMarkdown()), text: 'Copy playbook' }),
    app.caps.downloads ? h('button', { class: 'btn ghost small', onclick: () => downloadText('my-stakeholder-playbook.md', playbookMarkdown()), text: 'Save playbook (.md)' }) : null),
    h('h2', { class: 'h3', text: `Evidence cards · ${Object.keys(save.evidence).length} of ${Object.keys(EVIDENCE).length}` }), evGrid,
    h('h2', { class: 'h3', text: 'My scripts' }), h('div', { class: 'stack' }, scripts),
    h('h2', { class: 'h3', text: 'Real Moves' }), h('div', { class: 'panel stack' }, moves),
    save.disagreements.length ? h('h2', { class: 'h3', text: 'Grades you disagreed with' }) : null,
    save.disagreements.length ? h('div', { class: 'panel stack' }, save.disagreements.map(x => h('p', { class: 'muted', text: `${F(SCN_BY_ID[x.scn]?.title || x.scn)}: ${x.text}` }))) : null));
}

export async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Copied.'); }
  catch {
    const ta = h('textarea', { readonly: true, rows: 10, style: { width: '100%' } });
    ta.value = text;
    dialog({ title: 'Copy this', body: ta });
    ta.select();
  }
}
