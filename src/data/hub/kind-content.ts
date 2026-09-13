import type { HubKindParam } from "./index";

/**
 * Evidence tier for an editorial section. Rendered as a visible chip so a
 * reader never has to guess whether a paragraph is fact, footage, or
 * franchise precedent.
 */
export type EvidenceTier = "official" | "trailer" | "precedent" | "policy";

export type KindSection = {
  tier: EvidenceTier;
  heading: string;
  body: string[];
};

export type KindContent = {
  title: string;
  /** Back link to the database hub */
  backLabel: string;
  /** Short line under the H1 — replaces the English-only KIND_BLURB */
  blurb: string;
  intro: string;
  /** Shown instead of an entity list when the category has no entries */
  empty?: { heading: string; body: string };
  sections: KindSection[];
  faq: { question: string; answer: string }[];
  tierLabels: Record<EvidenceTier, string>;
  /** ISO date of the last editorial review — displayed for freshness */
  reviewedAt: string;
  reviewedLabel: string;
};

const EN_TIERS: Record<EvidenceTier, string> = {
  official: "Official — named by Rockstar",
  trailer: "Trailer-visible — type-level only",
  precedent: "GTA 5 precedent — not a GTA 6 fact",
  policy: "Editorial policy",
};

const FR_TIERS: Record<EvidenceTier, string> = {
  official: "Officiel — nommé par Rockstar",
  trailer: "Visible en trailer — type uniquement",
  precedent: "Précédent GTA 5 — pas un fait GTA 6",
  policy: "Règle éditoriale",
};

const REVIEWED_AT = "2026-09-10";

const WEAPONS_EN: KindContent = {
  title: "Weapons",
  backLabel: "← Database",
  blurb:
    "No official GTA 6 weapons list exists yet. Here is what is actually known, sorted by how strong the evidence is.",
  intro:
    "Every “GTA 6 weapons list” circulating today is either a GTA 5 table with the game name swapped, or a datamine presented as an announcement. Rockstar has not published a weapons catalog on Newswire or rockstargames.com/VI, so Map-6 has no rows to show you. What we can do — and what this page is — is state exactly what official footage supports, what franchise precedent suggests, and where the line between the two sits. Three tiers, labelled, so nothing reads as more certain than it is.",
  empty: {
    heading: "No weapon entries — and that is deliberate",
    body: "A table here would mean inventing model names, damage values, or unlock conditions from compressed video. Rows appear when Rockstar names weapons on Newswire or rockstargames.com/VI, each with a citation you can click.",
  },
  sections: [
    {
      tier: "trailer",
      heading: "What official footage supports",
      body: [
        "Firearms are present in the official GTA 6 trailers — handguns are the clearest category, visible in hand during the robbery and confrontation beats, and some shots include longer two-handed firearms. That is the honest ceiling of what trailer footage establishes: a category, not a catalog.",
        "Map-6 stops there on purpose. Telling an assault rifle from a carbine, or a pump shotgun from a semi-auto, means reading a few dozen compressed pixels across a motion-blurred frame — and once a guess like that is written down, aggregators copy it as fact within a week. So we record “handgun” and “long gun” and refuse to go finer. The same rule governs our vehicle entries, which are typed as convertible or police cruiser rather than given fan-assigned model names.",
      ],
    },
    {
      tier: "precedent",
      heading: "What GTA 5 precedent suggests",
      body: [
        "Grand Theft Auto V shipped a weapon wheel grouped into melee, handguns, submachine guns, shotguns, assault rifles, sniper rifles, heavy weapons, and thrown items, bought at Ammu-Nation and customised with scopes, suppressors, extended magazines, and finishes. That structure survived a decade of GTA Online updates, so it is a reasonable expectation for GTA 6 — and an expectation is all it is.",
        "It is worth being explicit about why we label this rather than fold it into the page as background: Rockstar changes core systems between entries. Read this tier as “how the studio has done it before,” never as a preview of the GTA 6 wheel, and treat any site presenting GTA 5 categories as a GTA 6 list as the copy-paste it is.",
      ],
    },
    {
      tier: "policy",
      heading: "What will put rows on this page",
      body: [
        "Two triggers: Rockstar naming weapons in official material, or named weapons appearing in official gameplay footage we can cite by timestamp. Each row then carries its source link and a confidence chip, exactly like the characters and vehicles sections. Datamines, decompiled strings, and leaked build inventories do not qualify — not because they are always wrong, but because we cannot show you a source you are able to verify, and Rockstar cuts content between builds.",
        "This page was last reviewed on the date below; official beats land on their own schedule, so check the news feed for anything newer. In the meantime, the map is where weapon-adjacent geography actually lives — Ammu-Nation-style storefronts, police response zones, and the districts where trailer shootouts were staged.",
      ],
    },
  ],
  faq: [
    {
      question: "Is there an official GTA 6 weapons list?",
      answer:
        "No. Rockstar has not published a weapons catalog on Newswire or rockstargames.com/VI. Any complete list you find today is either GTA 5's weapon table relabelled, or a datamine presented as an announcement.",
    },
    {
      question: "What weapons are visible in the GTA 6 trailers?",
      answer:
        "At type level: handguns are clearly visible in hand, and some shots include longer two-handed firearms. Official footage does not identify models, so Map-6 records categories rather than naming a pistol or a rifle it cannot verify.",
    },
    {
      question: "Will GTA 6 have Ammu-Nation and weapon customisation?",
      answer:
        "Unconfirmed. GTA 5 sold weapons at Ammu-Nation with scopes, suppressors, magazines, and finishes, and that structure held through GTA Online — which makes it a reasonable expectation, not a fact. Rockstar has not described the GTA 6 system.",
    },
    {
      question: "Why do other sites already have full GTA 6 weapon tables?",
      answer:
        "Because empty pages earn nothing and invented pages earn clicks. Those tables usually reuse GTA 5 stats or leaked build strings. Map-6 keeps the category empty and cites sources when they exist, which is slower and less impressive until launch confirms who was guessing.",
    },
  ],
  tierLabels: EN_TIERS,
  reviewedAt: REVIEWED_AT,
  reviewedLabel: "Last reviewed",
};

