/**
 * Guides that stopped making sense once GTA 6 shipped (19 Nov 2026), mapped to
 * the closest live page. `next.config.ts` turns each entry into a 301 under
 * every locale, and `GUIDES` drops them so nothing links to a redirect.
 */
export const RETIRED_GUIDES: Record<string, string> = {
  "gta-6-pc-release-date": "/guides/gta-6-pc-requirements",
  "gta-6-pc-recommended-specs": "/guides/gta-6-pc-requirements",
  "gta-6-preorder-guide": "/guides/gta-6-best-price",
  "gta-6-preorder-ps5-guide": "/guides/gta-6-best-price",
  "gta-6-preorder-price-editions": "/guides/gta-6-ultimate-edition-vs-standard",
  "gta-6-release-time": "/guides/gta-6-release-date",
  "gta-6-preload": "/guides/gta-6-file-size",
  "gta-6-extended-look-how-to-watch": "/guides/gta-6-extended-look-breakdown",
  "hidden-packages-gta-6": "/collectibles/cocaine-flamingos",
  "gta-6-collectibles-map": "/collectibles",
};

/** Pre-launch collectible guesses that the shipped game does not have. */
export const RETIRED_COLLECTIBLE_TYPES: Record<string, string> = {
  "hidden-packages": "cocaine-flamingos",
  "street-art": "waink-locations",
};

/** Slug prefixes of the removed pre-launch sample pins (`hidden-package-01`…). */
export const RETIRED_SAMPLE_PIN_PREFIXES: Record<string, string> = {
  "hidden-package": "cocaine-flamingos",
  "stunt-jump": "stunt-jumps",
  "street-art": "waink-locations",
  wildlife: "wildlife",
};
