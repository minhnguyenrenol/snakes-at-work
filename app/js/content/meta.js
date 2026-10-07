// Evidence cards, free-slot investments, career levels and places.

// Evidence cards gate promotions (plan §6.4): earned by a scenario at a minimum grade, never by XP.
export const EVIDENCE = {
  told_manager_first: { name: 'Told my line first', from: 'd1_first', desc: 'Your manager heard about the executive\'s interest from you, before anything happened.' },
  first_message: { name: 'A first message that got a yes', from: 'd1_message', desc: 'CUP: context, useful, proposal, in about 70 words.' },
  kept_first_promise: { name: 'Kept the first promise', from: 'd4_thanks', desc: 'The one-pager you promised arrived within 24 hours.' },
  defended_number: { name: 'Defended the number honestly', from: 'd3_real', desc: 'You broke down "about a year" and named the soft part yourself.' },
  rival_coauthor: { name: 'Turned a rival into a co-author', from: 'd6_invite', desc: 'You brought a competitive peer into the work and shared the credit.' },
  delivered_gift: { name: 'Delivered the gift', from: 'd6_report', desc: 'You ran the session you offered and reported back in three lines.' },
  labelled_numbers: { name: 'Labelled every number', from: 'd7_headline', desc: 'Measured or estimated, and whose, on the slide.' },
  onepager_sent: { name: 'One page, one ask', from: 'd8_headline', desc: 'A proposal tied to his epic, with a single decision.' },
  bad_news_early: { name: 'Delivered bad news well', from: 'd9_blufr', desc: 'BLUF-R at 70% certainty: early, owned, with a plan.' },
  pilot_results: { name: 'Led a pilot team to a measured result', from: 'd10_results', desc: 'A labelled result, with the team credited by name.' },
  gave_sbi: { name: 'Gave hard feedback well', from: 'd13_sbi', desc: 'Situation, behaviour, impact, then asked for their view.' },
  fair_panel: { name: 'Hired fairly', from: 'd13_hire', desc: 'Same questions, same evidence; caught your own bias.' },
  calm_in_rumours: { name: 'The calm one', from: 'd15_rumour', desc: 'Didn\'t speculate or spread; turned it back to the work.' },
  kept_discretion: { name: 'Kept discretion', from: 'd15_discretion', desc: 'Declined to share what wasn\'t yours to share, even with your sponsor.' },
  prewired: { name: 'Pre-wired the Risk Guardian', from: 'd15_prewire', desc: 'No surprises: he saw it before the meeting.' },
  culture_lens: { name: 'Spoke Australian', from: 'd17_au', desc: 'Bad news first, plain English, owned, with a plan.' },
  paused_first: { name: 'Paused first', from: 'd17_privacy', desc: 'A privacy concern: you stopped the practice, owned it and documented it.' },
  red_prewired: { name: 'No surprises at steering committee', from: 'd18_prewire', desc: 'The GM heard "red" from you the night before.' },
  network_mapped: { name: 'Mapped three sponsors', from: 'd19_map', desc: 'Three sponsors, eight advocates, thirty friends.' },
  grew_sponsee: { name: 'Sponsored someone', from: 'd19_sponsee', desc: 'You spent your reputation on someone you grew.' },
  diversified: { name: 'Never only one sponsor', from: 'd20_leaves', desc: 'Your sponsor left; your network held.' },
  held_the_line: { name: 'Held the line', from: 'd20_ethics', desc: 'Declined privately, proposed an honest alternative.' },
  retest_passed: { name: 'Still true three weeks later', from: 'd21_retest_real', desc: 'Your number held up in front of the board\'s sceptic.' },
};

