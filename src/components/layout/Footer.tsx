import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AmazonAffiliateDisclosure } from "@/components/affiliate/AmazonAffiliateDisclosure";
import { GTADB } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const footerLinks = [
    { href: "/map", label: t("interactiveMap") },
    { href: "/guides/gta-6-map-guide", label: t("mapGuide") },
    { href: "/guides/gta-6-collectibles-map", label: t("collectiblesMap") },
    { href: "/maps/gta5", label: nav("gta5") },
    { href: "/locations", label: nav("locations") },
    { href: "/collectibles", label: nav("collectibles") },
    { href: "/database", label: nav("database") },
    { href: "/guides", label: nav("guides") },
    { href: "/news", label: nav("news") },
    { href: "/trailer", label: t("trailerAnalysis") },
    { href: "/creators", label: nav("creators") },
    { href: "/pro", label: nav("pro") },
    { href: "/about", label: t("about") },
    { href: "/press", label: t("press") },
    { href: "/privacy", label: t("privacy") },
  ] as const;

  return (
    <footer className="shrink-0 border-t border-foreground/10 bg-background px-4 py-6 text-sm text-foreground/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <div className="flex flex-wrap gap-4">
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-foreground">
              {label}
            </Link>
          ))}
        </div>
      </div>
      {/* Community data attribution is owed whether or not tiles are enabled */}
      <p className="mx-auto mt-3 max-w-5xl px-4 text-xs text-foreground/40">
        {t("maptiles")}{" "}
        <a
          href={GTADB.attributionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground/60"
        >
          gtadb.org
        </a>
        {" · "}
        <Link href="/attributions" className="underline hover:text-foreground/60">
          {t("sources")}
        </Link>
      </p>
      <AmazonAffiliateDisclosure />
    </footer>
  );
}
