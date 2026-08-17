"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  NavigationControl,
  type MapMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";
import clsx from "clsx";
import type { Location } from "@/data/all-locations";
import { useDebouncedMapViewport } from "@/hooks/useDebouncedMapViewport";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  fromMapLibreCoords,
  mapLibreBounds,
  toMapLibreCoords,
  type GameCoords,
} from "@/lib/coordinates";
import {
  DEFAULT_GAME_ID,
  getGameConfig,
  type GameId,
} from "@/lib/games";
import {
  mapOverlayShareUrl,
  mapShareUrl,
  readCreatorRef,
  type MapTheme,
} from "@/lib/map-links";
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
  gameId?: GameId;
  focus?: { x: number; y: number };
  /** Highlight + sidebar selection from `?loc=` deep-link */
  initialActiveSlug?: string;
  initialZoom?: number;
  theme?: MapTheme;
  creatorRef?: string;
  /** OBS / Kick browser source — minimal chrome, transparent-friendly */
  overlayMode?: boolean;
  className?: string;
  showSidebar?: boolean;
  locale?: string;
  onSelectGame?: (game: GameId) => void;
  onDeepLinkChange?: (opts: {
    slug?: string;
    x: number;
    y: number;
    z?: number;
    theme?: MapTheme;
  }) => void;
};

