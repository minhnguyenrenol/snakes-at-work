// The day runner: brief → dojo → lesson → scenes → free slot → evening. One step at a time, resumable.
import { h, clear, animate, reducedMotion } from '../dom.js';
import { app, F, D, persist, go, npcName, toast, fxChips, today, mark } from './core.js';
import { backdrop, icon, tower } from './art.js';
import { cue } from './sound.js';
import { runScenario } from './scenario.js';
import { cinema } from './cinema.js';
import { DAY_BY_N, MAX_DAY, SCN_BY_ID, LESSONS, CARDS, CARD_BY_ID, unlockedCards, EVIDENCE, SLOTS, NPCS, SPONSOR_IDS, LEVELS, levelTitle } from '../content/index.js';
import { daySteps, dayAvailable, expirePromises, gateStatus, resolvePromise, currentDay, STATS, STAT_KEYS } from '../engine/game.js';
import { pickDojo, review, suggestResult, masteryOf } from '../engine/srs.js';
import { applySlot } from '../engine/play.js';
import { gradeAtLeast } from '../engine/rubric.js';

const STEP_LABEL = { brief: 'Brief', dojo: 'Dojo', lesson: 'Lesson', slot: 'Free slot', evening: 'Evening' };

export function stepLabel(st) {
  if (STEP_LABEL[st]) return STEP_LABEL[st];
  const [kind, id] = st.split(':');
  const scn = SCN_BY_ID[id];
  return scn ? F(scn.title) : st;
}

export function bossPassed(scn) {
  return !!(scn?.promote && app.save.level >= scn.promote.level);
}

/** Entry: #day-N */
export function runDay(main, n) {
  const save = app.save;
  const day = DAY_BY_N[n];
  if (!day) return go('today');
  const rec = save.days[n];
  if (!rec) {
    const av = dayAvailable(save, n, today());
    if (!av.ok) {
      clear(main);
      main.append(h('div', { class: 'gate panel stack' }, h('h1', { class: 'h2', text: `Day ${n}: ${F(day.title)}` }), h('p', { text: av.why }), h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => go('today'), text: 'Back to the tower' }), h('button', { class: 'btn ghost', onclick: () => go('library'), text: 'Open the Library' }))));
      return;
    }
    save.days[n] = { step: 0, done: false, startedAt: Date.now(), doneAt: 0, date: null };
    expirePromises(save, n);
    persist();
  }
  renderStep(main, n);
}

function renderStep(main, n) {
  const save = app.save;
  const day = DAY_BY_N[n];
  const rec = save.days[n];
  const steps = daySteps(save, day, SCN_BY_ID);
  if (rec.done || rec.step >= steps.length) return dayDone(main, n);
  const st = steps[rec.step];
  clear(main);
  // Match the strip to the width of the step below it so the edges line up.
  const width = st === 'dojo' ? 640 : /^(lesson|slot|evening)$/.test(st) ? 740 : 880;
  const strip = h('div', { class: 'row', style: { justifyContent: 'space-between', maxWidth: width + 'px', margin: '0 auto 14px' } },
    h('span', { class: 'muted', style: { fontSize: '.85rem' } }, `Day ${n}, ${F(day.title)}. Step ${rec.step + 1} of ${steps.length}`),
    h('div', { class: 'progressdots', role: 'img', 'aria-label': `Step ${rec.step + 1} of ${steps.length}` }, steps.map((_, i) => h('i', { class: i <= rec.step ? 'on' : '' }))));
  const body = h('div');
  main.append(strip, body);
  const advance = () => { rec.step += 1; persist(); renderStep(main, n); window.scrollTo({ top: 0 }); };
  const [kind, id] = st.split(':');
  if (st === 'brief') return brief(body, n, advance);
  if (st === 'dojo') return dojo(body, n, advance);
  if (st === 'lesson') return lesson(body, n, advance);
  if (st === 'slot') return slot(body, n, advance);
  if (st === 'evening') return evening(body, n);
  const scn = SCN_BY_ID[id];
  if (!scn) return advance();
  if (kind === 'boss') return bossGate(body, scn, n, advance);
  runScenario(body, scn, { day: n, onDone: advance, onExit: () => go('today') });
}

// ---------------- brief ----------------

