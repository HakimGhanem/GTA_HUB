#!/usr/bin/env bash
# 1) Sync CONTENT_API_SECRET (+ Firestore flags) onto Cloud Run
# 2) Upsert + publish articles via HTTPS (Cloud Run SA → Firestore)
set -euo pipefail

PROJECT=gtahub-503009
REGION=europe-west1
SERVICE=map6
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# shellcheck disable=SC1091
set -a; source .env.local; set +a

export SITE_INTERNAL_URL="${SITE_INTERNAL_URL:-https://map-6.com}"

if [[ -z "${CONTENT_API_SECRET:-}" ]]; then
  echo "ERROR: CONTENT_API_SECRET missing in .env.local" >&2
  exit 1
fi

INDEXNOW_KEY="${INDEXNOW_KEY:-}"
FIRESTORE_PROJECT_ID="${FIRESTORE_PROJECT_ID:-$PROJECT}"

echo "→ Sync env secrets onto Cloud Run ($SERVICE)"
UPDATE_VARS="CONTENT_API_SECRET=${CONTENT_API_SECRET},FIRESTORE_ENABLED=true,FIRESTORE_PROJECT_ID=${FIRESTORE_PROJECT_ID}"
if [[ -n "$INDEXNOW_KEY" ]]; then
  UPDATE_VARS="${UPDATE_VARS},INDEXNOW_KEY=${INDEXNOW_KEY}"
fi

gcloud run services update "$SERVICE" \
  --project="$PROJECT" \
  --region="$REGION" \
  --update-env-vars="$UPDATE_VARS" \
  --quiet

echo "→ Wait for revision ready…"
sleep 8

echo "→ Upsert + publish via ${SITE_INTERNAL_URL}"
npm run content:publish-remote

BASE="${SITE_INTERNAL_URL%/}"
echo "→ Verify"
for u in \
  "${BASE}/api/health" \
  "${BASE}/en/news" \
  "${BASE}/en/news/gta-6-trailer-3-what-we-know" \
  "${BASE}/en/about" \
  "${BASE}/news.xml" \
  "${BASE}/ads.txt"
do
  code=$(curl -sL -o /dev/null -w '%{http_code}' --max-time 25 "$u" || echo ERR)
  echo "  $code  $u"
done

echo ""
echo "Done."
