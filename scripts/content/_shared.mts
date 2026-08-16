import { createHash } from "crypto";
import { config as loadEnv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

loadEnv({ path: path.join(root, ".env.local") });
loadEnv({ path: path.join(root, ".env") });

export function eventKeyFromHeadline(headline: string, day = new Date()): string {
  const d = day.toISOString().slice(0, 10);
  const slug = headline
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const hash = createHash("sha1").update(`${slug}:${d}`).digest("hex").slice(0, 8);
  return `${slug}-${hash}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function argValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

export function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}
