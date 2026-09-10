import { AdUnit } from "@/components/ads/AdUnit";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import { RelatedMapLinks } from "@/components/seo/RelatedMapLinks";
import { getGuideBySlug, GUIDES } from "@/data/guides";
import {
  getLocalizedGuide,
  guideHreflangLocales,
  hasGuideTranslation,
} from "@/data/guides-i18n";
import { affiliateIntentsForGuide } from "@/lib/affiliate/guide-intents";
import { AD_SLOTS } from "@/lib/ads-config";
import { ComparisonTable } from "@/components/guides/ComparisonTable";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, jsonLdGuidePage } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

const DEDICATED_GUIDE_SLUGS = new Set([
  "gta-6-preorder-guide",
  "gta-6-map-cities-skylines-2",
  "gta-6-best-price",
]);

export function generateStaticParams() {
  return GUIDES.filter((g) => !DEDICATED_GUIDE_SLUGS.has(g.slug)).map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const localized = getLocalizedGuide(slug, locale);
  if (!localized) return {};

  const translated = hasGuideTranslation(slug, locale);

  return buildMetadata({
    locale,
    title: `${localized.title} | Map-6`,
    description: localized.description,
    path: `/guides/${slug}`,
    image: `/api/og/guide/${translated ? locale : "en"}/${slug}`,
    canonicalLocale: translated ? locale : "en",
    hreflangLocales: guideHreflangLocales(slug),
    markdownAlternate: true,
    robots: translated
      ? { index: true, follow: true }
      : { index: false, follow: true },
  });
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(slug);
  const localized = getLocalizedGuide(slug, locale);
  if (!guide || !localized) notFound();

  const t = await getTranslations("guides");
  const tNav = await getTranslations("nav");

  const structuredData = jsonLdGuidePage(
    {
      ...guide,
      title: localized.title,
      description: localized.description,
      content: localized.content,
      readTime: localized.readTime,
      answer: localized.answer,
    },
    {
      locale,
      breadcrumb: [
        { name: tNav("guides"), path: "/guides" },
        { name: localized.title, path: `/guides/${slug}` },
      ],
      faq: localized.faq,
    },
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          {t("backToAll")}
        </Link>

        <h1 className="text-3xl font-bold leading-tight">{localized.title}</h1>
        <p className="mt-4 text-white/60">{localized.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {localized.readTime} min · {guide.publishedAt}
        </p>

        {localized.answer ? (
          <AnswerBox label={t("shortAnswer")}>{localized.answer}</AnswerBox>
        ) : null}

        <article className="prose prose-invert mt-8 max-w-none">
          {localized.content.map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-white/80">
              {paragraph}
            </p>
          ))}
          {localized.comparison ? (
            <ComparisonTable
              caption={localized.comparison.caption}
              headers={localized.comparison.headers}
              rows={localized.comparison.rows}
            />
          ) : null}
        </article>

        {localized.faq?.length ? (
          <section className="mt-10" aria-labelledby="guide-faq">
            <h2 id="guide-faq" className="mb-4 text-xl font-bold">
              FAQ
            </h2>
            <dl className="space-y-4">
              {localized.faq.map(({ question, answer }) => (
                <div
                  key={question}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <dt className="font-semibold text-white">{question}</dt>
                  <dd className="mt-2 text-sm text-white/60">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

        {affiliateIntentsForGuide(slug) && (
          <div className="mt-10">
            <AffiliateProductGrid
              intents={affiliateIntentsForGuide(slug)!}
              liveOnly
              title={t("gearTitle")}
            />
          </div>
        )}

        <div className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 p-6">
          <p className="font-semibold text-pink-200">{t("ctaTitle")}</p>
          <p className="mt-1 text-sm text-white/60">{t("ctaBody")}</p>
          <Link
            href={
              slug === "gta-6-map-clip-kit" || slug === "gta-6-collectibles-map"
                ? "/map?theme=streamer"
                : "/map"
            }
            className="mt-4 inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400"
          >
            {t("ctaButton")}
          </Link>
          {slug === "gta-6-map-clip-kit" && (
            <Link
              href="/overlay?theme=streamer"
              className="mt-3 ml-3 inline-block text-sm font-medium text-pink-300 underline hover:text-pink-200"
            >
              {t("openOverlay")}
            </Link>
          )}
        </div>

        <RelatedMapLinks locale={locale} currentGuideSlug={slug} />
      </main>
    </>
  );
}
