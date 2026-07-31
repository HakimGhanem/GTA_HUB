"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  NavigationControl,
  type MapMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";
import clsx from "clsx";
import { getAllLocations, type Location } from "@/data/all-locations";
import { useDebouncedMapViewport } from "@/hooks/useDebouncedMapViewport";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  fromMapLibreCoords,
  mapLibreBounds,
  toMapLibreCoords,
  type GameCoords,
} from "@/lib/coordinates";
import { GTADB, MAP_DEFAULTS } from "@/lib/constants";
import { buildMapStyle } from "@/lib/map-style";
import {
  defaultMapFilters,
  filterLocations,
  type MapFilters,
} from "@/lib/map-filters";
import { filterLocationsInViewport } from "@/lib/map-viewport";
import { registerPmtilesProtocol } from "@/lib/pmtiles";
import { GtadbTileOverlay } from "./GtadbTileOverlay";
import { LocationMarkers } from "./LocationMarkers";
import { MapLegend } from "./MapLegend";
import { MapMeasureLayer } from "./MapMeasureLayer";
import { MapScaleBar } from "./MapScaleBar";
import { MapSidebar } from "./MapSidebar";
import { MapStatusBar } from "./MapStatusBar";
import { MapToolbar } from "./MapToolbar";

type GameMapProps = {
  focus?: { x: number; y: number };
  className?: string;
  showSidebar?: boolean;
};

