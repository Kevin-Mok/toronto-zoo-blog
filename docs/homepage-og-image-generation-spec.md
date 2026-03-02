# Homepage OG Image Generation Spec

Use this spec to manually generate the final homepage Open Graph image asset.

## Image Generation Prompt

```text
Create a single homepage Open Graph image for "Toronto Zoo Report" at exactly 1200x630 (1.91:1).

STRICT INPUTS (must use as-is):
- Use the attached hero-image.png as the full-bleed background base (no swapping, no synthetic replacement background).
- Use the attached logo-word.png as the wordmark exactly as provided (no recolor, no restyling, no distortion, no redraw).

COMPOSITION + SAFE AREA:
- Keep ALL critical elements (logo, headline, description, CTA) at least 48px from every edge.
- Do not cover the snow leopard's face or eyes with text; preserve the photo's focal point.

BACKGROUND TREATMENT:
- Keep hero-image.png photoreal and intact.
- Add a subtle dark gradient/scrim for readability: strongest on the left side where text sits, fading toward the right so the leopard stays natural and clear.
- No heavy vignette, no HDR glow, no oversharpen halos.

LAYOUT (clear hierarchy: logo -> title -> description -> CTA):
1) Logo (top-left):
   - Place logo-word.png at x=48px, y=48px.
   - Scale to a width around 420-480px (keep aspect ratio), crisp and fully legible.

2) Title (below logo, left-aligned):
   - Headline text (exact): "Toronto Zoo field notes for families"
   - Modern editorial sans-serif (Inter / system), bold, ~64-72px size, tight line-height (1.05-1.12).
   - Max 2 lines, high-contrast white (#FFFFFF) with very subtle shadow for separation.

3) Description (below title, left-aligned):
   - Body text (exact): "Animal updates, keeper-talk summaries, and conservation context."
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
- [ ] `hero-image.png` is used as the full-bleed background with a subtle dark gradient/scrim for contrast.
- [ ] `logo-word.png` is placed as-is (no distortion, recolor, or redraw).
- [ ] Visual hierarchy is clear in one glance: logo -> title -> description -> CTA.
- [ ] CTA text is exactly "Explore Blog" (2-4 words) and high contrast.
- [ ] Copy tone is family-first, factual, and conservation-aware (no clickbait language).
- [ ] Readable at small preview size (mobile feed): title/description max about 2 lines and strong contrast.
- [ ] Accessibility: `og:image:alt` accurately describes composition and intent.
- [ ] Export format is PNG/JPG and comfortably below common parser limits (prefer <5 MB).
