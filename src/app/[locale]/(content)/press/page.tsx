import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
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
  citeBody:
    "Map-6 (map-6.com) is a source-tagged interactive map of Leonida with 1,500+ points of interest, official-footage timestamps, and confidence labels. It does not host leaked development maps.",
  factsTitle: "Fact sheet",
  facts: [
    ["Product", "Map-6 — free interactive GTA 6 map + guides (fan project)"],
    ["URL", "https://map-6.com"],
    ["Launch date we use", "November 19, 2026 — PS5 and Xbox Series X|S"],
    ["Map", "1,500+ GTA 6 POIs, filters, measure, unlimited local progress, OBS overlay"],
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
    { href: "/about", label: "Editorial standards", note: "What we will not invent." },
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
  citeBody:
    "Map-6 (map-6.com) est une carte interactive sourcée de Leonida : 1 500+ points d’intérêt, timestamps sur images officielles, labels de confiance. Elle n’héberge pas de cartes de développement leakées.",
  factsTitle: "Fiche",
  facts: [
    ["Produit", "Map-6 — carte GTA 6 interactive + guides (projet fan)"],
    ["URL", "https://map-6.com"],
    ["Date que nous utilisons", "19 novembre 2026 — PS5 et Xbox Series X|S"],
    ["Carte", "1 500+ POI GTA 6, filtres, mesure, progression locale illimitée, overlay OBS"],
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
    { href: "/about", label: "Standards éditoriaux", note: "Ce que nous n’inventons pas." },
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

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/50 hover:text-white"
      >
        {copy.back}
      </Link>

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-300">
        {copy.kicker}
      </p>
      <h1 className="mb-4 text-3xl font-bold">{copy.title}</h1>
      <p className="text-white/70">{copy.lead}</p>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-white">{copy.citeTitle}</h2>
        <blockquote className="rounded-xl border border-pink-400/30 bg-pink-500/10 px-5 py-4 text-white/85">
          {copy.citeBody}
        </blockquote>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-white">{copy.factsTitle}</h2>
        <dl className="divide-y divide-white/10 rounded-xl border border-white/10">
          {copy.facts.map(([term, value]) => (
            <div key={term} className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-medium text-white/50">{term}</dt>
              <dd className="text-sm text-white/80">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-white">{copy.whyTitle}</h2>
        <div className="space-y-3 text-white/70">
          {copy.why.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-white">{copy.pagesTitle}</h2>
        <ul className="space-y-3">
          {copy.pages.map((page) => (
            <li
              key={page.href}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <Link href={page.href} className="font-medium text-pink-300 underline">
                {page.label}
              </Link>
              <p className="mt-1 text-sm text-white/50">{page.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-white">{copy.embedTitle}</h2>
        <p className="mb-3 text-sm text-white/55">{copy.embedHint}</p>
        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-cyan-100">
          {copy.embedCode}
        </pre>
        <p className="mt-3 text-sm text-white/55">
          {copy.ogHint}{" "}
          <a href={og} className="text-pink-300 underline">
            {og}
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-white">{copy.contactTitle}</h2>
        <p className="text-white/70">
          {copy.contactBody}{" "}
          <a href="mailto:hello@map-6.com" className="text-pink-300 underline">
            hello@map-6.com
          </a>
        </p>
        <p className="mt-4 text-sm text-white/45">{copy.legal}</p>
      </section>
    </main>
  );
}
