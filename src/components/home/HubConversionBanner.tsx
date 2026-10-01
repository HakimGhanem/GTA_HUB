import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";

type Props = {
  /** Hide the product grid when the page already shows one. */
  compact?: boolean;
  className?: string;
};

export async function HubConversionBanner({
  compact = false,
  className = "",
}: Props) {
  const t = await getTranslations("hubBanner");

  const pills = [
    { href: "/guides/gta-6-preorder-guide", label: t("navPreorder") },
    { href: "/map", label: t("navMap") },
    { href: "/news/gta-series-history-to-leonida", label: t("navHistory") },
    { href: "/news/gta-online-wallet-cards-before-vi", label: t("navOnline") },
    { href: "/news/gta-online-wallet-cards-before-vi#cards", label: t("navCards") },
  ] as const;

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] ${className}`}
      aria-labelledby="hub-preorder-heading"
    >
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {t("eyebrow")}
        </p>
        <h2
          id="hub-preorder-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65">
          {t("sub")}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/guides/gta-6-preorder-guide"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            {t("cta")}
          </Link>
          <Link
            href="/map"
            className="rounded-lg border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground/80 hover:border-foreground/40"
          >
            {t("ctaMap")}
          </Link>
        </div>
      </div>

      <nav
        aria-label={t("navLabel")}
        className="flex flex-wrap gap-2 border-t border-foreground/10 px-5 py-3 sm:px-8"
      >
        {pills.map((pill) => (
          <Link
            key={pill.href}
            href={pill.href}
            className="rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/80 hover:border-accent/50 hover:text-foreground"
          >
            {pill.label}
          </Link>
        ))}
      </nav>

      {compact ? null : (
        <div className="border-t border-foreground/10 px-5 py-5 sm:px-8">
          <AffiliateProductGrid
            intents={["preorder_standard", "preorder_collectors", "wallet_topup"]}
            liveOnly
            title={t("offersTitle")}
          />
        </div>
      )}
    </section>
  );
}
