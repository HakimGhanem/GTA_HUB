import { SITE } from "@/lib/constants";

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

export function indexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key || null;
}

export function indexNowKeyLocation(key: string): string {
  return `${SITE.url}/${key}.txt`;
}

/** Ping IndexNow / Bing. Paths may be absolute or site-relative. */
export async function submitIndexNow(paths: string[]): Promise<{
  submitted: number;
  results: { endpoint: string; ok: boolean }[];
}> {
  const key = indexNowKey();
  if (!key) return { submitted: 0, results: [] };

  const urlList = [...new Set(paths)]
    .filter(Boolean)
    .map((p) =>
      p.startsWith("http") ? p : `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`,
    );
  if (urlList.length === 0) return { submitted: 0, results: [] };

  const payload = {
    host: new URL(SITE.url).host,
    key,
    keyLocation: indexNowKeyLocation(key),
    urlList,
  };

  const results = await Promise.allSettled(
    ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    ),
  );

  return {
    submitted: urlList.length,
    results: results.map((r, i) => ({
      endpoint: ENDPOINTS[i],
      ok: r.status === "fulfilled" && r.value.ok,
    })),
  };
}
