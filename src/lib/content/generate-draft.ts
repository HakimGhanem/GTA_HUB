import { KEYWORDS } from "@/data/keywords";
import { INTENT_META, type AffiliateIntent } from "@/lib/affiliate/intents";
import {
  buildClipHook,
  enrichTopicFunnel,
  suggestMapCta,
} from "./funnel";
import { slugify } from "./ids";
import { scoreArticleSeo } from "./seo-score";
import { upsertArticle, upsertTopic } from "./repository";
import type { Article, Topic } from "./schema";

/** Skip weak / rumor-only topics — no draft if nothing worth publishing. */
export const MIN_DAILY_FUNNEL_SCORE = 50;

export function isGoodDailyTopic(topic: Topic): boolean {
  const enriched = enrichTopicFunnel(topic);
  const score = enriched.funnelScore ?? enriched.score;
  if (score < MIN_DAILY_FUNNEL_SCORE) return false;
  // Pure rumor filler without purchase/map signal — skip
  const lower = `${enriched.headline} ${enriched.summary}`.toLowerCase();
  if (
    /rumor|allegedly|fans think|according to leaks/i.test(lower) &&
    enriched.funnelKind === "clip_kit" &&
    score < 65
  ) {
    return false;
  }
  return true;
}

function pickKeywords(topic: Topic) {
  const clusterKws = KEYWORDS.filter((k) => k.cluster === topic.cluster);
  const primary =
    clusterKws.find((k) => k.phrase === topic.primaryKeywordHint) ||
    clusterKws.find((k) => k.priority === "P0") ||
    clusterKws[0];
  const secondary = clusterKws
    .filter((k) => k.id !== primary?.id)
    .slice(0, 3)
    .map((k) => k.phrase);
  return { primary, secondary };
}

function templateDraft(topic: Topic): Omit<
  Article,
  "id" | "createdAt" | "updatedAt" | "seoScore"
