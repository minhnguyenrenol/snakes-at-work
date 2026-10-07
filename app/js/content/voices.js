// Who speaks with which recorded voice, and how names are said aloud. Shared by the app and the offline voice build.
export const NARRATOR = 'af_heart';
export const VOICE_OF = {
  anh_khai: 'am_fenrir', ethan: 'bm_george', chi_lan: 'af_bella', bao: 'am_puck', vy: 'af_nicole', sarah: 'bf_emma',
  raj: 'bm_fable', antoine: 'bm_lewis', minh_chau: 'af_kore', michael: 'am_michael', dat: 'am_liam', ha: 'af_aoede',
};
// Spoken forms of the fictional names (the recorder cannot read Vietnamese diacritics).
export const SPOKEN = {
  anh_khai: ['Anh Kai', 'Kai'], ethan: ['Ethan', 'Ethan'], chi_lan: ['Chee Lan', 'Lan'], bao: ['Bao', 'Bao'], vy: ['Vee', 'Vee'],
  sarah: ['Sarah', 'Sarah'], raj: ['Raj', 'Raj'], antoine: ['Antoine', 'Antoine'], minh_chau: ['Min Chow', 'Chow'],
  michael: ['Michael', 'Michael'], dat: ['Dat', 'Dat'], ha: ['Chee Ha', 'Ha'],
};
export const SPOKEN_ME = 'Min';

/** FNV-1a 32-bit hash of a string (UTF-16 code units), hex. Detects clips recorded from older text. */
export function textHash(s) {
  let x = 0x811c9dc5;
  const t = String(s);
  for (let i = 0; i < t.length; i++) { x ^= t.charCodeAt(i); x = Math.imul(x, 0x01000193) >>> 0; }
  return x.toString(16).padStart(8, '0');
}
