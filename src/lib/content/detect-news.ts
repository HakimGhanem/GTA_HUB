import { randomUUID } from "crypto";
import { XMLParser } from "fast-xml-parser";
import { KEYWORDS, getP0Keywords } from "@/data/keywords";
import { enrichTopicFunnel } from "./funnel";
import { eventKeyFromHeadline } from "./ids";
import { bulkUpsertTopics, listTopics } from "./repository";
import type { ContentCluster, Topic } from "./schema";
import { fetchYoutubeVeille } from "./youtube-veille";

const FEEDS = [
  // Purchase / setup intent first — higher EPC near launch (Amazon)
  "https://news.google.com/rss/search?q=GTA+6+preorder+OR+pre-order&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=GTA+6+preorder+price+OR+%22how+much%22+OR+Ultimate+edition&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=GTA+6+collector%27s+edition+OR+%22Ultimate+Edition%22&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=GTA+6+PS5+OR+%22Xbox+Series%22+console+setup&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=GTA+6+best+setup+OR+headset+OR+SSD&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=GTA+6+OR+%22GTA+VI%22+pr%C3%A9commande&hl=fr&gl=FR&ceid=FR:fr",
  // Trailer / general news — still detected, scored lower for daily picks
  "https://news.google.com/rss/search?q=GTA+6+trailer&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=GTA+VI+OR+%22Grand+Theft+Auto+VI%22&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=Rockstar+Games+GTA+6&hl=en-US&gl=US&ceid=US:en",
];

const DOMAIN_BOOST = [
  "rockstargames.com",
  "ign.com",
  "bloomberg.com",
  "gamespot.com",
  "amazon.",
];

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
};

function inferCluster(text: string): ContentCluster {
  const t = text.toLowerCase();
  if (
    t.includes("pre-order") ||
    t.includes("preorder") ||
    t.includes("précommande") ||
    t.includes("collector") ||
    t.includes("ultimate edition") ||
    t.includes("preorder price") ||
    t.includes("edition price")
  )
    return "preorder";
  if (
    t.includes("headset") ||
    t.includes("ssd") ||
    t.includes("120hz") ||
    t.includes("best setup") ||
    (t.includes("setup") && /ps5|xbox|console|tv|monitor/i.test(t))
  )
    return "setup";
  if (
    t.includes("lucia") ||
    t.includes("jason duval") ||
    t.includes("protagonist")
  )
    return "characters";
  if (t.includes("gta 6 story") || t.includes("gta vi story")) return "story";
  if (
    t.includes("vehicle") ||
    t.includes("vapid") ||
    t.includes("vintage vice")
  )
    return "vehicles";
  if (t.includes("release date") || t.includes("launch") || t.includes("delay"))
    return "release";
  if (
    t.includes("tiktok") ||
    t.includes("clip kit") ||
    t.includes("obs overlay")
  )
    return "clip";
  if (
    t.includes("trailer") ||
    t.includes("gameplay") ||
    t.includes("extended look")
  )
    return "trailer";
  if (t.includes("collectible") || t.includes("hidden package"))
    return "collectibles";
  if (
    t.includes("vice city") ||
    t.includes("location") ||
    t.includes("leonida")
  )
    return "locations";
  if (t.includes("map")) return "map";
  return "trailer";
}

function scoreItem(title: string, link: string, pubDate?: string): number {
  let score = 40;
  const lower = title.toLowerCase();
  for (const kw of getP0Keywords()) {
    const needle = kw.phrase.replace(/gta 6 /g, "").slice(0, 12);
    if (needle && lower.includes(needle)) {
      score += kw.monetization === "affiliate" ? 22 : 12;
    }
  }
  if (
    /pre-?order|précommande|ultimate|collector|edition price|preorder price/i.test(
      lower,
    )
  )
    score += 28;
  if (/best setup|headset|ssd|120hz|ps5|xbox series/i.test(lower)) score += 18;
  if (/trailer|gameplay|extended look|netflix/i.test(lower)) score += 6;
  if (DOMAIN_BOOST.some((d) => link.includes(d))) score += 20;
  if (link.includes("amazon.")) score += 10;
  if (pubDate) {
    const ageH = (Date.now() - new Date(pubDate).getTime()) / 36e5;
    if (ageH < 24) score += 25;
    else if (ageH < 72) score += 10;
    else if (ageH > 168) score -= 20;
  }
  return Math.max(0, Math.min(100, score));
}

function keywordHint(cluster: ContentCluster): string | undefined {
  return KEYWORDS.find((k) => k.cluster === cluster && k.priority === "P0")
    ?.phrase;
}

