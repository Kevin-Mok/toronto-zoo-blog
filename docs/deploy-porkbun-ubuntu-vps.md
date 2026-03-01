# Deployment Guide: Porkbun Domain to OVHcloud Ubuntu VPS

This guide covers the full path from buying `torontozooreport.com` at Porkbun to running this stack on an OVHcloud Ubuntu VPS with HTTPS.

All command snippets below are fish-shell compatible.

## Fast Path (Automated Bootstrap Script)

If you want one command to handle VPS setup end-to-end (Docker install, firewall, repo config, Certbot, compose startup), run:

```bash
cd /home/kevin/zoo-blog
chmod +x scripts/ops/bootstrap-vps.sh
scripts/ops/bootstrap-vps.sh --domain torontozooreport.com --admin-email you@torontozooreport.com
```

Defaults and options:

- `--allow-directus-port` opens `8055/tcp` in UFW.
- `--skip-upgrade` skips `apt upgrade`.
- `--skip-certbot` skips Certbot issuance/renew setup.
- `--app-port <port>` forces a specific localhost app port for the web container.
- You can pre-set secrets via env vars: `POSTGRES_PASSWORD`, `DIRECTUS_KEY`, `DIRECTUS_SECRET`, `ADMIN_PASSWORD`, `REVALIDATE_TOKEN`.

The script writes generated credentials to `.vps-secrets.<timestamp>.txt` in the repo root and stores `APP_HOST_PORT` in `.env`.

## 1) Porkbun DNS Setup (Do This First)

In Porkbun DNS for `torontozooreport.com`, create:

- `A` record:
  - Host: `@`
  - Answer: `51.222.111.61`
  - TTL: default
- `A` record:
  - Host: `www`
  - Answer: `51.222.111.61`
  - TTL: default

Optional if your VPS has IPv6:

- `AAAA` record for `@` -> `<YOUR_VPS_IPV6>`
- `AAAA` record for `www` -> `<YOUR_VPS_IPV6>`

Wait for propagation, then verify:

```bash
dig +short torontozooreport.com A
dig +short www.torontozooreport.com A
```

Do the remaining VPS setup steps while DNS is propagating.

## 2) Prerequisites

- Domain: `torontozooreport.com` (already purchased at Porkbun)
- OVHcloud account with billing enabled
- OVHcloud VPS or Public Cloud instance running Ubuntu 22.04 or 24.04
- SSH key-based access to the VPS
- Local machine with `git` and `ssh`

## 3) Create and Prepare OVHcloud Server

In OVHcloud Manager:

1. Create/select your project (`Public Cloud`) or VPS product.
2. Provision an Ubuntu server (22.04 or 24.04).
3. Attach your SSH public key during provisioning.
4. Note the server public IPv4 address.

If using OVHcloud `Public Cloud` security groups:

- Allow inbound:
  - TCP `22` from your IP
  - TCP `80` from `0.0.0.0/0`
  - TCP `443` from `0.0.0.0/0`
- Optional: TCP `8055` only from your office/home IP (for Directus admin)

If using OVHcloud `VPS` firewall feature, add equivalent rules there.

## 4) Initial Ubuntu VPS Hardening

SSH to the server:

```bash
ssh ubuntu@51.222.111.61
```

Update packages:

```bash
sudo apt update
sudo apt -y upgrade
sudo reboot
```

Reconnect after reboot and configure firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Recommended:

- Disable password SSH logins in `/etc/ssh/sshd_config`
- Keep root SSH login disabled
- Install `fail2ban`

## 5) Install Docker Engine + Compose Plugin

```fish
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
set -l ARCH (dpkg --print-architecture)
set -l UBUNTU_CODENAME (awk -F= '/^VERSION_CODENAME=/{print $2}' /etc/os-release)
printf "deb [arch=%s signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu %s stable\n" $ARCH $UBUNTU_CODENAME | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and back in so group membership is applied, then verify:

```bash
docker --version
docker compose version
```

## 6) Pull Project on VPS

```bash
git clone <YOUR_REPO_URL> zoo-blog
cd zoo-blog
```

## 7) Configure Project for `torontozooreport.com`

### 7.1 Configure host Nginx domain

If you use the bootstrap script, Nginx config is created automatically at:

- `/etc/nginx/sites-available/<your-domain>.conf`

If configuring manually, ensure `server_name` includes both:

- `torontozooreport.com`
- `www.torontozooreport.com`

### 7.2 Update compose environment values

Edit [docker-compose.yml](/home/kevin/coding/zoo-blog/docker-compose.yml) and update at minimum:

- `POSTGRES_PASSWORD`
- `KEY` (Directus)
- `SECRET` (Directus)
- `ADMIN_EMAIL` (Directus)
- `ADMIN_PASSWORD` (Directus)
- `NEXT_PUBLIC_SITE_URL` to `https://torontozooreport.com`

