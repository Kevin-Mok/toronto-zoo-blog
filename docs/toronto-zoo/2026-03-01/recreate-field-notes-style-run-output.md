# Needed Inputs (only if required)
- Confirm final slug. This run uses `toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026` because no `TARGET_POST_SLUG` override was provided.
- Confirm species labels for publication-level taxonomy. Visual checks support pygmy hippo, African penguin, and western lowland gorilla, but no keeper transcript text was provided in this run.
- Provide transcripts for `lion*.m4a` and `species*.m4a` if you want transcript-grounded lion coverage in this specific post.

# Post Draft
## Title
Toronto Zoo Field Notes: Pygmy Hippo, Penguins, Gorillas & White Lions (March 1, 2026)

## Excerpt
A family-first Toronto Zoo field note focused on pygmy hippo, penguin, and gorilla behavior, with practical media picks and conservation context.

## Metadata
- publish_date: 2026-03-01
- slug: toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026
- category: field-notes
- tags: family-guide, toronto-zoo, pygmy-hippo, penguin, gorilla
- reading_minutes: 7

## Intro
- Paragraph 1
This field note is built for families who want clear animal observations they can discuss with kids while moving through the zoo at a steady pace. The selected media offers short, readable moments that connect behavior to habitat design and everyday care routines.
- Paragraph 2
Because transcripts were not available for this media drop, the draft is grounded in direct visual evidence and filename-traceable assets. Each section follows one repeatable structure for consistency: two photo highlights, one optional video highlight, and concise conservation-aware interpretation.

## Sections
### Pygmy Hippopotamus Talk
- Paragraph 1
The pygmy hippo cluster is the strongest sequence in this set, with clear feeding behavior across still images and short video. The animal moves calmly between hay and browse, making it easy for families to observe posture changes, pacing, and enclosure use without needing long narration.
- Paragraph 2
This section supports a practical welfare discussion for both kids and adults: food placement, substrate type, and enclosure layout all influence what visitors can see and how the animal interacts with its space. The selected visuals keep that connection concrete instead of abstract.

Photo Highlights:
1) source_file: PXL_20260301_194618078.jpg
   alt: Pygmy hippopotamus standing in a sandy indoor habitat beside a feeding area
   caption: Pygmy hippo paused near browse and hay, with enclosure features visible for behavior context.
2) source_file: PXL_20260301_194932780.jpg
   alt: Close view of a pygmy hippopotamus eating hay near the exhibit wall
   caption: Tight framing on feeding behavior to support a family-friendly observation prompt.

Video Highlight (optional):
- source_file: PXL_20260301_194650704.TS.mp4
- suggested_output_file: pygmy-hippo-highlight.mp4
- poster_suggestion: pygmy-hippo-highlight-poster.webp
- alt: Pygmy hippopotamus moving between feeding spots in its habitat
- caption: Short hippo movement clip showing feeding transitions and pacing in the enclosure.
- duration_label_estimate: 12.5s

### African Penguin Talk
- Paragraph 1
The penguin media captures group resting and short repositioning around the pool edge, giving families a straightforward way to discuss social spacing and routine behavior. Body orientation and clustering are visible in both selected stills, which makes this section strong for kid-friendly observation prompts.
- Paragraph 2
For conservation framing, this section works best when linked to care systems visitors can understand: water quality, habitat temperature, and predictable rest zones. The images and clip keep attention on observable behavior rather than treating the habitat as background scenery.

Photo Highlights:
1) source_file: IMG_0686.HEIC
   alt: Group of penguins standing and resting beside an indoor pool
   caption: Penguin group cluster near the pool edge with clear resting and social spacing cues.
2) source_file: IMG_0693.HEIC
   alt: Penguins distributed across rocks and deck around a shallow pool
   caption: Wider penguin scene showing multiple positions around the same water feature.

Video Highlight (optional):
- source_file: IMG_0681.MOV
- suggested_output_file: african-penguin-highlight.mp4
- poster_suggestion: african-penguin-highlight-poster.webp
- alt: Penguins shifting positions near the pool and rocky deck
- caption: Short movement clip to pair group stills with live behavior.
- duration_label_estimate: 11.8s

### Western Lowland Gorilla Talk
- Paragraph 1
The gorilla section centers on rest and perch use in a rope-and-platform enrichment setup. A seated portrait plus hammock frame gives families a clear view of grip, body support, and how primates use suspended structures for comfort and positioning.
- Paragraph 2
The conservation lens here is welfare-by-design: vertical complexity, enrichment options, and stable routines shape visible behavior over time. This set stays grounded by emphasizing body language and enclosure interaction without over-claiming from limited footage.

Photo Highlights:
1) source_file: IMG_0704.HEIC
   alt: Gorilla seated upright on a raised platform while holding overhead rope
   caption: Calm seated posture in the primate habitat with rope structure clearly visible.
2) source_file: IMG_0711.HEIC
   alt: Gorilla reclining in a hammock-like enrichment net
   caption: Resting position in suspended enrichment, highlighting grip and body support.

Video Highlight (optional):
- source_file: 20260301_150313.mp4
- suggested_output_file: gorilla-highlight.mp4
- poster_suggestion: gorilla-highlight-poster.webp
- alt: Gorillas moving through a netted enrichment space near the viewing glass
- caption: Gorilla movement and rest transitions in a rope-and-platform environment.
- duration_label_estimate: 14.7s

