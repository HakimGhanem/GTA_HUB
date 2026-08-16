import { AmazonAffiliateLink } from "@/components/affiliate/AmazonAffiliateLink";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import { AmazonProductCard } from "@/components/affiliate/AmazonProductCard";
import { AdUnit } from "@/components/ads/AdUnit";
import { getPreorderGuideCopy } from "@/data/preorder-guide-i18n";
import { PREORDER_PRODUCTS } from "@/data/preorder-products";
import { AD_SLOTS } from "@/lib/ads-config";
import { GTA6_RELEASE } from "@/lib/constants";

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

  const gameProducts = PREORDER_PRODUCTS.filter(
    (p) =>
      (p.edition === "standard" || p.edition === "collectors") &&
      (showPlaceholders || p.asin.length > 0),
  );
  const hardwareProducts = PREORDER_PRODUCTS.filter(
    (p) =>
      (p.edition === "hardware" || p.edition === "accessory") &&
      (showPlaceholders || p.asin.length > 0),
  );

  const ps5Standard = PREORDER_PRODUCTS.find((p) => p.envKey === "GTA6_PS5");
  const xboxStandard = PREORDER_PRODUCTS.find((p) => p.envKey === "GTA6_XBOX");

  const withDate = (text: string) => text.replaceAll("{date}", launchDate);

  return (
    <article className="prose prose-invert mt-8 max-w-none">
      <p className="text-lg leading-relaxed text-white/80">
        {withDate(copy.intro)}
      </p>

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.whereTitle}</h2>
      <p className="leading-relaxed text-white/80">{copy.whereBody}</p>

      <h2 className="mt-10 text-2xl font-bold text-white">
        {copy.editionsTitle}
      </h2>
      <p className="leading-relaxed text-white/80">{copy.editionsBody}</p>

      {gameProducts.length > 0 ? (
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          {gameProducts.map((product) => (
            <AmazonProductCard key={product.envKey} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
          {copy.editionsPending}
        </p>
      )}

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />

      <h2 className="mt-10 text-2xl font-bold text-white">
        {copy.platformTitle}
      </h2>
      <p className="leading-relaxed text-white/80">
        {copy.platformBeforePs5}
        {ps5Standard?.asin ? (
          <AmazonAffiliateLink
            asin={ps5Standard.asin}
            className="text-pink-400 underline hover:text-pink-300"
          >
            {copy.platformPs5}
          </AmazonAffiliateLink>
        ) : (
          copy.platformPs5
        )}
        {copy.platformBetween}
        {xboxStandard?.asin ? (
          <AmazonAffiliateLink
            asin={xboxStandard.asin}
            className="text-pink-400 underline hover:text-pink-300"
          >
            {copy.platformXbox}
          </AmazonAffiliateLink>
        ) : (
          copy.platformXbox
        )}
        {copy.platformAfter}
      </p>

      <h2 className="mt-10 text-2xl font-bold text-white">
        {copy.hardwareTitle}
      </h2>
      <p className="leading-relaxed text-white/80">{copy.hardwareBody}</p>

      {hardwareProducts.length > 0 && (
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          {hardwareProducts.map((product) => (
            <AmazonProductCard key={product.envKey} product={product} />
          ))}
        </div>
      )}

      <div className="not-prose my-8">
        <AffiliateProductGrid
          intents={["headset", "storage_ssd", "display_120hz", "streaming_setup"]}
          title="Launch setup upgrades"
        />
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">{copy.tipsTitle}</h2>
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
    </article>
  );
}
