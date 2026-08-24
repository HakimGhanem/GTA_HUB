#!/usr/bin/env bash
# Schedule Map-6 daily funnel at 17:00 Europe/Paris.
#
# Creates:
# 1) Cloud Scheduler → HTTP POST /api/content/daily (detect → draft → publish)
#
# Usage:
#   PROJECT_ID=gtahub-503009 REGION=europe-west1 SERVICE=map6 \
#   CONTENT_API_SECRET=... bash scripts/setup-content-scheduler.sh
#
# Safe body-only update (keeps existing Authorization header):
#   gcloud scheduler jobs update http map6-content-daily \
#     --project=gtahub-503009 --location=europe-west1 \
#     --message-body='{"limit":2,"detect":true,"draft":true,"publish":true}'
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-gtahub-503009}"
REGION="${REGION:-europe-west1}"
SERVICE="${SERVICE:-map6}"
JOB_NAME="${JOB_NAME:-map6-content-daily}"
SCHEDULE="${SCHEDULE:-0 17 * * *}"
TIME_ZONE="${TIME_ZONE:-Europe/Paris}"
# Full growth path; set PUBLISH=false for draft-only until review is trusted
MESSAGE_BODY="${MESSAGE_BODY:-{\"limit\":2,\"detect\":true,\"draft\":true,\"publish\":true}}"

if [[ -z "${CONTENT_API_SECRET:-}" ]]; then
  echo "CONTENT_API_SECRET is required" >&2
  exit 1
fi

SITE_URL="${SITE_URL:-https://map-6.com}"
ENDPOINT="${SITE_URL%/}/api/content/daily"

echo "→ Cloud Scheduler job ${JOB_NAME}"
echo "  schedule: ${SCHEDULE} (${TIME_ZONE})"
echo "  target:   ${ENDPOINT}"
echo "  body:     ${MESSAGE_BODY}"

if gcloud scheduler jobs describe "${JOB_NAME}" --location="${REGION}" --project="${PROJECT_ID}" >/dev/null 2>&1; then
  gcloud scheduler jobs update http "${JOB_NAME}" \
    --project="${PROJECT_ID}" \
    --location="${REGION}" \
    --schedule="${SCHEDULE}" \
    --time-zone="${TIME_ZONE}" \
    --uri="${ENDPOINT}" \
    --http-method=POST \
    --headers="Content-Type=application/json,Authorization=Bearer ${CONTENT_API_SECRET}" \
    --message-body="${MESSAGE_BODY}"
else
  gcloud scheduler jobs create http "${JOB_NAME}" \
    --project="${PROJECT_ID}" \
    --location="${REGION}" \
    --schedule="${SCHEDULE}" \
    --time-zone="${TIME_ZONE}" \
    --uri="${ENDPOINT}" \
    --http-method=POST \
    --headers="Content-Type=application/json,Authorization=Bearer ${CONTENT_API_SECRET}" \
    --message-body="${MESSAGE_BODY}"
fi

echo ""
echo "Created/updated Scheduler job (detect→draft→publish)."
echo "Body-only flip without touching the secret header:"
echo "  gcloud scheduler jobs update http ${JOB_NAME} --location=${REGION} --project=${PROJECT_ID} \\"
echo "    --message-body='{\"limit\":2,\"detect\":true,\"draft\":true,\"publish\":false}'"
