import { MIN_ARTICLE_WORDS } from "@/lib/content/word-count";

type Props = { wordCount: number };

/** Dev-only thin-content flag. Never blocks production render. */
export function ThinContentWarning({ wordCount }: Props) {
  if (process.env.NODE_ENV === "production") return null;
  if (wordCount >= MIN_ARTICLE_WORDS) return null;

  return (
    <p
      role="status"
      className="mt-4 rounded-lg border border-amber-400/40 bg-amber-400/15 px-3 py-2 text-xs text-amber-100"
    >
      Thin article: {wordCount} words (need ≥ {MIN_ARTICLE_WORDS} for Discover).
    </p>
  );
}
