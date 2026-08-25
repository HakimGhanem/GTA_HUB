import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { CountdownTimer } from "@/components/map/CountdownTimer";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export async function Header() {
  const t = await getTranslations("header");
  const nav = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#0a0e17]/90 px-4 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
      >
        <span className="text-lg font-bold tracking-tight text-white">
          MAP<span className="text-pink-400">6</span>
        </span>
        <span className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-pink-300/90 sm:inline">
          GTA HUB
        </span>
        <span className="hidden text-xs text-white/50 lg:inline">
          {t("tagline")}
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <nav
          className="hidden items-center gap-1 text-sm md:flex"
          aria-label={t("navLabel")}
        >
          <NavLinks />
        </nav>

        <LocaleSwitcher />

        <div className="hidden lg:block">
          <CountdownTimer />
        </div>

        <Link
          href="/map"
          className="hidden rounded-full bg-pink-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-pink-400 sm:inline md:hidden"
        >
          {nav("openMap")}
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
