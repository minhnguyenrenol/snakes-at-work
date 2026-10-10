# Design system: The Long Game

**World.** A Saigon riverfront tower at night, drawn like a SimCity cutaway. Your floor is the one lit window band; the climb is the story.

**Colour.** River-teal fields (light `--ground #EDF2F2`, dark `#0B161C`) with one warm accent, marigold `#F2A93B`, used for your floor, primary actions and the current step. Jade `#5CC2A2` and coral `#F08A72` mark gains and losses and always come with an up/down or check/ring icon and words, never colour alone. Relationship rungs: Cold `#5E6E78`, Wary `#F08A72`, Stranger `#8EA5AE`, Useful `#6FA8C8`, Trusted `#5CC2A2`, Mine `#F2A93B`.

**Type.** Bricolage Grotesque for display (width axis pulled to 92, 75 in cinematics), Be Vietnam Pro for UI and reading (supports Vietnamese diacritics). One h1 per screen; panel titles are small h2s.

**Shape.** Controls 10px radius, panels 16px, chips are pills. 1px lines only; no thick accent borders.

**Motion.** One authored moment per screen: Remotion cinematics for the opening, each day card, the evening recap and promotions (30 fps, ease-out-expo, frame-driven). Interface motion is short ease-out on transform and opacity. Reduced motion shows the final frame as a still and removes staggered entrances.

**Sound.** Recorded neural voices (Kokoro, one voice per cast member, T+10 and the narrator share a warm narrator voice). Each place has a generative room bed (river, café murmur, lift hum) that dips under speech. Cues stay small: select, reveal, stamp, lift. Everything is adjustable in Settings and nothing depends on hearing it.

**Practice surfaces (v2).** The Atlas is the sitemap: a river-dark tile row for the resource pages, then week bands of day panels; days ahead of the story have dashed outlines. Scripts read in the display face on marigold-soft; the person asking a follow-up is a round portrait. Spoken films are Remotion: portrait in a ring of bars driven by the recording's loudness, word-by-word captions, a tall layout on phones.

**Copy.** Plain, warm, specific. No em dashes, no eyebrow labels above headings, one middle dot per line at most.

**Sources.** impeccable (pbakaus/impeccable), taste (Leonxlnx/taste-skill) and Remotion (remotion-dev/skills), copies in design-skills/. PRODUCT.md and the surface brief in .impeccable/ were written from Minh's two docs in place of the impeccable interview.

## Rắn công sở: the snake world (v3)
- Each stakeholder becomes a coiled cobra wearing their own clothes: hood in their jacket colour, collar as the hood's V, hair as a crest, glasses kept, marigold slit eyes, office lanyard. Same 200x210 box as portraits so it swaps in place (app/js/cine/snake-art.js).
- Venom is a separate hue (--venom) always paired with a drop count and text, never colour alone.
- Films (app/js/cine/snakes.jsx) use anticipation, squash and stretch, hit-stop, shake and a puff of smoke. Strike, Becoming ("Bạn đã thành Rắn Công Sở!"), Shed ("Lột xác!") and Charm. Tall 720x1080 layout under 640px wide. Reduced motion shows the last frame and two sound cues.
- Sounds are generated (hiss, rattle, slither, strike, venom, transform, shed, poof) and fire from frame cues.
- Snake mode skin: a faint scale texture on the page and a wiggling logo when you are a snake.

## Script prompter and study library (v4)
- The prompter switch is a pressed-state button (marigold when on) with an icon and a text label, never colour alone. The script panel is capped at about half the viewport height and scrolls.
- The study library is plain disclosure rows grouped by day; each row builds its body when first opened to keep the page light.