function brief(body, n, advance) {
  const save = app.save;
  const day = DAY_BY_N[n];
  const floor = LEVELS[save.level].floor;
  const scene = n === 1
    ? cinema('opening', { name: save.player.name, floor }, { label: `Opening: the tower over the river at night. ${save.player.name}, you start on Floor ${floor}.` })
    : cinema('day', { n, title: F(day.title), sub: F(day.sub), floor, total: MAX_DAY }, { label: `Day ${n}: ${F(day.title)}. ${F(day.sub)}` });
  const wrap = h('div', { class: 'stage' },
    h('div', { class: 'dayhead' }, h('h1', { text: F(day.title) }), h('p', { class: 'meta', text: `Day ${n} of ${MAX_DAY}` }), h('p', { class: 'sub', text: F(day.sub) })),
    scene,
    h('div', { class: 'bubble narr', text: F(day.brief) }));
  // Real Move check-in (implementation intentions from earlier evenings)
  const open = save.moves.filter(m => m.status === 'open' && m.day < n);
  if (open.length) {
    const list = h('div', { class: 'stack' });
    for (const m of open) {
      const row = h('div', { class: 'promise' }, h('div', null, h('p', { text: m.text }), m.when ? h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: `Plan: ${m.when}` }) : null),
        h('div', { class: 'row', style: { flexWrap: 'nowrap' } },
          h('button', { class: 'btn small', onclick: () => { m.status = 'done'; persist(); cue('good'); row.replaceWith(h('p', { class: 'chip jade', text: `Done in real life: ${m.text}` })); }, text: 'Did it' }),
          h('button', { class: 'btn ghost small', onclick: () => { row.remove(); }, text: 'Not yet' }),
          h('button', { class: 'link', onclick: () => { m.status = 'skipped'; persist(); row.remove(); }, text: 'Drop it' })));
      list.append(row);
    }
    wrap.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Real Moves from earlier evenings' }), h('p', { class: 'muted', text: 'The game only matters if it leaks into your week. No judgement for "not yet".' }), list));
  }
  const due = save.promises.filter(p => p.status === 'open');
  if (due.length) wrap.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Promises you are carrying' }), due.map(p => h('div', { class: 'promise' }, h('span', { text: F(p.text) }), h('span', { class: 'chip ' + (p.due <= n ? 'lacquer' : ''), text: p.due <= n ? 'due today' : `due Day ${p.due}` })))));
  const start = h('button', { class: 'btn lacquer', onclick: advance, text: 'Start the day' });
  wrap.append(h('div', { class: 'row' }, start, h('span', { class: 'muted', text: 'About 45-60 minutes. Stop at any step; it resumes where you left it.' })));
  body.append(wrap);
  cue('motif');
  start.focus({ preventScroll: true });
}

// ---------------- dojo ----------------

