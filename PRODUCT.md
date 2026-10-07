# Product

<!-- impeccable:product-schema 1 -->

All facts below come from Minh's two source documents (the game design plan and the stakeholder handbook) and the thread brief. Minh asked to be consulted only at the end, so nothing here came from an init interview; inferred facts are marked (inferred).

## Platform

web

## Stack

delegated: a single self-contained page published as a claude.ai Artifact, plain ES modules bundled by esbuild, no framework for the game UI; React plus @remotion/player only for the cinematic sequences. Chosen because the artifact must be one file with no server.

## Users

One player: Minh, a senior product designer at a bank's Vietnam innovation centre, working toward executive stakeholder skills and a first leadership role. Plays alone, about 45 to 60 minutes a day for about three weeks, on a laptop and sometimes a phone (inferred: evenings after work in Ho Chi Minh City).

## Product Purpose

A practice game that turns the handbook into habits: answer-first messages, honest numbers, loyalty to the line, sponsorship built on delivery, and calm judgement in hard moments. Success is behaviour change in real conversations (Real Moves done, scripts reused), not points.

## Positioning

A career-sim where promotions are earned with evidence cards and relationship rungs, graded on seven named dimensions, with spaced retrieval, rewinds and T+10 coaching; a fictional cast mirrors the real situation without naming real people.

## Capabilities and Constraints

- 21 days, 125 scenes in ten play modes, nine reviews that gate ten career levels on a 27-floor tower.
- Persistence: private per-person db document plus local copy. Optional Claude grading through the artifact `sample` capability, always with an offline rule grader as fallback.
- Fictional names only. No employer name, no real colleague names, no confidential data. Name relabels stay on the device.
- No dark patterns: no punitive streaks, loot boxes, public leaderboards or fake urgency.

## Brand Commitments

Title: "The Long Game". Coach voice: T+10, a bank technology executive ten years further up the same track. Inner voices: the Researcher, the Strategist, T+10.

## Evidence on Hand

The two source documents in /mnt/project-files/uploads/hearth/. No real screenshots, testimonials or metrics; never fabricate any.

## Product Principles

1. Judgement over vocabulary: grade what a good stakeholder would notice.
2. Practice transfers: every day ends with one Real Move for the real week.
3. Calm over compulsion: rest is a valid choice and missing a day costs nothing.
4. Show the mechanism: relationships, evidence and gates are visible, never hidden behind XP.

## Accessibility & Inclusion

WCAG 2.2 AA. Adjustable or removable timers, reduced motion honoured, never colour alone for right or wrong, keyboard play for every mode, Vietnamese diacritics rendered correctly.
