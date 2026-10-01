# Map-6 factory desk

Personal shorts tool. Not MoneyPrinter: **our data + our captures**, two human gates, official publish APIs.

```
brief → approve script → render → QA → approve render → queue (Postiz / Ayrshare)
```

## Daily use

```bash
npm install --prefix factory

# 1. Draft from Map-6 pins / deals / your gameplay
npm run factory:brief -- --prompt "Vice City"
npm run factory:brief -- --template deal
npm run factory:brief -- --template gameplay --prompt "chase ls"

# 2. Review (CLI or localhost desk)
npm run factory:review
npm run factory:desk          # http://127.0.0.1:3847

npm run factory:review -- --approve-script <id>
npm run factory:render -- --brief <id>
npm run factory:qa -- --brief <id>
npm run factory:review -- --approve-render <id>
npm run factory:publish -- --brief <id> --dry-run
```

## Publishing

Post for Me ($10/mo, 1000 posts): their API clients are audited, so we skip the
TikTok audit and Meta App Review. Needs `FACTORY_PUBLIC_MEDIA_BASE` — the mp4 must
be on a public URL before it can be sent.

```bash
npm run factory:publish -- --list-accounts        # ids for POSTFORME_ACCOUNT_*
npm run factory:publish -- --brief <id> --via postforme
npm run factory:publish -- --brief <id> --via postforme --tiktok-draft
```

Verify once, in a logged-out window, that the TikTok post is actually public: an
unaudited client returns 200 and silently posts `SELF_ONLY`.

`--skip-review` on `factory:daily` auto-approves both gates (for tests only).

## Gameplay (your files only)

```bash
npm run factory:ingest -- --file ./obs-chase.mp4 --tags gta5,chase,ls
npm run factory:ingest -- --file ./bed-night.mp3 --kind audio --licence licensed-music --tags night
```

No YouTube rips. No trending hits. Beds = Epidemic / Artlist / YT Audio Library.

## Prompting the agent

Works today: *« 8 pins Vice City, approve script, render »*  
Works after ingest: *« 10 cuts GTA5 tag chase, licensed night bed »*  
Does not work: *« trending audio + other people’s Reels »*

## Research log

Edits and approvals append `factory/data/registry/review-log.jsonl` (hook before/after, optional `--seconds`).