### 7.3 Provide runtime secrets via `.env`

Create a `.env` file in repo root:

```fish
printf "DIRECTUS_TOKEN=\nREVALIDATE_TOKEN=replace-with-strong-random-token\n" > .env
```

Generate a strong token quickly:

```bash
openssl rand -hex 32
```

Paste that output into `REVALIDATE_TOKEN`.

## 8) Start the Stack

```bash
docker compose up -d --build
docker compose ps
```

Tail logs during first boot (important for TLS issuance):

```bash
docker compose logs -f web directus postgres
sudo journalctl -u nginx -f
```

Issue HTTPS certificate with Certbot + Nginx plugin:

```bash
sudo certbot --nginx -d torontozooreport.com -d www.torontozooreport.com
```

## 9) Validate Production

HTTP checks:

```bash
curl -I https://torontozooreport.com/
curl -I https://torontozooreport.com/blog
curl -I https://torontozooreport.com/sitemap.xml
curl -I https://torontozooreport.com/rss.xml
```

Manual checks in browser:

- `https://torontozooreport.com`
- `https://torontozooreport.com/blog`
- A canonical post URL like `/blog/YYYY/M/D/title`

## 10) Directus Access and Token Setup

This stack exposes Directus on port `8055` by default. For production, do one of these:

- Restrict `8055` in firewall to your IP only, or
- Remove public `8055` access and use SSH tunnel

SSH tunnel example:

```bash
ssh -L 8055:localhost:8055 ubuntu@51.222.111.61
```

Then open `http://localhost:8055` locally.

After logging into Directus admin:

1. Create a static token for your app user.
2. Put it in `.env` as `DIRECTUS_TOKEN=<token>`.
3. Restart web service:

```bash
docker compose up -d web
```

## 11) Deploy Updates

```bash
cd ~/zoo-blog
git pull
docker compose up -d --build
```

Watch logs if needed:

```bash
docker compose logs -f --tail=200
```

## 12) Backups and Restore

Backups are created daily by `backup` service and kept for 14 days.

Check backup service:

```bash
docker compose logs -f backup
```

List backup files in volume:

```bash
docker run --rm -v zoo-blog_backups:/backups busybox ls -lh /backups
```

Restore from a specific backup:

```bash
docker run --rm -v zoo-blog_backups:/backups busybox ls /backups
zcat /path/to/backup.sql.gz | docker compose exec -T postgres psql -U zoo -d zoo_blog
```

## 13) Common Issues

### HTTPS certificate not issued

- DNS still not propagated
- Ports `80` or `443` blocked by OVHcloud network/security rules
- Nginx `server_name` does not match DNS records

### Site works by IP but not by domain

- DNS A/AAAA records incorrect
- Nginx `server_name` mismatch

### SSH works but web traffic fails

- OVHcloud security group/firewall is missing TCP `80`/`443`
- Ubuntu UFW allows `80`/`443` but OVHcloud network-level rules still block traffic

### App boot loops

- Bad environment values in `docker-compose.yml` or `.env`
- Check `docker compose logs -f web directus postgres`

### Docker apt repo malformed on fish

- Remove broken repo file and recreate with the fish commands in step 5:
  - `sudo rm -f /etc/apt/sources.list.d/docker.list`
  - `sudo apt update`

## 14) Production Checklist

- DNS points `@` and `www` to VPS
- OVHcloud security group/firewall allows inbound `22`, `80`, `443`
- UFW only allows `22`, `80`, `443` (plus restricted `8055` only if needed)
- Strong secrets replaced in `docker-compose.yml`
- `.env` set with `REVALIDATE_TOKEN` and optional `DIRECTUS_TOKEN`
- `NEXT_PUBLIC_SITE_URL` is `https://torontozooreport.com`
- Nginx serves valid TLS for both root and `www`
- Backups confirmed running
