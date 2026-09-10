import type { ReactElement } from "react";
import { project, type BasemapView } from "@/lib/og/basemap";
import {
  BOTTOM_SCRIM,
  LAYER,
  ROOT,
  brandRow,
  mapLayer,
  metaRow,
  pill,
  pin,
  scrim,
} from "./frame";

type Props = {
  name: string;
  region: string;
  category: string;
  x: number;
  y: number;
  view: BasemapView;
  basemap: string;
};

function nameSize(name: string) {
  if (name.length <= 18) return 78;
  if (name.length <= 30) return 62;
  return 48;
}

/**
 * Element factory rather than a rendered component: `next/og` only needs the
 * tree, and the callers are route handlers that cannot hold JSX.
 */
export function locationOgCard({
  name,
  region,
  category,
  x,
  y,
  view,
  basemap,
}: Props): ReactElement {
  return (
    <div style={ROOT}>
      {mapLayer(basemap, view)}
      {scrim(BOTTOM_SCRIM)}
      {pin(project(view, x, y))}

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

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {pill(category)}
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: nameSize(name),
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {name}
          </div>
          {metaRow(
            region === name
              ? [`X ${Math.round(x)} · Y ${Math.round(y)}`]
              : [region, `X ${Math.round(x)} · Y ${Math.round(y)}`],
          )}
        </div>
      </div>
    </div>
  );
}
