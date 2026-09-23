import { marked, type Tokens } from "marked";

const ALLOWED_IMG = /^\/(api\/og\/|images\/)/;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const renderer = new marked.Renderer();

renderer.image = ({ href, title, text }: Tokens.Image) => {
  if (!ALLOWED_IMG.test(href)) return "";
  const alt = escapeHtml(text);
  const caption = escapeHtml(title || text);
  return `<figure class="article-figure my-8">
  <img src="${escapeHtml(href)}" alt="${alt}" width="1200" height="630" loading="lazy" class="aspect-[1200/630] w-full rounded-xl border border-foreground/10 object-cover" />
  <figcaption class="mt-2 text-center text-xs leading-relaxed text-foreground/45">${caption}</figcaption>
</figure>`;
};

marked.setOptions({
  gfm: true,
  breaks: false,
  renderer,
});

/** Server-side markdown → HTML for news articles */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export type ArticleImage = { src: string; alt: string };

/** Relative in-body images for NewsArticle JSON-LD (hero is added separately). */
export function extractMarkdownImages(markdown: string): ArticleImage[] {
  const out: ArticleImage[] = [];
  const re = /!\[([^\]]*)]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
  for (const match of markdown.matchAll(re)) {
    const src = match[2];
    if (!ALLOWED_IMG.test(src)) continue;
    out.push({ src, alt: match[3] || match[1] || "" });
  }
  return out;
}
