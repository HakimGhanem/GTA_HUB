import type { Article } from "@/lib/content/schema";
import { locationFigure } from "@/lib/content/key-news";

const AUTHOR = "Map-6 Editorial";
const NOW = "2026-09-21T09:00:00.000Z";

const VC = (alt: string, cap: string) => locationFigure("vice-city", alt, cap);
const OD = (alt: string, cap: string) => locationFigure("ocean-drive", alt, cap);

export const KEY_FR_ARTICLES: Article[] = [
  {
    id: "editorial-ultimate-edition-preorder-leads-fr",
    slug: "gta-6-ultimate-edition-preorder-leads",
    locale: "fr",
    title: "GTA 6 : l’édition Ultimate mène les précommandes",
    description:
      "Take-Two dit que l’Ultimate à 99,99 $ précède la Standard à 79,99 $. Ce que Zelnick a dit, ce que vaut le 89 %, et comment choisir.",
    bodyMarkdown: `Take-Two, par la voix de Strauss Zelnick, a indiqué que le palier premium de Grand Theft Auto VI — l’**édition Ultimate à 99,99 $** — précède la **Standard à 79,99 $** dans le mix de précommandes. Le jeu reste calé au **19 novembre 2026** sur PlayStation 5 et Xbox Series X|S. L’histoire, c’est ce **supplément de 20 $ qui mène quand même le panier**. Ce n’est pas une nouvelle date, pas un PC confirmé, pas une raison de traiter chaque capture « 89 % » comme une stat Newswire.

Ce briefing sépare **ce qu’un dirigeant a dit**, **ce que la presse a inféré**, et **ce que vous devez vraiment acheter**. Pour le checkout SKU par SKU : [guide précommande](/fr/guides/gta-6-preorder-guide) et [Ultimate vs Standard](/fr/guides/gta-6-ultimate-edition-vs-standard). La géographie ne change pas avec l’édition — la [carte interactive](/fr/map) est la même.
${VC( "Hub Vice City sur Map-6", "Mêmes pins Vice City en Standard et en Ultimate — l’édition n’agrandit pas Leonida.")}

## Ce que Zelnick a réellement dit

La remarque publique, telle que reprise en septembre 2026, est un **signal de demande** : l’Ultimate à ~100 $ vend mieux que la Standard dans le mix précommande. Map-6 n’invente pas un paragraphe « verbatim » plus long que ce que Take-Two a publié. Nous la traitons comme :

- **Commentaire de dirigeant** (PDG Take-Two, repris par la presse).
- **Pas un changement de SKU Newswire.** Prix et noms viennent encore de [rockstargames.com/VI](https://www.rockstargames.com/VI).
- **Pas une horloge de rupture.** La Standard digitale ne disparaît pas parce que l’Ultimate est populaire.

Un premium de 20 $ qui mène le mix dit qu’une partie du public paie des **extras nommés** (véhicules, armes, tenues, contenu lié à l’histoire). Ça ne dit pas que ces extras sont un raccourci de puissance Online. Rockstar ne l’a pas dit.

Si un post ajoute une fausse citation — « achetez Ultimate ce soir ou perdez votre slot », « PC day one », « 89 % confirmé Newswire » — jetez-le. Zelnick a parlé de **mix**, pas d’ultimatum.

## Pourquoi 89 % d’Ultimate étonne

Des reprises secondaires (dont des agrégations RockstarINTEL) ont flotté un chiffre proche de **89 % Ultimate**. Map-6 le labelle **rapporté**, pas confirmé Rockstar, tant qu’un filing Take-Two ou une transcription ne donne pas le même nombre avec un contexte (échantillon, région, digital vs physique, dates).

Même comme ordre de grandeur, c’est surprenant :

1. **20 $ ne sont pas rien** sur un jeu à 79,99 $. Aux lancements Rockstar précédents, la plupart des joueurs prenaient le jeu et skippaient le memorabilia. L’Ultimate, ce sont des extras digitaux, pas une statue — mais c’est encore un premium.
2. **Pas d’Ultimate physique listée.** Si le mix est si Ultimate, c’est presque sûrement une histoire **digitale**. La Standard boîte-code n’explique pas à elle seule 89 %.
3. **Les précommandes de septembre sont des early adopters**, pas un échantillon de novembre. Le mix early est plus « riche » que le mix jour J.

Traitez 89 % comme un **titre presse** : utile pour « le premium n’est pas mort », inutile comme score FOMO. La vraie question reste : **les extras officiels valent-ils 20 $ pour moi ?**

## Ultimate vs Standard — l’écart réel

Référence US Take-Two / Rockstar Support : Standard 79,99 $, Ultimate 99,99 $, même jeu, même pack Vintage Vice City (achat éligible avant le 20 novembre 2026), même mois GTA+ digital éligible. L’Ultimate ajoute les extras ; la Standard peut acheter l’upgrade plus tard. Physique = boîte-code Standard uniquement.

Ce n’est **pas** une statue Collector, **pas** un skip Online confirmé, **pas** un disque avec des missions gravées. Indécis : Standard + casque ou SSD du [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) bat souvent un pack véhicule invisible.
${OD("Ocean Drive sur Map-6", "Ocean Drive est de la géographie trailer, pas un déblocage Ultimate.")}

## Ce que ça change pour votre précommande

1. **Verrouillez la plateforme.** PS5 et Xbox ne se convertissent pas. Les cross-saves ne sont pas annoncés.
2. **Si vous voulez déjà les extras**, l’Ultimate maintenant évite un second checkout. L’upgrade existe ; payer deux fois en attention coûte plus cher.
3. **Si les extras vous sont égaux**, la Standard est le jeu complet. Le pack Vintage n’est pas exclusif Ultimate.
4. **Acheteurs physiques** : territoire Standard / boîte-code. Il n’y a pas d’Ultimate physique à « matcher les 89 % ».
5. **Revérifiez Rockstar** avant de payer. Map-6 n’invente pas d’ASIN.

En attendant le 19 novembre, la géographie est gratuite : [Vice City](/fr/locations/vice-city), [Ocean Drive](/fr/locations/ocean-drive), [guide carte](/fr/guides/gta-6-map-guide).
`,
    cluster: "preorder",
    primaryKeyword: "gta 6 edition ultimate",
    secondaryKeywords: [
      "précommande gta 6",
      "gta 6 standard vs ultimate",
      "zelnick gta 6",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/fr/guides/gta-6-ultimate-edition-vs-standard",
        title: "Map-6 — Ultimate vs Standard",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-09-10T10:00:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-09-10T10:00:00.000Z",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: [
      "gta-6-ultimate-edition-vs-standard",
      "gta-6-preorder-guide",
    ],
    eventKey: "ultimate-edition-preorder-leads-2026-09",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question:
          "Zelnick a-t-il confirmé que 89 % des précommandes GTA 6 sont Ultimate ?",
        answer:
          "Non. Il a dit que l’Ultimate précède la Standard. Le ~89 % vient de reprises secondaires, labellé rapporté jusqu’à un filing ou une transcription.",
      },
      {
        question: "L’Ultimate GTA 6 vaut-elle 20 $ de plus ?",
        answer:
          "Seulement si les extras officiels valent 20 $ pour vous. Les deux éditions sont le jeu complet. La Standard peut upgrader plus tard.",
      },
      {
        question: "Puis-je acheter une boîte Ultimate physique ?",
        answer:
          "Pas listée. L’Ultimate est digitale. Les boîtes sont Standard code-in-box. Ne payez pas un scalper pour une fausse Ultimate.",
      },
    ],
    notes: "FR Discover — même angle que l’EN, pas une traduction mot à mot.",
  },
  {
    id: "editorial-preorder-ps5-details-fr",
    slug: "gta-6-preorder-ps5-details",
    locale: "fr",
    title: "Précommande GTA 6 PS5 : éditions, prix, boîte-code",
    description:
      "Options PS5 pour GTA 6 en 2026 : Standard 79,99 $ vs Ultimate 99,99 $, physique boîte-code vs digital, checklist avant de payer.",
    bodyMarkdown: `Si vous vivez déjà sur PlayStation, le **SKU PS5 est le panier honnête** pour Grand Theft Auto VI. Rockstar a confirmé le **19 novembre 2026** sur PS5 et Xbox Series X|S. Cette page est le briefing précommande PlayStation : éditions, l’écart de 20 $, physique vs digital, et une checklist qui n’invente pas d’horloge de rupture.

Les acheteurs Xbox doivent passer par le [guide précommande complet](/fr/guides/gta-6-preorder-guide). Le lock plateforme est la première décision ; l’édition est la deuxième.
${VC( "Vice City sur Map-6 — même carte pour chaque édition PS5", "Le SKU PS5 n’ouvre pas un plus grand Leonida. C’est la même carte que sur Xbox.")}

## Les options PS5 en 2026

Liste officielle courte :

- **Standard digitale** sur le PlayStation Store — le jeu complet, pas de boîte, jamais « en rupture » au sens physique.
- **Ultimate digitale** — le même jeu plus les extras marketing, **20 $ de plus**.
- **Standard physique** chez les revendeurs — presque toujours une **boîte-code**, pas un Blu-ray jouable de GTA 6.
- **Ultimate physique** — **non listée**. N’achetez pas une « boîte Ultimate » de scalper.

Pas de palier Collector statue dans la paire de lancement. Les tableurs de hauteur de figurine ne sont pas un conseil de checkout.

La Standard digitale ne s’épuise pas. Les boîtes-code, si : Rockstar alloue des quotas. Si Amazon ou la Fnac affiche une rupture, posez une alerte ou prenez le digital. Ne surpayez pas une fiche marketplace floue.

## Digital vs boîte-code

La boîte-code sert le preload (annoncé autour du 12 novembre) et le cadeau. Elle n’est pas un disque. Vérifiez **région + compte PSN** avant de payer. Une clé d’une autre région est un problème de compte, pas un pin Map-6.

Le digital PSN se lie au compte. Utile si la console est déjà à vous. Moins utile comme cadeau surprise si le destinataire n’a pas partagé son PSN.

L’annulation Amazon tient en général **jusqu’à l’expédition**. Le PSN, une fois le téléchargement commencé, est plus dur. Lisez la fiche, pas un tweet.

## Checklist avant de payer

1. Confirmez **PS5** (pas Xbox, pas un SKU PC rumeur).
2. Confirmez **19 novembre 2026** — pas une date 2025 recyclée.
3. Choisissez **Standard vs Ultimate** sur la liste officielle d’extras, pas sur un chart leak d’armes.
4. Si physique : acceptez **boîte-code, pas de disque**, et alignez **région + PSN**.
5. Activez un code d’achat si la console est partagée.
6. Laissez de la **marge SSD** pour le patch jour J et les captures.
7. Ignorez « PC day-one garanti » et les calendriers insider sans source.
8. Mettez la [carte interactive](/fr/map) en favori pour que la semaine de lancement soit de la géographie, pas du chaos d’onglets.
${OD("Hub Ocean Drive pour les notes de lancement PS5", "Sauvez Ocean Drive avant le checkout — la nuit du lancement est un problème de géographie.")}

Deux pièges reviennent à chaque cycle de hype. Le premier : une fiche « GTA 6 PS5 » datée 2025, recyclée par un marketplace. Si la date n’est pas le **19 novembre 2026**, ce n’est pas la précommande Rockstar. Le second : un vendeur tiers qui promet un disque « collector » ou une clé PC dans le même panier. Refusez. Rockstar n’a pas annoncé de SKU PC pour cette fenêtre, et l’Ultimate physique n’est pas listée. Un troisième piège, plus calme : payer deux fois parce que vous avez pris Standard digitale puis une boîte-code « pour le preload ». Un seul SKU suffit. Le preload suit le code ou le compte PSN, pas le nombre de reçus dans votre boîte mail. Si un proche offre le jeu, décidez ensemble plateforme et format avant le paiement, pas après un échange de captures d’écran floues.

Le preload de la boîte-code, autour du 12 novembre, ne remplace pas un SSD déjà plein. Si votre console n’a plus 200 Go de marge, réglez ça **avant** le checkout, pas le 18 novembre à minuit. Le [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) est plus utile ici qu’un second SKU.

Les cartes affiliées Map-6 sont labellisées et ne changent pas le prix. Les ASIN jeu apparaissent quand les fiches officielles existent — nous ne les inventons pas.

À lire ensuite : [prix et éditions](/fr/guides/gta-6-preorder-price-editions), [guide précommande PS5](/fr/guides/gta-6-preorder-ps5-guide), [date de sortie](/fr/news/gta-6-release-date-platforms).
`,
    cluster: "preorder",
    primaryKeyword: "précommande gta 6 ps5",
    secondaryKeywords: [
      "gta 6 edition ps5",
      "gta 6 edition ultimate",
      "gta 6 code in box",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/fr/guides/gta-6-preorder-guide",
        title: "Map-6 — Guide précommande GTA 6",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-09-10T10:05:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-09-10T10:05:00.000Z",
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-preorder-guide", "gta-6-preorder-ps5-guide"],
    eventKey: "preorder-ps5-details-2026-09",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "La précommande PS5 GTA 6 est-elle une boîte avec disque ?",
        answer:
          "En général non. Les fiches physiques sont des boîtes-code. L’Ultimate physique n’est pas listée. Le digital PSN n’a pas de disque.",
      },
      {
        question: "Puis-je passer de Standard PS5 à Ultimate plus tard ?",
        answer:
          "Oui. Rockstar Support indique un Ultimate Edition Upgrade sur le PlayStation Store après avoir activé le code de base.",
      },
    ],
    notes: "Briefing PS5 FR pour Discover.",
  },
  {
    id: "editorial-extended-look-live-notes-fr",
    slug: "gta-6-extended-look-live-notes",
    locale: "fr",
    title: "Extended Look GTA 6 — géographie, Jason & Lucia, questions ouvertes",
    description:
      "Recap post-event de An Extended Look : géographie Leonida confirmée, Jason et Lucia à l’écran, pins Map-6 rafraîchis, et ce que Rockstar n’a toujours pas dit.",
    bodyMarkdown: `An Extended Look n’est plus un compte à rebours. La session officielle Rockstar a atterri le **27 août 2026 à 15 h ET (21 h CEST)** d’abord sur Netflix, puis sur YouTube et [rockstargames.com/VI](https://www.rockstargames.com/VI) **six heures plus tard**. Netflix Tudum l’a présenté comme du footage in-game PlayStation 5 — pas un calendrier de leaks, pas un dump 100 % collectibles.

Cette page a commencé comme un live desk. C’est maintenant le **recap post-event** promis, écrit à partir des **plans officiels seulement**. Nous n’inventons toujours pas de noms de boutiques, de totaux de collectibles, de date PC, ni d’une durée que Rockstar n’a pas imprimée. Systèmes et timestamps : [breakdown Extended Look](/fr/guides/gta-6-extended-look-breakdown) et le [scrub trailer](/fr/trailer). HUD wanted : [six étoiles](/fr/guides/gta-6-wanted-system). Horaires : [guide Extended Look](/fr/guides/gta-6-extended-look-how-to-watch). Pauses : [quoi figer](/fr/news/gta-6-extended-look-map-watch-for).
${VC( "Vice City après l’Extended Look, sur Map-6", "Le métro Vice City reste le match le plus facile — skyline, eau, coutures d’autoroute.")}

## Géographie confirmée dans le Look

Le Look a fait le travail d’un long paquet in-game : du temps dans des **lieux que les Trailers 1 et 2 avaient déjà vendus**, assez longtemps pour scrubber. Map-6 s’occupe des biomes et landmarks, pas de l’intrigue.

**Métro Vice City.** Coupes de skyline, coutures d’autoroute, néon de nuit : le match le plus simple vers le [hub Vice City](/fr/locations/vice-city). Tours plus eau = plutôt downtown, pas Keys, pas Grassrivers.

**Énergie Ocean Drive.** Façades d’hôtels, asphalte bordé de palmiers, route de front de mer. C’est encore la carte postale sur [Ocean Drive](/fr/locations/ocean-drive). Un néon illisible n’est pas une enseigne officielle.

**Leonida Keys.** Causeways et approches de petites îles. [Leonida Keys](/fr/locations/leonida-keys). Un plan mangrove n’y va pas — c’est du travail Grassrivers.

**Port Gellhorn.** Grues, cours, eau industrielle. [Port Gellhorn](/fr/locations/port-gellhorn) pour l’infra portuaire, pas pour la richesse fermée.

**Grassrivers.** Marais, énergie Everglades : eau, herbe, horizon bas. [Grassrivers](/fr/locations/grassrivers). Facile à confondre avec les Keys si vous ne retenez que « de l’eau ».

**Ambrosia Island.** Richesse fermée, yachts, rivage exclusif. [Ambrosia Island](/fr/locations/ambrosia-island).

**Mount Kalaga.** Dénivelé, forêt, rivière — le wilderness nord, opposé à la carte postale plage. [Mount Kalaga](/fr/locations/mount-kalaga).

Rien de tout ça n’est un nouveau continent. Le Look **reconfirme l’atlas** avec plus de temps in-game. Les frontières que Rockstar n’a pas dessinées restent **estimées** sur Map-6.

Pour re-scrubber sans vous mentir : pausez d’abord sur la **forme** (causeway vs skyline vs grue vs mangrove vs dénivelé), puis assignez un hub, puis un tag de confiance. L’étalonnage n’est pas de la géographie. Si deux hubs collent encore, laissez le pin en conjecture.
${locationFigure("mount-kalaga", "Hub Mount Kalaga sur Map-6", "Mount Kalaga = dénivelé et forêt, l’opposé d’Ocean Drive.")}

## Jason et Lucia — ce que nous avons vu

Le couple marketing reste Jason et Lucia. La valeur du Look pour les persos, c’est le **blocking et le costume en vrai éclairage**, pas une biographie. Costumes, véhicules et interactions restent du packaging à l’écran tant que Rockstar n’écrit pas une fiche. Nous n’inventons pas d’âge, de casier, ni de twist.

## Questions encore ouvertes

PC : **non annoncé** pour le 19 novembre 2026. Totaux de collectibles : **non publiés**. Noms de rues illisibles : **pas des pins**. Runtime officiel imprimé : **pas vu**. Trailer 3 cinématique séparé : **pas confirmé** tant que Newswire ne le poste pas.

Ce que le Look n’a **pas** fait : publier un shapefile, un total de Hidden Packages, ou une liste d’armes. Si votre timeline a déjà un « 100 % map leak from Extended Look », c’est de la compilation fan. Map-6 ne la recopie pas. Les pins GTADB restent des hypothèses CC BY 4.0, à côté des hubs — pas à la place. Un recap honnête dit aussi ce qui était déjà dans les Trailers 1 et 2 : Vice City, Ocean Drive, Keys, Port Gellhorn, Grassrivers. Le Look a surtout donné plus de temps in-game dans ces biomes, assez pour un deuxième scrub, pas assez pour inventer des rues. C’est pour ça que cette page reste un recap daté, pas un guide 100 %.

Pour une deuxième passe : ouvrez le [lecteur](/fr/trailer), filtrez Landmarks, et croisez la [table des frames](/fr/news/gta-6-trailer-frames-leonida-hubs). Une ligne par plan : timecode, hub, confiance. Si le chat crie un nom de rue, attendez une enseigne lisible. Le lancement console reste le **19 novembre 2026** sur PS5 et Xbox. Revérifiez [rockstargames.com/VI](https://www.rockstargames.com/VI) avant de dépenser. Les éditions n’ajoutent aucun pin — [guide précommande](/fr/guides/gta-6-preorder-guide) si vous êtes venu pour ça.
`,
    cluster: "trailer",
    primaryKeyword: "gta 6 extended look",
    secondaryKeywords: [
      "gta 6 netflix",
      "gta 6 jason lucia",
      "carte gta 6 trailer",
    ],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://www.netflix.com/tudum/articles/grand-theft-auto-6-extended-first-look",
        title: "Netflix Tudum — An Extended Look",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-08-28T08:00:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-08-27T18:00:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive", "mount-kalaga"],
    relatedGuideSlugs: [
      "gta-6-extended-look-breakdown",
      "gta-6-wanted-system",
      "gta-6-extended-look-how-to-watch",
      "gta-6-map-guide",
    ],
    eventKey: "extended-look-live-notes-2026-08",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "L’Extended Look a-t-il confirmé une date PC ?",
        answer:
          "Non. Le Look était du footage console. Le 19 novembre 2026 reste PS5 et Xbox. Le PC attend une annonce Rockstar séparée.",
      },
      {
        question: "Où revoir An Extended Look gratuitement ?",
        answer:
          "Après la fenêtre Netflix, l’upload YouTube / rockstargames.com/VI est le chemin gratuit. Horaires : le guide Map-6 how-to-watch.",
      },
    ],
    notes: "Recap FR post-event — indexable, distinct du guide how-to-watch.",
  },
  {
    id: "editorial-trailer-watch-map-checklist",
    slug: "gta-6-trailer-watch-map-checklist",
    locale: "en",
    title: "GTA 6 Trailer Watch Checklist for Map Hunters",
    description:
      "A reusable scrub checklist for official GTA 6 footage: Landmarks filter, seven hubs, HUD X/Y, and what never becomes a pin.",
    bodyMarkdown: `Official GTA 6 drops still move faster than notes. Chat fills with cropped stills, the wrong region label, and invented dates. This checklist keeps the [interactive map](/en/map) open beside the player so you capture **geography** instead of a Discord folder you will not reopen.

It started as the 27 August **An Extended Look** desk (Netflix 21:00 CEST, YouTube / [rockstargames.com/VI](https://www.rockstargames.com/VI) six hours later). The Look has aired. The **same seven-hub list** is what you reuse on any future official upload — a Newswire cut, a TV spot, a gameplay week. Hours for that night: [how to watch](/en/guides/gta-6-extended-look-how-to-watch). Frame index: [trailer frames mapped to hubs](/en/news/gta-6-trailer-frames-leonida-hubs). Recap: [Extended Look notes](/en/news/gta-6-extended-look-live-notes).
${VC("Vice City Landmarks filter on Map-6", "Open Vice City with Landmarks on before you press play — downtown is the first easy match.")}

## Scrubbing is not spoiling

Map hunting is landmarks and biomes. It is not leaking a mission script. Pause on neon, skyline, causeways, cranes, mangroves, forested elevation, and gated wealth. Leave “plot confirmed” threads alone. The [locations index](/en/locations) and the [map guide](/en/guides/gta-6-map-guide) reward that patience.

A useful notes doc has four columns: **timestamp**, **biome guess**, **Map-6 URL**, **confidence** (trailer-visible vs speculation). If you cannot fill confidence, you do not have a pin.

## Before play

1. Open the [map](/en/map) and filter **Landmarks**.
2. Keep tabs on [Vice City](/en/locations/vice-city), [Ocean Drive](/en/locations/ocean-drive), [Mount Kalaga](/en/locations/mount-kalaga).
3. Optional second row: Keys, Port Gellhorn, Grassrivers, Ambrosia Island.
4. Know where HUD **X/Y** live ([Privacy](/en/privacy) explains what Share copies).
5. Decide you will **not** name a shop from a blurry sign.

## The seven checks

- Neon hotel / palm strip → [Ocean Drive](/en/locations/ocean-drive)
- Dense skyline + freeways → [Vice City](/en/locations/vice-city)
- Causeways / small islands → [Leonida Keys](/en/locations/leonida-keys)
- Cranes / yards → [Port Gellhorn](/en/locations/port-gellhorn)
- Mangroves / airboats → [Grassrivers](/en/locations/grassrivers)
- Forests / elevation → [Mount Kalaga](/en/locations/mount-kalaga)
- Gated mansions / yachts → [Ambrosia Island](/en/locations/ambrosia-island)
- Unclear biome → **speculation**. Do not force a hub.

Deep-link with \`?loc=\` — example [/en/map?loc=mount-kalaga](/en/map?loc=mount-kalaga). Copy coordinates only after the silhouette matches.

Water alone is not a region. Keys and Grassrivers both have water; the **road grid** and the **horizon** decide. A teal grade can sit on Ocean Drive or downtown. Roofline first.
${OD("Ocean Drive ready as a second tab", "Ocean Drive is the postcard strip. If the shot is towers plus freeway, you want Vice City instead.")}

## During a drop — facts vs noise

| You see | Treat as |
|---|---|
| Clear match to a trailer-known landmark | Confirmed visual → note the pin |
| “Official Trailer 3 date” from a random account | Unconfirmed unless Rockstar |
| Store or mission names not on screen | Speculation |
| PC launch tied to the trailer | Separate topic — [release briefing](/en/news/gta-6-release-date-platforms) |

After the credits: publish notes with X/Y and links, wait for a sourced Map-6 [news](/en/news) update, prefer Newswire over anonymous calendars. If the hype wants you to buy a key, stop and open the [pre-order guide](/en/guides/gta-6-preorder-guide) instead.

Reuse the checklist on a quiet night, not only on drop night. Play Trailer 2 from the [official player](/en/trailer), walk the seven rows, and see which hubs you still confuse. Most people mix Keys and Grassrivers, or Ocean Drive and downtown Vice City. That is the whole point of a written list: you notice the mix-up **before** November, when a wrong pin wastes a co-op evening. Write the mix-up down. “I keep filing mangroves as Keys” is a better note than another cropped still. The next official upload will go faster if that sentence is already in your doc. Do not add an eighth hub because a YouTube title promised one. Seven is the atlas Rockstar has shown. Extra names wait for extra frames.

If you stream the scrub, say the confidence out loud. “Trailer-visible Vice City skyline” is a useful line. “Here’s the secret gun store” is not. The [clip kit](/en/guides/gta-6-map-clip-kit) is for overlays and Share links, not for inventing POIs on camera.

Hardware FOMO during a trailer is a different job. Close the key-reseller tab. Open the [pre-order guide](/en/guides/gta-6-preorder-guide) and the [best-setup guide](/en/guides/best-setup-gta-6-ps5-xbox) after the credits, not during them. A console you already own beats a midnight scalper listing you will cancel.

Console launch remains **19 November 2026** on PS5 and Xbox Series X|S. PC for that window stays unconfirmed. Editions do not add checklist rows. The atlas Rockstar has actually shown is still seven hubs. That is enough work until the next official upload.
`,
    cluster: "trailer",
    primaryKeyword: "gta 6 trailer map",
    secondaryKeywords: ["gta 6 trailer locations", "gta 6 map checklist"],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/en/map",
        title: "Map-6 Interactive Map",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-08-10T10:05:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-08-10T10:05:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive", "mount-kalaga"],
    relatedGuideSlugs: ["gta-6-extended-look-how-to-watch", "gta-6-map-guide"],
    eventKey: "trailer-watch-checklist-2026-08",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Is this checklist only for the Netflix Extended Look?",
        answer:
          "No. The August 27 hours were the first use. The seven-hub list is the reusable scrub for any official Rockstar upload.",
      },
      {
        question: "Should I pin a shop name from chat during a trailer?",
        answer:
          "No. Chat names are speculation until a readable sign is on screen. Map-6 would rather be a day late.",
      },
    ],
    notes: "Replaces factory checklist + AdSense-depth padding.",
  },
  {
    id: "editorial-trailer-watch-map-checklist-fr",
    slug: "gta-6-trailer-watch-map-checklist",
    locale: "fr",
    title: "Checklist trailer GTA 6 pour chasseurs de carte",
    description:
      "Checklist de scrub réutilisable pour le footage officiel GTA 6 : filtre Landmarks, sept hubs, X/Y HUD, et ce qui ne devient jamais un pin.",
    bodyMarkdown: `Les drops officiels GTA 6 vont plus vite que les notes. Le chat se remplit de recadrages, de mauvais hubs et de dates inventées. Cette checklist garde la [carte interactive](/fr/map) ouverte à côté du lecteur pour capturer de la **géographie**, pas un dossier Discord que vous n’ouvrirez plus.

Elle a commencé comme le desk du **27 août** pour An Extended Look (Netflix 21 h CEST, YouTube / [rockstargames.com/VI](https://www.rockstargames.com/VI) six heures plus tard). Le Look est passé. La **même liste à sept hubs** sert pour tout prochain upload officiel. Horaires de cette nuit-là : [comment regarder](/fr/guides/gta-6-extended-look-how-to-watch). Index des plans : [frames trailer](/fr/news/gta-6-trailer-frames-leonida-hubs). Recap : [notes Extended Look](/fr/news/gta-6-extended-look-live-notes).
${VC( "Filtre Landmarks Vice City sur Map-6", "Ouvrez Vice City avec Landmarks avant play — le downtown est le premier match facile.")}

## Scrubber n’est pas spoiler

On chasse landmarks et biomes. On ne fuite pas un script de mission. Pausez sur néon, skyline, causeways, grues, mangroves, dénivelé, richesse fermée. Laissez les threads « plot confirmé ». L’[index lieux](/fr/locations) et le [guide carte](/fr/guides/gta-6-map-guide) récompensent cette patience.

Un bon doc a quatre colonnes : **timecode**, **biome**, **URL Map-6**, **confiance** (visible au trailer vs spéculation). Pas de confiance, pas de pin.

## Avant play

1. Ouvrez la [carte](/fr/map), filtrez **Landmarks**.
2. Onglets [Vice City](/fr/locations/vice-city), [Ocean Drive](/fr/locations/ocean-drive), [Mount Kalaga](/fr/locations/mount-kalaga).
3. Deuxième rangée optionnelle : Keys, Port Gellhorn, Grassrivers, Ambrosia.
4. Sachez où vivent le **X/Y** HUD ([Confidentialité](/fr/privacy)).
5. Décidez de **ne pas** nommer une boutique sur une enseigne floue.

## Les sept checks

- Hôtel néon / palmiers → [Ocean Drive](/fr/locations/ocean-drive)
- Skyline dense + autoroutes → [Vice City](/fr/locations/vice-city)
- Causeways / petites îles → [Leonida Keys](/fr/locations/leonida-keys)
- Grues / cours → [Port Gellhorn](/fr/locations/port-gellhorn)
- Mangroves / hydroglisseurs → [Grassrivers](/fr/locations/grassrivers)
- Forêts / dénivelé → [Mount Kalaga](/fr/locations/mount-kalaga)
- Villas fermées / yachts → [Ambrosia Island](/fr/locations/ambrosia-island)
- Biome flou → **spéculation**. Ne forcez pas un hub.

Deep link \`?loc=\` — exemple [/fr/map?loc=mount-kalaga](/fr/map?loc=mount-kalaga). Coordonnées seulement après la silhouette.

L’eau seule n’est pas une région. Keys et Grassrivers ont de l’eau ; la **grille** et l’**horizon** tranchent. Un étalonnage bleu-nuit peut être Ocean Drive ou le centre. Toiture d’abord.
${OD("Ocean Drive en second onglet", "Ocean Drive est la carte postale. Tours plus autoroute = Vice City.")}

## Pendant un drop

| Vous voyez | Traitez comme |
|---|---|
| Match clair à un landmark déjà trailer | Visuel confirmé → notez le pin |
| « Date officielle Trailer 3 » d’un compte random | Non confirmé sauf Rockstar |
| Noms de boutique / mission hors écran | Spéculation |
| PC collé au trailer | Sujet à part — [briefing sortie](/fr/news/gta-6-release-date-platforms) |

Après le générique : publiez notes avec X/Y, attendez une news Map-6 sourcée, préférez Newswire aux calendriers anonymes. Si le hype pousse une key shop, stoppez et ouvrez le [guide précommande](/fr/guides/gta-6-preorder-guide).

Réutilisez la checklist un soir calme, pas seulement le soir d’un drop. Lancez le Trailer 2 depuis le [lecteur officiel](/fr/trailer), descendez les sept lignes, et voyez quels hubs vous mélangez encore. La plupart des gens confondent Keys et Grassrivers, ou Ocean Drive et le centre de Vice City. C’est tout l’intérêt d’une liste écrite : voir la confusion **avant** novembre, quand un mauvais pin gâche une soirée co-op. Écrivez la confusion. « Je classe encore les mangroves en Keys » est une meilleure note qu’un énième recadrage. Le prochain upload officiel ira plus vite si cette phrase est déjà dans le doc. N’ajoutez pas un huitième hub parce qu’un titre YouTube l’a promis. Sept, c’est l’atlas montré. Les noms en plus attendent des plans en plus.

Si vous streamez le scrub, dites la confiance à voix haute. « Skyline Vice City visible au trailer » est une phrase utile. « Voici la gun store secrète » n’en est pas une. Le [clip kit](/fr/guides/gta-6-map-clip-kit) sert aux overlays et aux liens Share, pas à inventer des POI à l’antenne.

Le FOMO hardware pendant un trailer est un autre métier. Fermez l’onglet key shop. Ouvrez le [guide précommande](/fr/guides/gta-6-preorder-guide) et le [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) après le générique, pas pendant. Une console déjà à vous bat une fiche scalper de minuit que vous annulerez. La checklist ne change pas si vous achetez Standard ou Ultimate : sept hubs, pas plus, jusqu’au prochain upload Rockstar. Même le pack Vintage Vice City n’ajoute aucune ligne géographique. Si vous n’avez qu’un soir, faites Trailer 2 et les sept checks — c’est déjà plus utile qu’un thread leak.

Lancement console : **19 novembre 2026** PS5 et Xbox. PC non confirmé pour cette fenêtre. Les éditions n’ajoutent aucune ligne. L’atlas que Rockstar a réellement montré, ce sont encore sept hubs. Ça suffit jusqu’au prochain upload officiel.
`,
    cluster: "trailer",
    primaryKeyword: "carte gta 6 trailer",
    secondaryKeywords: ["lieux trailer gta 6", "checklist carte gta 6"],
    sources: [
      {
        url: "https://www.rockstargames.com/VI",
        title: "Rockstar Games — Grand Theft Auto VI",
      },
      {
        url: "https://map-6.com/fr/map",
        title: "Carte interactive Map-6",
      },
    ],
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    publishedAt: "2026-08-10T10:05:00.000Z",
    updatedAt: NOW,
    createdAt: "2026-08-10T10:05:00.000Z",
    relatedLocationSlugs: ["vice-city", "ocean-drive", "mount-kalaga"],
    relatedGuideSlugs: ["gta-6-extended-look-how-to-watch", "gta-6-map-guide"],
    eventKey: "trailer-watch-checklist-2026-08",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Cette checklist ne sert-elle qu’à l’Extended Look Netflix ?",
        answer:
          "Non. Les horaires du 27 août étaient le premier usage. La liste à sept hubs sert pour tout upload officiel Rockstar.",
      },
      {
        question: "Dois-je pinner un nom de boutique vu dans le chat ?",
        answer:
          "Non. Les noms du chat sont de la spéculation tant qu’une enseigne n’est pas lisible à l’écran.",
      },
    ],
    notes: "Checklist FR éditoriale — remplace le padding AdSense factory.",
  },
];
