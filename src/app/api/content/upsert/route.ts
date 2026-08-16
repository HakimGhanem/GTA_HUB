import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import type { Article, Topic } from "@/lib/content/schema";
import { upsertArticle, upsertTopic } from "@/lib/content/repository";

/**
 * POST { article?: Article, topic?: Topic }
 * Writes to Firestore using Cloud Run service account.
 * Authorization: Bearer CONTENT_API_SECRET
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  const body = (await request.json()) as {
    article?: Article;
    topic?: Topic;
  };

  if (!body.article && !body.topic) {
    return NextResponse.json(
      { error: "article or topic required" },
      { status: 400 },
    );
  }

  const result: { article?: Article; topic?: Topic } = {};

  if (body.topic) {
    result.topic = await upsertTopic(body.topic);
  }
  if (body.article) {
    const { id, createdAt, updatedAt, seoScore, ...rest } = body.article;
    result.article = await upsertArticle({
      ...rest,
      id,
    });
  }

  return NextResponse.json({ ok: true, ...result });
}
