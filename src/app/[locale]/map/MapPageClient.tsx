"use client";

import { useSearchParams } from "next/navigation";
import { GameMap } from "@/components/map/GameMap";

export function MapPageClient() {
  const searchParams = useSearchParams();
  const x = searchParams.get("x");
  const y = searchParams.get("y");

  const focus =
    x && y ? { x: Number(x), y: Number(y) } : undefined;

  return <GameMap key={`${x}-${y}`} focus={focus} showSidebar className="h-full" />;
}
