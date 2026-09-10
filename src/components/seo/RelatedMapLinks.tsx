import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GUIDE_HUBS } from "@/data/guide-hubs";
import { getLocalizedGuide } from "@/data/guides-i18n";

const MAP_HUB_SLUGS =
  GUIDE_HUBS.find((hub) => hub.id === "map")?.slugs ?? [];

const LOCATION_GUIDE: Record<string, string> = {
  "vice-city": "vice-city-locations",
  "ocean-drive": "ocean-drive-gta-6",
  "leonida-keys": "leonida-lore-overview",
  grassrivers: "leonida-lore-overview",
  "port-gellhorn": "leonida-lore-overview",
  "ambrosia-island": "leonida-lore-overview",
  "mount-kalaga": "leonida-lore-overview",
};

type RelatedMapLinksProps = {
  locale: string;
  currentGuideSlug?: string;
  locationSlug?: string;
};

export async function RelatedMapLinks({
  locale,
  currentGuideSlug,
  locationSlug,
}: RelatedMapLinksProps) {
  const t = await getTranslations("guides");

  const extras = new Set<string>();
  if (currentGuideSlug) {
    for (const slug of MAP_HUB_SLUGS) {
      if (slug !== currentGuideSlug) extras.add(slug);
    }
  }
  if (locationSlug && LOCATION_GUIDE[locationSlug]) {
    extras.add(LOCATION_GUIDE[locationSlug]);
  }
  extras.delete("gta-6-map-guide");

  const related = [...extras]
    .slice(0, 4)
    .map((slug) => {
      const localized = getLocalizedGuide(slug, locale);
      return localized ? { slug, title: localized.title } : null;
    })
    .filter((item): item is { slug: string; title: string } => Boolean(item));

  return (
    <nav
      className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-6"
      aria-labelledby="related-map-links"
    >
      <h2 id="related-map-links" className="mb-3 text-lg font-semibold text-white">
        {t("relatedTitle")}
      </h2>
      <ul className="flex flex-col gap-2 text-sm">
        <li>
          <Link href="/map" className="text-pink-300 underline hover:text-pink-200">
            {t("relatedMap")}
          </Link>
        </li>
        {currentGuideSlug !== "gta-6-map-guide" ? (
          <li>
            <Link
              href="/guides/gta-6-map-guide"
              className="text-pink-300 underline hover:text-pink-200"
            >
              {t("relatedMapGuide")}
            </Link>
          </li>
        ) : null}
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/guides/${item.slug}`}
              className="text-white/70 underline hover:text-white"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
