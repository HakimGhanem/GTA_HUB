"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics/track";
import { writeLaunchAlertState } from "@/lib/waitlist/local";

type Status = "idle" | "sending" | "done" | "error";

export type LaunchAlertPlacement = "inline" | "banner" | "strip";

type Props = {
  placement: LaunchAlertPlacement;
  onSuccess?: () => void;
  /** Single-row field + button, no status spacer until a message exists. */
  compact?: boolean;
};

/**
 * Email field + submit for the GTA 6 launch alert. Layout-agnostic: the
 * inline card and the sticky banner both wrap it with their own heading.
 */
export function LaunchAlertForm({ placement, onSuccess, compact }: Props) {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const inputId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean || status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clean,
          locale,
          source: "launch",
          placement,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        duplicate?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(
          data.error === "rate_limited"
            ? t("errorRate")
            : data.error === "invalid_email"
              ? t("errorInvalid")
              : t("errorGeneric"),
        );
        return;
      }

      setStatus("done");
      setMessage(data.duplicate ? t("duplicate") : t("success"));
      writeLaunchAlertState("joined");
      trackEvent("launch_alert_signup", {
        placement,
        locale,
        duplicate: Boolean(data.duplicate),
      });
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage(t("errorGeneric"));
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          {t("emailLabel")}
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "sending" || status === "done"}
          value={email}
          onChange={(e) => {
            if (status === "error") setStatus("idle");
            setEmail(e.target.value);
          }}
          placeholder={t("placeholder")}
          className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#0d1220] px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-pink-400/60 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "done"}
          className="shrink-0 rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-400 disabled:opacity-60"
        >
          {status === "sending"
            ? t("sending")
            : status === "done"
              ? t("joined")
              : t("cta")}
        </button>
      </div>
      {message ? (
        <p
          aria-live="polite"
          className={`mt-2 text-xs ${
            status === "error" ? "text-amber-300" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      ) : compact ? null : (
        <p aria-live="polite" className="mt-2 text-xs" />
      )}
    </form>
  );
}
