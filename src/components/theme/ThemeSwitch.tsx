"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const ORDER = ["light", "dark", "system"] as const;

type ThemeChoice = (typeof ORDER)[number];

function isTheme(value: string | undefined): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("header");

  useEffect(() => setMounted(true), []);

  const current: ThemeChoice = mounted && isTheme(theme) ? theme : "system";
  const label = t("themeToggle", { theme: t(themeKey(current)) });

  return (
    <button
      type="button"
      onClick={() => {
        const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
        setTheme(next);
      }}
      className="inline-flex size-8 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      aria-label={label}
      title={label}
    >
      <ThemeIcon theme={current} />
    </button>
  );
}

function themeKey(theme: ThemeChoice) {
  if (theme === "light") return "themeLight";
  if (theme === "dark") return "themeDark";
  return "themeSystem";
}

function ThemeIcon({ theme }: { theme: ThemeChoice }) {
  if (theme === "light") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="currentColor"
          d="M12 4.5a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12.75A.75.75 0 0 1 12 4.5Zm0 15a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12.75A.75.75 0 0 1 12 19.5ZM4.5 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 12Zm15 0a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H20.25A.75.75 0 0 1 19.5 12ZM7.05 7.05a.75.75 0 0 1 1.06 0l.01.01a.75.75 0 1 1-1.06 1.06l-.01-.01a.75.75 0 0 1 0-1.06Zm8.83 8.83a.75.75 0 0 1 1.06 0l.01.01a.75.75 0 1 1-1.06 1.06l-.01-.01a.75.75 0 0 1 0-1.06ZM7.05 16.95a.75.75 0 0 1 0-1.06l.01-.01a.75.75 0 1 1 1.06 1.06l-.01.01a.75.75 0 0 1-1.06 0Zm8.83-8.83a.75.75 0 0 1 0-1.06l.01-.01a.75.75 0 0 1 1.06 1.06l-.01.01a.75.75 0 0 1-1.06 0ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        />
      </svg>
    );
  }

  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="currentColor"
          d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="currentColor"
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H6.5A2.5 2.5 0 0 1 4 13.5v-8ZM6.5 4.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-11ZM8 19.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z"
      />
    </svg>
  );
}
