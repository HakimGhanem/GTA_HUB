import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RealWorldMatchList } from "@/components/locations/RealWorldMatchList";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import {
  countMatchesBySubtype,
  countUnconfirmedMatches,
  getLocalityBySlug,
  getLocalityPages,
  localitySlug,
} from "@/lib/real-world-matches";

type Props = { params: Promise<{ locale: string; locality: string }> };

const EN = {
  back: "← All real-life locations",
  kicker: "Leonida ↔ South Florida",
  heading: (region: string) => `Real-life locations in ${region}`,
  title: (region: string) => `${region} Real-Life Locations — GTA 6 vs South Florida`,
  description: (region: string, count: number) =>
    `${count} buildings in ${region}, Leonida, matched to the South Florida addresses they were modelled on — with the nature of each place and the community's confidence label.`,
  lead: (region: string, count: number) =>
    `${count} buildings in ${region} have been matched to a real South Florida address by the mapping community. Rockstar has named none of them in-game, so every row below is a resemblance argued from published footage — not an official fact.`,
  natureTitle: "What this locality is made of",
  unsettledNote: (count: number) =>
    count === 0
      ? "Every match here is one the community considers settled."
      : `${count} of these matches are flagged as unsettled by the community, and are marked as such below.`,
  directoryTitle: "Every match",
  directoryLead: "Alphabetical. Each name opens the pin on the interactive map.",
  unsettled: "unsettled",
  othersTitle: "Other localities",
  credit:
    "Identifications by the GTADB mapping community, reused under CC BY 4.0. Map-6 reformats and labels them.",
} as const;

const FR = {
  back: "← Tous les lieux réels",
  kicker: "Leonida ↔ Floride du Sud",
  heading: (region: string) => `Lieux réels à ${region}`,
  title: (region: string) => `Lieux réels de ${region} — GTA 6 face à la Floride`,
  description: (region: string, count: number) =>
    `${count} bâtiments de ${region}, à Leonida, rapprochés des adresses de Floride du Sud dont ils s’inspirent — avec la nature de chaque lieu et le niveau de confiance de la communauté.`,
  lead: (region: string, count: number) =>
    `${count} bâtiments de ${region} ont été rapprochés d’une adresse réelle de Floride du Sud par la communauté cartographique. Rockstar n’en a nommé aucun dans le jeu : chaque ligne ci-dessous est une ressemblance argumentée à partir d’images publiées, pas un fait officiel.`,
  natureTitle: "De quoi cette localité est faite",
  unsettledNote: (count: number) =>
    count === 0
      ? "Tous les rapprochements de cette page sont considérés comme établis par la communauté."
      : `${count} de ces rapprochements sont jugés incertains par la communauté, et signalés comme tels ci-dessous.`,
  directoryTitle: "Tous les rapprochements",
  directoryLead:
    "Par ordre alphabétique. Chaque nom ouvre le pin sur la carte interactive.",
  unsettled: "incertain",
  othersTitle: "Autres localités",
  credit:
    "Identifications par la communauté cartographique GTADB, réutilisées sous licence CC BY 4.0. Map-6 les remet en forme et les étiquette.",
} as const;

export function generateStaticParams() {
  return getLocalityPages().map((group) => ({
    locality: localitySlug(group.region),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, locality } = await params;
  const group = getLocalityBySlug(locality);
  if (!group) return {};
  const copy = locale === "fr" ? FR : EN;

  return buildMetadata({
    locale,
    title: `${copy.title(group.region)} | ${SITE.name}`,
    description: copy.description(group.region, group.matches.length),
    path: `/gta-6-real-life-locations/${locality}`,
    canonicalLocale: locale === "fr" || locale === "en" ? locale : "en",
    hreflangLocales: ["en", "fr"],
    robots:
      locale === "en" || locale === "fr"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

export default async function LocalityPage({ params }: Props) {
  const { locale, locality } = await params;
  setRequestLocale(locale);
  const group = getLocalityBySlug(locality);
  if (!group) notFound();

  const t = await getTranslations("map.subtypes");
  const copy = locale === "fr" ? FR : EN;
  const natures = countMatchesBySubtype(group.matches);
  const unsettled = countUnconfirmedMatches(group.matches);
  const others = getLocalityPages().filter(
    (other) => other.region !== group.region,
  );

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-10">
      <Link
        href="/gta-6-real-life-locations"
        className="mb-6 inline-block text-sm text-foreground/50 hover:text-foreground"
      >
        {copy.back}
      </Link>

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
        {copy.kicker}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{copy.heading(group.region)}</h1>
      <p className="text-foreground/70">
        {copy.lead(group.region, group.matches.length)}
      </p>
      <p className="mt-3 text-foreground/70">{copy.unsettledNote(unsettled)}</p>

      {natures.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold">{copy.natureTitle}</h2>
          <ul className="flex flex-wrap gap-2 text-sm [&>li]:rounded-full [&>li]:border [&>li]:border-foreground/10 [&>li]:bg-foreground/5 [&>li]:px-3 [&>li]:py-1">
            {natures.map(({ subtype, count }) => (
              <li key={subtype}>
                {t(subtype)} · {count}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-2 text-xl font-semibold">{copy.directoryTitle}</h2>
        <p className="mb-4 text-foreground/70">{copy.directoryLead}</p>
        <RealWorldMatchList
          matches={group.matches}
          locale={locale}
          subtypeLabel={(subtype) => t(subtype)}
          unsettledLabel={copy.unsettled}
        />
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">{copy.othersTitle}</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {others.map((other) => (
            <li key={other.region}>
              <Link
                href={`/gta-6-real-life-locations/${localitySlug(other.region)}`}
                className="text-accent underline"
              >
                {other.region}
              </Link>{" "}
              <span className="text-foreground/40">{other.matches.length}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-foreground/50">
        {copy.credit}{" "}
        <Link href="/attributions" className="underline">
          /attributions
        </Link>
      </p>
    </main>
  );
}
