import React from "react";
import type { CaptionCue } from "../schema/brief";
import { theme } from "../theme";

export function Captions({
  cues,
  timeSec,
}: {
  cues?: CaptionCue[];
  timeSec: number;
}) {
  const active = cues?.find((c) => timeSec >= c.startSec && timeSec < c.endSec);
  if (!active) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: theme.pad,
        right: theme.pad,
        bottom: theme.safeBottom + 24,
        textAlign: "center",
        fontSize: 42,
        fontWeight: 800,
        lineHeight: 1.2,
        textShadow: "0 2px 16px rgba(0,0,0,0.8)",
      }}
    >
      {active.text}
    </div>
  );
}
