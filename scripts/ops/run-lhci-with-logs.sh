#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="${ROOT_DIR}/test-artifacts/lhci/${STAMP}"
LOG_FILE="${OUT_DIR}/lhci.log"
SUMMARY_FILE="${OUT_DIR}/summary.txt"
LHCI_COPY_DIR="${OUT_DIR}/lighthouseci"
CONFIG_PATH="./lighthouserc.js"

mkdir -p "${OUT_DIR}" "${LHCI_COPY_DIR}"

ARGS=("$@")

{
  echo "Timestamp: ${STAMP}"
  echo "Command: npx lhci autorun --config=${CONFIG_PATH} ${ARGS[*]:-}"
  echo "Output dir: ${OUT_DIR}"
  if [[ -n "${LHCI_BASE_URL:-}" ]]; then
    echo "LHCI_BASE_URL: ${LHCI_BASE_URL}"
  fi
  if [[ -n "${LHCI_POST_PATH:-}" ]]; then
    echo "LHCI_POST_PATH: ${LHCI_POST_PATH}"
  fi
  if [[ -n "${LHCI_URLS:-}" ]]; then
    echo "LHCI_URLS: ${LHCI_URLS}"
  fi
  echo
} | tee "${SUMMARY_FILE}" > /dev/null

set +e
(
  cd "${ROOT_DIR}"
  npx lhci autorun --config="${CONFIG_PATH}" "${ARGS[@]}"
) 2>&1 | tee "${LOG_FILE}"
LHCI_EXIT="${PIPESTATUS[0]}"
set -e

if [[ -d "${ROOT_DIR}/.lighthouseci" ]]; then
  cp -a "${ROOT_DIR}/.lighthouseci/." "${LHCI_COPY_DIR}/"
fi

{
  echo
  echo "Exit code: ${LHCI_EXIT}"
  echo "Artifacts:"
  echo "  log: ${LOG_FILE}"
  echo "  summary: ${SUMMARY_FILE}"
  echo "  lighthouseci-copy: ${LHCI_COPY_DIR}"
} | tee -a "${SUMMARY_FILE}" > /dev/null

if [[ "${LHCI_EXIT}" -ne 0 ]]; then
  echo
  echo "LHCI failed. Share this folder: ${OUT_DIR}"
  exit "${LHCI_EXIT}"
fi

echo

echo "LHCI passed. Share this folder: ${OUT_DIR}"
