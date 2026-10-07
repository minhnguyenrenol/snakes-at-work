# The Long Game — build plan (v1, 4 Oct 2026)

Built from Minh's two documents: the game design plan (structure, systems, cast, art direction) and the
*Under the Wing* handbook (all teaching content). Where the plan's 10-minute sessions and the request for
45–60 minutes a day over three weeks disagree, the request wins: the plan's 10-minute loop becomes one block
inside a longer daily session, and the 10-level career is compressed into a 21-day arc.

## 1. Learning design (why each part exists)

| Mechanic | Evidence | How it shows up |
|---|---|---|
| Active production, unlimited replay, paired with the handbook | Sitzmann 2011 (simulation games: +14% procedural knowledge only when active and replayable) | Every scenario asks you to choose, write or rehearse aloud; rewind is unlimited except in boss fights |
| Rich, specific feedback | Clark, Tanner-Smith & Killingsworth 2016 (enhanced designs beat basic ones) | Debrief = grade, one strength, one fix, one model line, one hook — never more |
| Retrieval practice + spacing | Roediger & Karpicke 2006; Karpicke & Roediger 2007/2008; Cepeda et al. 2006 | Daily Dojo with Leitner boxes (1, 2, 4, 8, 16 days); you type the answer before the card flips |
| Pretesting / errorful generation | Kornell, Hays & Bjork 2009; Richland et al. 2009 | Each lesson opens with a "predict first" question before the teaching card |
| Worked examples, then fading | Sweller's worked-example effect; Renkl's fading | Weaker/stronger dialogue pairs (handbook Part 17), then hints that fade from nudge to framework to model |
| Interleaving | Rohrer & Taylor 2007; Kornell & Bjork 2008 | Dojo mixes cards across parts; Week 3 retests Week 1 scenarios |
| Deliberate practice at the edge | Ericsson et al. 1993 | One skill per scenario, difficulty ①②③, boss fights as integrated tests |
| Self-determination (autonomy, competence, relatedness) | Ryan & Deci 2000 | Branch choice on Day 11, visible mastery (gold-leaf cards, radar), NPCs who remember you |
| Informational, not controlling, rewards | Deci, Koestner & Ryan 1999; Deterding et al. 2011 | No streak loss, no loot, no public leaderboard; XP is shown and explicitly does not promote you |
| Implementation intentions for transfer | Gollwitzer 1999; Gollwitzer & Sheeran 2006 | Evening "Real Move": a when-where-what commitment, checked the next morning |
| Metacognitive reflection | Di Stefano et al. 2014 (reflection improved later performance) | One-line evening reflection each day |
| Delayed consequences | Design plan pillar P2 | NPC memory tags from early choices inject "echo" scenarios days later |

## 2. The 21-day arc (about 45–60 minutes a day)

Daily shape: Morning brief (2) → Dojo (6–8) → T+10 lesson (6–8) → 4–7 scenarios (20–30) → drill (5) →
boss on gate days (12–15) → evening debrief and Real Move (3).

| Day | Floor / level | Theme | Gate |
|---|---|---|---|
| 1 | 6 · L1 | The Slide: tell your line first, CUP first message, timing | |
| 2 | 6 | Silence: study him like a user, nudge with news, yes deserves speed | |
| 3 | 6 | The Coffee: run-sheet, 70/30, story with a thread, "is that real?" | |
| 4 | 6 | The Follow-Up: 24-hour note, deliver the gift, correct yourself, Useful→Trusted→Mine | |
| 5 | 6→7 | The Lunch | **Boss: The Lunch** |
| 6 | 7 · L2 | The Gift: 3-30-3 encounters, the lift with the Group Exec, rival to co-author | |
| 7 | 7→9 | The Number | **Boss: The Challenge** |
| 8 | 9 · L3 | The One-Pager: four boxes, his language, rejected proposals | |
| 9 | 9 | First Team and Bad News: BLUF-R, "yes means maybe", own it and fix the control | |
| 10 | 9→11 | Results | **Boss: The Ask** |
| 11 | 11 | Career Conversation: manager or principal, offers, never leverage, branch choice | |
| 12 | 11 · L4 | Week One as Manager: listening tour, 1:1 mode, branch chapter | |
| 13 | 11 | Hard Feedback and Hiring: SBI, Radical Candor, bias traps, PREP | |
| 14 | 11→12 | STAR stories | **Boss: The Panel** |
| 15 | 12 · L5 | The Middle: rumours, two sponsors disagree, discretion, retest of Day 1 | |
| 16 | 12→15 | Care and clarity | **Boss: The Underperformer** |
| 17 | 15 · L6 | Culture Lens: Vietnam, Singapore, Australia; Risk Guardian; privacy pause | |
| 18 | 15→18 | Steering committee and dinner | **Boss: Melbourne** |
| 19 | 18–21 · L7–L8 | The Org and The Bench: restructure, sponsee's ask, succession, external voice | |
| 20 | 21→24 · L9 | Sponsor leaves, ethics test | **Boss: The Incident** |
| 21 | 24→27 · L10 | Retest, 30/90/365 plan | **Final: The Board**, ending and T+10 letter |

