import { NextResponse } from "next/server";
import { reviewToken } from "@/lib/content/desk-store";
import { getArticleById } from "@/lib/content/repository";
import { articlePath } from "@/lib/content/schema";

/**
 * Signed draft preview for review emails.
 * GET /api/content/review?id=&token=
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const token = url.searchParams.get("token") ?? "";
  if (!id || !token || token !== reviewToken(id)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const article = await getArticleById(id);
  if (!article) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: article.id,
    path: articlePath(article),
    status: article.status,
    locale: article.locale,
    slug: article.slug,
    title: article.title,
    description: article.description,
    pageType: article.pageType,
    primaryKeyword: article.primaryKeyword,
    claims: article.claims,
    factIds: article.factIds,
    sources: article.sources,
    faqs: article.faqs,
    failCount: article.failCount,
    lastVerifiedAt: article.lastVerifiedAt,
    notes: article.notes,
    bodyMarkdown: article.bodyMarkdown,
  });
}
