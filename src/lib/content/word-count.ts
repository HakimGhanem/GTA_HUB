const TOKEN_RE = /[A-Za-zÀ-ÿ0-9'’]+/g;

/** Visible-ish word count from markdown (strips URLs and fencing). */
export function countMarkdownWords(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/^#{1,6}\s+/gm, " ");
  return stripped.match(TOKEN_RE)?.length ?? 0;
}

export const MIN_ARTICLE_WORDS = 400;
