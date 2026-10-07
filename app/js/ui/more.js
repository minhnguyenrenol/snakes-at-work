// Settings, the T+10 coach, the ending with its letter, and the mobile "More" menu.
import { h, clear } from '../dom.js';
import { app, F, FN, D, persist, go, npcName, toast, dialog, sectionHead, applySettings, today, aiOn } from './core.js';
import { icon } from './art.js';
import { copy, downloadText, playbookMarkdown } from './views.js';
import { cinema } from './cinema.js';
import { NPCS, NPC_IDS, LEVELS, levelTitle, EVIDENCE, MAX_DAY, DAY_BY_N, SCN_BY_ID } from '../content/index.js';
import { newSave, normalizeSave, ENDINGS, decideEnding, currentDay, STATS, STAT_KEYS } from '../engine/game.js';

// ---------------- more ----------------

export function more(main) {
  const items = [
    ['den', 'snake', 'Snake den', 'Who is a snake right now, and how to charm them back.'],
    ['atlas', 'map', 'Practice Atlas', 'Every scene, script and follow-up in one map.'],
    ['scripts', 'script', 'Script library', 'Ready-to-say lines, read aloud.'],
    ['dossier', 'user', 'Your dossier', 'Strengths, gaps and the risks the scenes train.'],
    ['library', 'library', 'Library', 'Replay any scene you have reached.'],
    ['dojo', 'brain', 'Dojo round', 'A short spaced-retrieval session.'],
    ['portfolio', 'cards', 'Portfolio', 'Evidence, scripts, Real Moves.'],
    ['coach', 'coach', 'Coach', 'Ask T+10 about a real situation.'],
    ['settings', 'gear', 'Settings', 'Theme, motion, timers, names, data.'],
  ];
  clear(main);
  main.append(h('div', { class: 'section' }, sectionHead('More'), h('div', { class: 'stack', style: { gap: '8px' } }, items.map(([r, ic, t, d]) =>
    h('button', { class: 'panel row', style: { textAlign: 'left', cursor: 'pointer', flexWrap: 'nowrap' }, onclick: () => go(r) }, icon(ic, 22), h('div', null, h('b', { text: t }), h('p', { class: 'muted', style: { fontSize: '.88rem' }, text: d })))))));
}

// ---------------- settings ----------------

function radios(name, value, opts, onChange) {
  return h('div', { class: 'radio-cards', role: 'radiogroup', 'aria-label': name }, opts.map(([v, label, hint]) =>
    h('label', null, h('input', { type: 'radio', name, value: String(v), checked: String(value) === String(v), onchange: () => onChange(v) }), h('span', null, h('b', { text: label }), hint ? h('small', { class: 'muted', style: { display: 'block' }, text: hint }) : null))));
}

function slider(id, label, value, onChange) {
  const out = h('output', { for: id, class: 'num muted', text: `${Math.round(value * 100)}%` });
  return h('div', { class: 'slider' }, h('label', { for: id, text: label }),
    h('input', { type: 'range', id, min: 0, max: 100, step: 5, value: Math.round(value * 100), oninput: e => { out.textContent = `${e.target.value}%`; }, onchange: e => onChange(Number(e.target.value) / 100) }), out);
}

function toggle(label, hint, checked, onChange) {
  const id = 't' + Math.random().toString(36).slice(2, 8);
  return h('div', { class: 'toggle' }, h('label', { for: id }, h('b', { text: label }), hint ? h('small', { class: 'muted', style: { display: 'block' }, text: hint }) : null),
    h('input', { type: 'checkbox', id, checked, onchange: e => onChange(e.target.checked) }));
}

