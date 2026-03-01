#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOCAL_MEDIA_DIR="${ROOT_DIR}/public/media"

if [[ $# -lt 1 ]]; then
  cat <<'USAGE'
Usage:
  scripts/ops/rsync-videos-to-vps.sh <user@host> [remote_repo_path] [extra_rsync_args...]

Examples:
  scripts/ops/rsync-videos-to-vps.sh kevin@203.0.113.10 /home/kevin/zoo-blog
  scripts/ops/rsync-videos-to-vps.sh kevin@vps /home/kevin/zoo-blog --dry-run

Notes:
  - Syncs only MP4 files under public/media/**/videos/ to the same path on VPS.
  - Requires rsync + ssh on local machine and rsync on VPS.
USAGE
  exit 1
fi

REMOTE_HOST="$1"
REMOTE_REPO_PATH="${2:-/home/kevin/zoo-blog}"

if [[ $# -ge 2 ]]; then
  shift 2
else
  shift 1
fi

EXTRA_RSYNC_ARGS=("$@")
REMOTE_MEDIA_DIR="${REMOTE_REPO_PATH}/public/media"

echo "Ensuring remote media path exists: ${REMOTE_HOST}:${REMOTE_MEDIA_DIR}"
ssh "${REMOTE_HOST}" "mkdir -p '${REMOTE_MEDIA_DIR}'"

echo "Syncing MP4 files from ${LOCAL_MEDIA_DIR} to ${REMOTE_HOST}:${REMOTE_MEDIA_DIR}"
rsync \
  --archive \
  --compress \
  --human-readable \
  --progress \
  --prune-empty-dirs \
  --include='*/' \
  --include='videos/' \
  --include='*.mp4' \
  --exclude='*' \
  "${EXTRA_RSYNC_ARGS[@]}" \
  "${LOCAL_MEDIA_DIR}/" \
  "${REMOTE_HOST}:${REMOTE_MEDIA_DIR}/"

echo "Video sync complete."
