---
name: map6-news-desk
description: Write, refresh, or cron-draft Map-6 GTA 6 news (EN+FR). Use whenever an agent writes a news article, daily 17h brief, editorial rewrite, leak/preorder/TTWO/trailer desk piece, or compares Map-6 copy to GamesRadar or Startselect.
---

# Map-6 news desk

A reader should finish the piece knowing **what changed, what is still blank, and what to open on the map**. GamesRadar wins on speed and a clean lede. Startselect wraps a recap around gift cards. We beat both by being the map desk that does not invent.

Read `references/facts.md` before stating a date, price, edition, or percentage.

## When this fires

- New `/news` article or a rewrite of an existing slug
- `content:daily` / 17:00 cron draft
- "make this convincing", "less factory", "compare to GamesRadar"

## Hard rules

- **EN+FR only** in the index. Parked locales stay 410/302. Never recycle English onto ES/PT/DE/IT news.
- **No invented facts.** No trailer date, PC date, ASIN, km², mission title, or "89% Ultimate" presented as Rockstar/Take-Two. Zelnick said the mix *skews* to Ultimate (CNBC, 10 Aug 2026). He refused a number.
- **One live URL per story family.** `storyFamily()` in `src/lib/content/ids.ts` — do not publish a seventh $400-box brief.
- **Do not paste** GamesRadar, Startselect, Kotaku, or GTABase. Reformulate. Leak maps stay off the product.
- Affiliate and the preorder banner sit **after** the body, never above the lede.

## Structure (every piece)

1. **Title** 30–60 characters, complete words, no "What"/"Now" cutoffs.
2. **Meta** 120–160 characters, one claim + one consequence.
3. **Lede** two sentences: what happened; why a player cares today.
4. **Body** ≥900 words for a cron auto-publish; ≥600 to stay indexable. Original analysis, not a source rewrite.
5. **One table** when SKUs, dates, or editions differ.
6. **Two Map-6 figures** via `locationFigure("vice-city"|...)` — never hotlink Rockstar art.
7. **≥3 internal links** with descriptive anchors (`/map`, `/locations`, `/guides/gta-6-preorder-guide`, `/guides/gta-6-map-guide`, Ultimate vs Standard, release-date guide). Locale-prefix the path (`/en/...` or `/fr/...`).
8. **Three FAQs** that a searcher would actually ask.
9. **≥2 real sources** (Rockstar, Take-Two IR, PlayStation Blog beat aggregators). The VI homepage alone is not enough.

## Voice

Write like a reporter who keeps a map open. Short sentences. Specific nouns (Leonida Keys, Vintage Vice City Pack, code-in-box).

Forbidden in the first 80 words: "briefing", "facts desk", "we will not invent", "AdSense", "commuter brief", "clip kit".

Allowed later, once: a labeled rumor, a "still blank" list, a map CTA.

French is a **new article**, not a calque. Same facts, different sentences.

## Cron (17:00 Europe/Paris)

`POST /api/content/daily` already: detects RSS, drafts if the family is free, publishes only if SEO ≥80, words ≥900, LLM-grounded, ≥2 non-VI sources.

If you are an agent filling that slot:

1. Confirm `storyFamily` is not already occupied by `CANONICAL_STORY_SLUG`.
2. Open the primary sources. If you cannot verify a number, drop it.
3. Diversify clusters across the week (TTWO, trailer, map, hardware, leaks policy) — not preorder every day.
4. Refuse Sensor Tower / Newzoo "51 million copies" style guesses.

## Ship path

- Hand desk: add to `src/data/news/editorial-desk-2026-10.ts` (or a new month file), append slug to `KEY_NEWS_SLUGS`, spread into `EDITORIAL_ARTICLES`.
- Cron: never force-publish a template fallback.
- After deploy: `/en` `/fr` 200, `/es/news` 410, `ads.txt` 200.
