/**
 * Answer-first summary block.
 *
 * The `.geo-answer` class is referenced by the `speakable` specification in
 * the page's JSON-LD, so keep it on the element that holds the quotable text.
 */
export function AnswerBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className="mt-6 rounded-xl border border-pink-400/25 bg-pink-500/5 p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-pink-300">
        {label}
      </p>
      <p className="geo-answer mt-2 text-base leading-relaxed text-white/90">
        {children}
      </p>
    </section>
  );
}
