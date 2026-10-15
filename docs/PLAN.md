# Inaya: content plan

How we go from a locked character to a steady, varied feed of her everyday life (cafés,
places, selfies in her car), paid detailing-studio gigs, and video, using
`inaya-prompt-kit.html`. Her voice and content mix are in
`.claude/skills/inaya-brand-voice/SKILL.md`.

## 1. Principles

1. **Lock the identity first.** Nothing is published until Ref A–D pass QA. A
   drifting face costs more than any single post earns.
2. **Images carry her look; text carries the shot.** With references attached, prompts
   describe only the outfit, place, action, camera and light. This is the core
   Nano Banana Pro rule; see `.claude/skills/nano-banana-pro-prompting/SKILL.md`.
3. **Change one thing at a time.** When a result is off, change one module and
   regenerate, so you learn which module caused it.
4. **On gigs she looks and reacts; the studio does the work.** Staff, faces hidden, do
   the hands-on part, and the cars are customers' cars. This keeps the persona: a girl
   who loves cars and looks like a fashion model, never a mechanic.
5. **Real means permissioned and disclosed.** Real studios, products and customer cars
   appear only with permission. Every post is labelled as AI-generated, and every paid
   post as a paid partnership.

## 2. Roadmap

| Phase | Weeks | Goal | Deliverables | Done when |
| --- | --- | --- | --- | --- |
| 0 · Lock identity | 1 | One face, one body | Clean Ref A (fix F7 if it has the mole), Ref B, C, D; optional E and H | 10 test scenes from the builder, at least 8 judged "same person" on the QA list below |
| 1 · Wardrobe and her car | 1–2 | Repeatable looks | Outfit refs for the 6 outfits you'll use most; her everyday car fixed (white Civic by default) | Each outfit ref matches its text, and the body matches Ref C |
| 2 · Places and products | 2–3 | Real-world library | 3–6 permissioned photos per partner studio; clean photos of each product | Library sorted and named (section 7); one R5 test per studio passes QA |
| 3 · Pillars and calendar | 3 | A schedule you can keep | Weekly mix (section 5), first 4 weeks planned in a sheet | 4 weeks of builder settings logged in advance |
| 4 · Production | 3+ | Weekly batch days | 1 batch day = about a week of posts | QA pass rate at or above 70% of generations |
| 5 · Video | 4+ | Talking heads and B-roll | V1–V5 anchor frames, one voice, script templates | 2 videos a week without identity drift |
| 6 · Partnerships | 6+ | Regular studio gigs and brands | Media kit, gig packages (section 6), results tracking | First paid gig package delivered and reported |

## 3. The numbers: how much variety the kit holds

The shot builder in the kit multiplies its option lists. Current lists:

