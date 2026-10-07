// Deep layer, days 1-5: why each scene matters for you (from your dossier), the risks it trains against,
// and two follow-up questions with sample answers of about 80 words. by: who asks ('coach' is T+10).

export const DEEP1 = {
  d1_first: {
    you: 'This is risk H3 in your dossier, and it is the one that quietly ends cross-division careers. {khai.s} sits in another division; {ethan.s} owns your rating and the "about a year" number on your slide. If he hears about the coffee second-hand, he becomes a bystander to your story instead of its co-author.',
    risk: ['H3'],
    follow: [
      { by: 'ethan', q: 'Thanks for telling me. Why tell me before you even message him?',
        a: 'Because the number on that slide is partly yours, and I would hate for you to hear about this from someone else. Nothing is decided; it is a coffee. I want to keep it to learning how his area uses AI, and I\'d like your view on anything I should mention or avoid. If something useful comes of it, I\'d want you involved from the start, not informed afterwards. You have backed this work all year.' },
      { by: 'ethan', q: 'Are you thinking of leaving the team?',
        a: 'No. I\'m committed to Lantern and to getting it over the line properly. What I am thinking about is how the method grows beyond one designer, and that conversation naturally involves people like him. If an opportunity ever came out of it, you would hear about it from me first and we would plan it together so the team isn\'t left exposed. Right now this is curiosity and learning, nothing more, and I wanted that to be clear.' },
    ],
  },
  d1_heads: {
    you: 'Your profile flags "completeness over compression". A heads-up to a busy manager is the smallest place to practise the fix: two lines, the news first, one question. If you can make {ethan.s} feel informed in under fifty words, you are training the same muscle every executive message needs.',
    risk: ['H3', 'H2'],
    follow: [
      { by: 'ethan', q: 'What exactly did he say about the slide?',
        a: 'He said "Impressive, let\'s grab a coffee, or even lunch sometime." That was all; it was a passing moment at my desk. I took it as interest in the method rather than in me, because the slide is evidence for something he already talks about: Vietnam moving fast on AI. I\'ll keep the coffee to listening. And I\'ll be clear that the year figure is your informal estimate, not a measured baseline, so nothing gets overstated.' },
      { by: 'ethan', q: 'Is there anything you need from me?',
        a: 'Just one thing: if there is anything about Lantern or the team you would rather I didn\'t share, tell me and I will steer around it. And if you have a view on how he likes to work, I would love to hear it. Otherwise nothing. I\'ll tell you how it goes the same day, in two lines, and if anything useful comes out of it for the team, I\'d like to bring it back to you first.' },
    ],
  },
  d1_timing: {
    you: 'Risk H4: the warm window closes while you wait for the perfect moment. You are thorough, and thoroughness becomes delay. This scene teaches timing as a skill: send in his real working morning, this week, rather than polishing for three weeks and arriving when the hint has gone cold.',
    risk: ['H4'],
    follow: [
      { by: 'coach', q: 'Why does the hour you send matter so much to an executive?',
        a: 'Because executives triage. A message that lands in the first hour of his day, Vietnam time, gets read with attention and answered between meetings. The same message at ten at night sits under twenty others by morning, and a late-night message also signals poor boundaries. Timing is a small courtesy that says I studied how you work. It costs nothing, and it doubles the chance that a short, well-shaped message gets a quick, easy yes.' },
      { by: 'coach', q: 'What if your message isn\'t perfect yet?',
        a: 'Then I send it anyway, once it passes three checks: context, something useful for him, and a small proposal he can say yes to. A good message this week beats a perfect one in three weeks, because the hint he gave has a shelf life. My habit is to keep polishing, and that habit is exactly what closes warm windows. I will write it, cut it to about seventy words, check it once, and send it in his morning.' },
    ],
  },
  d1_cut: {
    you: 'Cutting lines you are proud of is your hardest edit. Your peer feedback asked for more emphasis on the key messages, and executive readers punish every extra clause. This drill trains the instinct to cut apologies, homework and career asks before they ever reach a senior inbox.',
    risk: ['H2'],
    follow: [
      { by: 'coach', q: 'Which line is the hardest for you to cut, and why?',
        a: 'Probably the line about the twenty-three playbooks and the decision logs. It is my best evidence, and cutting it feels like hiding the work. But a first message is not the place to prove everything; it is the place to earn twenty minutes. The evidence keeps. If he wants depth, he will ask, and the detail lands far better as an answer to his question than as a paragraph he never asked for.' },
      { by: 'coach', q: 'Why is "sorry to bother you" worth cutting?',
        a: 'Because it lowers my status before I have said anything useful, and it makes the meeting sound like a favour instead of an exchange. Senior people get dozens of apologetic messages; the confident, warm ones stand out. Thanking him for his kind words does the respectful work without the apology. Respect in Vietnamese culture shows in how I address him and how little of his time I ask for, not in saying sorry.' },
    ],
  },
  d1_message: {
    you: 'This message decides whether your best evidence ever reaches an executive conversation. Your strengths here are real: a method, numbers, a runnable prototype. Your risks are length and asking too early. CUP keeps it to context, something useful for him, and a small proposal, with no career ask anywhere in it.',
    risk: ['H2', 'H5'],
    follow: [
      { by: 'anh_khai', q: 'Happy to. What would you like to cover?',
        a: 'Mainly I\'d love to hear how you see AI changing delivery across Client Platforms, and where you think teams are moving slower than they could. If it\'s useful, I can show you the live prototype from Lantern in five minutes so you can see the method rather than the slide. I\'ll keep it to twenty or thirty minutes. Would Thursday morning at the café downstairs work for you, or is another day easier?' },
      { by: 'anh_khai', q: 'Remind me what your role is?',
        a: 'I\'m a senior product designer in Trading. I design the tools that keep our regulatory reporting fast and auditable. On Lantern I was the lead designer, and that\'s where I built the AI method you saw on the slide: decision logs from every session, reusable playbooks, and prototypes that run. Lately most of my energy goes into how AI changes the way design gets done, and teaching that to other designers and BAs.' },
    ],
  },
  d1_compress: {
    you: 'Compression is the skill your own feedback names. You think in complete systems, which is why your work is good, and why your drafts run long. Cutting a 160-word draft to 70 without losing the point is the most direct practice you can do for every executive message in the next three weeks.',
    risk: ['H2'],
    follow: [
      { by: 'coach', q: 'How do you decide what survives the cut?',
        a: 'I ask what he needs to say yes, and nothing else survives. He needs to know where we met, why it is worth his time, and what exactly I am proposing. Everything else is either proof he has not asked for, or reassurance for me. I read each sentence and ask: if this disappeared, would his answer change? If not, it goes. Usually that leaves about seventy words and a much stronger message.' },
      { by: 'coach', q: 'Doesn\'t a short message seem less serious?',
        a: 'Not to a senior reader. Short reads as confident and respectful of his time; long reads as nervous, or as homework. The seriousness comes from specifics: the slide he praised, the five-minute prototype, a clear proposal. One concrete detail does more than three paragraphs of context. And brevity is itself evidence: if I can compress my own message, he can trust me to compress a project update for his executive committee.' },
    ],
  },
  d2_silence: {
    you: 'Silence tests your patience and your self-talk. A year of trying for a manager role makes it easy to read five quiet days as rejection. The disciplined move is to read silence as "busy", wait the right number of days, and come back with news rather than a reminder.',
    risk: ['H5', 'H4'],
    follow: [
      { by: 'coach', q: 'How do you stop yourself over-reading the silence?',
        a: 'I treat it like user research: what does the evidence actually say? His Teams card showed a far time zone, executives batch messages, and five working days is normal. So my working hypothesis is "busy", not "no". Then I give myself a rule instead of a feeling: nothing until day four, one nudge with real news by day six, never more than two nudges. Rules protect me from anxious messages I would regret.' },
      { by: 'coach', q: 'What would you do differently if he never replies?',
        a: 'After three weeks, I let the coffee go but keep the relationship. I would say hello in person when I see him, keep doing visible good work, and look for a natural reason to reconnect, such as a result he would care about. Silence is not a verdict on me. The worst outcome is chasing him so hard that the next time he hears my name, it comes with pressure instead of value.' },
    ],
  },
  d2_nudge: {
    you: 'A nudge is where your thoroughness can help instead of hurt: you have real news, so you never need to send "just following up". Forty-five words with one new fact shows him the work is moving, which is exactly the proof-of-thesis role that made him notice you.',
    risk: ['H2', 'H5'],
    follow: [
      { by: 'anh_khai', q: 'Sorry for the slow reply. What\'s the news?',
        a: 'No problem at all, I know it\'s been a busy fortnight. The news is that two lending POs asked to try the AI design method on their next epic, after seeing the Lantern prototype. It\'s early, but it\'s the first time the method has spread beyond my own project. I\'d still love that coffee and your view on where it could help most in your area. Any morning next week works for me.' },
      { by: 'coach', q: 'Why only one question mark?',
        a: 'Because every question mark is a task for him. Two questions in a short message make him decide which to answer, and he often answers neither. One clear question with an easy yes keeps the cost of replying close to zero. It also makes me decide what I actually want from this message, which is the discipline I need anyway. Everything else can be a statement he can read in five seconds.' },
    ],
  },
  d2_invite: {
    you: 'When an executive says "send an invite", speed and precision are the signal. You are detail-strong, which helps here: a 30-minute invite with a clear title, a real place and one line of agenda, sent within the hour, shows exactly the reliability you want him to associate with you.',
    risk: ['H4'],
    follow: [
      { by: 'anh_khai', q: 'What\'s the agenda?',
        a: 'Just three things, and only if they are useful to you: how you see AI changing delivery in Client Platforms, a five-minute look at the live Lantern prototype, and whether there is anywhere the method might help your teams. It\'s thirty minutes, at the café downstairs, and I\'m happy to move it if your morning changes. Mostly I\'m keen to listen and learn how your area works.' },
      { by: 'coach', q: 'Why invite for thirty minutes, not an hour?',
        a: 'Because thirty minutes is easy to accept and easy to extend, while an hour is hard to accept and impossible to shorten gracefully. A short invite signals that I value his time and that I can be concise. If the conversation is going well, he will stay longer and it will feel like his choice. If I book an hour, he will either decline or spend half of it wondering when it ends.' },
    ],
  },
  d2_clash: {
    you: 'This scene tests reliability under pressure. You keep promises to your team; the question is how to protect both commitments without disappearing on either. Proposing a specific alternative quickly is the trust equation in action: reliability up, self-orientation down.',
    risk: ['H4'],
    follow: [
      { by: 'anh_khai', q: 'No worries. When works instead?',
        a: 'Thank you, anh, and sorry to move it. Would Friday at eight thirty or Monday at ten work? Same café, same thirty minutes. If neither suits, I\'m happy to fit around your diary, whatever is easiest for you. I didn\'t want to leave the team review mid-way, since I committed to running it, and I\'d rather give our coffee my full attention than squeeze it between two things.' },
      { by: 'ethan', q: 'Did you really move an executive coffee for our review?',
        a: 'I did. I committed to running the review, and the team planned around it. Moving a coffee by two days costs very little if I offer a specific alternative straight away, and he replied within minutes. Dropping a team commitment for a senior meeting sends the wrong message to everyone, including him, because the first thing a sponsor checks is whether you keep the small promises.' },
    ],
  },
  d2_scorecard: {
    you: 'Nobody senior buys design for its own sake, and your instinct is to describe the craft. This drill retrains you to translate: your playbooks become the AI-productivity story, your audit trails become risk and control, your Vietnam team becomes strategic credibility. That translation is the bridge to the thesis in your dossier.',
    risk: ['H6'],
    follow: [
      { by: 'anh_khai', q: 'Why should a technology executive care about design?',
        a: 'Because in a bank, design is where speed and control meet. On Lantern, the design work produced decision logs that trace every choice to who asked for it, which helps risk; it cut discovery from months to weeks, which helps delivery; and it showed a Vietnam team leading on AI, which helps your credibility story. I don\'t ask anyone to care about design. I ask them to care about faster, auditable delivery.' },
      { by: 'coach', q: 'Which item on his scorecard is your strongest card?',
        a: 'The AI-productivity story. It is what he already talks about, and my Lantern evidence is a concrete example he can retell upward. Risk and control is a close second, because auditable AI is rare and regulators care about it. I would lead with productivity, mention control as the reason it is safe, and only then talk about talent, because talent is where my own ambition sits and that should come last.' },
    ],
  },
  d2_study: {
    you: 'You are a researcher, and this scene asks you to use that strength on your most important stakeholder. Twenty minutes of professional research, his talks, his posts, his priorities, turns a coffee from a pleasant chat into a conversation where every question shows you understood his world.',
    risk: ['H5'],
    follow: [
      { by: 'coach', q: 'Where is the line between research and stalking?',
        a: 'Professional sources only: his public talks, internal posts, the org chart, what colleagues say about how he likes to work. Nothing personal, nothing about family, and nothing I would be embarrassed to explain if he asked how I knew. The test is simple: could I say "I saw your town hall talk" out loud? If yes, it is research. If I would hide where I learned it, I leave it alone.' },
      { by: 'anh_khai', q: 'You seem to know a lot about my area already.',
        a: 'I tried to do my homework, anh. I watched your town hall talk on AI in delivery and read the Client Platforms priorities on the intranet. But I know that is the outside view, which is why I wanted to ask you directly. What I couldn\'t tell from the outside is where teams are actually stuck. I\'d really value hearing that from you, because that is where something useful might be possible.' },
    ],
  },
  d2_desk: {
    you: 'Three-second encounters reward people who have one ready line, and you prepare well. The trap for you is filling the moment with detail. A warm greeting, one sentence of news, and letting him walk on is the whole skill. Short moments, done well, compound into "I keep hearing good things".',
    risk: ['H2', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Oh, how is the prototype going?',
        a: 'Really well, thank you, anh. Two lending POs asked to try the method on their next epic, so it is starting to spread beyond my project. I\'m putting together a short one-pager on how it works. I won\'t keep you now, I know you are between meetings, but I\'d love to show you when we have that coffee. Have a good afternoon.' },
      { by: 'coach', q: 'What do you do if he stops to talk longer?',
        a: 'I follow his lead and keep my answers short, so he controls the length. If he asks a question, I give the headline and stop. If he seems relaxed, I ask him one thing about his world instead of telling him more about mine. The aim is that he walks away feeling the conversation was easy and useful. I never use an unplanned chat to make a pitch; that turns a warm moment into a cornered one.' },
    ],
  },
  d2_pitch: {
    you: 'Your lift version is where H6 lives: "quiet backbone" people describe what they helped with. Thirty seconds forces ownership language: what you decided, what changed, what it proves. Say it aloud until it sounds like you, because you will need it unannounced in lifts, pantries and town halls.',
    risk: ['H6', 'H2'],
    follow: [
      { by: 'anh_khai', q: 'Interesting. What would it take to do that across a portfolio?',
        a: 'Three things. A small group of designers and BAs trained in the method, with me coaching them on real work rather than in workshops. A quality gate, so every AI output has a human review and a decision log. And one product owner who wants to go fast, so we can measure a real baseline. Six weeks would be enough to know whether it scales or where it breaks. That is the experiment I would love to run.' },
      { by: 'anh_khai', q: 'How much of that was you, and how much was AI?',
        a: 'AI did a lot of the lifting: transcribing sessions, drafting decision logs, generating prototype variants. My part was the judgement. I designed the method, decided which outputs to trust, reviewed every decision against the regulation, and kept the audit trail. A useful way to put it: AI made the work faster, and I made it safe and repeatable. Without the method, the speed would have produced a lot of confident mistakes.' },
    ],
  },
  d3_runsheet: {
    you: 'You like structure, and a run-sheet is structure in service of the other person. Knowing the arc of a 25-minute coffee, his world first, your story briefly, a gift, a question, an early exit, frees you to listen instead of wondering when to bring up the method.',
    risk: ['H2', 'H5'],
    follow: [
      { by: 'coach', q: 'Why does his world come before your story?',
        a: 'Because people trust those who are curious about them first, and because I learn what to say by listening. If I start with Lantern, I am pitching into the dark. If I start by asking what he is focused on, I can connect my work to his priority in his words. It also lowers the self-orientation in the trust equation: the meeting feels like it is about his agenda, and my goal emerges from it naturally.' },
      { by: 'coach', q: 'When do you leave, and why so early?',
        a: 'Around minute twenty-five to thirty, before he has to end it. Leaving first shows I respect his time and that I am not trying to extract more from the meeting than he offered. It also means the coffee ends on a high, with a clear next step, rather than drifting until his assistant arrives. Executives remember how a meeting ended more than how it started, so I want the last memory to be crisp.' },
    ],
  },
  d3_coffee: {
    you: 'The coffee is your first real assessment. Your Singapore years are a genuine bridge, your evidence is strong, and your risk is talking too much about the work you love. The talk meter is there for you: aim for about a third of the airtime, ask about his thesis, and leave before he wants you to.',
    risk: ['H2', 'H5'],
    follow: [
      { by: 'anh_khai', q: 'What would you do with more time and a few people?',
        a: 'I would prove the method is not just me. Take two or three designers and a BA, run it on one real epic for six weeks, and measure discovery-to-sign-off against a baseline. I would coach them on the job, with a quality gate on every AI output. If it holds up with other people\'s hands on it, it is a capability your area can scale. If it breaks, we learn exactly where, cheaply.' },
      { by: 'anh_khai', q: 'Who else should I be talking to about this?',
        a: 'Honestly, {ethan.s}, my manager, because the Lantern numbers come from his team and he has backed the method from the start. And {lan.s}, our Head of Design, since she cares that AI raises craft rather than replacing it. If you are thinking about lending specifically, {sarah.s}\'s product owners were the first to ask to try it. I would be glad to make any of those introductions properly.' },
    ],
  },
  d3_about: {
    you: '"Tell me about yourself" is where your fifteen years risk becoming a fifteen-minute history. Your story has a strong thread: you built code, then designed regulated systems, now you make AI-era delivery safe. Forty-five seconds, one thread, ending on what you care about now.',
    risk: ['H2', 'H8'],
    follow: [
      { by: 'anh_khai', q: 'Why did you leave Singapore?',
        a: 'Partly family, and partly because I could see Vietnam was where the interesting growth was. After fifteen years in Singapore I wanted to bring what I had learned home, and joining the bank\'s technology centre here let me do that on regulated, serious work. It turned out to be good timing: the AI shift happened just as I arrived, and Vietnam teams are moving faster than I expected. Which bank were you with there?' },
      { by: 'anh_khai', q: 'What are you proudest of?',
        a: 'Honestly, not the speed on Lantern, though that is what people notice. I\'m proudest that other people can now use the method. The playbooks and decision logs mean a BA or another designer can pick it up and get similar results without me in the room. Two of the people I coached are now running sessions themselves. That is what makes it a capability rather than a personal trick.' },
    ],
  },
  d3_real: {
    you: 'Risk H1 is rated High for you: "about a year" is an informal observation and "about 60%" is your estimate. This scene is where trust is won or lost. Saying the caveat before he asks turns a fragile number into proof that you are honest under pressure.',
    risk: ['H1'],
    follow: [
      { by: 'anh_khai', q: 'So how would you prove it properly?',
        a: 'With a baseline and a second run. I would take one comparable epic, record how long discovery to sign-off takes the usual way, then run the method with a different team and measure the same thing. I would also track quality: review rounds and defects after handoff, because speed that creates rework is not speed. Six weeks would give us a measured number I could stand behind in any room.' },
      { by: 'anh_khai', q: 'Can I use the number in my deck?',
        a: 'I\'d love you to, with one wording change so it survives questions: "one designer, about two months, against a team estimate of about a year." The year is my manager\'s informal estimate, not a measured baseline. If you would like a number that holds up in front of the Group Executive, give me six weeks and I will have a measured comparison. I would hate for a challenge to land on you.' },
    ],
  },
  d3_ai: {
    you: 'False modesty is the "quiet backbone" habit wearing a different hat. Saying "AI did most of it" undersells the judgement that makes your method safe. This scene trains a precise split: what the tool produced, and what you decided, reviewed and owned.',
    risk: ['H6', 'H1'],
    follow: [
      { by: 'anh_khai', q: 'Couldn\'t anyone with the same tools do this?',
        a: 'They could get faster, but not safely. The tools are available to everyone; what is rare is the method around them. Deciding what to trust, keeping a decision log for every choice, reviewing every output against the regulation, and packaging it so someone else can repeat it. Most teams who just use the tools get speed and a pile of confident mistakes. The method is what turns speed into delivery a bank can sign off.' },
      { by: 'raj', q: 'How do you know the AI didn\'t introduce errors?',
        a: 'Every AI output goes through human review against the source: the regulation, the stakeholder\'s words in the session recording, or the existing system behaviour. Nothing reaches a decision without a person signing it off in the decision log. We also track where AI drafts were wrong, so we know which tasks need more checking. No customer data goes into prompts at all. The aim is not zero errors from the tool; it is zero unreviewed ones.' },
    ],
  },
  d3_bill: {
    you: 'A small moment with big cultural weight. You invited, so you host; if he insists, you accept gracefully and promise the next one. Your Vietnamese and Singaporean instincts both help here: hospitality without a tussle, and a natural reason to meet again.',
    risk: [],
    follow: [
      { by: 'anh_khai', q: 'No, no, let me get this one.',
        a: 'That\'s very kind of you, anh, thank you. Then the next one is definitely on me, and I\'ll hold you to it. Thank you for making the time today; your point about where the bottleneck moves when delivery gets faster really stuck with me. I\'ll send you the one-pager on the method tomorrow morning, and I\'ll let you know how the session with {sarah.s}\'s team goes.' },
      { by: 'coach', q: 'Why not fight harder to pay?',
        a: 'Because a long tussle over the bill makes the last minute of the meeting awkward and turns his generosity into a contest. Offering once, sincerely, shows good manners; accepting gracefully shows I can receive. Promising the next one creates a light, natural reason to meet again. In both Vietnamese and Singaporean business culture, that exchange is a small sign of a relationship that will continue.' },
    ],
  },
  d3_napkin: {
    you: 'Napkin structure is executive communication in its smallest form: answer, three reasons, ask. Your scorecard rates executive communication as 3 for evidence and 2 for visibility. Practising this order until it is automatic is how that score moves.',
    risk: ['H2'],
    follow: [
      { by: 'coach', q: 'Why does the answer come before the reasons?',
        a: 'Because a senior listener decides in the first sentence whether to keep listening, and because they may only hear the first sentence. If I build up to my point, they spend the whole time guessing where I am going. If I start with it, every reason that follows has somewhere to land. It also protects me: if I am interrupted after one line, the most important thing has already been said.' },
      { by: 'coach', q: 'What if you don\'t have three reasons?',
        a: 'Then I give one or two. Three is a rhythm, not a rule, and padding with a weak third reason undermines the strong two. Senior people notice when the last point is filler. I would rather say "two reasons" and have both land than invent a third. The structure exists to make thinking visible and easy to follow, not to look complete. Completeness is my habit; clarity is the goal.' },
    ],
  },
  d4_thanks: {
    you: 'Follow-ups separate people executives remember from people they meet. Your reliability is a real strength: you deliver. Within 24 hours, one line quoting his words, the promised one-pager, and an update on the introduction proves in a single message that you do what you say.',
    risk: ['H2'],
    follow: [
      { by: 'anh_khai', q: 'Thanks for the one-pager. Can you send me more detail on the method?',
        a: 'Of course, anh. I\'ll send a two-page summary by Thursday: the five steps of the method, the quality gate we use on every AI output, and the before-and-after numbers with what is measured and what is estimated clearly labelled. If it\'s easier, I can also walk you or someone on your team through the live prototype in fifteen minutes. Whatever format is most useful for you.' },
      { by: 'coach', q: 'Why quote his words back to him?',
        a: 'Because it shows I was listening to him, not waiting for my turn. Quoting his own point, like where the bottleneck moves when delivery gets faster, tells him the conversation mattered and gives him credit for the idea. It also makes the message unmistakably personal, not a template. People remember those who remember what they said, and it is far more convincing than "great to meet you".' },
    ],
  },
  d4_cool: {
    you: 'This is H3 arriving in real life: {ethan.s} has noticed. Your instinct may be to reassure at length or to stay quiet. The trust move is a short, warm conversation that gives him the facts, the credit, and a role in what comes next, before any distance hardens.',
    risk: ['H3'],
    follow: [
      { by: 'ethan', q: 'I just want to know where I stand.',
        a: 'That\'s completely fair, and I\'m sorry if this felt like it was happening around you. You stand exactly where you always have: you\'re my manager, the Lantern numbers are your team\'s, and I give you credit for them every time. The coffee was about the method, and I told him the year figure was your estimate. If anything comes of it, you\'ll hear it from me first, and I\'d want us to shape it together.' },
      { by: 'ethan', q: 'Did you talk about your career with him?',
        a: 'Only lightly. I asked what he would want to see from someone like me in the next year; I didn\'t ask about roles. His answer was to keep making the method work for other teams. I\'d like to talk with you about that, actually, because I\'d rather grow it with your support than around you. Could we use part of our next one-on-one to talk about where I go from here?' },
    ],
  },
  d4_tell: {
    you: 'Closing the loop is what turns your manager from a bystander into a co-owner. Sixty words: what happened, what it means for your time, what you need from him. It also models the upward reporting that a future manager does every week.',
    risk: ['H3', 'H2'],
    follow: [
      { by: 'ethan', q: 'How much time is this going to take?',
        a: 'Very little for now: about two hours this month, mostly preparing one session for {sarah.s}\'s team. Lantern stays my priority, and I won\'t take on anything else without talking to you first. If it grows into something bigger, like a pilot, I\'d bring you a proper proposal with the trade-offs so we can decide together. I don\'t want this to become a side project that quietly eats the team\'s time.' },
      { by: 'ethan', q: 'What do you want from me?',
        a: 'Two things. Your view on whether the session for {sarah.s}\'s team fits with our priorities this month. And, if you are comfortable, your support in principle for me exploring how the method spreads beyond Lantern. I\'m not asking for any change in my role. I\'d just like you in the loop from the start, because the method grew in your team and you should get the credit when it travels.' },
    ],
  },
  d4_correct: {
    you: 'A number travelling without its caveat is H1 in motion. Correcting it the same day, in one line, costs you a moment of awkwardness and buys you a reputation for honesty that will matter in every future room where your numbers are challenged.',
    risk: ['H1'],
    follow: [
      { by: 'anh_khai', q: 'Does that change the story much?',
        a: 'Not the direction, just the strength of the claim. It is still a very large difference, one designer in about two months against a team estimate of about a year. What changes is how we say it: "estimated", not "measured". I would rather we use the careful version now than have someone challenge it later in a bigger room. And a six-week pilot would give us a measured number to replace it.' },
      { by: 'coach', q: 'Why does correcting yourself build trust instead of losing it?',
        a: 'Because credibility in the trust equation is about whether your numbers survive questions. When I correct myself before anyone catches it, I show that my numbers have been checked by the person most likely to want them big. Executives retell figures upward, and the worst thing that can happen to a sponsor is being embarrassed by a number I gave them. A quick correction protects him, and he will remember that.' },
    ],
  },
  d4_silence: {
    you: 'Two quiet weeks after a good coffee feel personal when you have waited a year for a sponsor. This scene asks you to keep delivering and reconnect with value, not anxiety. Sponsors notice who stays steady when nothing seems to be happening.',
    risk: ['H5'],
    follow: [
      { by: 'coach', q: 'What counts as a good reason to reconnect?',
        a: 'Something he would be glad to know: a result with one number, an introduction that paid off, or an answer to a question he raised. "Just checking in" is about my need; "the session with {sarah.s}\'s team got a 4.6 and two teams want to pilot it" is about his interest. If I have nothing like that yet, I wait and keep working until I do. News is the best excuse to stay visible.' },
      { by: 'coach', q: 'How do you stay patient?',
        a: 'By keeping my attention on the work, not the relationship. The relationship grows from delivery: every result I produce is a reason for him to remember me. I also keep a simple log of our interactions and promises, so I can see real progress instead of guessing. And I remind myself that sponsorship takes months, not weeks. My job right now is to be reliably useful.' },
    ],
  },
  d4_howknow: {
    you: 'Risk H9: becoming "his person" too visibly. Peers notice proximity to power, and {bao.s} is talented and a little competitive. A modest, true answer that shares credit and invites him in protects relationships you will need when you lead.',
    risk: ['H9'],
    follow: [
      { by: 'bao', q: 'So is he going to give you a role?',
        a: 'No, nothing like that. He saw the Lantern slide and was curious about the method, so we had a coffee and I mostly listened to how his area is thinking about AI. Honestly, the most useful thing to come out of it is that other teams want to try the method. I\'d love your help with that, actually: you are better than me at prototyping interactions, and I don\'t want this to be a one-person thing.' },
      { by: 'bao', q: 'Must be nice to have friends in high places.',
        a: 'I get why it looks that way, but really it was one coffee about the work. What matters to me is that the method spreads, and it won\'t if it stays attached to my name. If you\'re interested, I\'d like you to co-run the next session with me; your interaction work would make the prototypes much stronger. Any credit from it should be shared. It would make the whole team look good.' },
    ],
  },
  d4_log: {
    you: 'You already keep decision logs for every design session. A relationship log is the same discipline applied to people: dates, his words, promises made, what you learned. It turns your thoroughness into an asset and keeps you from guessing about where things stand.',
    risk: ['H5'],
    follow: [
      { by: 'coach', q: 'What belongs in the log, and what doesn\'t?',
        a: 'Facts and commitments belong: when we met, what he said in his own words, what I promised and by when, what I learned about his priorities, and anything he asked me to keep quiet. Gossip, guesses about his feelings, and anything I would not want him to read do not. The test is that the log should be useful and fair if he ever saw it. It helps me act; it is not a diary.' },
      { by: 'coach', q: 'How does a log change what you do next?',
        a: 'It tells me what I owe and when to reconnect. If I promised a one-pager and an update on {sarah.s}\'s session, the log shows both are due. If it has been six weeks since a meaningful touch, it tells me to find news worth sharing. It also helps me spot patterns, such as which topics make him lean in. Without it, I would rely on memory and anxiety, which is a poor combination.' },
    ],
  },
  d5_questions: {
    you: 'Questions that show judgement are how a senior person assesses you without asking. Your research background is an advantage: you ask good questions for a living. Choosing four that reveal how you think about scale, risk and people prepares you for the lunch that decides whether he invests.',
    risk: ['H6'],
    follow: [
      { by: 'anh_khai', q: 'Good question. What do you think the answer is?',
        a: 'My guess is that when delivery gets five times faster, the bottleneck moves to decisions: sign-off, risk review and prioritisation. On Lantern, design and build sped up, but approvals took the same time, so they became the slowest part. That is why I think the method needs to include governance, not just speed. I would be curious whether you are seeing the same pattern across Client Platforms.' },
      { by: 'coach', q: 'Why prepare questions when the lunch is about you?',
        a: 'Because the best way to show how I think is through what I ask. A good question about where the bottleneck moves, or what makes him confident to give a team ownership, reveals judgement far more than a prepared answer. It also keeps the conversation balanced, which matters given my tendency to explain at length. And his answers tell me what he values, which shapes everything I say afterwards.' },
    ],
  },
  d5_s2: {
    you: 'S2 is the most important thirty seconds in your three weeks. You have tried for a manager role for over a year; this script states that ambition without demanding a title, ties it to his thesis, and ends with a request for advice. Say it aloud daily until it sounds like you.',
    risk: ['H5', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Why do you want to lead?',
        a: 'Because the method only matters if it works in other people\'s hands. I\'ve seen what one designer can do with it; the bigger impact is a team doing it well, with someone coaching them and keeping the quality bar. I also enjoy that part: two people I coached now run sessions themselves, and that felt better than my own results. I want to be accountable for a team\'s output, not just mine.' },
      { by: 'anh_khai', q: 'What makes you think you\'re ready?',
        a: 'I\'m ready to lead the work, and partly ready to lead people. I\'ve led a team of three before, I\'ve mentored more than fifty people, and I teach the method across roles. What I haven\'t done recently is the formal side: hiring, performance conversations, trade-offs across people. That\'s exactly the gap I want to close, and I\'d rather close it on something that matters than wait for a perfect seat.' },
    ],
  },
  boss_lunch: {
    you: 'The lunch is where he decides whether you are who he thinks. Your dossier says your evidence is strong and your leadership evidence is old and small. Expect "why haven\'t you been promoted?" and answer it with S5: honest, no blame, forward-looking. Keep your airtime near a third.',
    risk: ['H5', 'H2', 'H6'],
    follow: [
      { by: 'anh_khai', q: 'Why haven\'t you been promoted already?',
        a: 'Partly timing: manager seats in our chapter open rarely. Partly me: my strongest evidence has been my own delivery and teaching, not leading a team formally. I led a small team years ago, but not recently, and panels rightly look for that. It\'s exactly the gap I\'m trying to close, which is why initiatives where I can lead people interest me so much. I\'d value your view on the best way to do that.' },
      { by: 'anh_khai', q: 'What would you want from me?',
        a: 'Mostly your advice, honestly. You have seen many people grow into leadership, and I\'d value knowing what you would want to see from someone like me over the next year. And if there is a problem on your plate where the method could help, I\'d love the chance to prove it on something that matters to you. I\'m not asking for a role. I\'d rather earn the right to that conversation by delivering first.' },
    ],
  },
};
