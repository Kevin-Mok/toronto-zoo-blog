# Purpose

Provide a reusable single prompt that recreates the style and structure of:

- `http://localhost:3001/blog/2026/3/1/toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026`

from a mixed-media source folder (photos, videos, audio) such as:

- `/mnt/linux-files-3/hevin/03.01.26 - Toronto Zoo`

This prompt is designed to output both:

1. A finished field-notes post draft in the same editorial style.
2. A file-mapped media plan that is directly implementable.

# When To Use

Use this prompt when all of the following are true:

- You have a new zoo drop folder with mixed smartphone media files.
- You want a near-clone of the Toronto Zoo field-notes style.
- You need structured output with prose plus explicit selected assets.

Do not use this prompt for:

- Opinion essays without source media.
- Exact quote journalism requiring verbatim transcript accuracy.

# Input Folder Contract

## Required Inputs

- `{{SOURCE_FOLDER_PATH}}`: absolute folder path containing source media.
- `{{REFERENCE_STYLE_URL}}`: style target URL (default: Toronto field-notes page).
- `{{TARGET_POST_DATE}}`: publish date in `YYYY-MM-DD`.
- `{{TARGET_POST_SLUG}}`: canonical slug (kebab-case).
- `{{TARGET_POST_TITLE}}`: full publication title.

## Optional Inputs

- `{{TARGET_SPECIES_COUNT_DEFAULT=3}}`: target number of species sections.
- `{{CANONICAL_SPELLINGS_OPTIONAL}}`: list of spellings to enforce if names appear.
- `{{TARGET_POST_TITLE_DEFAULT_PATTERN=Toronto Zoo Field Notes: <Species 1>, <Species 2> & <Species 3> Highlights (<Month D, YYYY>)}}`: recommended fallback title format aligned with current canonical posts.

## Supported Source Types

- Images: `.jpg`, `.jpeg`, `.heic`
- Videos: `.mov`, `.mp4`
- Audio: `.m4a`

## Common Filename Patterns

- iPhone: `IMG_####.MOV`, `IMG_####.HEIC`
- Pixel: `PXL_*.jpg`, `PXL_*.mp4`
- Timestamped: `YYYYMMDD_HHMMSS.jpg|mp4`
- Named audio clips: `lion.m4a`, `species 2.m4a`, etc.

# Style Contract To Recreate

The generated post must follow these constraints:

1. Family-first, conservation-grounded editorial tone.
2. Factual, clear, and non-hyped writing.
3. Near-clone post skeleton:
   - Title + excerpt + metadata cues.
   - Intro with exactly 2 paragraphs.
   - Species sections (default count from input variable).
   - Preservation Lens with exactly 2 paragraphs.
4. Per species section:
   - Heading format: `<Species> Talk`.
   - Exactly 2 body paragraphs.
   - Exactly 2 photo highlights.
   - Up to 1 video highlight (include when suitable source exists).
5. Every selected media item must include:
   - Source filename traceability.
   - Alt text.
   - Caption.
6. Hero selection for previews:
   - Select one still image as the post `hero` that is the most visually stunning shot.
   - Hero output should be landscape for preview cards.
   - If the strongest still is portrait, create/plan a landscape crop derivative and use that as hero.
7. Do not fabricate direct transcript quotes unless transcript text is provided.
8. If names are present, normalize spellings using `{{CANONICAL_SPELLINGS_OPTIONAL}}`.

# Single Mega Prompt (Copy/Paste)

