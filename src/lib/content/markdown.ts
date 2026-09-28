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

/** Widths the Next image optimizer accepts out of the box (deviceSizes). */
const SRCSET_WIDTHS = [640, 828, 1080, 1200, 1920];

/** OG routes emit 1200×630 PNGs; the optimizer resizes them and serves WebP. */
function optimizedSrc(href: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(href)}&w=${width}&q=75`;
}

renderer.image = ({ href, title, text }: Tokens.Image) => {
  if (!ALLOWED_IMG.test(href)) return "";
  const alt = escapeHtml(text);
  const caption = escapeHtml(title || text);
  const srcset = SRCSET_WIDTHS.map(
    (w) => `${escapeHtml(optimizedSrc(href, w))} ${w}w`,
  ).join(", ");
  return `<figure class="article-figure my-8">
  <img src="${escapeHtml(optimizedSrc(href, 1200))}" srcset="${srcset}" sizes="(min-width: 768px) 736px, 100vw" alt="${alt}" width="1200" height="630" loading="lazy" decoding="async" class="aspect-[1200/630] w-full rounded-xl border border-foreground/10 object-cover" />
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