export function GameMap({ focus, className, showSidebar = false }: GameMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [sidebarOverride, setSidebarOverride] = useState<boolean | null>(null);
  const sidebarOpen = showSidebar && (sidebarOverride ?? isDesktop);
  const [filters, setFilters] = useState<MapFilters>(() => defaultMapFilters());
  const debouncedQuery = useDebouncedValue(filters.query);
  const [activeSlug, setActiveSlug] = useState<string | undefined>();
  const [measureActive, setMeasureActive] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<GameCoords[]>([]);
  const defaultCoords = focus ?? { x: MAP_DEFAULTS.center[0], y: MAP_DEFAULTS.center[1] };
  const [coords, setCoords] = useState<GameCoords>(defaultCoords);

  const allLocations = useMemo(() => getAllLocations(), []);
  const viewport = useDebouncedMapViewport(mapRef, mapLoaded);

  const effectiveFilters = useMemo(
    () => ({ ...filters, query: debouncedQuery }),
    [filters, debouncedQuery],
  );

  const filteredLocations = useMemo(
    () => filterLocations(allLocations, effectiveFilters),
    [allLocations, effectiveFilters],
  );

  const hasSearchQuery = debouncedQuery.trim().length > 0;

  const sidebarLocations = useMemo(() => {
    if (hasSearchQuery || !viewport) return filteredLocations;
    return filterLocationsInViewport(filteredLocations, viewport).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [filteredLocations, hasSearchQuery, viewport]);

  const visibleInViewportCount = useMemo(() => {
    if (!viewport) return filteredLocations.length;
    return filterLocationsInViewport(filteredLocations, viewport).length;
  }, [filteredLocations, viewport]);

  useEffect(() => {
    registerPmtilesProtocol();
  }, []);

  useEffect(() => {
    if (!measureActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMeasureActive(false);
        setMeasurePoints([]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [measureActive]);

  const mapStyle = useMemo(() => buildMapStyle(), []);

  const initialViewState = useMemo(() => {
    const { lng, lat } = toMapLibreCoords(
      focus?.x ?? MAP_DEFAULTS.center[0],
      focus?.y ?? MAP_DEFAULTS.center[1],
    );
    const zoom = focus ? 3 : GTADB.enabled ? -0.5 : MAP_DEFAULTS.zoom;
    return { longitude: lng, latitude: lat, zoom };
  }, [focus]);

  const fitMapBounds = useCallback(() => {
    mapRef.current?.fitBounds(mapLibreBounds(), { padding: 40, duration: 800, maxZoom: 6 });
  }, []);

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
    if (GTADB.enabled) fitMapBounds();
    requestAnimationFrame(() => mapRef.current?.getMap().resize());
  }, [fitMapBounds]);

  const flyTo = useCallback((loc: Location) => {
    const { lng, lat } = toMapLibreCoords(loc.x, loc.y);
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 5, duration: 900 });
    setActiveSlug(loc.slug);
    setCoords({ x: loc.x, y: loc.y });
  }, []);

  const onMouseMove = useCallback((e: MapMouseEvent) => {
    setCoords(fromMapLibreCoords(e.lngLat.lng, e.lngLat.lat));
  }, []);

  const onMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (!measureActive) return;
      const point = fromMapLibreCoords(e.lngLat.lng, e.lngLat.lat);
      setMeasurePoints((prev) => [...prev, point]);
      setCoords(point);
    },
    [measureActive],
  );

  const toggleMeasure = useCallback(() => {
    setMeasureActive((active) => {
      if (active) setMeasurePoints([]);
      return !active;
    });
  }, []);

  const closeMeasure = useCallback(() => {
    setMeasureActive(false);
    setMeasurePoints([]);
  }, []);

  const mapPanel = (
    <div className={clsx("relative min-w-0 flex-1", className ?? "h-full")}>
      {mapLoaded && GTADB.enabled && GTADB.native && <GtadbTileOverlay mapRef={mapRef} />}

      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        maxBounds={mapLibreBounds()}
        minZoom={MAP_DEFAULTS.minZoom}
        maxZoom={GTADB.enabled ? 10 : MAP_DEFAULTS.maxZoom}
        onLoad={onMapLoad}
        onMouseMove={onMouseMove}
        onClick={onMapClick}
        cursor={measureActive ? "crosshair" : "grab"}
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}
        attributionControl={false}
        dragRotate={false}
        pitchWithRotate={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {mapLoaded && measureActive && (
          <MapMeasureLayer
            points={measurePoints}
            onClear={() => setMeasurePoints([])}
            onClose={closeMeasure}
          />
        )}

        {mapLoaded && (
          <LocationMarkers
            locations={filteredLocations}
            viewport={viewport}
            mapRef={mapRef}
            onSelect={flyTo}
            activeSlug={activeSlug}
            measureActive={measureActive}
          />
        )}
      </Map>

      <div className="pointer-events-none absolute bottom-3 left-3 z-20 flex flex-col gap-2 sm:bottom-4 sm:left-4">
        <MapLegend activeCategories={filters.categories} />
        <MapScaleBar viewport={viewport} />
        <MapStatusBar
          viewport={viewport}
          visibleCount={visibleInViewportCount}
          totalCount={filteredLocations.length}
          measureActive={measureActive}
        />
      </div>

      {GTADB.enabled && (
        <p className="pointer-events-none absolute bottom-3 right-14 z-10 max-w-[12rem] text-right text-[9px] leading-tight text-white/30 sm:bottom-4">
          {GTADB.attribution}
        </p>
      )}

      <MapToolbar
        coords={coords}
        showSidebarToggle={showSidebar}
        sidebarOpen={sidebarOpen}
        measureActive={measureActive}
        onToggleSidebar={() => setSidebarOverride(!(sidebarOverride ?? isDesktop))}
        onToggleMeasure={toggleMeasure}
        onFitBounds={fitMapBounds}
      />
    </div>
  );

  if (!showSidebar) return mapPanel;

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={clsx(
          "hidden shrink-0 transition-[width,margin] duration-200 md:block",
          sidebarOpen ? "w-80" : "w-0 overflow-hidden",
        )}
      >
        {sidebarOpen && (
          <MapSidebar
            locations={sidebarLocations}
            totalCount={allLocations.length}
            filters={filters}
            onFiltersChange={setFilters}
            onFocus={flyTo}
            activeSlug={activeSlug}
            viewportMode={!hasSearchQuery}
            className="h-full"
          />
        )}
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            aria-label="Close location panel"
            onClick={() => setSidebarOverride(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(100%,20rem)] shadow-2xl">
            <MapSidebar
              locations={sidebarLocations}
              totalCount={allLocations.length}
              filters={filters}
              onFiltersChange={setFilters}
              onFocus={flyTo}
              onClose={() => setSidebarOverride(false)}
              activeSlug={activeSlug}
              viewportMode={!hasSearchQuery}
              className="h-full"
            />
          </div>
        </div>
      )}

      {mapPanel}
    </div>
  );
}
