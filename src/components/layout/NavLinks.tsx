"use client";

import { useTranslations } from "next-intl";
import { NavLink } from "./NavLink";

export function NavLinks() {
  const t = useTranslations("nav");

  const nav = [
    { href: "/map", label: t("map") },
    { href: "/locations", label: t("locations") },
    { href: "/collectibles", label: t("collectibles") },
    { href: "/database", label: t("database") },
    { href: "/guides", label: t("guides") },
    { href: "/news", label: t("news") },
  ] as const;

  return (
    <>
      {nav.map(({ href, label }) => (
        <NavLink key={href} href={href} activeClassName="bg-white/10 text-white">
          {label}
        </NavLink>
      ))}
    </>
  );
}
