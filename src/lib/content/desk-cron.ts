import { SITE } from "@/lib/constants";
import { loadDeskTopics, openDeskTopics, type DeskTopic } from "./desk-queue";
import {
  appendDeskLog,
  ensureWeekly,
  loadRefreshQueue,
  saveRefreshQueue,
  saveWeekly,
  todayStamp,
} from "./desk-store";
import { generateGatedArticle } from "./generate-gated";
import { publishArticleLocal } from "./publish";
import { listArticles } from "./repository";
import { articlePath } from "./schema";
import { refreshOne, type RefreshRow } from "./refresh-article";
import { emailDeskReview } from "./review-mail";
import { runWatchers, type WatcherHit } from "./watchers";

function envFlag(name: string, fallback = false): boolean {
  const v = process.env[name];
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return fallback;
}

function envInt(name: string, fallback: number): number {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function autoPublishTypes(): Set<string> {
  const raw = process.env.AUTO_PUBLISH_TYPES || "news";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

export type DeskPassResult = {
  watchers: WatcherHit[];
  drafted: { slug: string; locale: string; pass: boolean }[];
  published: string[];
  skipped: string[];
  refreshed: RefreshRow[];
  reviewUrls: string[];
};

async function hasPublished(slug: string, locale: string): Promise<boolean> {
  const articles = await listArticles({ status: "published", locale });
  return articles.some((a) => a.slug === slug);
}

export async function runDeskPass(now = new Date()): Promise<DeskPassResult> {
  const weekly = await ensureWeekly(now);
  const maxNew = envInt("MAX_NEW_PER_WEEK", 3);
  const maxRefresh = envInt("MAX_REFRESH_PER_WEEK", 5);
  const autoPublish = envFlag("AUTO_PUBLISH", false);
  const types = autoPublishTypes();
  const today = todayStamp(now);
  const publishedToday = weekly.lastPublishDate === today;

  const result: DeskPassResult = {
    watchers: [],
    drafted: [],
    published: [],
    skipped: [],
    refreshed: [],
    reviewUrls: [],
  };

  result.watchers = await runWatchers();

  const topics = openDeskTopics(await loadDeskTopics(), now).filter(
    (t) => !t.refreshOf,
  );
  const newSlots = Math.max(0, maxNew - weekly.newCount);
  const toDraft: DeskTopic[] = [];
  for (const topic of topics) {
    if (toDraft.length >= newSlots) break;
    if (await hasPublished(topic.slug, topic.locale)) continue;
    toDraft.push(topic);
  }

  for (const topic of toDraft) {
    try {
      const { article, validation } = await generateGatedArticle(topic);
      weekly.newCount += 1;
      result.drafted.push({
        slug: article.slug,
        locale: article.locale,
        pass: validation.pass,
      });
      const mail = await emailDeskReview({
        article,
        validation,
        event: validation.pass ? "draft ready" : "draft failed gate",
      });
      result.reviewUrls.push(mail.url);

      const canPublish =
        autoPublish &&
        validation.pass &&
        article.pageType &&
        types.has(article.pageType) &&
        !publishedToday &&
        result.published.length === 0;

      if (canPublish) {
        const live = await publishArticleLocal(article.id, "desk-cron");
        result.published.push(articlePath(live));
        weekly.lastPublishDate = today;
      } else if (autoPublish && !validation.pass) {
        result.skipped.push(`${article.slug}: validator`);
      }
    } catch (err) {
      result.skipped.push(
        `${topic.slug}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  const refreshSlots = Math.max(0, maxRefresh - weekly.refreshCount);
  const queue = await loadRefreshQueue();
  const remaining: typeof queue = [];
  const existing = await listArticles();

  for (const task of queue) {
    if (result.refreshed.length >= refreshSlots) {
      remaining.push(task);
      continue;
    }
    const target = existing.find(
      (a) => a.slug === task.refreshOf && a.locale === task.locale,
    );
    if (!target) {
      // Gated topic with refreshOf (e.g. PC rumors → existing PC article)
      const published = existing.find(
        (a) => a.slug === task.refreshOf && a.status === "published",
      );
      if (!published) {
        remaining.push(task);
        continue;
      }
      const row = await refreshOne(published);
      result.refreshed.push(row);
      weekly.refreshCount += 1;
      continue;
    }
    const row = await refreshOne(target);
    result.refreshed.push(row);
    weekly.refreshCount += 1;
  }
  await saveRefreshQueue(remaining);

  // Desk topics marked refreshOf (PC rumors) — treat as refresh, not new URL
  if (result.refreshed.length < refreshSlots) {
    const refreshTopics = openDeskTopics(await loadDeskTopics(), now).filter(
      (t) => t.refreshOf,
    );
    for (const topic of refreshTopics) {
      if (result.refreshed.length >= refreshSlots) break;
      const published = existing.find(
        (a) => a.slug === topic.refreshOf && a.status === "published",
      );
      if (!published) continue;
      if (result.refreshed.some((r) => r.slug.startsWith(published.slug))) {
        continue;
      }
      const row = await refreshOne(published);
      result.refreshed.push(row);
      weekly.refreshCount += 1;
    }
  }

  await saveWeekly(weekly);
  await appendDeskLog({
    at: now.toISOString(),
    event: "desk-pass",
    site: SITE.url,
    newCount: weekly.newCount,
    refreshCount: weekly.refreshCount,
    drafted: result.drafted.length,
    published: result.published,
    skipped: result.skipped,
    watchersChanged: result.watchers.filter((w) => w.changed).length,
  });

  return result;
}
