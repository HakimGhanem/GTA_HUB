#!/usr/bin/env bash
# Activate Map-6 content engine on gtahub-503009 (run on your machine).
#   chmod +x scripts/activate-content-engine.sh && ./scripts/activate-content-engine.sh
set -euo pipefail

PROJECT=gtahub-503009
REGION=europe-west1
SERVICE=map6
SA="18798479250-compute@developer.gserviceaccount.com"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Project $PROJECT"
gcloud config set project "$PROJECT"

echo "→ Enable APIs / ensure Firestore"
gcloud services enable firestore.googleapis.com --project="$PROJECT"
if ! gcloud firestore databases describe --database='(default)' --project="$PROJECT" >/dev/null 2>&1; then
  gcloud firestore databases create --database='(default)' --location="$REGION" \
    --type=firestore-native --project="$PROJECT"
fi

echo "→ IAM datastore.user for Cloud Run SA"
gcloud projects add-iam-policy-binding "$PROJECT" \
  --member="serviceAccount:$SA" \
  --role="roles/datastore.user" \
  --condition=None \
  --quiet || true

# Secrets from .env.local or generate
if [[ -f .env.local ]] && grep -q '^CONTENT_API_SECRET=' .env.local && grep -q '^INDEXNOW_KEY=' .env.local; then
  # shellcheck disable=SC1091
  set -a; source .env.local; set +a
  echo "→ Using secrets from .env.local"
else
  CONTENT_API_SECRET=$(openssl rand -hex 24)
  INDEXNOW_KEY=$(openssl rand -hex 16)
  {
    echo ""
    echo "CONTENT_API_SECRET=$CONTENT_API_SECRET"
    echo "INDEXNOW_KEY=$INDEXNOW_KEY"
    echo "FIRESTORE_ENABLED=true"
    echo "FIRESTORE_PROJECT_ID=$PROJECT"
  } >> .env.local
  echo "→ Generated secrets into .env.local"
fi

printf '%s' "$INDEXNOW_KEY" > "public/${INDEXNOW_KEY}.txt"
echo "→ IndexNow file public/${INDEXNOW_KEY}.txt"

echo "→ Deploy Cloud Run (5–8 min)..."
export GCP_PROJECT="$PROJECT"
export NEXT_PUBLIC_SITE_URL=https://map-6.com
./scripts/deploy-cloudrun.sh

echo "→ Set runtime env on Cloud Run"
gcloud run services update "$SERVICE" --project="$PROJECT" --region="$REGION" \
  --update-env-vars="CONTENT_API_SECRET=${CONTENT_API_SECRET},INDEXNOW_KEY=${INDEXNOW_KEY},FIRESTORE_ENABLED=true,FIRESTORE_PROJECT_ID=${PROJECT}"

echo "→ Seed Firestore + publish (via temp SA key — no ADC login needed)"
export SITE_INTERNAL_URL=https://map-6.com
export CONTENT_API_SECRET
./scripts/finish-content-publish.sh

echo ""
echo "Done. IndexNow file: public/${INDEXNOW_KEY}.txt"
echo "CONTENT_API_SECRET is in .env.local (do not commit)."
