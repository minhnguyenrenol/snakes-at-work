// The cast (design plan §10). All names are fictional on purpose; a private relabel lives in Settings, on this device only.
// look: portrait parameters for the SVG portrait generator.
export const NPCS = {
  anh_khai: {
    name: 'Anh Khải', short: 'Khải', role: 'Executive, Technology - Client Platforms',
    arch: 'Talent Spotter + Visionary', tier: 1,
    persona: 'Warm, curious, judges people over meals, ex-Singapore banker, believes Vietnam leads on AI. Headline-first; mornings; likes being asked about Singapore; dislikes career asks before delivery.',
    prefs: [
      { id: 'headline', text: 'Headline first, detail only if he pulls it.' },
      { id: 'mornings', text: 'Reads messages early in his day, Vietnam time.' },
      { id: 'singapore', text: 'Lights up when asked about his Singapore years.' },
      { id: 'no_early_ask', text: 'Cools fast on career asks before you have delivered.' },
      { id: 'stories', text: 'His "how I spotted someone" stories are his scoring rubric.' },
    ],
    look: { skin: '#C99A72', hair: '#1C1A1A', style: 'side', top: '#22344A', collar: '#E9E4DA', glasses: true, age: 2 },
  },
  ethan: {
    name: 'Ethan', short: 'Ethan', role: 'Your functional manager (Melbourne-born, based in HCMC)',
    arch: 'Overloaded Operator + fair coach', tier: 1,
    persona: 'Supportive, informal, hates surprises. Wants to hear things first; values credit; short Teams messages.',
    prefs: [
      { id: 'first', text: 'Wants to hear anything career-relevant from you first.' },
      { id: 'credit', text: 'Notices when you credit him by name.' },
      { id: 'short', text: 'Short Teams messages; hates long threads.' },
    ],
    look: { skin: '#EAC3A2', hair: '#8A5A33', style: 'short', top: '#3C6E71', collar: '#F2EEE6', glasses: false, beard: true, age: 1 },
  },
  chi_lan: {
    name: 'Chị Lan', short: 'Lan', role: 'Head of Design, Institutional & E-commerce',
    arch: 'Craft Guardian', tier: 1,
    persona: 'Protective of quality and the chapter\'s identity; quietly ambitious for the chapter. Wants AI framed as raising craft; values being consulted.',
    prefs: [
      { id: 'consulted', text: 'Wants to be consulted before, not informed after.' },
      { id: 'craft', text: 'Listens when AI is framed as raising craft, not replacing it.' },
      { id: 'chapter', text: 'Cares that wins come home to the chapter.' },
    ],
    look: { skin: '#D4A882', hair: '#141212', style: 'bob', top: '#6B2E2A', collar: '#EDE4D3', glasses: false, age: 2 },
  },
  bao: {
    name: 'Bảo', short: 'Bảo', role: 'Peer senior designer',
    arch: 'Peer Leader / rival', tier: 2,
    persona: 'Talented, competitive, insecure about AI. Responds to co-authorship; bristles at being outshone.',
    prefs: [
      { id: 'coauthor', text: 'Responds to co-authorship and shared credit.' },
      { id: 'outshone', text: 'Bristles when outshone in front of seniors.' },
    ],
    look: { skin: '#C8956C', hair: '#211C1A', style: 'spiky', top: '#2F4858', collar: '#2F4858', glasses: false, age: 0 },
  },
  vy: {
    name: 'Vy', short: 'Vy', role: 'Junior designer (future direct report)',
    arch: 'Rising talent', tier: 2,
    persona: 'Eager, anxious; says "yes" when she means "maybe". Needs explicit safety to raise problems.',
    prefs: [
      { id: 'yes_maybe', text: 'Her "yes" often means "I heard you". Ask what might stop it.' },
      { id: 'safety', text: 'Raises problems when you thank her for raising them.' },
    ],
    look: { skin: '#DDB08A', hair: '#1E1817', style: 'long', top: '#B08A3E', collar: '#F3EDE2', glasses: true, age: 0 },
  },
  sarah: {
    name: 'Sarah', short: 'Sarah', role: 'GM, Business Lending (Melbourne)',
    arch: 'Australian Business GM', tier: 2,
    persona: 'Direct, funny, banker-obsessed, sceptical of offshore hype. Plain English; bad news early; banker stories.',
    prefs: [
      { id: 'plain', text: 'Plain English. Jargon loses her in a sentence.' },
      { id: 'bad_news', text: 'Wants bad news early; hiding it ends trust.' },
      { id: 'bankers', text: 'Moved by what changes for her bankers.' },
    ],
    look: { skin: '#F0CDB0', hair: '#C9A15A', style: 'wavy', top: '#1F3A5F', collar: '#1F3A5F', glasses: false, age: 2 },
  },
  raj: {
    name: 'Raj', short: 'Raj', role: 'Head of Operational Risk',
    arch: 'Risk Guardian', tier: 2,
    persona: 'Precise, calm, unbudging on controls. Controls first; documentation; data handling.',
    prefs: [
      { id: 'controls', text: 'First question is always "what could go wrong?"' },
      { id: 'docs', text: 'Trusts what is documented and traceable.' },
    ],
    look: { skin: '#9C6B4A', hair: '#2A2423', style: 'short', top: '#4A4E58', collar: '#E8E6E1', glasses: true, beard: true, age: 2 },
  },
  antoine: {
    name: 'Antoine', short: 'Antoine', role: 'Head of Skills Guild',
    arch: 'Visionary + Talent Spotter', tier: 2,
    persona: 'Energetic, metrics-minded, wants AI uplift at scale. Kirkpatrick levels; DORA; learner stories.',
    prefs: [
      { id: 'metrics', text: 'Speaks Kirkpatrick levels and DORA metrics.' },
      { id: 'stories', text: 'Loves a single learner\'s before-and-after.' },
    ],
    look: { skin: '#E3B48F', hair: '#3B2A20', style: 'curly', top: '#2F6B5E', collar: '#F1ECE3', glasses: false, age: 1 },
  },
  minh_chau: {
    name: 'Minh Châu', short: 'Châu', role: 'Senior Manager, Platform Engineering',
    arch: 'Data-Driven Sceptic', tier: 2,
    persona: 'Dry, numerate, tests every claim. Baselines; measured vs estimated.',
    prefs: [
      { id: 'baseline', text: 'Asks "compared to what?" before anything else.' },
      { id: 'labels', text: 'Respects numbers labelled measured or estimated.' },
    ],
    look: { skin: '#D6A97F', hair: '#151313', style: 'bun', top: '#39404A', collar: '#39404A', glasses: true, age: 1 },
  },
  michael: {
    name: 'Michael', short: 'Michael', role: 'Group Executive, Digital, Data & AI (visits from Australia)',
    arch: 'Group-Level Executive', tier: 3,
    persona: 'Charismatic, time-poor, story-hungry. One story, one number; likes it when you make your own exec look good.',
    prefs: [
      { id: 'headline', text: '"What\'s the headline?" One story, one number.' },
      { id: 'exec_look_good', text: 'Notices people who make their own executive look good.' },
    ],
    look: { skin: '#EFC9AA', hair: '#B9B4AC', style: 'side', top: '#1B1E2B', collar: '#F4F1EC', glasses: false, age: 3 },
  },
  dat: {
    name: 'Đạt', short: 'Đạt', role: 'Designer on your team',
    arch: 'Struggling team member', tier: 3,
    persona: 'Capable, quiet, recently missing deadlines; proud; carrying something at home he has not mentioned.',
    prefs: [
      { id: 'private', text: 'Opens up only in private, after you have listened first.' },
    ],
    look: { skin: '#C08E66', hair: '#1A1717', style: 'short', top: '#5B6F4E', collar: '#5B6F4E', glasses: false, age: 1 },
  },
  ha: {
    name: 'Chị Hà', short: 'Hà', role: 'HR Business Partner',
    arch: 'Process guardian', tier: 3,
    persona: 'Warm, structured, alert to fairness and bias. Values evidence and consistent process.',
    prefs: [{ id: 'fair', text: 'Listens for fairness and consistent evidence.' }],
    look: { skin: '#D9AC86', hair: '#2B201C', style: 'bob', top: '#7A5C8A', collar: '#EFE8F2', glasses: true, age: 2 },
  },
};

export const NPC_IDS = Object.keys(NPCS);
// NPCs whose rung counts toward "sponsors" (Tier 1-2 senior or peer relationships).
export const SPONSOR_IDS = ['anh_khai', 'ethan', 'chi_lan', 'sarah', 'raj', 'antoine', 'minh_chau', 'michael', 'bao'];

export const COACH = {
  name: 'T+10', role: 'Your coach, a bank technology executive about ten years further up the same track',
};

export function displayName(id, names) {
  const n = names && names[id];
  return (n && String(n).trim().slice(0, 40)) || NPCS[id]?.name || id;
}
