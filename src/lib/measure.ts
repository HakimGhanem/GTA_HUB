import type { GameCoords } from "./coordinates";

export function gameDistance(a: GameCoords, b: GameCoords): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function pathDistance(points: GameCoords[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += gameDistance(points[i - 1], points[i]);
  }
  return total;
}

export function formatGameDistance(units: number): string {
  if (units >= 1000) return `${(units / 1000).toFixed(2)}k units`;
  return `${Math.round(units)} units`;
}
