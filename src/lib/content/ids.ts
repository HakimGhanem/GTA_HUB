import { createHash } from "crypto";

/** Stable daily dedup key from a headline (+ calendar day). */
export function eventKeyFromHeadline(
  headline: string,
  day = new Date(),
): string {
  const d = day.toISOString().slice(0, 10);
  const slug = headline
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const hash = createHash("sha1")
    .update(`${slug}:${d}`)
    .digest("hex")
    .slice(0, 8);
  return `${slug}-${hash}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
