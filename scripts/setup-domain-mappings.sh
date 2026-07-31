#!/usr/bin/env bash
# Map-6 — Cloud Run domain mappings (after Google domain verification)
# Prerequisites: map6.live and map-6.com verified in Search Console
#   gcloud domains list-user-verified
set -euo pipefail

PROJECT="${GCP_PROJECT:-gtahub-503009}"
REGION="${GCP_REGION:-europe-west1}"
SERVICE="${GCP_SERVICE:-map6}"

DOMAINS=(
  "map6.live"
  "www.map6.live"
  "map-6.com"
  "www.map-6.com"
)

gcloud config set project "$PROJECT"

echo "Verified domains on this account:"
gcloud domains list-user-verified 2>/dev/null || true
echo ""

for domain in "${DOMAINS[@]}"; do
  echo "→ Mapping $domain → $SERVICE"
  if gcloud beta run domain-mappings describe --domain "$domain" --region "$REGION" &>/dev/null; then
    echo "  Already mapped."
  else
    gcloud beta run domain-mappings create \
      --service "$SERVICE" \
      --domain "$domain" \
      --region "$REGION"
  fi
  echo ""
done

echo "=== DNS records to add in Squarespace ==="
for domain in "${DOMAINS[@]}"; do
  echo "--- $domain ---"
  gcloud beta run domain-mappings describe --domain "$domain" --region "$REGION" \
    --format="yaml(status.resourceRecords)" 2>/dev/null || echo "  (mapping pending — verify domain first)"
  echo ""
done

echo "Done. Propagation DNS : 15 min – 48 h."
echo "Test: curl -I https://map6.live/api/health"
