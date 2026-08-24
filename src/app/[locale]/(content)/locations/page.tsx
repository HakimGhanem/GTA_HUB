import { getTranslations, setRequestLocale } from "next-intl/server";
import { RegionHubs } from "@/components/locations/RegionHubs";
import { LocationsList } from "@/components/locations/LocationsList";
import { ClassicMapsPromo } from "@/components/map/ClassicMapsPromo";
import { getIndexableLocations } from "@/lib/location-indexing";
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
  const indexable = getIndexableLocations(getAllLocations()).length;

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
      <p className="mb-8 text-white/60">
        {t("count", { count: indexable.toLocaleString(locale) })} — {t("countHint")}
      </p>

      <RegionHubs title={t("regionHubsTitle")} hint={t("regionHubsHint")} />

      <LocationsList />

      <div className="mt-12">
        <ClassicMapsPromo
          title={t("classicMapsTitle")}
          hint={t("classicMapsHint")}
          maps={[
            {
              game: "gta5",
              href: "/map?game=gta5",
              label: t("classicGta5"),
              desc: t("classicGta5Desc"),
            },
            {
              game: "vc",
              href: "/map?game=vc",
              label: t("classicVc"),
              desc: t("classicVcDesc"),
            },
            {
              game: "sa",
              href: "/map?game=sa",
              label: t("classicSa"),
              desc: t("classicSaDesc"),
            },
          ]}
        />
      </div>
    </main>
  );
}
