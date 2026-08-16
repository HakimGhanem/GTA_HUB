import { randomUUID } from "crypto";
import type { Article, ArticleStatus, KeywordMetric, Topic } from "./schema";
import { COLLECTIONS, getFirestore } from "./firestore";
import { fileStore } from "./file-store";
import { scoreArticleSeo } from "./seo-score";

function nowIso() {
  return new Date().toISOString();
}

/** Firestore rejects `undefined` field values — strip before write. */
function omitUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

async function loadAllArticlesMerged(): Promise<Article[]> {
  const byId = new Map<string, Article>();

  // File store first (baked into Docker image for AdSense-ready content)
  for (const a of await fileStore.listArticles()) {
    byId.set(a.id, a);
  }

  const fs = await getFirestore();
  if (fs) {
    try {
      const snap = await fs.collection(COLLECTIONS.articles).get();
      for (const d of snap.docs) {
        const incoming = { id: d.id, ...d.data() } as Article;
        const existing = byId.get(d.id);
        // Never let a Firestore draft hide a baked published article
        if (
          existing?.status === "published" &&
          incoming.status !== "published"
        ) {
          continue;
        }
        byId.set(d.id, incoming);
      }
    } catch (err) {
      console.warn("[content] Firestore list failed, using file store:", err);
    }
  }

  return [...byId.values()];
}

export async function listArticles(opts?: {
  status?: ArticleStatus | ArticleStatus[];
  locale?: string;
}): Promise<Article[]> {
  let articles = await loadAllArticlesMerged();

  if (opts?.status) {
    const allowed = Array.isArray(opts.status) ? opts.status : [opts.status];
    articles = articles.filter((a) => allowed.includes(a.status));
  }
  if (opts?.locale) {
    articles = articles.filter((a) => a.locale === opts.locale);
  }

  return articles.sort((a, b) => {
    const da = a.publishedAt || a.updatedAt;
    const db_ = b.publishedAt || b.updatedAt;
    return db_.localeCompare(da);
  });
}

export async function listPublishedArticles(locale = "en"): Promise<Article[]> {
  const local = await listArticles({ status: "published", locale });
  if (locale === "en") return local;

  // Prefer locale articles; fill gaps with EN so FR/ES indexes stay complete
  const en = await listArticles({ status: "published", locale: "en" });
  if (local.length === 0) return en;

  const bySlug = new Map<string, Article>();
  for (const a of en) bySlug.set(a.slug, a);
  for (const a of local) bySlug.set(a.slug, a); // locale wins
  return [...bySlug.values()].sort((a, b) => {
    const da = a.publishedAt || a.updatedAt;
    const db_ = b.publishedAt || b.updatedAt;
    return db_.localeCompare(da);
  });
}

export async function getArticleBySlug(
  slug: string,
  locale = "en",
): Promise<Article | null> {
  const all = await listArticles({ locale });
  const hit = all.find((a) => a.slug === slug);
  if (hit) return hit;
  if (locale === "en") return null;
  const en = await listArticles({ locale: "en" });
  return en.find((a) => a.slug === slug) ?? null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const all = await loadAllArticlesMerged();
  return all.find((a) => a.id === id) ?? null;
}

export async function upsertArticle(
  input: Omit<Article, "id" | "createdAt" | "updatedAt" | "seoScore"> & {
    id?: string;
  },
): Promise<Article> {
  const checklist = scoreArticleSeo({
    ...input,
    id: input.id ?? "tmp",
    createdAt: nowIso(),
    updatedAt: nowIso(),
  } as Article);

  const id = input.id ?? randomUUID();
  const existing = await getArticleById(id);
  const article: Article = {
    ...input,
    id,
    createdAt: existing?.createdAt ?? nowIso(),
    updatedAt: nowIso(),
    seoScore: checklist.score,
    author: input.author || "Map-6 Editorial",
    secondaryKeywords: input.secondaryKeywords ?? [],
    sources: input.sources ?? [],
    relatedLocationSlugs: input.relatedLocationSlugs ?? [],
    relatedGuideSlugs: input.relatedGuideSlugs ?? [],
  };

  const fs = await getFirestore();
  if (fs) {
    const { id: _id, ...data } = article;
    await fs
      .collection(COLLECTIONS.articles)
      .doc(id)
      .set(omitUndefined(data as Record<string, unknown>), { merge: true });
    return article;
  }

  const all = await fileStore.listArticles();
  const idx = all.findIndex((a) => a.id === id);
  if (idx >= 0) all[idx] = article;
  else all.push(article);
  await fileStore.saveArticles(all);
  return article;
}

export async function updateArticleStatus(
  id: string,
  status: ArticleStatus,
  extra?: Partial<Pick<Article, "reviewer" | "publishedAt" | "notes">>,
): Promise<Article> {
  const current = await getArticleById(id);
  if (!current) throw new Error(`Article not found: ${id}`);

  const next: Article = {
    ...current,
    status,
    updatedAt: nowIso(),
    ...extra,
    publishedAt:
      status === "published"
        ? extra?.publishedAt || current.publishedAt || nowIso()
        : current.publishedAt,
  };

  return upsertArticle(next);
}

export async function listTopics(): Promise<Topic[]> {
  const fs = await getFirestore();
  if (fs) {
    const snap = await fs.collection(COLLECTIONS.topics).get();
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Topic)
      .sort((a, b) => b.score - a.score);
  }
  return (await fileStore.listTopics()).sort((a, b) => b.score - a.score);
}

export async function getTopicByEventKey(eventKey: string): Promise<Topic | null> {
  const topics = await listTopics();
  return topics.find((t) => t.eventKey === eventKey) ?? null;
}

export async function upsertTopic(
  input: Omit<Topic, "id" | "createdAt" | "updatedAt"> & { id?: string },
): Promise<Topic> {
  const id = input.id ?? randomUUID();
  const existing = (await listTopics()).find((t) => t.id === id);
  const topic: Topic = {
    ...input,
    id,
    createdAt: existing?.createdAt ?? nowIso(),
    updatedAt: nowIso(),
  };

  const fs = await getFirestore();
  if (fs) {
    const { id: _id, ...data } = topic;
    await fs
      .collection(COLLECTIONS.topics)
      .doc(id)
      .set(omitUndefined(data as Record<string, unknown>), { merge: true });
    return topic;
  }

  const all = await fileStore.listTopics();
  const idx = all.findIndex((t) => t.id === id || t.eventKey === topic.eventKey);
  if (idx >= 0) all[idx] = { ...all[idx], ...topic, id: all[idx].id };
  else all.push(topic);
  await fileStore.saveTopics(all);
  return topic;
}

export async function saveKeywordMetrics(metrics: KeywordMetric[]) {
  const fs = await getFirestore();
  if (fs) {
    const batch = fs.batch();
    for (const m of metrics) {
      batch.set(fs.collection(COLLECTIONS.keywordMetrics).doc(m.id), m, {
        merge: true,
      });
    }
    await batch.commit();
    return;
  }
  await fileStore.saveMetrics(metrics);
}

export async function listKeywordMetrics(): Promise<KeywordMetric[]> {
  const fs = await getFirestore();
  if (fs) {
    const snap = await fs.collection(COLLECTIONS.keywordMetrics).get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as KeywordMetric);
  }
  return fileStore.listMetrics();
}
