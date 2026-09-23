import { createHash } from "crypto";
import { config as loadEnv } from "dotenv";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { FactoryJob, DailyQuota, PublishPlatform } from "../src/schema/job.ts";
import type { VideoBrief } from "../src/schema/brief.ts";
import type { UgcSubmission } from "../src/schema/ugc.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const factoryRoot = path.resolve(__dirname, "..");
export const repoRoot = path.resolve(factoryRoot, "..");

loadEnv({ path: path.join(repoRoot, ".env.local") });
loadEnv({ path: path.join(repoRoot, ".env") });

export const paths = {
  briefs: path.join(factoryRoot, "data", "briefs"),
  out: path.join(factoryRoot, "out"),
  registry: path.join(factoryRoot, "data", "registry"),
  ugc: path.join(factoryRoot, "data", "ugc"),
  assets: path.join(factoryRoot, "data", "assets"),
  queue: path.join(factoryRoot, "out", "publish-queue"),
};

export function ensureDirs() {
  for (const dir of Object.values(paths)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function argValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

export function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

export function sha256File(filePath: string): string {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

export function writeJson(filePath: string, data: unknown) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

export function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function jobsPath() {
  return path.join(paths.registry, "jobs.json");
}

function quotaPath() {
  return path.join(paths.registry, "quota.json");
}

export function loadJobs(): FactoryJob[] {
  if (!existsSync(jobsPath())) return [];
  return readJson<FactoryJob[]>(jobsPath());
}

export function saveJobs(jobs: FactoryJob[]) {
  writeJson(jobsPath(), jobs);
}

export function upsertJob(job: FactoryJob) {
  const jobs = loadJobs().filter((j) => j.id !== job.id);
  jobs.push(job);
  saveJobs(jobs);
}

export function loadQuota(): DailyQuota {
  const day = new Date().toISOString().slice(0, 10);
  if (!existsSync(quotaPath())) {
    return { day, counts: { instagram: 0, tiktok: 0, youtube: 0 } };
  }
  const q = readJson<DailyQuota>(quotaPath());
  if (q.day !== day) {
    return { day, counts: { instagram: 0, tiktok: 0, youtube: 0 } };
  }
  return q;
}

export function saveQuota(q: DailyQuota) {
  writeJson(quotaPath(), q);
}

export function bumpQuota(platforms: PublishPlatform[]) {
  const q = loadQuota();
  for (const p of platforms) q.counts[p] += 1;
  saveQuota(q);
}

export function saveBrief(brief: VideoBrief): string {
  ensureDirs();
  const file = path.join(paths.briefs, `${brief.id}.json`);
  writeJson(file, brief);
  writeJson(path.join(paths.briefs, "latest.json"), { id: brief.id, file });
  return file;
}

export function loadLatestBriefId(): string {
  const latest = path.join(paths.briefs, "latest.json");
  if (!existsSync(latest)) throw new Error("No latest brief. Run factory:brief.");
  return readJson<{ id: string }>(latest).id;
}

export function loadBrief(idOrPath: string): VideoBrief {
  const file = existsSync(idOrPath)
    ? idOrPath
    : path.join(paths.briefs, `${idOrPath}.json`);
  if (!existsSync(file)) {
    throw new Error(`Brief not found: ${idOrPath}`);
  }
  return readJson<VideoBrief>(file);
}

export function saveUgc(sub: UgcSubmission): string {
  ensureDirs();
  const file = path.join(paths.ugc, `${sub.id}.json`);
  writeJson(file, sub);
  return file;
}

export const DISCLAIMER =
  "Fan-made map. Not Rockstar or Take-Two. Official frames first.";
