# Cheelboy · AI character creation kit

A prompt kit for building a consistent AI avatar for images and video with
Nano Banana Pro (Gemini 3 Pro Image) and Nano Banana 2. The first character is
**Inaya**.

## What's here

| Path | What it is |
| --- | --- |
| `inaya-prompt-kit.html` | The kit. Open it in a browser, choose an outfit where there's a picker, tap **Copy prompt** and paste into Nano Banana. Works on a phone. |
| `.claude/skills/nano-banana-pro-prompting/SKILL.md` | The prompting rules every prompt in the kit follows, with a review checklist. Claude Code loads it when you add or edit prompts. |

## Workflow

1. **Ref A, master portrait.** Text only, plain white tee. Re-roll 6–10 times and keep
   one face. If an existing Ref A still has the old beauty mark, clean it with fix **F7**.
2. **Reference set.** Attach Ref A and make Ref B (face turnaround), Ref C (full-body
   proportion sheet) and Ref D (expressions). Every reference uses plain white clothes:
   - Face sheets: fitted, opaque white tee on a light-grey backdrop.
   - Body sheet: fitted white tee, white high-waisted leggings and bare feet on a
     **mid-grey** backdrop so the white silhouette doesn't blend in. Generate at 4K where
     the tool allows it.
3. **Scenes.** Attach Ref A, B and C in that order. The prompts name each image's job and
   tell the model to ignore the white reference clothes. If they leak through, use fix **F6**.
4. **Video frames.** Frontal, evenly lit anchor frames for lip-sync and image-to-video tools.

## Changes from the original kit

- Removed the beauty mark from the character DNA. Her skin is now described as
  clear, with no moles or beauty marks.
- All reference images (B, C, D) use plain white clothing. Ref C switched from black
  clothes on light grey to white clothes on mid grey.
- Applied the Nano Banana Pro rules:
  - Each prompt states its purpose and gives every attached image a role.
  - Scene prompts tell the model to ignore the white reference clothing.
  - Constraints are described positively, with one short "No …" sentence for hard limits.
  - Reference sheets show a resolution on their pill.
- New fixes: **F6** (white reference clothes leaked into a scene) and **F7** (remove the mole).
- New **Rules** section in the kit.

Label posts as AI-generated where a platform requires it.
