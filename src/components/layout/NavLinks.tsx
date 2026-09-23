"use client";

import { useTranslations } from "next-intl";
import { NavLink } from "./NavLink";

export function NavLinks() {
  const t = useTranslations("nav");

  const nav = [
    { href: "/map", label: t("map"), className: undefined },
    { href: "/locations", label: t("locations"), className: undefined },
    { href: "/collectibles", label: t("collectibles"), className: undefined },
    { href: "/database", label: t("database"), className: undefined },
    { href: "/guides", label: t("guides"), className: undefined },
    { href: "/news", label: t("news"), className: undefined },
    // Seventh item — kept out of the md row so the header never wraps
    { href: "/creators", label: t("creators"), className: "hidden lg:block" },
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
