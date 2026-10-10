// The stage: every scenario mode, the inner-voice hints, and the debrief.
import { h, s, clear, animate, wait, typewrite, reducedMotion } from '../dom.js';
import { app, F, FN, ctx, persist, aiOn, npcName, fxChips, dialog, toast, today, mark } from './core.js';
import { backdrop, portrait, seal, icon } from './art.js';
import { cue, ambience } from './sound.js';
import { speakSeq, enqueue, stopVoice, listenBtn } from './voice.js';
import { forYou, followDrill } from './atlas.js';
import { DEEP } from '../content/deep.js';
import { snakes, snakeAftermath, isSnake, snakeArt } from './snakes.js';
import { FAIL } from '../engine/snakes.js';
import { cinema, stopAllCine } from './cinema.js';
import { NPCS, PLACES, CARD_BY_ID, EVIDENCE, SCN_BY_ID, checksFor, levelTitle, LEVELS } from '../content/index.js';
import { ruleGrade, buildGradePrompt, validateModelGrade, wordCount, questionMarks, fillerCount, matchesAny } from '../engine/grader.js';
import { fillChecks, fillPattern } from '../engine/text.js';
import { DIMS, BANDS, band } from '../engine/rubric.js';
import { choiceResult, gradedResult, sortResult, orderResult, pickResult, compressResult, convoResult, commit, extrasFrom, promoteIfPassed } from '../engine/play.js';
import { prompterBar } from './prompter.js';

// ---------------- helpers ----------------

