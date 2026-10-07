// Your dossier: the handbook's evaluation of you (Parts 1.4 to 2.4), with every real colleague and employer name removed.
// Scenes point at these risks and gaps by id so the game can say why a scene matters for you specifically.

export const PROFILE = {
  thesis: 'Make AI-accelerated, auditable delivery repeatable across a portfolio, and lead the people who do it.',
  thesisWhy: 'It is where what {khai.s} is judged on overlaps with what you want. Every message, proposal and ask should ladder up to it.',
  wants: [
    'Become a manager. You have been trying for more than a year: a manager pitch deck, a Skills Guild application.',
    'Then Principal, or important special projects under {khai.s}.',
    'Contribute a lot and grow steadily at the bank.',
    'A long-term sponsor, not a one-off favour.',
    'Use your genuine edge: you are very current on AI.',
  ],
  strengths: [
    { id: 'method', title: 'A governed AI design method', line: 'Not "a designer who uses AI tools": a documented, teachable method used on a regulated problem.', proof: '27 recorded sessions became 23 decision logs; 23 reusable playbooks and 9 standards; prototypes for 3 roles, 3 MVP apps, 150 ranked features, audit history designed in.' },
    { id: 'multiplier', title: 'You multiply others', line: 'The core manager signal, already in your record.', proof: 'A chapter-wide ways-of-working session, four AI uplift workshops with Skills Guild, 1:1 coaching, and an individual award for "uplifting team capability through practical AI guidance".' },
    { id: 'regulated', title: 'Complex regulated workflows', line: 'Strong numbers in the hardest domain.', proof: 'Workflow friction down 67%, fulfilment from about 24 hours to about 5 minutes, onboarding 70% faster, lead-to-sale up 20%.' },
    { id: 'builder', title: 'You have shipped code', line: 'Rare for a designer, and the root of your AI-build fluency.', proof: 'Years as a front-end developer before design; "this looks like an actual app, it\'s runnable" from an engineer at a walkthrough.' },
    { id: 'regional', title: 'Singapore, Vietnam, global', line: 'Cross-cultural range that is underused.', proof: 'Computing degree and about fifteen years in Singapore; global financial products at a market-data firm; 250+ mentoring sessions with 50+ mentees.' },
    { id: 'community', title: 'You build communities', line: 'Influence and operations at volunteer scale.', proof: 'Toastmasters VP Education then President: 7 to 20 members, attendance 10 to 26.' },
  ],
  // Evidence and visibility to senior decision-makers, scored 1-5 by T+10 (handbook 2.2).
  scorecard: [
    { cap: 'Complex regulated workflow design', ev: 5, vis: 3 },
    { cap: 'Measurable outcomes', ev: 4, vis: 3 },
    { cap: 'AI-accelerated design method', ev: 5, vis: 4 },
    { cap: 'Teaching and multiplying others', ev: 5, vis: 3 },
    { cap: 'Stakeholder management', ev: 4, vis: 3 },
    { cap: 'Formal people management', ev: 2, vis: 1, gap: true },
    { cap: 'Strategy and portfolio thinking', ev: 3, vis: 2, gap: true },
    { cap: 'Executive communication', ev: 3, vis: 2, gap: true },
    { cap: 'Craft', ev: 4, vis: 3 },
    { cap: 'Cross-cultural and regional', ev: 5, vis: 2 },
  ],
  // Why the manager move has not happened yet (handbook 2.3), most likely first.
  diagnosis: [
    { h: 'There was no seat', line: 'Manager seats in a design chapter open rarely. A pitch for a pilot creates a project, not a seat. You win seats by being the obvious person when one appears, or by being attached to an initiative that needs a lead.' },
    { h: 'Nobody senior was spending capital on you', line: 'Your strongest supporters are peers. Peers cannot create seats. {khai.s} is the first executive to show interest unprompted.' },
    { h: 'Your evidence looks like a great senior IC', line: 'Panels look for hiring, performance conversations, trade-offs across people and accountability for others\' output. Your best stories are your outcomes and your teaching.' },
    { h: 'Your pitch was about AI adoption, not leading people', line: 'It framed you as a capability champion. A reader thinks "great pilot lead", not "my next manager".' },
    { h: 'Small narrative stretches', line: 'Two CVs describe your years differently. Senior people who notice a small stretch discount the large true claims.' },
  ],
  feedback: [
    { from: 'A peer, August 2026', line: '"More emphasis on the key messages and takeaways."', means: 'Compression.' },
    { from: 'A colleague, July 2026', line: '"Quiet but consistent supporter, despite working behind the scenes."', means: 'Visibility of leadership.' },
  ],
  // The hard truths (handbook 1.6), ranked by how likely they are for you.
  risks: {
    H1: { name: 'The number wobbles', likely: 'High', why: '"About a year" is your manager\'s informal observation and "about 60% of tasks, about half the time" is your own estimate. An executive who wants to retell it will ask what they mean.', antidote: 'Build the defensible breakdown and say the caveat before anyone asks.' },
    H2: { name: 'Over-length', likely: 'High', why: 'Your own peer feedback asked for more emphasis on takeaways, and your profile notes "completeness over compression".', antidote: '30 seconds, 2 minutes, 7 minutes. Stop and let them pull.' },
    H3: { name: 'A perceived bypass of your line', likely: 'Medium-High', why: '{khai.s} is in a different division. Cross-division moves need your current leaders\' goodwill.', antidote: 'Tell {ethan.s} first, credit him publicly, never discuss him negatively upward.' },
    H4: { name: 'The warm window closes', likely: 'Medium', why: 'You are thorough, and analysis-completeness makes you wait for the perfect moment.', antidote: 'A good message now beats a perfect one in three weeks.' },
    H5: { name: 'Asking too early', likely: 'Medium', why: 'A year of trying creates urgency.', antidote: 'Climb the ladder: advice, then advocacy, then the ask.' },
    H6: { name: 'The "quiet backbone" label', likely: 'Medium', why: 'Peers describe you as the quiet operational backbone who steps up behind the scenes. Lovely for culture, risky for promotion.', antidote: 'Ownership language ("I decided", "I set the target"), a point of view, proposals rather than offers of help.' },
    H7: { name: 'Outside work surfaces second-hand', likely: 'Low-Medium, high impact', why: 'You have outside work and plans that someone else could mention first.', antidote: 'Check the outside-interests policy, declare what must be declared, never present outside work as your "real passion".' },
    H8: { name: 'CV inconsistencies', likely: 'Low-Medium', why: 'Two versions of your experience line exist in public.', antidote: 'One truthful line everywhere.' },
    H9: { name: 'Becoming "his person" too visibly', likely: 'Low now, rises later', why: 'Sponsorship always creates some envy.', antidote: 'Share credit loudly, help peers adopt the method, never name-drop.' },
    H10: { name: 'Two tracks collide', likely: 'Medium', why: 'The Skills Guild application and the {khai.s} track could look like two different stories.', antidote: 'One honest thread that covers both: making AI-era ways of working real for many people.' },
  },
  directions: [
    { rank: 1, name: 'AI-accelerated delivery lead (player-coach), sponsored by {khai.s}', score: 4.4 },
    { rank: 2, name: 'Lead or Principal Product Designer, AI-native delivery', score: 3.85 },
    { rank: 3, name: 'Manager, Skills Guild', score: 3.65 },
    { rank: 4, name: 'Design Manager in your current chapter', score: 3.5 },
    { rank: 5, name: 'Direct jump to Head of Design', score: 3.0 },
  ],
};
export const RISK_IDS = Object.keys(PROFILE.risks);
