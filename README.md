# Cheelboy · AI character creation kit

A prompt kit for building a consistent AI avatar for images and video with
Nano Banana Pro (Gemini 3 Pro Image) and Nano Banana 2. The first character is
**Inaya**, a Karachi girl who goes out to cafés and places, takes selfies in her everyday car, and gets paid gigs from detailing studios because she loves cars.

## What's here

| Path | What it is |
| --- | --- |
| `inaya-prompt-kit.html` | The kit. Open it in a browser (it works on a phone), set the options, tap **Copy prompt** and paste into Nano Banana. |
| `docs/PLAN.md` | The content plan: roadmap, variety maths, content pillars, PPF review series, capture guide for real places and products, QA, video, disclosure. |
| `docs/STRATEGY.md` | Long-term plan: positioning, what she posts, growth stages, how she earns (studio gigs first), risks, first 12 months. |
| `tests/kit.test.mjs` | Browser test of every card and builder combination. Run `npm install` once, then `npm test`. |
| `.claude/skills/nano-banana-pro-prompting/` | The prompting rules every image prompt follows. |
| `.claude/skills/inaya-brand-voice/` | Who she is, her English and Urdu caption voice, content mix, weekly rhythm, studio gigs, disclosure rules. |
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
4. **Scenes.** S1–S12, everyday life: cafés, selfies in her Civic, the seafront, food
   streets, the mall, plus a studio-gig arrival and car events.
5. **Studio gigs & real places.** R1–R5 shots for paid detailing and PPF studio visits,
   BG1 to swap in the real studio, and PR1 to swap in a real product.
6. **Video anchor frames.** V1–V5: in her car, at a café, on the sofa, walking, and at a studio gig.
7. **Fixes.** F1–F9, covering face drift, age, logos, mechanic look, body, leaked
   reference clothes, the mole, wrong product labels and a pasted-on look.

## Generating images in the browser (Puter)

The kit's **Generate** section runs Nano Banana through [Puter.js](https://developer.puter.com/tutorials/free-unlimited-nano-banana-api/)
in your browser. No API key is needed, but usage counts against your own Puter account:
Puter gives a free allowance, then asks you to top up.

1. Tap **Connect Puter**, then **Sign in to Puter**.
2. Optional: turn on **Test mode** for one free sample image to check the setup.
3. Use the quick-start buttons in order:
   - **Ref A ×2:** pick the best face with **Use as Ref A**.
   - **Ref B, C, D:** save each one to its slot.
   - **Social posts:** S1–S4 by default.
4. Every card and the builder also has a **Generate** button. It attaches the saved
   reference slots in the right order, and tells you if one is missing.

Reference slots are saved in that browser only, so download your keepers.

## Generating images from the command line (Gemini API key)

`tools/generate.mjs` sends the kit's prompts to Google's Gemini image models (Nano Banana)
and saves the results to `generated/`. It needs a Gemini API key from Google AI Studio in
the `GEMINI_API_KEY` environment variable.

```bash
npm install
npm run generate -- models            # image models your key can use
npm run generate -- ref-a --n 4       # 4 master-portrait candidates
npm run generate -- pick 2            # keep candidate 2 as refs/refA.png
npm run generate -- refs              # Ref B, C, D from refs/refA.png
npm run generate -- social S1 S2 S4   # scenes with Ref A, B, C attached
```

- **Choose a model with `--model`.** The default is `gemini-3-pro-image-preview` (Nano Banana
  Pro); `gemini-2.5-flash-image` is cheaper.
- **Preview first.** Add `--dry-run` to see each request without sending it.

## Variety at a glance

150 camera angles per set-up and about 54,500 visibly different set-ups across the four
formats, before light, expression and ratio changes. Each real place photo adds 720
review set-ups per product. The full maths is in `docs/PLAN.md`.

Label posts as AI-generated where a platform requires it.