export function GameMap({
  gameId = DEFAULT_GAME_ID,
  focus,
  initialActiveSlug,
  initialZoom,
  theme = "default",
  creatorRef,
  overlayMode = false,
  className,
  showSidebar = false,
  locale = "en",
  onSelectGame,
  onDeepLinkChange,
}: GameMapProps) {
  const game = useMemo(() => getGameConfig(gameId), [gameId]);
  const bounds = game.bounds;
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [sidebarOverride, setSidebarOverride] = useState<boolean | null>(null);
  const effectiveSidebar = showSidebar && !overlayMode;
  const sidebarOpen = effectiveSidebar && (sidebarOverride ?? isDesktop);
  const [filters, setFilters] = useState<MapFilters>(() => defaultMapFilters());
  const debouncedQuery = useDebouncedValue(filters.query);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(
    initialActiveSlug,
  );
  const [measureActive, setMeasureActive] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<GameCoords[]>([]);
  const [shareHint, setShareHint] = useState<string | undefined>();
  const [mapTheme, setMapTheme] = useState<MapTheme>(theme);
  const defaultCoords = focus ?? { x: game.center[0], y: game.center[1] };
  const [coords, setCoords] = useState<GameCoords>(defaultCoords);

  const allLocations = useMemo(() => game.getLocations(), [game]);
  const viewport = useDebouncedMapViewport(mapRef, mapLoaded, 300, bounds);
  const useGtadbNative = game.tile.kind === "gtadb";

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

  const mapStyle = useMemo(() => buildMapStyle(game), [game]);

  const initialViewState = useMemo(() => {
    const { lng, lat } = toMapLibreCoords(
      focus?.x ?? game.center[0],
      focus?.y ?? game.center[1],
      bounds,
    );
    const zoom =
      initialZoom != null && Number.isFinite(initialZoom)
        ? initialZoom
        : focus
          ? 3
          : game.zoom;
    return { longitude: lng, latitude: lat, zoom };
  }, [focus, game.center, game.zoom, bounds, initialZoom]);

  const currentZoom = useCallback((): number | undefined => {
    const z = mapRef.current?.getZoom();
    return z != null && Number.isFinite(z) ? z : undefined;
  }, []);

  const fitMapBounds = useCallback(() => {
    mapRef.current?.fitBounds(mapLibreBounds(bounds), {
      padding: overlayMode ? 8 : 40,
      duration: overlayMode ? 0 : 800,
      maxZoom: 6,
    });
  }, [bounds, overlayMode]);

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
    if (useGtadbNative && initialZoom == null && !focus) fitMapBounds();
    requestAnimationFrame(() => mapRef.current?.getMap().resize());
  }, [fitMapBounds, focus, initialZoom, useGtadbNative]);

  const flyTo = useCallback(
    (loc: Location) => {
      const { lng, lat } = toMapLibreCoords(loc.x, loc.y, bounds);
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 5, duration: 900 });
      setActiveSlug(loc.slug);
      setCoords({ x: loc.x, y: loc.y });
      onDeepLinkChange?.({
        slug: loc.slug,
        x: loc.x,
        y: loc.y,
        z: 5,
        theme: mapTheme,
      });
    },
    [bounds, mapTheme, onDeepLinkChange],
  );

  const onMouseMove = useCallback(
    (e: MapMouseEvent) => {
      setCoords(fromMapLibreCoords(e.lngLat.lng, e.lngLat.lat, bounds));
    },
    [bounds],
  );

  const onMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (!measureActive) return;
      const point = fromMapLibreCoords(e.lngLat.lng, e.lngLat.lat, bounds);
      setMeasurePoints((prev) => [...prev, point]);
      setCoords(point);
    },
    [measureActive, bounds],
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

  const resolveRef = useCallback(
    () => creatorRef || readCreatorRef(),
    [creatorRef],
  );

  const onShare = useCallback(async () => {
    const url = mapShareUrl({
      game: gameId,
      slug: activeSlug,
      x: coords.x,
      y: coords.y,
      z: currentZoom(),
      theme: mapTheme,
      ref: resolveRef(),
      locale,
    });
    try {
      await navigator.clipboard.writeText(url);
      setShareHint("Link copied");
      window.setTimeout(() => setShareHint(undefined), 1600);
    } catch {
      setShareHint(url);
    }
  }, [
    activeSlug,
    coords.x,
    coords.y,
    currentZoom,
    gameId,
    locale,
    mapTheme,
    resolveRef,
  ]);

  const onCopyOverlay = useCallback(async () => {
    const url = mapOverlayShareUrl({
      game: gameId,
      slug: activeSlug,
      x: coords.x,
      y: coords.y,
      z: currentZoom(),
      theme: mapTheme === "default" ? "streamer" : mapTheme,
      ref: resolveRef(),
      locale,
    });
    try {
      await navigator.clipboard.writeText(url);
      setShareHint("Overlay URL copied");
      window.setTimeout(() => setShareHint(undefined), 1600);
    } catch {
      setShareHint(url);
    }
  }, [
    activeSlug,
    coords.x,
    coords.y,
    currentZoom,
    gameId,
    locale,
    mapTheme,
    resolveRef,
  ]);

  const onThemeChange = useCallback(
    (next: MapTheme) => {
      setMapTheme(next);
      onDeepLinkChange?.({
        slug: activeSlug,
        x: coords.x,
        y: coords.y,
        z: currentZoom(),
        theme: next,
      });
    },
    [activeSlug, coords.x, coords.y, currentZoom, onDeepLinkChange],
  );

  const streamerUi = mapTheme === "streamer" || mapTheme === "neon";

  const mapPanel = (
    <div
      className={clsx(
        "relative min-w-0 flex-1",
        mapTheme === "neon" && "map-theme-neon",
        mapTheme === "streamer" && "map-theme-streamer",
        className ?? "h-full",
      )}
    >
      {mapLoaded && useGtadbNative && <GtadbTileOverlay mapRef={mapRef} />}

      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        maxBounds={mapLibreBounds(bounds)}
        minZoom={game.minZoom}
        maxZoom={useGtadbNative ? 10 : game.maxZoom}
        onLoad={onMapLoad}
        onMouseMove={overlayMode ? undefined : onMouseMove}
        onClick={onMapClick}
        cursor={measureActive ? "crosshair" : "grab"}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
          background: overlayMode ? "transparent" : undefined,
        }}
        attributionControl={false}
        dragRotate={false}
        pitchWithRotate={false}
      >
        {!overlayMode && (
          <NavigationControl position="bottom-right" showCompass={false} />
        )}

        {mapLoaded && measureActive && !overlayMode && (
          <MapMeasureLayer
            points={measurePoints}
            onClear={() => setMeasurePoints([])}
            onClose={closeMeasure}
            mapBounds={bounds}
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
            mapBounds={bounds}
            largeLabels={streamerUi}
          />
        )}
      </Map>

      {!overlayMode && (
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
      )}

      {overlayMode && (
        <p
          className={clsx(
            "pointer-events-none absolute bottom-3 left-3 z-20 rounded-md px-2 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-sm",
            mapTheme === "neon"
              ? "bg-fuchsia-500/30 text-fuchsia-100"
              : "bg-black/50 text-white/90",
          )}
        >
          MAP<span className="text-pink-300">6</span>
          {resolveRef() ? ` · @${resolveRef()}` : ""}
        </p>
      )}

      {!overlayMode && game.attribution && (
        <p className="pointer-events-none absolute bottom-3 right-14 z-10 max-w-[12rem] text-right text-[9px] leading-tight text-white/30 sm:bottom-4">
          {game.attribution}
        </p>
      )}

      {!overlayMode && !useGtadbNative && game.tile.kind === "grid" && !game.primary && (
        <p className="pointer-events-none absolute left-1/2 top-3 z-10 max-w-xs -translate-x-1/2 rounded-md border border-white/10 bg-black/50 px-2 py-1 text-center text-[10px] text-white/50 backdrop-blur-sm">
          {game.label} · seed POIs · add raster tiles via env
        </p>
      )}

      {!overlayMode && (
        <MapToolbar
          coords={coords}
          gameId={gameId}
          theme={mapTheme}
          showSidebarToggle={effectiveSidebar}
          sidebarOpen={sidebarOpen}
          measureActive={measureActive}
          shareHint={shareHint}
          onToggleSidebar={() =>
            setSidebarOverride(!(sidebarOverride ?? isDesktop))
          }
          onToggleMeasure={toggleMeasure}
          onFitBounds={fitMapBounds}
          onShare={onShare}
          onCopyOverlay={onCopyOverlay}
          onThemeChange={onThemeChange}
          onSelectGame={(id) => onSelectGame?.(id)}
        />
      )}
    </div>
  );

  if (!effectiveSidebar) return mapPanel;

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
