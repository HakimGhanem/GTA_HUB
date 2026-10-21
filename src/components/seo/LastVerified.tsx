import { getTranslations } from "next-intl/server";

const LOCALE_BCP47: Record<string, string> = {
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
  pt: "pt-PT",
  de: "de-DE",
  it: "it-IT",
};

export async function LastVerified({
  date,
  locale,
}: {
  date?: string | null;
  locale: string;
}) {
  if (!date) return null;
  const parsed = new Date(date.includes("T") ? date : `${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;

  const t = await getTranslations({ locale, namespace: "guides" });
  const formatted = new Intl.DateTimeFormat(LOCALE_BCP47[locale] ?? "en-GB", {
    dateStyle: "medium",
  }).format(parsed);

  return (
    <p className="mt-2 text-xs text-foreground/40">
      <time dateTime={parsed.toISOString()}>
        {t("lastVerified", { date: formatted })}
      </time>
    </p>
  );
}
