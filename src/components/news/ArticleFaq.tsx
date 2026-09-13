type Faq = { question: string; answer: string };

export function ArticleFaq({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <section className="mt-10 border-t border-white/10 pt-6">
      <h2 className="mb-4 text-lg font-semibold">FAQ</h2>
      <dl className="space-y-4">
        {faqs.map(({ question, answer }) => (
          <div
            key={question}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <dt className="font-semibold text-white">{question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-white/60">
              {answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}