# Cheelboy · AI character creation kit

A prompt kit for building a consistent AI avatar for images and video with
Nano Banana Pro (Gemini 3 Pro Image) and Nano Banana 2. The first character is
**Inaya**, a Karachi car enthusiast who reviews detailing, PPF and coatings.

## What's here

| Path | What it is |
| --- | --- |
| `inaya-prompt-kit.html` | The kit. Open it in a browser (it works on a phone), set the options, tap **Copy prompt** and paste into Nano Banana. |
| `docs/PLAN.md` | The content plan: roadmap, variety maths, content pillars, PPF review series, capture guide for real places and products, QA, video, disclosure. |
| `docs/STRATEGY.md` | Long-term plan: positioning, the "Bijli Diaries" storyline, growth stages, how she earns, risks, first 12 months. |
| `tests/kit.test.mjs` | Browser test of every card and builder combination. Run `npm install` once, then `npm test`. |
| `.claude/skills/nano-banana-pro-prompting/` | The prompting rules every image prompt follows. |
| `.claude/skills/inaya-brand-voice/` | Her character bible, English and Urdu caption voice, story arcs, weekly rhythm, disclosure rules. |
| `.claude/skills/steward/` | How the repo is managed on GitHub: branches, commits, checks before every push, PRs, publishing. |

## Kit sections

1. **Master portrait (Ref A).** Text only, plain white tee, clear skin. Fix F7 removes the
   old beauty mark from an existing Ref A.
2. **Reference set.** Every reference is shot in plain white clothes:
   - B: face turnaround.
   - C: full-body sheet in a white tee, white leggings and bare feet on mid grey.
   - D: expressions.
   - E (optional): a large front body view.
   - H (optional): hands and jewelry.
3. **Shot builder.**
   - Choose a format (scene, selfie, product review, talking head), then place, car,
     outfit, action, finish, framing, camera height, body angle, expression, light and
     ratio.
   - Switch on real place, product or car photos, or your outfit and hands references.
   - It writes the prompt, lists the images to attach in order, and counts the
     combinations.
4. **Scenes.** S1–S12, ready-made hero scenes.
5. **Reviews & real places.** R1–R5 PPF and detailing review shots, BG1 to swap in a real
   background, and PR1 to swap in a real product.
6. **Video anchor frames.** V1–V5, including a product-review talking head.
7. **Fixes.** F1–F9, covering face drift, age, logos, mechanic look, body, leaked
   reference clothes, the mole, wrong product labels and a pasted-on look.

## Variety at a glance

150 camera angles per set-up and about 32,000 visibly different set-ups across the four
formats, before light, expression and ratio changes. Each real place photo adds 720
review set-ups per product. The full maths is in `docs/PLAN.md`.

Label posts as AI-generated where a platform requires it.
