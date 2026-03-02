# Blog Post OG Image Generation Spec (Reusable)

Use this spec to generate a final Open Graph image asset for any blog post using the post image you provide.

## Input Mapping For Attached Images

- `[Image #1]`: required blog post image you provide for this run (must be the background source).
- `[Image #2]`: optional logo/wordmark image you provide for this run.

## Required Variables

- `{{POST_TITLE}}`: final post title for the OG card headline.
- `{{POST_DESCRIPTION}}`: supporting line for the OG card.
- `{{CTA_TEXT}}`: short CTA (2-4 words, example: `Read Post`).
- `{{POST_IMAGE_ALT_CONTEXT}}`: short description of what is visible in `[Image #1]` for accessibility.

## Optional Variables

- `{{LOGO_USAGE}}`: `show` or `hide`.
- `{{BRAND_NAME}}`: optional label text if no logo is used.
- `{{ACCENT_COLOR}}`: optional button/chip color.

## Gemini Resize/Recompose Prompt (From Current OG Image)

Use this when you already have a composed draft image but need a platform-safe OG export.

```text
You are editing an existing Open Graph image to make it platform-safe while preserving the same design and content.

Input image:
- Current composed OG draft for this blog post.

Goal:
- Recompose to exactly 1200x630 (1.91:1) for Open Graph.
- Keep the same overall look, brand feel, and text content.
- Do not redesign from scratch.

Hard requirements:
1) Output size must be exactly 1200x630 PNG.
2) Keep all critical elements inside a safe area at least 48px from each edge.
3) Preserve the main subject in the source post image; do not crop away the focal point.
4) If a logo is present, keep logo style and proportions unchanged.
5) Keep title, description, and CTA text exactly as written.
6) Keep CTA text exactly: "{{CTA_TEXT}}".

Recomposition instructions:
- Convert from non-OG ratio to 1.91:1 by recomposing, not naive center-cropping.
- Maintain clear hierarchy: logo/brand -> title -> description -> CTA.
- If spacing is tight, reduce description font size slightly before changing layout hierarchy.
- Keep background natural, with subtle dark scrim/gradient where text sits for readability.
- Keep contrast strong enough for mobile preview readability.

Exact text to preserve:
- Title: "{{POST_TITLE}}"
- Description: "{{POST_DESCRIPTION}}"
- CTA: "{{CTA_TEXT}}"

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
Create a single blog post Open Graph image at exactly 1200x630 (1.91:1).

STRICT INPUTS (must use as-is):
- Use attached [Image #1] as the full-bleed background base (no swapping, no synthetic replacement background).
- If [Image #2] is provided and LOGO_USAGE=show, use it as the logo exactly as provided (no recolor, no restyling, no distortion, no redraw).

COMPOSITION + SAFE AREA:
- Keep ALL critical elements at least 48px from every edge.
- Do not cover the main focal subject in [Image #1] with headline text.

BACKGROUND TREATMENT:
- Keep [Image #1] photoreal and intact.
- Add a subtle dark gradient/scrim for readability where text sits.
- No heavy vignette, no oversharpen halos, no artificial scenery.

LAYOUT (clear hierarchy: logo/brand -> title -> description -> CTA):
1) Top-left branding:
   - If LOGO_USAGE=show and [Image #2] exists: place [Image #2] at x=48px, y=48px, preserving aspect ratio.
   - If no logo: place {{BRAND_NAME}} as a compact text label in the same position.

2) Title (below branding, left-aligned):
   - Headline text (exact): "{{POST_TITLE}}"
   - Editorial sans-serif, bold, high contrast, max 2 lines.
   - Keep within safe area and optimize for small social preview readability.

3) Description (below title, left-aligned):
   - Description text (exact): "{{POST_DESCRIPTION}}"
   - Medium weight, max 2 lines, slightly lower prominence than title.

4) CTA (bottom-left):
   - Label (exact): "{{CTA_TEXT}}"
   - Pill/button treatment, high contrast, inside safe area.
   - If {{ACCENT_COLOR}} is provided, use it for button fill or outline.

STYLE:
- Clean, editorial, nature-forward, factual.
- Catchy but not clickbait.
- No collage effects, no visual clutter.
- Export as a sharp, share-ready PNG or JPG under 5 MB.

OpenGraph quality targets:
- Keep headline concise to reduce truncation risk (target <= 60 chars).
- Keep supporting description readable and compact (target 110-160 chars).
- Ensure strong contrast and legibility on mobile.
```

## Negative Prompt

- Warped/recolored/redrawn logo; stretched proportions
- Low-contrast text; text on noisy high-detail zones; text over the focal subject
- Clickbait words ("shocking", "must see", "unbelievable"), hype styling, neon saturation
- Heavy shadows, noisy textures, cluttered badge stacks, collage layouts
- Blurry text, pixelation, compression artifacts, gradient banding
- Synthetic replacement backgrounds, fake animals, painterly/cartoon look

## QA Checklist

- [ ] Canvas is exactly 1200x630 (1.91:1).
- [ ] All critical elements are inside the safe area (>=48px from edges).
- [ ] `[Image #1]` is used as the real full-bleed background (not replaced).
- [ ] Main focal subject in `[Image #1]` is preserved and not blocked by text.
- [ ] If `[Image #2]` is used, it is unchanged (no distortion, recolor, redraw).
- [ ] Visual hierarchy is clear in one glance: logo/brand -> title -> description -> CTA.
- [ ] CTA is 2-4 words and high contrast.
- [ ] Copy tone is factual and non-clickbait.
- [ ] Readable at small preview size (mobile feed).
- [ ] Accessibility: `og:image:alt` should accurately describe composition + subject using `{{POST_IMAGE_ALT_CONTEXT}}`.
- [ ] Export is PNG/JPG and under 5 MB.
- [ ] Validate in OpenGraph preview/debug tools before publishing:
  - https://www.opengraph.xyz
