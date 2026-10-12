import { OutboundLink } from "@/components/affiliate/OutboundLink";
import type { AffiliatePlacement } from "@/lib/analytics/affiliate";
import type { StoreOffer } from "@/lib/affiliate/store-links";

const AMAZON_CLASS =
  "inline-flex w-full items-center justify-center rounded-full bg-[#FF9900] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#FFB84D]";

const SECONDARY_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/10";

const PLAYSTATION_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-500/20";

const XBOX_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-green-400/40 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-100 transition-colors hover:bg-green-500/20";

/** Context needed to attribute a click to a product and a surface. */
export type OfferTrackingContext = {
  placement: AffiliatePlacement;
  item: string;
  locale: string;
  edition?: string;
  platform?: string;
  value?: number;
  currency?: string;
};

function classForOffer(offer: StoreOffer, primary: boolean): string {
  if (offer.variant === "amazon") {
    return primary
      ? AMAZON_CLASS
      : `${AMAZON_CLASS} py-2.5`;
  }
  if (offer.id === "playstation") return PLAYSTATION_CLASS;
  if (offer.id === "xbox") return XBOX_CLASS;
  return SECONDARY_CLASS;
}

function OfferLink({
  offer,
  primary,
  position,
  tracking,
}: {
  offer: StoreOffer;
  primary: boolean;
  position: number;
  tracking: OfferTrackingContext;
}) {
  return (
    <OutboundLink
      href={offer.href}
      monetised={offer.kind === "affiliate"}
      className={classForOffer(offer, primary)}
      click={{
        placement: tracking.placement,
        merchant: offer.id,
        item: tracking.item,
        edition: tracking.edition,
        platform: tracking.platform,
        locale: tracking.locale,
        target: offer.target,
        position,
        value: tracking.value,
        currency: tracking.currency,
      }}
    >
      {offer.cta}
    </OutboundLink>
  );
}

export function StoreOfferButtons({
  offers,
  otherStoresLabel,
  tracking,
}: {
  offers: StoreOffer[];
  otherStoresLabel: string;
  tracking: OfferTrackingContext;
}) {
  if (offers.length === 0) return null;

  const [primary, ...rest] = offers;

  return (
    <div className="mt-4 flex flex-col gap-2">
      <OfferLink offer={primary} primary position={0} tracking={tracking} />
      {rest.length > 0 ? (
        <details className="group">
          <summary className="cursor-pointer list-none text-center text-xs font-medium text-foreground/45 underline-offset-2 hover:text-foreground/70 hover:underline [&::-webkit-details-marker]:hidden">
            {otherStoresLabel}
          </summary>
          <div className="mt-2 flex flex-col gap-2">
            {rest.map((offer, index) => (
              <OfferLink
                key={offer.id}
                offer={offer}
                primary={false}
                position={index + 1}
                tracking={tracking}
              />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
