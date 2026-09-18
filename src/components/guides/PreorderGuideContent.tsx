import { ComparisonTable } from "@/components/guides/ComparisonTable";
import { PreorderFunnel } from "@/components/guides/PreorderFunnel";
import { RetailerPriceComparator } from "@/components/guides/RetailerPriceComparator";
import { getBestPriceCopy } from "@/data/best-price-i18n";
import { Link } from "@/i18n/navigation";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import { AmazonProductCard } from "@/components/affiliate/AmazonProductCard";
import { AdUnit } from "@/components/ads/AdUnit";
import { getPreorderGuideCopy } from "@/data/preorder-guide-i18n";
import { PREORDER_PRODUCTS } from "@/data/preorder-products";
import { AD_SLOTS } from "@/lib/ads-config";
import { GTA6_RELEASE } from "@/lib/constants";
import { productHasOffers } from "@/lib/affiliate/store-links";

type Props = {
  locale: string;
};

export function PreorderGuideContent({ locale }: Props) {
  const copy = getPreorderGuideCopy(locale);
  const launchDate = GTA6_RELEASE.toLocaleDateString(
    locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const showPlaceholders = process.env.NODE_ENV !== "production";

  const card = (envKey: string) => {
    const product = PREORDER_PRODUCTS.find((p) => p.envKey === envKey);
    if (!product) return null;
    if (
      !showPlaceholders &&
      product.asin.length === 0 &&
      !productHasOffers(product, locale)
    ) {
      return null;
    }
    return (
      <AmazonProductCard
        product={product}
        showPlaceholders={showPlaceholders}
        locale={locale}
      />
    );
  };

  const hardwareProducts = PREORDER_PRODUCTS.filter(
    (p) =>
      (p.edition === "hardware" || p.edition === "accessory") &&
      (showPlaceholders || p.asin.length > 0 || productHasOffers(p, locale)),
  );

  const withDate = (text: string) => text.replaceAll("{date}", launchDate);
  const showFrRetailers = locale === "fr";

  const ps5Standard = card("GTA6_PS5");
  const xboxStandard = card("GTA6_XBOX");
  const ps5Ultimate = card("GTA6_ULTIMATE_PS5");
  const xboxUltimate = card("GTA6_ULTIMATE_XBOX");

  return (
    <article className="prose prose-invert mt-8 max-w-none">
      <p className="text-lg leading-relaxed text-white/80">
        {withDate(copy.introLead)}
      </p>

      <PreorderFunnel
        copy={copy.path}
        games={
          <section className="not-prose">
            <h2 className="mt-10 text-2xl font-bold text-white">
              {copy.standardTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {copy.standardLead}
            </p>
            <div className="my-6 grid gap-4 sm:grid-cols-2">
              {ps5Standard ? (
                <div data-preorder-platform="ps5">{ps5Standard}</div>
              ) : null}
              {xboxStandard ? (
                <div data-preorder-platform="xbox">{xboxStandard}</div>
              ) : null}
            </div>
            <h3 className="mt-8 text-xl font-semibold text-white">
              {copy.ultimateTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {copy.ultimateLead}
            </p>
            <div className="my-6 grid gap-4 sm:grid-cols-2">
              {ps5Ultimate ? (
                <div data-preorder-platform="ps5">{ps5Ultimate}</div>
              ) : null}
              {xboxUltimate ? (
                <div data-preorder-platform="xbox">{xboxUltimate}</div>
              ) : null}
            </div>
          </section>
        }
        hardware={
          <section>
            <h2 className="mt-10 text-2xl font-bold text-white">
              {copy.hardwareTitle}
            </h2>
            <p className="leading-relaxed text-white/80">{copy.hardwareBody}</p>
            {hardwareProducts.length > 0 ? (
              <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
                {hardwareProducts.map((product) => (
                  <AmazonProductCard
                    key={product.envKey}
                    product={product}
                    showPlaceholders={showPlaceholders}
                    locale={locale}
                  />
                ))}
              </div>
            ) : null}
            <div className="not-prose my-8">
              <AffiliateProductGrid
                intents={[
                  "headset",
                  "storage_ssd",
                  "display_120hz",
                  "streaming_setup",
                ]}
                liveOnly
                title={copy.setupUpgradesTitle}
                locale={locale}
              />
            </div>
          </section>
        }
        shared={
          <>
            <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
              {copy.stockNote}
            </p>

            <h2 className="mt-10 text-2xl font-bold text-white">
              {copy.editionsTitle}
            </h2>
            <p className="leading-relaxed text-white/80">{copy.editionsBody}</p>
            <ComparisonTable
              caption={copy.comparison.caption}
              headers={copy.comparison.headers}
              rows={copy.comparison.rows}
            />

            <h2 className="mt-10 text-2xl font-bold text-white">
              {copy.retailersTitle}
            </h2>
            <p className="leading-relaxed text-white/80">{copy.retailersBody}</p>
            {showFrRetailers ? (
              <RetailerPriceComparator
                locale={locale}
                copy={getBestPriceCopy(locale)}
                compact
              />
            ) : null}
            <p className="not-prose">
              <Link
                href="/guides/gta-6-best-price"
                className="text-sm font-medium text-pink-400 underline hover:text-pink-300"
              >
                {copy.retailersLinkLabel}
              </Link>
            </p>

            <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

            <h2 className="mt-10 text-2xl font-bold text-white">
              {copy.tipsTitle}
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-white/80">
              {copy.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ol>

            <h2 className="mt-10 text-2xl font-bold text-white">{copy.faqTitle}</h2>
            <dl className="space-y-4">
              {copy.faq.map(({ question, answer }) => (
                <div
                  key={question}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <dt className="font-semibold text-white">{question}</dt>
                  <dd className="mt-2 text-sm text-white/60">{withDate(answer)}</dd>
                </div>
              ))}
            </dl>
          </>
        }
      />
    </article>
  );
}
