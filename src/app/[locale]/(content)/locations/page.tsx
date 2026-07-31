import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocationsList } from "@/components/locations/LocationsList";
import { getAllLocations } from "@/data/all-locations";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("locationsTitle"),
    description: t("locationsDesc"),
    path: "/locations",
  });
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("locations");
  const count = getAllLocations().length;

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-8 text-white/60">
        {t("count", { count: count.toLocaleString(locale) })} — {t("countHint")}
      </p>

      <LocationsList />
    </main>
  );
}
