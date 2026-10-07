// Deep layer, days 16-21. See deep1.js for the shape.

export const DEEP5 = {
  d16_notice: {
    you: 'A third slip in public tests two instincts at once: protecting {dat.s}, and protecting your team\'s credibility with engineering. Owning it in the channel and talking to him privately the same day is what a manager does. Covering silently is the quiet-backbone habit, and it lets the problem grow.',
    risk: ['H6'],
    follow: [
      { by: 'dat', q: 'Why did you say it was on you in the channel?',
        a: 'Because it is my team, so in public the slip is mine to own. I don\'t want engineering discussing you in a channel, and they need a date from someone accountable. Here, privately, I do want to understand what\'s happening, because three slips isn\'t like you. I\'m not here to blame you. I\'d like us to work out together what would make the handoffs land, and what you need from me.' },
      { by: 'coach', q: 'Why not wait until the end of the week to talk?',
        a: 'Because every day I wait, the problem grows and the conversation gets harder. Engineering is already frustrated, and {dat.s} probably knows something is wrong and is worrying about it. Talking the same day, privately, shows I take both the work and him seriously. Delaying hard conversations is the habit my forty-five day report exposed. Leaders who act early have kinder conversations.' },
    ],
  },
  d16_order: {
    you: 'A hard conversation needs a shape so that care and clarity both survive your nerves. Your instinct is to warm up too long; the order here, purpose, how they are, the facts, their view, support, a clear expectation and a follow-up, keeps it humane and honest.',
    risk: ['H6'],
    follow: [
      { by: 'coach', q: 'Why ask how he\'s doing before the facts?',
        a: 'Because if something is wrong outside work, the facts will land very differently. Asking first gives him the chance to share, and shows I see him as a person, not a missed deadline. But I keep it short and sincere, then name the purpose clearly so he isn\'t waiting for the other shoe to drop. Care first, then clarity, then his view, then a plan. Both matter, in that order.' },
      { by: 'coach', q: 'What makes the expectation clear rather than vague?',
        a: 'A specific behaviour and a date. "Be more careful" is vague. "Every handoff includes error states and a checklist, starting this Friday, and we\'ll review the next two together" is clear. He knows exactly what good looks like and when we\'ll check. Clear expectations are kind: they remove guessing. Vague ones feel gentle in the moment but leave him unsure whether he is succeeding.' },
    ],
  },
  d16_open: {
    you: 'The first sentence of a hard conversation decides whether the person hears it as care or as a verdict. Two sentences: why you are talking, that you are on his side, and a genuine question. Your warmth is a real asset here; the work is not letting it blur the point.',
    risk: ['H6'],
    follow: [
      { by: 'dat', q: 'I\'m fine. Is this about the handoffs?',
        a: 'Yes, it is, and I want to be straight with you. Over the last three weeks, three handoffs have gone out missing details, and engineering lost time each time. That\'s not like you, which is why I wanted to talk rather than just send a note. I\'m not here to blame you. I want to understand what\'s getting in the way and work out together what would help.' },
      { by: 'coach', q: 'What if he goes quiet and says nothing?',
        a: 'Then I give him time. Silence often means someone is deciding whether it\'s safe to be honest. I\'d wait, then say something like "It\'s fine to take a moment. Whatever is going on, I\'d rather know so I can help." If he still doesn\'t want to talk, I\'d agree the practical next step for the handoffs and tell him my door is open. I won\'t force him to share.' },
    ],
  },
  d16_energy: {
    you: 'Your energy stat is the game\'s way of saying what your dossier implies: you take on a lot, quietly. A manager running on empty makes poor decisions in the conversations that matter most. Going home, then dropping one thing honestly, is leadership, not weakness.',
    risk: ['H6'],
    follow: [
      { by: 'ethan', q: 'Seriously, what\'s going on? You look exhausted.',
        a: 'Honestly, I\'ve taken on too much this month. Steering committee prep, two one-on-ones and a hard conversation with {dat.s} tomorrow, plus the pilot. You\'re right, I\'m going home. Tomorrow morning I\'ll move the steering committee slide polish to Thursday and protect the one-on-ones and {dat.s}\'s conversation, because those are the ones where people need me at my best. Thank you for saying something.' },
      { by: 'coach', q: 'What do you drop when everything feels important?',
        a: 'The thing where a delay hurts least and quality matters least. Slide polish can wait a day; a hard conversation with someone struggling cannot, and neither can one-on-ones, because people notice when a manager cancels them. I\'d drop it with an honest note and a new date. Then I\'d look at why I got here: probably too many small yeses. Next week I\'ll check my load on Monday, not Thursday night.' },
    ],
  },
  boss_underperformer: {
    you: 'This is the conversation your dossier says panels look for and you have little evidence of: managing performance with care. {dat.s} is capable, proud and carrying something at home. Care and clarity are both scored. Ask, listen, offer support, and still agree a clear expectation and a follow-up date.',
    risk: ['H6'],
    follow: [
      { by: 'dat', q: 'Are you going to put me on a performance plan?',
        a: 'Not today, and I hope we never need to. What I\'d like is a simple plan we agree together: for the next four weeks, lighter load while things are hard at home, every handoff uses the checklist, and we review the first two together. If it works, that\'s the end of it. If things don\'t improve, we\'d talk again honestly about next steps. I\'d always tell you before anything formal.' },
      { by: 'ha', q: 'How did you balance care and accountability?',
        a: 'I separated them clearly in the conversation. First I asked how he was and listened, which is how I learned about the situation at home. Then I named the impact on the team plainly, without softening it. Then we agreed support, a lighter load and the employee assistance programme, alongside a clear expectation for handoffs and a review in two weeks. Support without expectations would have been unfair to him and the team.' },
    ],
  },
  d17_diag: {
    you: 'As you move up, most of your calendar becomes people you have never met. Reading the archetype from someone\'s first question, a Risk Guardian, a Visionary, an Overloaded Operator, lets you adapt in minutes. You are a researcher; this is user research done live.',
    risk: [],
    follow: [
      { by: 'coach', q: 'What do you do if you misread someone\'s archetype?',
        a: 'Notice quickly and adjust. If I lead with a big vision and they keep asking about controls, I\'ve misread a Risk Guardian as a Visionary, so I switch to traceability and data handling. The archetype is a hypothesis, not a label. I watch their reactions: what makes them lean in, what makes them check their phone. Being willing to change approach mid-conversation matters more than guessing right first time.' },
      { by: 'coach', q: 'Which archetype do you find hardest?',
        a: 'Probably the Overloaded Operator, because my instinct is to explain thoroughly and they have no time for it. With them I need the headline in one sentence, the decision I need, and nothing else. Anything more feels like a burden. The irony is that they\'re often the most important people for getting things done, so compressing for them is a skill worth practising daily.' },
    ],
  },
  d17_lens: {
    you: 'Your cross-cultural range is rated 5 for evidence and 2 for visibility. Singapore, Vietnam and Australia all hear the same bad news differently. Sorting three versions of one message to the right audience is how you turn a hidden strength into everyday credibility.',
    risk: [],
    follow: [
      { by: 'coach', q: 'How does the same news change for Melbourne versus Vietnam?',
        a: 'For Melbourne, plain and direct: "We\'re two weeks behind, here\'s why, here\'s the plan", with a little informality and no padding. For a senior Vietnamese leader, the same facts but more care with face: private first, respectful address, and the ownership framed so nobody looks bad in front of others. For Singapore, crisp and data-first. The facts never change; the delivery does.' },
      { by: 'coach', q: 'Isn\'t adapting your style a bit fake?',
        a: 'No more than speaking slower to someone in their second language is fake. The substance and honesty stay identical; I\'m choosing the delivery that lets the message land. Refusing to adapt is actually less respectful, because it makes the listener do all the work. Having lived in Singapore and Vietnam and worked with Australia, I can do this naturally. It\'s an advantage I should use more visibly.' },
    ],
  },
  d17_au: {
    you: '{sarah.s} wants plain English and bad news early. Your instinct may be to explain the usability findings in full. Australian directness is the right register: what is late, why, that it is on you, the new plan, an open door. Fifty words.',
    risk: ['H2'],
    follow: [
      { by: 'sarah', q: 'What went wrong with the bankers?',
        a: 'The first prototype tried to do too much. It showed every field from the application on one screen, and in testing all three bankers struggled to find the loan amount and the risk flags quickly. That\'s on us: we designed for completeness instead of their real task. The new flow shows the three things they check first and hides the rest. We\'ll know on Friday if it works.' },
      { by: 'sarah', q: 'Is two weeks the real number, or will it slip again?',
        a: 'Two weeks is my honest estimate, and I\'d put it at about eighty percent. The risk is that Friday\'s test also fails, which would add another week. If that happens, you\'ll hear from me on Friday afternoon, not at the next steering committee. I\'d rather tell you early than surprise you. If it passes, we\'re back on the revised plan, and I\'ll confirm the date in writing.' },
    ],
  },
  d17_raj: {
    you: '{raj.s} is a Risk Guardian: controls first, documentation, data handling. Leading with speed would confirm his fears. Your method is genuinely built for traceability, so lead with that and invite him to inspect the decision log. That is how Risk becomes your strongest reference.',
    risk: [],
    follow: [
      { by: 'raj', q: 'What happens when the summary is wrong?',
        a: 'The banker sees the source page alongside every summary line, so a wrong line is easy to spot and check. A human reviews every output before it\'s used in a decision, and any correction is logged, so we can see how often and where the tool gets it wrong. If errors cross a threshold we agree with your team, we pause it. I\'d like you to set that threshold, not me.' },
      { by: 'raj', q: 'Why should I trust a designer on controls?',
        a: 'You shouldn\'t trust me on my word, and I\'d rather you didn\'t. That\'s why I\'m asking you to review the decision log for one real application yourself. The method was built in a regulated workflow and every design choice traces to its source, which is unusual. But you know the failure modes far better than I do. If you find gaps, I\'d rather fix them before anything goes near production.' },
    ],
  },
  d17_privacy: {
    you: 'A privacy incident involving someone you lead is a test of honesty under pressure, and of protecting your team without hiding facts. Confirm it, contain it, document it, and ask for Risk\'s guidance. How you handle this will define how {raj.s} sees you for years.',
    risk: ['H1'],
    follow: [
      { by: 'raj', q: 'Why did your designer think that was acceptable?',
        a: 'Because the guidance on public AI tools wasn\'t clear when she did it, and I hadn\'t explained it to my team. That\'s my responsibility, not hers. She used it once, before the guidance came out, and told me as soon as I asked. I\'ve paused the tool, I\'m documenting exactly what data went where, and I\'ll run a short session for the whole team today on what\'s allowed.' },
      { by: 'vy', q: 'Am I in trouble?',
        a: 'You made a mistake, and we\'ll handle it properly together, but you\'re not in trouble with me. The guidance wasn\'t clear and I hadn\'t briefed the team, which is on me. What I need from you is to help me document exactly what you pasted and when, honestly, by eleven. Risk may want to talk to you; I\'ll be there with you. Thank you for being straight when I asked.' },
    ],
  },
  d17_maybe: {
    you: '"Yeah, maybe" is a polite no in many cultures, and Australians use it too. Your instinct may be to accept it and move on. Naming it kindly, "it sounds like you\'re not convinced yet", and asking what she would need, turns a dead end into a requirement.',
    risk: [],
    follow: [
      { by: 'sarah', q: 'Honestly? I need to see the copilot work first.',
        a: 'That\'s completely fair, and I\'d rather earn it than push. Let\'s park the second pilot until the copilot proves itself. I\'ll send you the Friday test results, and if the bankers can use it without help, I\'ll ask you again with the evidence. If they can\'t, you\'ll hear that from me too. Is there one measure that would convince you, like time saved per application?' },
      { by: 'coach', q: 'Why not just wait for her to raise it again?',
        a: 'Because she probably won\'t. A vague maybe usually fades into a no without anyone saying so, and I\'d never learn why. Naming it gently gives her permission to tell me her real concern, which turns guessing into a clear requirement. It also shows I can hear indirect signals, which senior stakeholders value. Then I can deliver exactly what would change her mind.' },
    ],
  },
  d18_peer: {
    you: '{bao.s} is now a peer manager, and overlapping slots in Melbourne could make you rivals in front of the people who matter. Offering to co-present his part, with credit to him, turns competition into alliance. Peers who trust you become the backbone of a senior career.',
    risk: ['H9'],
    follow: [
      { by: 'bao', q: 'Won\'t that make your slot weaker?',
        a: 'I think it makes both stronger. The audience will see one connected story instead of two teams overlapping, and your design-system work is genuinely what made our flows reusable, so they should hear it from you. Let\'s spend thirty minutes tonight aligning slides: I\'ll cut my overlap and hand you the bridge. Melbourne will remember a joined-up Vietnam design team far more than either of us alone.' },
      { by: 'coach', q: 'Why invest in a peer who might compete with you?',
        a: 'Because peers become the people who run the teams I need to work with, and the people who talk about me when I\'m not there. Competing with {bao.s} in Melbourne might win me one good slot; allying with him wins years of cooperation. Senior leaders also notice who makes others look good. Generosity with peers is strategic, but it only works if it\'s genuine.' },
    ],
  },
  d18_prewire: {
    you: 'Red news, privately, the night before a steering committee: BLUF-R at its most important. You assumed an API was ready and did not check. Owning that plainly to {sarah.s} before the room is the difference between a red project and a broken relationship.',
    risk: ['H1', 'H2'],
    follow: [
      { by: 'sarah', q: 'Why am I hearing this the night before?',
        a: 'You\'re right to ask, and I should have checked the API dependency weeks ago. I only confirmed it was late this afternoon, and I wanted you to hear it from me before tomorrow rather than in the room. The plan is solid: the summary panel can ship standalone in March and still save your bankers time, then integrate in April. Can I count on your support for that tomorrow?' },
      { by: 'sarah', q: 'What will you do differently next time?',
        a: 'Check every external dependency in week one, in writing, with the owning team, and recheck it at each milestone. I assumed the loan-system API was ready because it was on their roadmap, and I didn\'t verify it. I\'ve added a dependency check to our project template and asked the API team for a fortnightly status. It\'s a simple habit, and I won\'t skip it again.' },
    ],
  },
  d18_demo: {
    you: 'Live demos break. What twelve people remember is how you handled it. A light line, a calm switch to the recording, and carrying on, shows the composure that makes executives comfortable putting you in front of their bosses. Preparation is the backup; presence is the smile.',
    risk: [],
    follow: [
      { by: 'sarah', q: 'Is it going to do that for my bankers?',
        a: 'Fair question. That freeze was the demo environment\'s network, not the panel itself, but I won\'t ask you to take my word for it. The production version has been running with three bankers for a week, and I\'ll send you its uptime and response times tonight. If there\'s any sign it would freeze for your bankers, we won\'t release it in March. You\'ll have the numbers before you decide.' },
      { by: 'coach', q: 'How do you stay calm when a demo breaks?',
        a: 'By deciding in advance what I\'ll do, so there\'s nothing to decide in the moment. I always have a recording ready and one light line prepared. When it breaks, I take a breath, say the line, switch, and keep going. People take their cue from the presenter: if I panic, they worry; if I\'m calm, it\'s a minor moment. Preparation makes composure easy.' },
    ],
  },
  d18_headline: {
    you: 'Under twenty seconds, for the Group Executive, at dinner. One story, one number, and your sponsor credited first. This is the compression your feedback asked for, at the highest stakes in the game. If it takes longer than a breath, cut it.',
    risk: ['H2'],
    follow: [
      { by: 'michael', q: 'And is it real, or a one-off?',
        a: 'Real, and measured on one epic, which is why we\'re rolling it to four more teams next quarter with the same measures. Fourteen weeks to six on comparable lending discovery, with fewer review rounds. One epic isn\'t a trend yet, and I\'d rather say so than overclaim. Anh {khai.s} set it up so we\'d know within a quarter whether it holds across teams.' },
      { by: 'michael', q: 'What\'s the catch?',
        a: 'The bottleneck moves. When discovery gets faster, approvals, risk reviews and data access become the slow part. We saw it in the pilot: data access took longer than the design work. So scaling isn\'t just training designers; it\'s working with Risk to make controls as fast as the work, without weakening them. That\'s the harder problem, and the more valuable one to solve.' },
    ],
  },
  boss_melbourne: {
    you: 'Melbourne puts every skill in one trip: a red project, a sceptical GM, a Risk Guardian, a dinner with the Group Executive. Your cross-cultural range is your edge here. The same person has to show up in every room: honest early, plain English, credit shared, one story with one number.',
    risk: ['H1', 'H2', 'H9'],
    follow: [
      { by: 'michael', q: 'So what should I take back to the board?',
        a: 'One story with one number: a Vietnam team cut lending discovery from fourteen weeks to six, measured, with every decision traceable for Risk. And one honest caveat: it\'s one epic, and four more teams next quarter will show whether it scales. Anh {khai.s} built the conditions for it. If the board wants, we can show them the decision log; it\'s the part that makes the speed safe.' },
      { by: 'sarah', q: 'Why should I back your team after a red project?',
        a: 'Because you heard about the red the night before, from me, with a plan, and the plan is holding. The usability problem was fixed in a week and the panel ships in March. A team that tells you bad news early is safer to back than one that only shows green. I\'d like to earn the second pilot with the copilot\'s results, not ask for it on promises.' },
    ],
  },
  d19_map: {
    you: 'Head of Design means your network is now your job. Your relationship log was a tool for one sponsor; now it is a system for dozens of people. Sorting who needs a monthly touch, who quarterly, and who only when something changes, keeps you reliable at scale.',
    risk: ['H9'],
    follow: [
      { by: 'coach', q: 'How do you keep relationships genuine at this scale?',
        a: 'By making each touch useful to them, not just regular. A cadence reminds me when to reconnect; the content has to be real: a result they care about, an introduction, help with a problem. I keep notes on what each person is focused on, so my message fits their world. If I have nothing useful, I wait. A genuine touch every six weeks beats a hollow weekly one.' },
      { by: 'coach', q: 'Who is easiest to neglect, and why does it matter?',
        a: 'Peers and people below me. Senior stakeholders demand attention, so I naturally keep in touch. But peers like {bao.s} and people I\'ve grown, like {vy.s}, are the ones who shape my reputation day to day and who will be senior themselves in five years. Neglecting them is how successful people end up isolated. I\'d put a few peers and juniors on a monthly cadence deliberately.' },
    ],
  },
  d19_sponsee: {
    you: 'Role reversal: {vy.s} makes the ask you made, at the same table. This is the clearest evidence of all that you have grown someone. Recognise the craft of her ask, say yes with a condition that grows her gap, and you become the sponsor you once needed.',
    risk: [],
    follow: [
      { by: 'vy', q: 'What if I mess up the hard decision meeting?',
        a: 'Then we\'ll learn from it together, and the project won\'t suffer, because I\'ll be in the room. Messing up a little is part of how you grow into leading. Before the meeting, we\'ll prepare the hardest moment together: what you\'ll do if the PO pushes back. During it, I\'ll stay silent unless you ask for help. Afterwards, we debrief honestly. You\'re ready for this, or I wouldn\'t say yes.' },
      { by: 'coach', q: 'Why attach a condition to your yes?',
        a: 'Because a yes without a stretch wastes the opportunity. Her ask named her gap honestly: leading people through a hard decision. The condition targets exactly that gap, with a safety net. It also protects the project and gives me evidence to advocate for her later. That\'s what sponsorship is: spending my credibility on her, while making sure she earns it. It\'s what {khai.s} did for me.' },
    ],
  },
  d19_lost: {
    you: 'Losing a lead role you proposed tests whether you are building a career or a grievance. Your dossier warns about urgency after years of waiting. Supporting {bao.s}, asking what made him the right choice, and helping him launch it keeps your reputation as someone who puts the work first.',
    risk: ['H5', 'H9'],
    follow: [
      { by: 'anh_khai', q: '{bao.s} has stronger relationships across the platform teams.',
        a: 'That makes sense, and it\'s really useful to know. Those relationships are exactly what a group-wide standard needs, and I\'ve focused more on delivery than on platform engineering. I\'ll work on that: I\'d like to spend more time with {chau.s}\'s teams this quarter. And I\'ll help {bao.s} get the standard off the ground; I know the method well. Thank you for being straight with me.' },
      { by: 'bao', q: 'Are you okay with me leading it?',
        a: 'I am, honestly. I\'d be lying if I said I wasn\'t a little disappointed, but you\'re a good choice, and your relationships with the platform teams will make it work. I\'d like to help: I can share everything from the pilots, the decision-log templates and the quality gate. Just tell me where I\'m most useful. A standard that sticks matters more to me than who leads it.' },
    ],
  },
  d19_declare: {
    you: 'Risk H7 in your dossier: outside work surfacing second-hand. The only safe answer is the true one, already declared and approved. If your real life matches this scene, the time to check the policy is now, not when someone else asks.',
    risk: ['H7'],
    follow: [
      { by: 'ethan', q: 'Why didn\'t you tell me about it?',
        a: 'You\'re right, I should have mentioned it to you as a friend, even though it went through the formal process. I declared it, had it checked against the conflict-of-interest policy, and it\'s outside work hours with no overlap with the bank\'s business. I didn\'t think to tell people informally, and I see now that it left room for rumours. I\'ll send you the approval, and I\'m happy to answer anything.' },
      { by: 'coach', q: 'Why does declaring matter if the work is harmless?',
        a: 'Because harmless and declared are different things to an organisation. Undeclared outside work, however innocent, looks like hiding when someone else discovers it, and that doubt spreads to everything else I\'ve said. Declared work is simply a fact. The policy exists precisely so I don\'t have to judge conflicts alone. Checking and declaring early protects my credibility, which is my most valuable asset.' },
    ],
  },
  d19_talk: {
    you: 'An external talk is visibility beyond the bank, and your strengths as a teacher and mentor shine here. Two cautions from your dossier: be discreet about the bank, and keep your numbers honest. Open with one idea the audience can use on Monday.',
    risk: ['H1', 'H7'],
    follow: [
      { by: 'antoine', q: 'Which bank was that, and can we see the numbers?',
        a: 'I\'ll keep the bank and the details out of a public talk, but I\'m happy to share the shape of the method, which is the useful part. The number came from one epic, measured against a comparable one, so I present it as a strong hint rather than a benchmark. If you\'d like to try the method in your own organisation, I can share a public version of the decision-log template afterwards.' },
      { by: 'coach', q: 'Why caveat your own number in front of four hundred people?',
        a: 'Because the audience will repeat it, and an unqualified number in a public talk can come back to me and the bank. Saying "one epic, so treat it as a strong hint" costs a few seconds and makes me more credible to the people who know measurement. It\'s the same habit that worked with {chau.s}: label what\'s measured and what\'s estimated, everywhere, including on stage.' },
    ],
  },
  boss_restructure: {
    you: 'A restructure tests whether you can make hard trade-offs across people, the manager evidence your dossier says is thinnest. No option wins everything. Be honest about what you protect and what you spend, protect the culture with process and fairness, and tell people early.',
    risk: ['H6'],
    follow: [
      { by: 'michael', q: 'How will you keep the culture through this?',
        a: 'By being honest early, fair in process, and visible. People will hear the plan from me before any rumours, with the reasons. Decisions will use clear, consistent criteria, reviewed with HR, so nobody wonders whether it was personal. And I\'ll protect the things that make the culture work: the decision logs, the mentoring and the design reviews. Culture survives hard decisions when people trust how they were made.' },
      { by: 'anh_khai', q: 'What are you giving up that hurts most?',
        a: 'The second pilot team. It was where the next generation of method coaches would grow, and losing it slows our scaling by about two quarters. I chose it over cutting the review practice, because without reviews, AI-speed work becomes risky work. It\'s a real cost, and I\'ll say so openly. If budget returns, it\'s the first thing I\'d restore, with {vy.s} leading it.' },
    ],
  },
  d20_leaves: {
    you: 'Sponsors move on; the relationship can outlast the role. Your dossier says sponsorship is a long game. Congratulate {khai.s} sincerely, thank him for telling you first, and ask for an introduction to his successor. Gratitude and continuity, not panic.',
    risk: [],
    follow: [
      { by: 'anh_khai', q: 'Will you be okay without me here?',
        a: 'I think so, anh, largely because of what you\'ve helped me build: the team, the evidence and the relationships with {sarah.s}, {raj.s} and {michael.s}. I\'ll miss your advice, though, and I\'d love to keep in touch properly, perhaps a call every couple of months. And if anything I\'m doing could help your new team in Singapore, I\'d be glad to. Thank you, genuinely, for everything.' },
      { by: 'coach', q: 'Why ask for an introduction to his successor?',
        a: 'Because a new leader inherits a team with no context about who does what. An introduction from {khai.s} gives me a warm start and some of his credibility, instead of starting cold. It also shows him I\'m thinking about continuity, not just my own position. Sponsors like knowing their people will be looked after. And it\'s much easier to ask now than after he\'s left.' },
    ],
  },
  d20_ethics: {
    you: 'Your most senior sponsor asks you to drop the caveats. This is H1 at board level: a number that cannot survive questions, in front of directors. Saying no privately, with a stronger honest alternative, protects him, the board and your integrity at the same time.',
    risk: ['H1'],
    follow: [
      { by: 'michael', q: 'Directors don\'t want footnotes. Just make it simple.',
        a: 'I agree it needs to be simple. How about this: the headline in large type says "Discovery cut from 14 weeks to 6 on a measured lending epic", and a single line below says "Portfolio estimate: around 60%, to be confirmed next quarter". It\'s simple, it\'s still a strong story, and if a director asks "is it real?", the answer is yes. I\'d hate for anyone to challenge it later.' },
      { by: 'coach', q: 'What if he insists?',
        a: 'Then I\'d explain once more, privately, why I can\'t put my name to a portfolio claim we haven\'t measured, and offer to present the measured version myself. If he still insists, I\'d ask that the slide not be attributed to my team. That\'s uncomfortable, but less uncomfortable than a board being misled. Most senior people respect a respectful no on integrity, especially with a good alternative.' },
    ],
  },
  d20_manip: {
    you: 'Influence and manipulation can use the same techniques. The test in this scene, "would I be comfortable if they saw my notes?", is one you can use on every relationship log entry, every pre-wire and every ask. Sponsorship built on manipulation collapses; built on honesty it compounds.',
    risk: ['H9'],
    follow: [
      { by: 'coach', q: 'Is keeping a relationship log manipulative?',
        a: 'Not if it would be fine for them to read it. Notes on what someone cares about, what I promised and when to follow up are a way of being reliable and attentive. It becomes manipulative if it contains things like "flatter him about Singapore to get the role" or private information I shouldn\'t have. The test is simple: would I be comfortable if they saw my notes? Mine should pass.' },
      { by: 'coach', q: 'Where is the line with pre-wiring a meeting?',
        a: 'Pre-wiring is influence when I share the same facts with people before a meeting so nobody is surprised and their concerns can improve the proposal. It becomes manipulation when I tell different people different stories, or hide information to engineer a result. If everyone could compare notes afterwards and find them consistent, it\'s honest. If not, it\'s politics.' },
    ],
  },
  d20_mistake: {
    you: 'You approved a release without testing joint applications. BLUF-R to the Group Executive, before his day starts: what happened, no customer impact, your part, the fix, no action needed. Owning a mistake this quickly at this level is rare, and it is what people remember.',
    risk: ['H1', 'H2'],
    follow: [
      { by: 'michael', q: 'How did that get through review?',
        a: 'I approved the filter without testing joint applications, which is a gap in my review, not just the team\'s. Our test suite covered single applicants only, and I didn\'t ask about joint cases. The bankers caught it within hours, no customer saw it, and we rolled back that night. Joint cases are now in the test suite, and I\'ve added a "who is missing from the test data" check to our release review.' },
      { by: 'coach', q: 'Why message the Group Executive about a small, contained issue?',
        a: 'Because he would hear about it anyway, and it\'s far better from me, early, with the fix already in place. A contained incident told promptly builds trust; the same incident discovered second-hand looks like hiding. It also shows the controls worked: bankers caught it before customers. Telling him before his day starts means he\'s never surprised in a meeting. That\'s the promise I\'ve made to every sponsor.' },
    ],
  },
  boss_incident: {
    you: 'An AI assistant told 1,200 customers something false. Honesty, speed and ownership are scored most. This is where every habit in the game is tested at once: facts before blame, customers first, regulators told early, and a decision log that shows exactly what happened.',
    risk: ['H1'],
    follow: [
      { by: 'raj', q: 'What do we tell the regulator at ten?',
        a: 'The facts we know, what we don\'t know yet, and what we\'ve done. We know 1,200 customers were told their hardship applications were approved when they were only received. We\'ve switched off that response and we\'re contacting every affected customer today with a correction and a named person to call. We don\'t yet know the root cause; we\'ll report it within forty-eight hours. We won\'t speculate beyond the facts.' },
      { by: 'michael', q: 'Whose fault is this?',
        a: 'Accountability first: the assistant was in my portfolio, so I own the response. Blame can wait for the review, which should look at the system, not just a person. Right now the priority is the customers who were misled, then the regulator, then the root cause. I\'d like the review to be blameless and thorough, with findings shared openly, so we fix the real cause rather than finding someone to punish.' },
    ],
  },
  d21_retest_real: {
    you: 'The same question as day 3, three weeks later. Then you had an estimate and a caveat. Now you have a measured number, what is still estimated, and what you are least sure of. This is the clearest measure in the game of how far your credibility has grown.',
    risk: ['H1'],
    follow: [
      { by: 'minh_chau', q: 'What are you least sure of?',
        a: 'How the method transfers to teams without a strong coach. Every measured result so far had someone trained in the method guiding the team. If we scale to twelve teams faster than we can train coaches, I expect results closer to half the gain, possibly less. That\'s why I\'d measure each new team against its own baseline, and slow the rollout if quality drops. I\'d rather tell the board that now.' },
      { by: 'minh_chau', q: 'Would you put that in front of the board?',
        a: 'Yes, in one line. The headline stays strong: measured discovery from fourteen weeks to six on a comparable epic. Then one line on what\'s estimated and one on the main risk, coach capacity. Boards trust people who state the limits of their evidence, and it protects everyone if results vary later. Three weeks ago I learned that from you: label everything before someone else does.' },
    ],
  },
  d21_plan: {
    you: 'This is your real plan, for the real world. Thirty days: tell your line, send the message, deliver one gift. Ninety days: a measured result and one person grown. A year: evidence a panel can score. The game ends; the habits are what you take.',
    risk: ['H4', 'H5'],
    follow: [
      { by: 'coach', q: 'What is the very first step on Monday?',
        a: 'Tell my manager about the executive\'s interest, in two warm lines, before I message anyone else. Then send the first message in the executive\'s morning, around seventy words, using CUP. Everything else in the plan depends on those two steps happening in the right order and in the warm window. I\'ll block thirty minutes on Monday morning for both, so it doesn\'t wait for a perfect moment.' },
      { by: 'coach', q: 'How will you know, in a year, that it worked?',
        a: 'By evidence, not feelings. A measured result I can retell without caveats beyond the honest ones. At least one person I\'ve grown who can run the method without me. A hard conversation handled well. A sponsor who has spent capital on me, with an introduction or a room. And either a lead role, or a clear, agreed plan for one. If I can show those to a panel, it worked.' },
    ],
  },
  boss_board: {
    you: 'Everything in one room: one story, one number, the honest caveat, the controls, credit to others, and a clear ask. The board is deciding whether your method becomes the bank\'s. Speak to their decision, not your journey. Ten minutes, and you stop before they want you to.',
    risk: ['H1', 'H2', 'H6'],
    follow: [
      { by: 'michael', q: 'What could go wrong if we scale this?',
        a: 'Three things. Quality could drop if we scale faster than we can train coaches, so we\'ll measure every team against its own baseline and slow down if it slips. Controls could become the bottleneck, so Risk is part of the rollout, not a gate at the end. And AI errors could reach customers, so human review stays on every output that informs a decision. Each has an owner and a trigger to pause.' },
      { by: 'michael', q: 'Why should the board trust a design leader with this?',
        a: 'Because the method was built in regulated work and tested the hard way. It has measured results, a decision log Risk has reviewed, and a record of reporting bad news early, including two red projects and an incident. And it doesn\'t depend on me: three coaches now run it. You wouldn\'t be trusting one person; you\'d be scaling a method with evidence, controls and people already behind it.' },
    ],
  },
};
