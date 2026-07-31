"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "it", label: "IT", flag: "🇮🇹" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-1">
      {locales.map(({ code, label, flag }) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className="cursor-pointer rounded px-1.5 py-0.5 text-xs"
          style={{
            opacity: locale === code ? 1 : 0.5,
            fontWeight: locale === code ? 600 : 400,
            background: "none",
            border: locale === code ? "1px solid currentColor" : "none",
            borderRadius: "4px",
          }}
          aria-label={`Switch to ${label}`}
          aria-current={locale === code ? "true" : undefined}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
}