```text
You are an editorial + media-structuring assistant. Recreate the writing style and content structure of {{REFERENCE_STYLE_URL}} using source media from {{SOURCE_FOLDER_PATH}}.

Goal:
- Produce a near-clone field-notes article format (not verbatim text copying), with family-first tone and conservation framing.
- Output BOTH a polished post draft and a file-mapped media plan.

Inputs:
- SOURCE_FOLDER_PATH: {{SOURCE_FOLDER_PATH}}
- REFERENCE_STYLE_URL: {{REFERENCE_STYLE_URL}}
- TARGET_POST_DATE: {{TARGET_POST_DATE}}
- TARGET_POST_SLUG: {{TARGET_POST_SLUG}}
- TARGET_POST_TITLE: {{TARGET_POST_TITLE}}
- TARGET_SPECIES_COUNT_DEFAULT: {{TARGET_SPECIES_COUNT_DEFAULT=3}}
- CANONICAL_SPELLINGS_OPTIONAL: {{CANONICAL_SPELLINGS_OPTIONAL}}
- TARGET_POST_TITLE_DEFAULT_PATTERN: {{TARGET_POST_TITLE_DEFAULT_PATTERN=Toronto Zoo Field Notes: <Species 1>, <Species 2> & <Species 3> Highlights (<Month D, YYYY>)}}

Source handling rules:
1) Inspect and classify files by extension:
   - Images: .jpg .jpeg .heic
   - Videos: .mov .mp4
   - Audio: .m4a
2) Infer likely species/topic clusters from filenames and available audio/transcript cues.
3) Prefer concrete evidence over guessing. If uncertain, mark uncertainty explicitly.
4) Never invent transcript quotes.
5) Every media selection must reference exact source filename(s).

Style rules (must follow):
1) Voice: family-first, educational, conservation-aware, concise and grounded.
2) Structure:
   - Title
   - Excerpt
   - Metadata: publish date, estimated reading minutes, category, tags
   - Intro: exactly 2 paragraphs
   - Species sections: default count is TARGET_SPECIES_COUNT_DEFAULT unless source evidence strongly supports fewer/more
   - Preservation Lens: exactly 2 paragraphs
3) Species section format:
   - Heading: "<Species> Talk"
   - Exactly 2 paragraphs
   - Exactly 2 photo highlights
   - Up to 1 video highlight if suitable footage exists
4) Media text requirements:
   - Alt text: clear, literal, accessibility-first
   - Caption: concise, informative, conservation or behavior context
5) Hero requirement:
   - Choose the most visually stunning still image as `hero` for blog preview cards.
   - Keep hero landscape; if needed, create a landscape crop derivative from portrait still media.
6) If CANONICAL_SPELLINGS_OPTIONAL is provided, enforce those spellings in all copy.
7) Title formatting:
   - If TARGET_POST_TITLE is provided, use it exactly.
   - If TARGET_POST_TITLE is missing, generate a title that follows TARGET_POST_TITLE_DEFAULT_PATTERN.

Fallback behavior:
- If you cannot directly inspect media/audio content, output a "Needed Inputs" block listing missing items and continue with a best-effort draft based on filenames only.
- Clearly label assumptions.

Return output in this exact order and heading names:

# Needed Inputs (only if required)
- List missing files or analyses needed to increase confidence.

# Post Draft
## Title
## Excerpt
## Metadata
- publish_date:
- slug:
- category:
- tags:
- reading_minutes:
- hero_source_file:

## Intro
- Paragraph 1
- Paragraph 2

## Sections
### <Species 1> Talk
- Paragraph 1
- Paragraph 2

Photo Highlights:
1) source_file:
   alt:
   caption:
2) source_file:
   alt:
   caption:

Video Highlight (optional):
- source_file:
- suggested_output_file:
- poster_suggestion:
- alt:
- caption:
- duration_label_estimate:

### <Species 2> Talk
[same structure]

### <Species 3> Talk
[same structure]

## Preservation Lens
- Paragraph 1
- Paragraph 2

# Media Plan
Provide a table with these columns:
- section_id
- section_title
- asset_type (image|video|audio_reference)
- source_filename
- selected (yes|no)
- derivative_recommendation (for example: webp conversion, square crop, poster frame)
- alt_text
- caption
- rationale
- conversion_notes (for video: H.264 + AAC + yuv420p + faststart)

# Quality Self-Check
- Confirm intro paragraph count = 2
- Confirm each section paragraph count = 2
- Confirm each section photo count = 2
- Confirm each selected asset has source filename + alt text + caption
- Confirm hero uses the strongest still image and outputs in landscape orientation (or landscape crop derivative)
- Confirm preservation lens paragraph count = 2
- Confirm no fabricated transcript quotes
- Confirm family-first conservation tone
```

# Expected Output Format (Content + Media Plan)

The model output must always include:

1. `Post Draft` with near-clone structure and exact section cardinality rules.
2. `Media Plan` with source-file traceability and implementation notes.

Minimum fields that must be present:

- `publish_date`
- `slug`
- `category`
- `tags`
- `reading_minutes`
- `hero_source_file`
- Per selected asset: `source_filename`, `alt_text`, `caption`

# Quality Gate Checklist

Mark each item pass/fail before accepting output:

- [ ] Intro has exactly 2 paragraphs.
- [ ] Preservation Lens has exactly 2 paragraphs.
- [ ] Each species section has exactly 2 paragraphs.
- [ ] Each species section has exactly 2 photo highlights.
- [ ] Video highlight is included only when suitable source exists.
- [ ] All selected assets map to real source filenames.
- [ ] Every selected asset has alt text and caption.
- [ ] Hero uses the most visually stunning still image and is landscape-oriented (or a landscape crop derivative).
- [ ] No fabricated transcript quotes.
- [ ] Family-first, educational, conservation-grounded voice is maintained.
- [ ] Output includes both `Post Draft` and `Media Plan`.
- [ ] Conversion notes include compatibility guidance for videos.
- [ ] Any assumptions are explicit and easy to review.

# Reuse Notes For Future Zoo Folders

1. Keep the style target URL the same unless intentionally changing house style.
2. Update only variables (`SOURCE_FOLDER_PATH`, date, slug, spellings, section count).
3. If folder includes transcripts, add them as additional context and allow stronger factual detail.
4. If species count differs from 3, set `TARGET_SPECIES_COUNT_DEFAULT` accordingly.
5. Keep the quality gate unchanged to preserve consistency across posts.
