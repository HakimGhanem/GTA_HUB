import editorialPoisJson from "./gta6-editorial-pois.json";
import type { Location } from "./locations";

/** Curated indexable GTA 6 POIs — unique prose, not GTADB bulk stubs. */
export const GTA6_EDITORIAL_POIS = editorialPoisJson as Location[];