// Free slot (Persona-style): one optional investment per day. Repeatable notes keep every gate reachable.
export const SLOTS = {
  friday15: { title: 'Friday 15 minutes', kind: 'note', icon: 'note', desc: 'Send one short note, a result or a thanks, to someone in your network.', fx: { pol: 1, energy: -1 }, npcFx: 3,
    why: 'Handbook 10.3: one result note and one thanks a week keeps a network warm with almost no time.' },
  rest: { title: 'Protect the evening', kind: 'rest', icon: 'moon', desc: 'Go home on time. No Teams after 19:00.', fx: { energy: 10 },
    why: 'Energy is the hidden governor. Tired people have worse conversations.' },
  policy: { title: 'Check the outside-interests policy', kind: 'task', icon: 'shield', desc: 'Read the policy and declare your side work properly, today.', fx: { trust: 2 }, tags: ['declared_side_work'],
    why: 'Declared early, side work is a footnote. Discovered late, it\'s a headline.' },
  lan_coffee: { title: 'Coffee with {lan.s}', kind: 'coffee', icon: 'cup', npc: 'chi_lan', desc: 'Ask the Head of Design for her view before you need it.', fx: { chi_lan: 4, craft: 1, energy: -2 },
    why: 'The Craft Guardian wants to be consulted before, not informed after.' },
  viva: { title: 'A thoughtful comment', kind: 'task', icon: 'chat', npc: 'anh_khai', desc: 'He posted about AI on the internal social feed. Add one specific, useful comment, no flattery.', fx: { anh_khai: 2, vis: 2 },
    why: 'C3: a specific comment on his post is a light, visible touch.' },
  antoine_coffee: { title: 'Coffee with {antoine.s}', kind: 'coffee', icon: 'cup', npc: 'antoine', desc: 'Ask the Head of Skills Guild what one learner\'s before-and-after looked like.', fx: { antoine: 4, energy: -2 },
    why: 'Tier 2 advocates: monthly, with a real question.' },
  help_bao: { title: 'Help {bao.s}', kind: 'task', icon: 'hands', npc: 'bao', desc: 'He\'s stuck on a prototype. Pair with him for an hour, and credit him, not you.', fx: { bao: 4, pol: 2, energy: -3 },
    why: 'Today\'s peer is tomorrow\'s sponsor or blocker.' },
  mentor_vy: { title: 'Mentor {vy.s}', kind: 'task', icon: 'sprout', npc: 'vy', desc: 'Thirty minutes: one goal she chose, one question from you, one thing she\'ll try.', fx: { vy: 4, energy: -2 }, tags: ['coached_vy'],
    why: 'Someone grew because of you: the manager evidence panels look for.' },
};

export const LEVELS = [
  null,
  { title: 'Senior Product Designer', floor: 6 },
  { title: 'Senior Designer, Trusted', floor: 7 },
  { title: 'Lead Designer / Pilot Lead', floor: 9 },
  { title: 'Design Manager (player-coach)', titleP: 'Lead Designer, Lending', floor: 11 },
  { title: 'Design Manager, established', titleP: 'Principal Designer', floor: 12 },
  { title: 'Senior Manager, Design', titleP: 'Principal, AI-native Delivery', floor: 15 },
  { title: 'Head of Design (portfolio)', titleP: 'Distinguished Designer', floor: 18 },
  { title: 'Director, Product & Design', titleP: 'Director, Design Practice', floor: 21 },
  { title: 'Executive, AI Enablement', floor: 24 },
  { title: 'Senior Executive', floor: 27 },
];

export function levelTitle(level, branch) {
  const L = LEVELS[Math.max(1, Math.min(10, level))];
  return (branch === 'principal' && L.titleP) || L.title;
}

// Scene palettes for SVG backdrops: [wall, floor, accent, window light].
export const PLACES = {
  desk: { name: 'Open-plan floor', pal: ['#D5E0E2', '#8FA4AA', '#2B6F7E', '#FFE2A8'] },
  teams: { name: 'Teams', pal: ['#E4E6F1', '#C9CCE0', '#6264A7', '#FFFFFF'] },
  cafe: { name: 'Café downstairs', pal: ['#CFDAD3', '#6F7F72', '#1C7560', '#FFD58A'] },
  lift: { name: 'The lift', pal: ['#C3CCD0', '#7E8B91', '#2B4552', '#F2F6F7'] },
  pantry: { name: 'The pantry', pal: ['#D9E7E3', '#A6BDB6', '#1C7560', '#FFF1CF'] },
  meeting: { name: 'Meeting room', pal: ['#D8E1E6', '#9AAAB3', '#1F4A63', '#EEF4F7'] },
  restaurant: { name: 'Restaurant', pal: ['#D6D2C2', '#5E5A4C', '#B4432F', '#FFD58A'] },
  townhall: { name: 'Town hall', pal: ['#D6DCE6', '#8C97A8', '#2B4552', '#F2F5FA'] },
  office: { name: 'Executive office, Floor 21', pal: ['#CBD5D8', '#5F7178', '#14262E', '#FFE2A8'] },
  melbourne: { name: 'Melbourne', pal: ['#D3DFE8', '#8FA6B6', '#1F3A5F', '#F0F6FA'] },
  boardroom: { name: 'Boardroom, Floor 27', pal: ['#C9D1D4', '#4E5E64', '#F2A93B', '#FFF0D2'] },
  warroom: { name: 'War room', pal: ['#C8D0D3', '#6E7C82', '#B4432F', '#EEF2F3'] },
};
