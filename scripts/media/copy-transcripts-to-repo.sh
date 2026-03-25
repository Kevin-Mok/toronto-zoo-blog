#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/media/copy-transcripts-to-repo.sh --input-dir "<path>" [options]

Options:
  --input-dir <path>    Folder containing Whisper transcript .txt files (required)
  --audio-dir <path>    Folder containing source .m4a files for ordering (default: same as --input-dir)
  --date <YYYY-MM-DD>   Override inferred date for output folder
  --repo-root <path>    Repo root (default: auto-detected from script location)
  --name-glob <glob>    Case-insensitive transcript glob to copy (default: *.txt)
  --dest-subdir <path>  Subdirectory under docs/toronto-zoo/<date> (default: transcripts)
  --force               Overwrite destination files if they already exist
  --dry-run             Print planned copies without writing files
  --help                Show this help

Behavior:
  - Finds matching transcript files in the input folder (non-recursive).
  - Uses paired .m4a creation time for ordering when available and falls back to transcript file time.
  - Renames copied files to NN-topic-summary.txt using a transcript-content slug.
  - Copies only transcript files into docs/toronto-zoo/<YYYY-MM-DD>/<dest-subdir>.
EOF
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

parse_date_from_name() {
  local raw="$1"
  local cleaned
  cleaned="$(echo "$raw" | tr '/_' '  ' | tr -s ' ')"

  if [[ "$cleaned" =~ (^|[[:space:]])([0-9]{4})[-.[:space:]]([0-9]{1,2})[-.[:space:]]([0-9]{1,2})($|[[:space:]]) ]]; then
    local yyyy=$((10#${BASH_REMATCH[2]}))
    local mm=$((10#${BASH_REMATCH[3]}))
    local dd=$((10#${BASH_REMATCH[4]}))
    printf '%04d-%02d-%02d\n' "$yyyy" "$mm" "$dd"
    return 0
  fi

  if [[ "$cleaned" =~ (^|[[:space:]])([0-9]{1,2})[-.[:space:]]([0-9]{1,2})[-.[:space:]]([0-9]{2})($|[[:space:]]) ]]; then
    local mm=$((10#${BASH_REMATCH[2]}))
    local dd=$((10#${BASH_REMATCH[3]}))
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

validate_dest_subdir() {
  local value="$1"
  if [[ -z "$value" || "$value" == /* || "$value" == *".."* ]]; then
    echo "Invalid --dest-subdir: $value" >&2
    exit 1
  fi
}

slugify_text() {
  local text="$1"
  local slug
  slug="$(
    printf '%s' "$text" |
      tr '[:upper:]' '[:lower:]' |
      sed -E "s/'//g; s/[^a-z0-9]+/-/g; s/^-+//; s/-+\$//; s/-+/-/g"
  )"
  printf '%s\n' "${slug:0:72}"
}

summarize_topic_slug() {
  local transcript_path="$1"
  local summary

  summary="$(awk '
    BEGIN {
      limit = 1600
      max_words = 6
      split("a an and are as at be because been being but by can could did do does doing for from had has have having here how i if in into is it its itself just like maybe me more most my no not now of off on once only or other our ours out over own same she should so some such than that the their theirs them themselves then there these they this those through to too under until up very was we were what when where which while who why will with would yeah yep yes you your yours yourself yourselves okay ok oh ooh um uh ah huh hmm mm right actually really basically kind kinda sorta gonna wanna got gotta cant dont didnt isnt arent theres thats ive wereve youll youre toronto zoo", raw_stop, " ")
      for (i in raw_stop) {
        stop[raw_stop[i]] = 1
      }
    }
    {
      if (length(text) < limit) {
        text = text " " $0
      }
    }
    END {
      text = tolower(text)
      gsub(/\047/, "", text)
      gsub(/[^a-z0-9]+/, " ", text)
      total = split(text, words, /[[:space:]]+/)
      seen = 0
      for (i = 1; i <= total; i++) {
        word = words[i]
        if (word == "" || stop[word]) {
          continue
        }
        if (word ~ /^[0-9]+$/ || length(word) < 3) {
          continue
        }
        count[word]++
        if (!(word in first)) {
          first[word] = ++seen
        }
      }
      if (seen == 0) {
        print "transcript"
        exit
      }
      selected = 0
      while (selected < max_words) {
        best = ""
        for (word in count) {
          if (used[word]) {
            continue
          }
          if (best == "" || count[word] > count[best] || (count[word] == count[best] && first[word] < first[best])) {
            best = word
          }
        }
        if (best == "") {
          break
        }
        used[best] = 1
        parts[++selected] = best
      }
      output = parts[1]
      for (i = 2; i <= selected; i++) {
        output = output "-" parts[i]
      }
      print output
    }
  ' "$transcript_path")"

  if [[ -z "$summary" ]]; then
    summary="transcript"
  fi

  slugify_text "$summary"
}

resolve_audio_for_transcript() {
  local transcript_path="$1"
  local stem
  stem="$(basename "${transcript_path%.*}")"

  find "$AUDIO_DIR" -maxdepth 1 -type f -iname "${stem}.m4a" | sort | head -n 1
}

file_timestamp() {
  local path="$1"
  local created_at
  local modified_at

  created_at="$(stat -c '%W' "$path")"
  modified_at="$(stat -c '%Y' "$path")"

  if [[ "$created_at" =~ ^-?[0-9]+$ ]] && (( created_at > 0 )); then
    printf '%s\n' "$created_at"
    return 0
  fi

  printf '%s\n' "$modified_at"
}

format_timestamp() {
  date -d "@$1" '+%Y-%m-%dT%H:%M:%S'
}

INPUT_DIR=""
AUDIO_DIR=""
DATE_OVERRIDE=""
REPO_ROOT="$DEFAULT_REPO_ROOT"
NAME_GLOB="*.txt"
DEST_SUBDIR="transcripts"
FORCE="false"
DRY_RUN="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --input-dir)
      INPUT_DIR="${2:-}"
      shift 2
      ;;
    --audio-dir)
      AUDIO_DIR="${2:-}"
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
    --name-glob)
      NAME_GLOB="${2:-}"
      shift 2
      ;;
    --dest-subdir)
      DEST_SUBDIR="${2:-}"
      shift 2
      ;;
    --force)
      FORCE="true"
      shift
      ;;
    --dry-run)
      DRY_RUN="true"
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

if [[ -z "$AUDIO_DIR" ]]; then
  AUDIO_DIR="$INPUT_DIR"
fi

if [[ ! -d "$AUDIO_DIR" ]]; then
  echo "Audio directory not found: $AUDIO_DIR" >&2
  exit 1
fi

validate_dest_subdir "$DEST_SUBDIR"

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

OUT_DIR="${REPO_ROOT}/docs/toronto-zoo/${POST_DATE}/${DEST_SUBDIR}"

mapfile -t TRANSCRIPT_FILES < <(find "$INPUT_DIR" -maxdepth 1 -type f -iname "$NAME_GLOB" | sort)

if [[ "${#TRANSCRIPT_FILES[@]}" -eq 0 ]]; then
  echo "No files matching ${NAME_GLOB} found in: $INPUT_DIR" >&2
  exit 1
fi

MANIFEST_FILE="$(mktemp)"
trap 'rm -f "$MANIFEST_FILE"' EXIT

for transcript_path in "${TRANSCRIPT_FILES[@]}"; do
  audio_path="$(resolve_audio_for_transcript "$transcript_path" || true)"
  sort_source="$transcript_path"
  sort_basis="transcript"

  if [[ -n "$audio_path" ]]; then
    sort_source="$audio_path"
    sort_basis="audio"
  fi

  sort_timestamp="$(file_timestamp "$sort_source")"
  printf '%s\t%s\t%s\t%s\n' "$sort_timestamp" "$sort_basis" "$transcript_path" "${audio_path:--}" >> "$MANIFEST_FILE"
done

mapfile -t ORDERED_RECORDS < <(sort -t $'\t' -k1,1n -k3,3 "$MANIFEST_FILE")

if [[ "$DRY_RUN" != "true" ]]; then
  mkdir -p "$OUT_DIR"
fi

total_files="${#ORDERED_RECORDS[@]}"
pad_width=2
if (( total_files >= 100 )); then
  pad_width="${#total_files}"
fi

echo "Input dir:    $INPUT_DIR"
echo "Audio dir:    $AUDIO_DIR"
echo "Output dir:   $OUT_DIR"
echo "Match glob:   $NAME_GLOB"
echo "Ordering:     paired .m4a creation time, transcript time fallback"
echo "Force:        $FORCE"
echo "Dry run:      $DRY_RUN"
echo "Files:        $total_files"

copied_count=0
skipped_count=0
index=0

for record in "${ORDERED_RECORDS[@]}"; do
  IFS=$'\t' read -r sort_timestamp sort_basis transcript_path audio_path <<< "$record"

  index=$((index + 1))
  source_name="$(basename "$transcript_path")"
  source_stem="$(basename "${transcript_path%.*}")"
  extension="${source_name##*.}"
  topic_slug="$(summarize_topic_slug "$transcript_path")"

  if [[ -z "$topic_slug" || "$topic_slug" == "transcript" ]]; then
    topic_slug="$(slugify_text "$source_stem")"
  fi

  if [[ -z "$topic_slug" ]]; then
    topic_slug="transcript"
  fi

  target_name="$(printf "%0${pad_width}d-%s.%s" "$index" "$topic_slug" "$extension")"
  target_path="${OUT_DIR}/${target_name}"
  human_timestamp="$(format_timestamp "$sort_timestamp")"

  if [[ "$FORCE" != "true" && -f "$target_path" ]]; then
    echo "skip ${source_name} -> ${target_name} (${sort_basis} ${human_timestamp})"
    skipped_count=$((skipped_count + 1))
    continue
  fi

  if [[ "$DRY_RUN" == "true" ]]; then
    echo "copy ${source_name} -> ${target_name} (${sort_basis} ${human_timestamp})"
    copied_count=$((copied_count + 1))
    continue
  fi

  cp -p "$transcript_path" "$target_path"
  echo "copied ${source_name} -> ${target_name} (${sort_basis} ${human_timestamp})"
  copied_count=$((copied_count + 1))
done

echo "done: copied=${copied_count} skipped=${skipped_count}"
