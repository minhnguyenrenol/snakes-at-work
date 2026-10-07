// Hook cards for the Dojo (handbook Part 14 flashcards, cheat card, archetypes, and the research behind them).
// day = the day the card unlocks; part = handbook part (for interleaving); keys = terms the meaning-check looks for.
export const CARDS = [
  // Day 1: the slide, the line, CUP
  { id: 'cup', day: 1, part: '4', q: 'Your first message to a senior executive. The structure?', a: 'CUP: Context (where you met), Useful (something in it for them), Proposal (a small, easy yes with flexibility on their side).', keys: ['context', 'useful', 'proposal'] },
  { id: 'cup_len', day: 1, part: '4', q: 'Max length and max question marks in a first message to an exec?', a: 'About 70 words. One question mark.', keys: ['70', 'one'] },
  { id: 'line_first', day: 1, part: '5', q: 'Who must hear career-relevant news from you before the executive acts on it?', a: 'Your line manager ({ethan}): first, always. "Your line hears it from you, first, always."', keys: ['manager', 'first'] },
  { id: 'no3b', day: 1, part: '1', q: 'The No 3 B\'s?', a: 'Never Bypass, never Brag, never Bitch.', keys: ['bypass', 'brag', 'bitch'] },
  { id: 'trust_eq', day: 1, part: '3', q: 'The trust equation?', a: 'Trust = (Credibility + Reliability + Intimacy) ÷ Self-orientation.', keys: ['credibility', 'reliability', 'intimacy', 'self'] },
  { id: 'timing', day: 1, part: '4', q: 'His Teams card shows working hours 22:00-07:00. When do you send?', a: 'In his real working day, Vietnam business hours (e.g. Monday 9:00-10:30). Don\'t infer availability from a misconfigured time zone.', keys: ['business hours', 'morning', '9'] },
  { id: 'proof_thesis', day: 1, part: '1', q: 'Why did one slide matter to a senior executive?', a: 'You are proof of a thesis he holds. Make the proof robust, repeatable and retellable.', keys: ['proof', 'thesis', 'retell'] },
  { id: 'no_attach', day: 1, part: '4', q: 'Attachments in the first message?', a: 'None. Offer the deck or demo; don\'t send homework.', keys: ['none', 'offer'] },

  // Day 2: study him like a user
  { id: 'study_user', day: 2, part: '3', q: 'Gabarro & Kotter\'s core idea, in four words?', a: 'Study him like a user, mutual dependence, matching your style to his goals, pressures and preferences. Not flattery.', keys: ['study', 'user', 'mutual'] },
  { id: 'nudge', day: 2, part: '4', q: 'He hasn\'t replied in 5 working days. What do you do?', a: 'One nudge on the same thread, with new value (news). Never "just following up". Max two nudges.', keys: ['nudge', 'news', 'once'] },
  { id: 'max_nudge', day: 2, part: '4', q: 'Maximum nudges before you let the coffee go and wait for a new result?', a: 'Two.', keys: ['two', '2'] },
  { id: 'yes_speed', day: 2, part: '8', q: 'He replies "Sure, send an invite." Your move?', a: 'Yes deserves speed: a 30-minute invite within the hour, clear title, specific place, one line of agenda. No deck.', keys: ['30', 'hour', 'invite'] },
  { id: 'scorecard', day: 2, part: '1', q: 'Name four items on an executive\'s scorecard.', a: 'Delivery for his business, the AI-productivity story, Vietnam\'s credibility, talent, risk & control, stakeholder confidence.', keys: ['delivery', 'ai', 'talent', 'risk', 'credibility'] },
  { id: 'clash', day: 2, part: '8', q: 'His proposed time clashes with a UAT session you promised Ops. What do you do?', a: 'Make room, but never by breaking a promise to someone else. Offer two alternatives within 48 hours.', keys: ['alternatives', 'promise'] },
  { id: 'brief_briefer', day: 2, part: '8', q: 'He is much more formal and brief than you expected.', a: 'When he\'s brief, be briefer. Answer first, offer the demo without pushing, end early.', keys: ['briefer', 'brief'] },

  // Day 3: the coffee
  { id: 'r7030', day: 3, part: '4', q: 'The one rule for the coffee?', a: '70/30 and one gift: he talks 70%, you bring one specific useful thing, and you leave early.', keys: ['70', '30', 'gift'] },
  { id: 'gift', day: 3, part: '3', q: 'What makes a good "gift" to a senior person?', a: 'Specific, useful to his agenda, and something he didn\'t have before, a session for his team, a one-pager, an introduction. "Give first, give specific, give to his agenda."', keys: ['specific', 'agenda', 'session'] },
  { id: 'napkin', day: 3, part: '11', q: 'The napkin test?', a: 'Never use a number you can\'t break down on a napkin. Say the caveat before anyone asks.', keys: ['break down', 'caveat'] },
  { id: 'caveats3', day: 3, part: '11', q: 'The three caveats to volunteer about "about a year"?', a: 'It\'s an informal estimate, not a controlled comparison; part of the speed is my developer background; the method is the stronger claim.', keys: ['informal', 'estimate', 'background', 'method'] },
  { id: 'story_thread', day: 3, part: '8', q: '"Tell me about yourself." The shape?', a: 'A story with a thread, under a minute. Not a CV recital.', keys: ['story', 'thread', 'minute'] },
  { id: 'sg_his', day: 3, part: '8', q: 'He starts talking about Singapore. Your move?', a: 'Ask, don\'t tell. Singapore is his story first; one shared detail is enough.', keys: ['ask', 'his story'] },
  { id: 'ai_judging', day: 3, part: '8', q: '"What did AI actually do versus you?" in six words?', a: 'AI did the lifting; I did the judging.', keys: ['lifting', 'judging'] },
  { id: 'inviter_pays', day: 3, part: '8', q: 'Who pays at a coffee you proposed? And if he insists?', a: 'You pay. If he insists, accept once, thank him, and reciprocate next time ("lần sau em mời anh nhé").', keys: ['you', 'accept', 'next time'] },
  { id: 'reciprocity', day: 3, part: '3', q: 'Cialdini + Grant on giving, in one line?', a: 'Give first and give specifically, be an "otherish" giver: generous, but aimed at the right agenda so you don\'t burn out.', keys: ['give first', 'specific', 'otherish'] },

  // Day 4: follow-through
  { id: 'f24', day: 4, part: '4', q: 'The 24-hour follow-up rules?', a: 'One message within 24 hours: quote one thing he said, deliver what you promised before he remembers, no new asks.', keys: ['24', 'quote', 'promised', 'no new'] },
  { id: 'umm', day: 4, part: '3', q: 'The three buckets a senior person sorts you into?', a: 'Useful → Trusted → Mine. One delivery at a time.', keys: ['useful', 'trusted', 'mine'] },
  { id: 'u2t', day: 4, part: '3', q: 'What moves you from Useful to Trusted?', a: 'Delivering one thing for him impeccably and discreetly.', keys: ['deliver', 'discreet'] },
  { id: 'currencies', day: 4, part: '3', q: 'The four currencies of a relationship?', a: 'Information, results, reputation, time, give more than you take (reputation flows up first).', keys: ['information', 'results', 'reputation', 'time'] },
  { id: 'correct_self', day: 4, part: '8', q: 'You overclaimed a number at coffee. What now?', a: 'Correct yourself within 48 hours, lightly, before anyone else can.', keys: ['correct', '48'] },
  { id: 'silence_deliver', day: 4, part: '8', q: 'Two weeks of silence after a great coffee. What does it mean and what do you do?', a: 'Normal. Silence is the space where you deliver the gift, then report back with news.', keys: ['deliver', 'normal'] },
  { id: 'report3', day: 4, part: '4', q: 'How do you report back on a delivered gift?', a: 'Three lines: what happened, one number, one quote. Thank him for the connection.', keys: ['three', 'number', 'quote'] },
  { id: 'understate', day: 4, part: '8', q: 'A colleague asks "How do you know the Executive?"', a: 'Understate the relationship and share credit: "He saw the slide and kindly had a coffee."', keys: ['understate'] },

  // Day 5: lunch
  { id: 'lunch3q', day: 5, part: '4', q: 'The three hidden questions at the lunch?', a: 'Is this person who I think? How do they think? Would I put my name next to theirs?', keys: ['who', 'think', 'name'] },
  { id: 'lunch_arc', day: 5, part: '4', q: 'The lunch arc?', a: 'Person (25%) → his world (35%) → the work (20%) → the future (15%) → close with one next step (5%).', keys: ['person', 'world', 'work', 'future'] },
  { id: 'lunch_dies', day: 5, part: '8', q: 'He criticises a colleague at lunch. Your rule?', a: 'What\'s said at lunch dies at lunch. Listen, stay neutral, never add fuel, never repeat it.', keys: ['dies', 'neutral', 'repeat'] },
  { id: 'praise_line', day: 5, part: '8', q: 'He asks what you think of your manager.', a: 'Specific, true praise of your line. He\'ll assume you\'ll praise him to others.', keys: ['praise', 'specific'] },
  { id: 's2', day: 5, part: '5', q: 'Script S2, "So what do you want to do next?" in one line?', a: '"Honestly, I want to lead: make the method repeatable through a team, here, on something that matters. I\'d value your view."', keys: ['lead', 'team', 'here', 'view'] },
  { id: 'how_help', day: 5, part: '8', q: 'He asks "How can I help you?"', a: 'One feedback request + one introduction. Small, specific, high-leverage. Not "a promotion".', keys: ['feedback', 'introduction'] },
  { id: 'community', day: 5, part: '8', q: 'Outside-work topics to share with a sponsor?', a: 'Community, not commerce: mentoring, Toastmasters. Never side ventures that sound like one foot out the door.', keys: ['community', 'commerce'] },
  { id: 'guard_time', day: 5, part: '8', q: 'Lunch overruns and he seems to enjoy it.', a: 'Guard his time even when he forgets: check at the 60-minute mark and let him choose.', keys: ['60', 'time'] },

  // Day 6: the gift, encounters
  { id: 'r3303', day: 6, part: '6', q: 'What is 3-30-3?', a: '3-second greeting; 30-second story only if he engages; 3-minute deep dive only if HE extends it.', keys: ['3', '30', 'greet'] },
  { id: 'greet_pitch', day: 6, part: '6', q: 'Encounter cadence rule?', a: 'Greet always. Pitch never. News every six weeks.', keys: ['greet', 'pitch', 'six'] },
  { id: 'group_exec', day: 6, part: '15', q: 'Meeting a Group-level executive with your own exec. The rule?', a: 'One story, one number, and make your own exec look good. Never pitch past him.', keys: ['one story', 'one number', 'look good'] },
  { id: 'corridor', day: 6, part: '6', q: 'Handshake in a corridor or lift?', a: 'No: smile, nod, greet. Handshakes are for first meetings, coffees, lunches.', keys: ['no', 'nod'] },
  { id: 'rivals', day: 6, part: '8', q: 'A peer becomes jealous. Your move?', a: 'Turn rivals into co-authors: share the method, bring them in, credit them in front of seniors.', keys: ['co-author', 'credit'] },
  { id: 'town_hall', day: 6, part: '8', q: 'Town hall Q&A with your sponsor on stage. What do you ask?', a: 'The question he wants to answer, one that lets him shine on his own thesis.', keys: ['wants to answer', 'shine'] },
  { id: 'au_gm', day: 6, part: '15', q: 'The Australian Business GM, in five words?', a: 'Plain English, bad news early, banker outcomes.', keys: ['plain', 'bad news', 'banker'] },

  // Day 7: the number
  { id: 'label', day: 7, part: '15', q: 'The Data-Driven Sceptic\'s hook?', a: 'Label every number: measured or estimated, and the source.', keys: ['label', 'measured', 'estimated'] },
  { id: 'shrink', day: 7, part: '8', q: 'Your headline claim is publicly called inflated.', a: 'Shrink the claim to what\'s provable, show the breakdown, then offer to measure it on the next epic.', keys: ['shrink', 'provable', 'measure'] },
  { id: 'debatable', day: 7, part: '11', q: 'One sentence if the claim is attacked hard?', a: '"The exact multiple is debatable; the direction isn\'t, let\'s measure it properly on the next epic."', keys: ['debatable', 'direction', 'measure'] },
  { id: 'guardrail', day: 7, part: '8', q: 'A senior person aggressively challenges your method.', a: 'Validate the valid part, show the guardrail, invite the test.', keys: ['validate', 'guardrail', 'test'] },
  { id: 'idk', day: 7, part: '7', q: 'He asks you something in a meeting and you don\'t know.', a: '"I don\'t know yet: I\'ll confirm by Thursday." Then do it by Wednesday.', keys: ['don\'t know', 'confirm'] },
  { id: 'no_public', day: 7, part: '7', q: 'He is wrong on a fact in a meeting.', a: 'Never contradict him publicly. Offer "one data point that might be useful", which gives him room.', keys: ['publicly', 'data point'] },

  // Day 8: proposals
  { id: 'one_pager', day: 8, part: '7', q: 'The one-pager structure?', a: 'Headline · Why now · What we\'ll do (3 steps) · What it costs · How we\'ll measure · Guardrails · The ask (one decision).', keys: ['headline', 'why now', 'measure', 'ask'] },
  { id: 'four_boxes', day: 8, part: '9', q: 'Four boxes every proposal to a sponsor must tick?', a: 'His outcome, the bank\'s narrative, your asset, your growth. All four, or don\'t propose it.', keys: ['outcome', 'narrative', 'asset', 'growth'] },
  { id: 'r131', day: 8, part: '7', q: 'The executive presentation format?', a: '1-3-1: one headline, three supports, one ask.', keys: ['1', '3', 'headline', 'ask'] },
  { id: 'rejected', day: 8, part: '8', q: 'Your proposal is rejected.', a: '"What would need to be true for this to make sense later?" A no today is data for the yes next quarter.', keys: ['need to be true', 'later'] },
  { id: 'yes_box', day: 8, part: '8', q: 'Asked to "help" on his project on top of a full workload?', a: 'Yes, with a box around it: specific, time-boxed, agreed transparently with your manager.', keys: ['box', 'time'] },
  { id: 'his_lang', day: 8, part: '9', q: 'Translate "I want to be a manager" into his language.', a: '"I want to make this repeatable through a team."', keys: ['repeatable', 'team'] },
  { id: 'tray', day: 8, part: '0', q: 'Carry the tray, not the menu, meaning?', a: 'Bring options already thought through and a recommendation, not a list of questions for him to solve.', keys: ['options', 'recommend'] },

  // Day 9: team and bad news
  { id: 'blufr', day: 9, part: '7', q: 'BLUF-R?', a: 'Bottom line · why (one line) · my responsibility · what I\'m doing · what I need. Early, yourself, with a plan.', keys: ['bottom line', 'responsibility', 'plan'] },
  { id: 'no_surprise', day: 9, part: '7', q: 'Executives forgive misses. What don\'t they forgive?', a: 'Surprises. Bad news early, owned, with a plan.', keys: ['surprises'] },
  { id: 'yes_maybe', day: 9, part: '18', q: 'A Vietnamese teammate says "yes". How do you check it means yes?', a: 'Ask "What might stop this from happening by Friday?" and thank people for raising problems early.', keys: ['might stop', 'thank'] },
  { id: 'own_control', day: 9, part: '8', q: 'An AI-generated artefact with an error reached a stakeholder.', a: 'Own it, fix it, fix the control.', keys: ['own', 'fix', 'control'] },
  { id: 'load', day: 9, part: '8', q: 'Your workload is at 130%.', a: 'Raise load with numbers and options: "Push X two weeks or bring in Y, which would you prefer?"', keys: ['numbers', 'options'] },
  { id: 'gallup70', day: 9, part: '3', q: 'Gallup\'s finding on managers?', a: 'Managers account for at least 70% of the variance in team engagement, so sponsors are careful whom they make managers. Prove you multiply people.', keys: ['70', 'engagement', 'multiply'] },

  // Day 10: the ask
  { id: 'aaas', day: 10, part: '5', q: 'The four rungs of the ask?', a: 'Advice → Awareness → Access → Sponsorship. Never skip a rung.', keys: ['advice', 'awareness', 'access', 'sponsorship'] },
  { id: 'ready_rung', day: 10, part: '5', q: 'Signals you\'re ready for the next rung?', a: 'He initiates, refers you to others, asks about your plans unprompted, gives you a problem (not just praise).', keys: ['initiates', 'refers', 'problem'] },
  { id: 'slow_down', day: 10, part: '5', q: 'Signals to slow down?', a: 'Shorter, slower replies; "talk to your manager" on everything; praise with no follow-up.', keys: ['shorter', 'manager'] },
  { id: 's4', day: 10, part: '5', q: 'The explicit sponsorship ask (S4), its four moves?', a: 'Be direct; state the role; name your gap honestly; give him an easy "not yet" with a learning question.', keys: ['direct', 'gap', 'not yet'] },
  { id: 'not_yet', day: 10, part: '5', q: 'He says "Not yet, you need X."', a: 'The best answer after a yes. Write X down verbatim, agree a 90-day plan, report at 45 and 90 days.', keys: ['verbatim', '90'] },
  { id: 'facts_people', day: 10, part: '8', q: 'Someone presents your work as theirs in front of the Executive.', a: 'Correct facts, never people. Don\'t fight in the room; later give the full picture generously.', keys: ['facts', 'people'] },
  { id: 'mentor_sponsor', day: 10, part: '3', q: 'Hewlett: mentors vs sponsors?', a: 'Mentors advise; sponsors act: they spend their own reputation. Be a good investment: perform, reflect well, stay loyal.', keys: ['advise', 'act', 'investment'] },

  // Day 11: career conversation
  { id: 'never_threaten', day: 11, part: '8', q: 'Another offer arrives before anything from your sponsor.', a: 'Inform and ask, never threaten. Ask for a decision window; tell him first; ask his advice.', keys: ['inform', 'ask', 'threaten'] },
  { id: 'six_things', day: 11, part: '5', q: 'Six things to clarify before accepting a role offer?', a: 'Scope, people, title & band, reporting line, transition, design community.', keys: ['scope', 'people', 'band', 'reporting', 'transition'] },
  { id: 'lateral', day: 11, part: '8', q: 'He offers a lateral move with no team.', a: 'Lateral is fine if the ladder is written: agree what success in six months unlocks.', keys: ['written', 'ladder'] },
  { id: 'band', day: 11, part: '8', q: 'He asks for your salary expectations.', a: 'Talk band and scope, not numbers.', keys: ['band', 'scope'] },
  { id: 'scope_title', day: 11, part: '8', q: '"Where do you see yourself in 3-5 years?"', a: 'Scope over title; next step concrete.', keys: ['scope', 'title'] },
  { id: 'one_thesis', day: 11, part: '5', q: 'Several tracks live at once. How do you stay consistent?', a: 'One honest thesis that covers all of them: "I want to lead people in making AI-era ways of working real: fast and safe."', keys: ['thesis', 'lead'] },
  { id: 'people_hands', day: 11, part: '8', q: '"Manager or principal?", a good answer\'s shape?', a: 'People first, hands still on: a player-coach for the next step.', keys: ['people', 'hands', 'player-coach'] },

  // Day 12: new manager
  { id: 'e12', day: 12, part: '8', q: 'First 90 days under a new boss, in order?', a: 'Expectations first, people second, quick win third.', keys: ['expectations', 'people', 'quick win'] },
  { id: 'ask_tell', day: 12, part: '16', q: 'The 1:1 rule for a new manager?', a: 'Ask more, tell less. Your job is now to make them fast, not to do it yourself.', keys: ['ask', 'tell'] },
  { id: 'rookie3', day: 12, part: '16', q: 'Three rookie-manager traps?', a: 'Doing the work yourself; over-explaining in 1:1s; avoiding hard feedback to keep harmony.', keys: ['work yourself', 'over-explain', 'feedback'] },
  { id: 'do_job', day: 12, part: '16', q: 'Fastest route to a manager role?', a: 'Do the manager\'s job in small, with permission, before you get the title.', keys: ['small', 'permission'] },

  // Day 13: feedback and hiring
  { id: 'sbi', day: 13, part: '16', q: 'SBI feedback?', a: 'Situation, Behaviour, Impact. Specific, observable, then ask for their view.', keys: ['situation', 'behaviour', 'impact'] },
  { id: 'candor', day: 13, part: '16', q: 'Radical Candor in four words?', a: 'Care personally, challenge directly.', keys: ['care', 'challenge'] },
  { id: 'prep', day: 13, part: '8', q: 'Asked to "say a few words" without warning?', a: 'PREP: Point, Reason, Example, Point: about 45 seconds.', keys: ['point', 'reason', 'example'] },
  { id: 'feedback_gift', day: 13, part: '8', q: 'He gives you blunt negative feedback.', a: 'Thank, clarify (ask for one example), change, report back in 4-6 weeks.', keys: ['thank', 'clarify', 'change', 'report'] },
  { id: 'bias', day: 13, part: '16', q: 'Two bias traps in hiring?', a: 'Affinity bias (liking people like you) and the halo effect (one strength colouring everything). Use the same questions and evidence for every candidate.', keys: ['affinity', 'halo', 'same'] },

  // Day 14: the panel
  { id: 'star', day: 14, part: '16', q: 'STAR?', a: 'Situation, Task, Action, Result, with ownership verbs ("I decided", "I set") and a number in the result.', keys: ['situation', 'task', 'action', 'result'] },
  { id: 'own_verbs', day: 14, part: '11', q: 'Presence for a "quiet backbone", three habits?', a: 'Speak in the first ten minutes; use ownership verbs; pause before answering and end sentences down.', keys: ['first ten', 'ownership', 'pause'] },
  { id: 's5', day: 14, part: '5', q: '"Why haven\'t you been promoted already?"', a: 'Partly timing (seats open rarely), partly me (my evidence is my own delivery, not leading a team), which is the gap I\'m closing. Never blame.', keys: ['timing', 'gap', 'blame'] },
  { id: 'multiply', day: 14, part: '3', q: 'What must your manager evidence prove?', a: 'That you multiply people, not just output.', keys: ['multiply', 'people'] },

  // Day 15: politics
  { id: 'rumours', day: 15, part: '8', q: 'Restructure rumours. Your posture?', a: 'In rumours, be the calm one: don\'t speculate or spread, keep delivering, listen.', keys: ['calm', 'speculate'] },
  { id: 'bridge', day: 15, part: '8', q: 'Two senior leaders you depend on disagree.', a: 'Be the bridge, not the battlefield: no public sides, facts to both, suggest they talk directly.', keys: ['bridge', 'battlefield'] },
  { id: 'discretion', day: 15, part: '8', q: 'The Executive asks for information about your division you shouldn\'t share.', a: 'Discretion is the price of trust: decline politely and point to the right person.', keys: ['discretion', 'right person'] },
  { id: 'prewire', day: 15, part: '15', q: 'The Political Navigator\'s hook?', a: 'Pre-wire, keep quiet, no surprises.', keys: ['pre-wire', 'surprises'] },
  { id: 'loyal_private', day: 15, part: '8', q: 'Your sponsor is criticised by someone more senior in a meeting.', a: 'Loyalty is shown in private; facts are offered in public.', keys: ['private', 'facts'] },
  { id: 'warnings', day: 15, part: '8', q: 'Someone warns you "be careful, he\'s political".', a: 'Collect perspectives; trust patterns, not warnings. Don\'t pass it on.', keys: ['patterns', 'warnings'] },

  // Day 16: the underperformer
  { id: 'ccp', day: 16, part: '8', q: 'A teammate is struggling and it\'s affecting delivery.', a: 'Care first, clarity second, plan third.', keys: ['care', 'clarity', 'plan'] },
  { id: 'safety_candor', day: 16, part: '16', q: 'Psychological safety vs candour?', a: 'Not opposites. Safety makes candour possible; candour makes safety worth having.', keys: ['not opposites', 'safety', 'candour'] },

  // Day 17: culture lens and archetypes
  { id: 'culture3', day: 17, part: '18', q: 'The cross-cultural rule for a Vietnam-based leader?', a: 'Vietnamese respect in form, Singapore crispness in content, Australian candour in bad news.', keys: ['respect', 'crispness', 'candour'] },
  { id: 'au_yes', day: 17, part: '18', q: 'What "yes" usually means: Vietnam / Singapore / Australia?', a: 'Vietnam: often "I heard you". Singapore: usually yes. Australia: yes (and "maybe" means no).', keys: ['heard', 'maybe'] },
  { id: 'control_speed', day: 17, part: '15', q: 'The Risk Guardian\'s hook?', a: 'Lead with control, not speed. "Speed is the side effect; what we optimised for was traceability."', keys: ['control', 'speed', 'traceability'] },
  { id: 'pause_first', day: 17, part: '8', q: 'A data or privacy concern about your AI tooling is raised.', a: 'In a bank, pause first, explain second. Engage Risk, document what data went where, don\'t minimise.', keys: ['pause', 'explain'] },
  { id: 'diag', day: 17, part: '15', q: 'Their first question is "How did you measure that?" Which archetype, and your first move?', a: 'Data-Driven Sceptic, label the number and show the methodology.', keys: ['sceptic', 'label', 'method'] },
  { id: 'visionary', day: 17, part: '15', q: 'The Visionary Executive\'s hook?', a: 'Show the future working, small.', keys: ['future', 'working', 'small'] },
  { id: 'operator', day: 17, part: '15', q: 'The Overloaded Operator\'s hook?', a: 'Subtract, don\'t add. "You\'ll only hear from me if I need a decision."', keys: ['subtract'] },
  { id: 'craft_g', day: 17, part: '15', q: 'The Craft Guardian\'s hook?', a: 'AI serves craft; wins come home to the chapter.', keys: ['craft', 'chapter'] },

  // Day 18: Melbourne
  { id: 'red_steer', day: 18, part: '8', q: 'Your project is red at the steering committee.', a: 'No surprises: BLUF-R privately beforehand; in the room, the recovery plan, not the excuse.', keys: ['surprises', 'privately', 'recovery'] },
  { id: 'headline_q', day: 18, part: '15', q: '"What\'s the headline?", what does that tell you?', a: 'Group-level executive: give one story, one number, and credit your own exec.', keys: ['one story', 'one number'] },
  { id: 'peer_leader', day: 18, part: '15', q: 'The Peer Leader\'s hook?', a: 'Today\'s peer is tomorrow\'s sponsor or blocker.', keys: ['sponsor', 'blocker'] },

  // Day 19: org and bench
  { id: 'three_sponsors', day: 19, part: '10', q: 'The rule of three sponsors?', a: 'Three senior people who would each independently say you should lead. A single sponsor is a single point of failure.', keys: ['three', 'single point'] },
  { id: 'network', day: 19, part: '10', q: 'Network shape and ritual?', a: '3 sponsors, 8 advocates, 30 friends, and a Friday 15 minutes (one result note, one thanks).', keys: ['3', '8', '30', 'friday'] },
  { id: 'ask_missing', day: 19, part: '8', q: 'He gives your idea to someone else to lead.', a: 'Ask what was missing, then supply it. Offer to support.', keys: ['missing', 'support'] },
  { id: 'lose_well', day: 19, part: '8', q: 'You lose a role he backed you for.', a: 'Lose gracefully; sponsors watch how you lose more than how you win. Thank him, ask for feedback, congratulate the winner publicly.', keys: ['gracefully', 'feedback', 'congratulate'] },
  { id: 'declare', day: 19, part: '12', q: 'External work becomes known.', a: 'Declared early, it\'s a footnote. Discovered late, it\'s a headline.', keys: ['declared', 'footnote', 'headline'] },

  // Day 20: incident and ethics
  { id: 'integrity', day: 20, part: '8', q: 'The integrity line?', a: 'No sponsor is worth your integrity. Decline privately, propose a compliant alternative, escalate properly if pressed.', keys: ['integrity', 'alternative'] },
  { id: 'one_sponsor', day: 20, part: '8', q: 'Your sponsor leaves the company.', a: 'Never have only one sponsor. Congratulate him, keep in touch, ask for one introduction, strengthen the others.', keys: ['only one', 'introduction'] },
  { id: 'recovery', day: 20, part: '8', q: 'You make a serious mistake on his project.', a: 'BLUF-R immediately, then over-deliver on the recovery. The recovery is remembered longer than the mistake.', keys: ['recovery', 'remembered'] },
  { id: 'ethics5', day: 20, part: '12', q: 'The manipulation test?', a: '"Would I be comfortable if he saw my notes?" Influence helps someone see what\'s true and useful; manipulation doesn\'t.', keys: ['notes', 'comfortable'] },

  // Day 21: the plan
  { id: 'plan_arc', day: 21, part: '13', q: 'Thirty, ninety, three-sixty-five?', a: 'Thirty days to "interested", ninety to "trusted", a year to "leading".', keys: ['interested', 'trusted', 'leading'] },
  { id: 'cadence', day: 21, part: '6', q: 'Contact cadence with a non-line executive after month one?', a: 'One meaningful touchpoint every 4-6 weeks.', keys: ['4', '6', 'weeks'] },
  { id: 'part0', day: 21, part: '0', q: 'Part 0 in one breath?', a: 'Tell your manager. Send CUP. Ask advice. Bring one gift. Leave early.', keys: ['manager', 'cup', 'advice', 'gift', 'leave'] },
];

export const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));
export function unlockedCards(day) { return CARDS.filter(c => c.day <= day).map(c => c.id); }
