"use client";

import { usePathname } from "next/navigation";

/** Hide site chrome on OBS / Kick browser-source routes. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.includes("/overlay")) return null;
  return children;
}
