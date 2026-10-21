import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import { indexNowKey, submitIndexNow } from "@/lib/seo/indexnow";

/**
 * Ping search engines when content changes.
 * POST { "urls": ["/en/news/slug", ...] }
 * Requires INDEXNOW_KEY + Authorization Bearer CONTENT_API_SECRET
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  if (!indexNowKey()) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY not configured" },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { urls?: string[] };
  const paths = body.urls ?? [];
  if (paths.length === 0) {
    return NextResponse.json({ error: "urls required" }, { status: 400 });
  }

  const result = await submitIndexNow(paths);
  return NextResponse.json(result);
}
