"use client";

import { useTranslations } from "next-intl";
import { LaunchAlertForm } from "./LaunchAlertForm";

/**
 * End-of-content capture. The banner still shows — footer inline is a
 * second chance after a long read, not a replacement.
 */
export function LaunchAlertInline() {
  const t = useTranslations("newsletter");

  return (
    <section
      data-launch-alert-inline
      aria-labelledby="launch-alert-title"
      className="mt-10 rounded-xl border border-foreground/10 bg-foreground/5 p-6"
    >
      <p
        id="launch-alert-title"
        className="text-lg font-semibold text-foreground"
      >
        {t("title")}
      </p>
      <p className="mt-2 max-w-2xl text-sm text-foreground/60">{t("desc")}</p>
      <div className="mt-4 max-w-xl">
        <LaunchAlertForm placement="inline" />
      </div>
      <p className="mt-2 text-xs text-foreground/40">{t("privacy")}</p>
    </section>
  );
}
