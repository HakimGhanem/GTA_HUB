/** Fan recreation of Leonida in Cities: Skylines II (Noasden, ~145h) */
export const CS2_GTA6_MAP = {
  mapId: "153426",
  steamAppUrl:
    "https://store.steampowered.com/app/949230/Cities_Skylines_II/",
  steamAppUrlFr:
    "https://store.steampowered.com/app/949230/Cities_Skylines_II/?l=french",
  creator: "Noasden",
  hours: 145,
  areas: [
    "Vice City",
    "Vice Beach",
    "Leonida Keys",
    "Port Gellhorn",
  ] as const,
} as const;

export function getCs2SteamUrl(locale: string) {
  return locale === "fr" ? CS2_GTA6_MAP.steamAppUrlFr : CS2_GTA6_MAP.steamAppUrl;
}