Promotion needs evidence cards and sponsors at the right rung, never XP (plan §6.4). A gate that is not met
says exactly what is missing and links to the scenario that earns it; the handbook's "Friday 15 minutes"
ritual is a repeatable note that builds a relationship, so no player can get stuck.

## 3. Product decisions

- **Platform:** a self-contained web game published as a private claude.ai Artifact (no repo attached to the project).
- **Saves:** private per-player document in the artifact's database (`data/users/<id>/save`), mirrored to browser
  storage for instant load; export/import of a JSON backup.
- **AI coach:** typed and spoken answers are graded by Claude through the artifact's `sample` capability on the
  player's own account, against the plan's 7-dimension rubric, validated and clamped. If Claude is unavailable or
  switched off, a rule-based grader takes over and the grade is marked provisional (plan §16.4).
- **Speaking:** artifact pages cannot open the microphone, so "Speak" mode is a timed out-loud rehearsal with a
  timer ring, followed by typing the gist for grading. NPC lines can be read aloud with the device voice.
- **Discretion:** fictional cast from the plan §10; no employer name, no real colleague names; a private relabel
  setting stays on the device only (plan §10, handbook R5/R7).
- **Stack:** vanilla ES modules, no build step, so the published files are the tested files. Pure engine modules
  are unit-tested in Node; flows are tested in Chromium with Playwright.

## 4. What we borrow from popular games (added after Minh's note on SimCity)

| Game | What makes it work | What The Long Game takes |
|---|---|---|
| **SimCity** | You never control people directly; you shape systems and *see* the consequences grow (lights, traffic, data-map overlays). | The Tower and the **Network map**: your stakeholders orbit the tower as lit buildings whose glow is their rung; overlay toggles (Trust, Visibility, Sponsors) show the system, the way SimCity's data maps do. Floors light up as you rise. |
| **Persona 3–5** | A calendar with limited time slots and "social links" that rank up only through repeated, well-chosen time together. | **Free slot** each day: pick one of two or three optional investments (a Tier-2 coffee, the Friday 15 note, rest). Time is a currency (handbook 3.9); relationships climb rungs, never by grinding. |
| **Reigns** | Tiny decisions, four visible bars, consequences you feel instantly and some that bite much later. | Seven stat bars that move after each choice with floating deltas; NPC memory tags that resurface as echo scenarios days later. |
| **Disco Elysium** | Inner voices (skills) argue in your head and give advice of uneven quality. | Hints arrive as inner voices: *the Researcher* nudges, *the Strategist* gives the framework, *T+10* shows a model. |
| **Hades** | Failing a boss is part of the story and you return stronger. | A failed gate becomes a "Not yet — show me X" quest with targeted practice, then a retry. |
| **Stardew Valley** | A calm daily rhythm, a satisfying end-of-day tally, no punishment for a slow day. | Morning brief and evening tally; "days practised this month" instead of a fragile streak; a weekly rest token. |
| **Duolingo** (what to copy and what not) | Short spaced practice works; loss-aversion streaks and guilt notifications don't serve adults. | The Dojo's spaced retrieval, without streak pressure or nags (plan §15.2). |
| **Papers, Please / Frostpunk** | Hard trade-offs under constraint reveal values. | The Restructure and the Ethics test: no option wins everything; the debrief names what you protected and what you spent. |
