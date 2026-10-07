// The script library: the handbook's ready-to-say lines (Part 5.2, Appendices B to E), with fictional names.
// Each script: id, title, when, text, why (optional), scn (scenes that practise it).

export const SCRIPT_GROUPS = [
  {
    id: 'career', title: 'Career moments', sub: 'Say these aloud until they sound like you.',
    items: [
      { id: 'S1', title: 'S1: "What do you do exactly?"', when: '10 seconds', scn: ['d3_about', 'd2_pitch'],
        text: 'I\'m a product designer in Trading: I design the tools that keep our regulatory reporting fast and auditable, and lately I\'ve been figuring out how AI changes the way design gets done.' },
      { id: 'S2', title: 'S2: "So what do you want to do next?"', when: '30 seconds. Memorise this one.', scn: ['d5_s2', 'boss_lunch'],
        text: 'Honestly, I want to lead. I\'ve seen on Lantern what one designer can do with a disciplined AI method. The next step is making that repeatable across a team and a portfolio: leading a few designers, working closely with product and engineering, and proving it on something that really matters to the bank. I\'d like to do that here. I\'m still working out the best route, so I\'d value your view.',
        why: 'States the ambition without demanding a title, ties it to his thesis, signals loyalty, and ends with a request for advice so he decides whether to step forward.' },
      { id: 'S3', title: 'S3: When he hints you might fit his team', when: '20 seconds', scn: ['d11_lateral'],
        text: 'That would genuinely excite me: the work in Client Platforms is close to where I want to grow. I\'d want to do it properly with {ethan.s} and my current leads, so we don\'t leave Lantern in a bad place. What would you see me doing, ideally?',
        why: 'Enthusiasm, loyalty to current commitments, and a question that makes him define the role.' },
      { id: 'S4', title: 'S4: The explicit sponsorship ask', when: 'Only at the top rung. 40 seconds.', scn: ['d10_s4', 'boss_ask'],
        text: 'Anh {khai.s}, can I be direct about something? I\'d like to step into a lead role: leading a small team that does AI-accelerated, auditable delivery, ideally on one of your priorities. I think I\'ve shown the method works; I haven\'t yet shown I can lead people doing it, and I want the chance to. Would you back me for that? And if not yet, what would you need to see?',
        why: 'Direct, names the gap honestly, and gives him an easy "not yet" with a learning question attached.' },
      { id: 'S5', title: 'S5: "Why haven\'t you been promoted already?"', when: '20 seconds', scn: ['boss_panel', 'boss_lunch'],
        text: 'Partly timing: manager seats in our chapter open rarely. Partly me: my strongest evidence has been my own delivery and teaching, not leading a team formally. That\'s exactly the gap I\'m trying to close, which is why I\'m so interested in initiatives where I can lead people.',
        why: 'Honest, no blame, ends on the forward plan. Never blame your manager, the chapter or the bank.' },
      { id: 'S6', title: 'S6: The Skills Guild question', when: '30 seconds', scn: ['d11_offer', 'd11_thesis'],
        text: 'Yes, I\'ve applied. It came out of the AI uplift workshops I ran with them for BAs and POs. The common thread for me is the same: making AI-era ways of working real for many people, not just me. Whether that\'s through teaching at scale or leading a delivery team, that\'s the work I want to do. If you have a view on which route is better for the bank, I\'d really value it.' },
    ],
  },
  {
    id: 'responses', title: 'When he answers your ask', sub: 'What each answer usually means, and your next move.',
    items: [
      { id: 'R1', title: '"Yes, let me see what I can do."', when: 'Genuine intent, uncertain timing', scn: ['boss_ask'], text: 'Thank you. What\'s the most useful thing I can do in the meantime?', why: 'Then deliver it, and check in at four to six weeks with a result, not a reminder.' },
      { id: 'R2', title: '"Not yet. You need X."', when: 'He is taking you seriously', scn: ['boss_ask', 'd12_expect'], text: 'That\'s really useful. Can I write that down exactly? I\'ll put together a 90-day plan to show it and come back to you at 45 and 90 days.', why: 'The best possible answer after a yes.' },
      { id: 'R3', title: '"Talk to your manager."', when: 'Protocol, or a polite deflection', scn: ['boss_ask', 'd8_lan'], text: 'I spoke to {ethan.s} as you suggested; he\'s supportive of me exploring a lead role. Would it help if the three of us talked?' },
      { id: 'R4', title: '"Have you thought about a different role?"', when: 'He sees you differently', scn: ['d11_branch'], text: 'Tell me more: what makes you think that fits?', why: 'Don\'t defend. Collect data.' },
      { id: 'R5', title: '"No budget or headcount right now."', when: 'Often true early in a financial year', scn: ['d11_lateral'], text: 'Understood. If something opens up next year, I\'d love to be considered. Meanwhile, is there a problem I could help with as a stretch project?' },
    ],
  },
  {
    id: 'messages', title: 'Message library', sub: 'Short, specific, one question mark at most.',
    items: [
      { id: 'B1', title: 'First message (CUP)', when: 'About 70 words', scn: ['d1_message', 'd15_retest'],
        text: 'Hi anh {khai.s}, it was great chatting briefly last week, thank you for the kind words on the Lantern slide. If you\'re open to it, I\'d love to buy you a coffee this week or next and hear how you see AI changing delivery across Client Platforms. Happy to bring the live prototype: it takes 5 minutes to show. Whatever time suits you works for me.' },
      { id: 'B6', title: 'Thank-you after coffee', when: 'Within 24 hours', scn: ['d4_thanks'],
        text: 'Thank you for the coffee, anh {khai.s}. Your point about where the bottleneck moves really stuck with me. As promised, here\'s the one-pager on the method. I\'ve reached out to {sarah.s} about a session for her team; I\'ll let you know how it goes.' },
      { id: 'B7', title: 'Report-back on a delivered gift', when: 'Three lines', scn: ['d6_report'],
        text: 'Anh {khai.s}, quick update: we ran the AI design-method session for {sarah.s}\'s team. 18 attended, 4.6 out of 5, and two teams want to try it on their next epic. Thanks again for the connection.' },
      { id: 'B8', title: 'Six-week news touch', when: 'One number, no ask', scn: ['d2_nudge', 'd10_results'],
        text: 'Anh {khai.s}, thought you\'d like to know: the pilot cut discovery to sign-off from 19 days to 8. Next we\'re testing it with a second squad. No action needed.' },
      { id: 'B9', title: 'Asking for a second meeting', when: 'After a result', scn: ['d4_silence'],
        text: 'Anh {khai.s}, it\'s been a couple of months since our coffee and a few things have moved: the method session ran for two lending teams. Would you be open to lunch sometime in the next few weeks? I\'d love your advice on where to take the method next.' },
      { id: 'B10', title: 'Sharing a proposal', when: 'One page, one decision', scn: ['d8_headline', 'd8_order'],
        text: 'Anh {khai.s}, following our conversation, here\'s a one-page proposal for a 6-week pilot on the lending epic. The ask is small: one product owner who wants to go fast. Happy to walk you through it in 15 minutes.' },
      { id: 'B11', title: 'He hears it from you', when: 'Before the news travels', scn: ['d19_declare', 'd19_lost'],
        text: 'Anh {khai.s}, I wanted you to hear it from me: the Skills Guild panel went with another candidate. It means I\'m fully on the delivery-lead path. I\'d value 15 minutes of your advice if you have it.' },
      { id: 'B13', title: 'Correcting a mistake', when: 'Same day', scn: ['d4_correct', 'd20_mistake'],
        text: 'Anh {khai.s}, one correction from our chat: I said "about a year"; it\'s actually our team\'s informal estimate, not a measured baseline. Didn\'t want the wrong figure travelling.' },
      { id: 'B14', title: 'Vietnamese thank-you', when: 'When the relationship is Vietnamese-first', scn: ['d4_thanks'],
        text: 'Em cảm ơn anh {khai.s} đã dành thời gian hôm nay ạ. Em rất tâm đắc ý anh chia sẻ về nơi điểm nghẽn sẽ dịch chuyển. Em gửi anh bản tóm tắt một trang như đã hứa, và em sẽ cập nhật anh khi buổi chia sẻ với team xong.' },
    ],
  },
  {
    id: 'questions', title: 'Question bank', sub: 'Questions that show judgement. Pick four to six for any meeting.',
    items: [
      { id: 'Q1', title: 'His world', when: 'First coffee', scn: ['d3_coffee', 'd2_study'], text: 'What are you most focused on for next year?\nYou said Vietnam is moving faster on AI: what\'s driving it, and what\'s the risk?\nWhere in Client Platforms is the gap biggest between how fast teams could move and how fast they do?\nWhat does a great product and design partner look like to you?' },
      { id: 'Q2', title: 'His story', when: 'Lunch', scn: ['boss_lunch', 'd5_questions'], text: 'Which bank were you with in Singapore, and what did you take away from it?\nWhat made you come back to Vietnam?\nWhat\'s a decision you\'re proud of?\nWhat\'s something you changed your mind about recently?' },
      { id: 'Q3', title: 'Judgement', when: 'Lunch and later', scn: ['d5_questions'], text: 'If AI makes delivery five times faster, where does the bottleneck move?\nWhat would make you confident to give a Vietnam team full ownership of a capability?\nWhat separates the leaders you back from the ones you don\'t?\nWhat should a design leader in an AI-era bank stop doing?' },
      { id: 'Q4', title: 'About you', when: 'Only once he is advising you', scn: ['d3_coffee', 'd10_rung'], text: 'What would you want to see from someone like me in the next year?\nWhat\'s one thing I should do more of, or less of, when I present to senior leaders?\nWho else should I learn from?\nWhat would make you confident someone is ready to lead a team?' },
    ],
  },
  {
    id: 'phrases', title: 'Phrase bank', sub: 'Vietnamese and English for the same moment.',
    items: [
      { id: 'P1', title: 'Offering coffee', text: 'Anh uống gì ạ, để em mời.\nWhat would you like? It\'s on me.', scn: ['d3_coffee'] },
      { id: 'P2', title: 'Asking advice', text: 'Em xin phép hỏi ý kiến anh một chút.\nCould I ask your advice on something?', scn: ['d10_rung'] },
      { id: 'P3', title: 'Buying time', text: 'Câu hỏi hay quá, anh cho em nghĩ một chút.\nGood question. Let me think for a second.', scn: ['d7_idk', 'd3_real'] },
      { id: 'P4', title: 'Not knowing', text: 'Em chưa chắc, em sẽ kiểm tra và báo lại anh trước thứ Năm.\nI don\'t know yet. I\'ll confirm by Thursday.', scn: ['d7_idk'] },
      { id: 'P5', title: 'Respectful disagreement', text: 'Em xin phép góp một góc nhìn hơi khác.\nCan I offer a slightly different angle?', scn: ['d7_challenge', 'd17_raj'] },
      { id: 'P6', title: 'Accepting he pays', text: 'Dạ em cảm ơn anh, lần sau em mời anh nhé.\nThank you. Next one\'s on me.', scn: ['d3_bill'] },
      { id: 'P7', title: 'Closing', text: 'Em không làm mất thêm thời gian của anh nữa ạ.\nI won\'t keep you any longer.', scn: ['d3_coffee'] },
    ],
  },
  {
    id: 'onepager', title: 'One-page proposal', sub: 'The template behind every pilot you pitch.',
    items: [
      { id: 'OP', title: 'One-pager template', when: 'One decision at the bottom', scn: ['d8_order', 'd8_headline'],
        text: 'HEADLINE: verb, outcome, time. "Cut discovery time on the lending epic by half in 6 weeks, with full decision traceability."\nWHY NOW: his priority in his words; the bank\'s simpler-and-faster story.\nWHAT WE\'LL DO: weeks 1-2 baseline and set-up; weeks 3-5 run discovery with the method and send weekly three-line updates; week 6 compare and recommend scale, adjust or stop.\nWHAT IT COSTS: people and hours; approved tools only.\nHOW WE\'LL MEASURE: discovery-to-sign-off days; review rounds and defects after handoff; the team\'s intent to keep the method.\nGUARDRAILS: no customer data in prompts; human review on every AI output; a decision log; an accessibility check.\nTHE ASK: one decision. Pick the epic, nominate a PO, or approve six weeks.' },
    ],
  },
];
export const SCRIPTS = SCRIPT_GROUPS.flatMap(g => g.items.map(it => ({ ...it, group: g.id })));
