import {
  formatEur,
  lowestPriceEur,
  MSRP_EUR,
  savingsVsMsrp,
  type OfferAvailability,
  type OfferBonusKey,
  type OfferEdition,
  type OfferFormat,
  type OfferPlatform,
  type OfferPolicyKey,
} from "./gta6-retailers";

export type BestPriceCopy = {
  eyebrow: string;
  title: string;
  description: string;
  /** Body paragraphs — `{low}`, `{high}` and `{save}` are replaced at render */
  body: string[];
  comparatorTitle: string;
  comparatorBody: string;
  /** `{date}` placeholder */
  surveyNote: string;
  /**
   * Replaces `surveyNote` once the survey passes
   * `PRICE_SURVEY_MAX_AGE_DAYS`. `{date}` and `{days}` are replaced.
   */
  surveyStaleNote: string;
  disclosure: string;
  bestPriceBadge: string;
  officialBadge: string;
  /** `{amount}` placeholder */
  savingsLabel: string;
  msrpLabel: string;
  noPriceLabel: string;
  ctaLabel: string;
  platformLabels: Record<OfferPlatform, string>;
  editionLabels: Record<OfferEdition, string>;
  formatLabels: Record<OfferFormat, string>;
  availabilityLabels: Record<OfferAvailability, string>;
  bonusLabels: Record<OfferBonusKey, string>;
  policyLabels: Record<OfferPolicyKey, string>;
  fieldLabels: { bonus: string; policy: string; availability: string };
  faqTitle: string;
  faq: { question: string; answer: string }[];
  relatedTitle: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  backToGuides: string;
};

