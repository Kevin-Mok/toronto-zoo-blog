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

- Per animal section: either 0 photos (transcript-only) or exactly 2 highlighted photos (media-backed).
- Per animal: 1 highlighted video where source media exists.
- All images include captions in rendered UI.
- Desktop photo pairs render as two columns.
- Shared media max-height targets roughly two-thirds viewport.
- Video re-encode profile: `H.264 + AAC + yuv420p + -movflags +faststart`.

## Transcript Artifacts

Stored under:

- `docs/toronto-zoo/2026-02-28/transcripts/`

Reusable transcript workflows:

```bash
scripts/media/transcribe-m4a-to-repo.sh --input-dir "/mnt/linux-files-3/hevin/03.01.26 - Toronto Zoo"
scripts/media/copy-transcripts-to-repo.sh --input-dir "/path/to/whisper-txt" --audio-dir "/path/to/m4a" --date "2026-03-08"
```

Behavior:

- `transcribe-m4a-to-repo.sh` detects `.m4a` files, infers the date from the folder name when possible, and writes new `.txt` transcripts to `docs/toronto-zoo/<YYYY-MM-DD>/transcripts/`.
- `copy-transcripts-to-repo.sh` copies existing Whisper `.txt` transcripts, orders them by paired `.m4a` creation time when available, and renames them to `NN-topic-summary.txt`.
- Both scripts support `--date` when the source directory name does not encode the visit date.

Canonical spellings in authored copy:

- `Pemba`
- `Jita`
- `Zoya`
- `Minu`
- `Akron`
