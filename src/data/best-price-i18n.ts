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
    "Grand Theft Auto VI has one official price and several real ones. Take-Two set Standard at €{high} and Ultimate at €99.99 on the PlayStation Store and the Microsoft Store, and those pages never discount. French retailers price the same Standard SKU as a physical product, so Amazon.fr, Fnac, Cdiscount and Carrefour have all sat around €{low} — roughly €{save} off the same game, on the same platform, with the same pre-order bonus.",
    "The catch is what you actually receive. Retailer boxes for GTA 6 contain a download code, not a disc: Rockstar is shipping code-in-box from November 12, 2026 so buyers can preload before the November 19 launch. You still redeem on PlayStation Network or Xbox, you still download the full game, and the licence behaves exactly like a digital purchase. What changes is the checkout: a physical order can be cancelled, refunded and price-protected in ways a store wallet purchase cannot.",
    "Bonuses do not differentiate the merchants, and that is the single most useful thing to know before you shop. The Vintage Vice City Pack applies to eligible purchases made before November 20, 2026 wherever you buy; the free month of GTA+ is tied to eligible digital copies rather than to a particular shop. No French retailer has announced a store-exclusive vehicle, weapon or skin. Any listing promising one is inventing it — treat it the way you would treat a leaked Collector's Edition contents list.",
    "Stock is the real constraint. Rockstar allocates code quotas per retailer, so the €{low} listings sell through in waves and come back: Amazon.fr went out of stock within 48 hours of pre-orders opening, then alternated between in stock and unavailable for weeks. The official stores never sell out. That is the trade: €{save} saved against the possibility of waiting for a restock, or of a marketplace seller trying to resell the same code at a markup.",
    "Cancellation policy is the second axis nobody prints on a price tag. Retailers charge on dispatch, which means a pre-order placed today costs nothing until November, and you can cancel until it ships if you switch platform or change your mind about Ultimate. A digital purchase on the PlayStation or Microsoft store is refundable before release under each store's pre-order rules, but effectively final once the game unlocks and you start playing.",
    "Ultimate Edition breaks the comparison on purpose: there is no physical Ultimate SKU, so the €99.99 store price is the only price. If the extras matter to you, the cheapest honest route is retailer Standard at €{low} plus the Ultimate Upgrade bought later on your console store once you have redeemed the base code — check the upgrade price before assuming it beats buying Ultimate outright.",
    "Prices below are a manual survey of the French market, VAT included, checked on the date shown next to the table. They move. Before you pay, open the merchant page and confirm the current price, the platform and the edition — a comparator is a shortlist, not a receipt. Then come back to the interactive map and spend the waiting weeks learning Leonida instead of refreshing product pages.",
  ],
  comparatorTitle: "GTA 6 price comparison by platform",
  comparatorBody:
    "Same game, same bonus, six storefronts. Cards are sorted cheapest first within each platform; official stores are flagged because they set the reference price rather than compete on it.",
  surveyNote:
    "Prices surveyed on {date} for the French market, VAT included. Retailer stock and pricing change without notice — confirm on the merchant page before paying.",
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
    vintage_pack: "Vintage Vice City Pack (before Nov 20)",
    vintage_pack_gta_plus: "Vintage Vice City Pack + 1 month of GTA+",
    none: "No pre-order bonus",
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
        "Yes. It is the same Standard edition, redeemed with a download code shipped in the box from November 12, 2026. There is no disc, no region trick and no cut content — only the checkout differs from a store purchase.",
    },
    {
      question: "Does Fnac, Cdiscount or Carrefour give an exclusive bonus?",
      answer:
        "No. No French retailer has announced a store-exclusive GTA 6 bonus. The Vintage Vice City Pack applies to eligible purchases before November 20, 2026 regardless of where you buy, and the GTA+ month is tied to eligible digital copies.",
    },
    {
      question: "Should I buy from a retailer or the official store?",
      answer:
        "Buy from a retailer if you want the lower price and the ability to cancel until dispatch, and can tolerate waiting for a restock. Buy from the PlayStation or Microsoft store if you want a guaranteed copy, instant preload eligibility, or the Ultimate edition, which has no physical version.",
    },
    {
      question: "Can I cancel a GTA 6 pre-order?",
      answer:
        "At retailers, yes — orders are charged on dispatch and can be cancelled until they ship. On the console stores, pre-orders can be refunded before release under each store's policy, but not after the game unlocks and you have played it.",
    },
    {
      question: "Why is the retailer price lower than Rockstar's?",
      answer:
        "Because retailers buy code allocations at wholesale and compete on margin, while Take-Two sets one fixed price on its own storefronts. That is also why retailer stock is finite and the official stores never sell out.",
    },
  ],
  relatedTitle: "Keep reading before you pay",
  ctaTitle: "Explore Vice City while you wait",
  ctaBody:
    "Pre-order settled? Open the interactive map and put the waiting weeks to use — landmark filters, collectible routes and shareable deep links for launch week.",
  ctaButton: "Open Interactive Map",
  backToGuides: "← All guides",
};