function seeded(str) {
  let x = 2166136261;
  for (const c of str) x = Math.imul(x ^ c.charCodeAt(0), 16777619);
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 10000) / 10000; };
}
function shuffle(arr, seed) {
  const r = seeded(seed), a = arr.map((v, i) => i);
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  if (a.every((v, i) => v === i) && a.length > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}
const visibleOpts = opts => opts.map((o, i) => ({ o, i })).filter(({ o }) => !o.when || o.when.every(t => t in app.save.tags));
const KEYS = 'ABCDEFG';
const bandLabel = g => BANDS.find(b => b.g === g)?.label || '';

function timerMs(secs) {
  const m = app.save.settings.encounter;
  if (!m) return 0;
  return secs * 1000 * (m / 3);
}

/** A visible countdown bar with a pause control (WCAG 2.2.1: timing adjustable). */
function countdown(ms, onEnd) {
  const bar = h('i');
  const label = h('span', { class: 'muted num', 'aria-live': 'off' });
  let left = ms, last = performance.now(), raf = 0, paused = false, done = false;
  const pauseBtn = h('button', { class: 'link', type: 'button', text: 'Pause timer', onclick: () => { paused = !paused; pauseBtn.textContent = paused ? 'Resume timer' : 'Pause timer'; last = performance.now(); } });
  const el = h('div', { class: 'stack', style: { gap: '6px' } },
    h('div', { class: 'timer', role: 'progressbar', 'aria-label': 'Time left', 'aria-valuemin': 0, 'aria-valuemax': Math.round(ms / 1000) }, bar),
    h('div', { class: 'row', style: { justifyContent: 'space-between' } }, label, pauseBtn));
  function tick(now) {
    if (done) return;
    if (!paused) left -= now - last;
    last = now;
    const f = Math.max(0, left / ms);
    bar.style.transform = `scaleX(${f})`;
    const sec = Math.ceil(Math.max(0, left) / 1000);
    label.textContent = `${sec}s`;
    el.firstChild.setAttribute('aria-valuenow', sec);
    if (left <= 0) { done = true; onEnd(); return; }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  return { el, stop() { done = true; cancelAnimationFrame(raf); el.remove(); } };
}

/** The scene card: backdrop + portrait, swappable speaker and expression. */
function scene(scn) {
  const host = h('div', { class: 'scene' });
  host.append(backdrop(scn.place));
  const face = h('div', { class: 'portrait' });
  host.append(face);
  const caption = h('div', { class: 'caption' },
    h('span', { class: 'chip' }, scn.time || ''),
    h('span', { class: 'chip' }, PLACES[scn.place]?.name || ''));
  host.append(caption);
  let who = scn.npc, expr = 'neutral';
  function draw(animateIn) {
    clear(face);
    if (!who || !NPCS[who]) { face.style.display = 'none'; return; }
    face.style.display = '';
    face.append(isSnake(who) ? snakeArt(who, { title: `${npcName(who)}, still a snake from an earlier scene`, tongue: expr === 'skeptic' || expr === 'cool' ? 0.7 : 0 }) : portrait(NPCS[who].look, expr, { title: `${npcName(who)}, looking ${expr}` }));
    if (animateIn) animate(face, [{ transform: 'translateX(-50%) translateY(6%)', opacity: 0 }, { transform: 'translateX(-50%)', opacity: 1 }], { duration: 420 });
  }
  draw(true);
  return {
    el: host,
    set(nextWho, nextExpr) {
      const changed = nextWho !== undefined && nextWho !== who;
      if (nextWho !== undefined) who = nextWho;
      if (nextExpr) expr = nextExpr;
      draw(changed);
    },
  };
}

function bubble(text, { who, narr } = {}) {
  const t = h('span');
  const b = h('div', { class: 'bubble' + (narr ? ' narr' : '') }, who ? h('span', { class: 'who', text: who }) : null, t);
  return { el: b, async type() { await typewrite(t, text); }, set() { t.textContent = text; } };
}

function head(scn, onExit) {
  const chips = [];
  if (scn.boss) chips.push(h('span', { class: 'chip lacquer' }, 'Review'));
  if (scn.trap) chips.push(h('span', { class: 'chip trapchip', title: 'One of these answers is a snake trap' }, icon('snake', 14), 'Snake trap'));
  if (scn.drill) chips.push(h('span', { class: 'chip brass' }, 'Drill'));
  if (scn.echo) chips.push(h('span', { class: 'chip' }, 'Echo'));
  if (scn.retestOf) chips.push(h('span', { class: 'chip jade' }, 'Retest'));
  chips.push(h('span', { class: 'chip', title: 'Handbook reference' }, scn.hb));
  return h('div', { class: 'stack', style: { gap: '6px' } },
    h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('div', { class: 'row', style: { gap: '6px' } }, chips),
      onExit ? h('button', { class: 'link', type: 'button', onclick: onExit, text: 'Leave scene' }) : null),
    h('h1', { class: 'h2', text: F(scn.title) }));
}

// ---------------- grading ----------------

/** Rule grade now; Claude's rubric grade when available. Returns the grade object (provisional when rule-only). */
async function gradeAnswer(spec, scn, text, statusEl) {
  const checks = fillChecks(checksFor(spec), ctx());
  const rule = ruleGrade({ ...spec, checks }, text);
  if (!aiOn() || app.aiBlocked) return rule;
  const sample = app.caps.sample;
  const npcId = spec.npc || scn.npc;
  const npc = npcId && NPCS[npcId] ? { name: NPCS[npcId].name, role: NPCS[npcId].role, persona: FN(NPCS[npcId].persona) } : null;
  const hook = CARD_BY_ID[scn.hook];
  const neutral = fillChecks(checksFor(spec), { me: app.save.player.name, names: {} });
  const prompt = buildGradePrompt({
    scn: { ...spec, title: FN(scn.title), setting: FN(scn.setting), cue: FN(scn.cue), prompt: FN(spec.prompt || scn.prompt), model: FN(spec.model || scn.model), checks: neutral, dims: spec.dims },
    npc, text, hookText: hook ? FN(hook.a) : '', playerName: app.save.player.name,
  });
  const ctl = new AbortController();
  const skip = h('button', { class: 'link', type: 'button', text: 'Use the instant grade instead', onclick: () => ctl.abort() });
  statusEl.replaceChildren(h('span', { class: 'narr', text: 'T+10 is reading your answer…' }), ' ', skip);
  try {
    const raw = await sample.json(prompt, { modelTier: 'default', signal: ctl.signal });
    const v = validateModelGrade(raw, spec, rule);
    statusEl.replaceChildren();
    return v || rule;
  } catch (e) {
    statusEl.replaceChildren();
    const code = e && e.code;
    if (code === 'not_granted' || code === 'unavailable' || code === 'capability_disabled') app.aiBlocked = true;
    if (code === 'rate_limited') toast('T+10 is busy. Using the instant grade for now.');
    return rule;
  }
}

// ---------------- composer (type / speak / pitch, and typed convo beats) ----------------

function composer(spec, scn, { chat, onSubmit, submitLabel = 'Send' }) {
  const ta = h('textarea', { 'aria-label': F(spec.prompt || scn.prompt || 'Your answer'), placeholder: chat ? `Message ${npcName(scn.npc, true)}` : 'Write your answer…', spellcheck: 'true' });
  const wc = h('span'), qc = h('span'), fc = h('span');
  const counters = h('div', { class: 'counters', 'aria-live': 'polite' }, wc, qc, fc);
  let hints = 0;
  const voices = h('div', { class: 'voices' });
  const H = spec.hints || scn.hints || {};
  const model = F(spec.model || scn.model || '');
  const VOICES = [
    H.nudge && { k: 'nudge', who: 'The Researcher', text: F(H.nudge), label: 'Ask the Researcher (a nudge)' },
    H.frame && { k: 'frame', who: 'The Strategist', text: F(H.frame), label: 'Ask the Strategist (a frame)' },
    model && { k: 'model', who: 'T+10', text: model, label: 'Ask T+10 (see a model answer)' },
  ].filter(Boolean);
  const hintRow = h('div', { class: 'row' });
  const renderHints = () => {
    clear(hintRow);
    const next = VOICES[hints];
    if (next) hintRow.append(h('button', { class: 'btn ghost small', type: 'button', onclick: () => { hints++; voices.append(h('div', { class: 'voice float-up' }, h('b', { text: next.who }), next.text)); cue('soft'); renderHints(); }, text: next.label }));
    if (hints) hintRow.append(h('span', { class: 'muted', style: { fontSize: '.82rem' }, text: `Hints used: ${hints}. They lower XP a little; they never block a grade.` }));
  };
  renderHints();
  const update = () => {
    const t = ta.value;
    const n = wordCount(t);
    wc.textContent = spec.target ? `${n} / ${spec.target} words` : `${n} words`;
    wc.className = spec.target && n > spec.target ? 'over' : '';
    const q = questionMarks(t);
    qc.textContent = spec.maxQ != null ? `${q} / ${spec.maxQ} question mark${spec.maxQ === 1 ? '' : 's'}` : '';
    qc.className = spec.maxQ != null && q > spec.maxQ ? 'over' : '';
    const fl = Object.entries(fillerCount(t));
    fc.textContent = fl.length ? `Fillers: ${fl.map(([k, v]) => `${k}×${v}`).join(', ')}` : '';
    send.disabled = n < 4;
  };
  const status = h('div', { 'aria-live': 'polite' });
  const send = h('button', { class: 'btn lacquer', type: 'button', disabled: true, text: submitLabel, onclick: async () => {
    send.disabled = true; ta.readOnly = true;
    const graded = await gradeAnswer(spec, scn, ta.value, status);
    onSubmit({ text: ta.value, graded, hints });
  } });
  ta.addEventListener('input', update);
  ta.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !send.disabled) send.click(); });
  update();
  const el = h('div', { class: 'composer' + (chat ? ' teams' : '') }, ta, counters, voices, h('div', { class: 'tool-row' }, hintRow, send), status);
  return { el, focus: () => ta.focus() };
}

