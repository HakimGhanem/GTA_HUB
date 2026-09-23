#!/usr/bin/env npx tsx
/**
 * QA gate before any publish: ratio, duration, hash, template variance.
 *
 *   npm run factory:qa -- --brief <id>
 */
import { spawnSync } from "child_process";
import { existsSync, statSync } from "fs";
import path from "path";
import { briefDurationSec, HEIGHT, WIDTH } from "../src/schema/brief.ts";
import type { FactoryJob } from "../src/schema/job.ts";
import {
  argValue,
  loadBrief,
  loadJobs,
  paths,
  sha256File,
  upsertJob,
} from "./_shared.mts";

type Probe = {
  duration?: number;
  width?: number;
  height?: number;
};

function ffprobe(file: string): Probe {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height:format=duration",
      "-of",
      "json",
      file,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return {};
  try {
    const json = JSON.parse(result.stdout) as {
      streams?: { width?: number; height?: number }[];
      format?: { duration?: string };
    };
    return {
      width: json.streams?.[0]?.width,
      height: json.streams?.[0]?.height,
      duration: json.format?.duration
        ? Number(json.format.duration)
        : undefined,
    };
  } catch {
    return {};
  }
}

function main() {
  const id = argValue("--brief");
  if (!id) throw new Error("Usage: factory:qa -- --brief <id>");
  const brief = loadBrief(id);
  const outFile = path.join(paths.out, `${brief.id}.mp4`);
  const issues: string[] = [];

  if (!existsSync(outFile)) {
    issues.push(`missing render: ${outFile}`);
  } else if (statSync(outFile).size < 20_000) {
    issues.push("file too small to be a real encode");
  }

  const probe = existsSync(outFile) ? ffprobe(outFile) : {};
  if (probe.width && probe.width !== WIDTH) {
    issues.push(`width ${probe.width} !== ${WIDTH}`);
  }
  if (probe.height && probe.height !== HEIGHT) {
    issues.push(`height ${probe.height} !== ${HEIGHT}`);
  }
  if (probe.duration) {
    if (probe.duration < 5 || probe.duration > 90) {
      issues.push(`duration ${probe.duration.toFixed(1)}s outside 5–90s`);
    }
    const expected = briefDurationSec(brief);
    if (Math.abs(probe.duration - expected) > 1.2) {
      issues.push(
        `duration ${probe.duration.toFixed(1)}s vs brief ${expected.toFixed(1)}s`,
      );
    }
  }

  const hash = existsSync(outFile) ? sha256File(outFile) : undefined;
  const twins = loadJobs().filter(
    (j) => j.sha256 && j.sha256 === hash && j.id !== brief.id,
  );
  if (twins.length) {
    issues.push(`duplicate sha256 of job ${twins[0].id}`);
  }

  const sameTemplateToday = loadJobs().filter((j) => {
    const day = j.createdAt.slice(0, 10);
    return (
      j.template === brief.template &&
      day === brief.createdAt.slice(0, 10) &&
      j.status === "published"
    );
  });
  if (sameTemplateToday.length >= 4) {
    issues.push(
      `template ${brief.template} already published ${sameTemplateToday.length}× today`,
    );
  }

  const existing = loadJobs().find((j) => j.id === brief.id);
  const job: FactoryJob = {
    id: brief.id,
    briefId: brief.id,
    eventKey: brief.eventKey,
    template: brief.template,
    status: issues.length ? "qa_failed" : "qa_passed",
    outputPath: existsSync(outFile) ? outFile : existing?.outputPath,
    sha256: hash,
    durationSec: probe.duration,
    width: probe.width,
    height: probe.height,
    qaIssues: issues,
    platforms: existing?.platforms ?? ["instagram", "tiktok", "youtube"],
    createdAt: existing?.createdAt ?? brief.createdAt,
    updatedAt: new Date().toISOString(),
  };
  upsertJob(job);

  if (issues.length) {
    console.error(`QA FAIL ${brief.id}`);
    for (const issue of issues) console.error(`  - ${issue}`);
    process.exit(1);
  }
  console.log(`QA PASS ${brief.id}`);
  if (probe.duration) {
    console.log(`  ${probe.width}×${probe.height} ${probe.duration.toFixed(2)}s`);
  }
  if (hash) console.log(`  sha256 ${hash.slice(0, 12)}…`);
  console.log(`Next: npm run factory:publish -- --brief ${brief.id} --dry-run`);
}

main();
