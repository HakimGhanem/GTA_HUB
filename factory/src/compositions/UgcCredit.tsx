import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { END_SEC, UGC_BUMPER_SEC, type VideoBrief } from "../schema/brief";
import { theme } from "../theme";
import { Shell } from "./Shell";

export function UgcCredit({ brief }: { brief: VideoBrief }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const bumper = Math.round(UGC_BUMPER_SEC * fps);
  const endFrom = durationInFrames - Math.round(END_SEC * fps);
  const handle = brief.credit?.handle ?? "community";

  if (frame < bumper) {
    return (
      <Shell kicker="MAP-6 · COMMUNITY" progress={frame / durationInFrames}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 3, color: theme.accent2 }}>
            VIA
          </div>
          <div style={{ fontSize: 80, fontWeight: 900 }}>@{handle}</div>
          <div style={{ fontSize: 32, color: theme.muted }}>
            Posted with permission · credit on screen
          </div>
        </div>
      </Shell>
    );
  }

  if (frame >= endFrom) {
    return (
      <Shell kicker="MAP-6 · COMMUNITY" progress={frame / durationInFrames}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 900 }}>{brief.ctaLabel}</div>
          <div style={{ fontSize: 30, color: theme.accent2 }}>
            {brief.ctaUrl.replace(/^https:\/\//, "")}
          </div>
          <div style={{ fontSize: 24, color: theme.muted }}>{brief.disclaimer}</div>
        </div>
      </Shell>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {brief.footagePath ? (
        <OffthreadVideo
          src={brief.footagePath}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            color: theme.muted,
            fontSize: 36,
          }}
        >
          No footage attached
        </AbsoluteFill>
      )}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 48,
          padding: "12px 20px",
          borderRadius: 999,
          background: "rgba(10,14,23,0.72)",
          color: theme.fg,
          fontWeight: 800,
          fontSize: 28,
        }}
      >
        via @{handle}
      </div>
    </AbsoluteFill>
  );
}
