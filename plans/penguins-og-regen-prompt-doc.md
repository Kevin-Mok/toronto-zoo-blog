# ExecPlan: Penguins OG Regen Prompt Doc

## Objective

Create a one-off prompt document that can be used to regenerate `/home/kevin/coding/zoo-blog/public/media/3.1-penguins-og.png` based on the March 1, 2026 Toronto Zoo blog content, with emphasis on the African penguin section.

## Plan

- [x] Review repository constraints and relevant content sources (`AGENTS.repo.md`, `docs/TODO.md`, March 1 post content).
- [x] Inspect the current penguin OG asset and source penguin media to lock composition assumptions.
- [x] Author a one-off prompt doc under `docs/toronto-zoo/2026-03-01/` with strict text, layout, and export requirements.
- [x] Validate file paths and summarize how to use the prompt doc.

## Review Notes

- Current target file is JPEG-encoded at `1024x541` despite `.png` extension; prompt locks output to that size for safe replacement.
- Prompt is grounded in March 1 post content:
  - Section: `African Penguin Talk`
  - Behavior framing: group resting, short repositioning, social spacing, routine behavior
  - Care-system framing: water quality, habitat temperature, predictable rest zones
- Prompt references the March 1 penguin source stills and existing logo file for brand consistency.
