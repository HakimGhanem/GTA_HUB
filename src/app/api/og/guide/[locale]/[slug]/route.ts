import { articleOgCard } from "@/components/og/ArticleOgCard";
import { getGuideBySlug } from "@/data/guides";
import { getLocalizedGuide } from "@/data/guides-i18n";
import { EDITORIAL_FOCUS, cropAround } from "@/lib/og/basemap";
import { formatOgDate, humanize, isSupportedLocale } from "@/lib/og/format";
import { ogImageResponse } from "@/lib/og/response";

export const revalidate = 86400;

type Context = { params: Promise<{ locale: string; slug: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) {
    return new Response("Unknown locale", { status: 404 });
  }

  const guide = getGuideBySlug(slug);
  const localized = getLocalizedGuide(slug, locale);
  if (!guide || !localized) {
    return new Response("Unknown guide", { status: 404 });
  }

  return ogImageResponse((basemap) =>
    articleOgCard({
      kicker: humanize(guide.category),
      title: localized.title,
      meta: [
        ...formatOgDate(guide.publishedAt, locale),
        `${localized.readTime} min`,
      ],
      view: cropAround(
        EDITORIAL_FOCUS.x,
        EDITORIAL_FOCUS.y,
        EDITORIAL_FOCUS.viewWidth,
      ),
      basemap,
    }),
  );
}
