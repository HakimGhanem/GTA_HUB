import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";
import { SITE } from "@/lib/constants";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

/**
 * Ping search engines when content changes.
 * POST { "urls": ["/en/news/slug", ...] }
 * Requires INDEXNOW_KEY + Authorization Bearer CONTENT_API_SECRET
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  if (!INDEXNOW_KEY) {
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

  const urlList = paths.map((p) =>
    p.startsWith("http") ? p : `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`,
  );

  const payload = {
    host: new URL(SITE.url).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    ),
  );

  return NextResponse.json({
    submitted: urlList.length,
    results: results.map((r, i) => ({
      endpoint: INDEXNOW_ENDPOINTS[i],
      ok: r.status === "fulfilled" && r.value.ok,
    })),
  });
}
