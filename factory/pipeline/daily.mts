#!/usr/bin/env npx tsx
/**
 * One factory cycle: brief → render → QA → queue (no send unless --publish).
 *
 *   npm run factory:daily
 *   npm run factory:daily -- --template deal --publish --via ayrshare
 */
import { spawnSync } from "child_process";
import path from "path";
import { argValue, hasFlag, loadLatestBriefId, repoRoot } from "./_shared.mts";

function run(script: string, extra: string[]) {
  const result = spawnSync(
    "npx",
    ["tsx", path.join("factory", "pipeline", script), ...extra],
    { cwd: repoRoot, stdio: "inherit", env: process.env },
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function main() {
  const template = argValue("--template") ?? "poi";
  const locale = argValue("--locale") ?? "en";
  const prompt = argValue("--prompt");
  const via = argValue("--via") ?? "queue";

  const briefArgs = ["--template", template, "--locale", locale];
  if (prompt) briefArgs.push("--prompt", prompt);
  if (hasFlag("--from-detect")) briefArgs.push("--from-detect");
  if (hasFlag("--no-llm")) briefArgs.push("--no-llm");

  run("brief.mts", briefArgs);
  const id = loadLatestBriefId();
  run("render.mts", ["--brief", id]);
  run("qa.mts", ["--brief", id]);

  const publishArgs = ["--brief", id, "--via", via];
  if (!hasFlag("--publish")) publishArgs.push("--dry-run");
  run("publish.mts", publishArgs);
  console.log(`Daily cycle done: ${id}`);
}

main();
