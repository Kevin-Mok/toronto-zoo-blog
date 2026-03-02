# Homepage OG: Exact ChatGPT Prompt

Use this doc to generate full homepage Open Graph outputs (copy + image prompt + QA) in one run.

Implementation artifacts from the latest run:
- `/home/kevin/coding/zoo-blog/docs/archive/og/homepage-og-chatgpt-prompt-response.md`
- `/home/kevin/coding/zoo-blog/docs/reusable/prompts/og/homepage-og-image-generation-spec.md`

## Files To Upload To ChatGPT

1. `docs/reusable/prompts/og/homepage-og-image-prompt.md`
2. `docs/reusable/prompts/og/homepage-og-title-description-context.md`
3. `public/media/logo-word.png`
4. `public/media/hero-image.png`

## Exact Prompt To Paste

```text
Generate complete homepage Open Graph assets for Toronto Zoo Report.

Treat attached files as strict inputs:
- Spec docs:
  1) homepage-og-image-prompt.md
  2) homepage-og-title-description-context.md
- Source images:
  1) logo-word.png (must be used as-is for wordmark)
  2) hero-image.png (must be used as the background base)

Brand + product context:
- Brand: Toronto Zoo Report
- URL: https://torontozooreport.com
- Audience: families, parents, zoo visitors, wildlife-curious readers
- Core value pillars: animal updates, keeper-talk summaries, conservation context
- Primary CTA text: Explore Blog

Hard constraints:
- Canvas must be 1200x630
- Keep all critical text/logo in safe area (>=48px from edges)
- Use hero-image.png as full-bleed background with subtle dark gradient/scrim
- Preserve logo-word.png proportions/colors; do not redesign or restyle logo
- Family-first, factual, conservation-aware tone
- No clickbait or hype language
- Clear hierarchy: logo -> title -> description -> CTA
- Ensure readability at small social preview size

Return exactly these sections:

1) FINAL_METADATA
- og:title
- og:description
- og:image:alt
- twitter:title
- twitter:description
- twitter:image:alt

2) RANKED_COPY_OPTIONS
- 12 title options with character counts
- 12 description options with character counts
- top 3 title+description pairings with rationale and tradeoff

3) IMAGE_GENERATION_PROMPT
- one production-ready image prompt using the provided logo + hero image
- include precise layout, typography direction, color/contrast treatment, safe-area rules, and CTA placement

4) NEGATIVE_PROMPT
- explicit artifacts/problems to avoid

5) QA_CHECKLIST
- pass/fail checks against all constraints above
```

## Optional Add-On Line

Append this line if you also want immediate creative variants:

```text
Also generate 3 OG image variants now using the attached images and label them Variant A/B/C.
```
