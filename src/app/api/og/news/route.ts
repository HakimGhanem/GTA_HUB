import { articleOgCard } from "@/components/og/ArticleOgCard";
import { EDITORIAL_FOCUS, cropAround } from "@/lib/og/basemap";
import { humanize } from "@/lib/og/format";
import { ogImageResponse } from "@/lib/og/response";

export const revalidate = 3600;

/** Fallback 1200×630 card when an article has no slug-specific hero yet. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "GTA 6 News").slice(0, 110);
  const cluster = searchParams.get("cluster") || "preorder";

  const view = cropAround(
    EDITORIAL_FOCUS.x,
    EDITORIAL_FOCUS.y,
    EDITORIAL_FOCUS.viewWidth,
  );

  return ogImageResponse((basemap) =>
    articleOgCard({
      kicker: humanize(cluster),
      title,
      meta: [],
      view,
      basemap,
      cluster,
    }),
  );
}