const FR: BestPriceCopy = {
  eyebrow: "Comparateur de prix",
  title: "Meilleur prix GTA 6 — Amazon, Fnac, Cdiscount, Carrefour",
  description:
    "Où GTA 6 est le moins cher : les boîtes code des revendeurs autour de 60 € face aux 79,99 € du PlayStation Store et du Microsoft Store, bonus, stock et annulation comparés.",
  body: [
    "Grand Theft Auto VI a un prix officiel et plusieurs prix réels. Take-Two a fixé la Standard à {high} € et l'Ultimate à 99,99 € sur le PlayStation Store et le Microsoft Store, et ces fiches ne soldent jamais. Les revendeurs français, eux, vendent la même Standard comme un produit physique : Amazon.fr, Fnac, Cdiscount et Carrefour se sont tous alignés autour de {low} €, soit environ {save} € d'économie sur le même jeu, la même plateforme et le même bonus de précommande.",
    "Ce que vous recevez mérite une précision. Les boîtes GTA 6 vendues en magasin contiennent un code de téléchargement, pas un disque : Rockstar expédie du code-in-box à partir du 12 novembre 2026 pour permettre le préchargement avant la sortie du 19 novembre. Vous activez sur le PlayStation Network ou sur Xbox, vous téléchargez le jeu complet, et la licence se comporte exactement comme un achat dématérialisé. Ce qui change, c'est le passage en caisse : une commande physique s'annule, se rembourse et bénéficie de garanties de prix qu'un achat sur le store console n'offre pas.",
    "Les bonus ne départagent pas les marchands, et c'est l'information la plus utile avant d'acheter. Le pack Vintage Vice City s'applique aux achats éligibles effectués avant le 20 novembre 2026, quel que soit le vendeur ; le mois de GTA+ offert est lié aux copies dématérialisées éligibles, pas à une enseigne. Aucun revendeur français n'a annoncé de véhicule, d'arme ou de tenue exclusive. Une fiche qui en promet un l'invente — traitez-la comme une fausse liste de contenus Collector.",
    "La vraie contrainte, c'est le stock. Rockstar alloue des quotas de clés par revendeur : les offres à {low} € partent par vagues puis reviennent. Amazon.fr est passé en rupture 48 h après l'ouverture des précommandes, puis a alterné entre « en stock » et « indisponible » pendant des semaines. Les stores officiels, eux, ne sont jamais en rupture. Voilà l'arbitrage : {save} € économisés contre le risque d'attendre un réassort — ou de croiser un vendeur marketplace qui revend le même code avec une marge.",
    "La politique d'annulation est le second critère que personne n'imprime sur une étiquette. Les revendeurs ne débitent qu'à l'expédition : une précommande passée aujourd'hui ne coûte rien avant novembre, et reste annulable jusqu'à l'envoi si vous changez de plateforme ou renoncez à l'Ultimate. Un achat sur le PlayStation Store ou le Microsoft Store est remboursable avant la sortie selon les règles de chaque store, mais devient définitif une fois le jeu débloqué et lancé.",
    "L'édition Ultimate casse volontairement la comparaison : il n'existe aucune version physique, donc 99,99 € est le seul prix possible. Si les extras vous intéressent, la route honnête la moins chère reste la Standard revendeur à {low} € puis l'upgrade Ultimate acheté plus tard sur le store de votre console, une fois le code de base activé — vérifiez le prix de cet upgrade avant de supposer qu'il bat l'achat direct.",
    "Les prix ci-dessous sont un relevé manuel du marché français, TTC, effectué à la date affichée à côté du tableau. Ils bougent. Avant de payer, ouvrez la fiche marchande et confirmez le prix, la plateforme et l'édition : un comparateur est une présélection, pas un ticket de caisse. Ensuite, revenez sur la carte interactive et utilisez les semaines d'attente pour apprendre Leonida plutôt que pour rafraîchir des fiches produit.",
  ],
  comparatorTitle: "Comparatif des prix GTA 6 par plateforme",
  comparatorBody:
    "Même jeu, même bonus, six enseignes. Les cartes sont triées du moins cher au plus cher pour chaque plateforme ; les stores officiels sont signalés car ils fixent le prix de référence au lieu de le concurrencer.",
  surveyNote:
    "Prix relevés le {date} sur le marché français, TTC. Le stock et les tarifs des revendeurs changent sans préavis — vérifiez sur la fiche marchande avant de payer.",
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
    vintage_pack: "Pack Vintage Vice City (avant le 20 nov.)",
    vintage_pack_gta_plus: "Pack Vintage Vice City + 1 mois de GTA+",
    none: "Aucun bonus de précommande",
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
        "Oui. C'est la même édition Standard, activée avec un code de téléchargement expédié dans la boîte à partir du 12 novembre 2026. Pas de disque, pas d'astuce de région, aucun contenu retiré — seul le mode d'achat diffère.",
    },
    {
      question: "Fnac, Cdiscount ou Carrefour offrent-ils un bonus exclusif ?",
      answer:
        "Non. Aucun revendeur français n'a annoncé de bonus GTA 6 exclusif. Le pack Vintage Vice City s'applique aux achats éligibles avant le 20 novembre 2026 quel que soit le vendeur, et le mois de GTA+ dépend des copies dématérialisées éligibles.",
    },
    {
      question: "Revendeur ou store officiel ?",
      answer:
        "Revendeur si vous voulez le prix bas et l'annulation jusqu'à l'expédition, et que vous acceptez d'attendre un réassort. Store officiel si vous voulez une copie garantie, le préchargement sans dépendre d'un envoi, ou l'édition Ultimate qui n'existe pas en physique.",
    },
    {
      question: "Puis-je annuler une précommande GTA 6 ?",
      answer:
        "Chez les revendeurs, oui : le débit intervient à l'expédition et la commande s'annule jusque-là. Sur les stores console, une précommande est remboursable avant la sortie selon la politique de chaque store, mais plus une fois le jeu débloqué et lancé.",
    },
    {
      question: "Pourquoi le prix revendeur est-il inférieur à celui de Rockstar ?",
      answer:
        "Parce que les revendeurs achètent des allocations de clés en gros et se battent sur la marge, tandis que Take-Two applique un prix unique sur ses propres boutiques. C'est aussi pour cela que le stock revendeur est limité et que les stores officiels ne sont jamais en rupture.",
    },
  ],
  relatedTitle: "À lire avant de payer",
  ctaTitle: "Explorez Vice City en attendant",
  ctaBody:
    "Précommande réglée ? Ouvrez la carte interactive et rentabilisez l'attente : filtres landmarks, routes de collectibles et deep links partageables pour la semaine de lancement.",
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
