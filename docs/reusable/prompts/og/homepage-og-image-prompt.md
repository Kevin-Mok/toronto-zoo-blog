# Purpose

Provide a reusable prompt document to generate a high-performing homepage Open Graph image for Toronto Zoo Report using:

- Word logo image (`Image #1`) as a direct image input
- Hero image as a direct image input:
  - `http://localhost:3000/_next/image?url=%2Fmedia%2Fhero-image.png&w=1920&q=75`

This prompt is designed to improve social preview quality by enforcing practical OpenGraph checks (dimension, text clarity, CTA visibility, and accessibility).

Related context doc:

- [homepage-og-title-description-context.md](/home/kevin/coding/zoo-blog/docs/reusable/prompts/og/homepage-og-title-description-context.md)

# When To Use

Use this prompt when:

- creating or refreshing the homepage OG card visual,
- you want stronger share-card click-through with clear value proposition + CTA,
- you want a single prompt that outputs both image direction and metadata copy.

# Input Contract

## Required Inputs

- `{{BRAND_NAME}}`: `Toronto Zoo Report`
- `{{LOGO_WORDMARK_IMAGE_URL}}`: `http://localhost:3000/media/logo-word.png`
- `{{HERO_BACKGROUND_IMAGE_URL}}`: `http://localhost:3000/_next/image?url=%2Fmedia%2Fhero-image.png&w=1920&q=75`
- `{{PRIMARY_CTA_TEXT}}`: short action phrase (example: `Explore Blog`)
- `{{HOMEPAGE_URL}}`: canonical homepage URL

## Optional Inputs

- `{{LOGO_WORDMARK_LOCAL_FALLBACK_PATH}}`: `public/media/logo-word.png`
- `{{HERO_LOCAL_FALLBACK_PATH}}`: `public/media/hero-image.png`
- `{{OG_TITLE_LONG}}`: long headline candidate (target 55-85 chars)
- `{{OG_DESCRIPTION_LONG}}`: long description candidate (target 110-180 chars)
- `{{SECONDARY_BADGE_TEXT}}`: short trust marker (example: `Family-first reporting`)
- `{{SEASONAL_CONTEXT}}`: optional context label (example: `Spring visits 2026`)

# OpenGraph Quality Targets (Practical Metrics)

Use these as hard checks before accepting output:

1. Canvas: `1200x630` (`1.91:1`).
2. Export: PNG or JPG, keep file size under `5 MB` (prefer much smaller when possible).
3. Readability: all key text must remain legible on mobile previews.
4. Title quality: clear value statement, avoid vague phrasing, keep display-friendly length.
5. Description quality: informative and scannable; avoid keyword stuffing.
6. CTA: one clear CTA, 2-4 words, high contrast, easy to find.
7. Brand recognition: wordmark visible without overpowering the headline.
8. Safe area: keep critical text and logo away from edges (at least ~48 px).
9. Contrast: preserve strong text/background contrast using gradient or scrim.
10. Accessibility: produce accurate `og:image:alt` text describing scene + purpose.

# Composition Guidance

1. Background:
   - Use `{{HERO_BACKGROUND_IMAGE_URL}}` as full-bleed base.
   - Apply subtle dark gradient overlay for text contrast.
2. Logo:
   - Use `{{LOGO_WORDMARK_IMAGE_URL}}` exactly; do not redraw or restyle the wordmark.
   - Place top-left or top-center with balanced spacing.
3. Headline and description:
   - Keep headline dominant and concise.
   - Support with one description block (max 2 lines visually).
4. CTA module:
   - Add a clean button/chip style CTA (`{{PRIMARY_CTA_TEXT}}`).
   - Keep CTA near bottom-left or bottom-center within safe area.
5. Thoughtful additions:
   - Add one credibility cue (example: `Animal updates + conservation context`).
   - Add optional seasonal/context badge only if it improves clarity.
   - Avoid clutter, busy icon sets, or too many badges.

# Single Mega Prompt (Copy/Paste)

