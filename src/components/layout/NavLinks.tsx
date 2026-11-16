"use client";

import { useTranslations } from "next-intl";
import { NavLink } from "./NavLink";

export function NavLinks() {
  const t = useTranslations("nav");

  const nav = [
    { href: "/map", label: t("map"), className: undefined },
    {
      href: "/gta-6-real-life-locations",
      label: t("realLifeMatches"),
      className: "max-w-[11rem] text-[11px] leading-snug",
    },
    { href: "/locations", label: t("locations"), className: undefined },
    { href: "/collectibles", label: t("collectibles"), className: "hidden xl:block" },
    { href: "/database", label: t("database"), className: "hidden xl:block" },
    { href: "/guides", label: t("guides"), className: undefined },
    { href: "/news", label: t("news"), className: undefined },
    // Kept out of the md row so the header never wraps
    { href: "/creators", label: t("creators"), className: "hidden xl:block" },
  ] as const;

  return (
    <>
      {nav.map(({ href, label, className }) => (
        <NavLink
          key={href}
          href={href}
          className={className}
          activeClassName="bg-foreground/10 text-foreground"
        >
          {label}
        </NavLink>
      ))}
    </>
  );
}
