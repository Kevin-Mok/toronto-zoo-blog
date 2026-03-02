#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/ops/bootstrap-vps.sh --domain <domain> [options]

Required:
  --domain <domain>                 Base domain (example: torontozooreport.com)

Options:
  --repo-dir <path>                 Repo path on VPS (default: script autodetect)
  --admin-email <email>             Directus admin + Certbot email (default: admin@<domain>)
  --app-port <port>                 Host localhost port for web container (default: auto-pick)
  --allow-directus-port             Open UFW port 8055 publicly
  --skip-upgrade                    Skip apt upgrade
  --skip-certbot                    Skip certbot issuance/renew setup
  --help                            Show this help

Environment overrides (optional):
  POSTGRES_PASSWORD
  DIRECTUS_KEY
  DIRECTUS_SECRET
  ADMIN_PASSWORD
  REVALIDATE_TOKEN
  DIRECTUS_TOKEN
  APP_HOST_PORT

What this script does:
  1) Installs Docker Engine + Compose plugin
  2) Installs and configures host nginx reverse proxy
  3) Configures UFW for SSH/HTTP/HTTPS
  4) Patches docker-compose.yml and runtime secrets
  5) Issues Let's Encrypt cert with Certbot nginx plugin
  6) Starts the Docker stack
USAGE
}

log() {
  printf '[bootstrap-vps] %s\n' "$1"
}

fail() {
  printf '[bootstrap-vps] ERROR: %s\n' "$1" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

escape_sed_replacement() {
  printf '%s' "$1" | sed -e 's/[\/&|]/\\&/g'
}

set_yaml_value() {
  local key="$1"
  local value="$2"
  local file="$3"
  local escaped
  escaped="$(escape_sed_replacement "$value")"

  if ! grep -Eq "^[[:space:]]*${key}:" "$file"; then
    fail "Could not find key '${key}' in ${file}"
  fi

  sed -i -E "s|(^[[:space:]]*${key}:).*|\\1 ${escaped}|" "$file"
}

upsert_env_var() {
  local key="$1"
  local value="$2"
  local file="$3"
  local escaped
  escaped="$(escape_sed_replacement "$value")"

  if grep -Eq "^${key}=" "$file"; then
    sed -i -E "s|^${key}=.*|${key}=${escaped}|" "$file"
  else
    printf '%s=%s\n' "$key" "$value" >> "$file"
  fi
}

random_hex() {
  local bytes="$1"
  openssl rand -hex "$bytes"
}

get_yaml_value() {
  local key="$1"
  local file="$2"
  awk -v k="$key" '
    $0 ~ "^[[:space:]]*" k ":" {
      sub("^[[:space:]]*" k ":[[:space:]]*", "", $0)
      print $0
      exit
    }
  ' "$file"
}

get_env_value() {
  local key="$1"
  local file="$2"
  [[ -f "$file" ]] || return 0
  awk -F= -v k="$key" '$1 == k { print substr($0, index($0, "=") + 1); exit }' "$file"
}

is_valid_port() {
  local port="$1"
  [[ "$port" =~ ^[0-9]+$ ]] && (( port >= 1024 && port <= 65535 ))
}

port_in_use() {
  local port="$1"
  ss -ltn "( sport = :${port} )" | awk 'NR>1 {found=1} END {exit found?0:1}'
}

find_available_port() {
  local start="$1"
  local end="$2"
  local candidate
  for ((candidate = start; candidate <= end; candidate++)); do
    if ! port_in_use "$candidate"; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  return 1
}

ensure_web_port_mapping() {
  local file="$1"
  local tmp_file

  if grep -Fq '127.0.0.1:${APP_HOST_PORT:-3001}:3000' "$file"; then
    return 0
  fi

  if grep -Eq '"127\.0\.0\.1:[^"]+:3000"' "$file"; then
    sed -i -E 's|"127\.0\.0\.1:[^"]+:3000"|"127.0.0.1:${APP_HOST_PORT:-3001}:3000"|g' "$file"
    return 0
  fi

  tmp_file="$(mktemp)"
  awk '
    BEGIN {
      in_web = 0
      inserted = 0
    }
    /^  web:$/ {
      in_web = 1
    }
    in_web && /^    environment:$/ && inserted == 0 {
      print "    ports:"
      print "      - \"127.0.0.1:${APP_HOST_PORT:-3001}:3000\""
      inserted = 1
    }
    {
      print
    }
    in_web && /^  [a-zA-Z0-9_-]+:$/ && $0 !~ /^  web:$/ {
      in_web = 0
    }
    END {
      if (inserted == 0) {
        exit 2
      }
    }
  ' "$file" > "$tmp_file" || {
    rm -f "$tmp_file"
    fail "Could not insert web port mapping into ${file}"
  }

  mv "$tmp_file" "$file"
}

