import type { ReactElement } from "react";
import { OG_SIZE, type BasemapView } from "@/lib/og/basemap";

export const INK = "#0a0e17";
export const ACCENT = "#ec4899";
export const ACCENT_SOFT = "#f9a8d4";

/** Satori ignores the `inset` shorthand — layers need explicit geometry. */
export const LAYER = {
  position: "absolute",
  left: 0,
  top: 0,
  ...OG_SIZE,
} as const;

export const ROOT = {
  ...OG_SIZE,
  display: "flex",
  position: "relative",
  overflow: "hidden",
  backgroundColor: INK,
  color: "#ffffff",
  fontFamily: "Geist",
} as const;

export function mapLayer(basemap: string, view: BasemapView): ReactElement {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Satori renders raw <img> only
    <img
      alt=""
      src={basemap}
      width={view.width}
      height={view.height}
      style={{ position: "absolute", left: view.left, top: view.top }}
    />
  );
}

/**
 * The Leonida tileset is a light illustrated map, so it needs a heavy scrim
 * before white text is legible on top of it.
 */
export function scrim(gradient: string, flatOpacity = 0.34): ReactElement[] {
  return [
    <div
      key="flat"
      style={{
        ...LAYER,
        display: "flex",
        backgroundColor: `rgba(10,14,23,${flatOpacity})`,
      }}
    />,
    <div key="gradient" style={{ ...LAYER, display: "flex", background: gradient }} />,
  ];
}

export const BOTTOM_SCRIM = `linear-gradient(to top, ${INK} 0%, rgba(10,14,23,0.92) 30%, rgba(10,14,23,0.15) 72%, rgba(10,14,23,0.7) 100%)`;

/** Fades the copy column into the map panel, wherever the panel starts. */
export function leftScrim(panelLeft: number): string {
  const edge = (panelLeft / OG_SIZE.width) * 100;
  return `linear-gradient(to right, ${INK} ${Math.max(0, edge - 4).toFixed(1)}%, rgba(10,14,23,0.7) ${(edge + 7).toFixed(1)}%, rgba(10,14,23,0.22) ${Math.min(96, edge + 30).toFixed(1)}%, rgba(10,14,23,0.45) 100%)`;
}

export function pin(
  at: { left: number; top: number },
  size = 58,
): ReactElement {
  const dot = Math.round(size / 2.9);

  return (
    <div
      style={{
        position: "absolute",
        left: Math.round(at.left - size / 2),
        top: Math.round(at.top - size / 2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size,
        border: `${size > 30 ? 3 : 2}px solid rgba(236,72,153,0.7)`,
        backgroundColor: "rgba(236,72,153,0.22)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: dot,
          height: dot,
          borderRadius: dot,
          backgroundColor: ACCENT,
          border: `${size > 30 ? 3 : 2}px solid #ffffff`,
        }}
      />
    </div>
  );
}

export function brandRow(tagline = "GTA 6 INTERACTIVE MAP"): ReactElement {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          display: "flex",
          width: 14,
          height: 14,
          borderRadius: 4,
          backgroundColor: ACCENT,
        }}
      />
      <div
        style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 4 }}
      >
        MAP-6
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 20,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.72)",
        }}
      >
        {tagline}
      </div>
    </div>
  );
}

const PILL_TONES: Record<string, { fg: string; bg: string; border: string }> = {
  preorder: {
    fg: "#f9a8d4",
    bg: "rgba(236,72,153,0.22)",
    border: "rgba(236,72,153,0.45)",
  },
  trailer: {
    fg: "#67e8f9",
    bg: "rgba(6,182,212,0.22)",
    border: "rgba(6,182,212,0.45)",
  },
  map: {
    fg: "#86efac",
    bg: "rgba(34,197,94,0.22)",
    border: "rgba(34,197,94,0.45)",
  },
  setup: {
    fg: "#fcd34d",
    bg: "rgba(245,158,11,0.22)",
    border: "rgba(245,158,11,0.45)",
  },
  release: {
    fg: "#c4b5fd",
    bg: "rgba(139,92,246,0.22)",
    border: "rgba(139,92,246,0.45)",
  },
};

export function pill(label: string, tone = "preorder"): ReactElement {
  const colors = PILL_TONES[tone] ?? PILL_TONES.preorder;
  return (
    <div
      style={{
        display: "flex",
        alignSelf: "flex-start",
        fontSize: 19,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: colors.fg,
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 999,
        padding: "8px 20px",
      }}
    >
      {label}
    </div>
  );
}

export function metaRow(parts: string[]): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 26,
        color: "rgba(255,255,255,0.72)",
      }}
    >
      {parts.flatMap((part, index) =>
        index === 0
          ? [<div key={part} style={{ display: "flex" }}>{part}</div>]
          : [
              <div
                key={`sep-${part}`}
                style={{ display: "flex", color: "rgba(255,255,255,0.35)" }}
              >
                /
              </div>,
              <div key={part} style={{ display: "flex" }}>{part}</div>,
            ],
      )}
    </div>
  );
}
