import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RealWorldMatchList } from "@/components/locations/RealWorldMatchList";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import {
  countMatchesBySubtype,
  countUnconfirmedMatches,
  getLocalitiesOnIndex,
  getLocalityPages,
  getRealWorldMatches,
  groupMatchesByLocality,
  localitySlug,
} from "@/lib/real-world-matches";

type Props = { params: Promise<{ locale: string }> };

const EN = {
  title: "GTA 6 Real-Life Locations — Leonida vs South Florida",
  heading: "Which real place is this?",
  description:
    "The buildings of Leonida matched to the South Florida originals they were modelled on: hotels, marinas, power stations and condos, with the exact street address and a confidence label.",
  back: "← Home",
  kicker: "Leonida ↔ South Florida",
  lead: "Rockstar has not named a single building inside GTA 6. What the mapping community has done instead is harder and more useful: stand in Leonida, recognise the façade, and find the South Florida address it was built from. This page is that work, laid out so you can check it.",
  statsTitle: "What is in here",
  stats: {
    matches: "buildings matched to a real address",
    localities: "in-game localities covered",
    unconfirmed: "matches the community still flags as unsettled",
  },
  natureTitle: "What kind of places they are",
  natureLead:
    "The nature of each building comes from the community survey, not from us. It is the quickest way to read the city: Vice Beach is condos and hotels, Port Gellhorn is industry and freight.",
  methodTitle: "How to read this, and what it is not",
  method: [
    "A match is a resemblance argued from footage, not a fact published by Rockstar. The in-game building has no official name, no official address, and may be a composite of several real ones.",
    "Entries marked unsettled are the community's own doubt, carried through rather than hidden. Treat them as leads, not answers.",
    "Some real-world originals no longer stand. Where the survey records a demolition or a change of use, the entry says so — the game may well be modelled on the older building.",
    "None of this comes from leaked development material. It is observation of published trailers and screenshots against public street imagery, which is why it stops at façades and never claims interiors.",
  ],
  directoryTitle: "Browse by locality",
  directoryLead:
    "The best-documented localities each have their own page. Most-documented first.",
  remainderTitle: "Thinly documented localities",
  remainderLead:
    "Too few matches so far to deserve a page of their own, so they are listed here in full.",
  openOnMap: "Open on the map",
  unsettled: "unsettled",
  entryCount: (n: number) => `${n} ${n === 1 ? "building" : "buildings"}`,
  creditTitle: "Credit",
  credit:
    "The correspondence survey is the work of the GTADB mapping community, reused here under CC BY 4.0. Map-6 reformats and labels it; the identifications are theirs.",
  creditLink: "Sources and attributions",
  mapLink: "Open the interactive map",
} as const;

