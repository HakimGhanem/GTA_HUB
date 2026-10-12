import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ConversionStrip } from "@/components/newsletter/ConversionStrip";
import { MapPageClient } from "./MapPageClient";
import { Link } from "@/i18n/navigation";
import { getLocalityPages, localitySlug } from "@/lib/real-world-matches";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("mapTitle"),
    description: t("mapDesc"),
    path: "/map",
  });
}

function MapLoading() {
  return (
    <div className="flex h-full items-center justify-center bg-background text-foreground/50">
      Loading map…
    </div>
  );
}

/**
 * The fullscreen map is otherwise a crawl dead end: without this strip a bot
 * landing on /map finds no route to the locality, collectible or guide pages.
 */
function MapExploreNav({
  label,
  sections,
}: {
  label: string;
  sections: Array<{ href: string; label: string }>;
}) {
  const localities = getLocalityPages();

  return (
    <nav aria-label={label} className="-mx-3 mt-1 overflow-x-auto sm:-mx-4">
      <ul className="flex w-max items-center gap-1.5 px-3 pb-0.5 text-[11px] sm:px-4">
        {sections.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="rounded-full border border-foreground/15 px-2 py-0.5 text-foreground/70 hover:border-accent hover:text-accent"
            >
              {section.label}
            </Link>
          </li>
        ))}
        {localities.map((group) => (
          <li key={group.region}>
            <Link
              href={`/gta-6-real-life-locations/${localitySlug(group.region)}`}
              className="rounded-full px-2 py-0.5 text-foreground/45 hover:text-accent"
            >
              {group.region}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");

  return (
    <main
      id="main-content"
      className="flex h-[calc(100dvh-3.5rem)] flex-1 flex-col"
    >
      <div className="shrink-0 border-b border-foreground/10 bg-background px-3 py-1.5 sm:px-4">
        <h1 className="text-sm font-semibold tracking-tight text-foreground">
          {t("mapH1")}
        </h1>
        <p className="text-[11px] text-foreground/50">{t("mapLead")}</p>
        <MapExploreNav
          label={t("mapNavTitle")}
          sections={[
            { href: "/gta-6-real-life-locations", label: t("mapNavRealLife") },
            { href: "/collectibles", label: t("mapNavCollectibles") },
            { href: "/guides", label: t("mapNavGuides") },
            { href: "/news", label: t("mapNavNews") },
          ]}
        />
      </div>
      <ConversionStrip variant="map" />
      <div className="min-h-0 flex-1">
        <Suspense fallback={<MapLoading />}>
          <MapPageClient />
        </Suspense>
      </div>
    </main>
  );
}
