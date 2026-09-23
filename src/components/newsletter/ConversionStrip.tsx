"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CountdownTimer } from "@/components/map/CountdownTimer";
import { readLaunchAlertState } from "@/lib/waitlist/local";
import { LaunchAlertForm } from "./LaunchAlertForm";

type Variant = "map" | "page" | "hero";

/**
 * Above-the-fold email + preorder/setup links. Hidden once the visitor
 * has already joined the launch list.
 */
export function ConversionStrip({ variant }: { variant: Variant }) {
  const t = useTranslations("newsletter");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const sync = () => setJoined(readLaunchAlertState() === "joined");
    sync();
    window.addEventListener("map6-launch-alert", sync);
    return () => window.removeEventListener("map6-launch-alert", sync);
  }, []);

  if (joined) return null;

  const links = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <Link
        href="/guides/gta-6-preorder-guide"
        className="font-semibold text-accent underline-offset-2 hover:text-accent/80 hover:underline"
      >
        {t("preorderCta")}
      </Link>
      <Link
        href="/guides/best-setup-gta-6-ps5-xbox"
        className="font-semibold text-foreground/70 underline-offset-2 hover:text-foreground hover:underline"
      >
        {t("setupCta")}
      </Link>
    </div>
  );

  if (variant === "map") {
    return (
      <div className="shrink-0 border-b border-pink-400/20 bg-surface/95 px-3 py-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <CountdownTimer />
            <p className="truncate text-xs text-foreground/60 sm:text-sm">
              {t("bannerDesc")}
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xl sm:flex-row sm:items-center sm:justify-end">
            <div className="min-w-0 flex-1 sm:max-w-sm">
              <LaunchAlertForm placement="strip" compact />
            </div>
            {links}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="pointer-events-auto mt-3 w-full max-w-xl rounded-xl border border-foreground/15 bg-black/55 p-3 backdrop-blur-md">
        <p className="text-xs font-semibold text-accent">{t("bannerTitle")}</p>
        <div className="mt-2">
          <LaunchAlertForm placement="strip" compact />
        </div>
        <div className="mt-2">{links}</div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="conversion-strip-title"
      className="my-8 rounded-xl border border-pink-400/25 bg-pink-500/10 p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          id="conversion-strip-title"
          className="text-base font-semibold text-accent"
        >
          {t("bannerTitle")}
        </p>
        <CountdownTimer />
      </div>
      <p className="mt-1 text-sm text-foreground/60">{t("bannerDesc")}</p>
      <div className="mt-4 max-w-xl">
        <LaunchAlertForm placement="strip" />
      </div>
      <div className="mt-3">{links}</div>
    </section>
  );
}