/** Speaking timer ring (target, not a cutoff). */
function speakRing(secs) {
  const R = 64, C = 2 * Math.PI * R;
  const prog = s('circle', { cx: 75, cy: 75, r: R, class: 'prog', fill: 'none', 'stroke-width': 8, 'stroke-dasharray': C, 'stroke-dashoffset': C, transform: 'rotate(-90 75 75)', 'stroke-linecap': 'round' });
  const txt = s('text', { x: 75, y: 86, 'text-anchor': 'middle', text: String(secs) });
  const svg = s('svg', { viewBox: '0 0 150 150', class: 'ring', role: 'img', 'aria-label': `Speaking timer, ${secs} seconds` },
    s('circle', { cx: 75, cy: 75, r: R, class: 'track', fill: 'none', 'stroke-width': 8 }), prog, txt);
  let t0 = 0, iv = 0;
  const note = h('p', { class: 'muted', style: { textAlign: 'center' }, 'aria-live': 'polite' }, 'Stand up if you can. Say it out loud: the mouth learns what the eyes skip.');
  const btn = h('button', { class: 'btn', type: 'button', text: 'Start speaking', onclick: () => {
    if (iv) { clearInterval(iv); iv = 0; const used = (performance.now() - t0) / 1000; btn.textContent = 'Again'; note.textContent = used <= secs ? `${used.toFixed(0)} seconds, inside the ${secs}-second target.` : `${used.toFixed(0)} seconds, ${Math.round(used - secs)} over. Cut a sentence and try again.`; return; }
    t0 = performance.now(); btn.textContent = 'Stop'; cue('tick');
    iv = setInterval(() => {
      const el = (performance.now() - t0) / 1000;
      prog.setAttribute('stroke-dashoffset', C * (1 - Math.min(1, el / secs)));
      txt.textContent = String(Math.max(0, Math.ceil(secs - el)));
      prog.style.stroke = el > secs ? 'var(--warn)' : '';
      if (el > secs * 2) { clearInterval(iv); iv = 0; btn.textContent = 'Again'; note.textContent = 'Time. Shorter is stronger: try once more.'; }
    }, 200);
  } });
  return { el: h('div', { class: 'stack', style: { justifyItems: 'center' } }, svg, btn, note), stop: () => clearInterval(iv) };
}

// ---------------- main entry ----------------

/**
 * Run one scenario on the stage. opts: { day, onDone(result), onExit }.
 */
export function runScenario(main, scn, opts) {
  stopVoice();
  ambience(scn.place);
  clear(main);
  const stage = h('div', { class: 'stage' });
  main.append(stage);
  const sc = scene(scn);
  const pr = prompterBar(scn);
  stage.append(head(scn, opts.onExit), pr.el, sc.el);
  const dock = h('div', { class: 'stack' });
  stage.append(dock);
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });

  const setting = h('p', { class: 'setting', text: F(scn.setting) });
  const finish = (result, extras = {}, more = {}) => {
    if (pr.used()) result.hints = Math.max(result.hints || 0, 1);
    return finishScenario(main, scn, result, extras, opts, more);
  };

  if (scn.mode === 'convo') return runConvo(scn, sc, dock, setting, finish);

  const cueB = bubble(F(scn.cue), { who: scn.npc ? npcName(scn.npc) : null, narr: !scn.npc });
  dock.append(h('div', { class: 'cue' }, setting, cueB.el, h('div', { class: 'row' }, listenBtn('cue:' + scn.id, scn.cue, { label: 'Listen again' }))));
  speakSeq([['set:' + scn.id, scn.setting], ['cue:' + scn.id, scn.cue]]);
  const prompt = h('p', { class: 'prompt', text: F(scn.prompt || '') });

  const modes = { choose: runChoose, encounter: runChoose, type: runTyped, speak: runTyped, pitch: runTyped, sort: runSort, order: runOrder, pick: runPick, compress: runCompress };
  const fn = modes[scn.mode];
  cueB.type().then(() => { dock.append(prompt); fn(scn, sc, dock, finish); });
}

// ---------------- choose / encounter ----------------

