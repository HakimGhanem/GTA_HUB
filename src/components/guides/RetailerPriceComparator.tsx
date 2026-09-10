import type { BestPriceCopy } from "@/data/best-price-i18n";
import {
  formatEur,
  lowestPriceEur,
  offerHref,
  offerKey,
  offerLabel,
  offersForPlatform,
  PRICE_SURVEY_DATE,
  savingsVsMsrp,
  type OfferPlatform,
  type RetailerOffer,
} from "@/data/gta6-retailers";
import { RETAILERS, relForRetailer } from "@/lib/affiliate/retailers";

type Props = {
  locale: string;
  copy: BestPriceCopy;
  platforms?: OfferPlatform[];
  /** Hide the intro paragraph when embedded inside another guide */
  compact?: boolean;
};

function OfferCard({
  offer,
  copy,
  locale,
  isBestPrice,
}: {
  offer: RetailerOffer;
  copy: BestPriceCopy;
  locale: string;
  isBestPrice: boolean;
}) {
  const retailer = RETAILERS[offer.retailer];
  const isOfficial = retailer.kind === "official";
  const savings = savingsVsMsrp(offer.priceEur);

  return (
    <li
      className={
        isBestPrice
          ? "flex flex-col rounded-xl border border-pink-400/40 bg-pink-500/[0.07] p-4"
          : "flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{retailer.label}</p>
          <p className="mt-0.5 text-xs text-white/50">
            {copy.editionLabels[offer.edition]} ·{" "}
            {copy.formatLabels[offer.format]}
          </p>
        </div>
        {isBestPrice ? (
          <span className="shrink-0 rounded-full bg-pink-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {copy.bestPriceBadge}
          </span>
        ) : isOfficial ? (
          <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white/50">
            {copy.officialBadge}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">
          {offer.priceEur === null
            ? copy.noPriceLabel
            : `${formatEur(offer.priceEur, locale)} €`}
        </span>
        {savings > 0 ? (
          <span className="text-xs font-medium text-emerald-300">
            {copy.savingsLabel.replace("{amount}", String(savings))}
          </span>
        ) : null}
      </div>

      <dl className="mt-3 space-y-1.5 text-xs">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-white/40">
            {copy.fieldLabels.bonus}
          </dt>
          <dd className="text-white/70">{copy.bonusLabels[offer.bonus]}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-white/40">
            {copy.fieldLabels.policy}
          </dt>
          <dd className="text-white/70">{copy.policyLabels[offer.policy]}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-white/40">
            {copy.fieldLabels.availability}
          </dt>
          <dd className="text-white/70">
            {copy.availabilityLabels[offer.availability]}
          </dd>
        </div>
      </dl>

      <a
        href={offerHref(offer)}
        target="_blank"
        rel={relForRetailer(offer.retailer)}
        className={
          isBestPrice
            ? "mt-4 rounded-lg bg-pink-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-pink-400"
            : "mt-4 rounded-lg border border-white/15 px-4 py-2 text-center text-sm font-semibold text-white/85 hover:border-white/30 hover:text-white"
        }
      >
        {copy.ctaLabel} — {retailer.label}
      </a>
    </li>
  );
}

/**
 * Multi-retailer GTA 6 price comparison. Ordering is price-driven, never
 * commission-driven, and official stores stay in the list as the baseline.
 */
export function RetailerPriceComparator({
  locale,
  copy,
  platforms = ["PS5", "Xbox"],
  compact = false,
}: Props) {
  const surveyDate = new Date(PRICE_SURVEY_DATE).toLocaleDateString(
    locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <section className="not-prose my-8">
      {compact ? null : (
        <p className="mb-6 leading-relaxed text-white/70">
          {copy.comparatorBody}
        </p>
      )}

      {platforms.map((platform) => {
        const offers = offersForPlatform(platform);
        const best = lowestPriceEur(offers);
        // Retailers routinely tie at the lowest price — break the tie on stock
        const cheapest = (o: RetailerOffer) =>
          o.priceEur !== null && o.priceEur === best;
        const inStockIndex = offers.findIndex(
          (o) => cheapest(o) && o.availability === "in_stock",
        );
        const badgedIndex =
          inStockIndex >= 0 ? inStockIndex : offers.findIndex(cheapest);

        return (
          <div key={platform} className="mb-8 last:mb-0">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/45">
              {copy.platformLabels[platform]}
            </h3>
            <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer, index) => (
                <OfferCard
                  key={offerKey(offer)}
                  offer={offer}
                  copy={copy}
                  locale={locale}
                  isBestPrice={best !== null && index === badgedIndex}
                />
              ))}
            </ul>
          </div>
        );
      })}

      <p className="mt-4 text-xs leading-relaxed text-white/45">
        {copy.surveyNote.replace("{date}", surveyDate)}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-white/35">
        {copy.disclosure}
      </p>
    </section>
  );
}
