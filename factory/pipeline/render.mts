#!/usr/bin/env npx tsx
/**
 * Render a brief through Remotion (1080×1920, one file).
 *
 *   npm run factory:render -- --brief <id>
 *   npm run factory:render -- --brief factory/data/briefs/foo.json
 */
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { canRender } from "../src/schema/job.ts";
import { COMPOSITION_IDS } from "../src/schema/brief.ts";
import {
  argValue,
  ensureDirs,
  factoryRoot,
  getJob,
  hasFlag,
  loadBrief,
  patchJob,
  paths,
  writeJson,
} from "./_shared.mts";

function main() {
  const id = argValue("--brief");
  if (!id) throw new Error("Usage: factory:render -- --brief <id>");
  ensureDirs();
  const brief = loadBrief(id);
  const job = getJob(brief.id);
  if (!hasFlag("--force") && (!job || !canRender(job.status))) {
    throw new Error(
      `Script gate: approve first (npm run factory:review -- --approve-script ${brief.id}) or pass --force`,
    );
  }
  const composition = COMPOSITION_IDS[brief.template];
  const propsPath = path.join(paths.briefs, `${brief.id}.props.json`);
  const outFile = path.join(paths.out, `${brief.id}.mp4`);
  const entry = path.join(factoryRoot, "src", "index.ts");
  writeJson(propsPath, { brief });

  if (!existsSync(path.join(factoryRoot, "node_modules", "remotion"))) {
    throw new Error("Remotion not installed. Run: npm install --prefix factory");
  }

  const result = spawnSync(
    "npx",
    [
      "remotion",
      "render",
      entry,
      composition,
      outFile,
      `--props=${propsPath}`,
    ],
    {
      cwd: factoryRoot,
      stdio: "inherit",
      env: process.env,
    },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  if (getJob(brief.id)) {
    patchJob(brief.id, { status: "rendered", outputPath: outFile });
  } else {
    throw new Error("Job missing after brief. Re-run factory:brief.");
  }

  console.log(`Rendered ${outFile}`);
  console.log(`Next: npm run factory:qa -- --brief ${brief.id}`);
}

main();
