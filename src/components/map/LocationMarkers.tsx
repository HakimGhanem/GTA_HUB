"use client";

import { useCallback, useMemo, useState } from "react";
import { Marker, Popup, type MapRef } from "react-map-gl/maplibre";
import Supercluster from "supercluster";
import type { Location } from "@/data/all-locations";
import { toMapLibreCoords, type MapBounds } from "@/lib/coordinates";
import type { GameViewport } from "@/lib/map-viewport";
import { CATEGORY_COLORS } from "@/lib/map-filters";
import { LocationPopup } from "./LocationPopup";

type LocationMarkersProps = {
  locations: Location[];
  viewport: GameViewport | null;
  mapRef: React.RefObject<MapRef | null>;
  onSelect: (loc: Location) => void;
  activeSlug?: string;
  measureActive?: boolean;
  mapBounds?: MapBounds;
  /** Streamer / neon themes — bigger pins + name labels */
  largeLabels?: boolean;
  isFound?: (slug: string) => boolean;
  onToggleFound?: (slug: string) => void;
};

function ClusterMarker({ count }: { count: number }) {
  const size = count < 10 ? 28 : count < 50 ? 34 : 40;
  return (
    <div
      className="flex items-center justify-center rounded-full bg-pink-500/90 font-bold text-white shadow-lg ring-2 ring-white/80"
      style={{ width: size, height: size, fontSize: count < 100 ? 12 : 10 }}
    >
      {count}
    </div>
  );
}

function PoiMarker({
  loc,
  isActive,
  onSelect,
  largeLabels = false,
  found = false,
}: {
  loc: Location;
  isActive: boolean;
  onSelect: (loc: Location) => void;
  largeLabels?: boolean;
  found?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(loc);
      }}
      className="group relative flex cursor-pointer flex-col items-center justify-center"
      title={found ? `${loc.name} (found)` : loc.name}
      data-testid={`poi-marker-${loc.slug}`}
      aria-label={loc.name}
    >
      <span
        className={`absolute rounded-full ${largeLabels ? "h-8 w-8" : "h-6 w-6"}`}
        aria-hidden
      />
      <span
        className={`relative rounded-full ring-2 transition-transform group-hover:scale-125 ${
          found ? "ring-emerald-400/80 opacity-45" : "ring-white/80"
        } ${
          largeLabels
            ? isActive
              ? "h-5 w-5"
              : "h-4 w-4"
            : isActive
              ? "h-4 w-4"
              : "h-3 w-3"
        }`}
        style={{ backgroundColor: CATEGORY_COLORS[loc.category] ?? "#fff" }}
      />
      {largeLabels && (
        <span
          className={`mt-0.5 max-w-[9rem] truncate rounded bg-black/75 px-1 py-0.5 text-[10px] font-semibold leading-none text-white shadow ${
            found ? "line-through opacity-60" : ""
          }`}
        >
          {loc.name}
        </span>
      )}
    </button>
  );
}

export function LocationMarkers({
  locations,
  viewport,
  mapRef,
  onSelect,
  activeSlug,
  measureActive = false,
  mapBounds,
  largeLabels = false,
  isFound,
  onToggleFound,
}: LocationMarkersProps) {
  const [popupLoc, setPopupLoc] = useState<Location | null>(null);

  const index = useMemo(() => {
    const cluster = new Supercluster<{ location: Location; category: string }>({
      radius: 50,
      maxZoom: 14,
    });
    cluster.load(
      locations.map((loc) => {
        const { lng, lat } = toMapLibreCoords(loc.x, loc.y, mapBounds);
        return {
          type: "Feature" as const,
          properties: { location: loc, category: loc.category },
          geometry: {
            type: "Point" as const,
            coordinates: [lng, lat] as [number, number],
          },
        };
      }),
    );
    return cluster;
  }, [locations, mapBounds]);

  const clusters = useMemo(() => {
    if (!viewport) return [];
    return index.getClusters(viewport.bounds, Math.floor(viewport.zoom));
  }, [index, viewport]);

  const handleSelect = useCallback(
    (loc: Location) => {
      if (measureActive) return;
      setPopupLoc(loc);
      onSelect(loc);
    },
    [measureActive, onSelect],
  );

  const handleClusterClick = useCallback(
    (clusterId: number, lng: number, lat: number) => {
      const expansionZoom = Math.min(index.getClusterExpansionZoom(clusterId), 14);
      mapRef.current?.flyTo({ center: [lng, lat], zoom: expansionZoom, duration: 500 });
    },
    [index, mapRef],
  );

  if (!viewport || measureActive) return null;

  return (
    <>
      {clusters.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const props = feature.properties as {
          cluster?: boolean;
          point_count?: number;
          location?: Location;
        };

        if (props.cluster) {
          return (
            <Marker
              key={`cluster-${feature.id}`}
              longitude={lng}
              latitude={lat}
              anchor="center"
            >
              <button
                type="button"
                onClick={() => handleClusterClick(feature.id as number, lng, lat)}
                className="cursor-pointer p-1"
                data-testid={`cluster-${feature.id}`}
              >
                <ClusterMarker count={props.point_count ?? 0} />
              </button>
            </Marker>
          );
        }

        const loc = props.location!;
        return (
          <Marker key={loc.slug} longitude={lng} latitude={lat} anchor="center">
            <PoiMarker
              loc={loc}
              isActive={loc.slug === activeSlug}
              onSelect={handleSelect}
              largeLabels={largeLabels}
              found={isFound?.(loc.slug) ?? false}
            />
          </Marker>
        );
      })}

      {popupLoc && (
        <Popup
          longitude={toMapLibreCoords(popupLoc.x, popupLoc.y, mapBounds).lng}
          latitude={toMapLibreCoords(popupLoc.x, popupLoc.y, mapBounds).lat}
          anchor="bottom"
          onClose={() => setPopupLoc(null)}
          closeButton
          closeOnClick={false}
          className="map-popup"
        >
          <LocationPopup
            location={popupLoc}
            onClose={() => setPopupLoc(null)}
            found={isFound?.(popupLoc.slug) ?? false}
            onToggleFound={
              onToggleFound
                ? () => onToggleFound(popupLoc.slug)
                : undefined
            }
          />
        </Popup>
      )}
    </>
  );
}
