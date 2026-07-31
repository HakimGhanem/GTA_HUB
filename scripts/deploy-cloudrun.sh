#!/usr/bin/env bash
set -euo pipefail

# Map-6 — deploy to Google Cloud Run
# Prerequisites: gcloud auth login, project set, Artifact Registry repo created
#
#   gcloud artifacts repositories create cloud-run-source-deploy \
#     --repository-format=docker --location=europe-west1

PROJECT="${GCP_PROJECT:-}"
REGION="${GCP_REGION:-europe-west1}"
SERVICE="${GCP_SERVICE:-map6}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://map-6.com}"
CANONICAL_HOST="${NEXT_PUBLIC_CANONICAL_HOST:-map-6.com}"
ADSENSE_CLIENT="${NEXT_PUBLIC_ADSENSE_CLIENT:-ca-pub-9449600740636411}"
ADSENSE_SLOT_BANNER="${NEXT_PUBLIC_ADSENSE_SLOT_BANNER:-9174557090}"
ADSENSE_SLOT_IN_ARTICLE="${NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE:-2336997643}"

if [[ -z "$PROJECT" ]]; then
  echo "Set GCP_PROJECT (e.g. export GCP_PROJECT=my-project-id)"
  exit 1
fi

gcloud config set project "$PROJECT"

echo "→ Building and deploying $SERVICE to $REGION..."
gcloud builds submit \
  --config cloudbuild.yaml \
  --region="$REGION" \
  --substitutions="_REGION=$REGION,_SERVICE=$SERVICE,_SITE_URL=$SITE_URL,_CANONICAL_HOST=$CANONICAL_HOST,_ADSENSE_CLIENT=$ADSENSE_CLIENT,_ADSENSE_SLOT_BANNER=$ADSENSE_SLOT_BANNER,_ADSENSE_SLOT_IN_ARTICLE=$ADSENSE_SLOT_IN_ARTICLE" \
  .

echo ""
echo "Done. Map domain in Cloud Run → Domain mappings, then configure DNS (see infra/DEPLOY.md)."
gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)'