const WEAPONS_FR: KindContent = {
  title: "Armes",
  backLabel: "← Base",
  blurb:
    "Aucune liste officielle des armes de GTA 6 n'existe à ce jour. Voici ce qui est réellement établi, classé par solidité de la preuve.",
  intro:
    "Toutes les « listes des armes de GTA 6 » qui circulent aujourd'hui sont soit un tableau GTA 5 dont on a changé le nom du jeu, soit un datamine présenté comme une annonce. Rockstar n'a publié aucun catalogue d'armes sur Newswire ni sur rockstargames.com/VI : Map-6 n'a donc aucune ligne à afficher. Ce que nous pouvons faire — et c'est l'objet de cette page — c'est dire précisément ce que les images officielles établissent, ce que le précédent de la série suggère, et où passe la frontière entre les deux. Trois niveaux, étiquetés, pour que rien ne paraisse plus certain qu'il ne l'est.",
  empty: {
    heading: "Aucune entrée — et c'est volontaire",
    body: "Un tableau ici signifierait inventer des noms de modèles, des dégâts ou des conditions de déblocage à partir de vidéo compressée. Les lignes apparaîtront quand Rockstar nommera des armes sur Newswire ou rockstargames.com/VI, chacune avec une source cliquable.",
  },
  sections: [
    {
      tier: "trailer",
      heading: "Ce que les images officielles établissent",
      body: [
        "Des armes à feu sont présentes dans les trailers officiels de GTA 6 : les armes de poing sont la catégorie la plus nette, visibles en main pendant les séquences de braquage et de confrontation, et certains plans montrent des armes longues à deux mains. C'est le plafond honnête de ce qu'un trailer établit : une catégorie, pas un catalogue.",
        "Map-6 s'arrête là délibérément. Distinguer un fusil d'assaut d'une carabine, ou un fusil à pompe d'un semi-automatique, revient à lire quelques dizaines de pixels compressés sur une image en mouvement — et une fois qu'une supposition de ce genre est écrite, les agrégateurs la recopient comme un fait en une semaine. Nous enregistrons donc « arme de poing » et « arme longue », sans aller plus loin. C'est la même règle que pour nos véhicules, typés « cabriolet » ou « voiture de police » plutôt qu'affublés de noms de modèles attribués par les fans.",
      ],
    },
    {
      tier: "precedent",
      heading: "Ce que le précédent GTA 5 suggère",
      body: [
        "Grand Theft Auto V proposait une roue d'armes organisée en corps-à-corps, armes de poing, pistolets-mitrailleurs, fusils à pompe, fusils d'assaut, fusils de précision, armes lourdes et objets lancés, achetées chez Ammu-Nation et personnalisables (lunettes, silencieux, chargeurs étendus, finitions). Cette structure a survécu à dix ans de mises à jour GTA Online : c'est donc une attente raisonnable pour GTA 6 — et ce n'est qu'une attente.",
        "Autant dire pourquoi nous l'étiquetons au lieu de la fondre dans le décor : Rockstar change des systèmes entiers d'un épisode à l'autre. Lisez ce niveau comme « la façon dont le studio a procédé jusqu'ici », jamais comme un aperçu de la roue de GTA 6 — et considérez tout site qui présente les catégories de GTA 5 comme une liste GTA 6 pour ce qu'il est : un copier-coller.",
      ],
    },
    {
      tier: "policy",
      heading: "Ce qui fera apparaître des lignes ici",
      body: [
        "Deux déclencheurs : Rockstar nommant des armes dans un support officiel, ou des armes nommées apparaissant dans du gameplay officiel que nous pouvons citer au timestamp. Chaque ligne portera alors sa source et un indicateur de confiance, exactement comme les sections personnages et véhicules. Les datamines, chaînes décompilées et inventaires de builds fuités ne qualifient pas — non parce qu'ils sont toujours faux, mais parce que nous ne pouvons pas vous montrer une source vérifiable, et parce que Rockstar coupe du contenu entre deux builds.",
        "Cette page a été revue à la date indiquée ci-dessous ; les annonces officielles arrivent à leur propre rythme, donc consultez le fil d'actus pour toute nouveauté. En attendant, la géographie liée aux armes est sur la carte : boutiques de type Ammu-Nation, zones de réponse policière, et les quartiers où les fusillades des trailers ont été mises en scène.",
      ],
    },
  ],
  faq: [
    {
      question: "Existe-t-il une liste officielle des armes de GTA 6 ?",
      answer:
        "Non. Rockstar n'a publié aucun catalogue d'armes sur Newswire ni sur rockstargames.com/VI. Toute liste complète trouvable aujourd'hui est soit le tableau d'armes de GTA 5 réétiqueté, soit un datamine présenté comme une annonce.",
    },
    {
      question: "Quelles armes voit-on dans les trailers de GTA 6 ?",
      answer:
        "Au niveau du type : des armes de poing clairement visibles en main, et des armes longues à deux mains sur certains plans. Les images officielles n'identifient aucun modèle, donc Map-6 enregistre des catégories plutôt que de nommer un pistolet ou un fusil qu'il ne peut pas vérifier.",
    },
    {
      question: "GTA 6 aura-t-il Ammu-Nation et la personnalisation d'armes ?",
      answer:
        "Non confirmé. GTA 5 vendait les armes chez Ammu-Nation avec lunettes, silencieux, chargeurs et finitions, et cette structure a tenu tout GTA Online — ce qui en fait une attente raisonnable, pas un fait. Rockstar n'a pas décrit le système de GTA 6.",
    },
    {
      question: "Pourquoi d'autres sites ont-ils déjà des tableaux complets ?",
      answer:
        "Parce qu'une page vide ne rapporte rien et qu'une page inventée rapporte des clics. Ces tableaux recyclent en général les stats de GTA 5 ou des chaînes de builds fuités. Map-6 laisse la catégorie vide et cite ses sources quand elles existent : plus lent et moins impressionnant, jusqu'à ce que la sortie révèle qui devinait.",
    },
  ],
  tierLabels: FR_TIERS,
  reviewedAt: REVIEWED_AT,
  reviewedLabel: "Dernière révision",
};

