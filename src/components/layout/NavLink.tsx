"use client";

import clsx from "clsx";
import { Link, usePathname } from "@/i18n/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "rounded-md px-2.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60",
        isActive
          ? activeClassName ?? "bg-white/10 text-white"
          : "text-white/70 hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}
