import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { CountdownTimer } from "@/components/map/CountdownTimer";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export async function Header() {
  const t = await getTranslations("header");
  const nav = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <span className="text-lg font-bold tracking-tight text-foreground">
          MAP<span className="text-accent">6</span>
        </span>
        <span className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent/90 sm:inline">
          GTA HUB
        </span>
        <span className="hidden text-xs text-muted lg:inline">
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

        <ThemeSwitch />
        <LocaleSwitcher />

        <div className="hidden lg:block">
          <CountdownTimer />
        </div>

        <Link
          href="/map"
          className="hidden rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/85 sm:inline md:hidden"
        >
          {nav("openMap")}
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
