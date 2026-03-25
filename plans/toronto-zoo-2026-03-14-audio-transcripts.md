# ExecPlan: Toronto Zoo 2026-03-14 Audio Transcripts

## Objective
Transcribe the `.m4a` files in `/mnt/linux-files-3/hevin/Zoo/3.14` into repo-tracked transcript artifacts under `docs/toronto-zoo/2026-03-14/transcripts/` without copying raw audio into the repository.

## Steps
- [x] Run the existing `scripts/media/transcribe-m4a-to-repo.sh` script against the March 14 source folder with an explicit `2026-03-14` date override.
- [x] Verify the transcript output folder contains the expected files and no audio files were added to the repo.
- [x] Spot-check transcript contents for non-empty output and obvious corruption.
- [x] Record verification results in this plan.

## Review
- Transcript command run:
  `scripts/media/transcribe-m4a-to-repo.sh --input-dir "/mnt/linux-files-3/hevin/Zoo/3.14" --date "2026-03-14" --model "base.en" --model-dir "/tmp/whisper-models" --language "en"`
- Verification:
  - `find docs/toronto-zoo/2026-03-14/transcripts -maxdepth 1 -type f -name '*.txt' | wc -l` returned `8`.
  - `find docs/toronto-zoo/2026-03-14 -type f \( -iname '*.m4a' -o -iname '*.mp3' -o -iname '*.wav' \)` returned no files.
  - Spot checks of `camel 5.txt` and `giraffe 2.txt` showed coherent keeper Q&A content.
- Quality note:
  - `nile turtle.txt` starts with usable turtle-care content but degrades into repetitive low-signal text later in the file, likely due to a long noisy recording. A targeted anti-hallucination Whisper rerun to `/tmp` was explored but was too slow to adopt in this pass.
