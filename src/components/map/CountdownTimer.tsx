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
      <span className="text-white/40">:</span>
      <span>{pad(time.hours)}</span>
      <span className="text-white/40">:</span>
      <span>{pad(time.minutes)}</span>
      <span className="text-white/40">:</span>
      <span>{pad(time.seconds)}</span>
    </>
  );
}

function Placeholder() {
  return (
    <>
      <span>--</span>
      <span className="text-white/40">:</span>
      <span>--</span>
      <span className="text-white/40">:</span>
      <span>--</span>
      <span className="text-white/40">:</span>
      <span>--</span>
    </>
  );
}

export function CountdownTimer() {
  const t = useTranslations("header");
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTime(calcTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-center gap-1 font-mono text-sm tabular-nums text-pink-300"
      aria-label={t("countdownAria")}
      suppressHydrationWarning
    >
      {time ? <TimeDisplay time={time} /> : <Placeholder />}
    </div>
  );
}
