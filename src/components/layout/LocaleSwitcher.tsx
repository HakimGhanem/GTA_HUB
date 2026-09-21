"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { INDEXABLE_LOCALES } from "@/i18n/routing";

const SWITCHABLE = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: (typeof INDEXABLE_LOCALES)[number]) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-1">
      {SWITCHABLE.map(({ code, label, flag }) => (
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
