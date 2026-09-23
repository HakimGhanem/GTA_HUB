import { getTranslations } from "next-intl/server";
import { AffiliateProductGrid } from "@/components/affiliate/AffiliateProductGrid";
import { Link } from "@/i18n/navigation";

export async function WalletPromo({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  const t = await getTranslations("affiliate");

  return (
    <section
      id="cards"
      className={className}
      aria-labelledby="wallet-promo-heading"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="wallet-promo-heading"
            className="text-2xl font-bold text-foreground"
          >
            {title ?? t("walletTitle")}
          </h2>
          <p className="mt-1 text-sm text-foreground/55">{t("walletSubtitle")}</p>
        </div>
        <Link
          href="/news/gta-online-wallet-cards-before-vi"
          className="text-sm text-accent hover:text-accent/80"
        >
          {t("walletGuideLink")}
        </Link>
      </div>
      <AffiliateProductGrid
        intents={["wallet_topup", "retro_gta"]}
        liveOnly
        title={null}
      />
    </section>
  );
}