const EN: BestPriceCopy = {
  eyebrow: "Price comparison",
  title: "GTA 6 Best Price — Amazon vs Fnac vs Cdiscount vs Carrefour",
  description:
    "Where GTA 6 is cheapest in France: retailer code-in-box boxes around €60 against €79.99 on the PlayStation and Microsoft stores, with bonuses, stock and cancellation rules compared.",
  body: [
    "Grand Theft Auto VI has one official price and several real ones. Take-Two set Standard at €{high} and Ultimate at €99.99 on the PlayStation Store and the Microsoft Store, and those pages never discount. French retailers price the same Standard SKU as a physical product, so Amazon.fr, Fnac, Cdiscount and Carrefour have all sat around €{low} — roughly €{save} off the same game, on the same platform.",
    "What you actually receive matters. Retailer boxes for GTA 6 contain a download code, not a disc. You redeem it on PlayStation Network or Xbox, download the full game (up to 212 GB on PS5) and the licence behaves exactly like a digital purchase. What changes is the checkout: a physical order can be returned or price-protected in ways a store-wallet purchase cannot.",
    "Bonuses no longer differentiate anyone. The Vintage Vice City Pack only applied to eligible purchases made before November 20, 2026, so a copy bought today comes without it wherever you shop; the free month of GTA+ was tied to eligible digital copies rather than to a particular shop. No French retailer has offered a store-exclusive vehicle, weapon or skin. Any listing promising one is inventing it.",
    "Stock is the real constraint. Rockstar allocates code quotas per retailer, so the €{low} listings sell through in waves and come back: Amazon.fr went out of stock within 48 hours of pre-orders opening, then alternated between in stock and unavailable for weeks. The official stores never sell out. That is the trade: €{save} saved against the possibility of waiting for a restock, or of a marketplace seller trying to resell the same code at a markup.",
    "Returns are the second axis nobody prints on a price tag. A sealed retailer box with an unused code can usually go back under the merchant’s return policy; once the code is redeemed, it is yours for good. A digital purchase on the PlayStation or Microsoft store is effectively final once you have downloaded and started the game, so check the store’s refund rules before you buy the wrong platform.",
    "Ultimate Edition breaks the comparison on purpose: there is no physical Ultimate SKU, so the €99.99 store price is the only price. If the extras matter to you, the cheapest honest route is retailer Standard at €{low} plus the Ultimate Upgrade bought later on your console store once you have redeemed the base code — check the upgrade price before assuming it beats buying Ultimate outright.",
    "Prices below are a manual survey of the French market, VAT included, checked on the date shown next to the table. They move, and post-launch discounts tend to appear first at retailers. Before you pay, open the merchant page and confirm the current price, the platform and the edition — a comparator is a shortlist, not a receipt. Then keep the interactive map open on a second screen while you play.",
  ],
  comparatorTitle: "GTA 6 price comparison by platform",
  comparatorBody:
    "Same game, same bonus, six storefronts. Cards are sorted cheapest first within each platform; official stores are flagged because they set the reference price rather than compete on it.",
  surveyNote:
    "Prices surveyed on {date} for the French market, VAT included. Retailer stock and pricing change without notice — confirm on the merchant page before paying.",
  surveyStaleNote:
    "These prices were surveyed on {date}, {days} days ago, and have not been re-checked since. Treat them as an indication of the gap between retailers and the official stores, not as today's price: open the merchant page for the current figure.",
  disclosure:
    "Some outbound links may earn Map-6 a commission. That never changes the ranking: cards are ordered by price, and official stores are included even though they pay nothing.",
  bestPriceBadge: "Best price",
  officialBadge: "Official store",
  savingsLabel: "Save €{amount}",
  msrpLabel: "Official price",
  noPriceLabel: "Not listed",
  ctaLabel: "Check price",
  platformLabels: { PS5: "PlayStation 5", Xbox: "Xbox Series X|S" },
  editionLabels: { standard: "Standard", ultimate: "Ultimate" },
  formatLabels: { code_in_box: "Code in box", digital: "Digital" },
  availabilityLabels: {
    in_stock: "In stock",
    restocking: "In and out of stock",
    unlisted: "Not listed",
  },
  bonusLabels: {
    vintage_pack: "Vintage Vice City Pack (ended Nov 20)",
    vintage_pack_gta_plus: "1 month of GTA+ (digital)",
    none: "No bonus",
  },
  policyLabels: {
    charge_on_ship: "Charged on dispatch, cancel until then",
    cancel_until_ship: "Cancellable until dispatch",
    store_credit_refund: "Refunded as store credit",
    no_refund_after_release: "Refundable before release only",
  },
  fieldLabels: { bonus: "Bonus", policy: "Payment", availability: "Stock" },
  faqTitle: "FAQ",
  faq: [
    {
      question: "Where is GTA 6 cheapest right now?",
      answer:
        "In France, the retailer code-in-box Standard edition has been the cheapest route — Amazon.fr, Fnac, Cdiscount and Carrefour all around €60 against €79.99 on the PlayStation and Microsoft stores. Prices move and retailer stock runs out, so check the survey date next to the table and confirm on the merchant page.",
    },
    {
      question: "Is the €60 version the full game?",
      answer:
        "Yes. It is the same Standard edition, redeemed with a download code in the box. There is no disc, no region trick and no cut content — only the checkout differs from a store purchase.",
    },
    {
      question: "Does Fnac, Cdiscount or Carrefour give an exclusive bonus?",
      answer:
        "No. No French retailer has offered a store-exclusive GTA 6 bonus. The Vintage Vice City Pack only applied to purchases before November 20, 2026, wherever they were made.",
    },
    {
      question: "Should I buy from a retailer or the official store?",
      answer:
        "Buy from a retailer if you want the lower price and a return window on a sealed box, and can tolerate a restock wait. Buy from the PlayStation or Microsoft store if you want to start downloading right now, or want the Ultimate edition, which has no physical version.",
    },
    {
      question: "Can I return or refund GTA 6?",
      answer:
        "A sealed retailer box with an unused code can usually be returned under the merchant’s policy. A redeemed code, or a digital copy you have downloaded and played, is generally final — check each store’s refund rules before you buy.",
    },
    {
      question: "Why is the retailer price lower than Rockstar's?",
      answer:
        "Because retailers buy code allocations at wholesale and compete on margin, while Take-Two sets one fixed price on its own storefronts. That is also why retailer stock is finite and the official stores never sell out.",
    },
  ],
  relatedTitle: "Keep reading before you pay",
  ctaTitle: "Play with the map on a second screen",
  ctaBody:
    "Got your copy? Keep the interactive map open on a phone or second screen — 3,400+ locations, the real buildings behind Vice City and an interactive 100% checklist.",
  ctaButton: "Open Interactive Map",
  backToGuides: "← All guides",
};

