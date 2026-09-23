import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BEAT_SEC,
  HOOK_SEC,
  type PoiBeat,
  type VideoBrief,
} from "../schema/brief";
import { theme } from "../theme";
import { Captions } from "./Captions";
import { Shell } from "./Shell";

function MiniMap({ items, active }: { items: PoiBeat[]; active: number }) {
  const xs = items.map((i) => i.x);
  const ys = items.map((i) => i.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const nx = (x: number) => ((x - minX) / Math.max(1, maxX - minX)) * 100;
  const ny = (y: number) => ((y - minY) / Math.max(1, maxY - minY)) * 100;

  return (
    <div
      style={{
        position: "relative",
        height: 220,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(8,16,32,0.6)",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.slug}
          style={{
            position: "absolute",
            left: `${nx(item.x)}%`,
            top: `${ny(item.y)}%`,
            width: i === active ? 18 : 10,
            height: i === active ? 18 : 10,
            marginLeft: i === active ? -9 : -5,
            marginTop: i === active ? -9 : -5,
            borderRadius: 99,
            background: i === active ? theme.accent : theme.accent2,
            boxShadow: i === active ? `0 0 18px ${theme.accent}` : "none",
          }}
        />
      ))}
    </div>
  );
}

export function PoiCountdown({ brief }: { brief: VideoBrief }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const items = brief.items.filter((i): i is PoiBeat => "slug" in i);
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
    config: { damping: 14 },
  });
  const item = items[beatIndex];
  const rank = items.length - beatIndex;

  return (
    <Shell progress={frame / durationInFrames}>
      {inHook ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
            }}
          >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 4,
              color: theme.accent2,
              marginBottom: 24,
            }}
          >
            LEONIDA · PINS
          </div>
          <div style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95 }}>
            {brief.hook}
          </div>
        </div>
      ) : inEnd ? (
        <EndCard brief={brief} />
      ) : item ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: 28,
            transform: `translateY(${interpolate(enter, [0, 1], [28, 0])}px)`,
            opacity: enter,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: theme.accent,
              lineHeight: 1,
            }}
          >
            {String(rank).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
            {item.name}
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(34,211,238,0.12)",
              color: theme.accent2,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {item.region}
          </div>
          <div style={{ fontSize: 36, color: theme.muted, lineHeight: 1.35 }}>
            {item.line}
          </div>
          <MiniMap items={items} active={beatIndex} />
        </div>
      ) : null}
      {inHook || inEnd ? null : <Captions cues={brief.cues} timeSec={t} />}
    </Shell>
  );
}

function EndCard({ brief }: { brief: VideoBrief }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        gap: 28,
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 3, color: theme.accent }}>
        OPEN THE PIN
      </div>
      <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.05 }}>
        {brief.ctaLabel}
      </div>
      <div style={{ fontSize: 32, color: theme.accent2, wordBreak: "break-all" }}>
        {brief.ctaUrl.replace(/^https:\/\//, "")}
      </div>
      <div style={{ fontSize: 24, color: theme.muted, lineHeight: 1.4 }}>
        {brief.disclaimer}
      </div>
    </div>
  );
}
