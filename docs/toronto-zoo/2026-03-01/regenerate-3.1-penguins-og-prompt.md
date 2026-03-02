# Purpose

Use this one-off prompt to regenerate `/home/kevin/coding/zoo-blog/public/media/3.1-penguins-og.png` from the March 1, 2026 blog content, specifically the `African Penguin Talk` section.

# Target Output

- Output file to replace: `/home/kevin/coding/zoo-blog/public/media/3.1-penguins-og.png`
- Final canvas: `1024x541` (match current file footprint)
- Final format: true PNG encoding
- Visual style: factual, family-friendly, conservation-aware (not clickbait)

# Source Grounding (From 2026-03-01 Post)

The generated image must clearly reflect these section themes:

1. Penguins are shown in group resting and short repositioning around the pool edge.
2. The scene should support family discussion about social spacing and routine behavior.
3. Conservation framing should connect to visible care systems: water quality, habitat temperature, and predictable rest zones.

Reference post:

- `http://localhost:3000/blog/2026/3/1/toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026`

# Attach These Inputs

- `[Image #1]` primary penguin background:
  - `/home/kevin/coding/zoo-blog/public/media/toronto-zoo/2026-03-01/images/african-penguin-closeup-1.webp`
- `[Image #2]` optional alternate background:
  - `/home/kevin/coding/zoo-blog/public/media/toronto-zoo/2026-03-01/images/african-penguin-closeup-2.webp`
- `[Image #3]` brand logo:
  - `/home/kevin/coding/zoo-blog/public/media/logo-word.png`

# Locked Copy (Use Exactly)

- Headline: `African Penguin Talk: March 1 Field Notes`
- Description: `Group resting and short repositioning around the pool highlight social spacing and routine behavior at Toronto Zoo.`
- CTA: `Read Field Notes`

# One-Off Prompt (Copy/Paste)

```text
Create a single social preview image that will replace an existing penguin OG-style card.

Strict inputs:
- Use attached [Image #1] as the main photoreal background.
- [Image #2] may be used only if needed for better 1024x541 recomposition.
- Use attached [Image #3] as the logo exactly as provided (no recolor, no redraw, no distortion).

Hard requirements:
1) Final output must be exactly 1024x541.
2) Export as PNG.
3) Preserve real penguin scene details (pool edge, rocks, grouped birds). No synthetic animal generation.
4) Keep all key content inside safe margins (~40px from edges).
5) Add a subtle dark gradient/scrim behind text for readability.
6) Use this exact copy:
   - Headline: "African Penguin Talk: March 1 Field Notes"
   - Description: "Group resting and short repositioning around the pool highlight social spacing and routine behavior at Toronto Zoo."
   - CTA: "Read Field Notes"
7) Keep visual hierarchy: logo -> headline -> description -> CTA.
8) Tone must feel factual and family-friendly, aligned with conservation field notes.

Layout guidance:
- Place logo near the top-left.
- Place headline and description left-aligned, avoiding key penguin subjects.
- Place CTA as a compact high-contrast pill/button near bottom-left.
- Keep text legible at small feed-preview size.

Negative constraints:
- No clickbait words or hype styling.
- No cartoon/painterly rendering.
- No heavy blur, no neon colors, no cluttered stickers/badges.
- No text clipping, logo warping, or low-contrast text.

Return:
- Final image only, 1024x541 PNG.
```

# QA Checklist

- [ ] Output is exactly `1024x541`.
- [ ] PNG encoding is valid (not JPEG data in a `.png` file).
- [ ] Headline/description/CTA match locked copy exactly.
- [ ] Penguins remain the focal visual subject.
- [ ] Composition reflects March 1 penguin section themes.
- [ ] Logo is unchanged and proportionally correct.
- [ ] Text remains readable on a mobile-sized preview.
