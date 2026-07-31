import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";

let protocolRegistered = false;

export function registerPmtilesProtocol() {
  if (protocolRegistered || typeof window === "undefined") return;
  const protocol = new Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);
  protocolRegistered = true;
}

export function getPmtilesUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_PMTILES_URL?.trim();
  return url || null;
}

export function getRasterTilesUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_RASTER_TILES_URL?.trim();
  return url || null;
}