const CHARACTERS_EN: KindContent = {
  title: "Characters",
  backLabel: "← Database",
  blurb:
    "People Rockstar has named on rockstargames.com/VI or Newswire. No leak-cast extras.",
  intro:
    "Named cast only. Every entry links the official page or Newswire post that names the character, and carries a confidence chip. Supporting names pulled from leaked builds or fan wikis are not listed here, however widely they circulate.",
  sections: [],
  faq: [],
  tierLabels: EN_TIERS,
  reviewedAt: REVIEWED_AT,
  reviewedLabel: "Last reviewed",
};

const VEHICLES_EN: KindContent = {
  title: "Vehicles",
  backLabel: "← Database",
  blurb:
    "Generic types clearly visible in official trailers — not fan-assigned in-game names.",
  intro:
    "Typed by what the footage shows: convertible, police cruiser, quad, boat. Rockstar has not published a GTA 6 vehicle list, so we describe categories rather than assigning the in-game names fan sites invent from a single trailer frame.",
  sections: [],
  faq: [],
  tierLabels: EN_TIERS,
  reviewedAt: REVIEWED_AT,
  reviewedLabel: "Last reviewed",
};

const CONTENT: Record<HubKindParam, Record<string, KindContent>> = {
  characters: { en: CHARACTERS_EN },
  vehicles: { en: VEHICLES_EN },
  weapons: { en: WEAPONS_EN, fr: WEAPONS_FR },
};

/**
 * Locales with fully written copy for a category — including entity summaries,
 * which are English-only today. Drives canonical, hreflang and noindex so the
 * six locale variants stop competing with each other as duplicate English.
 */
export function hubKindLocales(kind: HubKindParam): string[] {
  return Object.keys(CONTENT[kind]);
}

export function hasHubKindTranslation(
  kind: HubKindParam,
  locale: string,
): boolean {
  return Boolean(CONTENT[kind][locale]);
}

export function getHubKindContent(
  kind: HubKindParam,
  locale: string,
): KindContent {
  return CONTENT[kind][locale] ?? CONTENT[kind].en;
}

/**
 * A category earns indexing when it has entries to show or editorial substance
 * explaining the gap. An empty category with neither stays out of the index.
 */
export function isIndexableKind(
  kind: HubKindParam,
  entityCount: number,
): boolean {
  if (entityCount > 0) return true;
  return getHubKindContent(kind, "en").sections.length > 0;
}
