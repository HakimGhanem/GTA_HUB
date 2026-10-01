#!/usr/bin/env npx tsx
/**
 * Personal review desk — 127.0.0.1 only.
 *
 *   npm run factory:desk
 */
import { spawnSync } from "child_process";
import { createReadStream, existsSync, statSync } from "fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { loadBrief, loadJobs, paths, repoRoot } from "./_shared.mts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "..", "desk", "app.html");
const port = Number(process.env.FACTORY_DESK_PORT ?? 3847);

function run(script: string, extra: string[]) {
  const result = spawnSync(
    "npx",
    ["tsx", path.join("factory", "pipeline", script), ...extra],
    { cwd: repoRoot, encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || "command failed").slice(-800));
  }
}

function queuePayload() {
  return loadJobs()
    .filter((j) =>
      !["published", "skipped", "script_rejected", "render_rejected"].includes(
        j.status,
      ),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((j) => {
      const brief = loadBrief(j.briefId);
      const video = j.outputPath && existsSync(j.outputPath);
      return {
        id: j.id,
        status: j.status,
        template: j.template,
        hook: brief.hook,
        caption: brief.caption,
        qaIssues: j.qaIssues,
        hasVideo: Boolean(video),
      };
    });
}

function handleAction(body: {
  id?: string;
  kind?: string;
  text?: string;
  gate?: string;
  seconds?: number;
}) {
  const id = body.id;
  if (!id) throw new Error("id required");
  const sec = body.seconds != null ? ["--seconds", String(body.seconds)] : [];
  if (body.kind === "hook") {
    if (!body.text) throw new Error("text required");
    run("review.mts", ["--hook", id, "--text", body.text, ...sec]);
    return;
  }
  if (body.kind === "approve-script") {
    run("review.mts", ["--approve-script", id, ...sec]);
    return;
  }
  if (body.kind === "approve-render") {
    run("review.mts", ["--approve-render", id, ...sec]);
    return;
  }
  if (body.kind === "reject") {
    run("review.mts", ["--reject", id, "--gate", body.gate || "script", ...sec]);
    return;
  }
  if (body.kind === "render") {
    run("render.mts", ["--brief", id]);
    run("qa.mts", ["--brief", id]);
    return;
  }
  if (body.kind === "queue") {
    run("publish.mts", ["--brief", id, "--dry-run"]);
    return;
  }
  throw new Error(`Unknown kind ${body.kind}`);
}

function json(res: import("http").ServerResponse, code: number, data: unknown) {
  res.writeHead(code, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    createReadStream(htmlPath).pipe(res);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/queue") {
    try {
      json(res, 200, { jobs: queuePayload() });
    } catch (err) {
      json(res, 500, { error: err instanceof Error ? err.message : "fail" });
    }
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/media/")) {
    const id = decodeURIComponent(url.pathname.slice("/media/".length).replace(/\.mp4$/, ""));
    if (!/^[\w.-]+$/.test(id)) {
      res.writeHead(400);
      res.end();
      return;
    }
    const file = path.join(paths.out, `${id}.mp4`);
    if (!existsSync(file)) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, {
      "content-type": "video/mp4",
      "content-length": statSync(file).size,
    });
    createReadStream(file).pipe(res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/action") {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        handleAction(JSON.parse(Buffer.concat(chunks).toString() || "{}"));
        json(res, 200, { ok: true, jobs: queuePayload() });
      } catch (err) {
        json(res, 400, { error: err instanceof Error ? err.message : "fail" });
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Factory desk http://127.0.0.1:${port}`);
});