export function settings(main) {
  const save = app.save;
  const st = save.settings;
  const set = (k, v) => { st[k] = v; persist(); applySettings(); };
  const name = h('input', { type: 'text', id: 'sname', maxlength: 40, value: save.player.name, onchange: e => { save.player.name = e.target.value.trim().slice(0, 40) || 'Minh'; persist(); toast('Name saved.'); } });

  const relabel = h('div', { class: 'stack', style: { gap: '8px' } }, NPC_IDS.map(id => {
    const inp = h('input', { type: 'text', id: 'rl_' + id, maxlength: 40, placeholder: NPCS[id].name, value: st.names[id] || '', onchange: e => { const v = e.target.value.trim(); if (v) st.names[id] = v.slice(0, 40); else delete st.names[id]; persist(); } });
    return h('div', { class: 'field' }, h('label', { for: 'rl_' + id, text: `${NPCS[id].name}, ${NPCS[id].role}` }), inp);
  }));

  clear(main);
  main.append(h('div', { class: 'section', style: { maxWidth: '760px', margin: '0 auto' } }, sectionHead('Settings'),
    h('div', { class: 'panel stack' }, h('div', { class: 'field' }, h('label', { for: 'sname', text: 'Your name in the story' }), name)),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Look and feel' }),
      h('div', { class: 'field' }, h('span', { class: 'muted', text: 'Theme' }), radios('theme', st.theme, [['system', 'Match my device'], ['dark', 'Night'], ['light', 'Day']], v => set('theme', v))),
      h('div', { class: 'field' }, h('span', { class: 'muted', text: 'Motion' }), radios('motion', st.motion, [['system', 'Match my device'], ['full', 'Full cinematics'], ['reduced', 'Reduced', 'Stills instead of animation']], v => set('motion', v))),
      toggle('Reading spacing', 'Wider letter and line spacing.', st.dyslexia, v => set('dyslexia', v))),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Sound and voices' }),
      toggle('Read lines aloud', 'Recorded voices for the cast and T+10 play as scenes open. Press Listen on any line to hear it again.', st.voice, v => set('voice', v)),
      toggle('Sound cues', 'Soft tones on choices, reveals and grades.', st.sound, v => set('sound', v)),
      toggle('Office snakes (Rắn công sở)', 'Stakeholders turn into snakes when a scene goes badly, and you can become one too. Off keeps the plain career game.', st.snakes !== false, v => { set('snakes', v); app.venom?.draw(); }),
      toggle('Room ambience', 'A quiet bed of sound for each place: the river, the café, the lift. It dips while people speak.', st.amb, v => set('amb', v)),
      slider('vol_voice', 'Voice volume', st.vol.voice, v => { st.vol.voice = v; persist(); }),
      slider('vol_sfx', 'Cue volume', st.vol.sfx, v => { st.vol.sfx = v; persist(); applySettings(); }),
      slider('vol_amb', 'Ambience volume', st.vol.amb, v => { st.vol.amb = v; persist(); applySettings(); }),
      h('p', { class: 'muted', style: { fontSize: '.85rem' }, text: 'The voices were recorded for this game with a neural voice model and say the story names. If you rename yourself, lines that say your name use your device voice instead.' })),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Pace' }),
      h('div', { class: 'field' }, h('span', { class: 'muted', text: 'Timed moments (walk-pasts, phones buzzing)' }), radios('encounter', st.encounter, [[3, 'Normal'], [6, 'Double time'], [0, 'No timer']], v => set('encounter', Number(v)))),
      toggle('Play ahead', 'Open the next day without waiting for tomorrow. Spacing works better if you wait.', st.playAhead, v => set('playAhead', v))),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Coaching' }),
      toggle('Grade with T+10 (Claude)', app.caps.sample ? 'Written answers are graded on the rubric by Claude, through your account. The first use asks your permission. Off means instant rule-based grades.' : 'Not available in this view. Instant rule-based grades are used.', st.ai, v => set('ai', v))),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Private names' }), h('p', { class: 'muted', text: 'Rename anyone in the story to the person they remind you of. These names stay in this browser only; they are never sent to your account or to Claude.' }), relabel),
    h('div', { class: 'panel stack' }, h('h2', { class: 'h3', text: 'Your data' }), h('p', { class: 'muted', text: `Saved ${app.store.status === 'synced' ? 'to your account and this browser' : 'in this browser'}.` }),
      h('div', { class: 'row' },
        h('button', { class: 'btn ghost small', onclick: () => exportSave(), text: 'Export my save' }),
        h('button', { class: 'btn ghost small', onclick: () => importSave(main), text: 'Import a save' }),
        h('button', { class: 'btn ghost small', onclick: () => resetSave(), text: 'Start over' })))));
}

function saveJson() {
  const copyS = JSON.parse(JSON.stringify(app.save));
  copyS.settings.names = {};
  return JSON.stringify(copyS, null, 1);
}

async function exportSave() {
  if (app.caps.downloads) return downloadText('the-long-game-save.json', saveJson());
  copy(saveJson());
}

async function importSave(main) {
  const ta = h('textarea', { rows: 8, 'aria-label': 'Paste a save', style: { width: '100%' } });
  const ok = await dialog({ title: 'Import a save', body: h('div', { class: 'field' }, h('p', { class: 'muted', text: 'Paste the contents of an exported save. It replaces your current progress.' }), ta), actions: [{ label: 'Cancel', value: false }, { label: 'Import', kind: 'lacquer', value: true }] });
  if (!ok) return;
  try {
    const next = normalizeSave(JSON.parse(ta.value));
    next.settings.names = app.save.settings.names;
    next.updatedAt = Date.now(); next.rev = (app.save.rev || 0) + 1;
    app.save = next; persist(); applySettings(); toast('Save imported.'); settings(main);
  } catch { toast('That does not look like a save from this game.'); }
}