const FR: BestPriceCopy = {
  eyebrow: "Comparateur de prix",
  title: "Meilleur prix GTA 6 — Amazon, Fnac, Cdiscount, Carrefour",
  description:
    "Où GTA 6 est le moins cher : les boîtes code des revendeurs autour de 60 € face aux 79,99 € du PlayStation Store et du Microsoft Store, bonus, stock et annulation comparés.",
  body: [
    "Grand Theft Auto VI a un prix officiel et plusieurs prix réels. Take-Two a fixé la Standard à {high} € et l'Ultimate à 99,99 € sur le PlayStation Store et le Microsoft Store, et ces fiches ne soldent jamais. Les revendeurs français, eux, vendent la même Standard comme un produit physique : Amazon.fr, Fnac, Cdiscount et Carrefour se sont tous alignés autour de {low} €, soit environ {save} € d'économie sur le même jeu, et la même plateforme.",
    "Ce que vous recevez mérite une précision. Les boîtes GTA 6 vendues en magasin contiennent un code de téléchargement, pas un disque. Vous l'activez sur le PlayStation Network ou sur Xbox, vous téléchargez le jeu complet (jusqu'à 212 Go sur PS5), et la licence se comporte exactement comme un achat dématérialisé. Ce qui change, c'est l'achat : une commande physique peut être retournée ou bénéficier d'une baisse de prix, ce qu'un achat sur store ne permet pas.",
    "Les bonus ne départagent plus personne. Le pack Vintage Vice City ne concernait que les achats éligibles effectués avant le 20 novembre 2026 : une copie achetée aujourd'hui ne l'inclut plus, quel que soit le vendeur ; le mois de GTA+ offert était lié aux copies dématérialisées éligibles. Aucun revendeur français n'a proposé de véhicule, d'arme ou de tenue exclusive. Une fiche qui en promet une l'invente.",
    "La vraie contrainte, c'est le stock. Rockstar alloue des quotas de clés par revendeur : les offres à {low} € partent par vagues puis reviennent. Amazon.fr est passé en rupture 48 h après l'ouverture des précommandes, puis a alterné entre « en stock » et « indisponible » pendant des semaines. Les stores officiels, eux, ne sont jamais en rupture. Voilà l'arbitrage : {save} € économisés contre le risque d'attendre un réassort — ou de croiser un vendeur marketplace qui revend le même code avec une marge.",
    "Le retour est le second critère que personne n'imprime sur une étiquette. Une boîte revendeur scellée, code non utilisé, peut généralement être retournée selon la politique du marchand ; une fois le code activé, il est à vous définitivement. Un achat sur le PlayStation Store ou le Microsoft Store est en pratique définitif une fois le jeu téléchargé et lancé : vérifiez les règles de remboursement avant de vous tromper de plateforme.",
    "L'édition Ultimate casse volontairement la comparaison : il n'existe aucune version physique, donc 99,99 € est le seul prix possible. Si les extras vous intéressent, la route honnête la moins chère reste la Standard revendeur à {low} € puis l'upgrade Ultimate acheté plus tard sur le store de votre console, une fois le code de base activé — vérifiez le prix de cet upgrade avant de supposer qu'il bat l'achat direct.",
    "Les prix ci-dessous sont un relevé manuel du marché français, TTC, effectué à la date affichée à côté du tableau. Ils bougent, et les baisses post-lancement apparaissent d'abord chez les revendeurs. Avant de payer, ouvrez la fiche marchande et confirmez le prix, la plateforme et l'édition : un comparateur est une présélection, pas un ticket de caisse. Ensuite, gardez la carte interactive ouverte sur un second écran pendant que vous jouez.",
  ],
  comparatorTitle: "Comparatif des prix GTA 6 par plateforme",
  comparatorBody:
    "Même jeu, même bonus, six enseignes. Les cartes sont triées du moins cher au plus cher pour chaque plateforme ; les stores officiels sont signalés car ils fixent le prix de référence au lieu de le concurrencer.",
  surveyNote:
    "Prix relevés le {date} sur le marché français, TTC. Le stock et les tarifs des revendeurs changent sans préavis — vérifiez sur la fiche marchande avant de payer.",
  surveyStaleNote:
    "Ces prix ont été relevés le {date}, il y a {days} jours, et n'ont pas été revérifiés depuis. Prenez-les comme un ordre de grandeur de l'écart entre revendeurs et stores officiels, pas comme le prix du jour : ouvrez la fiche marchande pour le tarif actuel.",
  disclosure:
    "Certains liens sortants peuvent rapporter une commission à Map-6. Cela ne change jamais le classement : les cartes sont triées par prix, et les stores officiels figurent dans le comparatif alors qu'ils ne rapportent rien.",
  bestPriceBadge: "Meilleur prix",
  officialBadge: "Store officiel",
  savingsLabel: "Économie {amount} €",
  msrpLabel: "Prix officiel",
  noPriceLabel: "Non référencé",
  ctaLabel: "Voir l'offre",
  platformLabels: { PS5: "PlayStation 5", Xbox: "Xbox Series X|S" },
  editionLabels: { standard: "Standard", ultimate: "Ultimate" },
  formatLabels: { code_in_box: "Code en boîte", digital: "Dématérialisé" },
  availabilityLabels: {
    in_stock: "En stock",
    restocking: "Stock par vagues",
    unlisted: "Non référencé",
  },
  bonusLabels: {
    vintage_pack: "Pack Vintage Vice City (terminé le 20 nov.)",
    vintage_pack_gta_plus: "1 mois de GTA+ (dématérialisé)",
    none: "Aucun bonus",
  },
  policyLabels: {
    charge_on_ship: "Débit à l'expédition, annulable avant",
    cancel_until_ship: "Annulable jusqu'à l'expédition",
    store_credit_refund: "Remboursé en avoir",
    no_refund_after_release: "Remboursable avant la sortie uniquement",
  },
  fieldLabels: { bonus: "Bonus", policy: "Paiement", availability: "Stock" },
  faqTitle: "FAQ",
  faq: [
    {
      question: "Où GTA 6 est-il le moins cher ?",
      answer:
        "En France, la Standard en boîte code chez les revendeurs reste la route la moins chère : Amazon.fr, Fnac, Cdiscount et Carrefour tournent autour de 60 € contre 79,99 € sur le PlayStation Store et le Microsoft Store. Les prix bougent et le stock revendeur s'épuise : regardez la date de relevé à côté du tableau et confirmez sur la fiche marchande.",
    },
    {
      question: "La version à 60 € est-elle le jeu complet ?",
      answer:
        "Oui. C'est la même édition Standard, activée avec un code de téléchargement dans la boîte. Pas de disque, pas d'astuce de région, aucun contenu retiré — seul le mode d'achat diffère.",
    },
    {
      question: "Fnac, Cdiscount ou Carrefour offrent-ils un bonus exclusif ?",
      answer:
        "Non. Aucun revendeur français n'a proposé de bonus GTA 6 exclusif. Le pack Vintage Vice City ne concernait que les achats effectués avant le 20 novembre 2026, quel que soit le vendeur.",
    },
    {
      question: "Revendeur ou store officiel ?",
      answer:
        "Revendeur si vous voulez le prix bas et un délai de retour sur une boîte scellée, et que vous acceptez d'attendre un réassort. Store officiel si vous voulez lancer le téléchargement tout de suite, ou l'édition Ultimate qui n'existe pas en physique.",
    },
    {
      question: "Puis-je retourner ou me faire rembourser GTA 6 ?",
      answer:
        "Une boîte revendeur scellée, code non utilisé, peut généralement être retournée selon la politique du marchand. Un code activé, ou une copie dématérialisée téléchargée et lancée, est en général définitif — vérifiez les règles de chaque store avant d'acheter.",
    },
    {
      question: "Pourquoi le prix revendeur est-il inférieur à celui de Rockstar ?",
      answer:
        "Parce que les revendeurs achètent des allocations de clés en gros et se battent sur la marge, tandis que Take-Two applique un prix unique sur ses propres boutiques. C'est aussi pour cela que le stock revendeur est limité et que les stores officiels ne sont jamais en rupture.",
    },
  ],
  relatedTitle: "À lire avant de payer",
  ctaTitle: "Jouez avec la carte sur un second écran",
  ctaBody:
    "Vous avez votre copie ? Gardez la carte interactive ouverte sur téléphone ou second écran — plus de 3 400 lieux, les vrais bâtiments derrière Vice City et une checklist 100 % interactive.",
  ctaButton: "Ouvrir la carte interactive",
  backToGuides: "← Tous les guides",
};

