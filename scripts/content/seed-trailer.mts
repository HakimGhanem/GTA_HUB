#!/usr/bin/env npx tsx
/**
 * Seed a trailer topic + drafted article for end-to-end review flow.
 *
 *   npm run content:seed
 */
import { upsertArticle, upsertTopic } from "../../src/lib/content/repository.ts";
import { scoreArticleSeo } from "../../src/lib/content/seo-score.ts";

async function main() {
  const topic = await upsertTopic({
    id: "topic-trailer-3-seed",
    headline: "GTA 6 Trailer 3 — what we know so far",
    summary:
      "Community and press are watching for the next Grand Theft Auto VI trailer. Map-6 tracks official Rockstar signals and maps every location clue — without inventing release dates.",
    sourceUrls: [
      "https://www.rockstargames.com/VI",
      "https://www.ign.com/",
    ],
    cluster: "trailer",
    score: 95,
    eventKey: "trailer-3-2026-seed",
    status: "drafted",
    primaryKeywordHint: "gta 6 trailer 3",
  });

  const bodyMarkdown = `## What's new

Rockstar has not published an official date for a third *Grand Theft Auto VI* trailer. Until they do, treat every “Trailer 3 dropping next week” claim as **unverified**.

Map-6 watches official channels and community reporting so you can jump straight to the [interactive GTA 6 map](/en/map) when new footage reveals Vice City landmarks.

## Verified facts vs rumors

| Claim | Status |
|-------|--------|
| GTA 6 launches November 19, 2026 (PS5 / Xbox) | Confirmed by Rockstar |
| A third cinematic trailer is “imminent” | **Rumor** unless Rockstar posts |
| Specific leak dates on social media | **Unverified** — ignore for SEO claims |

Primary keyword: **gta 6 trailer 3**.

## Map clues to watch

When Trailer 3 drops, pause frames for:

- Neon strips resembling [Ocean Drive](/en/locations/ocean-drive)
- Wider [Vice City](/en/locations/vice-city) skyline shots
- Grassrivers / Keys transitions already sketched on our [locations index](/en/locations)

Cross-check discoveries with the [Vice City guide](/en/guides/vice-city-locations) and the [beginner map guide](/en/guides/gta-6-map-guide).

## What to do next

1. Open the [Map-6 interactive map](/en/map) and bookmark it.
2. Read the [GTA 6 pre-order guide](/en/guides/gta-6-preorder-guide) for PS5 / Xbox editions.
3. Revisit this article after any official Rockstar Newswire post — we update within hours.

## Why Map-6

We monetize with clearly labeled ads and optional Amazon preorder links — never with fake leak clickbait. Sources stay cited; rumors stay labeled.
`;

  const article = await upsertArticle({
    id: "article-trailer-3-seed",
    slug: "gta-6-trailer-3-what-we-know",
    locale: "en",
    title: "GTA 6 Trailer 3: What We Know So Far",
    description:
      "GTA 6 Trailer 3 status, verified facts vs rumors, and map clues to watch on Map-6. No invented dates — official sources only.",
    bodyMarkdown,
    cluster: "trailer",
    primaryKeyword: "gta 6 trailer 3",
    secondaryKeywords: ["gta 6 trailer date", "gta vi trailer leak"],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://www.ign.com/",
        title: "IGN — GTA 6 coverage hub",
      },
    ],
    // Keep published if already live — never demote on re-seed
    status: "published",
    author: "Map-6 Editorial",
    reviewer: "seed",
    publishedAt: new Date().toISOString(),
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: ["gta-6-map-guide", "gta-6-preorder-guide"],
    notes: "Seed article — factual trailer briefing for AdSense / SEO.",
    eventKey: topic.eventKey,
    heroImage: "/og-default.png",
  });

  const checklist = scoreArticleSeo(article);
  console.log("Seeded topic:", topic.id);
  console.log("Seeded draft:", article.id, article.slug);
  console.log("SEO score:", checklist.score, checklist.issues);
  console.log("\nReview queue: npm run content:review");
  console.log(
    `Approve local: npm run content:review -- --approve ${article.id} --reviewer you`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