async function resetSave() {
  const inp = h('input', { type: 'text', 'aria-label': 'Type START OVER to confirm', style: { width: '100%' } });
  const ok = await dialog({ title: 'Start over?', body: h('div', { class: 'field' }, h('p', { text: 'This clears every day, grade, card and note. Type START OVER to confirm.' }), inp), actions: [{ label: 'Keep my progress', value: false }, { label: 'Start over', kind: 'lacquer', value: () => inp.value.trim().toUpperCase() === 'START OVER' }] });
  if (!ok) return;
  const names = app.save.settings.names;
  const fresh = newSave();
  fresh.settings = { ...fresh.settings, theme: app.save.settings.theme, motion: app.save.settings.motion, names };
  fresh.rev = (app.save.rev || 0) + 1;
  app.save = fresh; persist(); applySettings(); go('today');
}

// ---------------- coach ----------------

const DAILY = 15;
const thread = [];

function coachContext() {
  const save = app.save;
  const d = D();
  const cur = Math.min(currentDay(save, MAX_DAY), MAX_DAY);
  const open = save.promises.filter(p => p.status === 'open').map(p => FN(p.text));
  const refl = Object.entries(save.reflections).slice(-3).map(([k, v]) => `Day ${k}: ${v}`);
  return [
    'You are T+10: a bank technology executive about ten years further up the same career track, coaching a senior product designer in a Vietnam innovation centre who wants to grow executive stakeholder skills and lead.',
    'Principles you coach: answer first; one ask; honest, labelled numbers; the line manager hears things first (never bypass, brag or bitch); lead with the other person’s agenda; small promises kept fast; sponsorship is earned through delivery; bad news early with a plan (BLUF-R); SBI feedback; Vietnamese respect in form, Singapore crispness in content, Australian candour in bad news.',
    'Style: warm, specific, brief (under 140 words unless asked for a draft). Ask one clarifying question when the situation is unclear. Offer a draft line when useful. Never invent facts about real people or companies, and do not ask for confidential details.',
    `Player context (from the game): name ${save.player.name}; Day ${cur} of ${MAX_DAY}; level ${levelTitle(save.level, save.branch)}; trust ${d.stats.trust}, credibility ${d.stats.cred}, energy ${d.stats.energy}.`,
    open.length ? `Open promises: ${open.join('; ')}.` : '',
    refl.length ? `Recent reflections: ${refl.join(' | ')}` : '',
  ].filter(Boolean).join('\n');
}

export function coach(main) {
  const save = app.save;
  const t = today();
  const used = save.coach[t] || 0;
  clear(main);
  const wrap = h('div', { class: 'chat' });
  main.append(h('div', { class: 'section', style: { maxWidth: '760px', margin: '0 auto' } }, sectionHead('Coach', 'T+10, about a real situation this week.'), wrap));
  if (!aiOn()) {
    wrap.append(h('div', { class: 'panel stack' }, h('p', { text: app.caps.sample ? 'Turn on “Grade with T+10” in Settings to talk to the coach.' : 'The coach needs Claude, which is not available in this view. Everything else in the game works without it.' }),
      app.caps.sample ? h('div', { class: 'row' }, h('button', { class: 'btn ghost small', onclick: () => go('settings'), text: 'Open Settings' })) : null));
    return;
  }
  const log = h('div', { class: 'stack', style: { gap: '10px' }, 'aria-live': 'polite' });
  if (!thread.length) log.append(h('div', { class: 'msg coach', text: `Tell me what is going on. A message you need to send, a meeting tomorrow, someone who has gone quiet. I will keep it short.` }));
  for (const m of thread) log.append(h('div', { class: 'msg ' + (m.role === 'user' ? 'me' : 'coach'), text: m.content }));
  const ta = h('textarea', { rows: 3, 'aria-label': 'Your message to T+10', placeholder: 'e.g. My manager seems cool since I met the executive. What do I say on Monday?', style: { width: '100%' } });
  const left = h('span', { class: 'muted', style: { fontSize: '.85rem' }, text: `${Math.max(0, DAILY - used)} of ${DAILY} messages left today` });
  const send = h('button', { class: 'btn lacquer', text: 'Send', onclick: async () => {
    const text = ta.value.trim();
    if (!text) return;
    if ((save.coach[t] || 0) >= DAILY) return toast('That is today’s coaching. Try the advice for real, then come back tomorrow.');
    send.disabled = true; ta.value = '';
    thread.push({ role: 'user', content: text.slice(0, 2000) });
    log.append(h('div', { class: 'msg me', text }));
    const out = h('div', { class: 'msg coach' }, h('div', { class: 'skel', style: { width: '180px' } }));
    log.append(out);
    save.coach[t] = (save.coach[t] || 0) + 1; persist();
    left.textContent = `${Math.max(0, DAILY - save.coach[t])} of ${DAILY} messages left today`;
    const turns = thread.slice(-10).map((m, i) => (i === 0 && m.role === 'user' ? { role: 'user', content: coachContext() + '\n\nPlayer: ' + m.content } : m));
    if (turns[0].role !== 'user') turns.shift();
    try {
      const res = await app.caps.sample(turns, { modelTier: 'default', cache: false, onText: ({ text: tx }) => { out.textContent = tx; } });
      out.textContent = res.text;
      thread.push({ role: 'assistant', content: res.text });
    } catch (e) {
      thread.pop();
      if (e?.code === 'not_granted') { app.aiBlocked = true; out.textContent = 'Coaching was not allowed in this view. You can change that in the artifact permissions.'; }
      else if (e?.code === 'rate_limited') out.textContent = 'T+10 is busy right now. Try again in a little while.';
      else out.textContent = e?.text || 'That did not go through. Try again in a moment.';
    } finally { send.disabled = false; ta.focus(); }
  } });
  ta.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') send.click(); });
  wrap.append(log, ta, h('div', { class: 'tool-row' }, left, send));
  ta.focus({ preventScroll: true });
}

