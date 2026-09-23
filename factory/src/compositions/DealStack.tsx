import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BEAT_SEC,
  HOOK_SEC,
  type DealBeat,
  type VideoBrief,
} from "../schema/brief";
import { theme } from "../theme";
import { Captions } from "./Captions";
import { Shell } from "./Shell";

export function DealStack({ brief }: { brief: VideoBrief }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const items = brief.items.filter((i): i is DealBeat => "price" in i);
  const hookFrames = Math.round(HOOK_SEC * fps);
  const beatFrames = Math.round(BEAT_SEC * fps);
  const inHook = frame < hookFrames;
  const beatIndex = Math.min(
    items.length - 1,
    Math.max(0, Math.floor((frame - hookFrames) / beatFrames)),
  );
  const inEnd = frame >= hookFrames + items.length * beatFrames;
  const beatLocal = (frame - hookFrames) % beatFrames;
  const enter = spring({
    frame: inHook ? frame : beatLocal,
    fps,
    config: { damping: 16 },
  });
  const item = items[beatIndex];

  return (
    <Shell kicker="MAP-6 · DEALS" progress={frame / durationInFrames}>
      {inHook ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              transform: `translateY(${interpolate(enter, [0, 1], [36, 0])}px)`,
            }}
          >
          <div style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95 }}>
            {brief.hook}
          </div>
        </div>
      ) : inEnd ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 900 }}>{brief.ctaLabel}</div>
          <div style={{ fontSize: 32, color: theme.accent2 }}>
            {brief.ctaUrl.replace(/^https:\/\//, "")}
          </div>
          <div style={{ fontSize: 24, color: theme.muted }}>{brief.disclaimer}</div>
        </div>
      ) : item ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: 22,
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(236,72,153,0.16)",
              color: theme.accent,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            {item.platform} · {item.edition.toUpperCase()}
          </div>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.1 }}>
            {item.label}
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: theme.warn }}>
            {item.price}
          </div>
          <div style={{ fontSize: 34, color: theme.muted, lineHeight: 1.35 }}>
            {item.note}
          </div>
        </div>
      ) : null}
      {inHook || inEnd ? null : <Captions cues={brief.cues} timeSec={t} />}
    </Shell>
  );
}
