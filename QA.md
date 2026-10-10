# QA record (4 Oct 2026)

| Check | Command | Result |
|---|---|---|
| Engine and content tests | `node --test tests/*.test.mjs` | 19/19 pass |
| Desktop playthrough, light, no Claude | `node tests/e2e.mjs 4 1280 light none` | 4 days, 27 scenes, no page errors |
| Mobile playthrough, dark, mocked Claude + db | `node tests/e2e.mjs 3 390 dark claude` | 3 days, 21 scenes, db writes and grading prompts made, no errors |
| Desktop playthrough, dark, mocked Claude | `node tests/e2e.mjs 2 1280 dark claude` | 2 days, no errors |
| Accessibility | `TLG_TOOLS=<tools dir> node tests/a11y.mjs` | axe WCAG 2.2 AA + best practice: 0 violations on 14 routes, light and dark, 1280 and 390 |
| Design lint | `impeccable detect --json app/styles.css app/js` | 0 findings |
| Reduced motion | manual script | cinematics render as a still final frame, no Skip button, Replay is opt-in |
| Mobile overflow | manual script | no horizontal scroll on 7 routes at 390px |

Screenshots: qa/shots/<width>-<scheme>-<mock>/.

## Fixed during QA
- Mobile pages were 100 to 140px wider than the screen (grid column sized to the top bar). Fixed with `minmax(0, 1fr)`.
- Cinematics snapped back to frame 0 when they ended. They now hold the last frame.
- People map clipped the bottom name label.
- Day step strip did not line up with the step below it.
- Headings: every route now has one h1 and no skipped levels; html lang set; floor plan roles fixed.
- Bars animated `width`; now `transform: scaleX`. Bounce easing on the grade stamp replaced. Teams composer border tidied.
- Dark mode: current nav item was invisible; verdict chip stretched full width.
- Grading prompt: player text can no longer close the answer fence.

## Known limits
- The test sandbox cannot always reach Google Fonts, so some screenshots show fallback fonts.
- The autoplayer plays the same answer each time, so it does not reach late-arc promotions; gates and promotions are covered by engine tests.

## Version 2 QA (5 Oct 2026)
- Unit and content tests: 23/23 (new: every scene has an insight, valid risks and two follow-ups of 55 to 90 words; scripts point at real scenes; no real names in v2 content; every cast member has a voice).
- tests/v2.mjs walkthrough (Atlas filters and search, run queue, seven scene sheets across modes, follow-up reveal, spoken film, scripts, dossier, lessons, drill, settings, a practice run that leaves the save alone): pass at 1280 light, 390 dark, and 1280 dark with reduced motion (films hidden, audio and transcript kept). No sideways scroll on any new page.
- 3-day playthrough with mocked Claude: no page errors.
- axe WCAG 2.2 AA over 23 routes in light and dark: no violations.
- impeccable detect over styles and UI code: no findings.
- Fixed during QA: quoted lines inside narration ("He said: '...'") were cast to the scene's character; now the narrator reads them and 55 clips were re-recorded. Hidden panels were shown because component `display` overrode `hidden`; a global `[hidden]` rule fixes it. Spoken films were unreadable on phones; they now switch to a tall layout under 560px.
- Known limits: option responses and NPC reactions to your choices are not recorded (text only); a renamed player hears the device voice on lines that say their name; sample answers average about 69 words (range 58 to 79).

## Version 3 QA (6 Oct 2026)
- Unit tests 23/23, including a banned-names check (kept private) and depth checks for the trap follow-ups.
- tests/snakes.mjs passes at 1280 dark, 1280 light reduced motion and 390 dark: seeds 3 venom, fails a scene (strike film, then becoming film), checks the venom chip, banner, den and snake portrait, then redeems and sheds.
- tests/v2.mjs (139 scenes) at 1280 light, 390 dark and 1280 dark reduced: pass. e2e play-through: pass. axe sweep now covers #den, a trap script sheet and a trap scene.
- Fixed during QA: the films were too small inside the dialog panel; the NỌC stamp glyph; drops overlapping the becoming title; on phones the films now switch to a tall 720x1080 layout with captions under the snake.
- Voices: 98 new clips recorded for the trap scenes and renamed lines; 1185 clips in 22 sprites, 57 MB.
- axe at 390px reports target-size on the Atlas filter selects only because, with the new Snake den tile, they start at the bottom edge of the first screen behind the fixed tab bar; they scroll clear and are 34px tall. Accepted, no other violations.

## Version 4 QA (10 Oct 2026)
- New: script prompter (Settings switch, a button on every challenge and on the follow-up drill) and the Study library (#study: every challenge, answer, follow-up with sample answer and script, with search, week and mode filters, and a .md export).
- The prompter costs one hint of XP on a challenge (recorded as an aided attempt) and never changes the grade or the snake rules.
- tests/study.mjs passes at 1280 dark, 390 dark and 1280 light with reduced motion. Unit, snake, v2 and e2e runs still pass.
- axe at 390px flags one study row only because it sits at the bottom edge behind the fixed tab bar until scrolled; same accepted artifact as the Atlas filters.
