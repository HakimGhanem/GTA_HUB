"use client";

import { GameMap } from "@/components/map/GameMap";

type LocationMapProps = {
  x: number;
  y: number;
};

export function LocationMap({ x, y }: LocationMapProps) {
  return <GameMap focus={{ x, y }} />;
}
