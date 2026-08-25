import type { StoreOffer } from "@/lib/affiliate/store-links";

const AMAZON_CLASS =
  "inline-flex items-center justify-center rounded-full bg-[#FF9900] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#FFB84D]";

const SECONDARY_CLASS =
  "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10";

const PLAYSTATION_CLASS =
  "inline-flex items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-500/20";

const XBOX_CLASS =
  "inline-flex items-center justify-center rounded-full border border-green-400/40 bg-green-500/10 px-5 py-2.5 text-sm font-semibold text-green-100 transition-colors hover:bg-green-500/20";

function classForOffer(offer: StoreOffer): string {
  if (offer.variant === "amazon") return AMAZON_CLASS;
  if (offer.id === "playstation") return PLAYSTATION_CLASS;
  if (offer.id === "xbox") return XBOX_CLASS;
  return SECONDARY_CLASS;
}

function relForOffer(offer: StoreOffer): string {
  return offer.kind === "affiliate"
    ? "nofollow sponsored noopener noreferrer"
    : "noopener noreferrer";
}

export function StoreOfferButtons({ offers }: { offers: StoreOffer[] }) {
  if (offers.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {offers.map((offer) => (
        <a
          key={offer.id}
          href={offer.href}
          target="_blank"
          rel={relForOffer(offer)}
          className={classForOffer(offer)}
        >
          {offer.cta}
        </a>
      ))}
    </div>
  );
}
