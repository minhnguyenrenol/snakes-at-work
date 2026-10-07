// Deep layer, days 6-8. See deep1.js for the shape.

export const DEEP2 = {
  d6_session: {
    you: 'Your teaching is one of your strongest signals: an award for uplifting team capability, Skills Guild workshops, chapter sessions. This is the first time it serves {khai.s}\'s network directly. Opening with the bankers\' pain, not the method, is how a capability session becomes a business result.',
    risk: ['H6'],
    follow: [
      { by: 'sarah', q: 'Right, but will this actually work with my POs in Melbourne?',
        a: 'I think so, and I\'d rather prove it than promise it. The method doesn\'t depend on location; it depends on a PO who wants to go fast and a team willing to keep a decision log. Your POs already know where the re-keying hurts, which is the hardest part. I\'d suggest one epic, six weeks, measured against a similar epic from last year. If it doesn\'t work for your bankers, you\'ll hear that from me first.' },
      { by: 'sarah', q: 'What do you need from my team?',
        a: 'Three things, kept small. One product owner who is keen to try it on their next epic. About two hours a week of their time for the first fortnight, mostly reviewing prototypes and decision logs. And access to two or three bankers for short feedback sessions, so the prototypes test against real work. My side covers the method, the coaching and the quality checks. We\'d send you a three-line update every Friday.' },
    ],
  },
  d6_lift: {
    you: 'A lift with your sponsor and the Group Executive is where your thirty-second version earns its keep. The skill is making your own executive look good: credit him, give one story with one number, and stop. Your instinct to explain more is the thing to hold back here.',
    risk: ['H2', 'H6'],
    follow: [
      { by: 'michael', q: 'And what does that mean for the bank?',
        a: 'Faster delivery we can actually audit. On Lantern one designer delivered in about two months what the team estimated at about a year, and every decision traces back to who asked for it. That combination matters in a bank: speed usually costs control, and this keeps both. Anh {khai.s} has been pushing for exactly this in Vietnam; we\'re now testing whether it scales with a lending team in Melbourne.' },
      { by: 'michael', q: 'Is that a Vietnam thing, or could any hub do it?',
        a: 'Any hub could, but Vietnam is ahead right now, which I think is anh {khai.s}\'s point. Our teams adopted the tools early and, more importantly, built habits around them: decision logs, review gates, shared playbooks. The tools are the same everywhere. The habits are what take time, and that is the part we can now teach. Melbourne\'s lending team is the first test of whether it travels.' },
    ],
  },
  d6_bao: {
    you: 'Risk H9 again, and a manager test in disguise. {bao.s} is talented and feels outshone. Leaders turn rivals into co-authors; individual contributors defend their turf. Inviting him in, with specific credit for his work, is practice for the team you want to lead.',
    risk: ['H9'],
    follow: [
      { by: 'bao', q: 'Why would you want me involved?',
        a: 'Because the method is better with you in it. Your component library solves a problem I keep hitting: the prototypes are fast, but they drift from the design system. If you took that half of the session, the method would produce work that\'s both quick and consistent. And honestly, it shouldn\'t be one person\'s thing. If it\'s going to spread, it needs more than one face, and you\'re the obvious second.' },
      { by: 'bao', q: 'Will I get credit, or will it be your session again?',
        a: 'You\'ll get credit, by name, in the session and in the report afterwards. We\'d co-present, and the component part would be yours to lead. I\'ll make sure anh {khai.s} and {lan.s} hear about your contribution directly, not just as "the team". If it helps, let\'s agree now how we split it and how we write it up. I would rather we both look good than either of us look like the AI person.' },
    ],
  },
  d6_invite: {
    you: 'Specific credit is the cheapest trust there is, and it is exactly the visibility habit your dossier says you underuse for others as well as yourself. Fifty words that name {bao.s}\'s work precisely will do more for your reputation as a future lead than another session of your own.',
    risk: ['H9'],
    follow: [
      { by: 'bao', q: 'Sure. What would you want me to cover?',
        a: 'The half where the method meets the design system. You\'d show how the component library keeps AI-generated prototypes consistent: which components to use, how we name them, and how the review catches drift. Maybe twenty minutes plus questions. I\'ll cover the decision logs and the quality gate. Let\'s plan it over coffee Thursday; I\'ll bring the session outline and you can change anything that doesn\'t fit.' },
      { by: 'coach', q: 'Why make the invitation so specific?',
        a: 'Because vague praise sounds like politeness and specific praise sounds like respect. "Your component library would make the method twice as useful" shows I understand his work and value it for a real reason. It also makes saying yes easy: he knows exactly what his role is. A vague invitation, like "want to help sometime?", leaves him guessing whether he would be a co-author or an assistant.' },
    ],
  },
  d6_report: {
    you: 'Reporting back closes the loop on the gift and proves reliability. Your instinct may be to share the whole story; three lines with numbers and one quote land better. Thanking {khai.s} for the connection makes the success partly his, which is what a sponsor wants to retell.',
    risk: ['H2'],
    follow: [
      { by: 'anh_khai', q: 'Great result. What\'s next?',
        a: 'Two lending teams want to pilot the method on their next epic, so the natural next step is a six-week pilot on one of them, measured against last year\'s comparable epic. I\'m drafting a one-pager now and I\'ll share it with {ethan.s} first, since it touches my time. If you\'d find it useful, I can send you the one-pager next week. The ask would be small: confirm the epic and a keen product owner.' },
      { by: 'coach', q: 'Why include {sarah.s}\'s quote?',
        a: 'Because a third-party quote is evidence he can retell without checking. "First offshore session my POs didn\'t multitask through" is vivid, specific and comes from a senior Melbourne stakeholder, which is exactly the voice he needs for his Vietnam story. My own description of the session would sound like self-promotion. Her words do the persuading for me, in one line.' },
    ],
  },
  d6_townhall: {
    you: 'Town hall questions are visibility with a microphone. Your peers describe you as working behind the scenes; one good public question, framed around his thesis, makes you visible as someone who thinks at his level. Ask about his agenda, never your own.',
    risk: ['H6'],
    follow: [
      { by: 'anh_khai', q: 'Good question. What would you say?',
        a: 'From where I sit, the practice I\'d most want Australia to adopt is the decision log. We record every session and turn it into a log of who decided what and why, the same day. It sounds small, but it\'s what makes fast AI-assisted work safe enough to sign off. Speed is easy to copy; the habits that keep it auditable are what Vietnam teams have built, and they travel well.' },
      { by: 'coach', q: 'How do you ask a question that shows judgement in public?',
        a: 'Keep it short, about his agenda, and genuinely open. I build it on something he has already said, like Vietnam moving faster on AI, and ask him to go one level deeper: what should travel, what is the risk, where does the bottleneck move. I don\'t add my own speech before the question. A thoughtful question in thirty words shows more judgement than a two-minute comment.' },
    ],
  },
  d6_pantry: {
    you: 'Reading the room is a leadership skill, and this scene tests restraint. You will want to be useful; sometimes the most useful thing is to leave someone alone. Executives notice people who do not add to their load on a bad day.',
    risk: [],
    follow: [
      { by: 'coach', q: 'He clearly saw you. Shouldn\'t you say something?',
        a: 'A nod and a small smile is saying something: I see you, and I\'m not going to add to your day. If he wants to talk, he will start it. Raising my news or asking about his call would make the moment about me. Later, if it turns out something big happened, I might send one short, kind line, but only if I can genuinely help. Space is a gift people remember.' },
      { by: 'anh_khai', q: 'Sorry, rough morning. How are things with you?',
        a: 'All good on my side, thank you, anh. Nothing that needs you today. I hope the rest of your morning is kinder. If anything comes up where a prototype or a quick analysis would help, just let me know; happy to turn something around quickly. Otherwise I\'ll share the pilot one-pager next week as planned. Good luck with it.' },
    ],
  },
  d6_pitch: {
    you: '{sarah.s} wants plain English and banker outcomes. Your pitch tends to start with the method; this practice starts with what her bankers will feel. Less re-keying, faster answers, traceable for Risk, results in six weeks. That translation is what makes you sound like a delivery lead rather than a designer.',
    risk: ['H2', 'H6'],
    follow: [
      { by: 'sarah', q: 'And if it doesn\'t work?',
        a: 'Then we\'ll know in six weeks, cheaply, and I\'ll tell you straight. The pilot is designed to fail small: one epic, one PO, measured against last year. If the numbers don\'t move, we stop and you\'ve lost a few hours of PO time. If they move a bit, we adjust. If they move a lot, we talk about scaling. Either way, you\'ll get the real numbers, not a story.' },
      { by: 'sarah', q: 'How is this different from the last offshore AI promise?',
        a: 'It starts with your bankers\' problem, not our tool, and it\'s measured. We\'re not promising a platform; we\'re offering to design one workflow so they type customer data once instead of three times, with every step traceable for Risk. Six weeks, one epic, a baseline from last year. If I can\'t show you a number, I won\'t ask for a second project. That\'s the difference.' },
    ],
  },
  d7_label: {
    you: 'This is H1 again, and {chau.s} is the person who will find it. Your numbers are strong, and some of them are estimates. Labelling every claim before you present turns a sceptic\'s attack into a confirmation of your honesty.',
    risk: ['H1'],
    follow: [
      { by: 'minh_chau', q: 'So which of these numbers would you bet your job on?',
        a: 'The measured ones: workflow friction down sixty-seven percent and fulfilment from about a day to about five minutes, because both have before-and-after data. The Lantern timeline is an estimate: one designer in about two months against a team estimate of about a year. I\'d stand behind the direction, not the exact ratio. That\'s why I\'ve labelled it, and why I\'m proposing a pilot with a proper baseline.' },
      { by: 'coach', q: 'Doesn\'t labelling estimates weaken your story?',
        a: 'It weakens the headline slightly and strengthens everything else. A sceptic who finds an unlabelled estimate discounts all my numbers, including the measured ones. If I label it first, she has nothing to catch, and my measured numbers carry their full weight. Senior people retell numbers they trust. I want my figures to be the ones nobody needs to double-check.' },
    ],
  },
  d7_headline: {
    you: 'A headline that survives a data sceptic is a skill your executive communication score needs. You know the evidence deeply; the work is choosing words that are true at their weakest point. "About", "estimate" and the source in brackets cost three words and save the room.',
    risk: ['H1', 'H2'],
    follow: [
      { by: 'minh_chau', q: 'Why not just say six times faster?',
        a: 'Because six times implies a measured ratio, and we don\'t have one. We have one designer\'s actual timeline and a team\'s informal estimate of the alternative. "About two months versus about a year" says exactly that and still lands. If someone repeats "six times" in a bigger room and gets challenged, the whole story collapses. I\'d rather have a smaller claim nobody can knock down.' },
      { by: 'anh_khai', q: 'Will this headline still impress the Group Executive?',
        a: 'I think it impresses more, because it survives his questions. Two months against about a year is still a striking difference, and the careful wording signals the team understands evidence. If he asks "is it real?", you can say yes, here is what is measured and here is the pilot that will measure the rest. A bold claim that wobbles costs you credibility; a careful one builds it.' },
    ],
  },
  d7_challenge: {
    you: '{raj.s} will challenge AI in a regulated workflow, and your audit trail is the strongest answer in the building. Agreeing with the worry first, then showing the control, then inviting him to test it, is how you turn the Risk Guardian into an ally. You know the controls; say them calmly.',
    risk: ['H1'],
    follow: [
      { by: 'raj', q: 'And who signs off when the AI is wrong?',
        a: 'A named person, every time. AI drafts; people decide. Each requirement in the decision log shows the source session, the reviewer and the sign-off, so if an AI draft was wrong, we can see exactly who caught it or who missed it. We also track where AI drafts needed correction, so we know which tasks need more checking. I\'d welcome Risk reviewing that log on a feature you know well.' },
      { by: 'raj', q: 'What data goes into the prompts?',
        a: 'No customer data, ever. Prompts use anonymised session transcripts, the regulation text, and synthetic examples. The tools are the bank-approved ones, and the decision log records which inputs were used for each output. If your team has a stricter standard for this workflow, I\'d rather adopt it now than discover it later. I could send you the data-handling section of our playbook today for review.' },
    ],
  },
  d7_idk: {
    you: '"I don\'t know yet; I\'ll confirm by Thursday" is the hardest sentence for a thorough person to say in public, and the most trusted. Guessing a number would be H1 in the worst possible room. A specific deadline turns not knowing into reliability.',
    risk: ['H1'],
    follow: [
      { by: 'anh_khai', q: 'You don\'t know your own defect rate?',
        a: 'Not the post-handoff rate yet, anh, and I\'d rather tell you that than guess. We tracked review rounds and rework during design, which dropped noticeably, but defects after handoff sit with engineering and I haven\'t pulled their data. I\'ll get it from {chau.s}\'s team and send you the figure by Thursday. If it turns out to be weak, you\'ll hear that too, along with what we\'re changing.' },
      { by: 'coach', q: 'Why give a specific day instead of "soon"?',
        a: '"Soon" is a feeling; "Thursday" is a promise someone can check. A specific day shows I understand what it takes to get the number and that I will own the follow-up. It also turns a moment of weakness into a reliability test I can pass. When I send it on Wednesday, the room remembers that I said I didn\'t know and then delivered early. That is better than a guess.' },
    ],
  },
  boss_challenge: {
    you: 'This is the room where your number either becomes the bank\'s story or your liability. {chau.s} will test every claim. Your edge is that you labelled everything first. Stay calm, agree with good challenges, say what is measured and estimated, and offer the pilot as the way to settle it.',
    risk: ['H1', 'H2'],
    follow: [
      { by: 'minh_chau', q: 'Then why should we believe any of it?',
        a: 'Because the parts that are measured are clearly measured, and the part that\'s estimated is labelled as such. I\'m not asking you to believe the ratio; I\'m asking whether the direction justifies a six-week test with a proper baseline. The pilot measures cycle time, review rounds and defects after handoff against last year\'s comparable epic. If the number doesn\'t hold, we\'ll know and I\'ll say so in this room.' },
      { by: 'anh_khai', q: 'What would you need to make the pilot rigorous?',
        a: 'Three things. A baseline from last year\'s comparable epic, which {chau.s}\'s team can help define so it isn\'t my measure marking my homework. A product owner who wants to move fast and will keep honest time records. And engineering\'s defect data after handoff, so we measure quality, not just speed. With those, the result will stand up in any room, whichever way it goes.' },
    ],
  },
  d8_lan: {
    you: '{lan.s} is protective of the chapter and wants to be consulted before, not informed after. If she feels bypassed, she becomes an obstacle to the manager role you want inside her chapter. Framing the attention as a chapter win, and asking her view, protects your home base.',
    risk: ['H3', 'H9'],
    follow: [
      { by: 'chi_lan', q: 'Are you planning to move to his area?',
        a: 'Nothing like that is on the table, chị. He was curious about the method, and the pilot is a chance to show what our chapter can do on a high-profile problem. I\'d actually like it to strengthen the chapter, not pull me out of it: the designers involved would be ours, and the method came from here. I\'d value your view on how we frame it so the chapter gets the credit.' },
      { by: 'chi_lan', q: 'Why didn\'t you tell me earlier?',
        a: 'You\'re right, I should have, and I\'m sorry. I told {ethan.s} first because it touched my day-to-day work, but I didn\'t think about how it would look for the chapter. From now on I\'ll bring anything that involves our designers or our craft to you before it happens. Could I walk you through the pilot plan this week? I\'d genuinely like your input on the quality bar.' },
    ],
  },
  d8_boxes: {
    you: 'Sorting a proposal into boxes is how you learn to see it the way {khai.s} does: delivery, the AI story, risk, talent. You naturally describe how the method works; this drill shows you what each line is worth to the person deciding.',
    risk: ['H6'],
    follow: [
      { by: 'coach', q: 'Which box is weakest in your proposal?',
        a: 'Probably talent. The proposal is strong on delivery speed, the AI story and risk, because the decision logs and quality gate cover those. But it says little about how other people grow through it. That matters for {khai.s}, and it matters for me, because it is the evidence a manager panel looks for. I should add a line about coaching two designers and a BA to run the method themselves.' },
      { by: 'coach', q: 'What happens if a line fits no box?',
        a: 'It probably shouldn\'t be in the proposal. A line that doesn\'t serve delivery, the AI story, risk or talent is serving me: my interest, my method, my pride in the detail. Executives skim for what matters to them, and an orphan line costs attention without earning anything. I either rewrite it so it lands in a box, or I move it to an appendix for anyone who wants depth.' },
    ],
  },
  d8_tray: {
    you: 'When an executive asks "which one?", he wants a recommendation, not a menu. Your analysis instinct is to present options fairly. The leadership move is to recommend one, give the reason in a line, and name a second choice, so he can say yes in a single reply.',
    risk: ['H6', 'H2'],
    follow: [
      { by: 'anh_khai', q: 'Why lending and not the dashboard rebuild?',
        a: 'Three reasons. Lending starts discovery in three weeks, so we don\'t wait. Its PO wants to go fast, which makes the pilot fair. And last year\'s similar epic gives us a real baseline, so the result will be measured, not estimated. The dashboard rebuild is a good second choice, but it has no clean comparison and its timeline is still moving. Lending gives you a number you can retell.' },
      { by: 'anh_khai', q: 'What do you need from me to start?',
        a: 'One decision and one introduction. Confirm lending onboarding as the pilot epic, and introduce me to its product owner so I can agree the plan directly. I\'ll take it to {ethan.s} and {lan.s} first so my time and the designers\' time are cleared properly. Then I\'ll send you a one-pager with the baseline and the measures, and three-line updates every Friday for six weeks.' },
    ],
  },
  d8_order: {
    you: 'A one-pager is a decision on a page. You like completeness, so the temptation is a methodology section first. Ordering headline, why now, plan, cost, measures, guardrails and ask teaches you to put the decision where a busy reader starts and finishes.',
    risk: ['H2'],
    follow: [
      { by: 'coach', q: 'Why does the ask go at the bottom if the headline is at the top?',
        a: 'Because the page reads like a conversation with a busy person. The headline tells him what this is in one line, so he decides whether to read on. The middle gives him what he needs to trust it. The ask at the bottom is the one decision he has to make, and it lands after he has seen the cost and the guardrails. Headline and ask together should make sense even if he skips everything else.' },
      { by: 'coach', q: 'Where do the guardrails belong, and why include them?',
        a: 'Just before the ask, after the measures. In a bank, any AI proposal triggers the question "is it safe?", and if the guardrails are missing he has to ask, or worse, Risk asks for him later. Putting no customer data in prompts, human review and a decision log on the page answers it before it becomes a delay. Guardrails turn a speed proposal into one a senior person can approve.' },
    ],
  },
  d8_headline: {
    you: 'The headline is the only line some readers will see. Verb, outcome, time, and an ask: this is executive communication at its most compressed. Your feedback asked for emphasis on key messages; this is exactly where that emphasis goes.',
    risk: ['H2'],
    follow: [
      { by: 'anh_khai', q: 'Six weeks seems short. Is it realistic?',
        a: 'For discovery, yes. Six weeks covers baseline and set-up, three weeks of discovery with the method, and a week to compare. It won\'t prove the whole delivery cycle, but it will tell us whether discovery gets meaningfully faster without losing quality, which is the riskiest assumption. If the first six weeks hold up, we extend into build with a clear case. If not, we\'ve spent little to learn a lot.' },
      { by: 'coach', q: 'Why name the measures in the headline?',
        a: 'Because measures make the promise testable. "Faster discovery" is a hope; "measured against last year\'s comparable epic on cycle time, review rounds and defects" is a commitment someone can check. It also tells sceptics like {chau.s} that I have thought about quality, not just speed. A headline with measures reads like a leader\'s plan rather than a designer\'s enthusiasm.' },
    ],
  },
  d8_help: {
    you: 'Saying yes to everything is how "quiet backbone" people burn out and miss delivery. You are generous with your time; a leader agrees a bounded yes, checks with their line, and protects the main commitment. This scene practises a yes with edges.',
    risk: ['H3', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Can\'t you just fit it in?',
        a: 'I could try, but I\'d rather do it well than squeeze it. Lantern is in its final release and the team is counting on me. What I can do properly is two half-days a week for four weeks, which is enough to help {antoine.s}\'s team shape the curriculum and hand them the playbooks. If it needs more, I\'d suggest {bao.s} joins me; he\'d be excellent at it. I\'ll confirm the plan with {ethan.s} today.' },
      { by: 'ethan', q: 'Another request from his side?',
        a: 'Yes, and I wanted to agree it with you before saying yes. It\'s helping {antoine.s}\'s academy with their AI curriculum: two half-days a week for four weeks. Lantern stays my priority; if the release needs me, the academy work moves. If you think it\'s too much right now, tell me and I\'ll propose a later start. I\'d rather protect our release than look helpful elsewhere.' },
    ],
  },
  d8_rejected: {
    you: 'A "no" from a sponsor is information, not rejection. You have heard "not yet" on manager roles for a year; this scene trains the response that keeps doors open: thanks, no argument, and a learning question about what would make it a yes.',
    risk: ['H5'],
    follow: [
      { by: 'anh_khai', q: 'It would need a clear saving and a sponsor in the platform team.',
        a: 'That\'s really helpful, thank you. So the case would need a measured saving and someone like {chau.s}\'s team owning it with us. I\'ll keep a note of the costs the lending pilot saves on design-system work, so if there\'s a real saving we\'ll have evidence rather than an estimate. And I\'ll talk to {chau.s} about whether platform engineering sees the same problem. No rush; I\'ll come back if the numbers make the case.' },
      { by: 'coach', q: 'Why not argue for it once more?',
        a: 'Because he has decided, and arguing turns a reasonable no into a test of whether I can take one. People who argue every no become expensive to say yes to. Asking what would need to be true respects his decision and gives me a path. It also tells him I can hear a no without losing momentum, which is a quality he will want in someone he backs for leadership.' },
    ],
  },
  d8_131: {
    you: '1-3-1 is the pitch shape that survives interruption: one headline, three supports, one ask. Your scorecard rates executive communication below your other strengths. Thirty seconds aloud, every day this week, is the fastest way to raise it.',
    risk: ['H2'],
    follow: [
      { by: 'anh_khai', q: 'What\'s the biggest risk in this pilot?',
        a: 'That the method works for me but not for others. Everything so far depends on one designer who built it. The pilot tests exactly that: two designers and a BA using it with coaching, on a real epic. If they can\'t get similar results, we learn where the method depends on me and fix the playbooks. The second risk is the baseline being unfair, which is why {chau.s}\'s team helps define it.' },
      { by: 'coach', q: 'How do you keep it to thirty seconds out loud?',
        a: 'I write it first, read it aloud with a timer, and cut until it fits with a breath to spare. Then I stop reading and say it from the shape: headline, three supports, ask. If I memorise words, I sound scripted; if I memorise structure, I sound like myself. I also practise being interrupted after the headline, because that is when executives usually ask their first question.' },
    ],
  },
};
