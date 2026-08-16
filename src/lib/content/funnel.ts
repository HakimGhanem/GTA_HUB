import {
  primaryAffiliateIntent,
  scoreAffiliateIntent,
  type AffiliateIntent,
} from "@/lib/affiliate/intents";
import type { ContentCluster, FunnelKind, Topic } from "./schema";

const PURCHASE_CLUSTERS: ContentCluster[] = ["preorder", "setup", "release"];
const CLIP_SIGNALS = [
  "trailer",
  "gameplay",
  "leak",
  "easter egg",
  "hidden",
  "map",
  "location",
  "tiktok",
  "clip",
];

export function inferFunnelKind(
  text: string,
  cluster: ContentCluster,
): FunnelKind {
  const intents = scoreAffiliateIntent(text);
  const lower = text.toLowerCase();
  const hasPurchase =
    intents.some((i) => i.score >= 20) || PURCHASE_CLUSTERS.includes(cluster);
  const hasClip = CLIP_SIGNALS.some((s) => lower.includes(s));
  const hasMap =
    cluster === "map" ||
    cluster === "locations" ||
    cluster === "collectibles" ||
    lower.includes("map") ||
    lower.includes("location");

  if (hasPurchase && (hasMap || hasClip)) return "mixed";
  if (hasPurchase) return "purchase";
  if (hasClip && hasMap) return "clip_kit";
  if (hasMap) return "map_deep_link";
  if (hasClip) return "clip_kit";
  return "mixed";
}

/** Boost topics that match buy or clip intent; downrank generic news. */
export function computeFunnelScore(input: {
  headline: string;
  cluster: ContentCluster;
  baseScore: number;
}): number {
  const { headline, cluster, baseScore } = input;
  let score = baseScore;
  const intents = scoreAffiliateIntent(headline);
  const top = intents[0];
  if (top) score += Math.min(35, top.score * 0.5);
  if (PURCHASE_CLUSTERS.includes(cluster)) score += 15;
  if (cluster === "setup" || cluster === "clip") score += 12;
  if (cluster === "map" || cluster === "collectibles") score += 8;

  const lower = headline.toLowerCase();
  // Generic rumor filler — keep but don't win the daily slot
  if (
    /rumor|allegedly|might|could be|fans think|according to leaks/i.test(lower) &&
    !top
  ) {
    score -= 18;
  }
  // Evergreen purchase / setup queries win volume strategy
  if (/pre-?order|collector|ps5|xbox|headset|ssd|120hz|setup/i.test(lower)) {
    score += 20;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function buildClipHook(headline: string, funnelKind: FunnelKind): string {
  const clean = headline.replace(/\s*-\s*Google News.*/i, "").trim().slice(0, 90);
  if (funnelKind === "purchase") {
    return `🛒 ${clean} — link in bio / Map-6 preorder picks`;
  }
  if (funnelKind === "map_deep_link") {
    return `📍 ${clean} — open the pin on Map-6`;
  }
  if (funnelKind === "clip_kit") {
    return `🎬 ${clean} — drop this on Kick / TikTok with the map overlay`;
  }
  return `🗺️ ${clean} — Map-6 deep dive`;
}

export function suggestMapCta(cluster: ContentCluster): string {
  if (cluster === "collectibles") return "/map?game=gta6";
  if (cluster === "locations") return "/map?game=gta6";
  if (cluster === "map") return "/map";
  return "/map";
}

export function enrichTopicFunnel(topic: Topic): Topic {
  const text = `${topic.headline} ${topic.summary}`;
  const funnelKind = inferFunnelKind(text, topic.cluster);
  const intents = scoreAffiliateIntent(text)
    .slice(0, 3)
    .map((i) => i.intent as AffiliateIntent);
  const primary = primaryAffiliateIntent(text);
  const affiliateIntents = primary
    ? Array.from(new Set([primary, ...intents]))
    : intents;

  return {
    ...topic,
    funnelKind,
    affiliateIntents,
    clipHook: buildClipHook(topic.headline, funnelKind),
    funnelScore: computeFunnelScore({
      headline: topic.headline,
      cluster: topic.cluster,
      baseScore: topic.score,
    }),
  };
}

/** Prefer purchase/clip funnels for the daily publish batch. */
export function rankTopicsForDaily(topics: Topic[], limit: number): Topic[] {
  return [...topics]
    .map(enrichTopicFunnel)
    .filter((t) => t.status === "new" || t.status === "scored")
    .sort((a, b) => (b.funnelScore ?? b.score) - (a.funnelScore ?? a.score))
    .slice(0, limit);
}
