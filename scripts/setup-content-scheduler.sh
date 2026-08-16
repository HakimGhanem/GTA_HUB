#!/usr/bin/env bash
# Schedule Map-6 daily funnel at 17:00 Europe/Paris.
#
# Creates:
# 1) Cloud Scheduler → HTTP POST /api/content/daily (enrich + publish drafted)
# 2) Optional Cloud Run Job for full CLI detect→draft (recommended)
#
# Usage:
#   PROJECT_ID=gtahub-503009 REGION=europe-west1 SERVICE=map6 \
#   CONTENT_API_SECRET=... bash scripts/setup-content-scheduler.sh
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-gtahub-503009}"
REGION="${REGION:-europe-west1}"
SERVICE="${SERVICE:-map6}"
JOB_NAME="${JOB_NAME:-map6-content-daily}"
SCHEDULE="${SCHEDULE:-0 17 * * *}"
TIME_ZONE="${TIME_ZONE:-Europe/Paris}"

if [[ -z "${CONTENT_API_SECRET:-}" ]]; then
  echo "CONTENT_API_SECRET is required" >&2
  exit 1
fi

SITE_URL="${SITE_URL:-https://map-6.com}"
ENDPOINT="${SITE_URL%/}/api/content/daily"

echo "→ Cloud Scheduler job ${JOB_NAME}"
echo "  schedule: ${SCHEDULE} (${TIME_ZONE})"
echo "  target:   ${ENDPOINT}"

if gcloud scheduler jobs describe "${JOB_NAME}" --location="${REGION}" --project="${PROJECT_ID}" >/dev/null 2>&1; then
  gcloud scheduler jobs update http "${JOB_NAME}" \
    --project="${PROJECT_ID}" \
    --location="${REGION}" \
    --schedule="${SCHEDULE}" \
    --time-zone="${TIME_ZONE}" \
    --uri="${ENDPOINT}" \
    --http-method=POST \
    --headers="Content-Type=application/json,Authorization=Bearer ${CONTENT_API_SECRET}" \
    --message-body='{"limit":2,"publish":false,"enrichOnly":false}'
else
  gcloud scheduler jobs create http "${JOB_NAME}" \
    --project="${PROJECT_ID}" \
    --location="${REGION}" \
    --schedule="${SCHEDULE}" \
    --time-zone="${TIME_ZONE}" \
    --uri="${ENDPOINT}" \
    --http-method=POST \
    --headers="Content-Type=application/json,Authorization=Bearer ${CONTENT_API_SECRET}" \
    --message-body='{"limit":2,"publish":false,"enrichOnly":false}'
fi

echo ""
echo "Created/updated Scheduler job (publish=false by default — review first)."
echo "For full detect→draft volume, run a Cloud Run Job with:"
echo "  npm run content:daily -- --limit 2"
echo "and attach the same cron ${SCHEDULE} ${TIME_ZONE}."
echo ""
echo "Flip auto-publish later:"
echo "  gcloud scheduler jobs update http ${JOB_NAME} --location=${REGION} \\"
echo "    --message-body='{\"limit\":2,\"publish\":true}'"
echo "or set CONTENT_DAILY_AUTO_PUBLISH=true on Cloud Run."