```text
You are a senior social-preview designer creating a homepage Open Graph card for a news-style wildlife publication.

Design objective:
- Produce a high-CTR, brand-consistent OG image with clear hierarchy (logo -> title -> description -> CTA).
- Ensure the card remains readable and compelling in small social feed previews.

Inputs:
- Brand: {{BRAND_NAME}} (Toronto Zoo Report)
- Logo wordmark image URL: {{LOGO_WORDMARK_IMAGE_URL}}
- Hero background image URL: {{HERO_BACKGROUND_IMAGE_URL}}
- Logo fallback local path: {{LOGO_WORDMARK_LOCAL_FALLBACK_PATH}}
- Hero fallback local path: {{HERO_LOCAL_FALLBACK_PATH}}
- Primary CTA: {{PRIMARY_CTA_TEXT}}
- Homepage URL: {{HOMEPAGE_URL}}
- Optional long title candidate: {{OG_TITLE_LONG}}
- Optional long description candidate: {{OG_DESCRIPTION_LONG}}
- Optional secondary badge: {{SECONDARY_BADGE_TEXT}}
- Optional seasonal context: {{SEASONAL_CONTEXT}}

Hard constraints:
1) Output composition sized for 1200x630 (1.91:1).
2) Keep all essential text and logo inside safe margins (~48px+ from edges).
3) Use the provided hero background image as base; add a subtle dark gradient/scrim for text contrast.
4) Use the provided logo image file as-is; preserve proportions and colors, no stylization/distortion.
5) Do not generate replacement logo art or synthetic background photography.
6) Include:
   - one clear headline,
   - one supporting description line/block,
   - one primary CTA label (2-4 words).
7) Keep visual style editorial, nature-forward, modern, and clean; no noisy collage look.
8) Ensure strong contrast and legibility on mobile previews.
9) Keep text concise enough to avoid clutter while still carrying a "long-form" information feel.

Copy guidance:
- Headline: promise value in plain language.
- Description: explain what visitors get (animal updates, keeper-talk summaries, conservation context).
- CTA: direct and action-oriented (example: "Explore Blog").

Output format (required):
1) OG_IMAGE_PROMPT:
   - Final image-generation prompt text.
2) NEGATIVE_PROMPT:
   - Artifacts to avoid (illegible text, warped logos, busy overlays, low contrast).
3) COPY_BLOCK:
   - og_title:
   - og_description:
   - cta_text:
   - credibility_badge:
4) ACCESSIBILITY:
   - og_image_alt:
5) SELF_CHECK:
   - confirm dimensions 1200x630
   - confirm logo preserved
   - confirm CTA present and visible
   - confirm high contrast
   - confirm safe-area spacing
   - confirm output is platform-share ready
```

# Example Variable Set

```text
{{BRAND_NAME}}=Toronto Zoo Report
{{LOGO_WORDMARK_IMAGE_URL}}=http://localhost:3000/media/logo-word.png
{{HERO_BACKGROUND_IMAGE_URL}}=http://localhost:3000/_next/image?url=%2Fmedia%2Fhero-image.png&w=1920&q=75
{{LOGO_WORDMARK_LOCAL_FALLBACK_PATH}}=public/media/logo-word.png
{{HERO_LOCAL_FALLBACK_PATH}}=public/media/hero-image.png
{{PRIMARY_CTA_TEXT}}=Explore Blog
{{HOMEPAGE_URL}}=https://torontozooreport.com
{{OG_TITLE_LONG}}=Family-first Toronto Zoo reporting with field notes, keeper talk summaries, and conservation context
{{OG_DESCRIPTION_LONG}}=Get clear, evidence-minded updates on animal behavior, daily care highlights, and conservation accountability from on-site reporting at the Toronto Zoo.
{{SECONDARY_BADGE_TEXT}}=Animal updates + conservation context
{{SEASONAL_CONTEXT}}=Spring visits 2026
```

# Quality Gate Checklist

- [ ] Output is explicitly designed for `1200x630`.
- [ ] Prompt explicitly includes both source image inputs (logo + hero).
- [ ] Wordmark is preserved and legible.
- [ ] Background uses provided hero image (URL or local fallback path).
- [ ] Visual hierarchy is clear in first glance.
- [ ] CTA is present, concise, and high contrast.
- [ ] Headline and description are informative but not cluttered.
- [ ] `og:image:alt` text is specific and useful.
- [ ] Final composition is readable at small preview size.
- [ ] No visual noise, logo distortion, or low-contrast text.