write_nginx_site() {
  local domain="$1"
  local path="$2"
  local app_host_port="$3"
  sudo tee "$path" >/dev/null <<EOF
server {
  listen 80;
  listen [::]:80;
  server_name ${domain} www.${domain};

  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  location / {
    proxy_pass http://127.0.0.1:${app_host_port};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 60s;
  }
}
EOF
}

DOMAIN=""
REPO_DIR=""
ADMIN_EMAIL=""
APP_PORT_ARG=""
ALLOW_DIRECTUS_PORT=0
SKIP_UPGRADE=0
SKIP_CERTBOT=0

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_REPO_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain)
      DOMAIN="${2:-}"
      shift 2
      ;;
    --repo-dir)
      REPO_DIR="${2:-}"
      shift 2
      ;;
    --admin-email)
      ADMIN_EMAIL="${2:-}"
      shift 2
      ;;
    --app-port)
      APP_PORT_ARG="${2:-}"
      shift 2
      ;;
    --allow-directus-port)
      ALLOW_DIRECTUS_PORT=1
      shift
      ;;
    --skip-upgrade)
      SKIP_UPGRADE=1
      shift
      ;;
    --skip-certbot)
      SKIP_CERTBOT=1
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

[[ -n "$DOMAIN" ]] || {
  usage
  fail "--domain is required"
}

if [[ -z "$REPO_DIR" ]]; then
  REPO_DIR="$DEFAULT_REPO_DIR"
fi

COMPOSE_FILE="${REPO_DIR}/docker-compose.yml"
ENV_FILE="${REPO_DIR}/.env"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}.conf"
NGINX_ENABLED_LINK="/etc/nginx/sites-enabled/${DOMAIN}.conf"

[[ -f "${COMPOSE_FILE}" ]] || fail "Missing ${COMPOSE_FILE}"

if [[ -z "$ADMIN_EMAIL" ]]; then
  CURRENT_ADMIN_EMAIL="$(get_yaml_value "ADMIN_EMAIL" "$COMPOSE_FILE")"
  if [[ -n "$CURRENT_ADMIN_EMAIL" && "$CURRENT_ADMIN_EMAIL" != "admin@torontozooreport.com" ]]; then
    ADMIN_EMAIL="$CURRENT_ADMIN_EMAIL"
  else
    ADMIN_EMAIL="admin@${DOMAIN}"
  fi
fi

require_cmd sudo
require_cmd sed
require_cmd grep
require_cmd awk
require_cmd openssl
require_cmd curl
require_cmd systemctl
require_cmd ss

log "Requesting sudo access..."
sudo -v

CURRENT_POSTGRES_PASSWORD="$(get_yaml_value "POSTGRES_PASSWORD" "$COMPOSE_FILE")"
CURRENT_DIRECTUS_KEY="$(get_yaml_value "KEY" "$COMPOSE_FILE")"
CURRENT_DIRECTUS_SECRET="$(get_yaml_value "SECRET" "$COMPOSE_FILE")"
CURRENT_ADMIN_PASSWORD="$(get_yaml_value "ADMIN_PASSWORD" "$COMPOSE_FILE")"
CURRENT_REVALIDATE_TOKEN="$(get_env_value "REVALIDATE_TOKEN" "$ENV_FILE")"
CURRENT_DIRECTUS_TOKEN="$(get_env_value "DIRECTUS_TOKEN" "$ENV_FILE")"
CURRENT_APP_HOST_PORT="$(get_env_value "APP_HOST_PORT" "$ENV_FILE")"

