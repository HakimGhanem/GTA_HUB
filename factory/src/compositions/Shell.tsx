import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

type ShellProps = {
  children: React.ReactNode;
  kicker?: string;
  progress: number;
};

export function Shell({ children, kicker = "MAP-6", progress }: ShellProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fade = interpolate(frame, [0, 8, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        color: theme.fg,
        fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif',
        opacity: fade,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, #3b0764 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, #083344 0%, transparent 45%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 48,
          left: theme.pad,
          right: theme.pad,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          letterSpacing: 3,
          fontSize: 22,
          fontWeight: 700,
          color: theme.accent,
        }}
      >
        <span>{kicker}</span>
        <span style={{ color: theme.muted, letterSpacing: 2 }}>FAN MAP</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: theme.safeTop,
          left: theme.pad,
          right: theme.pad,
          bottom: theme.safeBottom,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: theme.pad,
          right: theme.pad,
          bottom: 120,
          height: 6,
          borderRadius: 99,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
            height: "100%",
            background: theme.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
