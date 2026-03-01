# Media Pipeline

## Source of Truth

- Source page: `/home/kevin/coding/portfolio-site/app/toronto-zoo/2026/2/28/page.tsx`
- Source media path: `/home/kevin/coding/portfolio-site/public/images/blog/toronto-zoo-2026-02-28`
- Source videos path: `/home/kevin/coding/portfolio-site/public/videos/blog/toronto-zoo-2026-02-28`

## Commands

```bash
npm run media:import
npm run media:reencode
npm run media:posters
```

Manifest:

- `docs/toronto-zoo/2026-02-28/media-manifest.json`

## Constraints Enforced

- Per animal: exactly 2 highlighted photos.
- Per animal: 1 highlighted video where source media exists.
- All images include captions in rendered UI.
- Desktop photo pairs render as two columns.
- Shared media max-height targets roughly two-thirds viewport.
- Video re-encode profile: `H.264 + AAC + yuv420p + -movflags +faststart`.

## Transcript Artifacts

Stored under:

- `docs/toronto-zoo/2026-02-28/transcripts/`

Canonical spellings in authored copy:

- `Pemba`
- `Jita`
- `Zoya`
- `Minu`
- `Akron`