## Preservation Lens
- Paragraph 1
Preservation is easiest for families to understand when behavior is linked to systems they can actually see: feeding setup, enclosure complexity, and opportunities for rest and movement. That framing turns a zoo stop into a practical conversation instead of a simple species checklist.
- Paragraph 2
For future drops, educational value improves when transcript-backed notes are paired with traceable visuals and explicit uncertainty labels where audio is not transcribed. This keeps the post factual, reusable, and transparent for both children and adults.

# Media Plan
| section_id | section_title | asset_type (image|video|audio_reference) | source_filename | selected (yes|no) | derivative_recommendation (for example: webp conversion, square crop, poster frame) | alt_text | caption | rationale | conversion_notes (for video: H.264 + AAC + yuv420p + faststart) |
|---|---|---|---|---|---|---|---|---|---|
| pygmy-hippo | Pygmy Hippopotamus Talk | image | PXL_20260301_194618078.jpg | yes | Convert to webp, preserve landscape crop | Pygmy hippopotamus standing in a sandy indoor habitat beside a feeding area | Pygmy hippo paused near browse and hay, with enclosure features visible for behavior context. | Sharp posture and clear enclosure context | n/a |
| pygmy-hippo | Pygmy Hippopotamus Talk | image | PXL_20260301_194932780.jpg | yes | Convert to webp, mild contrast adjustment | Close view of a pygmy hippopotamus eating hay near the exhibit wall | Tight framing on feeding behavior to support a family-friendly observation prompt. | Strong close-up for behavior detail | n/a |
| pygmy-hippo | Pygmy Hippopotamus Talk | video | PXL_20260301_194650704.TS.mp4 | yes | Re-encode to delivery mp4, generate poster at 00:03 | Pygmy hippopotamus moving between feeding spots in its habitat | Short hippo movement clip showing feeding transitions and pacing in the enclosure. | Motion counterpart to stills | ffmpeg: `-c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac` |
| african-penguin | African Penguin Talk | image | IMG_0686.HEIC | yes | Convert HEIC to webp, auto-rotate via EXIF | Group of penguins standing and resting beside an indoor pool | Penguin group cluster near the pool edge with clear resting and social spacing cues. | Best group composition for social behavior | n/a |
| african-penguin | African Penguin Talk | image | IMG_0693.HEIC | yes | Convert HEIC to webp, retain wide framing | Penguins distributed across rocks and deck around a shallow pool | Wider penguin scene showing multiple positions around the same water feature. | Adds habitat context around pool layout | n/a |
| african-penguin | African Penguin Talk | video | IMG_0681.MOV | yes | Re-encode to delivery mp4, generate poster at 00:04 | Penguins shifting positions near the pool and rocky deck | Short movement clip to pair group stills with live behavior. | Adds motion and spacing behavior | ffmpeg: `-c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac` |
| western-lowland-gorilla | Western Lowland Gorilla Talk | image | IMG_0704.HEIC | yes | Convert HEIC to webp, center crop for subject | Gorilla seated upright on a raised platform while holding overhead rope | Calm seated posture in the primate habitat with rope structure clearly visible. | Clear portrait-style behavior frame | n/a |
| western-lowland-gorilla | Western Lowland Gorilla Talk | image | IMG_0711.HEIC | yes | Convert HEIC to webp, slight denoise | Gorilla reclining in a hammock-like enrichment net | Resting position in suspended enrichment, highlighting grip and body support. | Strong enrichment interaction frame | n/a |
| western-lowland-gorilla | Western Lowland Gorilla Talk | video | 20260301_150313.mp4 | yes | Re-encode to delivery mp4, poster at 00:05 | Gorillas moving through a netted enrichment space near the viewing glass | Gorilla movement and rest transitions in a rope-and-platform environment. | Completes behavior sequence for section | ffmpeg: `-c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac` |
| lion-audio | Lion Audio Cluster | audio_reference | lion interview.m4a | no | Transcribe and summarize before editorial use | n/a | n/a | Named audio suggests additional species coverage not yet integrated | n/a |
| lion-audio | Lion Audio Cluster | audio_reference | lion 2.m4a | no | Transcribe and summarize before editorial use | n/a | n/a | Potential lion section support | n/a |
| lion-audio | Lion Audio Cluster | audio_reference | lion 10.m4a | no | Transcribe and summarize before editorial use | n/a | n/a | Additional lion context pending transcript | n/a |
| species-audio | Unclassified Species Audio | audio_reference | species 2.m4a | no | Transcribe and classify species mentions | n/a | n/a | Species mention is unclear from filename alone | n/a |
| species-audio | Unclassified Species Audio | audio_reference | species 50.m4a | no | Transcribe and classify species mentions | n/a | n/a | Possible additional section support once transcribed | n/a |

# Quality Self-Check
- Confirm intro paragraph count = 2: pass
- Confirm each section paragraph count = 2: pass
- Confirm each section photo count = 2: pass
- Confirm each selected asset has source filename + alt text + caption: pass
- Confirm preservation lens paragraph count = 2: pass
- Confirm no fabricated transcript quotes: pass
- Confirm family-first conservation tone: pass
