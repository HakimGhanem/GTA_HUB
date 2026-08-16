import { AD_SLOTS } from "@/lib/ads-config";
import { AdUnit } from "@/components/ads/AdUnit";
import { renderMarkdown } from "@/lib/content/markdown";

type Props = {
  markdown: string;
  showInArticleAd?: boolean;
};

/** Split markdown roughly in half and insert mid-article ad. */
export function ArticleBody({ markdown, showInArticleAd = true }: Props) {
  const html = renderMarkdown(markdown);
  const parts = splitHtmlForAd(html);
  const slot = AD_SLOTS.inArticle;

  return (
    <div className="prose prose-invert mt-8 max-w-none prose-a:text-pink-300 prose-headings:text-white prose-strong:text-white">
      <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
      {showInArticleAd && slot ? (
        <AdUnit slot={slot} format="fluid" layout="in-article" />
      ) : null}
      {parts[1] ? (
        <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
      ) : null}
    </div>
  );
}

function splitHtmlForAd(html: string): [string, string?] {
  const marker = "</p>";
  const idxs: number[] = [];
  let from = 0;
  while (true) {
    const i = html.indexOf(marker, from);
    if (i === -1) break;
    idxs.push(i + marker.length);
    from = i + marker.length;
  }
  if (idxs.length < 3) return [html];
  const cut = idxs[Math.floor(idxs.length / 2)];
  return [html.slice(0, cut), html.slice(cut)];
}
