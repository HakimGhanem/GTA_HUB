import { locales } from "@/i18n/routing";
import { renderMarkdownPage } from "@/lib/ai/markdown";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ path: string[] }> };

function isLocale(segment: string): boolean {
  return (locales as readonly string[]).includes(segment);
}

/**
 * Markdown mirror of editorial pages. Reached either directly
 * (`/md/en/guides/foo`) or via the `.md` rewrite in middleware
 * (`/en/guides/foo.md`).
 */
export async function GET(_request: Request, { params }: Params) {
  const { path } = await params;
  const [first, ...rest] = path;
  const locale = first && isLocale(first) ? first : "en";
  const segments = first && isLocale(first) ? rest : path;

  const markdown = await renderMarkdownPage(locale, segments);

  if (!markdown) {
    return new Response("Not found. See https://map-6.com/llms.txt\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
