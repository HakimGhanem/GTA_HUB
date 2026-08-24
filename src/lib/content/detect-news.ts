import { XMLParser } from "fast-xml-parser";
import { KEYWORDS, getP0Keywords } from "@/data/keywords";
import { enrichTopicFunnel } from "./funnel";
import { eventKeyFromHeadline } from "./ids";
import { getTopicByEventKey, upsertTopic } from "./repository";
import type { ContentCluster } from "./schema";

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
};

/** RSS → scored topics. Does not invent ASINs or trailer dates. */
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

  let created = 0;
  let skipped = 0;

  for (const item of parserItems) {
    const title = (item.title || "").trim();
    const link = (item.link || "").trim();
    if (!title || !link) continue;
    if (!/gta\s*(6|vi)|grand theft auto/i.test(title)) {
      skipped++;
      continue;
    }

    const cluster = inferCluster(`${title} ${item.description || ""}`);
    const eventKey = eventKeyFromHeadline(title);
    const existing = await getTopicByEventKey(eventKey);
    if (existing) {
      skipped++;
      continue;
    }

    const score = scoreItem(title, link, item.pubDate);
    const enriched = enrichTopicFunnel({
      id: "",
      headline: title,
      summary: (item.description || title).replace(/<[^>]+>/g, "").slice(0, 400),
      sourceUrls: [link],
      cluster,
      score,
      eventKey,
      status: "scored",
      primaryKeywordHint: keywordHint(cluster),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await upsertTopic({
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
    });
    created++;
  }

  return { created, skipped, feedErrors };
}
