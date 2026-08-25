import { SITE } from "@/lib/constants";
import { CHARACTERS } from "./characters";
import type { HubConfidence, HubEntity, HubKind } from "./types";
import { VEHICLES } from "./vehicles";
import { WEAPONS } from "./weapons";

export type { HubConfidence, HubEntity, HubKind, HubLocaleHint, HubSource } from "./types";

export const HUB_KIND_PARAMS = ["characters", "vehicles", "weapons"] as const;
export type HubKindParam = (typeof HUB_KIND_PARAMS)[number];

export const KIND_FROM_PARAM: Record<HubKindParam, HubKind> = {
  characters: "character",
  vehicles: "vehicle",
  weapons: "weapon",
};

export const PARAM_FROM_KIND: Record<HubKind, HubKindParam> = {
  character: "characters",
  vehicle: "vehicles",
  weapon: "weapons",
};

export const KIND_TITLE: Record<HubKindParam, string> = {
  characters: "Characters",
  vehicles: "Vehicles",
  weapons: "Weapons",
};

export const KIND_BLURB: Record<HubKindParam, string> = {
  characters:
    "People Rockstar has named on rockstargames.com/VI or Newswire. No leak-cast extras.",
  vehicles:
    "Generic types clearly visible in official trailers — not fan-assigned in-game names.",
  weapons:
    "No official GTA 6 weapons list yet. We leave this empty rather than invent one.",
};

export const CONFIDENCE_LABEL: Record<HubConfidence, string> = {
  confirmed: "Confirmed",
  trailer: "Trailer-visible",
  unconfirmed: "Unconfirmed",
};

export const CONFIDENCE_BLURB: Record<HubConfidence, string> = {
  confirmed:
    "Named or described by Rockstar on Newswire or rockstargames.com/VI.",
  trailer:
    "Clearly visible in an official trailer. Type-level only — no invented names or stats.",
  unconfirmed:
    "Not listed yet. Map-6 shows an empty state instead of a fake catalog.",
};

const BY_KIND: Record<HubKind, HubEntity[]> = {
  character: CHARACTERS,
  vehicle: VEHICLES,
  weapon: WEAPONS,
};

export function isHubKindParam(value: string): value is HubKindParam {
  return (HUB_KIND_PARAMS as readonly string[]).includes(value);
}

export function getEntitiesByKind(kind: HubKind): HubEntity[] {
  return BY_KIND[kind];
}

export function getEntitiesByParam(kindParam: HubKindParam): HubEntity[] {
  return getEntitiesByKind(KIND_FROM_PARAM[kindParam]);
}

export function getEntity(kindParam: HubKindParam, slug: string): HubEntity | undefined {
  return getEntitiesByParam(kindParam).find((entity) => entity.slug === slug);
}

export function getAllEntities(): HubEntity[] {
  return [...CHARACTERS, ...VEHICLES, ...WEAPONS];
}

export function countByKind(): Record<HubKindParam, number> {
  return {
    characters: CHARACTERS.length,
    vehicles: VEHICLES.length,
    weapons: WEAPONS.length,
  };
}

export function jsonLdHubEntity(entity: HubEntity, locale: string) {
  const kindParam = PARAM_FROM_KIND[entity.kind];
  const url = `${SITE.url}/${locale}/database/${kindParam}/${entity.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": entity.kind === "character" ? "Person" : "Thing",
    name: entity.name,
    description: entity.summary,
    url,
    sameAs: entity.sources.map((source) => source.url),
  };
}

export { CHARACTERS, VEHICLES, WEAPONS };
