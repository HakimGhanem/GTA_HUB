export type LocalizedText = { en: string; fr: string };

export type LicenseId = "cc-by-4.0" | "mit" | "none-declared";

export type AttributionEntry = {
  id: string;
  /** Project or author as they name themselves */
  source: string;
  sourceUrl: string;
  license: LicenseId;
  /** Copyright line to retain — required by MIT, good practice elsewhere */
  copyright?: string;
  /** Where the data or imagery appears on Map-6 */
  used: LocalizedText;
  /** How we changed it — CC BY requires stating modifications */
  changes: LocalizedText;
  /** Dataset paths in this repo, for anyone auditing the claim */
  files?: string[];
  /**
   * Set when the upstream project declares no licence: we credit, we do not
   * claim a grant, and we remove on request.
   */
  byPermission?: boolean;
};

export const LICENSE_LABEL: Record<LicenseId, LocalizedText> = {
  "cc-by-4.0": { en: "CC BY 4.0", fr: "CC BY 4.0" },
  mit: { en: "MIT", fr: "MIT" },
  "none-declared": {
    en: "No licence declared upstream",
    fr: "Aucune licence déclarée en amont",
  },
};

export const LICENSE_URL: Partial<Record<LicenseId, string>> = {
  "cc-by-4.0": "https://creativecommons.org/licenses/by/4.0/",
};

export const ATTRIBUTIONS: AttributionEntry[] = [
  {
    id: "gtadb",
    source: "GTADB / GTA VI Mapping Community",
    sourceUrl: "https://gtadb.org",
    license: "cc-by-4.0",
    copyright: "© GTADB.ORG and contributors",
    used: {
      en: "GTA 6 basemap tiles, the GTA 5 satellite basemap, and imported landmark pins across Leonida.",
      fr: "Tuiles de fond de carte GTA 6, fond satellite GTA 5, et points d'intérêt importés à travers Leonida.",
    },
    changes: {
      en: "Tiles are cached and re-served from our own hosting rather than requested live from gtadb.org. Imported pins are re-slugged, re-categorised for our filters, and given original descriptions; coordinates are unchanged.",
      fr: "Les tuiles sont mises en cache et servies depuis notre hébergement plutôt que demandées en direct à gtadb.org. Les points importés sont re-slugués, re-catégorisés pour nos filtres et dotés de descriptions originales ; les coordonnées sont inchangées.",
    },
    files: ["src/data/gtadb-locations.json", "src/data/gtadb-gta5-locations.json"],
  },
  {
    id: "durtyfree",
    source: "DurtyFree — gta-v-data-dumps",
    sourceUrl: "https://github.com/DurtyFree/gta-v-data-dumps",
    license: "none-declared",
    byPermission: true,
    used: {
      en: "522 GTA 5 world-object pins — ATMs, gas pumps, vending machines, telescopes — on the Los Santos map.",
      fr: "522 points d'objets du monde GTA 5 — distributeurs, pompes à essence, machines à boissons, télescopes — sur la carte de Los Santos.",
    },
    changes: {
      en: "A capped subset of coordinates per object type, converted to our location schema with our own names and descriptions. No stats, models, or files are re-published.",
      fr: "Un sous-ensemble plafonné de coordonnées par type d'objet, converti vers notre schéma de lieux avec nos propres noms et descriptions. Aucune statistique, aucun modèle, aucun fichier n'est republié.",
    },
    files: ["src/data/gta5-world-pois.json"],
  },
  {
    id: "gta-v-map-leaflet",
    source: "RiceaRaul — gta-v-map-leaflet",
    sourceUrl: "https://github.com/RiceaRaul/gta-v-map-leaflet",
    license: "mit",
    copyright: "© RiceaRaul",
    used: {
      en: "Fallback Atlas / Satellite / Grid tile layers for the GTA 5 map when the GTADB satellite set is not configured.",
      fr: "Couches de tuiles Atlas / Satellite / Grid de secours pour la carte GTA 5 quand le jeu satellite GTADB n'est pas configuré.",
    },
    changes: {
      en: "Served as XYZ tiles from our hosting. No source code from the project is used.",
      fr: "Servies comme tuiles XYZ depuis notre hébergement. Aucun code source du projet n'est utilisé.",
    },
  },
  {
    id: "vcmp-livemap",
    source: "huncrys — vcmp-livemap",
    sourceUrl: "https://github.com/huncrys/vcmp-livemap",
    license: "mit",
    copyright: "© huncrys",
    used: {
      en: "Vice City basemap image for the classic GTA Vice City map.",
      fr: "Image de fond de carte de Vice City pour la carte classique GTA Vice City.",
    },
    changes: {
      en: "Used as a static image basemap with our own coordinate bounds. No source code from the project is used.",
      fr: "Utilisée comme fond de carte statique avec nos propres bornes de coordonnées. Aucun code source du projet n'est utilisé.",
    },
  },
  {
    id: "samap",
    source: "SAMAP — Charles Blackwood / DeAardbolMan",
    sourceUrl: "https://github.com/DeAardbolMan/SAMAP",
    license: "none-declared",
    byPermission: true,
    used: {
      en: "San Andreas basemap image for the classic GTA San Andreas map.",
      fr: "Image de fond de carte de San Andreas pour la carte classique GTA San Andreas.",
    },
    changes: {
      en: "Used as a static image basemap with our own coordinate bounds.",
      fr: "Utilisée comme fond de carte statique avec nos propres bornes de coordonnées.",
    },
  },
];

export function attributionById(id: string): AttributionEntry | undefined {
  return ATTRIBUTIONS.find((entry) => entry.id === id);
}

export function hasUnlicensedSources(): boolean {
  return ATTRIBUTIONS.some((entry) => entry.byPermission);
}
