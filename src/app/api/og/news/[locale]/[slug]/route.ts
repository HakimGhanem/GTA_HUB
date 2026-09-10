import { articleOgCard } from "@/components/og/ArticleOgCard";
import { getLocationBySlug } from "@/data/all-locations";
import { getArticleBySlug } from "@/lib/content/repository";
import { EDITORIAL_FOCUS, cropAround } from "@/lib/og/basemap";
import { formatOgDate, humanize, isSupportedLocale } from "@/lib/og/format";
import { ogImageResponse } from "@/lib/og/response";

export const revalidate = 3600;

type Context = { params: Promise<{ locale: string; slug: string }> };

/** Editorial crops sit wider than a location card: the subject is the story. */
const STORY_VIEW_WIDTH = 9000;

export async function GET(_request: Request, { params }: Context) {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) {
    return new Response("Unknown locale", { status: 404 });
  }

  const article = await getArticleBySlug(slug, locale);
  if (!article || article.status !== "published") {
    return new Response("Unknown article", { status: 404 });
  }

  const focus = article.relatedLocationSlugs
    .map((related) => getLocationBySlug(related))
    .find(Boolean);

  const view = focus
    ? cropAround(focus.x, focus.y, STORY_VIEW_WIDTH)
    : cropAround(EDITORIAL_FOCUS.x, EDITORIAL_FOCUS.y, EDITORIAL_FOCUS.viewWidth);

  return ogImageResponse((basemap) =>
    articleOgCard({
      kicker: humanize(article.cluster),
      title: article.title,
      meta: formatOgDate(article.publishedAt, locale),
      view,
      basemap,
    }),
  );
}