const dojoCache = {};
function dojo(body, n, advance) {
  const save = app.save;
  const key = `${n}:${today()}`;
  const ids = dojoCache[key] ||= pickDojo(CARDS, save.cards, today(), unlockedCards(n));
  let i = 0, good = 0;
  const wrap = h('div', { class: 'dojo' });
  body.append(wrap);
  const show = () => {
    clear(wrap);
    if (i >= ids.length) {
      wrap.append(h('div', { class: 'panel stack' }, h('h1', { class: 'h2', text: 'Dojo done' }), h('p', { text: `${good} of ${ids.length} came back cleanly. The rest return sooner, that is the system working, not you failing.` }), h('div', { class: 'row' }, h('button', { class: 'btn lacquer', onclick: advance, text: 'On to the lesson' }))));
      cue('good');
      wrap.querySelector('button').focus();
      return;
    }
    const c = CARD_BY_ID[ids[i]];
    const st = save.cards[c.id];
    const isNew = !st || !st.seen;
    const ta = h('textarea', { rows: 3, 'aria-label': 'Your answer from memory', placeholder: isNew ? 'Guess. Pretesting primes the lesson, even when you are wrong.' : 'Answer from memory before you reveal.', style: { width: '100%' } });
    const reveal = h('button', { class: 'btn', text: 'Reveal', onclick: () => {
      const sug = ta.value.trim() ? suggestResult(ta.value, c) : null;
      reveal.remove(); ta.readOnly = true;
      const rate = (res) => { save.cards[c.id] = review(st, res, today()); if (res === 'good') good++; persist(); i++; cue(res === 'good' ? 'good' : 'soft'); show(); };
      const mk = (res, label, hint) => h('button', { class: 'btn ' + (sug === res ? 'lacquer' : 'ghost'), onclick: () => rate(res) }, label, sug === res ? h('span', { class: 'sr', text: ' (suggested)' }) : null, h('small', { class: 'muted', style: { marginLeft: '4px' }, text: hint }));
      const back = h('div', { class: 'face back', style: { transform: 'none' } }, h('p', { class: 'a', text: F(c.a) }));
      card.append(back);
      animate(back, [{ transform: 'rotateX(80deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 420 });
      wrap.append(h('div', { class: 'stack' }, h('p', { class: 'muted', text: sug ? `Your answer covers ${sug === 'good' ? 'most' : sug === 'hard' ? 'some' : 'little'} of the key ideas. You decide.` : 'How did it go?' }),
        h('div', { class: 'row' }, mk('again', 'Again', 'tomorrow'), mk('hard', 'Hard', 'tomorrow'), mk('good', 'Good', 'later'))));
      wrap.querySelector('.btn.lacquer, .btn')?.focus();
    } });
    const card = h('div', { class: 'card stack' },
      h('div', { class: 'face' }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('span', { class: 'chip brass', text: isNew ? 'New, pretest' : masteryOf(st) }), h('span', { class: 'muted num', text: `${i + 1} / ${ids.length}` })), h('p', { class: 'q', text: F(c.q) })));
    wrap.append(h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('h1', { class: 'h2', text: 'Dojo' }), h('button', { class: 'link', onclick: advance, text: 'Skip today' })),
      h('p', { class: 'muted', text: 'Retrieval before review: recall first, then check. Spaced on 1, 2, 4, 8 and 16 days.' }), card, ta, h('div', { class: 'row' }, reveal));
    ta.focus({ preventScroll: true });
  };
  show();
}

// ---------------- lesson ----------------

function lesson(body, n, advance) {
  const L = LESSONS[DAY_BY_N[n].lesson];
  if (!L) return advance();
  let p = 0;
  const wrap = h('div', { class: 'lesson' });
  body.append(wrap);
  const show = () => {
    clear(wrap);
    const part = L.parts[p];
    const last = p === L.parts.length - 1;
    const nextBtn = h('button', { class: 'btn lacquer', onclick: () => { if (last) advance(); else { p++; show(); window.scrollTo({ top: 0 }); } }, text: last ? 'To the floor' : 'Next' });
    wrap.append(h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('span', { class: 'kind', text: `Lesson: ${F(L.title)}` }), h('div', { class: 'progressdots', 'aria-hidden': 'true' }, L.parts.map((_, k) => h('i', { class: k <= p ? 'on' : '' })))));
    const card = h('div', { class: 'stack' });
    wrap.append(card);
    if (part.type === 'predict') {
      card.append(h('span', { class: 'chip brass', text: 'Predict first' }), h('h1', { class: 'h2', text: F(part.q) }));
      const opts = h('div', { class: 'opts' });
      nextBtn.disabled = true;
      part.opts.forEach((o, k) => {
        const b = h('button', { class: 'opt', onclick: () => {
          [...opts.children].forEach((x, j) => { x.disabled = true; const oj = part.opts[j]; x.querySelector('.k').replaceChildren(oj.ok ? icon('check', 16) : ''); if (j === k || oj.ok) x.lastChild.append(h('small', { class: 'muted', style: { display: 'block', marginTop: '6px' }, text: (oj.ok ? 'Best answer. ' : j === k ? 'Not quite. ' : '') + F(oj.why) })); });
          b.classList.add('chosen'); nextBtn.disabled = false; cue(o.ok ? 'good' : 'soft'); nextBtn.focus();
        } }, h('span', { class: 'k', 'aria-hidden': 'true', text: 'ABCD'[k] }), h('span', null, h('span', { text: F(o.t) })));
        opts.append(b);
      });
      card.append(opts, h('p', { class: 'muted', text: 'Guessing before the lesson makes the lesson stick, even a wrong guess.' }));
    } else if (part.type === 'teach') {
      card.append(h('h1', { class: 'h2', text: F(part.h) }), h('div', { class: 'body' }, part.body.map(t => h('p', { text: F(t) }))));
      const hk = part.hook && CARD_BY_ID[part.hook];
      if (hk) card.append(h('div', { class: 'voice' }, h('b', { text: 'Hook card' }), F(hk.a)));
    } else if (part.type === 'pair') {
      card.append(h('span', { class: 'chip', text: 'Which would you send?' }), h('h1', { class: 'h2', text: F(part.h) }));
      const flip = (n + p) % 2 === 1;
      const A = { t: F(part.weak), weak: true }, B = { t: F(part.strong), weak: false };
      const [x, y] = flip ? [B, A] : [A, B];
      const pair = h('div', { class: 'pair' });
      nextBtn.disabled = true;
      const pickOne = (choice) => {
        clear(pair);
        pair.append(h('div', { class: 'weak' }, h('h2', { class: 'h3', text: 'Weaker' }), A.t), h('div', { class: 'strong' }, h('h2', { class: 'h3', text: 'Stronger' }), B.t));
        card.append(h('p', { class: 'narr', text: (choice.weak ? 'Not this one. ' : 'Yes. ') + F(part.why) }));
        nextBtn.disabled = false; cue(choice.weak ? 'soft' : 'good'); nextBtn.focus();
      };
      pair.append(...[x, y].map((v, k) => h('div', null, h('h2', { class: 'h3', text: `Version ${'AB'[k]}` }), h('p', { text: v.t }), h('div', { class: 'row', style: { marginTop: '10px' } }, h('button', { class: 'btn ghost small', onclick: () => pickOne(v), text: `Send ${'AB'[k]}` })))));
      card.append(pair);
    }
    wrap.append(h('div', { class: 'row' }, nextBtn));
    animate(card, [{ transform: 'translateY(10px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 360 });
  };
  show();
}

// ---------------- free slot ----------------

function slot(body, n, advance) {
  const save = app.save;
  const day = DAY_BY_N[n];
  if (save.slots[n]) return advance();
  const ids = [...new Set(['friday15', ...(day.slot || [])])].filter(id => SLOTS[id]);
  let chosen = null;
  const noteBox = h('div', { class: 'stack' });
  const go2 = h('button', { class: 'btn lacquer', disabled: true, text: 'Do it', onclick: () => {
    const sl = SLOTS[chosen];
    let note = null;
    if (sl.kind === 'note') {
      const npc = noteBox.querySelector('select').value;
      const kind = noteBox.querySelector('input[name=nk]:checked')?.value || 'result';
      const text = noteBox.querySelector('textarea').value.trim();
      if (!npc || text.split(/\s+/).length < 5) return toast('Write at least one real sentence first.');
      note = { npc, kind, text };
      save.invest[npc] = today();
    }
    applySlot(save, n, chosen, sl, note);
    persist();
    const fx = { ...(sl.fx || {}) };
    if (note) fx[note.npc] = (fx[note.npc] || 0) + (sl.npcFx || 3);
    clear(body);
    body.append(h('div', { class: 'evening panel stack' }, h('h1', { class: 'h2', text: F(sl.title) }), h('p', { class: 'narr', text: F(sl.why) }), h('div', { class: 'deltas' }, fxChips(fx)), h('div', { class: 'row' }, h('button', { class: 'btn lacquer', onclick: advance, text: 'Continue' }))));
    cue('good');
    body.querySelector('.btn').focus();
  } });
  const cards = h('div', { class: 'radio-cards', role: 'radiogroup', 'aria-label': 'Choose one investment' }, ids.map(id => {
    const sl = SLOTS[id];
    const input = h('input', { type: 'radio', name: 'slot', value: id, onchange: () => { chosen = id; go2.disabled = false; noteBox.replaceChildren(); if (sl.kind === 'note') noteBox.append(friday15Form()); } });
    return h('label', null, input, h('div', { class: 'stack', style: { gap: '4px' } }, h('div', { class: 'row', style: { gap: '8px' } }, icon(sl.icon), h('b', { text: F(sl.title) })), h('span', { text: F(sl.desc) }), h('small', { class: 'muted', text: F(sl.why) })));
  }));
  body.append(h('div', { class: 'evening' }, h('div', { class: 'dayhead' }, h('h1', { class: 'h2', text: 'One investment. You can’t do everything.' }), h('p', { class: 'meta', text: 'Free slot' }), h('p', { class: 'muted', text: 'Every choice is fine. Relationships, rest and integrity all compound.' })),
    cards, noteBox, h('div', { class: 'row' }, go2, h('button', { class: 'link', onclick: advance, text: 'Skip today' }))));
}

function friday15Form() {
  const d = D();
  const t = today();
  const opts = Object.keys(NPCS).map(id => h('option', { value: id, disabled: app.save.invest[id] === t, text: `${npcName(id)}: ${d.rungs[id]}${app.save.invest[id] === t ? ' (already today)' : ''}` }));
  const sel = h('select', { id: 'f15npc' }, opts);
  const firstFree = Object.keys(NPCS).find(id => app.save.invest[id] !== t);
  if (firstFree) sel.value = firstFree;
  const ta = h('textarea', { id: 'f15text', rows: 3, maxlength: 280, placeholder: 'e.g. "Quick result: the Ops walkthrough cut review time from two days to one. Thanks for the steer on the number."' });
  return h('div', { class: 'panel stack' },
    h('div', { class: 'field' }, h('label', { for: 'f15npc', text: 'Who?' }), sel, h('small', { text: 'One note per person per real day: warmth is built slowly.' })),
    h('div', { class: 'row' }, h('label', null, h('input', { type: 'radio', name: 'nk', value: 'result', checked: true }), ' A result'), h('label', null, h('input', { type: 'radio', name: 'nk', value: 'thanks' }), ' A specific thanks')),
    h('div', { class: 'field' }, h('label', { for: 'f15text', text: 'The note (two lines)' }), ta, h('small', { text: 'Specific beats warm. Name what happened and why it mattered to them.' })));
}

// ---------------- boss gate (talent review pack) ----------------

function bossGate(body, scn, n, advance, recheck = () => renderStep(document.querySelector('main'), n)) {
  const save = app.save;
  if (bossPassed(scn)) return advance();
  const g = gateStatus(save, scn, D(), EVIDENCE);
  const req = (ok, label, right, action) => h('div', { class: 'req ' + (ok ? 'ok' : 'no') }, h('span', { class: 'ic', 'aria-hidden': 'true' }, icon(ok ? 'check' : 'ring', 18)), h('div', null, h('span', { text: label }), h('span', { class: 'sr', text: ok ? ', met' : ', not yet' }), action || null), h('span', { class: 'muted num', text: right }));
  const list = h('div', { class: 'stack', style: { gap: '8px' } });
  for (const c of g.cards) list.append(req(c.have, `Evidence: ${F(c.name)}`, c.have ? 'earned' : 'missing', c.have ? null : h('div', null, h('button', { class: 'link', onclick: () => go('scn-' + c.from), text: `Practise “${F(SCN_BY_ID[c.from]?.title || c.from)}”` }))));
  for (const x of g.npcs) list.append(req(x.ok, `${npcName(x.id)} at ${x.min} or better`, x.have, x.ok ? null : h('div', null, h('small', { class: 'muted', text: 'A Friday-15 note in a free slot, or a replay of their scenes, moves this.' }))));
  if (g.sponsors) list.append(req(g.sponsors.have >= g.sponsors.need, `${g.sponsors.need} people at ${g.sponsors.min} or better`, `${g.sponsors.have} / ${g.sponsors.need}`));
  const wrap = h('div', { class: 'gate' },
    h('div', { class: 'dayhead' }, h('h1', { text: F(scn.title) }), h('p', { class: 'meta', text: 'Talent review' }), h('p', { class: 'sub', text: g.ok ? 'Your pack is complete. The panel is waiting.' : 'Promotion runs on evidence and relationships, never on points.' })),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Your review pack' }), list),
    h('p', { class: 'muted', text: F(scn.cue) }));
  const actions = h('div', { class: 'row' });
  if (g.ok) actions.append(h('button', { class: 'btn lacquer', onclick: () => runScenario(body, scn, { day: n, onDone: advance, onExit: () => go('today') }), text: 'Enter the review' }));
  else {
    actions.append(h('button', { class: 'btn', onclick: recheck, text: 'Check again' }));
    actions.append(h('button', { class: 'btn ghost', onclick: advance, text: 'Carry on with the day' }));
    wrap.append(h('p', { class: 'muted', text: 'The review stays open on your tower. Come back when the pack is ready; nothing is lost.' }));
  }
  if (g.ok) actions.append(h('button', { class: 'btn ghost', onclick: advance, text: 'Not today' }));
  wrap.append(actions);
  body.append(wrap);
  animate(wrap, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 400 });
}

// ---------------- evening ----------------

function evening(body, n) {
  const save = app.save;
  const day = DAY_BY_N[n];
  const played = Object.entries(save.scn).filter(([, r]) => r.att.some(a => a.d === n)).map(([id, r]) => ({ scn: SCN_BY_ID[id], g: r.att.filter(a => a.d === n).map(a => a.g).sort((a, b) => 'SABCD'.indexOf(a) - 'SABCD'.indexOf(b))[0] })).filter(x => x.scn);
  const evToday = Object.entries(save.evidence).filter(([, d]) => d === n).map(([id]) => EVIDENCE[id]);
  const d = D();
  const wrap = h('div', { class: 'evening' });
  wrap.append(h('div', { class: 'dayhead' }, h('h1', { text: 'The day, settled' }), h('p', { class: 'sub', text: `Evening of Day ${n}. Tally, then rest.` })));
  const items = played.map(p => ({ t: F(p.scn.title), g: p.g }));
  wrap.append(cinema('recap', { n, items, evidence: evToday.map(e => F(e.name)), floor: LEVELS[save.level].floor, title: levelTitle(save.level, save.branch) }, { label: `Recap of Day ${n}: ${items.map(i => `${i.t}, ${i.g}`).join('; ')}` }));
  wrap.append(h('div', { class: 'panel tally' }, h('h2', { class: 'h3', text: 'Today' }),
    played.map(p => h('div', { class: 'r' }, h('span', { text: F(p.scn.title) }), h('b', { class: 'num', text: p.g }))),
    evToday.map(e => h('div', { class: 'r' }, h('span', { text: `Evidence: ${F(e.name)}` }), h('b', { class: 'gold' }, icon('star', 18)))),
    h('div', { class: 'r' }, h('span', { text: 'Where you stand' }), h('b', { text: `${levelTitle(save.level, save.branch)}, Floor ${LEVELS[save.level].floor}` }))));
  wrap.append(h('div', { class: 'panel' }, h('div', { class: 'statgrid' }, STAT_KEYS.map(k => h('div', { class: 'stat', title: STATS[k].note }, h('div', { class: 'lab' }, h('span', { text: STATS[k].name }), h('b', { class: 'num', text: d.stats[k] })), h('div', { class: 'bar ' + k }, h('i', { style: { transform: `scaleX(${d.stats[k] / 100})` } })))))));

  const open = save.promises.filter(p => p.status === 'open');
  if (open.length) {
    const box = h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Promises' }), h('p', { class: 'muted', text: 'In the story, did you keep it? Kept promises are the cheapest trust there is; three open ones drain energy.' }));
    for (const p of open) {
      const row = h('div', { class: 'promise' }, h('span', { text: F(p.text) }), h('div', { class: 'row', style: { flexWrap: 'nowrap' } },
        h('button', { class: 'btn small', onclick: () => { resolvePromise(save, p.id, true, n); persist(); cue('good'); row.replaceWith(h('p', { class: 'chip jade', text: `Kept: ${F(p.text)}` })); }, text: 'Keep it now' }),
        h('button', { class: 'link', onclick: () => { resolvePromise(save, p.id, false, n); persist(); row.replaceWith(h('p', { class: 'chip', text: `Let go: ${F(p.text)}` })); }, text: 'Let it go' })));
      box.append(row);
    }
    wrap.append(box);
  }

  const refl = h('textarea', { id: 'refl', rows: 3, maxlength: 600, placeholder: 'One sentence is plenty.' });
  refl.value = save.reflections[n] || '';
  wrap.append(h('div', { class: 'panel field' }, h('label', { for: 'refl', text: 'Reflection: where in your real week will today’s idea show up?' }), refl));

  const moveOpts = (day.moves || []).map(F);
  const custom = h('input', { type: 'text', id: 'movecustom', maxlength: 200, placeholder: 'Or write your own' });
  const when = h('input', { type: 'text', id: 'movewhen', maxlength: 120, placeholder: 'e.g. Monday 9:00, at my desk, before stand-up' });
  const radios = h('div', { class: 'radio-cards' }, moveOpts.map((m, i) => h('label', null, h('input', { type: 'radio', name: 'move', value: String(i) }), h('span', { text: m }))));
  wrap.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'One Real Move' }), h('p', { class: 'muted', text: 'Implementation intention: when and where makes it two to three times more likely to happen.' }), radios,
    h('div', { class: 'field' }, h('label', { for: 'movecustom', text: 'Your own move' }), custom),
    h('div', { class: 'field' }, h('label', { for: 'movewhen', text: 'When and where?' }), when)));
  wrap.append(h('p', { class: 'narr', text: F(day.teaser || '') }));
  const close = h('button', { class: 'btn lacquer', text: n === MAX_DAY ? 'Close the last day' : 'Close the day', onclick: () => {
    if (refl.value.trim()) save.reflections[n] = refl.value.trim().slice(0, 600);
    const pickI = radios.querySelector('input:checked')?.value;
    const text = custom.value.trim() || (pickI != null ? moveOpts[Number(pickI)] : '');
    if (text) save.moves.push({ day: n, text: text.slice(0, 280), when: when.value.trim().slice(0, 120), status: 'open' });
    const rec = save.days[n];
    rec.done = true; rec.date = today(); rec.doneAt = Date.now();
    rec.step = 40;
    persist();
    cue('motif');
    const board = SCN_BY_ID.boss_board;
    if (n === MAX_DAY && bossPassed(board)) return go('ending');
    nightfall(n);
  } });
  wrap.append(h('div', { class: 'row' }, close));
  body.append(wrap);
}

