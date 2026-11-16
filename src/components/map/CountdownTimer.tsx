"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { GTA6_RELEASE } from "@/lib/constants";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, GTA6_RELEASE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimeDisplay({ time }: { time: TimeLeft }) {
  return (
    <>
      <span>{pad(time.days)}</span>
      <span className="text-foreground/40">:</span>
      <span>{pad(time.hours)}</span>
      <span className="text-foreground/40">:</span>
      <span>{pad(time.minutes)}</span>
      <span className="text-foreground/40">:</span>
      <span>{pad(time.seconds)}</span>
    </>
  );
}

function Placeholder() {
  return (
    <>
      <span>--</span>
      <span className="text-foreground/40">:</span>
      <span>--</span>
      <span className="text-foreground/40">:</span>
      <span>--</span>
      <span className="text-foreground/40">:</span>
      <span>--</span>
    </>
  );
}

function isOver(time: TimeLeft): boolean {
  return time.days + time.hours + time.minutes + time.seconds === 0;
}

export function CountdownTimer({ variant = "inline" }: { variant?: "inline" | "hero" }) {
  const t = useTranslations("header");
  const tCountdown = useTranslations("countdown");
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTime(calcTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (variant === "hero") {
    // Nothing to count down to on launch day; the hero keeps its other badges.
    if (!time || isOver(time)) return null;
    return (
      <div
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-pink-400/30 bg-black/55 px-4 py-1.5 backdrop-blur-md"
        aria-label={t("countdownAria")}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
          {tCountdown("label")}
        </span>
        <span className="flex items-baseline gap-2 font-mono text-base font-bold tabular-nums text-accent">
          {(
            [
              [time.days, tCountdown("days")],
              [time.hours, tCountdown("hours")],
              [time.minutes, tCountdown("minutes")],
              [time.seconds, tCountdown("seconds")],
            ] as const
          ).map(([value, unit]) => (
            <span key={unit}>
              {pad(value)}
              <span className="ml-0.5 text-[10px] font-medium text-foreground/50">
                {unit.charAt(0)}
              </span>
            </span>
          ))}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 font-mono text-sm tabular-nums text-accent"
      aria-label={t("countdownAria")}
      suppressHydrationWarning
    >
      {time ? <TimeDisplay time={time} /> : <Placeholder />}
    </div>
  );
}
