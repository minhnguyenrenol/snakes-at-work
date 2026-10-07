// Pack recorded clips into per-day MP3 sprites plus one index, for the Artifact's supporting files.
// Run after voice/render.py: node voice/pack.mjs  ->  dist/audio/day-N.mp3 and dist/audio/index.json
// Clips are raw MPEG frames (no Xing or ID3 header), so byte-concatenation keeps every slice playable.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const cache = path.join(here, 'cache');
const out = path.join(here, '../dist/audio');
const jobs = JSON.parse(readFileSync(path.join(here, 'jobs.json'), 'utf8'));
const safe = id => id.replace(/[^a-z0-9_-]/gi, '_');

if (existsSync(out)) for (const f of readdirSync(out)) rmSync(path.join(out, f));
mkdirSync(out, { recursive: true });

const groups = new Map();
let missing = 0, stale = 0;
for (const j of jobs) {
  const base = path.join(cache, safe(j.id));
  if (!existsSync(base + '.json') || !existsSync(base + '.mp3')) { missing++; continue; }
  const meta = JSON.parse(readFileSync(base + '.json', 'utf8'));
  if (meta.h !== j.h || meta.voice !== j.voice) { stale++; continue; }
  if (!groups.has(j.group)) groups.set(j.group, []);
  groups.get(j.group).push({ j, meta, buf: readFileSync(base + '.mp3') });
}

const index = { v: 1, files: {}, clips: {} };
let total = 0;
for (const [g, list] of [...groups].sort((a, b) => a[0] - b[0])) {
  const name = `day-${g}.mp3`;
  let off = 0;
  const parts = [];
  for (const { j, meta, buf } of list) {
    index.clips[j.id] = [g, off, buf.length, meta.dur, meta.env, meta.sents, j.h];
    parts.push(buf);
    off += buf.length;
  }
  writeFileSync(path.join(out, name), Buffer.concat(parts));
  index.files[g] = name;
  total += off;
}
writeFileSync(path.join(out, 'index.json'), JSON.stringify(index));
console.log(`${Object.keys(index.clips).length} clips in ${groups.size} sprites, ${(total / 1048576).toFixed(1)} MB; ${missing} not recorded yet, ${stale} stale`);
