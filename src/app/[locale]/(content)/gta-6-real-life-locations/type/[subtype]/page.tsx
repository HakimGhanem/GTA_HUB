import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RealWorldMatchList } from "@/components/locations/RealWorldMatchList";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import {
  countMatchesByLocality,
  countUnconfirmedMatches,
  getLocalityPages,
  getSubtypeBySlug,
  getSubtypePages,
  localitySlug,
  subtypeSlug,
} from "@/lib/real-world-matches";

type Props = { params: Promise<{ locale: string; subtype: string }> };

const EN = {
  back: "← All real-life locations",
  kicker: "Leonida ↔ South Florida",
  heading: (label: string) => `${label} in GTA 6 and their real addresses`,
  title: (label: string) => `GTA 6 ${label} — Their Real-Life Addresses`,
  description: (label: string, count: number) =>
    `${count} ${label.toLowerCase()} in Leonida matched to the South Florida buildings they were modelled on, with the street address and the community's confidence label on each one.`,
  lead: (label: string, count: number, regions: number) =>
    `The mapping community has matched ${count} ${label.toLowerCase()} across Leonida to a real South Florida address, spread over ${regions} localities. Rockstar has not named any of them in-game, so each row below is a resemblance argued from published footage rather than an official fact.`,
  spreadTitle: "Where they are",
  spreadLead: "Most documented locality first. Each one has its own page.",
  unsettledNote: (count: number) =>
    count === 0
      ? "Every match in this category is one the community considers settled."
      : `${count} of these are flagged as unsettled by the community, and are marked as such in the list.`,
  directoryTitle: "Every match",
  directoryLead: "Alphabetical. Each name opens the pin on the interactive map.",
  unsettled: "unsettled",
  othersTitle: "Other categories",
  mapLink: "Open the interactive map",
  credit:
    "Identifications by the GTADB mapping community, reused under CC BY 4.0. Map-6 reformats and labels them.",
} as const;

const FR = {
  back: "← Tous les lieux réels",
  kicker: "Leonida ↔ Floride du Sud",
  heading: (label: string) => `${label} de GTA 6 et leurs adresses réelles`,
  title: (label: string) => `${label} de GTA 6 — les adresses réelles`,
  description: (label: string, count: number) =>
    `${count} ${label.toLowerCase()} de Leonida rapprochés des bâtiments de Floride du Sud dont ils s’inspirent, avec l’adresse exacte et le niveau de confiance de la communauté sur chacun.`,
  lead: (label: string, count: number, regions: number) =>
    `La communauté cartographique a rapproché ${count} ${label.toLowerCase()} de Leonida d’une adresse réelle de Floride du Sud, répartis sur ${regions} localités. Rockstar n’en a nommé aucun dans le jeu : chaque ligne ci-dessous est une ressemblance argumentée à partir d’images publiées, pas un fait officiel.`,
  spreadTitle: "Où ils se trouvent",
  spreadLead:
    "Localité la mieux documentée en premier. Chacune a sa propre page.",
  unsettledNote: (count: number) =>
    count === 0
      ? "Tous les rapprochements de cette catégorie sont considérés comme établis par la communauté."
      : `${count} d’entre eux sont jugés incertains par la communauté, et signalés comme tels dans la liste.`,
  directoryTitle: "Tous les rapprochements",
  directoryLead:
    "Par ordre alphabétique. Chaque nom ouvre le pin sur la carte interactive.",
  unsettled: "incertain",
  othersTitle: "Autres catégories",
  mapLink: "Ouvrir la carte interactive",
  credit:
    "Identifications par la communauté cartographique GTADB, réutilisées sous licence CC BY 4.0. Map-6 les remet en forme et les étiquette.",
} as const;

export function generateStaticParams() {
  return getSubtypePages().map((group) => ({
    subtype: subtypeSlug(group.subtype),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, subtype } = await params;
  const group = getSubtypeBySlug(subtype);
  if (!group) return {};

  const copy = locale === "fr" ? FR : EN;
  const plural = await getTranslations({ locale, namespace: "map.subtypePlural" });
  const label = plural(group.subtype);

  return buildMetadata({
    locale,
    title: `${copy.title(label)} | ${SITE.name}`,
    description: copy.description(label, group.matches.length),
    path: `/gta-6-real-life-locations/type/${subtype}`,
    canonicalLocale: locale === "fr" || locale === "en" ? locale : "en",
    hreflangLocales: ["en", "fr"],
    robots:
      locale === "en" || locale === "fr"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

export default async function SubtypePage({ params }: Props) {
  const { locale, subtype } = await params;
  setRequestLocale(locale);
  const group = getSubtypeBySlug(subtype);
  if (!group) notFound();

  const t = await getTranslations("map.subtypes");
  const plural = await getTranslations("map.subtypePlural");
  const copy = locale === "fr" ? FR : EN;
  const label = plural(group.subtype);
  const spread = countMatchesByLocality(group.matches);
  const unsettled = countUnconfirmedMatches(group.matches);
  const localityPages = new Set(
    getLocalityPages().map((page) => page.region),
  );
  const others = getSubtypePages().filter((o) => o.subtype !== group.subtype);

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
      <h1 className="mb-4 text-3xl font-bold">{copy.heading(label)}</h1>
      <p className="text-foreground/70">
        {copy.lead(label, group.matches.length, spread.length)}
      </p>
      <p className="mt-3 text-foreground/70">{copy.unsettledNote(unsettled)}</p>

      <section className="mt-10">
        <h2 className="mb-2 text-xl font-semibold">{copy.spreadTitle}</h2>
        <p className="mb-4 text-foreground/70">{copy.spreadLead}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {spread.map(({ region, count }) => (
            <li key={region}>
              {localityPages.has(region) ? (
                <Link
                  href={`/gta-6-real-life-locations/${localitySlug(region)}`}
                  className="text-accent underline"
                >
                  {region}
                </Link>
              ) : (
                <span className="text-foreground/70">{region}</span>
              )}{" "}
              <span className="text-foreground/40">{count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mb-2 text-xl font-semibold">{copy.directoryTitle}</h2>
        <p className="mb-4 text-foreground/70">{copy.directoryLead}</p>
        <RealWorldMatchList
          matches={group.matches}
          locale={locale}
          subtypeLabel={(value) => t(value)}
          unsettledLabel={copy.unsettled}
        />
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">{copy.othersTitle}</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {others.map((other) => (
            <li key={other.subtype}>
              <Link
                href={`/gta-6-real-life-locations/type/${subtypeSlug(other.subtype)}`}
                className="text-accent underline"
              >
                {plural(other.subtype)}
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
        </Link>{" "}
        ·{" "}
        <Link href="/map" className="underline">
          {copy.mapLink}
        </Link>
      </p>
    </main>
  );
}
