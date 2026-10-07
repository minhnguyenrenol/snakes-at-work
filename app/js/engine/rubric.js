// The 7-dimension rubric from the design plan §9.1, and grade bands.

export const DIMS = {
  answer_first: { name: 'Answer-first', short: 'Answer', hook: 'Answer first. Then why. Then proof.',
    a0: 'Buried or absent point', a2: 'Point appears mid-way', a4: 'Point in the first sentence' },
  brevity: { name: 'Brevity', short: 'Brevity', hook: 'Ten-word headline. Three proofs. Stop.',
    a0: 'Over 2× target length', a2: 'Within 1.5× target', a4: 'At or under target' },
  other: { name: 'Other-orientation', short: 'Other', hook: 'Trust is divided by "me".',
    a0: 'All about me', a2: 'Mixed', a4: 'Leads with their agenda' },
  honesty: { name: 'Honesty & calibration', short: 'Honesty', hook: 'Napkin test: caveat first.',
    a0: 'Overclaims or bluffs', a2: 'Neutral', a4: 'Volunteers caveats; labels estimates' },
  next_step: { name: 'Specific next step', short: 'Next step', hook: 'CUP: the P is an easy yes.',
    a0: 'None', a2: 'Vague ("let me know")', a4: 'Concrete, easy yes, flexibility on their side' },
  loyalty: { name: 'Loyalty & discretion', short: 'Loyalty', hook: 'No 3 B\'s: never Bypass, Brag, Bitch.',
    a0: 'Bypasses, gossips, criticises the line', a2: 'Neutral', a4: 'Credits others; protects confidences' },
  culture: { name: 'Cultural fit', short: 'Culture', hook: 'Vietnamese respect in form, Singapore crispness in content, Australian candour in bad news.',
    a0: 'Tone wrong for the person or culture', a2: 'Acceptable', a4: 'Respect in form, crispness in content, candour in bad news' },
};

export const DIM_KEYS = Object.keys(DIMS);

export const BANDS = [
  { g: 'S', min: 90, label: 'Outstanding' },
  { g: 'A', min: 75, label: 'Strong' },
  { g: 'B', min: 60, label: 'Solid' },
  { g: 'C', min: 40, label: 'Shaky' },
  { g: 'D', min: 0, label: 'Off track' },
];

export const GRADE_PCT = { S: 95, A: 82, B: 67, C: 50, D: 25 };
export const GRADE_ORDER = ['D', 'C', 'B', 'A', 'S'];

export function gradeFor(pct) {
  for (const b of BANDS) if (pct >= b.min) return b.g;
  return 'D';
}

export function gradeAtLeast(g, min) {
  return GRADE_ORDER.indexOf(g) >= GRADE_ORDER.indexOf(min);
}

// Reaction band key used by authored NPC reactions.
export function band(g) { return g === 'S' || g === 'A' ? 'SA' : g === 'B' ? 'B' : 'CD'; }

export function pctFromScores(scores, dims) {
  const ds = dims.filter(d => typeof scores[d] === 'number');
  if (!ds.length) return 0;
  const sum = ds.reduce((a, d) => a + scores[d], 0);
  return Math.round((sum / (4 * ds.length)) * 100);
}