> {
  const { primary, secondary } = pickKeywords(topic);
  const phrase = primary?.phrase || topic.primaryKeywordHint || "gta 6 news";
  const fromHeadline = slugify(topic.headline).replace(/^-|-$/g, "");
  const slug =
    (fromHeadline && fromHeadline.length >= 12
      ? fromHeadline
      : primary?.targetSlugHint) || "gta-6-news-update";

  const titleBase = topic.headline.replace(/\s*-\s*Google News.*/i, "").trim();
  let title = titleBase.slice(0, 58);
  if (title.length < 30) title = `GTA 6 Update: ${title}`.slice(0, 58);

  const cleanHeadline = titleBase.replace(/\s+/g, " ").trim();
  let description = (
    `${cleanHeadline}. Map context, verified sources, and what it means for Vice City explorers on Map-6 — no invented trailer dates.`
  ).slice(0, 160);
  if (description.length < 120) {
    description = (
      `${cleanHeadline}. Track pins on the free Map-6 interactive map; rumors stay labeled. Preorder & setup links when purchase intent is clear.`
    ).slice(0, 160);
  }
  if (description.length < 120) {
    description = description.padEnd(120, ".");
  }

  const sources = topic.sourceUrls.map((url, i) => ({
    url,
    title: topic.headline.slice(0, 80) + (i ? ` (source ${i + 1})` : ""),
  }));
  if (sources.length === 1) {
    sources.push({
      url: "https://www.rockstargames.com/VI",
      title: "Rockstar Games — Grand Theft Auto VI (official)",
    });
  }

  const funnel = enrichTopicFunnel(topic);
  const mapPath = suggestMapCta(topic.cluster);
  const clipHook =
    funnel.clipHook ||
    buildClipHook(topic.headline, funnel.funnelKind ?? "mixed");
  const intentLines = (funnel.affiliateIntents ?? [])
    .slice(0, 2)
    .map((id) => {
      const meta = INTENT_META[id as AffiliateIntent];
      return meta ? `- **${meta.label}**: ${meta.jobToBeDone}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const purchaseBlock =
    funnel.funnelKind === "purchase" || funnel.funnelKind === "mixed"
      ? `
## Buy / setup angle

${intentLines || "- Compare editions and launch hardware before stocks move."}

- Full picks: [GTA 6 pre-order guide](/en/guides/gta-6-preorder-guide)
- Affiliate product slots fill as official ASINs go live — we never invent ASINs or trailer dates.
`
      : "";

  const clipBlock = `
## Clip kit (TikTok / Kick)

> ${clipHook}

1. Open the pin on the [interactive map](${mapPath.startsWith("/") ? `/en${mapPath}` : mapPath}).
2. Screen-record HUD coords + POI name (Share copies a deep link).
3. CTA: map link in bio + preorder guide if the clip is purchase-adjacent.
`;

  const bodyMarkdown = `## What's new

${topic.summary}

Map-6 turns this into a **funnel page**: map deep-link + ${funnel.funnelKind ?? "mixed"} intent — not a generic news dump.

## Verified facts vs rumors

- **Confirmed**: only details explicitly stated by Rockstar or shown in official media.
- **Rumors**: community leaks stay labeled as unverified — we will not invent a trailer date or product ASIN.

Primary focus keyword: **${phrase}**.
${purchaseBlock}
## Map & location angle

Cross-check landmarks on:

- [Interactive map](/en/map)
- [All locations](/en/locations)
- [Beginner map guide](/en/guides/gta-6-map-guide)
${clipBlock}
## What to do next

1. Open the [Map-6 interactive map](/en/map) and Share the pin.
2. If you're buying hardware or editions, use the [pre-order guide](/en/guides/gta-6-preorder-guide).
3. Classics: try [GTA 5 map](/en/map?game=gta5) or [San Andreas](/en/map?game=sa) while waiting for VI.

## Sources

See the sources list below for outbound citations used in this draft.
`;

  return {
    slug,
    locale: "en",
    title,
    description:
      description.length < 120 ? description.padEnd(120, ".") : description,
    bodyMarkdown,
    cluster: topic.cluster,
    primaryKeyword: phrase,
    secondaryKeywords: secondary,
    sources,
    status: "drafted",
    author: "Map-6 Editorial",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-map-guide", "gta-6-preorder-guide"],
    notes: `Auto-draft from topic ${topic.id}. Human review required before publish.`,
    eventKey: topic.eventKey,
    heroImage: "/og-default.png",
    funnelKind: funnel.funnelKind,
    affiliateIntents: funnel.affiliateIntents,
    clipHook,
    mapCtaPath: mapPath,
  };
}

async function llmDraft(
  topic: Topic,
): Promise<Omit<Article, "id" | "createdAt" | "updatedAt" | "seoScore"> | null> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!openaiKey && !geminiKey) return null;

  const { primary, secondary } = pickKeywords(topic);
  const system = `You are a Map-6 editor. Write factual GTA 6 news drafts.
Rules: never invent trailer dates or product ASINs; label rumors; include ≥3 markdown internal links to /en/map, /en/locations, /en/guides/*;
title 30-60 chars; meta description 120-160 chars; cite sources.
Return ONLY valid JSON matching keys: title, description, bodyMarkdown, slug.`;

  const user = JSON.stringify({
    topic,
    primaryKeyword: primary?.phrase,
    secondaryKeywords: secondary,
    relatedInternalPaths: primary?.relatedInternalPaths,
  });

  try {
    if (openaiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      const parsed = JSON.parse(data.choices[0].message.content) as {
        title: string;
        description: string;
        bodyMarkdown: string;
        slug: string;
      };
      const base = templateDraft(topic);
      return {
        ...base,
        title: parsed.title || base.title,
        description: parsed.description || base.description,
        bodyMarkdown: parsed.bodyMarkdown || base.bodyMarkdown,
        slug: slugify(parsed.slug || base.slug),
        notes: `${base.notes} (OpenAI)`,
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-2.0-flash"}:generateContent?key=${geminiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${system}\n\n${user}` }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = (await res.json()) as {
      candidates: { content: { parts: { text: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    const parsed = JSON.parse(text) as {
      title: string;
      description: string;
      bodyMarkdown: string;
      slug: string;
    };
    const base = templateDraft(topic);
    return {
      ...base,
      title: parsed.title || base.title,
      description: parsed.description || base.description,
      bodyMarkdown: parsed.bodyMarkdown || base.bodyMarkdown,
      slug: slugify(parsed.slug || base.slug),
      notes: `${base.notes} (Gemini)`,
    };
  } catch (err) {
    console.warn("LLM draft failed, falling back to template:", err);
    return null;
  }
}

export type GenerateDraftResult = {
  article: Article;
  seoScore: number;
  issues: string[];
};

/** Draft one article from a topic (LLM if keyed, else template). Never invents ASINs/dates. */
export async function generateDraftFromTopic(
  topic: Topic,
): Promise<GenerateDraftResult> {
  const draft = (await llmDraft(topic)) || templateDraft(topic);
  const article = await upsertArticle(draft);
  const checklist = scoreArticleSeo(article);
  await upsertTopic({ ...topic, status: "drafted" });
  return {
    article,
    seoScore: checklist.score,
    issues: checklist.issues,
  };
}
