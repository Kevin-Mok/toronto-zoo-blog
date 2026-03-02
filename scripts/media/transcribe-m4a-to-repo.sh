#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/media/transcribe-m4a-to-repo.sh --input-dir "<path>" [options]

Options:
  --input-dir <path>    Folder containing .m4a files (required)
  --date <YYYY-MM-DD>   Override inferred date for output folder
  --repo-root <path>    Repo root (default: auto-detected from script location)
  --model <name>        Whisper model (default: base.en)
  --model-dir <path>    Whisper model cache dir (default: /tmp/whisper-models)
  --language <code>     Whisper language code (default: en)
  --force               Re-transcribe files even if output .txt exists
  --help                Show this help

Behavior:
  - Finds .m4a files in the input folder (non-recursive).
  - Infers date from input directory name if --date is not passed.
  - Writes outputs to docs/toronto-zoo/<YYYY-MM-DD>/transcripts in this repo.
EOF
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

detect_whisper_cmd() {
  if command -v whisper >/dev/null 2>&1; then
    echo "whisper"
    return 0
  fi

  if command -v python3 >/dev/null 2>&1 && python3 -c 'import whisper' >/dev/null 2>&1; then
    echo "python3 -m whisper"
    return 0
  fi

  echo "" >&2
  return 1
}

parse_date_from_name() {
  local raw="$1"
  local cleaned
  cleaned="$(echo "$raw" | tr '/_' '  ' | tr -s ' ')"

  # YYYY-MM-DD, YYYY.MM.DD, YYYY/MM/DD
  if [[ "$cleaned" =~ (^|[[:space:]])([0-9]{4})[-.[:space:]]([0-9]{1,2})[-.[:space:]]([0-9]{1,2})($|[[:space:]]) ]]; then
    local yyyy="${BASH_REMATCH[2]}"
    local mm="${BASH_REMATCH[3]}"
    local dd="${BASH_REMATCH[4]}"
    printf '%04d-%02d-%02d\n' "$yyyy" "$mm" "$dd"
    return 0
  fi

  # MM-DD-YY, MM.DD.YY, MM/DD/YY
  if [[ "$cleaned" =~ (^|[[:space:]])([0-9]{1,2})[-.[:space:]]([0-9]{1,2})[-.[:space:]]([0-9]{2})($|[[:space:]]) ]]; then
    local mm="${BASH_REMATCH[2]}"
    local dd="${BASH_REMATCH[3]}"
    local yy="${BASH_REMATCH[4]}"
    local yyyy=$((2000 + 10#$yy))
    printf '%04d-%02d-%02d\n' "$yyyy" "$mm" "$dd"
    return 0
  fi

  return 1
}

validate_date() {
  local value="$1"
  if [[ ! "$value" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "Invalid date format: $value (expected YYYY-MM-DD)" >&2
    exit 1
  fi
}

INPUT_DIR=""
DATE_OVERRIDE=""
REPO_ROOT="$DEFAULT_REPO_ROOT"
MODEL="base.en"
MODEL_DIR="/tmp/whisper-models"
LANGUAGE="en"
FORCE="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --input-dir)
      INPUT_DIR="${2:-}"
      shift 2
      ;;
    --date)
      DATE_OVERRIDE="${2:-}"
      shift 2
      ;;
    --repo-root)
      REPO_ROOT="${2:-}"
      shift 2
      ;;
    --model)
      MODEL="${2:-}"
      shift 2
      ;;
    --model-dir)
      MODEL_DIR="${2:-}"
      shift 2
      ;;
    --language)
      LANGUAGE="${2:-}"
      shift 2
      ;;
    --force)
      FORCE="true"
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$INPUT_DIR" ]]; then
  echo "--input-dir is required" >&2
  usage
  exit 1
fi

if [[ ! -d "$INPUT_DIR" ]]; then
  echo "Input directory not found: $INPUT_DIR" >&2
  exit 1
fi

WHISPER_CMD_TEXT="$(detect_whisper_cmd)"
if [[ -z "$WHISPER_CMD_TEXT" ]]; then
  echo "Missing whisper CLI. Install it or ensure 'python3 -m whisper' is available." >&2
  exit 1
fi

declare -a WHISPER_CMD
if [[ "$WHISPER_CMD_TEXT" == "whisper" ]]; then
  WHISPER_CMD=(whisper)
else
  WHISPER_CMD=(python3 -m whisper)
fi

POST_DATE=""
if [[ -n "$DATE_OVERRIDE" ]]; then
  validate_date "$DATE_OVERRIDE"
  POST_DATE="$DATE_OVERRIDE"
else
  if ! POST_DATE="$(parse_date_from_name "$(basename "$INPUT_DIR")")"; then
    echo "Could not infer date from input dir name: $(basename "$INPUT_DIR")" >&2
    echo "Pass --date YYYY-MM-DD explicitly." >&2
    exit 1
  fi
fi

OUT_DIR="${REPO_ROOT}/docs/toronto-zoo/${POST_DATE}/transcripts"
mkdir -p "$OUT_DIR" "$MODEL_DIR"

mapfile -t AUDIO_FILES < <(find "$INPUT_DIR" -maxdepth 1 -type f \( -iname '*.m4a' \) | sort)

if [[ "${#AUDIO_FILES[@]}" -eq 0 ]]; then
  echo "No .m4a files found in: $INPUT_DIR" >&2
  exit 1
fi

echo "Input dir:  $INPUT_DIR"
echo "Output dir: $OUT_DIR"
echo "Model:      $MODEL"
echo "Whisper:    ${WHISPER_CMD[*]}"
echo "Files:      ${#AUDIO_FILES[@]}"

for audio in "${AUDIO_FILES[@]}"; do
  stem="$(basename "${audio%.*}")"
  target="${OUT_DIR}/${stem}.txt"

  if [[ "$FORCE" != "true" && -f "$target" ]]; then
    echo "skip ${stem} (exists)"
    continue
  fi

  echo "transcribing ${stem}"
  "${WHISPER_CMD[@]}" "$audio" \
    --model "$MODEL" \
    --model_dir "$MODEL_DIR" \
    --language "$LANGUAGE" \
    --task transcribe \
    --fp16 False \
    --output_format txt \
    --output_dir "$OUT_DIR"
done

echo "done"