function nightfall(n) {
  const save = app.save;
  const el = h('div', { class: 'lift', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Day closed' });
  const tw = tower({ floor: LEVELS[save.level].floor, phase: 'night', animate: !reducedMotion() });
  tw.style.maxWidth = '260px'; tw.style.boxShadow = 'none';
  const next = DAY_BY_N[n + 1];
  const btn = h('button', { class: 'btn lacquer', text: 'Back to the tower', onclick: () => { el.remove(); go('today'); } });
  el.append(h('div', { class: 'panelx' }, tw, h('div', { class: 'title', text: `Day ${n} closed.` }), h('p', { class: 'muted', text: next ? (save.settings.playAhead ? `Day ${n + 1} is open.` : `Day ${n + 1} opens tomorrow. Sleep is when practice becomes memory.`) : 'That was the last day.' }), btn));
  document.body.append(el);
  btn.focus();
}

// ---------------- day already done ----------------

function dayDone(main, n) {
  const day = DAY_BY_N[n];
  clear(main);
  const steps = daySteps(app.save, day, SCN_BY_ID).filter(s => s.includes(':'));
  main.append(h('div', { class: 'evening' }, h('div', { class: 'dayhead' }, h('h1', { text: F(day.title) }), h('p', { class: 'meta', text: `Day ${n} is complete.` })),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Replay any scene' }), steps.map(st => {
      const id = st.split(':')[1];
      const r = app.save.scn[id];
      return h('div', { class: 'promise' }, h('span', { text: F(SCN_BY_ID[id].title) }), h('div', { class: 'row' }, r ? h('b', { class: 'num', text: r.best.g }) : h('span', { class: 'muted', text: 'not played' }), h('button', { class: 'btn ghost small', onclick: () => go('scn-' + id), text: 'Play' })));
    })),
    h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => go('today'), text: 'Back to the tower' }))));
}

/** A review opened from the tower or the Library, outside the day flow. */
export function openReview(main, scn) {
  const n = Math.min(currentDay(app.save, MAX_DAY), MAX_DAY);
  clear(main);
  if (bossPassed(scn)) return runScenario(main, scn, { day: n, onDone: () => go('today'), onExit: () => go('library') });
  bossGate(main, scn, n, () => go('today'), () => openReview(main, scn));
}

/** An extra Dojo round outside the day (spacing works best on days you can't play a new day). */
export function freeDojo(main) {
  const n = Math.min(currentDay(app.save, MAX_DAY), MAX_DAY);
  clear(main);
  dojo(main, n, () => go('today'));
}

