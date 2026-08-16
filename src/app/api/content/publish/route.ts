import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import { articlePath } from "@/lib/content/schema";
import { getArticleById } from "@/lib/content/repository";
import { publishArticleLocal } from "@/lib/content/publish";
import { SITE } from "@/lib/constants";

/**
 * POST { articleId, reviewer }
 * Authorization: Bearer CONTENT_API_SECRET
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  const body = (await request.json()) as {
    articleId?: string;
    reviewer?: string;
  };

  if (!body.articleId) {
    return NextResponse.json({ error: "articleId required" }, { status: 400 });
  }

  const existing = await getArticleById(body.articleId);
  if (!existing) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  if (existing.status === "archived" || existing.status === "noindex") {
    return NextResponse.json(
      { error: `Cannot publish from status ${existing.status}` },
      { status: 400 },
    );
  }

  const article = await publishArticleLocal(
    body.articleId,
    body.reviewer || "editor",
  );

  const path = articlePath(article);
  try {
    revalidateTag("news", "max");
    revalidatePath(`/${article.locale}/news`);
    revalidatePath(path);
    revalidatePath("/sitemap.xml");
    revalidatePath("/news.xml");
  } catch (err) {
    console.warn("[publish] revalidate warning:", err);
  }

  let indexNow: unknown = null;
  const secret = process.env.CONTENT_API_SECRET;
  if (process.env.INDEXNOW_KEY && secret) {
    try {
      const res = await fetch(`${SITE.url}/api/indexnow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          urls: [path, `/${article.locale}/news`],
        }),
      });
      indexNow = await res.json();
    } catch (err) {
      indexNow = { error: String(err) };
    }
  }

  return NextResponse.json({
    article,
    path,
    revalidated: true,
    indexNow,
  });
}
