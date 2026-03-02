# ExecPlan: Reusable M4A Transcript Script

## Objective
Create a reusable script that accepts an input directory of `.m4a` files and writes transcripts into the matching `docs/toronto-zoo/YYYY-MM-DD/transcripts` folder.

## Steps
- [x] Add a script under `scripts/media/` with argument parsing and help output.
- [x] Implement date inference from folder naming like `03.01.26 - Toronto Zoo`.
- [x] Route outputs to `docs/toronto-zoo/<date>/transcripts` and skip existing outputs by default.
- [x] Document usage in `docs/media-pipeline.md`.
- [x] Verify script help output and executable permission.

## Review
- Script added and executable: `scripts/media/transcribe-m4a-to-repo.sh`
- Verified with: `scripts/media/transcribe-m4a-to-repo.sh --help`
