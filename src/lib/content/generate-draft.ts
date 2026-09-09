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

const DRAFT_RULES = `You are a Map-6 editor. Write factual GTA 6 news drafts.
Rules: never invent trailer dates or product ASINs; label rumors; include ≥3 markdown internal links to /en/map, /en/locations, /en/guides/*;
title 30-60 chars; meta description 120-160 chars; cite sources.`;

const DRAFT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    bodyMarkdown: { type: "string" },
    slug: { type: "string" },
  },
  required: ["title", "description", "bodyMarkdown", "slug"],
  additionalProperties: false,
} as const;

type DraftJson = {
  title: string;
  description: string;
  bodyMarkdown: string;
  slug: string;
};

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

type GroqMessage = {
  content?: string;
  executed_tools?: {
    type?: string;
    search_results?: { results?: { title?: string; url?: string }[] };
  }[];
};

/**
 * A grounded draft costs ~6k tokens against a free-tier budget of 8k per
 * minute, so drafting two articles in one run reliably trips a 429 on the
 * second. Waiting out the window the API asks for is cheaper than losing the
 * article to the template fallback.
 */
async function groqCall(key: string, body: unknown): Promise<GroqMessage> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = (await res.json()) as { choices: { message: GroqMessage }[] };
      return data.choices[0].message;
    }

    const detail = (await res.text()).slice(0, 300);
    if (res.status !== 429 || attempt >= 2) {
      throw new Error(`${res.status} ${detail}`);
    }

    const headerWait = Number(res.headers.get("retry-after"));
    const messageWait = Number(detail.match(/try again in ([\d.]+)s/)?.[1]);
    const waitSeconds = headerWait || messageWait || 20;
    await new Promise((r) => setTimeout(r, Math.min(waitSeconds + 1, 45) * 1000));
  }
}

/**
 * gpt-oss emits browser citations as `【4†title†domain】` and likes typographic
 * hyphens, which break keyword matching against our ASCII keyword table.
 */
function cleanModelText(text: string): string {
  return text
    .replace(/【[^】]*】/g, "")
    .replace(/[\u2010\u2011]/g, "-")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/ +([.,;:])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/** Words a headline or meta description must never end on after truncation. */
const DANGLING =
  /[\s\-–—,;:]+(?:a|an|the|and|or|of|on|in|to|for|with|at|by|from|as|is|are|was|were|that|this|its|it|but|per|via)$/i;

function truncateAt(text: string, max: number): string {
  if (text.length <= max) return text;
  let cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > max * 0.5) cut = cut.slice(0, lastSpace);
  cut = cut.replace(/[\s\-–—,;:]+$/, "");
  while (DANGLING.test(cut)) cut = cut.replace(DANGLING, "");
  return cut.trim();
}

function clampTitle(title: string, fallback: string): string {
  const clean = cleanModelText(title);
  if (clean.length < 30) return fallback;
  return truncateAt(clean, 60);
}

function clampDescription(description: string, fallback: string): string {
  const clean = cleanModelText(description);
  if (clean.length < 120) return fallback;
  if (clean.length <= 160) return clean;
  const cut = truncateAt(clean, 160);
  // Truncation can drop below the 120-char SEO floor; keep the fallback then.
  return cut.length >= 120 ? cut : fallback;
}

/**
 * Two calls, because Groq rejects structured outputs and tool use in the same
 * request: the first researches with `browser_search`, the second formats the
 * findings into the draft schema. Sources come from the search results rather
 * than the model's prose, so the citation list cannot be hallucinated.
 */