async function fetchFeed(url: string): Promise<RssItem[]> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Map6ContentBot/1.0 (+https://map-6.com)" },
  });
  if (!res.ok) throw new Error(`Feed ${url} → ${res.status}`);
  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const doc = parser.parse(xml);
  const channel = doc?.rss?.channel;
  const items = channel?.item;
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

export type DetectNewsResult = {
  created: number;
  skipped: number;
  feedErrors: string[];
  youtube: {
    status: "ok" | "no_key" | "error";
    fetched: number;
    created: number;
    quotaUsed: number;
    error?: string;
  };
};

type IncomingItem = {
  title: string;
  link: string;
  publishedAt?: string;
  description: string;
  eventKey: string;
  extraScore?: number;
};

function toTopic(
  item: IncomingItem,
  seenEventKeys: Set<string>,
): Topic | "skip-gta" | "skip-dup" {
  if (!/gta\s*(6|vi)|grand theft auto/i.test(item.title)) return "skip-gta";
  if (seenEventKeys.has(item.eventKey)) return "skip-dup";
  seenEventKeys.add(item.eventKey);

  const cluster = inferCluster(`${item.title} ${item.description}`);
  const score = Math.min(
    100,
    scoreItem(item.title, item.link, item.publishedAt) + (item.extraScore ?? 0),
  );
  const now = new Date().toISOString();
  const enriched = enrichTopicFunnel({
    id: "",
    headline: item.title,
    summary: item.description.replace(/<[^>]+>/g, "").slice(0, 400),
    sourceUrls: [item.link],
    cluster,
    score,
    eventKey: item.eventKey,
    status: "scored",
    primaryKeywordHint: keywordHint(cluster),
    createdAt: now,
    updatedAt: now,
  });
  return {
    id: randomUUID(),
    headline: enriched.headline,
    summary: enriched.summary,
    sourceUrls: enriched.sourceUrls,
    cluster: enriched.cluster,
    score: enriched.funnelScore ?? enriched.score,
    eventKey: enriched.eventKey,
    status: "scored",
    primaryKeywordHint: enriched.primaryKeywordHint,
    funnelKind: enriched.funnelKind,
    affiliateIntents: enriched.affiliateIntents,
    clipHook: enriched.clipHook,
    funnelScore: enriched.funnelScore,
    createdAt: now,
    updatedAt: now,
  };
}

/** RSS + YouTube Data API metadata → scored topics. No ASINs or trailer dates invented. */
export async function detectNewsTopics(): Promise<DetectNewsResult> {
  const parserItems: RssItem[] = [];
  const feedErrors: string[] = [];

  for (const feed of FEEDS) {
    try {
      const items = await fetchFeed(feed);
      parserItems.push(...items);
    } catch (err) {
      feedErrors.push(`${feed}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const youtube = await fetchYoutubeVeille();
  if (youtube.status === "error" && youtube.error) {
    feedErrors.push(`youtube: ${youtube.error}`);
  }

  let created = 0;
  let skipped = 0;
  let youtubeCreated = 0;

  // One collection read plus one batched write for the whole run. Resolving
  // each item's eventKey and writing it individually made detection quadratic.
  const seenEventKeys = new Set((await listTopics()).map((t) => t.eventKey));
  const fresh: Topic[] = [];

  const incoming: IncomingItem[] = [
    ...parserItems.flatMap((item) => {
      const title = (item.title || "").trim();
      const link = (item.link || "").trim();
      if (!title || !link) return [];
      return [
        {
          title,
          link,
          publishedAt: item.pubDate,
          description: (item.description || title).replace(/<[^>]+>/g, ""),
          eventKey: eventKeyFromHeadline(title),
        },
      ];
    }),
    ...youtube.videos.map((video) => ({
      title: video.title,
      link: video.url,
      publishedAt: video.publishedAt,
      description: video.summary,
      eventKey: `yt-${video.videoId}`,
      extraScore: video.extraScore,
    })),
  ];

  for (const item of incoming) {
    const topic = toTopic(item, seenEventKeys);
    if (topic === "skip-gta" || topic === "skip-dup") {
      skipped++;
      continue;
    }
    fresh.push(topic);
    created++;
    if (item.eventKey.startsWith("yt-")) youtubeCreated++;
  }

  await bulkUpsertTopics(fresh);

  return {
    created,
    skipped,
    feedErrors,
    youtube: {
      status: youtube.status,
      fetched: youtube.videos.length,
      created: youtubeCreated,
      quotaUsed: youtube.quotaUsed,
      error: youtube.error,
    },
  };
}
