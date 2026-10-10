// The study library: every challenge, answer, follow-up question and script on one page, to read at your own pace.
import { h, clear, reducedMotion } from '../dom.js';
import { app, F, go, npcName, sectionHead, toast } from './core.js';
import { icon } from './art.js';
import { stopVoice } from './voice.js';
import { answerScripts, scriptCard, scriptsFor, MODE_NAME } from './atlas.js';
import { prompterSwitch } from './prompter.js';
import { SCENARIOS, DAYS, PLACES } from '../content/index.js';
import { DEEP } from '../content/deep.js';
import { SCRIPTS } from '../content/scripts.js';
import { wordCount } from '../engine/grader.js';

const weekOf = n => Math.ceil(n / 7);
const filt = { q: '', week: 0, mode: '' };
const hayCache = new Map();

const asked = f => (f.by && f.by !== 'coach' ? npcName(f.by, true) : 'T+10');

function hayOf(scn) {
  if (hayCache.has(scn.id)) return hayCache.get(scn.id);
  const d = DEEP[scn.id];
  const parts = [scn.title, scn.setting, scn.cue, scn.prompt, scn.model, d?.you, scn.trap?.sin,
    ...(scn.opts || []).flatMap(o => [o.t, o.why]), ...(d?.follow || []).flatMap(f => [f.q, f.a]), ...scriptsFor(scn.id).map(x => x.text)];
  const hay = parts.filter(Boolean).map(F).join(' ').toLowerCase();
  hayCache.set(scn.id, hay);
  return hay;
}

function shown(scn) {
  if (filt.week && weekOf(scn.day) !== filt.week) return false;
  if (filt.mode === 'trap' ? !scn.trap : filt.mode && scn.mode !== filt.mode) return false;
  if (filt.q) {
    const hay = hayOf(scn);
    if (!filt.q.toLowerCase().split(/\s+/).every(w => hay.includes(w))) return false;
  }
  return true;
}

function followList(scn) {
  const list = DEEP[scn.id]?.follow || [];
  if (!list.length) return null;
  return h('section', { class: 'panel stack' }, h('h3', { class: 'h3', text: `What they ask next (${list.length})` }),
    h('ol', { class: 'study-fu' }, list.map(f => h('li', null,
      h('p', { class: 'q' }, h('b', { text: asked(f) + ': ' }), F(f.q)),
      h('p', { class: 'say', text: F(f.a) }),
      h('span', { class: 'muted num', text: `Sample answer, ${wordCount(F(f.a))} words` })))));
}

function sceneBody(scn) {
  const d = DEEP[scn.id];
  const rel = scriptsFor(scn.id);
  return h('div', { class: 'stack study-body' },
    h('div', { class: 'panel stack' },
      h('h3', { class: 'h3', text: 'The challenge' }),
      scn.setting ? h('p', { class: 'narr', text: F(scn.setting) }) : null,
      scn.cue ? h('p', { class: 'cue-line', text: F(scn.cue) }) : null,
      scn.prompt ? h('p', { class: 'prompt', text: F(scn.prompt) }) : null,
      scn.trap ? h('p', { class: 'muted' }, h('b', { text: 'Snake trap: ' + scn.trap.sin + '. ' }), F(scn.trap.lure || '')) : null),
    answerScripts(scn),
    d?.you ? h('section', { class: 'panel stack' }, h('h3', { class: 'h3', text: 'Why this matters for you' }), h('p', { text: F(d.you) })) : null,
    followList(scn),
    rel.length ? h('section', { class: 'panel stack' }, h('h3', { class: 'h3', text: 'Library scripts for this moment' }), rel.map(scriptCard)) : null,
    h('div', { class: 'row' },
      h('button', { class: 'btn small', type: 'button', text: 'Practise this challenge', onclick: () => go('practice-' + scn.id) }),
      h('a', { class: 'link', href: '#sheet-' + scn.id, text: 'Open the full script sheet' })));
}

function plain(scn) {
  const d = DEEP[scn.id];
  const out = [`## Day ${scn.day}: ${F(scn.title)}`, `${MODE_NAME[scn.mode] || scn.mode}${scn.npc ? ` · ${npcName(scn.npc)}` : ''}${scn.trap ? ` · Snake trap: ${scn.trap.sin}` : ''}`, ''];
  if (scn.setting) out.push(F(scn.setting), '');
  if (scn.cue) out.push('**Challenge:** ' + F(scn.cue), '');
  if (scn.prompt) out.push('**Question:** ' + F(scn.prompt), '');
  if (scn.opts) {
    out.push('**Options, best first:**');
    [...scn.opts].sort((a, b) => 'SABCD'.indexOf(a.g) - 'SABCD'.indexOf(b.g)).forEach(o => out.push(`- [${o.g}] ${F(o.t)}${o.why ? ` (${F(o.why)})` : ''}`));
    out.push('');
  }
  if (scn.model) out.push('**Model answer:** ' + F(scn.model), '');
  if (d?.you) out.push('**Why this matters for you:** ' + F(d.you), '');
  if (d?.follow?.length) {
    out.push('**Follow-up questions:**');
    d.follow.forEach((f, i) => out.push(`${i + 1}. ${asked(f)} asks: ${F(f.q)}`, `   Sample answer: ${F(f.a)}`));
    out.push('');
  }
  return out.join('\n');
}

export function studyMarkdown() {
  const head = ['# Snakes at Work: every challenge, answer, follow-up and script', ''];
  const scenes = SCENARIOS.slice().sort((a, b) => a.day - b.day).map(plain);
  const scripts = ['# Script library', '', ...SCRIPTS.flatMap(x => [`## ${F(x.title)}`, x.when ? `_${x.when}_` : '', F(x.text), x.why ? `Why it works: ${F(x.why)}` : '', ''])];
  return [...head, ...scenes, ...scripts].join('\n');
}

