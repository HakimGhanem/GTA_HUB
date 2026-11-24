import type { Location } from "./locations";

type Localized = { en: string; fr: string };

export type CollectibleType = {
  slug: string;
  name: string;
  nameFr: string;
  description: string;
  descriptionFr: string;
  icon: string;
  /** Count in the in-game Progress menu, as reported by the sources below. */
  total?: number;
  /** How many the 100% Completion checklist asks for. */
  required?: number;
  /** Where the counter lives in the pause menu. */
  track: Localized;
};

export type Collectible = {
  slug: string;
  name: string;
  description: string;
  type: string;
  x: number;
  y: number;
  region: string;
};

/**
 * Totals and 100% requirements as printed by PowerPyx's checklist and GTABase's
 * 100% guide on 18 Nov 2026 (cross-checked against GTA Wiki and Viceboard).
 * Rockstar publishes no collectible tables; a patch can move these numbers.
 */
export const COLLECTIBLE_SOURCES = [
  { name: "PowerPyx — 100% Completion Checklist", url: "https://www.powerpyx.com/gta-6-100-completion-checklist-guide/" },
  { name: "GTA Wiki — 100% Completion in GTA VI", url: "https://gta.wiki/w/100%25_Completion_in_GTA_VI" },
  { name: "Viceboard — Collectibles by type", url: "https://viceboard.com/guides/gta-6-collectibles-guide/" },
] as const;

export const COLLECTIBLES_CHECKED_AT = "2026-11-23";

export const COLLECTIBLE_TYPES: CollectibleType[] = [
  {
    slug: "cocaine-flamingos",
    name: "Cocaine Flamingos",
    nameFr: "Flamants roses à cocaïne",
    description:
      "125 pink lawn flamingos with a black-and-white beak hide a cocaine package. Shoot one to break it; 100 count for 100%.",
    descriptionFr:
      "125 flamants roses de jardin au bec noir et blanc cachent un paquet de cocaïne. Tirez dessus pour les casser ; 100 comptent pour le 100 %.",
    icon: "🦩",
    total: 125,
    required: 100,
    track: {
      en: "Progress › Collections › Exploration › Cocaine Flamingos",
      fr: "Progression › Collections › Exploration › Flamants roses à cocaïne",
    },
  },
  {
    slug: "collectible-cards",
    name: "Collectible Cards",
    nameFr: "Cartes à collectionner",
    description:
      "480 unique cards in 18 sets of 18 to 36. The 100% checklist needs every card from any 15 sets.",
    descriptionFr:
      "480 cartes uniques réparties en 18 sets de 18 à 36. Le 100 % demande toutes les cartes de 15 sets au choix.",
    icon: "🃏",
    total: 480,
    required: 15,
    track: {
      en: "Progress › Collections › Collectible Cards",
      fr: "Progression › Collections › Cartes à collectionner",
    },
  },
  {
    slug: "stunt-jumps",
    name: "Stunts & Stunt Jumps",
    nameFr: "Cascades et sauts",
    description:
      "397 stunts in four families: 130 stunt jumps, 202 under-the-bridge flights, 40 knife flights and 25 base jumps. 300 count for 100%.",
    descriptionFr:
      "397 cascades en quatre familles : 130 sauts, 202 passages sous les ponts, 40 vols en lame de couteau et 25 sauts en base jump. 300 comptent pour le 100 %.",
    icon: "🚀",
    total: 397,
    required: 300,
    track: {
      en: "Progress › Activities › Stunts",
      fr: "Progression › Activités › Cascades",
    },
  },
  {
    slug: "waink-locations",
    name: "WAiNK Locations",
    nameFr: "Lieux WAiNK",
    description:
      "Landmarks, curiosities, sculptures and No Flusher tags you scan with the in-game phone on foot. 100 scans count for 100%.",
    descriptionFr:
      "Monuments, curiosités, sculptures et tags No Flusher à scanner à pied avec le téléphone du jeu. 100 scans comptent pour le 100 %.",
    icon: "📱",
    required: 100,
    track: {
      en: "Progress › Collections › WAiNK Locations",
      fr: "Progression › Collections › Lieux WAiNK",
    },
  },
  {
    slug: "underwater-discoveries",
    name: "Underwater Discoveries",
    nameFr: "Découvertes sous-marines",
    description:
      "33 sunken wrecks tied to Kenton's treasure-diving questline. All 33 are required for 100%.",
    descriptionFr:
      "33 épaves liées à la quête de plongée de Kenton. Les 33 sont obligatoires pour le 100 %.",
    icon: "🤿",
    total: 33,
    required: 33,
    track: {
      en: "Progress › Collections › Exploration › Underwater Discoveries",
      fr: "Progression › Collections › Exploration › Découvertes sous-marines",
    },
  },
  {
    slug: "magazines",
    name: "Magazines, Books & Comics",
    nameFr: "Magazines, livres et BD",
    description:
      "27 magazines, books and comics plus 7 book swaps, 34 in all. Duplicates don't count; 30 unique ones are needed for 100%.",
    descriptionFr:
      "27 magazines, livres et BD plus 7 échanges de livres, 34 au total. Les doublons ne comptent pas ; il en faut 30 différents pour le 100 %.",
    icon: "📚",
    total: 34,
    required: 30,
    track: {
      en: "Progress › Collections › Exploration › Magazines, Books & Comics / Book Swaps",
      fr: "Progression › Collections › Exploration › Magazines, livres et BD / Échanges de livres",
    },
  },
  {
    slug: "meditation-spots",
    name: "Meditation Spots",
    nameFr: "Spots de méditation",
    description: "18 meditations at 10 spots: meditating as both Lucia and Jason at the same spot counts twice. 15 count for 100%.",
    descriptionFr: "18 méditations sur 10 spots : méditer avec Lucia et Jason au même endroit compte double. 15 comptent pour le 100 %.",
    icon: "🧘",
    total: 18,
    required: 15,
    track: {
      en: "Progress › Collections › Exploration › Meditations",
      fr: "Progression › Collections › Exploration › Méditations",
    },
  },
  {
    slug: "wildlife",
    name: "Animals",
    nameFr: "Animaux",
    description:
      "255 species including 35 fish. Study any 100 through binoculars for 100% — no hunting required for the count.",
    descriptionFr:
      "255 espèces dont 35 poissons. Observez-en 100 aux jumelles pour le 100 % — la chasse n'est pas nécessaire pour ce compteur.",
    icon: "🐊",
    total: 255,
    required: 100,
    track: {
      en: "Progress › Animals",
      fr: "Progression › Animaux",
    },
  },
];

/**
 * Pins with verified in-game coordinates. Empty until a sourced position can be
 * placed; the pre-launch sample pins were guesses and were removed.
 */
export const COLLECTIBLES: Collectible[] = [];

export function collectiblesAsMapLocations(): Location[] {
  return COLLECTIBLES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    category: "collectible" as const,
    x: c.x,
    y: c.y,
    region: c.region,
    source: "community",
    confidence: "community" as const,
  }));
}

export function getCollectibleType(slug: string) {
  return COLLECTIBLE_TYPES.find((t) => t.slug === slug);
}

export function getCollectiblesByType(type: string) {
  return COLLECTIBLES.filter((c) => c.type === type);
}

export function getCollectibleBySlug(slug: string) {
  return COLLECTIBLES.find((c) => c.slug === slug);
}

export function collectibleName(type: CollectibleType, locale: string) {
  return locale === "fr" ? type.nameFr : type.name;
}

export function collectibleDescription(type: CollectibleType, locale: string) {
  return locale === "fr" ? type.descriptionFr : type.description;
}
