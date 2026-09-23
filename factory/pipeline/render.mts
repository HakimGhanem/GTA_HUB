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
import { COMPOSITION_IDS } from "../src/schema/brief.ts";
import {
  argValue,
  ensureDirs,
  factoryRoot,
  loadBrief,
  paths,
  upsertJob,
  writeJson,
} from "./_shared.mts";

function main() {
  const id = argValue("--brief");
  if (!id) throw new Error("Usage: factory:render -- --brief <id>");
  ensureDirs();
  const brief = loadBrief(id);
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

  upsertJob({
    id: brief.id,
    briefId: brief.id,
    eventKey: brief.eventKey,
    template: brief.template,
    status: "rendered",
    outputPath: outFile,
    qaIssues: [],
    platforms: ["instagram", "tiktok", "youtube"],
    createdAt: brief.createdAt,
    updatedAt: new Date().toISOString(),
  });

  console.log(`Rendered ${outFile}`);
  console.log(`Next: npm run factory:qa -- --brief ${brief.id}`);
}

main();
