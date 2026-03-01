#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOCAL_MEDIA_DIR="${ROOT_DIR}/public/media"
DEFAULT_REMOTE_HOST="kevin@51.222.111.61"
DEFAULT_REMOTE_REPO_PATH="/home/kevin/zoo-blog"

if [[ $# -gt 0 && ( "$1" == "-h" || "$1" == "--help" ) ]]; then
  cat <<'USAGE'
Usage:
  scripts/ops/rsync-videos-to-vps.sh [user@host] [remote_repo_path] [extra_rsync_args...]

Examples:
  scripts/ops/rsync-videos-to-vps.sh
  scripts/ops/rsync-videos-to-vps.sh kevin@51.222.111.61 /home/kevin/zoo-blog
  scripts/ops/rsync-videos-to-vps.sh kevin@51.222.111.61 /home/kevin/zoo-blog --dry-run

Notes:
  - Default host: kevin@51.222.111.61
  - Default repo path: /home/kevin/zoo-blog
  - Syncs image and video files under public/media/**/{images,videos}/ to the same path on VPS.
  - Requires rsync + ssh on local machine and rsync on VPS.
USAGE
  exit 1
fi

REMOTE_HOST="${1:-${DEFAULT_REMOTE_HOST}}"
REMOTE_REPO_PATH="${2:-${DEFAULT_REMOTE_REPO_PATH}}"

if [[ $# -ge 2 ]]; then
  shift 2
else
  shift $#
fi

EXTRA_RSYNC_ARGS=("$@")
REMOTE_MEDIA_DIR="${REMOTE_REPO_PATH}/public/media"

echo "Ensuring remote media path exists: ${REMOTE_HOST}:${REMOTE_MEDIA_DIR}"
ssh "${REMOTE_HOST}" "mkdir -p '${REMOTE_MEDIA_DIR}'"

echo "Syncing image/video media from ${LOCAL_MEDIA_DIR} to ${REMOTE_HOST}:${REMOTE_MEDIA_DIR}"
rsync \
  --archive \
  --compress \
  --human-readable \
  --progress \
  --prune-empty-dirs \
  --include='*/' \
  --include='images/***' \
  --include='videos/***' \
  --exclude='*' \
  "${EXTRA_RSYNC_ARGS[@]}" \
  "${LOCAL_MEDIA_DIR}/" \
  "${REMOTE_HOST}:${REMOTE_MEDIA_DIR}/"

echo "Media sync complete."