const ES: BestPriceCopy = {
  ...EN,
  eyebrow: "Comparador de precios",
  title: "GTA 6 al mejor precio — Amazon, Fnac, Cdiscount, Carrefour",
  description:
    "Dónde sale más barato GTA 6: las cajas con código de las tiendas francesas rondan los 60 € frente a los 79,99 € de PlayStation Store y Microsoft Store.",
  body: [
    "Grand Theft Auto VI tiene un precio oficial y varios precios reales. Take-Two fijó la Standard en {high} € y la Ultimate en 99,99 € en PlayStation Store y Microsoft Store, y esas fichas nunca rebajan. Las tiendas francesas venden la misma Standard como producto físico: Amazon.fr, Fnac, Cdiscount y Carrefour se han situado alrededor de {low} €, unos {save} € menos por el mismo juego, la misma plataforma y el mismo bono de reserva.",
    "La caja contiene un código de descarga, no un disco: Rockstar envía code-in-box desde el 12 de noviembre de 2026 para permitir la precarga antes del lanzamiento del 19 de noviembre. Activas en PlayStation Network o Xbox y descargas el juego completo; lo que cambia es la compra, porque un pedido físico se cancela y se reembolsa con más margen que una compra en la tienda de la consola.",
    "Los bonos no diferencian a las tiendas. El pack Vintage Vice City se aplica a las compras elegibles antes del 20 de noviembre de 2026 compres donde compres, y el mes de GTA+ depende de las copias digitales elegibles. Ninguna tienda francesa ha anunciado un bono exclusivo: si una ficha lo promete, se lo está inventando.",
    "El límite real es el stock. Rockstar reparte cupos de claves por tienda, así que las ofertas a {low} € se agotan por oleadas y vuelven, mientras que las tiendas oficiales nunca se quedan sin existencias. Los precios de abajo son un sondeo manual del mercado francés, IVA incluido, con la fecha de revisión junto a la tabla: confirma siempre en la ficha del vendedor antes de pagar.",
  ],
  comparatorTitle: "Comparativa de precios de GTA 6 por plataforma",
  comparatorBody:
    "Mismo juego, mismo bono, seis tiendas. Las tarjetas se ordenan de más barata a más cara por plataforma; las tiendas oficiales aparecen marcadas porque fijan el precio de referencia.",
  surveyNote:
    "Precios revisados el {date} en el mercado francés, IVA incluido. El stock y las tarifas cambian sin aviso: comprueba la ficha del vendedor antes de pagar.",
  surveyStaleNote:
    "Estos precios se revisaron el {date}, hace {days} días, y no se han vuelto a comprobar. Tómalos como una indicación de la diferencia entre tiendas, no como el precio de hoy: abre la ficha del vendedor para ver la tarifa actual.",
  disclosure:
    "Algunos enlaces salientes pueden generar una comisión para Map-6. Eso no altera el orden: las tarjetas se ordenan por precio y las tiendas oficiales se incluyen aunque no paguen nada.",
  bestPriceBadge: "Mejor precio",
  officialBadge: "Tienda oficial",
  savingsLabel: "Ahorras {amount} €",
  msrpLabel: "Precio oficial",
  noPriceLabel: "No disponible",
  ctaLabel: "Ver oferta",
  formatLabels: { code_in_box: "Código en caja", digital: "Digital" },
  availabilityLabels: {
    in_stock: "En stock",
    restocking: "Stock por oleadas",
    unlisted: "No disponible",
  },
  bonusLabels: {
    vintage_pack: "Pack Vintage Vice City (antes del 20 nov.)",
    vintage_pack_gta_plus: "Pack Vintage Vice City + 1 mes de GTA+",
    none: "Sin bono de reserva",
  },
  policyLabels: {
    charge_on_ship: "Se cobra al enviar, cancelable antes",
    cancel_until_ship: "Cancelable hasta el envío",
    store_credit_refund: "Reembolso en saldo de tienda",
    no_refund_after_release: "Reembolsable solo antes del lanzamiento",
  },
  fieldLabels: { bonus: "Bono", policy: "Pago", availability: "Stock" },
  faqTitle: "Preguntas frecuentes",
  faq: [
    {
      question: "¿Dónde está GTA 6 más barato?",
      answer:
        "En Francia, la Standard en caja con código de Amazon.fr, Fnac, Cdiscount y Carrefour ronda los 60 € frente a los 79,99 € de PlayStation Store y Microsoft Store. Los precios cambian: revisa la fecha del sondeo y confirma en la ficha del vendedor.",
    },
    {
      question: "¿La versión de 60 € es el juego completo?",
      answer:
        "Sí. Es la misma edición Standard, activada con un código de descarga enviado en la caja desde el 12 de noviembre de 2026. Sin disco y sin contenido recortado.",
    },
    {
      question: "¿Alguna tienda da un bono exclusivo?",
      answer:
        "No. El pack Vintage Vice City se aplica a las compras elegibles antes del 20 de noviembre de 2026 en cualquier tienda, y el mes de GTA+ depende de las copias digitales elegibles.",
    },
    {
      question: "¿Puedo cancelar la reserva?",
      answer:
        "En las tiendas físicas sí: se cobra al enviar y puedes cancelar hasta entonces. En las tiendas de consola, el reembolso es posible antes del lanzamiento según su política, pero no después de jugar.",
    },
  ],
  relatedTitle: "Antes de pagar, sigue leyendo",
  ctaTitle: "Explora Vice City mientras esperas",
  ctaBody:
    "¿Reserva resuelta? Abre el mapa interactivo: filtros de puntos de interés, rutas de coleccionables y enlaces directos para la semana del lanzamiento.",
  ctaButton: "Abrir el mapa interactivo",
  backToGuides: "← Todas las guías",
};

/** Resolve `{low}` / `{high}` / `{save}` against the live offer dataset */
export function fillPrices(text: string, locale: string): string {
  const low = lowestPriceEur() ?? MSRP_EUR;
  return text
    .replaceAll("{low}", formatEur(low, locale))
    .replaceAll("{high}", formatEur(MSRP_EUR, locale))
    .replaceAll("{save}", String(savingsVsMsrp(low)));
}

/** EN body reused as the canonical guide record so prose lives in one place */
export const BEST_PRICE_BODY_EN = EN.body;
export const BEST_PRICE_TITLE_EN = EN.title;
export const BEST_PRICE_DESCRIPTION_EN = EN.description;

export function getBestPriceCopy(locale: string): BestPriceCopy {
  if (locale === "fr") return FR;
  if (locale === "es") return ES;
  return EN;
}