function runChoose(scn, sc, dock, finish) {
  const list = visibleOpts(scn.opts);
  const box = h('div', { class: 'opts', role: 'group', 'aria-label': 'Your options' });
  let timer = null, chosen = false;
  const pick = (entry, btn) => {
    if (chosen) return;
    chosen = true;
    timer?.stop();
    document.removeEventListener('keydown', onKey);
    cue('select');
    for (const b of box.children) b.disabled = true;
    const o = entry ? entry.o : scn.timeout;
    if (btn) btn.classList.add('chosen');
    sc.set(o.speaker, o.expr || 'neutral');
    const r = bubble(F(o.r), { who: o.narr || !scn.npc ? null : npcName(o.speaker || scn.npc, true), narr: !scn.npc });
    dock.append(r.el);
    r.type().then(() => {
      const next = h('button', { class: 'btn lacquer', type: 'button', text: 'See the debrief', onclick: () => finish(choiceResult(scn, o, entry ? entry.i : null), extrasFrom([entry?.o]), { chosen: entry, timedOut: !entry }) });
      dock.append(h('div', { class: 'row' }, next));
      next.focus();
    });
  };
  list.forEach((entry, k) => {
    const b = h('button', { class: 'opt', type: 'button', onclick: () => pick(entry, b) }, h('span', { class: 'k', 'aria-hidden': 'true', text: KEYS[k] }), h('span', { text: F(entry.o.t) }));
    box.append(b);
  });
  const onKey = e => {
    if (e.target.closest('input, textarea')) return;
    const k = KEYS.indexOf(e.key.toUpperCase());
    const n = /^[1-9]$/.test(e.key) ? Number(e.key) - 1 : k;
    if (n >= 0 && n < list.length) { e.preventDefault(); pick(list[n], box.children[n]); }
  };
  document.addEventListener('keydown', onKey);
  dock.append(box);
  if (!reducedMotion()) [...box.children].forEach((b, i) => animate(b, [{ transform: 'translateY(8px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 300, delay: 60 * i, fill: 'backwards' }));
  if (scn.mode === 'encounter' && scn.window) {
    const ms = timerMs(scn.window);
    if (ms) { timer = countdown(ms, () => pick(null, null)); dock.insertBefore(timer.el, box); }
    else dock.insertBefore(h('p', { class: 'muted', text: 'Encounter timer is off (Settings). In real life this moment lasts a few seconds.' }), box);
  }
}

// ---------------- type / speak / pitch ----------------

function runTyped(scn, sc, dock, finish) {
  let ring = null;
  if (scn.mode === 'pitch') {
    const modelCard = h('div', { class: 'panel stack' }, h('b', { text: 'Read the model once' }), h('p', { class: 'narr', text: F(scn.model) }));
    const hide = h('button', { class: 'btn ghost small', type: 'button', text: 'Hide it and rehearse', onclick: () => { modelCard.replaceChildren(h('p', { class: 'muted', text: 'Model hidden. Your version, your words.' })); } });
    modelCard.append(h('div', { class: 'row' }, hide));
    dock.append(modelCard);
    ring = speakRing(scn.secs || 30);
    dock.append(ring.el);
    const cl = h('ul', { class: 'checklist', 'aria-label': 'Self-check after speaking' }, (scn.checklist || []).map(c => h('li', null, h('label', null, h('input', { type: 'checkbox' }), h('span', { text: F(c) })))));
    dock.append(h('div', { class: 'panel stack' }, h('b', { text: 'Self-check' }), cl));
  } else if (scn.mode === 'speak') {
    ring = speakRing(scn.secs || 45);
    dock.append(ring.el);
  }
  const label = scn.mode === 'type' ? null : h('p', { class: 'muted', text: 'Now type the gist of what you said. The grade reads the words; the timer trained the delivery.' });
  if (label) dock.append(label);
  const c = composer(scn, scn, { chat: scn.chat, submitLabel: scn.chat ? 'Send' : 'Submit', onSubmit: ({ text, graded, hints }) => {
    ring?.stop();
    const result = gradedResult(scn, graded, text, hints);
    const r = scn.react?.[band(graded.grade)];
    const extras = { promises: (graded.promises || []).map((p, i) => ({ id: `m_${scn.id}_${i}`, text: p.text, npc: scn.npc, due: p.due })) };
    finish(result, extras, { graded, react: r });
  } });
  dock.append(c.el);
}

// ---------------- sort ----------------

function runSort(scn, sc, dock, finish) {
  const order = shuffle(scn.items, scn.id);
  const place = scn.items.map(() => -1); // -1 = pool
  let sel = null, checked = false;
  const pool = h('div', { class: 'pool', role: 'list', 'aria-label': 'Unsorted' });
  const bins = scn.bins.map((name, bi) => {
    const list = h('div', { class: 'stack', style: { gap: '6px' }, role: 'list' });
    const btn = h('button', { class: 'btn ghost small', type: 'button', text: `Move here: ${F(name)}`, onclick: () => moveTo(bi) });
    const el = h('div', { class: 'bin' }, h('h2', { class: 'h3', text: F(name) }), list, btn);
    el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('target'); });
    el.addEventListener('dragleave', () => el.classList.remove('target'));
    el.addEventListener('drop', e => { e.preventDefault(); el.classList.remove('target'); const i = Number(e.dataTransfer.getData('text/plain')); if (Number.isInteger(i)) { sel = i; moveTo(bi); } });
    return { el, list, btn };
  });
  const items = scn.items.map((it, i) => {
    const b = h('button', { class: 'item', type: 'button', draggable: 'true', role: 'listitem', text: F(it.t), 'aria-pressed': 'false', onclick: () => { if (checked) return; sel = sel === i ? null : i; render(); cue('select'); } });
    b.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', String(i)); });
    return b;
  });
  const check = h('button', { class: 'btn lacquer', type: 'button', text: 'Check', disabled: true, onclick: () => {
    checked = true;
    const res = sortResult(scn, place);
    items.forEach((b, i) => {
      const ok = place[i] === scn.items[i].b;
      b.classList.add(ok ? 'right' : 'wrong'); b.disabled = true;
      b.replaceChildren(h('span', null, mark(ok, ok ? 'Right: ' : 'Not quite: '), F(scn.items[i].t)), h('small', { class: 'muted', style: { display: 'block', marginTop: '4px' }, text: (ok ? 'Right. ' : `Belongs in ${F(scn.bins[scn.items[i].b])}. `) + F(scn.items[i].why || '') }));
    });
    bins.forEach(bn => bn.btn.remove());
    check.replaceWith(h('div', { class: 'row' }, h('span', { class: 'chip', text: `${res.right} of ${res.n} sorted well` }), h('button', { class: 'btn lacquer', type: 'button', text: 'See the debrief', onclick: () => finish(res) })));
  } });
  function moveTo(bi) { if (sel == null || checked) return; place[sel] = bi; sel = null; render(); }
  function render() {
    clear(pool); bins.forEach(b => clear(b.list));
    for (const i of order) {
      const b = items[i];
      b.classList.toggle('sel', sel === i);
      b.setAttribute('aria-pressed', String(sel === i));
      (place[i] === -1 ? pool : bins[place[i]].list).append(b);
    }
    if (!pool.children.length) pool.append(h('span', { class: 'muted', text: 'All sorted. Tap any line to move it again, or check.' }));
    bins.forEach(b => { b.btn.disabled = sel == null; });
    check.disabled = place.some(p => p === -1);
  }
  dock.append(h('div', { class: 'sortboard' }, h('p', { class: 'muted', text: 'Tap a line, then tap where it belongs. You can also drag.' }), pool, h('div', { class: 'bins' }, bins.map(b => b.el)), h('div', { class: 'row' }, check)));
  render();
}

// ---------------- order ----------------

function runOrder(scn, sc, dock, finish) {
  let cur = shuffle(scn.items, scn.id);
  let drag = null, done = false;
  const ol = h('ol', { class: 'olist', 'aria-label': 'Put these in order' });
  const live = h('p', { class: 'sr', 'aria-live': 'polite' });
  function move(pos, d) {
    const j = pos + d;
    if (j < 0 || j >= cur.length || done) return;
    [cur[pos], cur[j]] = [cur[j], cur[pos]];
    render(cur[j]);
    live.textContent = `Moved to position ${j + 1}.`;
  }
  function render(focusIdx) {
    clear(ol);
    cur.forEach((orig, pos) => {
      const up = h('button', { type: 'button', 'aria-label': 'Move up', disabled: pos === 0 || done, onclick: () => move(pos, -1) }, icon('up', 18));
      const dn = h('button', { type: 'button', 'aria-label': 'Move down', disabled: pos === cur.length - 1 || done, onclick: () => move(pos, 1) }, icon('down', 18));
      const li = h('li', { draggable: done ? null : 'true', dataset: { orig } }, h('span', { class: 'n', text: String(pos + 1) }), h('span', { text: F(scn.items[orig]) }), h('span', { class: 'mv' }, up, dn));
      if (done) {
        const ok = orig === pos;
        li.children[0].replaceChildren(ok ? mark(true, 'In the right place') : h('span', { text: String(orig + 1), title: `Belongs at ${orig + 1}` }, h('span', { class: 'sr', text: ` (belongs at ${orig + 1})` })));
        li.classList.add(ok ? 'ok' : 'no');
      }
      li.addEventListener('dragstart', () => { drag = pos; li.classList.add('dragging'); });
      li.addEventListener('dragend', () => li.classList.remove('dragging'));
      li.addEventListener('dragover', e => e.preventDefault());
      li.addEventListener('drop', e => { e.preventDefault(); if (drag == null || drag === pos) return; const [x] = cur.splice(drag, 1); cur.splice(pos, 0, x); drag = null; render(); });
      ol.append(li);
      if (focusIdx === orig) (pos === 0 ? dn : up).focus();
    });
  }
  const submit = h('button', { class: 'btn lacquer', type: 'button', text: 'Lock in this order', onclick: () => {
    done = true; render();
    const res = orderResult(scn, cur);
    submit.replaceWith(h('div', { class: 'stack' },
      scn.why ? h('p', { class: 'narr', text: F(scn.why) }) : null,
      h('div', { class: 'row' }, h('span', { class: 'chip', text: `${res.exact} of ${res.n} in exactly the right place` }), h('button', { class: 'btn lacquer', type: 'button', text: 'See the debrief', onclick: () => finish(res) }))));
  } });
  dock.append(h('p', { class: 'muted', text: 'Use the arrows, or drag.' }), ol, live, h('div', { class: 'row' }, submit));
  render();
}

// ---------------- pick ----------------

function runPick(scn, sc, dock, finish) {
  const order = shuffle(scn.items, scn.id);
  const picked = new Set();
  const count = h('span', { class: 'chip num' });
  const box = h('div', { class: 'opts' });
  const btns = {};
  const go = h('button', { class: 'btn lacquer', type: 'button', text: 'Lock in', disabled: true, onclick: () => {
    const res = pickResult(scn, [...picked]);
    for (const i of order) {
      const it = scn.items[i], b = btns[i];
      b.disabled = true;
      const verdict = it.good ? (picked.has(i) ? 'Good pick' : 'Missed: a good one') : (picked.has(i) ? 'Weaker choice' : 'Rightly left');
      b.querySelector('.k').replaceChildren(it.good ? icon('check', 16) : '');
      b.lastChild.append(h('small', { class: 'muted', style: { display: 'block', marginTop: '4px' }, text: `${verdict}. ${F(it.why)}` }));
    }
    go.replaceWith(h('button', { class: 'btn lacquer', type: 'button', text: 'See the debrief', onclick: () => finish(res) }));
  } });
  const upd = () => { count.textContent = `${picked.size} of ${scn.pickN} chosen`; go.disabled = picked.size !== scn.pickN; };
  for (const i of order) {
    const b = h('button', { class: 'opt', type: 'button', 'aria-pressed': 'false', onclick: () => {
      if (picked.has(i)) picked.delete(i); else if (picked.size < scn.pickN) picked.add(i); else return toast(`Choose exactly ${scn.pickN}. Untick one first.`);
      b.classList.toggle('chosen', picked.has(i)); b.setAttribute('aria-pressed', String(picked.has(i))); cue('select'); upd();
    } }, h('span', { class: 'k', 'aria-hidden': 'true', text: '' }), h('span', null, h('span', { text: F(scn.items[i].t) })));
    btns[i] = b; box.append(b);
  }
  dock.append(box, h('div', { class: 'row' }, count, go));
  upd();
}

// ---------------- compress ----------------

function runCompress(scn, sc, dock, finish) {
  const ta = h('textarea', { 'aria-label': 'Edit the draft', spellcheck: 'true' });
  ta.value = F(scn.draft);
  const keep = scn.keep.map(k => ({ ...k, any: k.any.map(a => fillPattern(a, ctx())) }));
  const wc = h('span');
  const marks = keep.map(k => h('li', null, h('span', { class: 'ic' }), h('span', { text: F(k.l) })));
  const upd = () => {
    const n = wordCount(ta.value);
    wc.textContent = `${n} / ${scn.target} words`;
    wc.className = n > scn.target ? 'over' : '';
    keep.forEach((k, i) => { const ok = matchesAny(ta.value, k.any); marks[i].firstChild.replaceChildren(mark(ok)); marks[i].style.color = ok ? 'var(--ink)' : 'var(--mist)'; marks[i].setAttribute('aria-label', `${ok ? 'Kept' : 'Missing'}: ${F(k.l)}`); });
  };
  ta.addEventListener('input', upd);
  const submit = h('button', { class: 'btn lacquer', type: 'button', text: 'Submit the cut', onclick: () => {
    const res = compressResult({ ...scn, keep }, ta.value, (t, any) => matchesAny(t, any), wordCount);
    finish(res, {}, { compress: true });
  } });
  dock.append(h('div', { class: 'composer' }, ta, h('div', { class: 'counters', 'aria-live': 'polite' }, wc)), h('div', { class: 'panel stack' }, h('b', { text: 'Must survive the cut' }), h('ul', { class: 'checklist' }, marks)), h('div', { class: 'row' }, submit));
  upd();
}

// ---------------- convo ----------------

function runConvo(scn, sc, dock, setting, finish) {
  const log = h('div', { class: 'stack', 'aria-live': 'polite' });
  const opener = bubble(F(scn.cue), { narr: true });
  dock.append(h('div', { class: 'cue' }, setting, opener.el), log);
  speakSeq([['set:' + scn.id, scn.setting], ['cue:' + scn.id, scn.cue]]);
  const steps = [], chosen = [], record = [];
  let talk = 0, talkN = 0;
  let meter = null;
  if (scn.meter === 'talk') {
    const you = h('i', { class: 'you' });
    const target = scn.meterTarget || 35;
    const lab = h('span', { text: `Your share of talk: aim for about ${target}%` });
    meter = { el: h('div', { class: 'meter' }, lab, h('div', { class: 'track' }, you, h('i', { class: 'mark', style: { left: target + '%' } }))), you, lab, target };
    dock.insertBefore(meter.el, log);
  }
  const updMeter = () => {
    if (!meter || !talkN) return;
    const sh = Math.round(talk / talkN);
    meter.you.style.transform = `scaleX(${sh / 100})`;
    meter.lab.textContent = `Your share of talk: ${sh}% (aim for about ${meter.target}%)${sh - meter.target > 15 ? ', you are doing most of the talking' : ''}`;
  };

  let bi = 0;
  opener.type().then(next);

  async function next() {
    if (bi >= scn.beats.length) {
      const res = convoResult(scn, steps);
      return finish(res, extrasFrom(chosen), { convo: record });
    }
    const beat = scn.beats[bi++];
    const speaker = beat.speaker || scn.npc;
    sc.set(speaker, beat.expr || 'neutral');
    const line = beat.altLine && beat.altLine.tag in app.save.tags ? beat.altLine.line : beat.line;
    const b = bubble(F(line), { who: beat.narr ? null : npcName(speaker, true), narr: !!beat.narr });
    log.append(b.el);
    b.el.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
    enqueue('beat:' + scn.id + ':' + (bi - 1), line);
    await b.type();
    if (beat.type) return typedBeat(beat, F(line));
    choiceBeat(beat, F(line));
  }

  function choiceBeat(beat, line) {
    const list = visibleOpts(beat.opts);
    const box = h('div', { class: 'opts', role: 'group', 'aria-label': 'Your reply' });
    let timer = null, done = false;
    const pick = (entry, btn) => {
      if (done) return; done = true;
      timer?.stop();
      document.removeEventListener('keydown', onKey);
      cue('select');
      const o = entry ? entry.o : (beat.timeout || { g: 'C', r: 'The moment passes.', why: '' });
      if (entry) { steps.push({ kind: 'opt', opt: o, index: entry.i }); chosen.push(o); if (typeof o.talk === 'number') { talk += o.talk; talkN++; updMeter(); } }
      else steps.push({ kind: 'timeout', beat });
      record.push({ line, said: entry ? o.t : '(no answer in time)', g: o.g || 'C', why: o.why, r: o.r });
      box.remove();
      if (entry) log.append(h('div', { class: 'msg me float-up', text: F(o.t) }));
      sc.set(o.speaker || undefined, o.expr || undefined);
      const r = bubble(F(o.r || ''), { who: o.narr ? null : npcName(o.speaker || beat.speaker || scn.npc, true) });
      if (o.r) log.append(r.el);
      (o.r ? r.type() : Promise.resolve()).then(async () => {
        await wait(reducedMotion() ? 0 : 350);
        const n = h('button', { class: 'btn small', type: 'button', text: bi >= scn.beats.length ? 'Finish' : 'Continue', onclick: () => { n.remove(); next(); } });
        log.append(n); n.focus();
      });
    };
    list.forEach((entry, k) => {
      const b = h('button', { class: 'opt', type: 'button', onclick: () => pick(entry, b) }, h('span', { class: 'k', 'aria-hidden': 'true', text: KEYS[k] }), h('span', { text: F(entry.o.t) }));
      box.append(b);
    });
    const onKey = e => {
      if (e.target.closest('input, textarea')) return;
      const n = /^[1-9]$/.test(e.key) ? Number(e.key) - 1 : KEYS.indexOf(e.key.toUpperCase());
      if (n >= 0 && n < list.length) { e.preventDefault(); pick(list[n], box.children[n]); }
    };
    document.addEventListener('keydown', onKey);
    log.append(box);
    if (beat.window) {
      const ms = timerMs(beat.window);
      if (ms) { timer = countdown(ms, () => pick(null)); log.insertBefore(timer.el, box); }
    }
    box.firstChild?.focus({ preventScroll: true });
  }

  function typedBeat(beat, line) {
    const spec = { ...beat.type, npc: beat.speaker || scn.npc, checks: checksFor(beat.type) };
    const wrap = h('div', { class: 'stack' });
    let ring = null;
    if (spec.mode === 'speak' && spec.secs) { ring = speakRing(spec.secs); wrap.append(ring.el); }
    wrap.append(h('p', { class: 'prompt', text: F(spec.prompt || 'Your reply') }));
    const c = composer(spec, scn, { submitLabel: 'Say it', onSubmit: ({ text, graded }) => {
      ring?.stop();
      wrap.remove();
      steps.push({ kind: 'type', graded, beat, text });
      record.push({ line, said: text, g: graded.grade, graded, typed: true });
      log.append(h('div', { class: 'msg me float-up', text }));
      const r = beat.type.react?.[band(graded.grade)];
      if (r) { sc.set(undefined, r.expr || (band(graded.grade) === 'SA' ? 'warm' : band(graded.grade) === 'CD' ? 'skeptic' : 'neutral')); const rb = bubble(F(r.r), { who: npcName(beat.speaker || scn.npc, true) }); log.append(rb.el); rb.type().then(cont); }
      else cont();
      function cont() { const n = h('button', { class: 'btn small', type: 'button', text: bi >= scn.beats.length ? 'Finish' : 'Continue', onclick: () => { n.remove(); next(); } }); log.append(n); n.focus(); }
    } });
    wrap.append(c.el);
    log.append(wrap);
    c.focus();
  }
}

// ---------------- commit + debrief ----------------

async function finishScenario(main, scn, result, extras, opts, more) {
  const save = app.save;
  const snakesBefore = snakes();
  const day = opts.day;
  const evBefore = new Set(Object.keys(save.evidence));
  const prevBest = save.scn[scn.id]?.best?.g || null;
  let promoted = false;
  // A practice run of a scene ahead of the story changes nothing in the save.
  if (!opts.practice) {
    commit(save, scn, result, day, extras);
    if (scn.boss) promoted = promoteIfPassed(save, scn, result, day);
    persist();
  }
  const newEv = Object.keys(save.evidence).filter(k => !evBefore.has(k));
  const bait = !!(more?.chosen?.o?.bait || (more?.convo && extras?.bait));
  try { await snakeAftermath(scn, snakesBefore, snakes(), { practice: !!opts.practice, failed: FAIL.has(result.grade), bait }); } catch { /* films are optional */ }
  app.venom?.draw();
  cue(result.pct >= 75 ? 'good' : 'soft');
  renderDebrief(main, scn, result, { ...more, newEv, prevBest, promoted, opts, extras });
}

function dimBars(scores, dims) {
  return h('div', { class: 'dims' }, dims.map(d => {
    const v = scores[d] ?? 0;
    const bar = h('i');
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transform = `scaleX(${v / 4})`; }));
    return h('div', { class: 'dim', title: DIMS[d].hook }, h('span', { text: DIMS[d].name }), h('div', { class: 'bar', role: 'img', 'aria-label': `${DIMS[d].name}: ${v} of 4` }, bar), h('b', { class: 'num', text: `${v}/4` }));
  }));
}

