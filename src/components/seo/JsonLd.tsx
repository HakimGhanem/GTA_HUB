/**
 * Renders structured data as an inline `application/ld+json` script.
 *
 * `<` and `>` are escaped to their unicode equivalents so a stray `</script>`
 * inside editorial copy (FAQ answers, guide prose) can never terminate the tag
 * early and silently void the whole block.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
