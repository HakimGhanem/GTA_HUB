import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

/** Server-side markdown → HTML for news articles */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
