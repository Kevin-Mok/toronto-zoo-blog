#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/ops/watch-dns-provider.sh [--domain <domain>] [--interval <seconds>] [--once]

Options:
  --domain <domain>      Domain to inspect (default: torontozooreport.com)
  --interval <seconds>   Refresh interval in seconds (default: 5)
  --once                 Run a single check and exit
  --help                 Show this help
USAGE
}

fail() {
  printf '[watch-dns-provider] ERROR: %s\n' "$1" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

infer_provider() {
  local haystack
  haystack="$1"

  if grep -q 'cloudflare' <<<"${haystack}"; then
    echo "Cloudflare"
  elif grep -Eq 'awsdns|route53' <<<"${haystack}"; then
    echo "Amazon Route 53"
  elif grep -Eq 'googledomains|google' <<<"${haystack}"; then
    echo "Google DNS"
  elif grep -Eq 'azure-dns|trafficmanager' <<<"${haystack}"; then
    echo "Azure DNS"
  elif grep -q 'digitalocean' <<<"${haystack}"; then
    echo "DigitalOcean DNS"
  elif grep -q 'porkbun' <<<"${haystack}"; then
    echo "Porkbun DNS"
  elif grep -q 'namecheap' <<<"${haystack}"; then
    echo "Namecheap DNS"
  elif grep -Eq 'domaincontrol|secureserver' <<<"${haystack}"; then
    echo "GoDaddy DNS"
  elif grep -q 'dnsmadeeasy' <<<"${haystack}"; then
    echo "DNS Made Easy"
  elif grep -q 'nsone' <<<"${haystack}"; then
    echo "NS1"
  elif grep -Eq 'linode|akamai' <<<"${haystack}"; then
    echo "Linode/Akamai DNS"
  else
    echo "Unknown (check NS/SOA records manually)"
  fi
}

print_check() {
  local ns soa provider_input provider
  ns="$(dig +short NS "${DOMAIN}" 2>/dev/null | sed '/^[[:space:]]*$/d' || true)"
  soa="$(dig +short SOA "${DOMAIN}" 2>/dev/null | head -n 1 || true)"

  provider_input="$(printf '%s\n%s\n' "${ns}" "${soa}" | tr '[:upper:]' '[:lower:]')"
  provider="$(infer_provider "${provider_input}")"

  printf 'Domain: %s\n' "${DOMAIN}"
  printf 'Checked at: %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')"
  printf '\nNameservers (NS):\n'
  if [[ -n "${ns}" ]]; then
    printf '%s\n' "${ns}"
  else
    echo "(none returned)"
  fi

  printf '\nStart of Authority (SOA):\n'
  if [[ -n "${soa}" ]]; then
    printf '%s\n' "${soa}"
  else
    echo "(none returned)"
  fi

  printf '\nLikely DNS provider: %s\n' "${provider}"
}

DOMAIN="torontozooreport.com"
INTERVAL=5
ONCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain)
      DOMAIN="${2:-}"
      shift 2
      ;;
    --interval)
      INTERVAL="${2:-}"
      shift 2
      ;;
    --once)
      ONCE=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      fail "Unknown argument: $1"
      ;;
  esac
done

[[ -n "${DOMAIN}" ]] || fail "--domain cannot be empty"
[[ "${INTERVAL}" =~ ^[0-9]+$ ]] || fail "--interval must be a positive integer"
(( INTERVAL > 0 )) || fail "--interval must be greater than zero"

require_cmd dig

if (( ONCE == 1 )); then
  print_check
  exit 0
fi

while true; do
  if [[ -t 1 ]]; then
    clear
  fi
  print_check
  printf '\nRefreshing every %ss. Press Ctrl+C to stop.\n' "${INTERVAL}"
  sleep "${INTERVAL}"
done
