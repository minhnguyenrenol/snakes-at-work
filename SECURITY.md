# Security and privacy review (4 Oct 2026)

Scope: the published single-file game (dist/index.html), its runtime capabilities (db, user, sample, downloads) and the build.

## Rendering
- Every dynamic string goes into the DOM through `textContent` (app/js/dom.js). There is no `innerHTML`, `eval` or `new Function` path for game or player data. SVG art is built node by node.
- Hash routes accept only `[a-z0-9_-]{1,64}` tokens; anything else falls back to Today (app/js/main.js).
- No native `alert`, `confirm` or `prompt`; dialogs are in-page with a focus trap.

## Saved data
- Saves live in localStorage (`tlg.save.v1`) and, when signed in, in the private db doc `data/users/<id>/save` (private even from the artifact owner).
- Every load, import and remote update passes through `normalizeSave`, which rebuilds a clean object field by field with type checks and length caps. Unknown keys are dropped.
- Writes are debounced, one at a time, never on load, and kept under the 256 KB doc limit (older attempt text is trimmed first).
- Private name relabels (Settings) are stripped before any db write and restored from the local copy when a remote save arrives. They never leave the browser.

## Claude grading and coaching (sample)
- Prompts are built with `FN` (no private relabels) and neutral checks, so real colleague names typed into Settings are never sent.
- The player's answer sits inside a `<<< >>>` fence with an instruction to treat it only as an answer; the fence markers are stripped from the answer so it cannot close the fence early.
- Claude's reply is validated (`validateModelGrade`): only the listed dimensions, integers clamped 0 to 4, fall back to the rule grade if fewer than half are usable. Text fields are length-capped and rendered as text.
- `not_granted` / `unavailable` turn Claude grading off for the session; `rate_limited` shows a toast and uses the instant grade. There are no retry loops. Coach chat is capped at 15 messages a day.

## Content
- Fictional names only. Content tests fail if any of the banned real names appear (tests/content.test.mjs). No employer name, no confidential data.
- No dark patterns: no streak penalties, loot boxes, public leaderboards or fake urgency. Timers can be paused or switched off.

## Supply chain
- Bundled at build time with esbuild: React 19, Remotion 4 (`@remotion/player`). No runtime script CDNs. Google Fonts stylesheet is the only external request; the page works with system fonts if it fails.
- Remotion licence: free for individuals and small teams; `acknowledgeRemotionLicense` is set. A company of 4+ people using it commercially would need a Remotion company licence.

## Version 2 additions (5 Oct 2026)
- Recorded voices: MP3 sprites and one index JSON published as the artifact's own supporting files (`audio/`). They are fetched same-origin and sliced into Blob URLs; no third-party audio host, no new runtime request outside the artifact. Clip text is checked by hash, so stale recordings are skipped, never played against changed text. The voice model ran offline at build time; nothing about the player is sent anywhere to produce speech.
- The spoken films inject one SVG string with `dangerouslySetInnerHTML`: the NPC portrait produced by our own `portrait()` from constant look data, with no player text in it. Captions are React text nodes.
- "Compare with T+10" in the follow-up drill sends only the fictional scene title, the question, the sample answer and the player's own typed answer (fenced and marked as data), through `sample` with `FN` (no private relabels). The reply is shown as text, capped at 600 characters. It runs only on a click, with no retries.
- Practice runs of scenes ahead of the story never write the save. The run queue and Atlas filters live in sessionStorage and memory only.
- Ambience is generated in WebAudio; it starts only after a user gesture and can be switched off in Settings.

## Version 3 additions: Rắn công sở (6 Oct 2026)
- Real project names removed from all content, tests and voice scripts. The content test fails the build if any banned name returns.
- Snake state is derived from grades already in the save. The only new saved fields are `settings.snakes` (boolean) and `snakeForm` ('human' or 'snake'), both normalised on load. No new data leaves the device and nothing new is sent to Claude.
- Snake films render our own portrait SVG (built from fixed look data, never user text) through the existing Face component. Names in films come from npcName, which is rendered as React text, so private relabels stay escaped and local.
- The 14 snake-trap scenes are fiction: invented people, invented workplace, no real projects or companies.

## Residual risks (accepted)
- localStorage is readable by anything running in the same artifact origin (only this page).
- The private relabels are stored in plain text in this browser only.
