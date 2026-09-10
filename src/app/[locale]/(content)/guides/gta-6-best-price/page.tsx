import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { AdUnit } from "@/components/ads/AdUnit";
import { RetailerPriceComparator } from "@/components/guides/RetailerPriceComparator";
import { JsonLd } from "@/components/seo/JsonLd";
import { fillPrices, getBestPriceCopy } from "@/data/best-price-i18n";
import {
  highestPriceEur,
  lowestPriceEur,
  PRICE_CURRENCY,
  RETAILER_OFFERS,
} from "@/data/gta6-retailers";
import { RelatedMapLinks } from "@/components/seo/RelatedMapLinks";
import { getGuideBySlug } from "@/data/guides";
import {
  getLocalizedGuide,
  guideHreflangLocales,
  hasGuideTranslation,
} from "@/data/guides-i18n";
import { Link } from "@/i18n/navigation";
import { AD_SLOTS } from "@/lib/ads-config";
import { RETAILERS } from "@/lib/affiliate/retailers";
import { GTA6_RELEASE, SITE } from "@/lib/constants";
import { buildMetadata, jsonLdGuidePage } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const SLUG = "gta-6-best-price";

const RELATED_SLUGS = [
  "gta-6-preorder-guide",
  "gta-6-ultimate-edition-vs-standard",
  "gta-6-ps5-vs-xbox",
];

const AVAILABILITY_SCHEMA = {
  in_stock: "https://schema.org/PreOrder",
  restocking: "https://schema.org/LimitedAvailability",
  unlisted: "https://schema.org/OutOfStock",
} as const;

/**
 * Product + AggregateOffer for the comparison itself. Prices come from the
 * manual survey in `gta6-retailers.ts` — re-check them when you bump the date.
 */
function jsonLdPriceComparison(locale: string, copy: { title: string }) {
  const url = `${SITE.url}/${locale}/guides/${SLUG}`;
  const priced = RETAILER_OFFERS.filter((o) => o.priceEur !== null);
  const priceValidUntil = GTA6_RELEASE.toISOString().slice(0, 10);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: "Grand Theft Auto VI",
    description: copy.title,
    brand: { "@type": "Brand", name: "Rockstar Games" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: PRICE_CURRENCY,
      lowPrice: lowestPriceEur(priced),
      highPrice: highestPriceEur(priced),
      offerCount: priced.length,
      offers: priced.map((offer) => ({
        "@type": "Offer",
        name: `${RETAILERS[offer.retailer].label} — ${offer.platform} ${offer.edition}`,
        price: offer.priceEur,
        priceCurrency: PRICE_CURRENCY,
        priceValidUntil,
        availability: AVAILABILITY_SCHEMA[offer.availability],
        itemCondition: "https://schema.org/NewCondition",
        url: offer.url,
        seller: {
          "@type": "Organization",
          name: RETAILERS[offer.retailer].label,
        },
      })),
    },
  };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = getBestPriceCopy(locale);
  const translated = hasGuideTranslation(SLUG, locale);

  return buildMetadata({
    locale,
    title: `${copy.title} | Map-6`,
    description: copy.description,
    path: `/guides/${SLUG}`,
    openGraphType: "article",
    canonicalLocale: translated ? locale : "en",
    hreflangLocales: guideHreflangLocales(SLUG),
    robots: translated
      ? { index: true, follow: true }
      : { index: false, follow: true },
  });
}

export default async function BestPriceGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(SLUG);
  const copy = getBestPriceCopy(locale);
  if (!guide) return null;

  const tNav = await getTranslations("nav");

  const structuredData = jsonLdGuidePage(
    { ...guide, title: copy.title, description: copy.description },
    {
      locale,
      breadcrumb: [
        { name: tNav("guides"), path: "/guides" },
        { name: copy.title, path: `/guides/${SLUG}` },
      ],
      faq: copy.faq,
    },
  );

  const related = RELATED_SLUGS.map((slug) => ({
    slug,
    localized: getLocalizedGuide(slug, locale),
  })).filter((entry) => entry.localized);

  return (
    <>
      <JsonLd data={structuredData} />
      <JsonLd data={jsonLdPriceComparison(locale, copy)} />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-white/50 hover:text-white"
        >
          {copy.backToGuides}
        </Link>

        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-pink-400">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl font-bold leading-tight">{copy.title}</h1>
        <p className="mt-4 text-white/60">{copy.description}</p>
        <p className="mt-2 text-xs text-white/40">
          {guide.readTime} min · {guide.publishedAt}
        </p>

        <article className="prose prose-invert mt-8 max-w-none">
          <p className="text-lg leading-relaxed text-white/80">
            {fillPrices(copy.body[0], locale)}
          </p>

          <h2 className="mt-10 text-2xl font-bold text-white">
            {copy.comparatorTitle}
          </h2>
          <RetailerPriceComparator locale={locale} copy={copy} />

          <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

          {copy.body.slice(1).map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-white/80">
              {fillPrices(paragraph, locale)}
            </p>
          ))}
        </article>

        <section className="mt-10" aria-labelledby="best-price-faq">
          <h2 id="best-price-faq" className="mb-4 text-xl font-bold">
            {copy.faqTitle}
          </h2>
          <dl className="space-y-4">
            {copy.faq.map(({ question, answer }) => (
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

        {related.length > 0 && (
          <section className="mt-10" aria-labelledby="best-price-related">
            <h2 id="best-price-related" className="mb-3 text-xl font-bold">
              {copy.relatedTitle}
            </h2>
            <ul className="space-y-2">
              {related.map(({ slug, localized }) => (
                <li key={slug}>
                  <Link
                    href={`/guides/${slug}`}
                    className="text-sm text-pink-400 underline hover:text-pink-300"
                  >
                    {localized!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 rounded-xl border border-pink-400/30 bg-pink-500/10 p-6">
          <p className="font-semibold text-pink-200">{copy.ctaTitle}</p>
          <p className="mt-1 text-sm text-white/60">{copy.ctaBody}</p>
          <Link
            href="/map"
            className="mt-4 inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-400"
          >
            {copy.ctaButton}
          </Link>
        </div>

        <RelatedMapLinks locale={locale} currentGuideSlug={SLUG} />
      </main>
    </>
  );
}
