import { promises as fs } from "fs";
import path from "path";
import { loadFacts, type Fact } from "./facts";
import type { DeskTopic } from "./desk-queue";
import {
  cleanModelText,
  clampDescription,
  clampTitle,
  groqCall,
} from "./generate-draft";
import { listArticles, upsertArticle } from "./repository";
import type { Article, ArticleClaim, ContentCluster } from "./schema";
import { fetchExcerpts, type SourceExcerpt } from "./source-excerpt";
import { validateArticle } from "./validate-article";

export type GatedDraftJson = {
  title: string;
  metaDescription: string;
  h1: string;
  bodyMdx: string;
  faq: { question: string; answer: string }[];
  claims: ArticleClaim[];
};

export type GenerateGatedResult = {
  article: Article;
  validation: Awaited<ReturnType<typeof validateArticle>>;
  excerpts: SourceExcerpt[];
};

async function systemPrompt(): Promise<string> {
  const file = path.join(process.cwd(), "prompts", "article-system.md");
  return fs.readFile(file, "utf8");
}

function factsForTopic(all: Fact[], ids: string[]): Fact[] {
  const want = new Set(ids);
  return all.filter((f) => want.has(f.id));
}

function buildUserPayload(
  topic: DeskTopic,
  facts: Fact[],
  excerpts: SourceExcerpt[],
  date: string,
) {
  return JSON.stringify(
    {
      locale: topic.locale,
      slug: topic.slug,
      pageType: topic.pageType,
      primaryKeyword: topic.primaryKeyword,
      variants: topic.variants,
      verificationDate: date,
      facts,
      excerpts: excerpts.map((e) => ({
        url: e.url,
        title: e.title,
        ok: e.ok,
        text: e.text.slice(0, 4000),
      })),
      mapLinks:
        topic.locale === "fr"
          ? [
              "/fr/map",
              "/fr/locations",
              "/fr/guides/gta-6-map-guide",
              "/fr/guides/gta-6-preorder-guide",
            ]
          : [
              "/en/map",
              "/en/locations",
              "/en/guides/gta-6-map-guide",
              "/en/guides/gta-6-preorder-guide",
            ],
    },
    null,
    2,
  );
}

function parseDraft(raw: string): GatedDraftJson | null {
  const trimmed = raw.trim().replace(/^```json\s*|```$/g, "");
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const parsed = JSON.parse(trimmed.slice(start, end + 1)) as GatedDraftJson;
    if (!parsed.title || !parsed.bodyMdx) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function anthropicDraft(
  system: string,
  user: string,
): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status} ${await res.text()}`);
  const data = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  return data.content?.find((b) => b.type === "text")?.text ?? null;
}

async function groqDraftJson(system: string, user: string): Promise<string | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const message = await groqCall(key, {
    model,
    temperature: 0.3,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  return message.content ?? null;
}

async function openAiDraft(system: string, user: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
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
  if (!res.ok) throw new Error(`OpenAI ${res.status} ${await res.text()}`);
  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content ?? null;
}

async function callModel(system: string, user: string): Promise<string> {
  const errors: string[] = [];
  for (const fn of [anthropicDraft, groqDraftJson, openAiDraft]) {
    try {
      const text = await fn(system, user);
      if (text) return text;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  throw new Error(
    `no gated model available (${errors.join("; ") || "set ANTHROPIC_API_KEY"})`,
  );
}

function clusterFor(topic: DeskTopic): ContentCluster {
  return topic.cluster ?? (topic.pageType === "news" ? "release" : "characters");
}

function toArticle(
  topic: DeskTopic,
  parsed: GatedDraftJson,
  excerpts: SourceExcerpt[],
  date: string,
): Omit<Article, "id" | "createdAt" | "updatedAt" | "seoScore"> {
  const h1 = cleanModelText(parsed.h1 || parsed.title);
  let body = cleanModelText(parsed.bodyMdx);
  if (h1 && !body.startsWith("# ")) {
    body = `${body}`;
  }
  const verified =
    topic.locale === "fr"
      ? `\n\nDernière vérification: ${date}\n`
      : `\n\nLast verified: ${date}\n`;
  if (!/derni[eè]re v[ée]rification|last verified/i.test(body)) {
    body += verified;
  }

  const titleFallback =
    topic.locale === "fr"
      ? `${topic.primaryKeyword} — Map-6`.slice(0, 58)
      : `${topic.primaryKeyword} — Map-6`.slice(0, 58);

  return {
    slug: topic.slug,
    locale: topic.locale,
    title: clampTitle(parsed.title || h1, titleFallback),
    description: clampDescription(
      parsed.metaDescription || "",
      `${topic.primaryKeyword}. Rockstar facts only, labeled Confirmed / Reported / Not announced on Map-6.`,
    ),
    bodyMarkdown: body,
    cluster: clusterFor(topic),
    primaryKeyword: topic.primaryKeyword,
    secondaryKeywords: topic.variants,
    sources: excerpts
      .filter((e) => e.ok)
      .map((e) => ({ url: e.url, title: e.title })),
    status: "drafted",
    author: "Map-6 Editorial",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-map-guide"],
    notes: `Gated desk draft from ${topic.slug}`,
    eventKey: `desk-${topic.slug}-${topic.locale}`,
    heroImage: "/og-default.png",
    faqs: (parsed.faq ?? []).slice(0, 3),
    pageType: topic.pageType,
    claims: parsed.claims ?? [],
    factIds: topic.factIds,
    refreshOf: topic.refreshOf,
    lastVerifiedAt: date,
    failCount: 0,
  };
}

export async function generateGatedArticle(
  topic: DeskTopic,
): Promise<GenerateGatedResult> {
  const date = new Date().toISOString().slice(0, 10);
  const allFacts = await loadFacts();
  const facts = factsForTopic(allFacts, topic.factIds);
  const excerpts = await fetchExcerpts(topic.sources);
  const system = await systemPrompt();
  const user = buildUserPayload(topic, facts, excerpts, date);
  const raw = await callModel(system, user);
  const parsed = parseDraft(raw);
  if (!parsed) throw new Error("gated model did not return valid JSON");

  const draft = toArticle(topic, parsed, excerpts, date);
  const existing = await listArticles();
  const prior = existing.find(
    (a) => a.slug === topic.slug && a.locale === topic.locale,
  );
  const validation = await validateArticle({
    article: draft,
    facts: allFacts,
    existing,
    excerpts: excerpts.map((e) => e.text),
  });

  const article = await upsertArticle({
    ...draft,
    id: prior?.id,
    failCount: validation.pass ? 0 : (prior?.failCount ?? 0) + 1,
    notes: validation.pass
      ? draft.notes
      : `${draft.notes} | gate: ${validation.reasons.join("; ")}`,
  });

  return { article, validation, excerpts };
}
