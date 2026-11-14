#!/usr/bin/env bash
# Runs ON the EC2 server as user `ubuntu`, started by GitHub Actions through AWS SSM
# (no SSH). Usage: server-deploy.sh <git-sha>
#
# App secrets are not passed in: they live in SSM Parameter Store under /aftrsolutions/
# (SecureString, written by the workflow from GitHub secrets) and are read here with the
# instance role. Each parameter becomes NAME='value' in .env; a key that is missing from
# Parameter Store leaves its existing .env line alone, so a deploy never wipes a key.
set -euo pipefail

SHA="${1:-}"
APP_DIR="/home/ubuntu/aftrsolutions"
REPO="https://github.com/Aftr-Solutions/aftrsolutions.git"
REGION="ap-south-1"
PARAM_PATH="/aftrsolutions/"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

# The repo moved from fasih1712/ to the Aftr-Solutions org: always point at the org repo.
git remote set-url origin "$REPO"
git fetch --prune origin main
if [ -n "$SHA" ] && git cat-file -e "$SHA^{commit}" 2>/dev/null; then
  git reset --hard "$SHA"
else
  git reset --hard origin/main
fi
echo "Deploying $(git log -1 --format='%h %s')"

# ---- .env from Parameter Store ----
umask 077
touch .env
chmod 600 .env
set_env() {
  [ -n "$2" ] || return 0
  case "$2" in *"'"*) echo "Skipping $1: value contains a single quote"; return 0 ;; esac
  grep -v "^$1=" .env > .env.tmp || true
  printf "%s='%s'\n" "$1" "$2" >> .env.tmp
  mv .env.tmp .env
}
count=0
while IFS=$'\t' read -r name value; do
  [ -n "$name" ] || continue
  set_env "${name##*/}" "$value"
  count=$((count + 1))
done < <(aws ssm get-parameters-by-path --region "$REGION" --path "$PARAM_PATH" \
          --with-decryption --query 'Parameters[].[Name,Value]' --output text)
echo "Loaded $count secret(s) from Parameter Store into .env"

# ---- build & restart ----
# quiet build keeps the SSM output (24 KB limit) readable
docker compose build --quiet
docker compose up -d
docker image prune -f >/dev/null

sleep 3
curl -fsS -o /dev/null http://127.0.0.1:8081 && echo "AFTR site is up on 127.0.0.1:8081"
echo "Chat assistant: $(curl -fsS http://127.0.0.1:8081/api/health || echo 'not reachable')"
echo "Innovation Hub API: $(curl -fsS http://127.0.0.1:8081/api/hub/health || echo 'not reachable')"
