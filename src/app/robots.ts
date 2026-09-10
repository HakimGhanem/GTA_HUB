import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Answer-engine, assistant and training crawlers, allowed explicitly.
 *
 * A wildcard `allow` already covers them, but naming each one documents the
 * decision and survives a future tightening of the `*` group.
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google / Apple / Microsoft assistants
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "BingBot",
  "DuckAssistBot",
  // Meta, Amazon, Mistral, Cohere, others
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "MistralAI-User",
  "cohere-ai",
  "YouBot",
  "CCBot",
  "AI2Bot",
  "Diffbot",
  "Timpibot",
];

// `/overlay` stays crawlable on purpose — it carries a meta noindex that
// crawlers must be able to read.
const DISALLOWED_PATHS = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOWED_PATHS },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
