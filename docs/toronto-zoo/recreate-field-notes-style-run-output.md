# Needed Inputs (only if required)
- Confirm final slug. This run uses `toronto-zoo-field-notes` from the prompt defaults.
- Confirm publication-level species labels if you want stricter taxonomy wording in final copy. Visual checks support pygmy hippo, African penguin, and western lowland gorilla.
- Provide transcripts for `lion*.m4a` and `species*.m4a` if you want transcript-grounded lion coverage in this draft.

# Post Draft
## Title
Toronto Zoo Field Notes (March 1, 2026)

## Excerpt
A family-first Toronto Zoo field note focused on pygmy hippo, penguin, and gorilla behavior, with practical media picks and conservation context.

## Metadata
- publish_date: 2026-03-01
- slug: toronto-zoo-field-notes
- category: field-notes
- tags: family-guide, toronto-zoo, pygmy-hippo, penguin, gorilla
- reading_minutes: 7

## Intro
- Paragraph 1
This field note is designed for families who want clear, talk-through observations while moving through the zoo at a steady pace. The selected media emphasizes short, readable behavior moments that connect directly to habitat design and daily care.
- Paragraph 2
Because transcript text was not available in this run, the draft is grounded in visual evidence and filename-traceable assets only. Each animal section follows the same repeatable structure: two photo highlights, one optional video highlight, and concise conservation-aware context.

## Sections
### Pygmy Hippopotamus Talk
- Paragraph 1
The pygmy hippo sequence is the strongest cluster in this drop, with clear feeding behavior across both stills and motion footage. Families can see the animal shift between hay and browse at a calm pace, making posture and route changes easy to discuss with younger readers.
- Paragraph 2
This section supports a simple welfare lesson: enclosure layout, substrate, and food placement shape visible behavior. The selected media keeps the focus on animal-environment interaction instead of broad scene coverage.

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
The penguin media captures group resting and small repositioning around the pool edge, giving families a clear opening to discuss social spacing and routine behavior. Body orientation and clustering remain readable across both selected stills.
- Paragraph 2
For conservation framing, this section links visible behavior to care systems children can understand: water quality, managed temperature, and predictable rest zones. The selected visuals keep attention on posture and movement rather than distant habitat details.

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
The gorilla section centers on rest and perch use in a rope-and-platform enrichment environment. A seated portrait and hammock frame together show grip, weight distribution, and how suspended structures support comfortable positioning.
- Paragraph 2
This section works best as welfare-by-design framing rather than spectacle: enrichment complexity, vertical space, and routine stability all influence visible behavior. The selected assets keep the writing grounded in observable body language.

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
Preservation becomes easier for families to understand when behavior is tied to care systems they can see: feeding setup, enclosure complexity, and opportunities for rest and movement. This lens turns a zoo stop into a practical conservation conversation.
- Paragraph 2
For future posts, the highest educational value will come from pairing transcript-backed notes with traceable media and explicit uncertainty labels where transcripts are missing. That keeps the writing factual, reusable, and transparent.

# Media Plan
| section_id | section_title | asset_type (image|video|audio_reference) | source_filename | selected (yes|no) | derivative_recommendation (for example: webp conversion, square crop, poster frame) | alt_text | caption | rationale | conversion_notes (for video: H.264 + AAC + yuv420p + faststart) |
|---|---|---|---|---|---|---|---|---|---|
| pygmy-hippo | Pygmy Hippopotamus Talk | image | PXL_20260301_194618078.jpg | yes | Convert to webp, preserve landscape crop | Pygmy hippopotamus standing in a sandy indoor habitat beside a feeding area | Pygmy hippo paused near browse and hay, with enclosure features visible for behavior context. | Clear posture + enclosure context | n/a |
| pygmy-hippo | Pygmy Hippopotamus Talk | image | PXL_20260301_194932780.jpg | yes | Convert to webp, mild contrast adjustment | Close view of a pygmy hippopotamus eating hay near the exhibit wall | Tight framing on feeding behavior to support a family-friendly observation prompt. | Strong close-up behavior detail | n/a |
| pygmy-hippo | Pygmy Hippopotamus Talk | video | PXL_20260301_194650704.TS.mp4 | yes | Re-encode to delivery mp4, generate poster at 00:03 | Pygmy hippopotamus moving between feeding spots in its habitat | Short hippo movement clip showing feeding transitions and pacing in the enclosure. | Motion complement to stills | ffmpeg: `-c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac` |
| african-penguin | African Penguin Talk | image | IMG_0686.HEIC | yes | Convert HEIC to webp, auto-rotate via EXIF | Group of penguins standing and resting beside an indoor pool | Penguin group cluster near the pool edge with clear resting and social spacing cues. | Best group composition | n/a |
| african-penguin | African Penguin Talk | image | IMG_0693.HEIC | yes | Convert HEIC to webp, retain wide framing | Penguins distributed across rocks and deck around a shallow pool | Wider penguin scene showing multiple positions around the same water feature. | Adds pool-layout context | n/a |
| african-penguin | African Penguin Talk | video | IMG_0681.MOV | yes | Re-encode to delivery mp4, generate poster at 00:04 | Penguins shifting positions near the pool and rocky deck | Short movement clip to pair group stills with live behavior. | Adds social movement context | ffmpeg: `-c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac` |
| western-lowland-gorilla | Western Lowland Gorilla Talk | image | IMG_0704.HEIC | yes | Convert HEIC to webp, center crop for subject | Gorilla seated upright on a raised platform while holding overhead rope | Calm seated posture in the primate habitat with rope structure clearly visible. | Clear seated behavior frame | n/a |
| western-lowland-gorilla | Western Lowland Gorilla Talk | image | IMG_0711.HEIC | yes | Convert HEIC to webp, slight denoise | Gorilla reclining in a hammock-like enrichment net | Resting position in suspended enrichment, highlighting grip and body support. | Strong enrichment interaction frame | n/a |
| western-lowland-gorilla | Western Lowland Gorilla Talk | video | 20260301_150313.mp4 | yes | Re-encode to delivery mp4, poster at 00:05 | Gorillas moving through a netted enrichment space near the viewing glass | Gorilla movement and rest transitions in a rope-and-platform environment. | Completes section motion arc | ffmpeg: `-c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac` |
| lion-audio | Lion Audio Cluster | audio_reference | lion interview.m4a | no | Transcribe and summarize before editorial use | n/a | n/a | Named lion audio exists but no transcript text available | n/a |
| lion-audio | Lion Audio Cluster | audio_reference | lion 2.m4a | no | Transcribe and summarize before editorial use | n/a | n/a | Potential additional lion context | n/a |
| species-audio | Unclassified Species Audio | audio_reference | species 2.m4a | no | Transcribe and classify species mentions | n/a | n/a | Species label is unclear from filename alone | n/a |

# Quality Self-Check
- Confirm intro paragraph count = 2: pass
- Confirm each section paragraph count = 2: pass
- Confirm each section photo count = 2: pass
- Confirm each selected asset has source filename + alt text + caption: pass
- Confirm preservation lens paragraph count = 2: pass
- Confirm no fabricated transcript quotes: pass
- Confirm family-first conservation tone: pass
