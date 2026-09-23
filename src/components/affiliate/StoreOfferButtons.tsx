import type { StoreOffer } from "@/lib/affiliate/store-links";

const AMAZON_CLASS =
  "inline-flex w-full items-center justify-center rounded-full bg-[#FF9900] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#FFB84D]";

const SECONDARY_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/10";

const PLAYSTATION_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-500/20";

const XBOX_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-green-400/40 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-100 transition-colors hover:bg-green-500/20";

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

function relForOffer(offer: StoreOffer): string {
  return offer.kind === "affiliate"
    ? "nofollow sponsored noopener noreferrer"
    : "noopener noreferrer";
}

function OfferLink({
  offer,
  primary,
}: {
  offer: StoreOffer;
  primary: boolean;
}) {
  return (
    <a
      href={offer.href}
      target="_blank"
      rel={relForOffer(offer)}
      className={classForOffer(offer, primary)}
    >
      {offer.cta}
    </a>
  );
}

export function StoreOfferButtons({
  offers,
  otherStoresLabel,
}: {
  offers: StoreOffer[];
  otherStoresLabel: string;
}) {
  if (offers.length === 0) return null;

  const [primary, ...rest] = offers;

  return (
    <div className="mt-4 flex flex-col gap-2">
      <OfferLink offer={primary} primary />
      {rest.length > 0 ? (
        <details className="group">
          <summary className="cursor-pointer list-none text-center text-xs font-medium text-foreground/45 underline-offset-2 hover:text-foreground/70 hover:underline [&::-webkit-details-marker]:hidden">
            {otherStoresLabel}
          </summary>
          <div className="mt-2 flex flex-col gap-2">
            {rest.map((offer) => (
              <OfferLink key={offer.id} offer={offer} primary={false} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
