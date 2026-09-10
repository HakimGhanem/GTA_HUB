import type { ReactElement } from "react";
import { contentPanel, project } from "@/lib/og/basemap";
import {
  ACCENT_SOFT,
  LAYER,
  ROOT,
  brandRow,
  leftScrim,
  mapLayer,
  pill,
  pin,
  scrim,
} from "./frame";

type Props = {
  kicker: string;
  title: string;
  statValue: number;
  statLabel: string;
  pins: { x: number; y: number }[];
  basemap: string;
};

function titleSize(title: string) {
  if (title.length <= 14) return 66;
  if (title.length <= 22) return 54;
  return 44;
}

/**
 * Wide-audience layout: the whole state on the right with every pin, copy on
 * the left. Used where no single coordinate is the subject.
 */
export function mapPanelOgCard({
  kicker,
  title,
  statValue,
  statLabel,
  pins,
  basemap,
}: Props): ReactElement {
  const { view, panelLeft } = contentPanel();

  return (
    <div style={ROOT}>
      {mapLayer(basemap, view)}
      {scrim(leftScrim(panelLeft), 0.2)}
      {pins.map((point, index) => (
        <div key={index} style={{ display: "flex" }}>
          {pin(project(view, point.x, point.y), 22)}
        </div>
      ))}

      <div
        style={{
          ...LAYER,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
        }}
      >
        {brandRow()}

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {pill(kicker)}
          <div
            style={{
              display: "flex",
              maxWidth: panelLeft - 90,
              fontSize: titleSize(title),
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <div
              style={{
                display: "flex",
                fontSize: 46,
                fontWeight: 700,
                color: ACCENT_SOFT,
              }}
            >
              {statValue}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
