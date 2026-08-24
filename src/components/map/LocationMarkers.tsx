"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Layer, Popup, Source, type MapRef } from "react-map-gl/maplibre";
import type {
  ExpressionSpecification,
  GeoJSONSource,
  MapMouseEvent,
} from "maplibre-gl";
import type { Location } from "@/data/all-locations";
import { toMapLibreCoords, type MapBounds } from "@/lib/coordinates";
import { CATEGORY_COLORS } from "@/lib/map-filters";
import { LocationPopup } from "./LocationPopup";

const SOURCE_ID = "poi-points";
const LAYER_CLUSTER_GLOW = "poi-cluster-glow";
const LAYER_CLUSTERS = "poi-clusters";
const LAYER_CLUSTER_COUNT = "poi-cluster-count";
const LAYER_POI_GLOW = "poi-glow";
const LAYER_POI_DOTS = "poi-dots";
const LAYER_POI_LABELS = "poi-labels";

const INTERACTIVE_LAYERS = [LAYER_CLUSTERS, LAYER_POI_DOTS];

const UNCLUSTERED: ExpressionSpecification = ["!", ["has", "point_count"]];
const CLUSTERED: ExpressionSpecification = ["has", "point_count"];

const CATEGORY_COLOR: ExpressionSpecification = [
  "match",
  ["get", "category"],
  "landmark",
  CATEGORY_COLORS.landmark,
  "collectible",
  CATEGORY_COLORS.collectible,
  "shop",
  CATEGORY_COLORS.shop,
  "mission",
  CATEGORY_COLORS.mission,
  "secret",
  CATEGORY_COLORS.secret,
  "#ffffff",
];