function hookCard(id) {
  const c = CARD_BY_ID[id];
  if (!c) return null;
  const el = h('div', { class: 'hook' }, h('div', { class: 'inner' },
    h('div', { class: 'face' }, h('span', { class: 'chip brass', text: 'Hook card, added to your Dojo' }), h('p', { class: 'q', text: F(c.q) }), h('p', { class: 'muted', text: 'Try to answer it in your head, then flip.' })),
    h('div', { class: 'face back', 'aria-hidden': 'true' }, h('p', { class: 'a', text: F(c.a) }))));
  const btn = h('button', { class: 'btn ghost small', type: 'button', text: 'Flip the card', 'aria-expanded': 'false', onclick: () => {
    const on = el.classList.toggle('flip');
    btn.setAttribute('aria-expanded', String(on));
    el.querySelector('.back').setAttribute('aria-hidden', String(!on));
    el.querySelector('.face:not(.back)').setAttribute('aria-hidden', String(on));
    btn.textContent = on ? 'Flip back' : 'Flip the card';
  } });
  return h('div', { class: 'stack' }, el, h('div', { class: 'row' }, btn));
}

function renderDebrief(main, scn, result, info) {
  stopVoice();
  clear(main);
  const { opts } = info;
  const wrap = h('div', { class: 'stage debrief' });
  main.append(wrap);
  window.scrollTo({ top: 0 });
  const g = result.grade;
  const prov = !!result.provisional;
  const sealEl = h('div', { class: 'seal-wrap' }, seal(g, { provisional: prov, label: `Grade ${g}, ${bandLabel(g)}${prov ? ', instant grade' : ''}` }));
  setTimeout(() => cue('stamp'), 120);
  const verdictText = h('div', { class: 'stack', style: { gap: '4px' } },
    h('span', { class: 'chip', text: F(scn.title) }),
    h('h2', { text: `${bandLabel(g)}` }),
    h('p', { class: 'muted num', text: `${result.pct}%${prov ? ', instant grade (rules)' : result.scores ? ', graded by T+10' : ''}${info.prevBest ? `. Previous best ${info.prevBest}.` : ''}` }));
  wrap.append(h('div', { class: 'verdict panel' }, sealEl, verdictText));

  // NPC reaction for graded answers
  if (info.react) {
    const sc = scene(scn);
    sc.set(undefined, info.react.expr || (band(g) === 'SA' ? 'warm' : band(g) === 'CD' ? 'skeptic' : 'neutral'));
    const b = bubble(F(info.react.r), { who: info.react.narr || !scn.npc ? null : npcName(scn.npc, true), narr: !!info.react.narr || !scn.npc });
    wrap.append(sc.el, b.el);
    b.type();
  }

  // Graded feedback
  if (info.graded) {
    const gr = info.graded;
    if (gr.scores) wrap.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'The seven dimensions (those this scene tests)' }), dimBars(gr.scores, Object.keys(gr.scores))));
    wrap.append(h('div', { class: 'panel fb' },
      h('div', { class: 'line' }, h('b', { text: 'Strength' }), h('p', { text: gr.strength })),
      h('div', { class: 'line' }, h('b', { text: 'One fix' }), h('p', { text: gr.fix })),
      h('div', { class: 'line' }, h('b', { text: 'Try this' }), h('p', { class: 'modelline', text: F(gr.model_line || scn.model || '') })),
      gr.meta?.words != null ? h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: `${gr.meta.words} words${scn.target ? ` (target ${scn.target})` : ''}, ${gr.meta.q} question mark${gr.meta.q === 1 ? '' : 's'}` }) : null));
    if (scn.retestOf) {
      const first = app.save.scn[scn.retestOf]?.att?.[0];
      if (first?.t) wrap.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: `What you wrote on Day ${SCN_BY_ID[scn.retestOf]?.day}` }), h('p', { class: 'narr', text: first.t }), h('p', { class: 'muted', text: `That earned ${first.g}. Today: ${g}.` })));
    }
  }

  // Choice feedback
  if (scn.opts && (info.chosen || info.timedOut)) {
    const o = info.chosen ? info.chosen.o : scn.timeout;
    wrap.append(h('div', { class: 'panel fb' },
      h('div', { class: 'line' }, h('b', { text: 'You chose' }), h('p', { text: info.chosen ? F(o.t) : 'Nothing, in time.' })),
      h('div', { class: 'line' }, h('b', { text: 'Why' }), h('p', { text: F(o.why || '') }))));
    const others = visibleOpts(scn.opts).filter(e => e !== info.chosen && e.o !== info.chosen?.o);
    if (others.length) {
      wrap.append(h('details', { class: 'panel' }, h('summary', { text: 'The other options, and why (worked examples)' }),
        h('div', { class: 'stack', style: { marginTop: '10px' } }, others.map(e => h('div', { class: 'fb' }, h('div', { class: 'line' }, h('b', { class: 'num', text: `Grade ${e.o.g}` }), h('div', null, h('p', { text: F(e.o.t) }), h('p', { class: 'muted', text: F(e.o.why) }))))))));
    }
  }

  // Convo beats
  if (info.convo) {
    const band3 = band(g);
    const resLine = scn.result?.[band3]?.r;
    if (resLine) wrap.append(h('div', { class: 'bubble' + (scn.result[band3].narr ? ' narr' : '') }, h('span', { class: 'who', text: scn.npc ? npcName(scn.npc, true) : '' }), F(resLine)));
    if (result.talkShare != null) wrap.append(h('p', { class: 'muted', text: `Your share of talk: ${result.talkShare}% (aim ≈ ${scn.meterTarget || 35}%).` }));
    wrap.append(h('details', { class: 'panel', open: true }, h('summary', { text: 'Beat by beat' }),
      h('ol', { class: 'stack', style: { marginTop: '10px', paddingLeft: '18px' } }, info.convo.map(r => h('li', null,
        h('p', { class: 'muted', text: r.line }),
        h('p', null, h('b', { class: 'num', text: `${r.g}  ` }), F(r.said)),
        r.typed ? h('p', { class: 'muted', text: `${r.graded.fix} Try: “${F(r.graded.model_line)}”` }) : h('p', { class: 'muted', text: F(r.why || '') }))))));
  }

  // Sort/order/pick/compress summary
  if (info.compress) {
    wrap.append(h('div', { class: 'panel stack' }, h('p', { text: `${result.words} words against a ${scn.target}-word target. Kept ${result.kept.filter(Boolean).length} of ${scn.keep.length} essentials.` }), scn.model ? h('p', { class: 'modelline', text: F(scn.model) }) : null));
  }

  // Deltas, evidence, promises
  const chips = fxChips(result.fx);
  if (chips.length) wrap.append(h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'muted', style: { fontSize: '.85rem' }, text: 'What changed' }), h('div', { class: 'deltas' }, chips)));
  for (const id of info.newEv) {
    const e = EVIDENCE[id];
    const card = h('div', { class: 'ev got float-up' }, h('span', { class: 'chip brass', text: 'Evidence card earned' }), h('h2', { class: 'h3', text: F(e.name) }), h('p', { class: 'muted', text: F(e.desc) }));
    wrap.append(card);
  }
  if (scn.ev && !app.save.evidence[scn.ev.id] && !info.newEv.length) wrap.append(h('p', { class: 'muted', text: `Evidence card “${F(EVIDENCE[scn.ev.id].name)}” needs grade ${scn.ev.min || 'B'} or better here. Replay any time.` }));
  for (const p of info.extras?.promises || []) wrap.append(h('p', { class: 'chip lacquer', text: `Promise logged: ${F(p.text)}` }));
  if (info.extras?.discover?.length) for (const d of info.extras.discover) wrap.append(h('p', { class: 'chip jade', text: `You learned something about ${npcName(d.npc, true)} (see People).` }));
  if (scn.boss && !result.passed) wrap.append(h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Not yet.' }), h('p', { text: 'The review stays open and the gate stays met. Look at the beat-by-beat, practise the weak moment in the Library, then go again. Most people need two tries at this one.' })));

  const hk = hookCard(scn.hook);
  if (hk) wrap.append(hk);

  // Personal insight and the follow-ups people ask next
  const fy = forYou(scn);
  if (fy) wrap.append(fy);
  if (DEEP[scn.id]?.follow?.length) wrap.append(h('details', { class: 'panel', open: !opts.practice || undefined }, h('summary', { text: `What they ask next (${DEEP[scn.id].follow.length} follow-ups with sample answers)` }), h('div', { style: { marginTop: '12px' } }, followDrill(scn))));
  if (opts.practice) wrap.append(h('p', { class: 'chip', text: 'Practice run: this scene is ahead of your story, so nothing was saved.' }));

  // Actions
  const actions = h('div', { class: 'row' });
  const left = opts.runLeft?.() || 0;
  const cont = h('button', { class: 'btn lacquer', type: 'button', text: left ? `Next in your run (${left} left)` : 'Continue', onclick: async () => {
    if (info.promoted) await liftRide(app.save.level);
    opts.onDone(result);
  } });
  actions.append(cont);
  if (!scn.boss || !result.passed) actions.append(h('button', { class: 'btn ghost', type: 'button', text: 'Rewind and try again', onclick: () => runScenario(main, scn, opts) }));
  if (result.text) actions.append(h('button', { class: 'btn ghost', type: 'button', text: 'Save to My Scripts', onclick: e => {
    app.save.scripts.push({ id: scn.id, title: F(scn.title), text: result.text, day: opts.day, ts: Date.now() });
    persist(); e.target.disabled = true; e.target.textContent = 'Saved'; toast('Saved to My Scripts (Portfolio).');
  } }));
  actions.append(h('a', { class: 'btn ghost', href: '#sheet-' + scn.id, text: 'See every script' }));
  actions.append(h('button', { class: 'link', type: 'button', text: 'I disagree with this grade', onclick: async () => {
    const ta = h('textarea', { rows: 4, 'aria-label': 'What did the grade miss?', style: { width: '100%' } });
    const ok = await dialog({ title: 'What did the grade miss?', body: h('div', { class: 'field' }, h('p', { class: 'muted', text: 'Disagreeing is a skill too. Your note is kept in your Portfolio and the scene stays replayable.' }), ta), actions: [{ label: 'Cancel', value: false }, { label: 'Save note', kind: 'lacquer', value: true }] });
    if (ok && ta.value.trim()) { app.save.disagreements.push({ scn: scn.id, text: ta.value.trim().slice(0, 600), ts: Date.now() }); persist(); toast('Noted. Thank you.'); }
  } }));
  wrap.append(actions);
  cont.focus({ preventScroll: true });
}

// ---------------- promotion: the lift ride ----------------

export function liftRide(level) {
  return new Promise(resolve => {
    const L = LEVELS[level];
    const title = levelTitle(level, app.save.branch);
    const fromFloor = LEVELS[Math.max(1, level - 1)].floor;
    const btn = h('button', { class: 'btn lacquer', type: 'button', text: 'Step out', onclick: () => { stopAllCine(); el.remove(); resolve(); } });
    const el = h('div', { class: 'lift open', role: 'dialog', 'aria-modal': 'true', 'aria-label': `Promoted to ${title}, floor ${L.floor}` },
      h('div', { class: 'panelx' },
        cinema('promotion', { fromFloor, toFloor: L.floor, title }, { label: `The lift climbs from floor ${fromFloor} to ${L.floor}. ${title}.` }),
        h('h2', { text: title }), h('p', { class: 'muted', text: `Floor ${L.floor}. Promoted on evidence, not on points.` }), btn));
    document.body.append(el);
    cue('lift');
    btn.focus();
  });
}

export { icon };
