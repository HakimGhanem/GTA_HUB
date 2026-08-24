import type { Location, LocationConfidence } from "@/data/locations";

export type { LocationConfidence };

export const CONFIDENCE_LABELS: Record<LocationConfidence, string> = {
  confirmed: "Confirmed",
  trailer: "Trailer / official",
  community: "Community",
  rumor: "Rumor",
  seed: "Editorial seed",
};

export const CONFIDENCE_COLORS: Record<LocationConfidence, string> = {
  confirmed: "#34d399",
  trailer: "#60a5fa",
  community: "#fbbf24",
  rumor: "#f87171",
  seed: "#a78bfa",
};

/** Derive trust label from Location.source (and optional confidence). */
export function resolveConfidence(
  location: Pick<Location, "source" | "confidence">,
): LocationConfidence {
  if (location.confidence) return location.confidence;
  const s = (location.source ?? "").toLowerCase();
  if (s === "confirmed" || s === "official" || s === "rockstar") return "confirmed";
  if (s === "trailer" || s === "screenshot" || s.includes("official")) return "trailer";
  if (s === "gtadb" || s === "community" || s === "durtyfree" || s === "kong78")
    return "community";
  if (s === "leak" || s === "rumor") return "rumor";
  if (s === "seed" || s === "") return "seed";
  return "community";
}