const FR = {
  title: "Lieux réels de GTA 6 — Leonida face à la Floride",
  heading: "Quel lieu réel est-ce ?",
  description:
    "Les bâtiments de Leonida rapprochés des originaux de Floride du Sud dont ils s’inspirent : hôtels, marinas, centrales et immeubles, avec l’adresse exacte et un niveau de confiance.",
  back: "← Accueil",
  kicker: "Leonida ↔ Floride du Sud",
  lead: "Rockstar n’a nommé aucun bâtiment dans GTA 6. Ce que la communauté cartographique a fait à la place est plus difficile et plus utile : se placer dans Leonida, reconnaître une façade, et retrouver l’adresse de Floride du Sud qui a servi de modèle. Cette page est ce travail, présenté pour que vous puissiez le vérifier.",
  statsTitle: "Ce que contient cette page",
  stats: {
    matches: "bâtiments rapprochés d’une adresse réelle",
    localities: "localités du jeu couvertes",
    unconfirmed: "rapprochements que la communauté juge encore incertains",
  },
  natureTitle: "De quels lieux il s’agit",
  natureLead:
    "La nature de chaque bâtiment vient du relevé communautaire, pas de nous. C’est la façon la plus rapide de lire la ville : Vice Beach, ce sont des immeubles et des hôtels ; Port Gellhorn, de l’industrie et du fret.",
  methodTitle: "Comment lire ceci, et ce que ce n’est pas",
  method: [
    "Un rapprochement est une ressemblance argumentée à partir d’images, pas un fait publié par Rockstar. Le bâtiment du jeu n’a ni nom ni adresse officiels, et peut être la synthèse de plusieurs bâtiments réels.",
    "Les entrées marquées incertaines portent le doute de la communauté elle-même, repris ici plutôt que masqué. À traiter comme des pistes, pas comme des réponses.",
    "Certains originaux n’existent plus. Quand le relevé signale une démolition ou un changement d’usage, l’entrée le dit — le jeu s’inspire probablement du bâtiment d’avant.",
    "Rien ne provient de matériel de développement fuité. Il s’agit d’observer les trailers et captures publiés face à l’imagerie de rue publique, ce qui explique que tout s’arrête aux façades et que rien ne prétend décrire les intérieurs.",
  ],
  directoryTitle: "Parcourir par localité",
  directoryLead:
    "Les localités les mieux documentées ont chacune leur page. Les plus documentées d’abord.",
  remainderTitle: "Localités peu documentées",
  remainderLead:
    "Trop peu de rapprochements pour mériter leur propre page : elles sont listées ici en entier.",
  openOnMap: "Ouvrir sur la carte",
  unsettled: "incertain",
  entryCount: (n: number) => `${n} ${n === 1 ? "bâtiment" : "bâtiments"}`,
  creditTitle: "Crédit",
  credit:
    "Le relevé des correspondances est l’œuvre de la communauté cartographique GTADB, réutilisé ici sous licence CC BY 4.0. Map-6 le remet en forme et l’étiquette ; les identifications sont les leurs.",
  creditLink: "Sources et attributions",
  mapLink: "Ouvrir la carte interactive",
} as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = locale === "fr" ? FR : EN;
  return buildMetadata({
    locale,
    title: `${copy.title} | ${SITE.name}`,
    description: copy.description,
    path: "/gta-6-real-life-locations",
    canonicalLocale: locale === "fr" || locale === "en" ? locale : "en",
    hreflangLocales: ["en", "fr"],
    robots:
      locale === "en" || locale === "fr"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

export default async function RealLifeLocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("map.subtypes");
  const copy = locale === "fr" ? FR : EN;

  const matches = getRealWorldMatches();
  const groups = groupMatchesByLocality(matches);
  const localityPages = getLocalityPages();
  const remainder = getLocalitiesOnIndex();
  const natures = countMatchesBySubtype(matches);
  const unconfirmed = countUnconfirmedMatches(matches);
  const numberFormat = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-foreground/50 hover:text-foreground"
      >
        {copy.back}
      </Link>

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
        {copy.kicker}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{copy.heading}</h1>
      <p className="text-foreground/70">{copy.lead}</p>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">{copy.statsTitle}</h2>
        <dl className="grid gap-4 sm:grid-cols-3">
          {(
            [
              [numberFormat.format(matches.length), copy.stats.matches],
              [numberFormat.format(groups.length), copy.stats.localities],
              [numberFormat.format(unconfirmed), copy.stats.unconfirmed],
            ] as const
          ).map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
            >
              <dt className="text-2xl font-bold text-foreground">{value}</dt>
              <dd className="mt-1 text-sm text-foreground/60">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">{copy.natureTitle}</h2>
        <p className="mb-4 text-foreground/70">{copy.natureLead}</p>
        <ul className="flex flex-wrap gap-2">
          {natures.map(({ subtype, count }) => (
            <li
              key={subtype}
              className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-sm text-foreground/70"
            >
              {t(subtype)} · {numberFormat.format(count)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">{copy.methodTitle}</h2>
        <div className="space-y-3 text-foreground/70">
          {copy.method.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-semibold">{copy.directoryTitle}</h2>
        <p className="mb-5 text-foreground/70">{copy.directoryLead}</p>
        <ul className="divide-y divide-foreground/10 rounded-xl border border-foreground/10 [&>li]:flex [&>li]:items-baseline [&>li]:justify-between [&>li]:gap-4 [&>li]:px-4 [&>li]:py-2.5">
          {localityPages.map((group) => (
            <li key={group.region}>
              <Link
                href={`/gta-6-real-life-locations/${localitySlug(group.region)}`}
                className="font-medium text-accent underline"
              >
                {group.region}
              </Link>
              <span className="shrink-0 text-sm text-foreground/50">
                {copy.entryCount(group.matches.length)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {remainder.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-3 text-xl font-semibold">{copy.remainderTitle}</h2>
          <p className="mb-5 text-foreground/70">{copy.remainderLead}</p>
          {remainder.map((group) => (
            <section key={group.region} className="mt-6">
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {group.region}{" "}
                <span className="text-sm font-normal text-foreground/40">
                  {copy.entryCount(group.matches.length)}
                </span>
              </h3>
              <RealWorldMatchList
                matches={group.matches}
                locale={locale}
                subtypeLabel={(subtype) => t(subtype)}
                unsettledLabel={copy.unsettled}
              />
            </section>
          ))}
        </section>
      )}

      <section className="mt-12 rounded-xl border border-foreground/10 bg-foreground/5 p-6">
        <h2 className="mb-2 text-lg font-semibold">{copy.creditTitle}</h2>
        <p className="text-sm text-foreground/70">{copy.credit}</p>
        <p className="mt-3 flex flex-wrap gap-4 text-sm">
          <Link href="/attributions" className="text-accent underline">
            {copy.creditLink}
          </Link>
          <Link href="/map" className="text-accent underline">
            {copy.mapLink}
          </Link>
        </p>
      </section>
    </main>
  );
}