async function saveFile(name, data) {
  const dl = app.caps.downloads;
  if (dl) {
    try { await dl.save({ filename: name, data }); return; } catch (e) { if (e?.code !== 'unavailable') return; }
  }
  try {
    const url = URL.createObjectURL(new Blob([data], { type: 'text/markdown' }));
    const a = h('a', { href: url, download: name });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch { toast('Saving files is blocked here.'); }
}

export function study(main) {
  stopVoice();
  const follows = Object.values(DEEP).reduce((n, d) => n + (d.follow?.length || 0), 0);
  const search = h('input', { type: 'search', id: 'study-q', placeholder: 'Search challenges, answers, follow-ups, scripts', value: filt.q, autocomplete: 'off' });
  const sel = (id, label, value, opts, onChange) => h('label', { class: 'fsel' }, h('span', { class: 'muted', text: label }),
    h('select', { id, onchange: e => onChange(e.target.value) }, opts.map(([v, t]) => h('option', { value: v, selected: String(value) === String(v), text: t }))));
  const count = h('p', { class: 'muted num', 'aria-live': 'polite' });
  const list = h('div', { class: 'study-list' });
  const built = new WeakSet();
  const ensure = (det, scn) => { if (!built.has(det)) { built.add(det); det.append(sceneBody(scn)); } };

  function draw() {
    clear(list);
    let n = 0;
    const many = SCENARIOS.filter(shown).length;
    for (const d of DAYS) {
      const rows = SCENARIOS.filter(s => s.day === d.n && shown(s));
      if (!rows.length) continue;
      n += rows.length;
      list.append(h('section', { class: 'study-day' },
        h('h2', { class: 'h3' }, h('span', { class: 'num dayn', text: String(d.n) }), h('span', { text: F(d.title) })),
        rows.map(scn => {
          const det = h('details', { class: 'study-scn', id: 'st-' + scn.id },
            h('summary', null, h('span', { class: 'scn-title', text: F(scn.title) }),
              h('span', { class: 'muted scn-meta', text: [scn.trap ? `Snake trap: ${scn.trap.sin}` : MODE_NAME[scn.mode] || scn.mode, scn.npc ? npcName(scn.npc, true) : null, DEEP[scn.id]?.follow?.length ? `${DEEP[scn.id].follow.length} follow-ups` : null].filter(Boolean).join(' · ') })));
          det.addEventListener('toggle', () => { if (det.open) ensure(det, scn); });
          if (filt.q && many <= 8) { det.open = true; ensure(det, scn); }
          return det;
        })));
    }
    if (!n) list.append(h('div', { class: 'panel' }, h('p', { text: 'Nothing matches. Clear the search or pick another filter.' })));
    count.textContent = `${n} of ${SCENARIOS.length} challenges shown.`;
  }

  const openAll = h('button', { class: 'btn ghost small', type: 'button', text: 'Open all shown', onclick: async () => {
    const dets = [...list.querySelectorAll('details.study-scn')];
    openAll.disabled = true;
    for (let i = 0; i < dets.length; i += 6) {
      dets.slice(i, i + 6).forEach(d => { d.open = true; });
      await new Promise(r => requestAnimationFrame(r));
    }
    openAll.disabled = false;
  } });
  const closeAll = h('button', { class: 'btn ghost small', type: 'button', text: 'Close all', onclick: () => list.querySelectorAll('details.study-scn[open]').forEach(d => { d.open = false; }) });
  const save = h('button', { class: 'btn small', type: 'button', text: 'Save everything as a file (.md)', onclick: () => saveFile('snakes-at-work-study-guide.md', studyMarkdown()) });
  let t = 0;
  search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { filt.q = search.value.trim(); draw(); }, 160); });

  clear(main);
  main.append(h('div', { class: 'section study', style: { maxWidth: '980px', margin: '0 auto' } },
    h('a', { href: '#atlas', class: 'link back' }, icon('arrow', 16), ' Practice Atlas'),
    sectionHead('Study library', `All ${SCENARIOS.length} challenges, every answer, ${follows} follow-up questions with sample answers, and ${SCRIPTS.length} ready-to-say scripts. Nothing here is graded or saved. Open a challenge to read it, or turn on the script prompter to see the script while you play.`),
    h('div', { class: 'atlas-filters' },
      h('div', { class: 'searchbox' }, icon('search', 18), search),
      h('div', { class: 'row', style: { gap: '10px' } },
        sel('s-week', 'Week', filt.week, [[0, 'All weeks'], [1, 'Week 1'], [2, 'Week 2'], [3, 'Week 3']], v => { filt.week = Number(v); draw(); }),
        sel('s-mode', 'Mode', filt.mode, [['', 'Any mode'], ['trap', 'Snake traps'], ...Object.entries(MODE_NAME)], v => { filt.mode = v; draw(); }),
        openAll, closeAll, prompterSwitch(), save)),
    count, list,
    h('div', { class: 'row', style: { gap: '14px', marginTop: '16px' } },
      h('a', { class: 'link', href: '#scripts', text: 'Script library' }), h('a', { class: 'link', href: '#drill', text: 'Follow-up drill' }), h('a', { class: 'link', href: '#lessons', text: 'Lessons' }))));
  draw();
  if (location.hash.startsWith('#study-')) {
    const det = document.getElementById('st-' + location.hash.slice(7));
    if (det) { det.open = true; det.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' }); }
  }
}
