// Persistence: an instant local copy (localStorage) plus the artifact's private per-person db document.
// Newer wins by updatedAt, then rev. One write in flight at a time; writes only happen after the player acts.
import { newSave, normalizeSave } from './engine/game.js';

const KEY = 'tlg.save.v1';
const DB_LIMIT = 200 * 1024; // the store caps a document at 256 KiB

function readLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? normalizeSave(JSON.parse(raw)) : null;
  } catch { return null; }
}

function writeLocal(save) {
  try { localStorage.setItem(KEY, JSON.stringify(save)); return true; } catch { return false; }
}

/** Shrink a save for the db document if needed: drop typed text from all but the latest attempt per scenario. */
export function compactForDb(save) {
  // Private relabels never leave this browser.
  const copy = JSON.parse(JSON.stringify(save));
  copy.settings.names = {};
  let json = JSON.stringify(copy);
  if (json.length <= DB_LIMIT) return json;
  for (const rec of Object.values(copy.scn)) rec.att.forEach((a, i) => { if (i < rec.att.length - 1) delete a.t; });
  json = JSON.stringify(copy);
  if (json.length <= DB_LIMIT) return json;
  for (const rec of Object.values(copy.scn)) rec.att.forEach(a => { delete a.t; });
  copy.scripts = copy.scripts.slice(-60);
  return JSON.stringify(copy);
}

export const newer = (a, b) => (a.updatedAt !== b.updatedAt ? a.updatedAt > b.updatedAt : a.rev > b.rev);

export function createStore({ onRemote, onStatus } = {}) {
  let db = null, docRef = null;
  let pending = null, writing = false, timer = null;
  let status = 'local';
  const setStatus = s => { status = s; onStatus?.(s); };

  async function connect() {
    try {
      if (!window.claude?.use) return;
      const [dbNs, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!dbNs || !user) return;
      const uid = await user.id();
      if (!uid) return;
      db = dbNs;
      docRef = db.doc(`data/users/${uid}/save`);
      const snap = await docRef.get();
      setStatus('synced');
      if (snap.exists) {
        const body = snap.data();
        const remote = typeof body?.json === 'string' ? normalizeSave(JSON.parse(body.json)) : null;
        if (remote) onRemote?.(remote);
      }
    } catch { docRef = null; setStatus('local'); }
  }

  async function flush() {
    if (writing || !pending || !docRef) return;
    writing = true;
    const save = pending; pending = null;
    try {
      await docRef.set({ json: compactForDb(save), updatedAt: save.updatedAt, rev: save.rev });
      setStatus('synced');
    } catch (e) {
      const code = e && e.code;
      if (code === 'unavailable') { pending = pending || save; setTimeout(flush, 1500 + Math.random() * 1500); }
      else if (code === 'revoked' || code === 'not_granted' || code === 'capability_disabled' || code === 'capability_removed') { docRef = null; setStatus('local'); }
      else setStatus('local');
    } finally {
      writing = false;
      if (pending) flush();
    }
  }

  return {
    load() { return readLocal() || newSave(); },
    connect,
    /** Called after every player action that changes the save. */
    save(save) {
      writeLocal(save);
      if (!docRef) return;
      pending = save;
      clearTimeout(timer);
      timer = setTimeout(flush, 600);
    },
    /** Keep a copy that arrived from the account, without writing it back. */
    cacheLocal(save) { writeLocal(save); },
    get status() { return status; },
    clearLocal() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } },
  };
}
