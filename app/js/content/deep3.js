// Deep layer, days 9-11. See deep1.js for the shape.

export const DEEP3 = {
  d9_kickoff: {
    you: 'This is the evidence your dossier says is missing: leading people who do not report to you. Your strength is coaching; the shift is from teaching a method to owning a team\'s outcome. Making it safe to raise problems on day one is the first act of a manager, not a facilitator.',
    risk: ['H6'],
    follow: [
      { by: 'vy', q: 'What happens if we fall behind?',
        a: 'Then we tell each other early and fix it together. Falling behind is normal in a pilot; hiding it is the only real problem. If something slips, I want to hear on Monday, not Friday, and I\'ll thank you for it. My job is to remove blockers and to tell anh {khai.s} the truth about where we are. Your job is to do good work and flag anything that worries you. Nobody gets blamed for raising a problem.' },
      { by: 'dat', q: 'How will we be measured?',
        a: 'As a team, on three things: how long discovery to sign-off takes compared with last year\'s epic, how many review rounds we need, and defects after handoff. Not on individual speed. I\'ll also ask each of you every two weeks what you\'re learning, because part of the point is that you can run the method without me by the end. Your names will be on the results when we report them.' },
    ],
  },
  d9_yes: {
    you: 'In Vietnamese workplaces, "yes" can mean "I heard you". As a leader you need to hear the real answer without making anyone lose face. You understand the culture deeply; this scene turns that understanding into a habit: ask what might stop it, warmly, every time.',
    risk: [],
    follow: [
      { by: 'vy', q: 'Um, maybe the data from the PO. I haven\'t got it yet.',
        a: 'Thank you for telling me, that\'s exactly what I needed to know. Let\'s sort it now so it doesn\'t become Friday\'s problem. I\'ll message the PO tonight and ask for the data by Wednesday morning. If it isn\'t there by then, come and find me and we\'ll decide together whether to use last year\'s figures as a placeholder. You did the right thing raising it. Ride home safely.' },
      { by: 'coach', q: 'Why ask "what might stop it" instead of "are you sure"?',
        a: 'Because "are you sure?" invites another yes, and makes doubt sound like disloyalty. "What might stop it?" assumes there could be obstacles and makes naming them the helpful answer. It protects her face: she isn\'t admitting she can\'t do it, she\'s helping me plan. In a culture where saying no to a senior person is hard, the leader has to make the honest answer the easy one.' },
    ],
  },
  d9_seventy: {
    you: 'Bad news early is the test sponsors care about most. Your instinct may be to wait until you are sure and have a fix. At seventy percent, with nine days to steering committee, the trusted move is to tell {khai.s} now, privately, with your part named and a plan attached.',
    risk: ['H1'],
    follow: [
      { by: 'anh_khai', q: 'Why are you telling me before you\'re sure?',
        a: 'Because nine days is enough time for you to help, and two days isn\'t. If I wait until I\'m certain, you\'d hear about it in front of the steering committee, which is the worst place to be surprised. I\'m about seventy percent sure we\'ll slip by two weeks. I\'ve already re-sequenced so prototyping continues on synthetic data. If I\'m wrong and we recover, you\'ll hear that too.' },
      { by: 'anh_khai', q: 'What do you need from me?',
        a: 'One thing: a nudge to {raj.s}\'s team on the data-access approval. It\'s been waiting longer than planned, partly because I started the request a week late, which is on me. A word from you could recover about a week. Everything else we can handle: the team is prototyping on synthetic data, and I\'ll send you a three-line update every Friday until it\'s resolved.' },
    ],
  },
  d9_blufr: {
    you: 'BLUF-R puts the bottom line first and owns your part. For someone whose drafts tend to explain first, this is the most important message shape in the game. Sixty words of bad news, ownership and a plan builds more trust than any success report.',
    risk: ['H2', 'H1'],
    follow: [
      { by: 'anh_khai', q: 'Why did the approval take so long?',
        a: 'Two reasons. I submitted the data-access request a week later than I should have, because I underestimated how long Risk reviews take for real lending data. And the request needed a privacy assessment we hadn\'t planned for. Both are lessons: next time I\'ll start access requests in week zero and check privacy requirements with {raj.s}\'s team before we scope. I\'ve added both to the pilot playbook.' },
      { by: 'coach', q: 'Why say "that\'s on me" when Risk was slow too?',
        a: 'Because my part is the only part I control, and naming it stops the message sounding like blame. If I only say Risk was slow, he hears an excuse and wonders what I\'m not telling him. If I own the late start, he hears someone who learns. It also protects my relationship with {raj.s}\'s team, whom I still need. Owning my part first makes it safe for everyone else to own theirs.' },
    ],
  },
  d9_error: {
    you: 'An AI-drafted summary you reviewed too quickly reached a senior stakeholder. This is the risk your method exists to prevent, so how you respond is evidence for or against the method itself. Own it plainly, fix it, and show the new check. That is the story {raj.s} will hear about.',
    risk: ['H1'],
    follow: [
      { by: 'sarah', q: 'How do I know the other summaries are right?',
        a: 'Fair question. I\'ve rechecked every summary from the last two weeks against the session recordings, and that was the only error. From today, every decision log goes to a named person from your team to confirm before it\'s shared. I\'d also like one of your POs to spot-check any log, any time. The tool drafted it, but I signed off on it, and I should have caught it.' },
      { by: 'raj', q: 'So the AI did get something wrong.',
        a: 'It did, and our review missed it, which is the part that matters. The AI drafted a decision summary that misread a banker\'s comment, and I reviewed it too quickly. The audit trail let us find the source within minutes and correct it. We\'ve added a stakeholder confirmation step before any log goes out. I\'d welcome you reviewing the change; this is exactly the kind of failure the controls are meant to catch.' },
    ],
  },
  d9_load: {
    you: '"Takes initiative without fanfare" also means taking on too much without saying so. At 130%, quality suffers quietly. Telling your manager early, with two options and a preference, is how leaders manage capacity, and how you protect the reputation you are building.',
    risk: ['H6'],
    follow: [
      { by: 'ethan', q: 'Which would you choose?',
        a: 'I\'d push the academy curriculum two weeks. The release is the team\'s commitment and the pilot has a steering committee date, but the academy work has some flexibility, and {antoine.s} has been understanding before. I\'ll tell him myself tomorrow with a new date. If you\'d rather keep the academy on time, bringing {bao.s} in on the release notes would work too, and he\'d do them well.' },
      { by: 'ethan', q: 'Why didn\'t you tell me earlier?',
        a: 'I should have. I thought I could absorb it, and I kept saying yes to small things that added up. That\'s a habit I need to change if I\'m going to lead a team, because a manager who hides overload teaches the team to hide it too. From now on I\'ll flag it when I go over about a hundred and ten percent, not a hundred and thirty.' },
    ],
  },
  d9_order: {
    you: 'Assembling BLUF-R from pieces makes the order automatic: bottom line, why, your part, the plan, the ask. When you are under pressure, structure is what keeps a bad-news message calm and short.',
    risk: ['H2'],
    follow: [
      { by: 'coach', q: 'Why does "my part" come before "the plan"?',
        a: 'Because a plan from someone who hasn\'t owned their part sounds like spin. Once I\'ve said what I got wrong, the plan reads as a correction rather than a cover. It also answers the question the reader is silently asking: is this person going to learn from it? Ownership first, then the plan, makes the plan more believable and the ask easier to grant.' },
      { by: 'coach', q: 'What if there is nothing you did wrong?',
        a: 'Then I skip that part rather than invent one. BLUF-R isn\'t a confession ritual; it\'s honest structure. If the delay came entirely from an outside change, I say what changed, how I found out, and what I\'m doing. But I check myself carefully first, because there\'s usually something I could have seen earlier. Owning a small part honestly is stronger than claiming none.' },
    ],
  },
  d10_signals: {
    you: 'You keep good logs; now you read them like a researcher. Advice given, aims known, access granted: those are the signals of a rung climbed. Knowing when you are ready to ask, rather than when you want to ask, is the antidote to H5.',
    risk: ['H5'],
    follow: [
      { by: 'coach', q: 'Which single signal matters most?',
        a: 'Access. Advice is cheap for a senior person and knowing my aims is just information. When he puts me in a room he controls and introduces me to someone like {sarah.s}, he is spending his own reputation on me. That is the behaviour of an advocate, and it is the signal that the next rung, an explicit ask, will feel natural rather than presumptuous.' },
      { by: 'coach', q: 'What signal would tell you to slow down?',
        a: 'Shorter replies, meetings moved more than once, or him steering conversations back to the project when I mention my development. Any of those suggests he is not ready to invest more right now, perhaps because of his own pressures. Then I keep delivering, stay useful, and wait for a natural moment. Pushing on a slow signal is how people ask too early and lose the ground they had.' },
    ],
  },
  d10_results: {
    you: 'This is the result your whole three weeks has been building towards: a measured number, a junior person presenting, a PO quote. Three lines, labelled honestly, with credit to {vy.s}, is exactly how a delivery lead reports. It is also the evidence that you multiply others.',
    risk: ['H2', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Impressive. Could the team do it again without you?',
        a: 'Mostly, yes, and that was the real test. {vy.s} ran the journey mapping and presented it herself; {dat.s} ran two of the decision-log sessions. Where they still needed me was the quality gate on AI outputs, so I\'m turning that into a checklist they can own. I\'d estimate one more epic with light coaching and they could run it without me. That\'s what I\'d want to prove next.' },
      { by: 'minh_chau', q: 'Is six versus fourteen weeks comparing like with like?',
        a: 'As close as we could make it. Last year\'s epic had a similar scope, the same product area and a team of comparable size. Your team helped define the baseline, which kept me honest. The differences we know about: this year\'s PO was keener, and we had better stakeholder access. So I\'d say the method explains a large part of the gap, not all of it. A second run would tighten that.' },
    ],
  },
  d10_credit: {
    you: 'Someone presenting your method as theirs is a test of both visibility and restraint. Your quiet-backbone habit says let it go; your ego says correct it in the room. The leader\'s move is neither: a calm, private, factual word to your sponsor that credits the other team generously.',
    risk: ['H6', 'H9'],
    follow: [
      { by: 'anh_khai', q: 'Are you upset about it?',
        a: 'A little surprised, honestly, but not upset. I\'d rather the method spreads than stays mine, and his team did help adapt the templates. I just wanted you to have the full picture, since you may want to talk about it in other rooms. If it\'s useful, I\'d happily work with his team so the next version credits everyone properly. The more teams using it, the better the case for scaling.' },
      { by: 'coach', q: 'Why not correct him in the meeting?',
        a: 'Because a public correction makes me look petty and puts {khai.s} in an awkward spot in his own meeting. The room would remember the conflict, not the method. A private, factual note gives my sponsor the truth without forcing him to referee. It also shows I can protect the room while still making sure the facts are known, which is exactly what senior leaders do with credit disputes.' },
    ],
  },
  d10_rung: {
    you: 'You have wanted to make this ask for more than a year. The signals now say it is time: advice, knowledge of your aims, access. The discipline is asking at the right rung, with the gap named honestly and an easy "not yet" built in.',
    risk: ['H5'],
    follow: [
      { by: 'coach', q: 'How do you know it isn\'t too early?',
        a: 'Because he has already moved through the earlier rungs himself. He gave advice when I asked, he knows I want to lead, and he spent his own reputation putting me in front of his leadership team and introducing me to {sarah.s}. Asking now matches what he is already doing. Asking at the first coffee would have been demanding something he hadn\'t offered. The ladder protects both of us.' },
      { by: 'coach', q: 'What if he says no?',
        a: 'Then I\'ve learned something precious and lost very little. A "no" or "not yet" with a reason gives me a plan; I\'d write his words down exactly and agree what I need to show. The S4 script is built so that no is easy for him to say, which keeps the relationship safe. The worst outcome isn\'t no; it\'s never asking and hoping he guesses what I want.' },
    ],
  },
  d10_s4: {
    you: 'S4 is direct, which suits {khai.s}\'s Singapore style, and it names your real gap: leading people. Saying it aloud twice makes the words yours. If your voice wobbles on "would you back me", practise that line until it sounds calm.',
    risk: ['H5', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Not yet. What would you need to show me?',
        a: 'Thank you, that\'s really useful, and I\'d like to get it exactly right. I think it\'s two things: that a team can deliver with the method without me doing the work, and that I can handle the people side, including a hard conversation and a hiring decision. Could we agree what good looks like for those in ninety days? I\'ll write it up, share it with {ethan.s}, and report back at forty-five days.' },
      { by: 'anh_khai', q: 'Why should I back you over others?',
        a: 'Because I\'m already doing part of the job and I\'ve shown I can grow other people into it. The pilot team delivered in six weeks against fourteen, and two of them now run sessions without me. What I bring that\'s rarer is the combination: a method that\'s safe in a regulated bank, and the habit of teaching it. I\'m not asking you to bet on potential alone; I\'m asking you to back evidence.' },
    ],
  },
  boss_ask: {
    you: 'The Ask is rung S, the moment your dossier has been building towards. Expect "talk to your manager", "not yet", or a different role. Each has a scripted response in the library. Stay calm, write his words down, and leave with one agreed next step, whatever he says.',
    risk: ['H5', 'H3'],
    follow: [
      { by: 'anh_khai', q: 'Talk to {ethan.s} first, and then we\'ll see.',
        a: 'Of course, anh, that\'s the right order. I\'ll talk to him this week and be clear that I\'d like to explore a lead role, ideally on one of your priorities, done properly so Lantern isn\'t left exposed. Once he and I have talked, would it help if the three of us met for twenty minutes? I\'ll come back to you either way with where we\'ve landed.' },
      { by: 'anh_khai', q: 'What would make you successful in the first ninety days?',
        a: 'Three things. A clear problem that matters to you, so the team\'s work is visible. Two or three people who want to learn the method, ideally with one of them ready to lead parts of it by the end. And honest feedback from you at forty-five days, so I can correct course early. I\'d measure it by delivery against a baseline, and by whether the team can run without me.' },
    ],
  },
  d11_offer: {
    you: 'Risk H10: two tracks colliding. The academy offer is real, and the {khai.s} track is not concrete yet. The trust move is to be open with both, ask for time, and seek advice without using one offer as leverage over the other. Your thesis covers both; let it guide you.',
    risk: ['H10'],
    follow: [
      { by: 'anh_khai', q: 'Are you using this offer to push me?',
        a: 'No, and I\'m sorry if it sounds that way. I wanted you to hear it from me rather than second-hand, and I genuinely value your advice. The academy role would let me make AI-era ways of working real for many people through teaching. What I\'ve wanted is to do that through delivery, leading a team. I haven\'t decided. Which route do you think would serve the bank better?' },
      { by: 'antoine', q: 'Why do you need more time?',
        a: 'Because it\'s a real decision and I want to make it properly, not quickly. I\'m honoured by the offer and I want to understand the role well: the team, the expectations, how success is measured. I\'d also like to talk it through with my manager and one senior person whose advice I value. Could I come back to you by next Wednesday? I\'d rather give you a considered yes or an honest no.' },
    ],
  },
  d11_six: {
    you: 'Before saying yes to your first manager role, your thoroughness becomes an asset: scope, reports, band, success measures, transition, and what happens to your current commitments. Six good questions protect you from accepting a title without the conditions to succeed.',
    risk: ['H10'],
    follow: [
      { by: 'antoine', q: 'Which question matters most to you?',
        a: 'How success is measured in the first year. Everything else follows from that: whether I\'m judged on learner numbers, on adoption in teams, or on business outcomes. If it\'s attendance, the role is mostly logistics. If it\'s whether teams actually work differently afterwards, it\'s the role I want. I\'d also want to understand the trainers\' development goals, since leading them well is what I\'d be accountable for.' },
      { by: 'coach', q: 'Why ask about the transition from your current work?',
        a: 'Because how I leave says as much about me as how I arrive. Lantern and the pilot depend on me, and a sponsor watching will notice whether I leave them in good shape. Agreeing a transition plan protects {ethan.s}, the team and my reputation. It also tests the new role: a manager who wants me to start Monday regardless of my commitments may not value reliability.' },
    ],
  },
  d11_lateral: {
    you: 'A lateral move with no reports is close to what your dossier ranks first, but it carries a trap: becoming a great senior IC in a new place. The leader\'s answer is enthusiasm plus clarity: agree what six months of success would unlock, and write it down.',
    risk: ['H5', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'What would you want it to unlock?',
        a: 'A team. Concretely, if the lending portfolio delivers the measured improvements we\'ve agreed and the designers I coach can run the method themselves, I\'d like to be considered for leading a small team formally. I\'m not asking for a promise today. I\'d just like us both to know what good looks like, so in six months we\'re having a conversation about evidence rather than hopes. I\'ll write it up this week.' },
      { by: 'ethan', q: 'He offered you a lateral move?',
        a: 'Yes, and I wanted you to hear it from me first. It\'s Lead Designer on the lending portfolio, same band, no reports to start. I haven\'t said yes. If I do, I\'d want to plan the Lantern handover properly with you, over a few weeks, so the team isn\'t exposed. I\'d also really value your view: you know my work better than anyone, and I want to make the right call.' },
    ],
  },
  d11_band: {
    you: 'Talking about pay is uncomfortable for many people raised to be modest. The clean answer anchors on scope rather than a number, names the band that matches people leadership, and trusts the process. It is calm, short, and impossible to read as greedy.',
    risk: [],
    follow: [
      { by: 'antoine', q: 'Do you have a number in mind?',
        a: 'I\'d rather anchor on the role than on a number. For a people-leader role with four trainers and responsibility for outcomes, I\'d expect the Manager band, positioned fairly for my experience. I trust HR to benchmark that properly. If the scope changes, for example fewer reports, then I\'d expect the band to reflect that too. What matters most to me is that the role and the band match.' },
      { by: 'coach', q: 'Why not just name a salary?',
        a: 'Because a number too low leaves money on the table and a number too high can end the conversation, and I don\'t have the internal benchmarks. Naming the band ties my expectation to the scope, which is how the bank thinks about it anyway. It sounds professional and fair. If they come back with a figure, I can then compare it with the band\'s range and discuss it on evidence rather than feelings.' },
    ],
  },
  d11_thesis: {
    you: '{bao.s}\'s question is the H10 risk said out loud: "you\'re applying for everything". Your dossier\'s thesis is the answer: one aim, several routes. One or two sentences that make you consistent rather than opportunistic will be repeated by peers more than any pitch.',
    risk: ['H10', 'H9'],
    follow: [
      { by: 'bao', q: 'So if both say yes, which one?',
        a: 'Whichever lets me lead people doing the work best, and I\'ll decide with the advice of people I trust, not by which comes first. The academy would mean teaching at scale; the delivery role would mean leading a team on real projects. They\'re different routes to the same thing. And whichever I choose, I\'d want you involved in the method: you\'ve made it better already.' },
      { by: 'coach', q: 'Why does consistency matter so much to peers?',
        a: 'Because peers decide what people say about you when you are not in the room. If they think I\'m chasing every opportunity, that story reaches managers and sponsors before I do. One clear thesis that explains every move, making AI-era ways of working real here, safely, turns apparent opportunism into a coherent career. It also helps me say no to things that don\'t fit.' },
    ],
  },
  d11_branch: {
    you: 'Manager or principal: your dossier ranks the player-coach delivery lead first, and the IC principal path a strong second. Both are real careers. The honest answer is the one that matches your best weeks. Say it plainly, with the reason, and keep your hands on the work.',
    risk: ['H10'],
    follow: [
      { by: 'anh_khai', q: 'What would you miss if you chose management?',
        a: 'Probably the deep work: the hours of building a prototype until it\'s right. I\'d keep some of that as a player-coach, but less. What I\'d gain is the thing I already enjoy most: seeing someone I coached ship something better than I would have. I\'ve noticed my best weeks are those weeks. So I\'d rather trade some craft time for that, and keep enough hands-on work to stay credible.' },
      { by: 'anh_khai', q: 'And if principal turned out to be the better fit?',
        a: 'Then I\'d want to know, and I\'d take it seriously. A principal role would let me shape how the whole bank designs with AI, which is also meaningful work. I\'d still want to grow people through it, by mentoring and setting standards. If after six months you or {ethan.s} see me thriving more on the IC side, I\'d rather adjust than hold onto a title. The goal is impact, not a label.' },
    ],
  },
};