type LocationMarkersProps = {
  locations: Location[];
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

export function LocationMarkers({
  locations,
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

  /** Forward wheel events on the popup to the map canvas so zoom still works. */
  useEffect(() => {
    if (!popupLoc) return;
    const root = mapRef.current?.getMap()?.getContainer();
    if (!root) return;
    const targets = [
      ...root.querySelectorAll(".maplibregl-popup, .maplibregl-popup-content"),
    ];
    if (!targets.length) return;

    const onWheel = (e: Event) => {
      const we = e as WheelEvent;
      const canvas = mapRef.current?.getCanvas();
      if (!canvas) return;
      we.preventDefault();
      we.stopPropagation();
      canvas.dispatchEvent(
        new WheelEvent("wheel", {
          deltaX: we.deltaX,
          deltaY: we.deltaY,
          deltaZ: we.deltaZ,
          deltaMode: we.deltaMode,
          clientX: we.clientX,
          clientY: we.clientY,
          screenX: we.screenX,
          screenY: we.screenY,
          bubbles: true,
          cancelable: true,
        }),
      );
    };

    for (const el of targets) {
      el.addEventListener("wheel", onWheel, { passive: false });
    }
    return () => {
      for (const el of targets) {
        el.removeEventListener("wheel", onWheel);
      }
    };
  }, [popupLoc, mapRef]);

  const bySlug = useMemo(() => {
    const map = new Map<string, Location>();
    for (const loc of locations) map.set(loc.slug, loc);
    return map;
  }, [locations]);

  const geojson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: locations.map((loc, i) => {
        const { lng, lat } = toMapLibreCoords(loc.x, loc.y, mapBounds);
        return {
          type: "Feature" as const,
          id: i + 1,
          properties: {
            slug: loc.slug,
            name: loc.name,
            category: loc.category,
            found: isFound?.(loc.slug) ? 1 : 0,
            active: loc.slug === activeSlug ? 1 : 0,
          },
          geometry: {
            type: "Point" as const,
            coordinates: [lng, lat] as [number, number],
          },
        };
      }),
    }),
    [locations, mapBounds, isFound, activeSlug],
  );

  const handleSelect = useCallback(
    (loc: Location) => {
      if (measureActive) return;
      setPopupLoc(loc);
      onSelect(loc);
    },
    [measureActive, onSelect],
  );

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || measureActive) return;

    let hoveredId: number | string | undefined;

    const setHoverState = (id: number | string, hover: boolean) => {
      try {
        map.setFeatureState({ source: SOURCE_ID, id }, { hover });
      } catch {
        /* source gone during style swap */
      }
    };

    const clearHover = () => {
      if (hoveredId != null) {
        setHoverState(hoveredId, false);
        hoveredId = undefined;
      }
      map.getCanvas().style.cursor = "";
    };

    const onClick = (e: MapMouseEvent) => {
      const layers = INTERACTIVE_LAYERS.filter((id) => map.getLayer(id));
      if (!layers.length) return;
      const feature = map.queryRenderedFeatures(e.point, { layers })[0];
      if (!feature) return;

      if (feature.properties?.cluster) {
        const clusterId = feature.properties.cluster_id as number;
        const source = map.getSource(SOURCE_ID) as GeoJSONSource | undefined;
        const geom = feature.geometry as unknown as {
          coordinates: [number, number];
        };
        const coords = geom.coordinates;
        source
          ?.getClusterExpansionZoom(clusterId)
          .then((zoom) => {
            map.easeTo({
              center: coords,
              zoom: Math.min(zoom, map.getMaxZoom()),
              duration: 400,
            });
          })
          .catch(() => {
            map.easeTo({
              center: coords,
              zoom: Math.min(map.getZoom() + 2, map.getMaxZoom()),
              duration: 400,
            });
          });
        return;
      }

      const slug = feature.properties?.slug as string | undefined;
      const loc = slug ? bySlug.get(slug) : undefined;
      if (loc) handleSelect(loc);
    };

    const onMove = (e: MapMouseEvent) => {
      const layers = INTERACTIVE_LAYERS.filter((id) => map.getLayer(id));
      if (!layers.length) return;
      const feature = map.queryRenderedFeatures(e.point, { layers })[0];
      if (!feature) {
        clearHover();
        return;
      }
      map.getCanvas().style.cursor = "pointer";
      const nextId = feature.id;
      if (nextId == null || nextId === hoveredId) return;
      clearHover();
      hoveredId = nextId;
      map.getCanvas().style.cursor = "pointer";
      if (!feature.properties?.cluster) {
        setHoverState(nextId, true);
      }
    };

    const onLeave = () => clearHover();

    map.on("click", onClick);
    map.on("mousemove", onMove);
    map.on("mouseleave", onLeave);
    return () => {
      map.off("click", onClick);
      map.off("mousemove", onMove);
      map.off("mouseleave", onLeave);
      clearHover();
    };
  }, [mapRef, measureActive, bySlug, handleSelect]);

  if (measureActive) return null;

  const scale = largeLabels ? 1.3 : 1;

  return (
    <>
      <Source
        id={SOURCE_ID}
        type="geojson"
        data={geojson}
        cluster
        clusterMaxZoom={5}
        clusterRadius={48}
      >
        <Layer
          id={LAYER_CLUSTER_GLOW}
          type="circle"
          filter={CLUSTERED}
          paint={{
            "circle-color": "#EC407A",
            "circle-opacity": 0.12,
            "circle-blur": 1,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "point_count"],
              2,
              14 * scale,
              10,
              20 * scale,
              50,
              28 * scale,
              200,
              36 * scale,
            ],
          }}
        />
        <Layer
          id={LAYER_CLUSTERS}
          type="circle"
          filter={CLUSTERED}
          paint={{
            "circle-color": "#EC407A",
            "circle-opacity": 0.9,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-opacity": 0.7,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "point_count"],
              2,
              8 * scale,
              10,
              12 * scale,
              50,
              16 * scale,
              200,
              22 * scale,
            ],
          }}
        />
        <Layer
          id={LAYER_CLUSTER_COUNT}
          type="symbol"
          filter={CLUSTERED}
          layout={{
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["Open Sans Bold", "Noto Sans Bold"],
            "text-size": largeLabels ? 13 : 11,
            "text-allow-overlap": true,
          }}
          paint={{
            "text-color": "#ffffff",
            "text-halo-color": "#000000",
            "text-halo-width": 1,
          }}
        />
        <Layer
          id={LAYER_POI_GLOW}
          type="circle"
          filter={UNCLUSTERED}
          paint={{
            "circle-color": CATEGORY_COLOR,
            "circle-blur": 1,
            "circle-opacity": [
              "case",
              ["==", ["get", "found"], 1],
              0.05,
              ["==", ["get", "active"], 1],
              0.22,
              ["boolean", ["feature-state", "hover"], false],
              0.2,
              0.12,
            ],
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              8 * scale,
              3,
              12 * scale,
              6,
              18 * scale,
              10,
              24 * scale,
            ],
          }}
        />
        <Layer
          id={LAYER_POI_DOTS}
          type="circle"
          filter={UNCLUSTERED}
          paint={{
            "circle-color": CATEGORY_COLOR,
            "circle-opacity": [
              "case",
              ["==", ["get", "found"], 1],
              0.4,
              0.9,
            ],
            "circle-stroke-width": [
              "case",
              ["==", ["get", "active"], 1],
              2.5,
              ["boolean", ["feature-state", "hover"], false],
              2,
              1.5,
            ],
            "circle-stroke-color": [
              "case",
              ["==", ["get", "found"], 1],
              "#34d399",
              "#ffffff",
            ],
            "circle-stroke-opacity": 0.75,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              [
                "case",
                ["==", ["get", "active"], 1],
                5 * scale,
                ["boolean", ["feature-state", "hover"], false],
                5 * scale,
                3.5 * scale,
              ],
              3,
              [
                "case",
                ["==", ["get", "active"], 1],
                7 * scale,
                ["boolean", ["feature-state", "hover"], false],
                6.5 * scale,
                5 * scale,
              ],
              6,
              [
                "case",
                ["==", ["get", "active"], 1],
                10 * scale,
                ["boolean", ["feature-state", "hover"], false],
                9 * scale,
                7 * scale,
              ],
              10,
              [
                "case",
                ["==", ["get", "active"], 1],
                13 * scale,
                ["boolean", ["feature-state", "hover"], false],
                12 * scale,
                10 * scale,
              ],
            ],
          }}
        />
        <Layer
          id={LAYER_POI_LABELS}
          type="symbol"
          filter={UNCLUSTERED}
          minzoom={largeLabels ? 0 : 2}
          layout={{
            "text-field": ["get", "name"],
            "text-font": ["Open Sans Regular", "Noto Sans Regular"],
            "text-size": largeLabels ? 11 : 9,
            "text-offset": [0, 1.6],
            "text-anchor": "top",
            "text-max-width": 8,
            "text-allow-overlap": largeLabels,
            "text-optional": true,
          }}
          paint={{
            "text-color": CATEGORY_COLOR,
            "text-halo-color": "#000000",
            "text-halo-width": 1.4,
            "text-opacity": [
              "case",
              ["==", ["get", "found"], 1],
              0.55,
              0.85,
            ],
          }}
        />
      </Source>

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
              onToggleFound ? () => onToggleFound(popupLoc.slug) : undefined
            }
          />
        </Popup>
      )}
    </>
  );
}
