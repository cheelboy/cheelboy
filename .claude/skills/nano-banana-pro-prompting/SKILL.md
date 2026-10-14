---
name: nano-banana-pro-prompting
description: Rules for writing and reviewing image prompts for Nano Banana Pro (Gemini 3 Pro Image) and Nano Banana 2, especially for a recurring AI character built from reference images. Use when adding or editing prompts in inaya-prompt-kit.html, creating a new character, or fixing prompts that drift off-model.
---

# Nano Banana Pro prompting

Nano Banana Pro reasons about the prompt before drawing. Write to it the way you
would brief a photographer and retoucher, not the way you would tag a dataset.

## 1. Write sentences, not tags

- Describe the scene in plain sentences. Avoid lists like `woman, car, neon, 8k, masterpiece`.
- Cover, in this order: **intent → subject → outfit → action and pose → location →
  composition and camera → lighting → style → constraints → aspect ratio**.
- Start with the purpose when it matters ("This is a body-proportion reference sheet
  for a recurring character"). The model uses the purpose to decide what to prioritize.

## 2. Reference images

- Pro accepts up to 14 images, but identity holds best with a few strong ones. For one
  character: face (Ref A), face angles (Ref B), body (Ref C), plus one outfit image when needed.
- Always attach in the same order and **name each image's job** in the prompt:
  "Image 1 is her face … Image 3 shows her body proportions …".
- The face reference is always Image 1.
- Say what to take from each image and what to ignore. Reference sheets are shot in
  plain white clothes, so scene prompts must say to take only her figure from them and
  dress her as described.
- When images are attached, do not describe her face again in text. A second
  description competes with the image and causes drift. The body description is the
  one exception, and only on prompts whose only reference is a chest-up portrait.

## 3. Lock identity explicitly

- Use direct identity language: "the exact same person", "match her face exactly",
  "keep her face, hair, body and jewelry exactly as in the references".
- For edits, say what stays ("Keep this image exactly the same …") before the one thing
  that changes. Change one thing per edit.

## 4. Say what you want, not only what you don't

- Describe the wanted result first ("clear, even skin", "a clean unbadged body",
  "a plain seamless backdrop"). These positive descriptions steer better than a bare "no X".
- Keep negatives for hard constraints (text, logos, watermarks) and put them in one
  short closing sentence.
- Name a known failure in plain words when it keeps recurring (for example
  "no moles or beauty marks") and pair it with the positive version.

## 5. Use photography language

- Shot size, lens (24/35/50/85 mm), aperture, camera height and angle.
- Light source, direction and quality ("large softbox 45° to her left, gentle fill").
- Backdrop tone chosen for contrast with the clothes. White clothing on a light-grey
  backdrop loses its silhouette, so use a mid-grey backdrop for white outfits.

## 6. Reference sheets

- State that the image is a reference or turnaround sheet. Ask for the same scale, the
  same height and a shared floor baseline, and for evenly spaced views in one row.
- For body proportions, use fitted, plain, opaque clothing that follows the body
  without adding volume, a neutral standing pose with arms slightly away from the body,
  and bare feet or flat shoes so footwear doesn't change her height.
- Ask for "no text, labels or grid lines" unless you want labels.
- Generate sheets at the highest resolution the tool offers (2K or 4K), because each
  figure only gets a quarter of the frame.

## 7. Real places, real products, real cars

- Attach them after A, B and C, and name each one's job: "Image 4 is a photograph of a
  real location: use it as the setting." "Image 5 is the real product: reproduce it exactly."
- **Place photo:** tell the model to keep the place exactly as photographed and to fit her
  into it. That means matching perspective, camera height, light direction and colour
  temperature, and adding contact shadows and reflections. Drop the camera-height and
  place text from the prompt; the photo decides both.
- **Product photo:** ask for the packaging, colours, label layout and printed text to be
  reproduced exactly, at a realistic size. Allow only that product's branding and ban all
  other text and logos in the same sentence. One clean, front-on photo per product.
- **Real car photo:** ask for body, colour, wheels and details exactly, with a blank number plate.
- Without a product photo, keep packaging plain; the model will invent wrong labels.
- In reviews she presents and judges; an installer, face hidden, does the hands-on work.

## 8. Format

- Put the aspect ratio in the prompt as the last line. Use only ratios the target app
  offers. The Gemini app offers 1:1, 3:4, 4:3, 9:16 and 16:9.
- Keep one module per idea (DNA, BODY, REF, STYLE, AVOID, outfit, car, shot, light) so a
  test changes one module at a time.

## Review checklist

Before shipping a prompt, check that:

1. Every attached image is named with its job, and Image 1 is the face.
2. No face description appears when Ref A is attached.
3. Scene prompts tell the model to ignore the white reference clothing.
4. Wanted results are described positively, with negatives in one short sentence.
5. Shot, lens, light and aspect ratio are all stated.
6. The prompt contains nothing that contradicts the character DNA, such as a mole,
   highlights, a different hairstyle, or clothes that should be clean but aren't.
7. Real place, product and car images are numbered after A, B and C, and the only
   branding allowed is the attached product's own.
8. New builder options are checked with the browser fuzz test: every format and toggle
   combination assembles with no `undefined` and no image number beyond those attached.