if [[ -z "${POSTGRES_PASSWORD:-}" ]]; then
  if [[ -n "$CURRENT_POSTGRES_PASSWORD" && "$CURRENT_POSTGRES_PASSWORD" != "zoo" ]]; then
    POSTGRES_PASSWORD="$CURRENT_POSTGRES_PASSWORD"
  else
    POSTGRES_PASSWORD="$(random_hex 18)"
  fi
fi

if [[ -z "${DIRECTUS_KEY:-}" ]]; then
  if [[ -n "$CURRENT_DIRECTUS_KEY" && "$CURRENT_DIRECTUS_KEY" != "change-me-directus-key" ]]; then
    DIRECTUS_KEY="$CURRENT_DIRECTUS_KEY"
  else
    DIRECTUS_KEY="$(random_hex 32)"
  fi
fi

if [[ -z "${DIRECTUS_SECRET:-}" ]]; then
  if [[ -n "$CURRENT_DIRECTUS_SECRET" && "$CURRENT_DIRECTUS_SECRET" != "change-me-directus-secret" ]]; then
    DIRECTUS_SECRET="$CURRENT_DIRECTUS_SECRET"
  else
    DIRECTUS_SECRET="$(random_hex 32)"
  fi
fi

if [[ -z "${ADMIN_PASSWORD:-}" ]]; then
  if [[ -n "$CURRENT_ADMIN_PASSWORD" && "$CURRENT_ADMIN_PASSWORD" != "change-me-admin-password" ]]; then
    ADMIN_PASSWORD="$CURRENT_ADMIN_PASSWORD"
  else
    ADMIN_PASSWORD="$(random_hex 16)"
  fi
fi

if [[ -z "${REVALIDATE_TOKEN:-}" ]]; then
  if [[ -n "$CURRENT_REVALIDATE_TOKEN" && "$CURRENT_REVALIDATE_TOKEN" != "replace-with-strong-token" && "$CURRENT_REVALIDATE_TOKEN" != "replace-this" ]]; then
    REVALIDATE_TOKEN="$CURRENT_REVALIDATE_TOKEN"
  else
    REVALIDATE_TOKEN="$(random_hex 32)"
  fi
fi

if [[ -z "${DIRECTUS_TOKEN:-}" ]]; then
  DIRECTUS_TOKEN="$CURRENT_DIRECTUS_TOKEN"
fi

SELECTED_APP_HOST_PORT=""
if [[ -n "$APP_PORT_ARG" ]]; then
  SELECTED_APP_HOST_PORT="$APP_PORT_ARG"
elif [[ -n "${APP_HOST_PORT:-}" ]]; then
  SELECTED_APP_HOST_PORT="$APP_HOST_PORT"
elif is_valid_port "$CURRENT_APP_HOST_PORT"; then
  SELECTED_APP_HOST_PORT="$CURRENT_APP_HOST_PORT"
else
  SELECTED_APP_HOST_PORT="$(find_available_port 3000 3999 || true)"
fi

if ! is_valid_port "$SELECTED_APP_HOST_PORT"; then
  fail "Unable to determine a valid app host port. Provide --app-port <port>."
fi

log "Using host app port ${SELECTED_APP_HOST_PORT} -> container 3000"

log "Installing system prerequisites..."
sudo apt-get update
if [[ "$SKIP_UPGRADE" -eq 0 ]]; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get -y upgrade
fi
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
  ca-certificates \
  curl \
  gnupg \
  ufw \
  nginx \
  certbot \
  python3-certbot-nginx

if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  log "Docker is already installed."
else
  log "Installing Docker Engine + Compose plugin..."
  sudo install -m 0755 -d /etc/apt/keyrings
  if [[ ! -f /etc/apt/keyrings/docker.gpg ]]; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
      sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
  fi

  ARCH="$(dpkg --print-architecture)"
  UBUNTU_CODENAME="$(awk -F= '/^VERSION_CODENAME=/{print $2}' /etc/os-release)"
  printf 'deb [arch=%s signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu %s stable\n' \
    "$ARCH" "$UBUNTU_CODENAME" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

  sudo apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin
  sudo systemctl enable --now docker
fi