// ---------------- ending ----------------

function templateLetter(ending) {
  const save = app.save;
  const d = D();
  const ev = Object.keys(save.evidence).map(id => F(EVIDENCE[id].name));
  const done = save.moves.filter(m => m.status === 'done').length;
  const strongest = [...STAT_KEYS].sort((a, b) => d.stats[b] - d.stats[a])[0];
  return [
    `${save.player.name},`,
    '',
    `Ten years from now you will not remember the grades. You will remember the moments: telling your manager first, the number you refused to round up, the note you sent on a Friday afternoon.`,
    '',
    `You finished as ${levelTitle(save.level, save.branch)}, Floor ${LEVELS[save.level].floor}. Your strongest signal was ${STATS[strongest].name.toLowerCase()}. ${ev.length ? `The evidence you would bring to a real panel: ${ev.slice(0, 4).join(', ')}${ev.length > 4 ? `, and ${ev.length - 4} more` : ''}.` : ''}`,
    '',
    `${done ? `You did ${done} Real Move${done > 1 ? 's' : ''} in your actual week. That is the part that counts.` : 'The Real Moves are still waiting for you. Pick one for Monday.'} ${ENDINGS[ending].tone}`,
    '',
    'Keep the scripts. Keep the habits. Send the Friday note.',
    '',
    'T+10',
  ].join('\n');
}

export function ending(main) {
  const save = app.save;
  const d = D();
  if (!save.ending) { save.ending = decideEnding(save, d); persist(); }
  const E = ENDINGS[save.ending];
  const letter = h('div', { class: 'letter', text: save.letter || templateLetter(save.ending) });
  const actions = h('div', { class: 'row' });
  if (aiOn() && !save.letter) actions.append(h('button', { class: 'btn ghost', text: 'Ask T+10 to write it personally', onclick: async e => {
    e.target.disabled = true;
    letter.replaceChildren(h('div', { class: 'skel', style: { width: '60%' } }));
    const refl = Object.entries(save.reflections).map(([k, v]) => `Day ${k}: ${v}`).join('\n');
    const prompt = [coachContext(), '', `Write a short letter (180 to 240 words) from T+10 to ${save.player.name}, ten years from now, looking back on these three weeks. Ending archetype: ${E.name}. Evidence earned: ${Object.keys(save.evidence).map(id => EVIDENCE[id].name).join(', ')}. Real Moves done: ${save.moves.filter(m => m.status === 'done').map(m => m.text).join('; ') || 'none yet'}.`, refl ? `Their reflections:\n${refl}` : '', 'Warm, specific, honest. Name one habit to keep and one to watch. Plain text, no headings. Sign it "T+10".'].join('\n');
    try {
      const res = await app.caps.sample(prompt, { modelTier: 'default', onText: ({ text }) => { letter.textContent = text; } });
      save.letter = String(res.text).slice(0, 4000); persist(); letter.textContent = save.letter;
    } catch { letter.textContent = templateLetter(save.ending); toast('T+10 could not write just now. Here is the short version.'); }
  } }));
  actions.append(h('button', { class: 'btn ghost', onclick: () => copy(playbookMarkdown()), text: 'Copy my playbook' }), h('button', { class: 'btn lacquer', onclick: () => go('today'), text: 'Back to the tower' }));
  clear(main);
  main.append(h('div', { class: 'ending' },
    cinema('promotion', { fromFloor: LEVELS[Math.max(1, save.level - 1)].floor, toFloor: LEVELS[save.level].floor, title: levelTitle(save.level, save.branch) }, { label: `The lift reaches floor ${LEVELS[save.level].floor}.` }),
    h('div', { class: 'dayhead' }, h('h1', { text: E.name }), h('p', { class: 'sub', text: E.tone })),
    letter, actions));
}
