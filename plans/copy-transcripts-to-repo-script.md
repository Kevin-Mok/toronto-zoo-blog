# ExecPlan: Copy Transcript Files To Dated Toronto Zoo Dir

## Objective
Create a reusable script that copies pre-generated Whisper transcript files into `docs/toronto-zoo/<YYYY-MM-DD>/transcripts`, ordered by the paired `.m4a` creation time and renamed to `NN-topic-summary.txt`.

## Steps
- [x] Review existing transcript tooling and docs to match repo conventions.
- [x] Add a copy script under `scripts/media/` with argument parsing, ordering by paired audio timestamps, and topic-based filenames.
- [x] Document the copy workflow next to the existing transcription workflow.
- [x] Verify help output and a real copy flow against a temporary repo root.

## Review
- Added `scripts/media/copy-transcripts-to-repo.sh` for copying Whisper `.txt` outputs only, ordering by paired `.m4a` timestamps, and renaming to `NN-topic-summary.txt`.
- Fixed leading-zero date parsing in both transcript scripts so folder names like `03.08.26 - Toronto Zoo` resolve to `2026-03-08`.
- Verified with:
  - `bash -n scripts/media/copy-transcripts-to-repo.sh`
  - `bash -n scripts/media/transcribe-m4a-to-repo.sh`
  - `scripts/media/copy-transcripts-to-repo.sh --help`
  - temp end-to-end copy into a throwaway repo root using paired dummy `.m4a` and `.txt` files
  - temp dry-run using inferred date from `03.08.26 - Toronto Zoo`
