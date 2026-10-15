---
name: steward
description: How this repository is managed on GitHub. Covers branches, commits, the checks to run before every push, pull requests, publishing the kit, and keeping docs in step with the code. Use whenever you change code or docs in this repo, commit, push, open or update a pull request, review a change, or publish inaya-prompt-kit.html.
---

# Steward: managing the Cheelboy repo

One owner, one main branch, small reviewed changes. The kit is a single HTML file the
owner uses on their phone, so a broken push means a broken working day. Check first.

## Layout

| Path | Owns |
| --- | --- |
| `inaya-prompt-kit.html` | The kit: data, prompt engine and UI in one file. |
| `tests/kit.test.mjs` | Headless browser test of every card and builder combination. |
| `docs/PLAN.md` | Production plan: roadmap, variety maths, pillars, capture guide, QA. |
| `docs/STRATEGY.md` | Long-term plan: storyline, growth stages, monetization. |
| `.claude/skills/nano-banana-pro-prompting/` | Rules for every image prompt. |
| `.claude/skills/inaya-brand-voice/` | Character voice, captions, story arcs and content planning. |

## Branches

- `main` is what the owner uses. Nothing lands there without the checks below.
- Work on a short-lived branch per change: `feat/…`, `fix/…`, `content/…` (new places,
  outfits, prompts) or `docs/…`. If the session names a branch, use that one.
- Never rewrite history on a branch someone else has pulled. Use a merge commit to
  bring `main` in.

## Before every commit

1. `npm test`. It must print `PASS`. Run `npm install` once if `node_modules` is missing.
2. If prompts changed, review them against the checklist in
   `.claude/skills/nano-banana-pro-prompting/SKILL.md`.
3. If captions, story or planning content changed, review against
   `.claude/skills/inaya-brand-voice/SKILL.md`.
4. When you add a builder table or option, make sure the test covers it. A new
   format or toggle goes into the fuzz loops in `tests/kit.test.mjs`.
5. Keep docs in step: README "Kit sections" and the counts in `docs/PLAN.md` §3 when
   option lists change. The counts the builder prints are the source of truth.

## Commits

- One logical change per commit. Subject in the imperative, at most 72 characters,
  for example "Add hairstyle module to the builder".
- In the body, say what changed for the owner (what they'll see in the kit), not
  only what changed in the code.
- Never commit API keys, real customer number plates, or partner photos without
  permission. Real place and product photos live outside the repo unless the owner
  says otherwise.

## Pull requests

- Open one only when the owner asks. Title it the same way as a commit subject.
- Body: **What changed** (owner-facing), **Why**, **How it was checked** (paste the
  `npm test` result line), and **Screenshots** for UI changes, at phone width (390px).
- Keep PRs small enough to review on a phone. Split anything over about 400 changed lines
  of JS, except data tables.

## Publishing the kit

The owner uses a published copy of `inaya-prompt-kit.html`. After a change merges, or
when the owner asks, republish the same file to the same artifact URL so the link
never changes. Say in one line what's new in the published version.

## Versioning

Tag releases on `main` when a phase from `docs/PLAN.md` ships: `v0.2-builder`,
`v0.3-randomizer`, `v0.4-day-planner`. Add a short entry to the top of `CHANGELOG.md`
describing what the owner can now do.

## When GitHub access fails

If a push returns 403, the Claude GitHub App isn't connected for this repo. Tell the
owner in one line, keep the commits local, and carry on with work that doesn't need
the push. Don't retry in a loop.