RUN_USER="${SUDO_USER:-$USER}"
RELOGIN_REQUIRED=0
if [[ "$RUN_USER" != "root" ]] && ! id -nG "$RUN_USER" | tr ' ' '\n' | grep -qx docker; then
  sudo usermod -aG docker "$RUN_USER"
  RELOGIN_REQUIRED=1
fi

log "Configuring UFW..."
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
if [[ "$ALLOW_DIRECTUS_PORT" -eq 1 ]]; then
  sudo ufw allow 8055/tcp
fi
if sudo ufw status | grep -q "Status: inactive"; then
  sudo ufw --force enable
fi

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
cp "$COMPOSE_FILE" "${COMPOSE_FILE}.bak.${TIMESTAMP}"

log "Patching docker-compose.yml with production values..."
ensure_web_port_mapping "$COMPOSE_FILE"
set_yaml_value "POSTGRES_PASSWORD" "$POSTGRES_PASSWORD" "$COMPOSE_FILE"
set_yaml_value "DB_PASSWORD" "$POSTGRES_PASSWORD" "$COMPOSE_FILE"
set_yaml_value "PGPASSWORD" "$POSTGRES_PASSWORD" "$COMPOSE_FILE"
set_yaml_value "KEY" "$DIRECTUS_KEY" "$COMPOSE_FILE"
set_yaml_value "SECRET" "$DIRECTUS_SECRET" "$COMPOSE_FILE"
set_yaml_value "ADMIN_EMAIL" "$ADMIN_EMAIL" "$COMPOSE_FILE"
set_yaml_value "ADMIN_PASSWORD" "$ADMIN_PASSWORD" "$COMPOSE_FILE"
set_yaml_value "DATABASE_URL" "postgresql://zoo:${POSTGRES_PASSWORD}@postgres:5432/zoo_blog" "$COMPOSE_FILE"
set_yaml_value "NEXT_PUBLIC_SITE_URL" "https://${DOMAIN}" "$COMPOSE_FILE"

log "Creating/updating .env..."
touch "$ENV_FILE"
upsert_env_var "DIRECTUS_TOKEN" "$DIRECTUS_TOKEN" "$ENV_FILE"
upsert_env_var "REVALIDATE_TOKEN" "$REVALIDATE_TOKEN" "$ENV_FILE"
upsert_env_var "APP_HOST_PORT" "$SELECTED_APP_HOST_PORT" "$ENV_FILE"

log "Starting Docker stack..."
(
  cd "$REPO_DIR"
  sudo docker compose up -d --build --remove-orphans
  sudo docker compose ps
)

log "Configuring host nginx reverse proxy..."
if [[ -f "$NGINX_SITE" ]]; then
  sudo cp "$NGINX_SITE" "${NGINX_SITE}.bak.${TIMESTAMP}"
fi
write_nginx_site "$DOMAIN" "$NGINX_SITE" "$SELECTED_APP_HOST_PORT"
sudo ln -sfn "$NGINX_SITE" "$NGINX_ENABLED_LINK"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx

if [[ "$SKIP_CERTBOT" -eq 0 ]]; then
  log "Issuing TLS certificate with certbot nginx plugin..."
  sudo certbot --nginx \
    --non-interactive \
    --agree-tos \
    --redirect \
    --email "$ADMIN_EMAIL" \
    --keep-until-expiring \
    -d "$DOMAIN" \
    -d "www.${DOMAIN}"
fi

SECRETS_FILE="${REPO_DIR}/.vps-secrets.${TIMESTAMP}.txt"
cat > "$SECRETS_FILE" <<EOF
DOMAIN=${DOMAIN}
ADMIN_EMAIL=${ADMIN_EMAIL}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
REVALIDATE_TOKEN=${REVALIDATE_TOKEN}
DIRECTUS_KEY=${DIRECTUS_KEY}
DIRECTUS_SECRET=${DIRECTUS_SECRET}
APP_HOST_PORT=${SELECTED_APP_HOST_PORT}
EOF
chmod 600 "$SECRETS_FILE"

log "Bootstrap complete."
log "Secrets written to: ${SECRETS_FILE}"
log "Open https://${DOMAIN} after DNS propagation."
if [[ "$RELOGIN_REQUIRED" -eq 1 ]]; then
  log "You were added to the docker group. Log out and back in to use Docker without sudo."
fi
