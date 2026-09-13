"use client";

import { useTranslations } from "next-intl";
import { LaunchAlertForm } from "./LaunchAlertForm";

/**
 * End-of-content capture block. The `data-launch-alert-inline` marker tells
 * LaunchAlertBanner to stay out of the way on pages that already ask.
 */
export function LaunchAlertInline() {
  const t = useTranslations("newsletter");

  return (
    <section
      data-launch-alert-inline
      aria-labelledby="launch-alert-title"
      className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <p
        id="launch-alert-title"
        className="text-lg font-semibold text-white"
      >
        {t("title")}
      </p>
      <p className="mt-2 max-w-2xl text-sm text-white/60">{t("desc")}</p>
      <div className="mt-4 max-w-xl">
        <LaunchAlertForm placement="inline" />
      </div>
      <p className="mt-2 text-xs text-white/40">{t("privacy")}</p>
    </section>
  );
}
