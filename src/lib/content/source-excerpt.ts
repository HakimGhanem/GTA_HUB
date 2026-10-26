const UA = "Map-6 desk/1.0 (+https://map-6.com)";
const MAX_CHARS = 8000;

export type SourceExcerpt = {
  url: string;
  title: string;
  text: string;
  ok: boolean;
  status: number;
};

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "\u0027")
    .replace(/&quot;/g, "\u0022")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchExcerpt(
  url: string,
  title = "",
): Promise<SourceExcerpt> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,text/plain" },
      redirect: "follow",
    });
    const raw = await res.text();
    const text = stripHtml(raw).slice(0, MAX_CHARS);
    return { url, title: title || url, text, ok: res.ok, status: res.status };
  } catch (err) {
    return {
      url,
      title: title || url,
      text: err instanceof Error ? err.message : String(err),
      ok: false,
      status: 0,
    };
  }
}

export async function fetchExcerpts(
  sources: { url: string; title?: string }[],
): Promise<SourceExcerpt[]> {
  return Promise.all(sources.map((s) => fetchExcerpt(s.url, s.title)));
}
