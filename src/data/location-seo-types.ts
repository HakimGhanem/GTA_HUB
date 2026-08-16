export type RegionalLocationFaq = {
  question: string;
  answer: string;
};

export type RegionalLocationSeo = {
  slug: string;
  metaDescription: string;
  schemaDescription: string;
  about: string[];
  poiTypes: string[];
  faq: RegionalLocationFaq[];
};

export const REGIONAL_LOCATION_SLUGS = [
  "vice-city",
  "ocean-drive",
  "grassrivers",
  "leonida-keys",
  "port-gellhorn",
  "ambrosia-island",
  "mount-kalaga",
] as const;

export type RegionalLocationSlug = (typeof REGIONAL_LOCATION_SLUGS)[number];
