# Homepage OG Image Generation Spec

Use this spec to manually generate the final homepage Open Graph image asset.

## Input Mapping For Attached Images

- `[Image #1]`: Snow leopard image used as the background source (`hero-image.png` equivalent).
- `[Image #2]`: Toronto Zoo Report logo used as the wordmark source (`logo-word.png` equivalent).

## Gemini Resize/Recompose Prompt (From Current OG Image)

Use this when you already have a composed draft image but need a platform-safe OG export.

```text
You are editing an existing Open Graph image to make it platform-safe while preserving the same design and content.

Input image:
- Current composed OG draft (snow leopard background, TorontoZooReport logo, headline, description, CTA)

Goal:
- Recompose to exactly 1200x630 (1.91:1) for Open Graph.
- Keep the same overall look, brand feel, and text content.
- Do not redesign from scratch.

Hard requirements:
1) Output size must be exactly 1200x630 PNG.
2) Keep all critical elements inside a safe area at least 48px from each edge.
3) Preserve the snow leopard face/eyes (do not crop or cover them with text).
4) Keep logo style and proportions unchanged.
5) Keep title, description, and CTA text exactly as written.
6) Keep CTA text exactly: "Explore Blog".

Recomposition instructions:
- Convert from taller ratio to 1.91:1 by recomposing, not naive center-cropping.
- Move the left text stack upward so title/description/CTA are fully safe at 1200x630.
- Keep logo at top-left, text below logo, CTA near lower-left, all within safe area.
- If spacing is tight, reduce description font size slightly before changing layout hierarchy.
- Keep background natural, with subtle left-side dark scrim for readability.
- Keep contrast strong enough for mobile preview readability.

Exact text to preserve:
- Title: "Toronto Zoo Report: animal updates and keeper talks"
- Description: "Explore the blog for animal updates, keeper-talk summaries, and conservation context from on-site visits to the Toronto Zoo."
- CTA: "Explore Blog"

Negative constraints:
- No logo redraw, recolor, or distortion.
- No text truncation or clipping.
- No extra icons, badges, or visual clutter.
- No artificial replacement background.

Return:
- Final image only (1200x630 PNG), optimized for social sharing.
```

## Image Generation Prompt

```text
Create a single homepage Open Graph image for "Toronto Zoo Report" at exactly 1200x630 (1.91:1).

STRICT INPUTS (must use as-is):
- Use attached [Image #1] (snow leopard) as the full-bleed background base (no swapping, no synthetic replacement background).
- Use attached [Image #2] (Toronto Zoo Report logo) as the wordmark exactly as provided (no recolor, no restyling, no distortion, no redraw).

COMPOSITION + SAFE AREA:
- Keep ALL critical elements (logo, headline, description, CTA) at least 48px from every edge.
- Do not cover the snow leopard's face or eyes with text; preserve the photo's focal point.

BACKGROUND TREATMENT:
- Keep [Image #1] photoreal and intact.
- Add a subtle dark gradient/scrim for readability: strongest on the left side where text sits, fading toward the right so the leopard stays natural and clear.
- No heavy vignette, no HDR glow, no oversharpen halos.

LAYOUT (clear hierarchy: logo -> title -> description -> CTA):
1) Logo (top-left):
   - Place [Image #2] at x=48px, y=48px.
   - Scale to a width around 420-480px (keep aspect ratio), crisp and fully legible.

2) Title (below logo, left-aligned):
   - Headline text (exact): "Toronto Zoo Report: animal updates and keeper talks"
   - Modern editorial sans-serif (Inter / system), bold, ~64-72px size, tight line-height (1.05-1.12).
   - Max 2 lines, high-contrast white (#FFFFFF) with very subtle shadow for separation.

3) Description (below title, left-aligned):
   - Body text (exact): "Explore the blog for animal updates, keeper-talk summaries, and conservation context from on-site visits to the Toronto Zoo."
   - Same sans-serif, medium weight, ~30-36px, max 2 lines, slightly reduced opacity (90-95% white).

4) CTA (bottom-left):
   - Button/chip label (exact): "Explore Blog"
   - Place within safe area near bottom-left (for example, x=48px, y~520px).
   - Pill button with high contrast; use the green from the wordmark as the button fill (or outline) and white text.
   - Ensure CTA is instantly readable at small social preview size.

STYLE:
- Clean, editorial, nature-forward, calm and factual.
- No extra icons, no clutter, no collage effects.
- Output as a sharp, share-ready PNG.
```

## Negative Prompt

- Warped or recolored logo-word.png; any redrawn/synthetic logo; stretched proportions
- Low-contrast text; text placed on busy areas; text over the snow leopard's face/eyes
- Clickbait words ("shocking", "must see", "unbelievable"), hype styling, neon saturation
- Overlays that look like ads, heavy drop shadows, noisy textures, collage layouts
- Blurry text, pixelation, compression artifacts, banding in gradients
- Extra animals, extra objects, fake scenery, "AI photo" look, painterly/cartoon styles

## QA Checklist

- [ ] Canvas is exactly 1200x630 (1.91:1).
- [ ] All critical elements are inside the safe area (>=48px from edges).
- [ ] `[Image #1]` is used as the full-bleed background with a subtle dark gradient/scrim for contrast.
- [ ] `[Image #2]` is placed as-is (no distortion, recolor, or redraw).
- [ ] Visual hierarchy is clear in one glance: logo -> title -> description -> CTA.
- [ ] CTA text is exactly "Explore Blog" (2-4 words) and high contrast.
- [ ] Copy tone is family-first, factual, and conservation-aware (no clickbait language).
- [ ] Readable at small preview size (mobile feed): title/description max about 2 lines and strong contrast.
- [ ] Accessibility: `og:image:alt` accurately describes composition and intent.
- [ ] Export format is PNG/JPG and comfortably below common parser limits (prefer <5 MB).
