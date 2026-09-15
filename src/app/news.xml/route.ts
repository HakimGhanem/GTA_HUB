import { SITE } from "@/lib/constants";
import { evergreenPathForNews } from "@/lib/content/news-canonical";
import { listPublishedArticles } from "@/lib/content/repository";
import { countMarkdownWords, MIN_ARTICLE_WORDS } from "@/lib/content/word-count";

export const dynamic = "force-dynamic";

/** EN news RSS feed — https://map-6.com/news.xml */
export async function GET() {
  const articles = (await listPublishedArticles("en")).filter(
    (a) =>
      !evergreenPathForNews(a.slug) &&
      countMarkdownWords(a.bodyMarkdown) >= MIN_ARTICLE_WORDS,
  );

  const items = articles
    .map((a) => {
      const link = `${SITE.url}/en/news/${a.slug}`;
      const pub = a.publishedAt || a.updatedAt;
      return `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(pub).toUTCString()}</pubDate>
      <description><![CDATA[${a.description}]]></description>
      <category>${a.cluster}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Map-6 News — GTA 6 Map &amp; Trailer Updates</title>
    <link>${SITE.url}/en/news</link>
    <description>GTA 6 trailer news, map updates, preorder guides, and location intel from Map-6.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
