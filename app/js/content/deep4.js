// Deep layer, days 12-15. See deep1.js for the shape.

export const DEEP4 = {
  d12_expect: {
    you: 'New managers fail most often by guessing what their boss wants. You are a researcher: treat {khai.s} as your first user in the new role. Asking for thirty minutes to agree ninety-day expectations, with a draft he can tear up, is the habit that keeps a sponsor turned manager on your side.',
    risk: ['H2'],
    follow: [
      { by: 'anh_khai', q: 'What do you think success looks like?',
        a: 'My draft has three parts. Delivery: the lending portfolio hits the dates we\'ve agreed, with the method measured against a baseline. People: the designers I lead can run the method without me, and I\'ve had at least one hard conversation well. Relationships: {sarah.s}\'s team and Risk trust our work enough to ask for more. I\'d like you to tell me what\'s missing and what matters most to you.' },
      { by: 'anh_khai', q: 'How often do you want to meet?',
        a: 'Whatever suits you, but I\'d suggest thirty minutes every two weeks for the first ninety days, plus a three-line update every Friday so you never need to chase me. If something is going wrong, you\'ll hear it the same day, not at our next one-on-one. And I\'d value one honest piece of feedback from you each month, since that\'s how I\'ll get better fastest in a new role.' },
    ],
  },
  d12_tour: {
    you: 'Your first one-on-one as a formal manager. Your coaching instincts are strong; the shift is listening without fixing. {dat.s} is proud and quietly struggling. A listening tour that asks about his goals and what gets in his way builds the trust you will need for the hard conversation later.',
    risk: ['H6'],
    follow: [
      { by: 'dat', q: 'What do you expect from me?',
        a: 'Good work, honesty about problems early, and that you tell me what you need to grow. I\'d like us to agree two or three goals together in the next couple of weeks, based on what you want, not just what the project needs. I\'ll give you feedback regularly, good and hard, and I\'d like you to do the same for me. I\'m new at this too, so tell me when I get it wrong.' },
      { by: 'coach', q: 'Why ask questions instead of setting the agenda?',
        a: 'Because the first one-on-one tells him what kind of manager I am. If I talk most of the time, he learns this is a place for instructions. If I ask about his goals, what he enjoys and what gets in his way, he learns it is his time. I also learn things a project plan never shows, like what motivates him and what might be going on outside work. That is the information a manager actually needs.' },
    ],
  },
  d12_vy: {
    you: 'You can see the answer in ten seconds, and that is exactly the trap. Your dossier says you are a great teacher; managers grow people by asking. Two or three questions, and no answers, turns {vy.s} into someone who can solve the next one without you.',
    risk: ['H6'],
    follow: [
      { by: 'vy', q: 'Can\'t you just tell me which one is right?',
        a: 'I could give you my opinion, but then you\'d be designing for me rather than for the banker. And honestly, you know this flow better than I do now. Tell me which you\'d pick if I weren\'t here, and why. If we disagree, we\'ll test both with one PO. What I really want is for you to trust your own judgement, because in three months you\'ll be making these calls without me.' },
      { by: 'coach', q: 'When is it right to just give the answer?',
        a: 'When the stakes are high and time is short, or when the person is completely new and has nothing to reason from. A production incident is not a coaching moment. But a design choice with a day to spare is exactly where learning happens. My rule is: if they can probably get there with a question or two, I ask. If they can\'t, I explain my reasoning, not just my answer, so next time they can.' },
    ],
  },
  d12_delegate: {
    you: 'Fixing it yourself in forty minutes is the habit that kept you a brilliant individual contributor. Writing three clear comments and offering fifteen minutes in the morning is slower tonight and faster for the next year. This is the manager trade-off in its purest form.',
    risk: ['H6'],
    follow: [
      { by: 'vy', q: 'Sorry, I should have done better. Should I stay late to fix it?',
        a: 'No need to stay late, and no need to apologise: seventy percent is a solid draft. I\'ve sent you three specific comments; they should take about an hour. Go home, rest, and let\'s meet at eight thirty to go through them together before the review. If something doesn\'t make sense, that\'s my fault for explaining badly, not yours. I\'d rather you present your own work tomorrow than mine.' },
      { by: 'coach', q: 'What if the review goes badly because you didn\'t fix it?',
        a: 'Then it goes slightly worse than it could have, and {vy.s} learns far more than if I had rescued it. I\'d prepare her so the risk is small: specific comments tonight, fifteen minutes in the morning, and I\'d be in the room to support her. If a stakeholder raises something we missed, I\'d own it with her. A slightly imperfect review she leads is better than a perfect one she watches.' },
    ],
  },
  d12_standard: {
    you: 'Influence without authority is most of a lead\'s job. You built the quality gate; now you need five teams who report to other people to adopt it. Leading with what it gives {lan.s}\'s leads, and inviting them to cut parts of it, is how standards spread without a mandate.',
    risk: ['H3'],
    follow: [
      { by: 'chi_lan', q: 'And if my leads think it\'s just more process?',
        a: 'Then I want to hear exactly which parts feel like process, and we\'ll cut them. The gate has six checks; maybe four matter for their work. The point isn\'t compliance, it\'s that AI-generated work gets reviewed where it\'s riskiest, so designers spend time on judgement rather than rework. If two of your leads try it on one feature and say it slowed them down, I\'ll take that back and change it.' },
      { by: 'chi_lan', q: 'Who owns the standard?',
        a: 'I\'d suggest the chapter owns it, with you as the sponsor, and I maintain it. It came out of the chapter\'s work, and it should be the chapter\'s standard, not mine or Client Platforms\'s. If your leads change it, the change goes in with their names. That way it becomes something the chapter is proud of, rather than something imposed from outside. I\'d value you presenting it at the next design forum.' },
    ],
  },
  d12_mentor: {
    you: '{khai.s} wants evidence that you grow people. You have mentored more than fifty people informally; structured mentoring with a written goal and a three-month review turns that generosity into evidence a panel can see. Keep the offer light, specific and easy to decline.',
    risk: ['H6'],
    follow: [
      { by: 'vy', q: 'What kind of goal do you mean?',
        a: 'Something you care about that would make your work better in three months. For example, presenting to POs with confidence, or leading a stakeholder workshop on your own, or getting faster at the method. You choose it. We\'d write it in a sentence, agree what good looks like, and check in once a month. After three months we look back honestly. If it isn\'t helping, we stop, no hard feelings.' },
      { by: 'coach', q: 'Why make mentoring so structured?',
        a: 'Because structure makes progress visible, to her and to anyone assessing my leadership. Informal help is kind, but it leaves no trace and often drifts. A written goal, monthly check-ins and a review give her a sense of momentum and give me evidence of developing others, which my dossier says is the gap. It also respects her time: she knows exactly what she\'s signing up for.' },
    ],
  },
  d12_report45: {
    you: 'You promised a forty-five day report, and one of the two things is not done yet. Reporting honestly on the gap, with a date, is stronger than waiting until both are complete. This is the reliability habit applied to your own development.',
    risk: ['H1'],
    follow: [
      { by: 'anh_khai', q: 'Why hasn\'t the feedback conversation happened yet?',
        a: 'Honestly, I delayed it a week to collect specific examples, and I was nervous about getting it right. I now have two clear examples from the last fortnight, and it\'s booked for Monday morning. I\'ve prepared it using SBI and I\'ll ask for his view first. I\'ll tell you how it went in my Friday update. I know delaying hard conversations is a habit I need to break as a manager.' },
      { by: 'anh_khai', q: 'What has {vy.s} learned?',
        a: 'Mostly confidence. Six weeks ago she froze when a PO challenged her. Last week she presented the lending flow herself, handled two tough questions, and only looked at me once. Our weekly coaching focused on preparing for the hardest question rather than the whole presentation. Her next goal is running a stakeholder workshop alone. I\'d love you to see her present at the next review.' },
    ],
  },
  d13_sbi_sort: {
    you: 'Feedback that labels people ("careless", "not committed") damages trust; feedback that describes behaviour builds it. Sorting lines into Situation, Behaviour, Impact and "not feedback" trains you to hear the difference before you say something you cannot take back.',
    risk: [],
    follow: [
      { by: 'coach', q: 'Why is "you seem distracted lately" not feedback?',
        a: 'Because it is a judgement about his state of mind, not a description of something he did. He can argue with it, feel accused, and still not know what to change. "In Tuesday\'s handoff, the error states for three fields weren\'t in the file" is a fact he can check and act on. Feedback should describe what a camera would have seen, then the impact, then ask for his view.' },
      { by: 'coach', q: 'Why ask for his view after the impact?',
        a: 'Because I don\'t know the whole story. There may be a reason I can\'t see: unclear requirements, too much work, something at home. Asking for his view turns a verdict into a conversation and lets him keep his dignity. It also tells me whether this is a skill problem, a workload problem or a personal one, and each needs a different response from me as his manager.' },
    ],
  },
  d13_sbi: {
    you: 'Your dossier names performance conversations as the decisive gap for a manager role. This is the first one. Your warmth is a strength; the risk is softening it until the point disappears. Open with why you are raising it, describe the behaviour precisely, name the impact, then ask.',
    risk: ['H6'],
    follow: [
      { by: 'dat', q: 'I\'m sorry. It won\'t happen again.',
        a: 'Thank you, I appreciate that. I\'m not looking for an apology though; I\'d like to understand what happened so we can make it easy to get right. Was it the handoff checklist, the deadline, or something else? It\'s not like you, which is why I wanted to ask. Whatever it is, let\'s fix the cause together. And if anything is making work harder at the moment, I\'d like to know.' },
      { by: 'dat', q: 'I\'ve had a lot going on at home.',
        a: 'Thank you for telling me; I\'m sorry it\'s been hard. You don\'t need to share details. Let\'s look at what would help: we could lighten your load for a few weeks, move a deadline, or I can pair someone with you on handoffs. And there\'s confidential support through the employee programme if that would be useful. The handoff still matters, so let\'s find a way that works for you right now.' },
    ],
  },
  d13_receive: {
    you: 'This is your own feedback, said aloud by your sponsor: you explain too much before the point. The test is not whether it stings; it is whether you can thank him, ask for one example, and commit to a change with a date. Receiving feedback well is a leadership signal.',
    risk: ['H2'],
    follow: [
      { by: 'anh_khai', q: 'You\'re not going to defend yourself?',
        a: 'No, because you\'re right, and I\'ve heard it before from a peer. I think it comes from wanting to be complete. I\'d rather fix it than explain it. I\'m going to start every update with the headline in one sentence and then stop, and let people ask for more. Would you be willing to tell me in a month whether you\'ve noticed a difference? That would really help.' },
      { by: 'coach', q: 'Why ask for an example instead of agreeing straight away?',
        a: 'Because a specific example tells me exactly what to change, and it shows I\'m taking the feedback seriously rather than nodding politely. "In Tuesday\'s meeting you spent two minutes on background before the decision" is something I can practise. Agreeing immediately can sound like I just want the conversation to end. Asking for one example, then thanking him, shows I want to learn.' },
    ],
  },
  d13_prep: {
    you: 'An unplanned "say a few words" is where your compression work shows. PREP, point, reason, example, point, gives you a shape in five seconds. Crediting {vy.s} by name in front of forty people is visibility for her and a leadership signal for you.',
    risk: ['H2', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Thank you. What was the hardest part of the pilot?',
        a: 'Honestly, getting data access approved. The method worked faster than the organisation around it, so Risk approval became the bottleneck. We learned to start access requests in week zero, and {raj.s}\'s team now has a template for it. It\'s a good example of where the bottleneck moves when design gets faster: to decisions and controls. That\'s the next thing worth solving.' },
      { by: 'coach', q: 'Why name {vy.s} in front of everyone?',
        a: 'Because specific public credit is the cheapest and most powerful thing a leader can give. It costs me a few words and gives her visibility she couldn\'t get on her own. It also tells forty people that I build people up, which is exactly the evidence my dossier says I need. And it\'s true: she ran those sessions. Leaders who share credit find that more of it comes back to them.' },
    ],
  },
  d13_hire: {
    you: 'Hiring is the manager skill you have least evidence for. Candidate A is like you: Singapore-trained, charming, AI-brilliant. Similarity bias is the trap. Scoring both against the same questions before deciding is what fair, evidence-based hiring looks like, and {ha.s} will notice.',
    risk: [],
    follow: [
      { by: 'ha', q: 'Some panellists preferred A. How do you respond?',
        a: 'I understand why: A was engaging and the prototype was impressive. But we agreed the five questions in advance because they predict success in the role, and on those B was stronger on four of five, with specific examples. A\'s prototype is one data point. I\'d also flag that A shares my background, so I want to be careful I\'m not favouring someone like me. I\'d recommend B, and offer A feedback.' },
      { by: 'coach', q: 'How do you notice your own bias in the moment?',
        a: 'I ask myself what I liked before I ask what they showed. If the answer is "they reminded me of me", that is a warning. Charm, a shared school or a similar career path make interviews feel easy, which is not the same as evidence. Scoring each answer against the same criteria, before discussing, forces me to compare evidence. Then I check whether my overall feeling matches the scores.' },
    ],
  },
  d13_candor: {
    you: 'Kim Scott\'s quadrants matter for someone as warm as you: the most common new-manager failure is ruinous empathy, caring so much you never say the hard thing. Sorting real manager lines teaches you to care personally and challenge directly in the same sentence.',
    risk: ['H6'],
    follow: [
      { by: 'coach', q: 'Which quadrant are you most likely to fall into?',
        a: 'Ruinous empathy. I care about people and I dislike conflict, so my risk is softening feedback until it is useless, or delaying it. My forty-five day report already showed that: I postponed the conversation with {dat.s}. The fix is to remember that withholding feedback is not kind; it lets someone fail without knowing why. Caring personally means saying the hard thing, clearly and soon.' },
      { by: 'coach', q: 'What does radical candour sound like for you?',
        a: 'Something like: "I want to raise this because I think you can do much better work, and I want you to get the credit for it. In Tuesday\'s handoff, the error states were missing, and engineering lost two days. What happened?" It starts with genuine care, describes the behaviour precisely, names the impact, and invites his view. Warm and direct at the same time.' },
    ],
  },
  d14_star_order: {
    you: 'Panels score stories, not claims. Your stories tend to begin with context and arrive late at what you did. Practising STAR order, situation and task briefly, action in detail, result with a number, makes your strongest evidence land in the minutes a panel actually listens.',
    risk: ['H2', 'H6'],
    follow: [
      { by: 'coach', q: 'Which part of STAR do you usually over-explain?',
        a: 'The situation. I like people to understand the full context, so I spend a minute on background before getting to what I did. Panels score the action and the result, so that minute costs me. My rule now: situation and task in two sentences, action with "I" statements and specific choices, then the result with a number and what I learned. The context can come out in follow-up questions.' },
      { by: 'coach', q: 'Why say "I" when it was a team effort?',
        a: 'Because the panel is assessing me, not the team. If I only say "we", they can\'t tell what I did, and my quiet-backbone habit makes that worse. I can credit the team clearly and still describe my own decisions: "I decided to", "I set the goal", "I had the conversation". That isn\'t arrogance; it\'s giving the panel the evidence they need to score me fairly.' },
    ],
  },
  d14_star: {
    you: 'This story is your strongest manager evidence: you grew {vy.s} from freezing in reviews to presenting alone. Ninety seconds, ownership language, a clear result. It answers the gap your dossier names directly: you develop others, with structure and evidence.',
    risk: ['H6', 'H2'],
    follow: [
      { by: 'chi_lan', q: 'What would you do differently?',
        a: 'I\'d step back sooner. For the first two reviews I answered questions for her when she hesitated, because I wanted it to go well. I realised that taught her I would rescue her. From the third review I agreed with her in advance that I would stay silent unless she asked for help. She handled it. Next time I\'ll agree that rule from the start, and trust people earlier.' },
      { by: 'ha', q: 'How do you know it was your coaching and not her own growth?',
        a: 'I can\'t separate them completely, and I wouldn\'t want to take credit for her effort. What I can show is what changed when the coaching changed: she froze in two reviews where I rescued her, and presented confidently once we prepared the hardest question together and I stepped back. She also told me which parts helped. I\'d say I created the conditions; she did the growing.' },
    ],
  },
  d14_presence: {
    you: 'Your peers call you the quiet backbone. Presence is not volume; it is a few visible habits: speaking early in meetings, stating a view before asking questions, and ending with a clear recommendation. Picking the three that raise presence most gives you a short list to practise before the panel.',
    risk: ['H6'],
    follow: [
      { by: 'coach', q: 'Which habit is hardest for you, and why?',
        a: 'Stating a view before asking for others\'. My instinct is to gather everyone\'s input first, which comes from research and from wanting to be fair. But in senior meetings it can read as having no point of view. I\'m practising saying "My recommendation is X, for two reasons; what am I missing?" It still invites input, but it shows I\'ve done the thinking and I\'m willing to own a position.' },
      { by: 'coach', q: 'Doesn\'t speaking early risk sounding pushy?',
        a: 'Not if it\'s short and useful. Speaking in the first ten minutes, even one sentence that frames the problem or asks a sharp question, establishes that I\'m a participant rather than an observer. Quiet people often wait until they have a perfect contribution, and by then the meeting has moved on. One early sentence, then active listening, is presence without pushiness.' },
    ],
  },
  boss_panel: {
    you: 'The panel scores evidence and ownership on every answer. Your evidence is now stronger than three weeks ago: a measured pilot, someone you grew, a hard conversation, a fair hiring call. Use "I", give numbers, name a lesson in each story, and answer "why haven\'t you been promoted" with S5.',
    risk: ['H6', 'H2'],
    follow: [
      { by: 'ha', q: 'Tell us about a decision you got wrong.',
        a: 'In the lending pilot I started the data-access request a week late, because I underestimated how long Risk reviews take. It cost us about two weeks. I told our sponsor nine days before the steering committee, owned the late start, and re-sequenced the work onto synthetic data. Since then I start access requests in week zero and check privacy needs with Risk before scoping. It\'s now in the pilot playbook.' },
      { by: 'antoine', q: 'How would your team describe you in a year?',
        a: 'I hope they\'d say I was clear about what good looks like, honest with them early, and that they grew. Specifically, I\'d like each of them to say they can do something they couldn\'t before, and that they got credit for their work. I\'d also want them to say I told them hard things kindly. I\'ll ask them directly at six months, because my own view of my leadership won\'t be enough.' },
    ],
  },
  d15_rumour: {
    you: 'Being close to a sponsor makes you a target for rumour questions. Risk H9: once you speculate, you become "his person" who leaks. A friendly no, and a turn back to the other person\'s world, protects your sponsor, your peer relationship and your reputation for discretion.',
    risk: ['H9'],
    follow: [
      { by: 'bao', q: 'Come on, you must know something.',
        a: 'Honestly, I don\'t, and even if I heard something I wouldn\'t be the right person to pass it on. If there\'s a real change, it\'ll come properly and I\'m sure your team will hear early. I\'d rather not add to the noise. Anyway, tell me about the launch: is the new onboarding flow still going live next week? I heard your team solved the upload problem.' },
      { by: 'coach', q: 'Why does discretion matter so much more now?',
        a: 'Because proximity to power changes how my words travel. Before, a guess from me was just a guess. Now people assume I know things, so anything I say becomes "someone close to {khai.s} said". One leak, even a harmless one, tells my sponsor I can\'t be trusted with sensitive information, and he\'ll stop sharing. Discretion is the intimacy part of the trust equation.' },
    ],
  },
  d15_warn: {
    you: 'Second-hand judgements about people are how reputations spread unfairly. Thanking {bao.s}, keeping it to yourself, and forming your own view of {raj.s} is both fair and wise. You will need {raj.s}\'s trust for everything AI touches in a regulated bank.',
    risk: ['H9'],
    follow: [
      { by: 'bao', q: 'You don\'t believe me?',
        a: 'I believe your project had a hard time with him, and I\'m sorry it got killed. I just want to form my own view from working with him, because I need Risk on side for everything we do with AI. If I go in expecting a fight, I\'ll probably get one. If I see the same pattern you did, I\'ll remember your warning. Thank you for looking out for me, genuinely.' },
      { by: 'coach', q: 'How do you form your own view of someone like {raj.s}?',
        a: 'By working with him directly on something real, and watching what he does rather than what people say. I\'d pre-wire him before meetings, ask what he would need to be comfortable, and see how he responds. Most "political" reputations come from people who surprised Risk in public. If I involve him early and respect his concerns, I\'ll learn whether he\'s an obstacle or a careful ally.' },
    ],
  },
  d15_bridge: {
    you: 'Two of your sponsors disagree, and one wants you to carry a message. Taking sides would cost you the other. Giving both the same facts, and helping them talk directly, is what senior people do: a bridge, not a messenger.',
    risk: ['H3', 'H9'],
    follow: [
      { by: 'chi_lan', q: 'So you won\'t tell him it can\'t scale?',
        a: 'I\'ll tell him the facts, the same ones I\'m telling you. The pilot worked because of a decision log and a weekly Ops partner; twelve teams would need twelve of each, plus trained coaches, which we don\'t have yet. I think you two would find a good middle path faster if you talked directly. I\'d be glad to join and bring the numbers. I don\'t want to carry either view on someone\'s behalf.' },
      { by: 'anh_khai', q: 'What\'s your honest view on twelve teams?',
        a: 'Possible, but not next quarter without risk to quality. The pilot depended on two things: a decision log on every session, and a weekly partner from Operations. Twelve teams would need trained coaches for both, and today we have three people who can coach the method. I\'d suggest four teams next quarter while we train coaches, then the rest. {lan.s} has thought hard about quality; I\'d really value you two discussing it.' },
    ],
  },
  d15_discretion: {
    you: '"Between us" from a sponsor is a trust test that looks like intimacy. Sharing gossip about your old team would make you useful today and untrusted tomorrow. Redirecting kindly to {ethan.s}, who owns that information, protects everyone, including {khai.s}.',
    risk: ['H9', 'H3'],
    follow: [
      { by: 'anh_khai', q: 'I\'m only asking because I\'m worried about them.',
        a: 'I understand, anh, and I think that care would mean a lot to them. I just don\'t think I\'m the right source: I\'ve been out of the team for a while and anything I said would be partial. {ethan.s} has the real picture and would value hearing that you\'re concerned. If it helps, I could suggest the two of you have a coffee. I\'d be glad to set that up.' },
      { by: 'coach', q: 'Doesn\'t refusing a sponsor\'s question risk the relationship?',
        a: 'Briefly, perhaps, but it strengthens it over time. If I share gossip about my old team, he learns that I share things told in confidence, and he will wonder what I say about him. Declining kindly, with a better route, shows the discretion he needs from someone he might trust with sensitive work. Most senior people test this at some point. The answer they respect is a warm no.' },
    ],
  },
  d15_loyal: {
    you: 'When the Group Executive criticises your sponsor, loyalty means neither silence nor a speech. One factual line, at a natural moment, and a private note of support afterwards. This is how sponsorship becomes mutual: you make your own executive look good when it counts.',
    risk: ['H9'],
    follow: [
      { by: 'michael', q: 'One pilot doesn\'t make a trend.',
        a: 'Agreed, it\'s one data point, which is why we measured it carefully: fourteen weeks to six on comparable lending epics, with fewer review rounds. The next step is four more teams next quarter with the same measures, so we\'ll know whether it holds. I\'d be glad to send you the one-page evidence, and anh {khai.s} could share the rollout plan. I\'d rather we earn a trend than claim one.' },
      { by: 'anh_khai', q: 'Thanks for that. Was it too much?',
        a: 'I hope not, anh; I tried to keep it to one fact at a natural moment. I didn\'t want to argue with him on your behalf, just make sure the numbers were in the room. I\'ve put the one-page evidence together in case it helps you follow up with him directly. And I think his request to see a win up close is an opening: we could show him the lending pilot live next visit.' },
    ],
  },
  d15_prewire: {
    you: 'Pre-wiring {raj.s} before a steering committee is how you avoid surprising Risk in public, the most common way AI proposals die. You know the controls; showing them to him first, and asking what would make him comfortable, turns the Risk Guardian into a co-author.',
    risk: ['H3'],
    follow: [
      { by: 'raj', q: 'Why are you showing me before the committee?',
        a: 'Because you shouldn\'t hear about an AI tool on real lending applications for the first time in a meeting, and because your concerns will make the proposal better. If there\'s something that would stop you supporting it, I\'d rather fix it now than argue it on Tuesday. If you need more time than Tuesday allows, I\'ll move it to the next committee. What would you need to be comfortable?' },
      { by: 'raj', q: 'I\'d need to see a privacy assessment and a rollback plan.',
        a: 'That\'s fair, and both are reasonable. I\'ll have the privacy assessment drafted with your team\'s template by Monday, and a rollback plan that switches the summariser off within an hour with no data retained. If those aren\'t ready and reviewed by Tuesday, I\'ll present it as an option for the next committee instead of a decision. Would you be willing to review both with me on Monday afternoon?' },
    ],
  },
  d15_retest: {
    you: 'A retest of your very first skill, three weeks on, to a more senior person. Compare it with your day 1 message: is it shorter, more specific, more about him? This is how you see your own growth, and how the game checks it was real.',
    risk: ['H2', 'H5'],
    follow: [
      { by: 'michael', q: 'Happy to. What will I actually see?',
        a: 'A fifteen-minute live walkthrough of the lending pilot: the running prototype the bankers used, the decision log showing how each choice traces to a stakeholder, and the measured result, discovery in six weeks against fourteen on a comparable epic. {vy.s}, who led part of it, would show the prototype. Anh {khai.s} will join. We\'ll keep it to fifteen minutes and leave time for your questions.' },
      { by: 'coach', q: 'What changed between your day 1 message and this one?',
        a: 'It\'s shorter, it carries a measured number instead of an estimate, and it makes my sponsor the host rather than me. On day one I had to earn a coffee with a hint and a prototype. Now I can offer evidence and credit others in the same breath. The shape is still CUP: context from the call, something he wants, and a small proposal on his terms. That shape has become a habit.' },
    ],
  },
};
