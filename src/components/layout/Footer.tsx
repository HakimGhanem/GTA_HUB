import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AmazonAffiliateDisclosure } from "@/components/affiliate/AmazonAffiliateDisclosure";
import { GTADB } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const footerLinks = [
    { href: "/map", label: t("interactiveMap") },
    { href: "/locations", label: nav("locations") },
    { href: "/collectibles", label: nav("collectibles") },
    { href: "/guides", label: nav("guides") },
    { href: "/news", label: nav("news") },
    { href: "/about", label: t("about") },
    { href: "/privacy", label: t("privacy") },
  ] as const;

  return (
    <footer className="shrink-0 border-t border-white/10 bg-[#0a0e17] px-4 py-6 text-sm text-white/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <div className="flex flex-wrap gap-4">
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
      {GTADB.enabled && (
        <p className="mx-auto mt-3 max-w-5xl px-4 text-xs text-white/30">
          {t("maptiles")}{" "}
          <a
            href={GTADB.attributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/50"
          >
            gtadb.org
          </a>
        </p>
      )}
      <AmazonAffiliateDisclosure />
    </footer>
  );
}
