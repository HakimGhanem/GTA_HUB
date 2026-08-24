import { config as loadEnv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  eventKeyFromHeadline,
  slugify,
} from "../../src/lib/content/ids.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

loadEnv({ path: path.join(root, ".env.local") });
loadEnv({ path: path.join(root, ".env") });

export { eventKeyFromHeadline, slugify };

export function argValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

export function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}
