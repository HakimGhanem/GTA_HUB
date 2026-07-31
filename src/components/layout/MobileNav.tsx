"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { NavLink } from "./NavLink";
import { CountdownTimer } from "@/components/map/CountdownTimer";

export function MobileNav() {
  const t = useTranslations("header");
  const nav = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/map", label: nav("map") },
    { href: "/locations", label: nav("locations") },
    { href: "/collectibles", label: nav("collectibles") },
    { href: "/guides", label: nav("guides") },
  ] as const;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={t("menu")}
      >
        {t("menu")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label={t("menu")}
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-panel"
            className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 bg-[#0d1220] shadow-2xl"
            aria-label={t("navigation")}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <span className="font-semibold text-white">{t("navigation")}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-white/60 hover:text-white"
                aria-label={t("menu")}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1 p-3">
              {links.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-base"
                  activeClassName="bg-pink-500/20 text-pink-200"
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto border-t border-white/10 p-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-white/40">
                {t("launchLabel")}
              </p>
              <CountdownTimer />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
