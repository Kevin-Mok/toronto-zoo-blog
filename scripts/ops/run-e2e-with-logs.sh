#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="${ROOT_DIR}/test-artifacts/e2e/${STAMP}"
LOG_FILE="${OUT_DIR}/playwright.log"
JSON_FILE="${OUT_DIR}/playwright-results.json"
JUNIT_FILE="${OUT_DIR}/playwright-junit.xml"
HTML_DIR="${OUT_DIR}/playwright-html-report"
TEST_OUTPUT_DIR="${OUT_DIR}/test-results"
SUMMARY_FILE="${OUT_DIR}/summary.txt"

mkdir -p "${OUT_DIR}" "${HTML_DIR}" "${TEST_OUTPUT_DIR}"

ARGS=("$@")

{
  echo "Timestamp: ${STAMP}"
  echo "Command: npx playwright test ${ARGS[*]:-}"
  echo "Output dir: ${OUT_DIR}"
  echo
} | tee "${SUMMARY_FILE}" > /dev/null

set +e
PLAYWRIGHT_HTML_OUTPUT_DIR="${HTML_DIR}" \
PLAYWRIGHT_HTML_OPEN="never" \
PLAYWRIGHT_JSON_OUTPUT_FILE="${JSON_FILE}" \
PLAYWRIGHT_JUNIT_OUTPUT_FILE="${JUNIT_FILE}" \
npx playwright test \
  --reporter=line,html,json,junit \
  --output "${TEST_OUTPUT_DIR}" \
  "${ARGS[@]}" 2>&1 | tee "${LOG_FILE}"

PW_EXIT="${PIPESTATUS[0]}"
set -e

{
  echo
  echo "Exit code: ${PW_EXIT}"
  echo "Artifacts:"
  echo "  log: ${LOG_FILE}"
  echo "  json: ${JSON_FILE}"
  echo "  junit: ${JUNIT_FILE}"
  echo "  html: ${HTML_DIR}"
  echo "  test-results: ${TEST_OUTPUT_DIR}"
} | tee -a "${SUMMARY_FILE}" > /dev/null

if [[ "${PW_EXIT}" -ne 0 ]]; then
  echo
  echo "Playwright e2e failed. Share this folder: ${OUT_DIR}"
  exit "${PW_EXIT}"
fi

echo

echo "Playwright e2e passed. Share this folder: ${OUT_DIR}"
