import {
  primaryAffiliateIntent,
  scoreAffiliateIntent,
  type AffiliateIntent,
} from "@/lib/affiliate/intents";
import type { ContentCluster, FunnelKind, Topic } from "./schema";

const PURCHASE_CLUSTERS: ContentCluster[] = ["preorder", "setup", "release"];
/** High-EPC intents that should beat trailer/clip when scores are close. */
const REVENUE_INTENTS = new Set<AffiliateIntent>([
  "preorder_standard",
  "preorder_collectors",
  "console_upgrade",
  "controller",
  "headset",
  "display_120hz",
  "storage_ssd",
]);
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
/** Score delta within which purchase/mixed beats generic trailer. */
export const DAILY_SCORE_TIE_BAND = 12;

export function inferFunnelKind(
  text: string,
  cluster: ContentCluster,
): FunnelKind {
  const intents = scoreAffiliateIntent(text);
  const lower = text.toLowerCase();
  const hasRevenueIntent = intents.some(
    (i) => REVENUE_INTENTS.has(i.intent) && i.score >= 20,
  );
  const hasPurchase =
    hasRevenueIntent ||
    PURCHASE_CLUSTERS.includes(cluster) ||
    /pre-?order|précommande|ultimate|collector|edition price|buy gta/i.test(
      lower,
    );
  const hasClip = CLIP_SIGNALS.some((s) => lower.includes(s));
  const hasMap =
    cluster === "map" ||
    cluster === "locations" ||
    cluster === "collectibles" ||
    lower.includes("map") ||
    lower.includes("location");

  // Trailer-only headlines with weak stream/tiktok signals stay clip, not purchase
  if (
    hasClip &&
    !hasRevenueIntent &&
    !PURCHASE_CLUSTERS.includes(cluster) &&
    !/pre-?order|précommande|ultimate|collector|buy gta|setup|ssd|headset|120hz/i.test(
      lower,
    )
  ) {
    return "clip_kit";
  }

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
  const revenueTop = intents.find((i) => REVENUE_INTENTS.has(i.intent));
  if (revenueTop) score += Math.min(40, revenueTop.score * 0.55);
  else if (top) score += Math.min(20, top.score * 0.35);

  if (cluster === "preorder") score += 22;
  else if (cluster === "setup") score += 20;
  else if (cluster === "release") score += 12;
  else if (cluster === "clip") score += 8;
  else if (cluster === "map" || cluster === "collectibles") score += 8;
  else if (cluster === "trailer") score -= 8;

  const lower = headline.toLowerCase();
  // Generic rumor filler — keep but don't win the daily slot
  if (
    /rumor|allegedly|might|could be|fans think|according to leaks/i.test(lower) &&
    !revenueTop
  ) {
    score -= 18;
  }
  // Evergreen purchase / setup queries win volume strategy (Amazon EPC)
  if (
    /pre-?order|précommande|ultimate|collector|edition price|preorder price|ps5|xbox|headset|ssd|120hz|best setup|setup for gta/i.test(
      lower,
    )
  ) {
    score += 28;
  }
  // Pure trailer/gameplay with no buy signals — deprioritize for daily picks
  if (
    /trailer|gameplay|extended look|netflix/i.test(lower) &&
    !/pre-?order|précommande|ultimate|collector|buy|price|setup|ssd|headset|console/i.test(
      lower,
    )
  ) {
    score -= 14;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function dailyRankKey(topic: Topic): number {
  const score = topic.funnelScore ?? topic.score;
  const kind = topic.funnelKind;
  const intents = topic.affiliateIntents ?? [];
  const hasRevenue = intents.some((i) =>
    REVENUE_INTENTS.has(i as AffiliateIntent),
  );
  // Coarse buckets so close scores still prefer purchase revenue funnels
  let tier = 0;
  if (kind === "purchase" && hasRevenue) tier = 4;
  else if (kind === "mixed" && hasRevenue) tier = 3;
  else if (kind === "purchase") tier = 2;
  else if (kind === "mixed") tier = 1;
  else if (kind === "map_deep_link") tier = 0;
  else tier = -1; // clip_kit / unknown
  return score + tier * (DAILY_SCORE_TIE_BAND / 4);
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

/**
 * Prefer purchase/mixed + affiliate intents for the daily publish batch.
 * When funnelScores are within DAILY_SCORE_TIE_BAND, revenue funnels win
 * over generic trailer/clip topics.
 */
export function rankTopicsForDaily(topics: Topic[], limit: number): Topic[] {
  return [...topics]
    .map(enrichTopicFunnel)
    .filter((t) => t.status === "new" || t.status === "scored")
    .sort((a, b) => {
      const ka = dailyRankKey(a);
      const kb = dailyRankKey(b);
      if (kb !== ka) return kb - ka;
      const sa = a.funnelScore ?? a.score;
      const sb = b.funnelScore ?? b.score;
      if (sb !== sa) return sb - sa;
      // Explicit tie-break: purchase > mixed > map > clip
      const order: Record<string, number> = {
        purchase: 4,
        mixed: 3,
        map_deep_link: 2,
        clip_kit: 1,
      };
      return (order[b.funnelKind ?? ""] ?? 0) - (order[a.funnelKind ?? ""] ?? 0);
    })
    .slice(0, limit);
}
