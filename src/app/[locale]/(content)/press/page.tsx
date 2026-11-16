import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllLocations } from "@/data/all-locations";
import { SITE } from "@/lib/constants";
import { hasPhotoPair } from "@/lib/gtadb-photos";
import { GTADB_SYNCED_AT } from "@/lib/location-freshness";
import { getRealWorldMatches, groupMatchesByLocality } from "@/lib/real-world-matches";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const EN = {
  title: "Press kit — Map-6",
  description:
    "Cite Map-6: source-tagged interactive GTA 6 map of Leonida, official-footage timestamps, no leaked development maps. Fact sheet, suggested wording, and contact.",
  back: "← Home",
  kicker: "For journalists and researchers",
  lead:
    "GamesRadar’s GTA 6 map roundup cites “interactive map sites such as State of Leonida and gta6map.io.” Map-6 is built to be the third name in that sentence — and the safer one, because we do not reproduce leaked development maps.",
  citeTitle: "Suggested citation",
  citeBody: (matches: string) =>
    `Map-6 (map-6.com) is a source-tagged interactive map of Leonida. Over ${matches} of its pins are matched to the real South Florida building they were modelled on, by the GTADB community under CC BY 4.0; a smaller set of landmarks is placed from official footage with trailer timestamps. Every pin carries a confidence label, and none of it comes from leaked development maps.`,
  factsTitle: "Fact sheet",
  facts: [
    ["Product", "Map-6 — free interactive GTA 6 map + guides (fan project)"],
    ["URL", "https://map-6.com"],
    ["Launch date we use", "November 19, 2026 — PS5 and Xbox Series X|S"],
    ["Map", "Real-world address matches, side-by-side game/reality photos, 3D tilt, filters, measure, unlimited local progress, OBS overlay"],
    ["Freshness", "Checked against the GTADB community survey every hour during launch week; every change dated on /updates"],
    ["Also", "GTA 5 / Vice City / San Andreas maps in the same UI"],
    ["Locales indexed", "English and French"],
    ["Editorial line", "Official frames first. Speculation labeled. No fake collectible totals."],
    ["Basemap", "Community tiles (GTADB / GTA VI Mapping Community, CC BY 4.0)"],
    ["Not", "Rockstar-affiliated. Not a leak wiki. Not a mobile App Store binary."],
  ],
  whyTitle: "Why cite Map-6 instead of a leak map",
  why: [
    "GamesRadar’s own map article skipped August 2026 leak stills because Rockstar is issuing DMCA takedowns. We made the same call. A citation that survives a takedown week is worth more than a hotter screenshot.",
    "State of Leonida is the community reconstruction. gta6map.io is a clean Extended Look list. Map-6 is the list plus geography: every Extended Look beat on /trailer opens the official YouTube offset and, when the terrain is readable, a regional hub.",
    "Pins carry confidence labels (confirmed / trailer / community / rumor). That is the sentence an editor can copy without laundering Discord as Rockstar.",
  ],
  pagesTitle: "Pages worth linking",
  pages: [
    { href: "/map", label: "Interactive map", note: "Primary product. Deep links: ?loc=vice-city" },
    { href: "/trailer", label: "Timestamped Extended Look", note: "Official upload + map hubs. Age-restricted: opens YouTube." },
    { href: "/guides/gta-6-extended-look-breakdown", label: "Extended Look breakdown", note: "Systems recap — wanted, combat, robberies, scale." },
    { href: "/guides/gta-6-wanted-system", label: "Wanted system", note: "Interactive six-star HUD. Visible vs preview-only." },
    { href: "/guides/gta-6-map-size", label: "Map size", note: "Official slogans vs TGG/GamesRadar preview language vs km² estimates." },
    { href: "/gta-6-real-life-locations", label: "Real-life locations", note: "Every Leonida building matched to its South Florida original, with game-vs-reality photos." },
    { href: "/updates", label: "Map changelog", note: "Dated diff of every sync, hourly upstream check, RSS." },
    { href: "/about", label: "Editorial standards", note: "What we will not invent." },
  ],
  statsTitle: "Live numbers",
  statsLead: (day: string) => `Computed from the map data on every build. Last GTADB sync: ${day}.`,
  stats: {
    pins: "pins on the map",
    matches: "buildings matched to a real address",
    localities: "in-game localities documented",
    pairs: "game-vs-reality photo pairs",
  },
  anglesTitle: "Story angles, with the numbers",
  angles: (n: { hotels: string; demolished: string; pairs: string; top: string; topCount: string }) => [
    `${n.hotels} Leonida hotels are modelled on real South Florida hotels — the full list, with addresses, is on /gta-6-real-life-locations/type/hotels.`,
    `${n.demolished} in-game buildings copy a real building that has since been demolished: GTA 6 may preserve a Miami that no longer exists.`,
    `${n.pairs} buildings can be compared side by side, in-game screenshot against a photo of the original.`,
    `${n.top} is the most documented locality so far, with ${n.topCount} identified buildings.`,
  ],
  embedTitle: "Embed / link snippet",
  embedHint: "We do not ship a third-party iframe of the map (tiles + JS are heavy). Use a text link or the OG card.",
  embedCode: `<p>Explore Leonida on <a href="https://map-6.com/en/map">Map-6’s interactive GTA 6 map</a>.</p>`,
  ogHint: "Social card (1200×630):",
  contactTitle: "Contact",
  contactBody: "Press, corrections, and partnerships:",
  legal:
    "Rockstar Games, Grand Theft Auto, and GTA are trademarks of their respective owners. Map-6 is a fan project and is not endorsed by Rockstar Games or Take-Two Interactive.",
} as const;

