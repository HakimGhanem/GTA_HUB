import { SITE } from "@/lib/constants";
import { articlePath, type Article } from "./schema";
import { updateArticleStatus } from "./repository";

export type PublishResult = {
  article: Article;
  path: string;
  revalidated: boolean;
  indexNow: unknown;
};

/**
 * Mark article published and notify the running Next app to revalidate + IndexNow.
 * Call from CLI with SITE_INTERNAL_URL (default SITE.url).
 */
export async function publishArticleRemote(
  articleId: string,
  reviewer: string,
): Promise<PublishResult> {
  const secret = process.env.CONTENT_API_SECRET;
  if (!secret) {
    throw new Error("CONTENT_API_SECRET is required to publish");
  }

  const base =
    process.env.SITE_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    SITE.url;

  const res = await fetch(`${base.replace(/\/$/, "")}/api/content/publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ articleId, reviewer }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Publish API failed (${res.status}): ${text}`);
  }

  return (await res.json()) as PublishResult;
}

/** Local publish without HTTP (file store / same process) — used by API route */
export async function publishArticleLocal(
  articleId: string,
  reviewer: string,
): Promise<Article> {
  return updateArticleStatus(articleId, "published", {
    reviewer,
    publishedAt: new Date().toISOString(),
  });
}

export function articlePublicUrl(article: Article): string {
  return `${SITE.url}${articlePath(article)}`;
}
