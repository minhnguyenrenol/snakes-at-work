# The Long Game — build progress (resume from here)

If a session resumes after a pause, read this file first, then PLAN.md. Update the checklist as work lands.

## Done
- PLAN.md: learning design, 21-day arc, product decisions, game inspirations.
- Engine (app/js/engine): rubric.js, grader.js (rule grader + Claude prompt/validator), srs.js, game.js (saves, attempts, derive, gates, schedule, promises, endings), text.js (token fill for names + check regexes).
- Content (app/js/content): npcs.js, cards.js (124 hook cards), week1.js / week2.js / week3.js (21 lessons, 125 scenarios, 21 days), meta.js (EVIDENCE, SLOTS, LEVELS, PLACES), index.js (aggregates; checksFor follows checksRef).
- tests/content.test.mjs written (validation of refs, model answers ≥A, weak answers ≤C, gates, banned real names, tokens). NOT yet run at time of writing.

## Content conventions the UI must honour
- Tokens {khai} {khai.s} … {me}: fill() for display, fillChecks() before ruleGrade.
- Scenario extras: `checksRef` (scenario or beat.type), `branchChoice` + option `branch` ('manager'|'principal') sets save.branch, scenario `branch` filters steps, option `when` (tags required to show), `retestOf`, `resolves` (promise id kept when graded ≥B), option/beat `promise`, `discover {npc,pref}`, beat `altLine {tag,line}`, beat `speaker`, `narr`, `window`+`timeout` (timed), convo `meter:'talk'` + `meterTarget`, boss `gate`, `promote {level,floor,title,titleP}`, `pass`, `result {SA,B,CD}`, `final` (board → ending + T+10 letter).
- Places: desk teams cafe lift pantry meeting restaurant townhall office melbourne boardroom warroom.
- Slots: friday15 (pick an NPC; +npcFx), rest, policy, lan_coffee, viva, antoine_coffee, help_bao, mentor_vy.

## Design skills
- impeccable, taste and Remotion skills fetched from GitHub on 4 Oct (not installed in this cloud project); copies in design-skills/. See DESIGN.md.

## Status (4 Oct, evening): built, tested, ready to publish
- All UI written: store, sound, core, scenario, day, views, more, main router, cinematics (app/js/cine, Remotion Player), styles.css redesign.
- QA done: see QA.md. Security review: SECURITY.md.
- Build: `TLG_TOOLS=<dir containing node_modules with esbuild, react, react-dom, remotion, @remotion/player, axe-core> node build.mjs` writes dist/index.html. The tools dir is in the session scratchpad and is lost when the session ends; reinstall with `npm i esbuild react react-dom remotion@4 @remotion/player@4 axe-core` into any folder.
- Tests: `node --test tests/*.test.mjs`, `node tests/e2e.mjs <days> <width> <light|dark> <none|claude>`, `node tests/a11y.mjs`.

## Next
1. Publish dist/index.html as an Artifact (capabilities db, user, sample, downloads; icon game).
2. Minh reviews; apply feedback.

## Version 2 (started 5 Oct): Minh's feedback round
Ask (5 Oct): more insight from Minh's own profile on every scenario; a sitemap-style resource place to practise everything at once; scripts for every scene; follow-up questions with ~80-word sample answers; more sound; Remotion "spoken video" effects; natural, non-robotic narration. Republish to the SAME artifact URL https://claude.ai/artifact/HugBDUCBBX1vn3vf2Vo2L7 (source file: scratchpad/the-long-game.html, or pass url).

Plan and state (tick as done):
- [x] content/profile.js: fictionalised dossier from handbook Part 1.4-2.3 (thesis, strengths, gaps, risks H1-H10 without real names).
- [x] content/deep.js: per scenario { you (why it matters for Minh), risk [H#], follow [{by, q, a ~80 words} x2] }. Written in batches: d1-d5, d6-d8, d9-d11, d12-d14, d15-d17, d18-d21.
- [x] content/scripts.js: script library (S1-S6, CUP templates, phrase banks), fictional names.
- [x] Voice: Kokoro-82M (npm kokoro-q8-shards weights + kokoro-js voices; HF/GitHub blocked, npm/PyPI allowed) rendered offline with python kokoro-onnx, 4 parallel single-thread workers (~2.2x realtime). Pipeline in voice/: extract.mjs -> jobs.json, render.py -> voice/cache/<id>.mp3 + .json (persists in project files), pack.mjs -> dist/audio/day-N.mp3 sprites (concatenated CBR MP3 slices) + dist/audio/index.json. Runtime slices bytes into Blob URLs; falls back to browser speech if a clip is missing or its text hash is stale.
- [x] UI: #atlas (sitemap of every scene/lesson/card/script with filters, search, practise queue), script view, follow-up drill in debrief and atlas, "For you" insight panel, dossier page.
- [x] Remotion "Spoken" composition: portrait + amplitude-driven mouth + karaoke captions, synced to clip audio.
- [x] Sound: ambience per place (generative WebAudio), volume controls.
- [x] Tests, axe, impeccable detect, e2e, security notes, republish with files (audio) via Artifact `files`.
State 5 Oct evening: all UI built (app/js/ui/atlas.js, voice.js, spoken.js, sound.js ambience; routes atlas, sheet-ID, practice-ID, scripts, dossier, lessons[-LID], drill). tests/v2.mjs passes at 1280 light, 390 dark, reduced motion. Unit tests 23/23. Remaining: finish render (re-run `python3 voice/render.py <onnx> <npz> 4` from the project folder; cached clips skip), then `node voice/pack.mjs`, build, a11y, publish page + dist/audio/* via Artifact files (day-1.mp3 may be large; split publishes if >64MB).
Tools: scratchpad/tts has kokoro-q8.onnx, voices.npz (rebuild: npm pack kokoro-q8-shards kokoro-js; cat shards; np.savez from kjs/voices/*.bin as (510,1,256) float32).
Published v2 to the same URL on 5 Oct 2026 (page + 23 audio files, 52 MB). Waiting on Minh's review.

## Version 3 (6 Oct): Snakes at Work · Rắn công sở
Done and published: rename, real project names removed, snake layer (engine/snakes.js, ui/snakes.js, cine/snakes.jsx, cine/snake-art.js), 14 snake-trap scenes (content/traps.js) with follow-ups, re-recorded voices, phone film layout, tests/snakes.mjs. Waiting on Minh's review.

## Version 4 (10 Oct): script prompter and study library
Done: ui/prompter.js, ui/study.js, #study route, Settings switch, drill honours the prompter, tests/study.mjs. Pushed to https://github.com/minhnguyenrenol/snakes-at-work (Pages deploy by Actions) and republished to the Artifact.