const FR = {
  title: "Kit presse — Map-6",
  description:
    "Citer Map-6 : carte GTA 6 sourcée de Leonida, timestamps sur images officielles, pas de carte leak. Fiche, formulation, contact.",
  back: "← Accueil",
  kicker: "Pour journalistes et chercheurs",
  lead:
    "Le tour d’horizon carte de GamesRadar cite « State of Leonida et gta6map.io ». Map-6 est conçu pour être le troisième nom de cette phrase — et le plus sûr, parce que nous ne reproduisons pas les cartes leak.",
  citeTitle: "Citation suggérée",
  citeBody: (matches: string) =>
    `Map-6 (map-6.com) est une carte interactive sourcée de Leonida. Plus de ${matches} de ses pins sont rapprochés du bâtiment réel de Floride du Sud dont ils s’inspirent, par la communauté GTADB sous licence CC BY 4.0 ; un ensemble plus restreint de repères est placé d’après les images officielles, avec timestamps. Chaque pin porte un label de confiance, et rien ne provient de cartes de développement leakées.`,
  factsTitle: "Fiche",
  facts: [
    ["Produit", "Map-6 — carte GTA 6 interactive + guides (projet fan)"],
    ["URL", "https://map-6.com"],
    ["Date que nous utilisons", "19 novembre 2026 — PS5 et Xbox Series X|S"],
    ["Carte", "Correspondances avec des adresses réelles, photos jeu/réel côte à côte, vue 3D inclinée, filtres, mesure, progression locale illimitée, overlay OBS"],
    ["Fraîcheur", "Comparée au relevé communautaire GTADB toutes les heures pendant la semaine de lancement ; chaque changement daté sur /updates"],
    ["Aussi", "Cartes GTA 5 / Vice City / San Andreas dans la même UI"],
    ["Locales indexées", "Anglais et français"],
    ["Ligne éditoriale", "Plans officiels d’abord. Spéculation étiquetée. Pas de faux totaux collectibles."],
    ["Basemap", "Tuiles communautaires (GTADB / GTA VI Mapping Community, CC BY 4.0)"],
    ["Pas", "Affilié Rockstar. Pas un wiki leak. Pas une app store native."],
  ],
  whyTitle: "Pourquoi citer Map-6 plutôt qu’une carte leak",
  why: [
    "L’article carte de GamesRadar a sauté les stills leak d’août 2026 : Rockstar envoie des DMCA. Nous avons fait le même choix. Une citation qui survit à une semaine de takedown vaut plus qu’un screenshot plus chaud.",
    "State of Leonida est la reconstruction communautaire. gta6map.io est une liste Extended Look propre. Map-6, c’est la liste plus la géographie : chaque passage sur /trailer ouvre l’offset YouTube officiel et, si le terrain est lisible, un hub régional.",
    "Les pins portent un label de confiance (confirmé / trailer / communauté / rumeur). C’est la phrase qu’un éditeur peut copier sans laver du Discord en fait Rockstar.",
  ],
  pagesTitle: "Pages à lier",
  pages: [
    { href: "/map", label: "Carte interactive", note: "Produit principal. Deep links : ?loc=vice-city" },
    { href: "/trailer", label: "Extended Look horodaté", note: "Upload officiel + hubs. Restreint par âge : ouvre YouTube." },
    { href: "/guides/gta-6-extended-look-breakdown", label: "Breakdown Extended Look", note: "Recap systèmes — wanted, combat, braquages, échelle." },
    { href: "/guides/gta-6-wanted-system", label: "Système wanted", note: "HUD six étoiles interactif. Visible vs preview." },
    { href: "/guides/gta-6-map-size", label: "Taille de carte", note: "Slogans officiels vs langage preview TGG/GamesRadar vs km²." },
    { href: "/gta-6-real-life-locations", label: "Lieux réels", note: "Chaque bâtiment de Leonida rapproché de son original de Floride, avec photos jeu/réel." },
    { href: "/updates", label: "Journal de la carte", note: "Diff daté de chaque synchronisation, vérification horaire, RSS." },
    { href: "/about", label: "Standards éditoriaux", note: "Ce que nous n’inventons pas." },
  ],
  statsTitle: "Chiffres en direct",
  statsLead: (day: string) =>
    `Calculés à partir des données de la carte à chaque build. Dernière synchronisation GTADB : ${day}.`,
  stats: {
    pins: "pins sur la carte",
    matches: "bâtiments rapprochés d’une adresse réelle",
    localities: "localités du jeu documentées",
    pairs: "paires de photos jeu/réel",
  },
  anglesTitle: "Angles d’article, chiffres à l’appui",
  angles: (n: { hotels: string; demolished: string; pairs: string; top: string; topCount: string }) => [
    `${n.hotels} hôtels de Leonida s’inspirent d’hôtels réels de Floride du Sud — la liste complète, avec adresses, est sur /gta-6-real-life-locations/type/hotels.`,
    `${n.demolished} bâtiments du jeu copient un bâtiment réel démoli depuis : GTA 6 pourrait conserver un Miami qui n’existe plus.`,
    `${n.pairs} bâtiments se comparent côte à côte, capture du jeu contre photo de l’original.`,
    `${n.top} est la localité la plus documentée à ce jour, avec ${n.topCount} bâtiments identifiés.`,
  ],
  embedTitle: "Snippet lien / embed",
  embedHint:
    "Pas d’iframe tiers de la carte (tuiles + JS trop lourds). Lien texte ou carte OG.",
  embedCode: `<p>Explorer Leonida sur <a href="https://map-6.com/fr/map">la carte interactive GTA 6 de Map-6</a>.</p>`,
  ogHint: "Carte sociale (1200×630) :",
  contactTitle: "Contact",
  contactBody: "Presse, corrections, partenariats :",
  legal:
    "Rockstar Games, Grand Theft Auto et GTA sont des marques de leurs propriétaires. Map-6 est un projet de fans, non approuvé par Rockstar Games ni Take-Two Interactive.",
} as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = locale === "fr" ? FR : EN;
  return buildMetadata({
    locale,
    title: `${copy.title} | ${SITE.name}`,
    description: copy.description,
    path: "/press",
    canonicalLocale: locale === "fr" || locale === "en" ? locale : "en",
    hreflangLocales: ["en", "fr"],
    robots:
      locale === "en" || locale === "fr"
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = locale === "fr" ? FR : EN;
  const og = `${SITE.url}/api/og/guide/${locale === "fr" ? "fr" : "en"}/gta-6-extended-look-breakdown`;

  const num = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");
  const all = getAllLocations();
  const matches = getRealWorldMatches();
  const localities = groupMatchesByLocality(matches);
  const pairs = matches.filter(hasPhotoPair).length;
  // Floor to the hundred so the citation stays true between syncs.
  const matchesFloor = num.format(Math.floor(matches.length / 100) * 100);
  const angles = copy.angles({
    hotels: num.format(matches.filter((m) => m.subtype === "hotel").length),
    demolished: num.format(matches.filter((m) => m.description.includes("demolished")).length),
    pairs: num.format(pairs),
    top: localities[0]?.region ?? "Vice City",
    topCount: num.format(localities[0]?.matches.length ?? 0),
  });
  const syncDay = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${GTADB_SYNCED_AT}T00:00:00Z`));

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-foreground/50 hover:text-foreground"
      >
        {copy.back}
      </Link>

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
        {copy.kicker}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{copy.title}</h1>
      <p className="text-foreground/70">{copy.lead}</p>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.citeTitle}</h2>
        <blockquote className="rounded-xl border border-pink-400/30 bg-pink-500/10 px-5 py-4 text-foreground/85">
          {copy.citeBody(matchesFloor)}
        </blockquote>
      </section>

      <section className="mt-10">
        <h2 className="mb-1 text-xl font-semibold text-foreground">{copy.statsTitle}</h2>
        <p className="mb-4 text-sm text-foreground/55">{copy.statsLead(syncDay)}</p>
        <dl className="grid gap-3 sm:grid-cols-4">
          {(
            [
              [all.length, copy.stats.pins],
              [matches.length, copy.stats.matches],
              [localities.length, copy.stats.localities],
              [pairs, copy.stats.pairs],
            ] as const
          ).map(([value, label]) => (
            <div key={label} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
              <dt className="text-2xl font-bold text-foreground">{num.format(value)}</dt>
              <dd className="mt-1 text-xs text-foreground/60">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.anglesTitle}</h2>
        <ul className="list-disc space-y-2 pl-5 text-foreground/75">
          {angles.map((angle) => (
            <li key={angle.slice(0, 32)}>{angle}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.factsTitle}</h2>
        <dl className="divide-y divide-white/10 rounded-xl border border-foreground/10">
          {copy.facts.map(([term, value]) => (
            <div key={term} className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-medium text-foreground/50">{term}</dt>
              <dd className="text-sm text-foreground/80">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.whyTitle}</h2>
        <div className="space-y-3 text-foreground/70">
          {copy.why.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.pagesTitle}</h2>
        <ul className="space-y-3">
          {copy.pages.map((page) => (
            <li
              key={page.href}
              className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3"
            >
              <Link href={page.href} className="font-medium text-accent underline">
                {page.label}
              </Link>
              <p className="mt-1 text-sm text-foreground/50">{page.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.embedTitle}</h2>
        <p className="mb-3 text-sm text-foreground/55">{copy.embedHint}</p>
        <pre className="overflow-x-auto rounded-xl border border-foreground/10 bg-black/40 p-4 text-xs text-cyan-100">
          {copy.embedCode}
        </pre>
        <p className="mt-3 text-sm text-foreground/55">
          {copy.ogHint}{" "}
          <a href={og} className="text-accent underline">
            {og}
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-foreground">{copy.contactTitle}</h2>
        <p className="text-foreground/70">
          {copy.contactBody}{" "}
          <a href="mailto:hello@map-6.com" className="text-accent underline">
            hello@map-6.com
          </a>
        </p>
        <p className="mt-4 text-sm text-foreground/45">{copy.legal}</p>
      </section>
    </main>
  );
}
