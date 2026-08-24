#!/usr/bin/env npx tsx
/**
 * Generate article draft from a topic (LLM if OPENAI_API_KEY / GEMINI_API_KEY, else template).
 *
 *   npm run content:draft -- --topic <topicId>
 *   npm run content:draft -- --event-key <eventKey>
 */
import { generateDraftFromTopic } from "../../src/lib/content/generate-draft.ts";
import {
  getTopicByEventKey,
  listTopics,
} from "../../src/lib/content/repository.ts";
import type { Topic } from "../../src/lib/content/schema.ts";
import { argValue } from "./_shared.mts";

async function loadTopic(): Promise<Topic> {
  const id = argValue("--topic");
  const eventKey = argValue("--event-key");
  const topics = await listTopics();
  if (id) {
    const t = topics.find((x) => x.id === id);
    if (!t) throw new Error(`Topic not found: ${id}`);
    return t;
  }
  if (eventKey) {
    const t = await getTopicByEventKey(eventKey);
    if (!t) throw new Error(`Topic not found for eventKey: ${eventKey}`);
    return t;
  }
  const scored = topics.filter(
    (t) => t.status === "scored" || t.status === "new",
  );
  if (!scored.length) throw new Error("No scored topics. Run content:detect first.");
  return scored.sort((a, b) => b.score - a.score)[0];
}

async function main() {
  const topic = await loadTopic();
  console.log(`Topic: [${topic.score}] ${topic.headline}`);

  const result = await generateDraftFromTopic(topic);

  console.log(`\nDraft saved id=${result.article.id} slug=${result.article.slug}`);
  console.log(`SEO score=${result.seoScore}`);
  if (result.issues.length) {
    console.log("Issues:");
    for (const i of result.issues) console.log(`  - ${i}`);
  }
  console.log("\nNext: npm run content:review");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
