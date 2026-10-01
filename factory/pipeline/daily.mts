#!/usr/bin/env npx tsx
/**
 * Default: brief only, then human gates.
 * --skip-review : old auto path (render + QA + queue). Never sends unless --publish.
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

  if (!hasFlag("--skip-review")) {
    console.log(`Stopped at script gate: ${id}`);
    console.log("  npm run factory:review");
    console.log("  npm run factory:desk");
    return;
  }

  run("review.mts", ["--approve-script", id, "--notes", "skip-review"]);
  run("render.mts", ["--brief", id]);
  run("qa.mts", ["--brief", id]);
  run("review.mts", ["--approve-render", id, "--notes", "skip-review"]);
  const publishArgs = ["--brief", id, "--via", via];
  if (!hasFlag("--publish")) publishArgs.push("--dry-run");
  run("publish.mts", publishArgs);
  console.log(`Daily cycle done: ${id}`);
}

main();
