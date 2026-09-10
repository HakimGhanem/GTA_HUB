import { locales } from "@/i18n/routing";

export function isSupportedLocale(value: string): boolean {
  return (locales as readonly string[]).includes(value);
}

export function formatOgDate(iso: string | undefined, locale: string): string[] {
  if (!iso) return [];
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return [];

  return [
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date),
  ];
}

/** "hidden-packages" -> "Hidden Packages", for kickers built from slugs. */
export function humanize(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