async function groqDraft(
  topic: Topic,
): Promise<Omit<Article, "id" | "createdAt" | "updatedAt" | "seoScore"> | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const effort = process.env.GROQ_REASONING_EFFORT || "low";
  const { primary, secondary } = pickKeywords(topic);

  try {
    const research = await groqCall(key, {
      model,
      reasoning_effort: effort,
      tools: [{ type: "browser_search" }],
      messages: [
        {
          role: "system",
          content:
            "You are a games news researcher. Search the web, then report only facts you verified against a page you opened, each with its source. Never invent trailer dates or product ASINs. Mark anything unconfirmed as a rumor.",
        },
        {
          role: "user",
          content: `Research this GTA 6 story and report the confirmed facts, the open questions, and the sources you opened:\n\n"${topic.headline}"\n\nContext: ${topic.summary}`,
        },
      ],
    });

    const notes = cleanModelText(research.content ?? "");
    if (notes.length < 200) return null;

    // Search returns bare homepages and the occasional unrelated hit (job
    // boards, aggregators), so require a real path and an on-topic title.
    const found = (research.executed_tools ?? [])
      .flatMap((t) => t.search_results?.results ?? [])
      .filter((r): r is { title: string; url: string } =>
        Boolean(
          r.url &&
            /^https?:\/\/[^/]+\/[^/]/.test(r.url) &&
            /gta|grand theft auto|rockstar|take-?two/i.test(r.title ?? ""),
        ),
      );
    const sources = [
      ...new Map(found.map((r) => [r.url, r])).values(),
    ]
      .slice(0, 6)
      .map((r) => ({ url: r.url, title: (r.title || r.url).slice(0, 120) }));

    const formatted = await groqCall(key, {
      model,
      reasoning_effort: effort,
      response_format: {
        type: "json_schema",
        json_schema: { name: "news_draft", strict: true, schema: DRAFT_SCHEMA },
      },
      messages: [
        {
          role: "system",
          content: `${DRAFT_RULES}
Use only facts present in the research notes. Write flowing prose paragraphs, not a bullet list of facts.
Never include citation markers, a trailing keyword list, or any "Keywords:" line — the source list is rendered separately.
Link with descriptive anchor text, never the raw path: [interactive map](/en/map), [locations](/en/locations), [pre-order guide](/en/guides/gta-6-preorder-guide), [map guide](/en/guides/gta-6-map-guide). Use only these four paths.
Count characters: title 30-60, description 120-160. Both must end on a complete word.
Weave in the primary keyword "${primary?.phrase ?? topic.primaryKeywordHint}" naturally; secondary keywords if they fit: ${secondary.join(", ")}.`,
        },
        { role: "user", content: `Research notes:\n\n${notes}` },
      ],
    });

    const parsed = JSON.parse(formatted.content ?? "{}") as DraftJson;
    const base = templateDraft(topic);

    return {
      ...base,
      title: clampTitle(parsed.title ?? "", base.title),
      description: clampDescription(parsed.description ?? "", base.description),
      bodyMarkdown: cleanModelText(parsed.bodyMarkdown || base.bodyMarkdown),
      slug: slugify(parsed.slug || base.slug),
      sources: sources.length ? sources : base.sources,
      notes: `${base.notes} (Groq ${model}, ${sources.length} sources)`,
    };
  } catch (err) {
    console.warn("Groq draft failed, trying next provider:", err);
    return null;
  }
}

async function llmDraft(
  topic: Topic,
): Promise<Omit<Article, "id" | "createdAt" | "updatedAt" | "seoScore"> | null> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!openaiKey && !geminiKey) return null;

  const { primary, secondary } = pickKeywords(topic);
  const system = `${DRAFT_RULES}
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

/** Draft one article from a topic (Groq, then OpenAI/Gemini, else template). Never invents ASINs/dates. */
export async function generateDraftFromTopic(
  topic: Topic,
): Promise<GenerateDraftResult> {
  const draft =
    (await groqDraft(topic)) || (await llmDraft(topic)) || templateDraft(topic);
  const article = await upsertArticle(draft);
  const checklist = scoreArticleSeo(article);
  await upsertTopic({ ...topic, status: "drafted" });
  return {
    article,
    seoScore: checklist.score,
    issues: checklist.issues,
  };
}
