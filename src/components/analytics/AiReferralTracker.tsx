"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Traffic sent by answer engines is invisible in GA4 by default: most of it
 * arrives as `direct` or under a hostname nobody has a channel group for.
 * This fires an explicit `ai_referral` event so GEO work can be measured.
 */
const AI_SOURCES: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "copilot.microsoft.com": "copilot",
  "bing.com": "bing_copilot",
  "gemini.google.com": "gemini",
  "bard.google.com": "gemini",
  "you.com": "you",
  "poe.com": "poe",
  "phind.com": "phind",
  "duckduckgo.com": "duckassist",
  "grok.com": "grok",
  "x.ai": "grok",
  "mistral.ai": "mistral",
};

function matchSource(hostname: string): string | null {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  for (const [domain, source] of Object.entries(AI_SOURCES)) {
    if (host === domain || host.endsWith(`.${domain}`)) return source;
  }
  return null;
}

function detect(): string | null {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
  if (utm) {
    const fromUtm = matchSource(utm);
    if (fromUtm) return fromUtm;
  }

  if (!document.referrer) return null;
  try {
    return matchSource(new URL(document.referrer).hostname);
  } catch {
    return null;
  }
}

export function AiReferralTracker() {
  const pathname = usePathname();
  const reported = useRef(false);

  useEffect(() => {
    if (reported.current) return;

    const source = detect();
    if (!source) return;
    reported.current = true;

    const payload = {
      ai_source: source,
      page_path: pathname,
    };

    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    w.gtag?.("event", "ai_referral", payload);
    w.dataLayer?.push({ event: "ai_referral", ...payload });
  }, [pathname]);

  return null;
}
