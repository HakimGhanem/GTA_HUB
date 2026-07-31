import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

/**
 * Ping search engines when content changes.
 * POST { "urls": ["/locations/vice-city", ...] }
 * Requires INDEXNOW_KEY env + public/INDEXNOW_KEY.txt file.
 */
export async function POST(request: Request) {
  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 503 });
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
