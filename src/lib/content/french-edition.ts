import {
  clampDescription,
  clampTitle,
  cleanModelText,
  groqCall,
} from "./generate-draft";
import { upsertArticle } from "./repository";
import type { Article } from "./schema";
import { countMarkdownWords } from "./word-count";

/**
 * The cron only ever published English, so /fr/news/<slug> fell back to the
 * English body behind a noindex canonical — half the desk invisible in the
 * locale with the least competition. This writes the French edition from the
 * same verified facts, as a new article rather than a translation.
 */

const FR_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    bodyMarkdown: { type: "string" },
  },
  required: ["title", "description", "bodyMarkdown"],
  additionalProperties: false,
} as const;

const FR_RULES = `Tu es la rédaction francophone de Map-6, un desk cartographique sur GTA 6.

On te donne un article anglais déjà vérifié. Tu écris l'édition française : mêmes faits, mêmes chiffres, mêmes sources — mais un article neuf, pas une traduction. Phrases différentes, ordre des arguments repensé pour un lecteur francophone, exemples et repères adaptés (prix en euros quand l'article en donne, fuseau Europe/Paris quand une heure est citée).

Règles absolues :
- N'invente aucun fait. Pas de date de trailer, de date PC, d'ASIN, de superficie en km², de titre de mission ni de pourcentage qui ne soit pas déjà dans l'article source.
- Sortie du jeu : 19 novembre 2026, PS5 et Xbox Series X|S. Préchargement : 12 novembre 2026. Standard 79,99 $, Ultimate 99,99 $. Version PC non annoncée. Ne contredis jamais ces faits.
- Écris comme un journaliste qui garde une carte ouverte : phrases courtes, noms précis (Leonida Keys, pack Vintage Vice City, code en boîte).
- Liens internes en français uniquement, avec une ancre descriptive : [la carte interactive](/fr/map), [les lieux](/fr/locations), [le guide de précommande](/fr/guides/gta-6-preorder-guide), [le guide de la carte](/fr/guides/gta-6-map-guide). N'utilise que ces quatre chemins, au moins trois fois en tout.
- Aucun marqueur de citation, aucune ligne « Mots-clés : » : la liste des sources est rendue séparément.
- Le corps fait au moins 900 mots, en paragraphes rédigés, pas en liste de faits.
- Titre entre 30 et 60 caractères, meta description entre 120 et 160, les deux finissant sur un mot complet.`;

/**
 * Drafts the French edition of a published English article. Returns null when
 * the model is unavailable or the result is too thin to be worth indexing —
 * the English article stays published either way.
 */
export async function draftFrenchEdition(
  source: Article,
): Promise<Article | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const effort = process.env.GROQ_REASONING_EFFORT || "low";

  try {
    const message = await groqCall(key, {
      model,
      reasoning_effort: effort,
      response_format: {
        type: "json_schema",
        json_schema: { name: "fr_edition", strict: true, schema: FR_SCHEMA },
      },
      messages: [
        { role: "system", content: FR_RULES },
        {
          role: "user",
          content: `Article source (anglais)\n\nTitre : ${source.title}\nDescription : ${source.description}\n\n${source.bodyMarkdown}`,
        },
      ],
    });

    const parsed = JSON.parse(message.content ?? "{}") as {
      title?: string;
      description?: string;
      bodyMarkdown?: string;
    };

    const bodyMarkdown = cleanModelText(parsed.bodyMarkdown ?? "");
    const title = clampTitle(parsed.title ?? "", "");
    const description = clampDescription(parsed.description ?? "", "");

    // An empty clamp fallback means the model missed the length window; a
    // short body means it summarised instead of writing the edition.
    if (!title || !description || countMarkdownWords(bodyMarkdown) < 600) {
      return null;
    }

    return await upsertArticle({
      slug: source.slug,
      locale: "fr",
      title,
      description,
      bodyMarkdown,
      cluster: source.cluster,
      primaryKeyword: source.primaryKeyword,
      secondaryKeywords: source.secondaryKeywords,
      sources: source.sources,
      status: "drafted",
      heroImage: source.heroImage,
      author: source.author,
      relatedLocationSlugs: source.relatedLocationSlugs,
      relatedGuideSlugs: source.relatedGuideSlugs,
      eventKey: `${source.eventKey}-fr`,
      funnelKind: source.funnelKind,
      affiliateIntents: source.affiliateIntents,
      clipHook: source.clipHook,
      mapCtaPath: source.mapCtaPath,
      notes: `French edition of ${source.id} (Groq ${model})`,
    });
  } catch (err) {
    console.warn("French edition failed:", err);
    return null;
  }
}
