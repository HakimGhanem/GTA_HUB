# Map-6 content factory

Vertical shorts (1080×1920) from **our data**, not scraped Reels.

```
brief (JSON) → Remotion render → QA → queue / Ayrshare|Postiz|BrightBean
```

UGC is a **file + waiver** the creator sends. There is no Instagram DM scraper.

## Commands (from repo root)

```bash
npm install --prefix factory

npm run factory:studio          # Remotion preview
npm run factory:brief           # 7 Leonida pins from Map-6 data
npm run factory:brief -- --template deal
npm run factory:brief -- --prompt "Vice City neon"
npm run factory:brief -- --from-detect
npm run factory:render -- --brief <id>
npm run factory:qa -- --brief <id>
npm run factory:publish -- --brief <id> --dry-run
npm run factory:ugc -- --file ./clip.mp4 --handle name --waiver
npm run factory:daily           # brief + render + QA + queue
```

## Templates

| id | Source | Risk |
|---|---|---|
| `poi-countdown` | browsable POIs / hubs | lowest |
| `deal-stack` | `preorder-products.ts` | lowest (disclose affiliate) |
| `ugc-credit` | submitted file + `--waiver` | needs human review |

## Publish

Default is a **local queue** (`factory/out/publish-queue/`). Sending needs a public MP4 URL (`FACTORY_PUBLIC_MEDIA_BASE`) plus one of:

- `AYRSHARE_API_KEY`
- `POSTIZ_API_KEY` + `POSTIZ_INTEGRATION_ID`
- `BRIGHTBEAN_API_KEY` + `BRIGHTBEAN_URL` + `BRIGHTBEAN_ACCOUNT_ID`

Daily caps: IG 50, TikTok 15, YouTube 100.

## Asset bank

Drop own gameplay / licensed beds in `data/assets/` and list them in `data/assets/manifest.json` (see `manifest.example.json`). Radio GTA and third-party YouTube rips stay out.