| Module | Options |
| --- | --- |
| Places | 32 (30 without a car; the driver's seat and drive-through need one) |
| Cars | Her white Civic, a silver Corolla, 8 studio and event cars, plus "no car", your own description, or a real car photo |
| Outfits | 12 |
| Framing | 6 (detail, close-up, waist-up, knees-up, full body, wide) |
| Camera height | 5 (eye level, slightly high, low hero, overhead, ground level) |
| Body angle | 5 (front, ¾ left, ¾ right, profile, from behind looking back) |
| Expressions | 8 |
| Light set-ups | 10 |
| Aspect ratios | 5 |
| Actions | 12 scene, 9 selfie, 10 review |
| Finishes (review) | 8 (gloss clear, matte clear, colour, carbon-look, colour-shift, gloss black, ceramic coating, tint) |

**Camera angles:** framing × height × body angle = 6 × 5 × 5 = **150 angles** for any
one set-up. A few combinations are odd (an overhead shot from behind, for example), so
plan on roughly 120 usable angles.

**Combinations per format**

| Format | Every prompt combination | Visibly different set-ups (place × action × outfit × framing) |
| --- | --- | --- |
| Scene | 2.9 billion | 27,648 |
| Studio gig (review) | 18.4 billion | 23,040 |
| Selfie | 14.5 million | 3,456 |
| Talking-head frame | 210,000 | 384 |
| **Total** | **≈ 21.4 billion** | **≈ 54,500** |

The billions count every change of light, expression or ratio. **About 54,500 visibly
different set-ups** is the honest number: a viewer would see each of those as a new
photo, even before light and expression change. At 3 posts a day, that's about 50
years without repeating a set-up.

**Real places and products multiply this further.** With a place photo attached, the
photo replaces the place and camera height. Each place photo then supports
10 review actions × 12 outfits × 6 framings = **720 review set-ups**, and each one can
feature any of your products. Example: 5 partner studios × 4 photos each × 10 products
= 20 × 10 × 720 = **144,000 review set-ups**.

The limit is never variety. It's QA time and keeping her identity stable, which is why
Phase 0 matters.

### Extending the variety

Each new list item multiplies everything else. The cheapest wins:

| Add | Effort | Effect |
| --- | --- | --- |
| 1 outfit (plus its outfit ref) | Low | Every set-up count grows by 1/12 (8%) |
| 1 place in the builder | Low | Grows by 1/32 (3%), and gives a new look that viewers notice immediately |
| 1 partner studio (4 photos) | Medium | Adds 2,880 review set-ups per product |
| 1 product (clean photo) | Low | Every studio photo gets 720 more review set-ups |
| Seasonal variants (Eid, 14 August, monsoon, winter in the north) | Low | Topical relevance, which outperforms raw variety |
| Weather and time of day (rainy night, overcast, blue hour are in) | Low | Same place, different mood |

## 4. Format guide

| Format | Use for | Kit section | Ratio |
| --- | --- | --- | --- |
| Selfie | Stories, daily presence, car selfies | Builder → Selfie, presets S2, S9 | 9:16 |
| Scene | Feed posts: cafés, places, outfits, car events | Builder → Scene, presets S1–S12 | 3:4 |
| Studio gig | Paid detailing and PPF studio visits | Builder → Product review, presets S10, R1–R5 | 3:4 or 4:3 |
| Real place or product swap | Putting her into a partner studio, or a real product in her hands | Presets R5, BG1, PR1 | Same as the source |
| Talking head | Reels, Shorts, YouTube explainers | Builder → Talking head, presets V1–V5 | 9:16 or 16:9 |

## 5. Content pillars and weekly mix

| Pillar | Share | Formats | Examples |
| --- | --- | --- | --- |
| Going out | About 60% | Scene, selfie | Café window seat, seafront at sunset, food street at night, mall day, bookshop, rooftop dinner |
| In and around her car | About 25% | Selfie, scene | Coffee-run selfie in her Civic, outfit shot by the car, drive-through |
| Studio gigs and car events | About 15% | Studio gig, scene, talking head | Paid studio visits, car meets, auto shows |

Stories every day (2–4), feed posts most days, 2 Reels a week. The weekly rhythm and
continuity rules are in the brand-voice skill. Never post two in a row from the same
place or outfit.

## 6. Studio gig blueprint

**One gig = 1 studio visit.** The studio invites her and pays for the content. Each gig
gives about 8 frames plus one video, all made with the kit:

| # | Frame | Kit |
| --- | --- | --- |
| 1 | Arrival at the studio | S10, or BG1 with the real studio photo |
| 2 | The car being worked on, staff faces hidden | R3 / builder review action R5 |
| 3 | Close-up of the finish or film edge | Builder review action R2, framing Detail |
| 4 | Inspection light on the paint | Builder review action R3 |
| 5 | Water beading or self-healing | R4 / builder review actions R6, R7 |
| 6 | Comparison or final reveal | R2 (split bonnet) / builder review action R10 |
| 7 | Product shot, if the studio wants one | R1, or R5 with the real studio and product |
| 8 | Story selfie at the studio | Builder Selfie |
| Video | Her take to camera, frames 2–6 as B-roll | V5 |

**Plan gigs around what the studio sells:** gloss or matte PPF, colour PPF, ceramic
coating, tint. Use the PPF brands each studio installs (for example STEK's DYNOshield
and DYNOmatt lines, or FlexiShield's clear gloss and matte films). Confirm current
product names and specs with the studio before filming.

Facts in captions and scripts come only from the studio or the brand's spec sheet, and
are attributed ("studio ke mutabiq…", "according to the studio"). She never claims
personal long-term use, because she can't have any.

## 7. Real places and products: capture guide

**Place photos (from partner studios)**
- Take 4–6 photos per studio: the wide bay, the bay from car height, the reception or
  product wall, the install bay, the exterior, and a detail wall with logo or swatches.
- Shoot at eye level (about 1.6 m), horizontal, at the highest resolution, in the
  light you want her lit by. Keep the space empty: no people, no customer plates.
- Leave room where she'll stand, with the floor visible, so contact shadows work.
- Get written permission from the owner, and agree whether their logo may appear.

**Product photos**
- Front of the box or roll, straight on, on a plain light background, label filling
  most of the frame, sharp and evenly lit. One photo per product (more than one per
  prompt confuses the label).
- Use official brand images only with permission.

**Real car photos (customer or partner cars)**
- Front three-quarter view, whole car in frame, plain surroundings. Get the owner's
  consent. Number plates are blanked by the prompts.

**File naming**

```
library/places/{studio}_{area}_{nn}.jpg        e.g. studioX_installbay_01.jpg
library/products/{brand}_{product}_{nn}.jpg    e.g. stek_dynoshield_01.jpg
library/cars/{owner-or-model}_{nn}.jpg
refs/inaya_refA.png … refs/inaya_refH.png, refs/outfit_W1.png …
out/{yyyy-mm-dd}_{format}_{place}_{action}_{outfit}_v{n}.png
```

## 8. Production pipeline and QA

**Batch day (about 3 hours for a week of posts)**
1. Open the week's plan, with one row per post holding its builder settings.
2. For each row: set the builder, copy, attach images in the listed order, generate 2–4.
3. Pick the best one against the QA list. Fix with F1–F9 rather than re-rolling a
   near-miss.
4. Upscale if the platform needs it, name the file, and log the final prompt next to
   the row.

**QA checklist (reject on any "no")**
- Face reads as the same person as Ref A, with clear skin and no mole.
- Hair: soft-black, half-up, long, with no highlights.
- Jewelry: gold hoops, watch on her left wrist, ring on her right index finger, nude almond nails.
- Hands have five natural fingers, and props are held believably.
- Outfit matches the chosen outfit (and its outfit ref), with no white reference clothes leaking in.
- Product label matches the product photo exactly, spelled correctly (else F8).
- No stray logos, car badges, readable plates or watermarks.
- She is lit and shadowed like the background (else F9).

Track the pass rate per module. If one place or action keeps failing, fix its text in
the kit rather than fighting it every time.

## 9. Video pipeline

1. Make the anchor frame with V1–V5 or the builder's talking-head format. Keep the face
   frontal and evenly lit, mouth closed, nothing in front of her face.
2. Write a script of 20–45 seconds per Reel: hook in the first 2 seconds, one idea, a
   clear verdict.
3. Pick one voice and keep it fixed across all videos: same voice, settings and
   language mix. Inaya's voice is part of her identity.
4. Lip-sync the anchor frame in your talking-avatar tool, and animate review stills in
   an image-to-video tool for B-roll.
5. Edit with captions on: talking head, cut to B-roll on every product mention, end
   on the verdict.

## 10. Trust, disclosure and permissions

- Turn on each platform's AI label (Instagram, TikTok and YouTube all have one), and
  say in the bio that Inaya is an AI character.
- Mark paid posts as paid partnerships, and don't imply a partnership that doesn't exist.
- State brand facts only as the brand states them. Comparisons must be fair and checkable.
- Keep installers' faces hidden unless they consent. Blank customer plates.
- Check that Ref A doesn't closely resemble a real person, especially a public figure.

## 11. Risks

| Risk | Sign | Response |
| --- | --- | --- |
| Identity drift | Face or body slowly changes across posts | Always attach A, B, C in order; F1/F2; refresh the outfit refs |
| Mole comes back | Reappears near her lips | Ref A must be clean; F7; check B, C, D for it |
| Wrong product text | Misspelled or invented label | Tighter product photo; F8; never ship an unchecked label |
| Pasted-on look | Light or shadows don't match | Better place photo (eye level, matching light); F9 |
| Repetitive feed | Engagement drops on similar posts | Sort the plan by place and outfit; add places and seasonal looks |
| Platform policy | Reach limited or content flagged | Labels on, honest claims, no impersonation |

## 12. Open questions

1. Which studios and brands are actual partners now, and may their logos appear?
2. Which platforms come first, and at what cadence? The plan assumes Instagram first,
   then TikTok and YouTube Shorts.
3. What language for captions and voice: English, Urdu, or a mix?
4. Real car models with their badges, or always unbadged? The kit currently removes badges.
5. Which video tools do you use? The pipeline is tool-agnostic.
