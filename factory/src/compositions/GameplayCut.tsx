import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { END_SEC, type VideoBrief } from "../schema/brief";
import { theme } from "../theme";
import { Captions } from "./Captions";
import { Shell } from "./Shell";

export function GameplayCut({ brief }: { brief: VideoBrief }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const endFrom = durationInFrames - Math.round(END_SEC * fps);
  const inEnd = frame >= endFrom;
  const showHook = t < 2.1;

  if (inEnd) {
    return (
      <Shell kicker="MAP-6 · PLAY" progress={frame / durationInFrames}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: 22,
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 3, color: theme.accent }}>
            KEEP PLAYING
          </div>
          <div style={{ fontSize: 58, fontWeight: 900 }}>{brief.ctaLabel}</div>
          <div style={{ fontSize: 30, color: theme.accent2, wordBreak: "break-all" }}>
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
            fontSize: 34,
          }}
        >
          Ingest a clip: npm run factory:ingest
        </AbsoluteFill>
      )}
      {brief.bedPath ? <Audio src={brief.bedPath} volume={0.16} /> : null}
      {showHook ? (
        <div
          style={{
            position: "absolute",
            left: theme.pad,
            right: theme.pad,
            top: 220,
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.05,
            textShadow: "0 4px 24px rgba(0,0,0,0.85)",
          }}
        >
          {brief.hook}
        </div>
      ) : (
        <Captions cues={brief.cues} timeSec={t} />
      )}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: theme.pad,
          letterSpacing: 3,
          fontWeight: 800,
          color: theme.accent,
          fontSize: 22,
        }}
      >
        MAP-6 · PLAY
      </div>
    </AbsoluteFill>
  );
}
