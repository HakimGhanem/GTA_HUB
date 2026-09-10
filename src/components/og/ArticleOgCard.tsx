import type { ReactElement } from "react";
import type { BasemapView } from "@/lib/og/basemap";
import {
  BOTTOM_SCRIM,
  LAYER,
  ROOT,
  brandRow,
  mapLayer,
  metaRow,
  pill,
  scrim,
} from "./frame";

const MAX_TITLE = 92;

type Props = {
  kicker: string;
  title: string;
  meta: string[];
  view: BasemapView;
  basemap: string;
};

function titleSize(title: string) {
  if (title.length <= 34) return 72;
  if (title.length <= 58) return 58;
  return 46;
}

/** Satori has no reliable line clamp, so long headlines are cut on a word. */
function trim(title: string) {
  if (title.length <= MAX_TITLE) return title;
  const cut = title.slice(0, MAX_TITLE);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function articleOgCard({
  kicker,
  title,
  meta,
  view,
  basemap,
}: Props): ReactElement {
  const headline = trim(title);

  return (
    <div style={ROOT}>
      {mapLayer(basemap, view)}
      {scrim(BOTTOM_SCRIM, 0.42)}

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
              maxWidth: 1010,
              fontSize: titleSize(headline),
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            {headline}
          </div>
          {meta.length > 0 && metaRow(meta)}
        </div>
      </div>
    </div>
  );
}
