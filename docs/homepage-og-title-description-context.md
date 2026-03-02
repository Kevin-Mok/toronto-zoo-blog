# Purpose

Provide context and reusable prompts for generating high-quality homepage `og:title` and `og:description` copy for Toronto Zoo Report.

Use this with:

- [homepage-og-image-prompt.md](/home/kevin/coding/zoo-blog/docs/homepage-og-image-prompt.md)

# Brand Context To Preserve

Core positioning for homepage copy:

- Family-first Toronto Zoo reporting
- Clear animal updates and keeper-talk summaries
- Conservation context and accountability lens
- Plain-language tone, factual, no hype

Copy should feel:

- trustworthy,
- specific,
- calm and useful,
- action-oriented without clickbait.

# Input Contract

## Required Inputs

- `{{BRAND_NAME}}`: `Toronto Zoo Report`
- `{{PRIMARY_AUDIENCE}}`: parents, families, zoo visitors, wildlife-curious readers
- `{{VALUE_PILLARS}}`: animal updates; keeper-talk summaries; conservation context
- `{{PRIMARY_CTA}}`: `Explore Blog`

## Optional Inputs

- `{{SEASONAL_CONTEXT}}`: optional time cue (example: `Spring visits 2026`)
- `{{PRIORITY_KEYWORDS}}`: optional SEO phrases to include naturally
- `{{EXCLUDE_TERMS}}`: words/phrases to avoid

# Length Targets (Practical Social Preview Guardrails)

There is no single universal hard cap across platforms, but these ranges are reliable for social card readability:

- `og:title` working target: `45-65` chars
- `og:title` long variant target: `55-85` chars
- `og:description` working target: `90-140` chars
- `og:description` long variant target: `110-180` chars

Rules:

1. Write for clarity first, then trim.
2. Put core value words early.
3. Avoid duplicate wording between title and description.
4. Keep one idea per sentence.

# Title Generation Framework

Use this formula:

`[Who/What] + [What value users get] + [Context marker]`

Examples:

- `Family-first Toronto Zoo reporting with clear animal updates`
- `Toronto Zoo Report: field notes, keeper talks, and conservation context`
- `Toronto Zoo updates for families with a gentle watchdog lens`

Title quality checks:

- Is the subject obvious in the first 5 words?
- Is there a concrete value promise?
- Is the tone factual, not promotional fluff?

# Description Generation Framework

Use this formula:

`[What readers get] + [How coverage is produced] + [Why it is useful now]`

Examples:

- `Get evidence-minded updates on animal behavior, daily care highlights, and conservation accountability from on-site Toronto Zoo reporting.`
- `Read plain-language field notes, keeper-talk summaries, and conservation context designed for parents, families, and curious visitors.`

Description quality checks:

- Adds new information beyond the title
- Includes 2-3 concrete content cues
- Stays readable in one breath

# Copy Constraints (Do / Avoid)

Do:

- Use concrete nouns: `animal updates`, `keeper talks`, `field notes`, `conservation context`
- Keep verbs active: `read`, `explore`, `track`, `learn`
- Preserve editorial neutrality

Avoid:

- clickbait (`shocking`, `you won't believe`)
- vague claims (`best coverage ever`)
- stacked adjectives and buzzwords
- repeating the same phrase in both fields

# Single Prompt: Generate Ranked `og:title` + `og:description`

```text
You are an editorial metadata specialist.
Generate homepage Open Graph copy for Toronto Zoo Report.

Inputs:
- BRAND_NAME: {{BRAND_NAME}}
- PRIMARY_AUDIENCE: {{PRIMARY_AUDIENCE}}
- VALUE_PILLARS: {{VALUE_PILLARS}}
- PRIMARY_CTA: {{PRIMARY_CTA}}
- SEASONAL_CONTEXT: {{SEASONAL_CONTEXT}}
- PRIORITY_KEYWORDS: {{PRIORITY_KEYWORDS}}
- EXCLUDE_TERMS: {{EXCLUDE_TERMS}}

Requirements:
1) Generate 12 title options and 12 description options.
2) Keep titles in two buckets:
   - 6 options in 45-65 chars
   - 6 options in 55-85 chars
3) Keep descriptions in two buckets:
   - 6 options in 90-140 chars
   - 6 options in 110-180 chars
4) Maintain family-first, factual, conservation-aware tone.
5) Avoid hype and clickbait.
6) Do not repeat exact phrase structures across options.
7) Return a top 3 pairings with rationale.

Return format:
# Title Options
- [id] [char_count] title

# Description Options
- [id] [char_count] description

# Top Pairings
1) title_id + description_id
   - Why this pairing is strongest:
   - Risk/tradeoff:
2) ...
3) ...

# Final Recommendation
- og:title:
- og:description:
- why this final pick:
```

# Quick QA Checklist

- [ ] Title is clear within first glance.
- [ ] Description adds specifics not already in title.
- [ ] Character targets are met.
- [ ] Tone matches Toronto Zoo Report editorial voice.
- [ ] No clickbait or inflated claims.
- [ ] Final pair is easy to scan in social previews.

