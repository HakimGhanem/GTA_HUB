import type { Article } from "@/lib/content/schema";
import { locationFigure } from "@/lib/content/key-news";

const AUTHOR = "Map-6 Editorial";
const NOW = "2026-10-07T12:00:00.000Z";
const VC = (alt: string, cap: string) => locationFigure("vice-city", alt, cap);
const OD = (alt: string, cap: string) => locationFigure("ocean-drive", alt, cap);
const KEYS = (alt: string, cap: string) =>
  locationFigure("leonida-keys", alt, cap);

const ROCKSTAR_VI = {
  url: "https://www.rockstargames.com/VI",
  title: "Rockstar Games — Grand Theft Auto VI",
};
const TTWO_PREORDER = {
  url: "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
  title: "Take-Two — ouverture des précommandes GTA VI",
};
const TTWO_Q1 = {
  url: "https://ir.take2games.com/node/32401/pdf",
  title: "Take-Two — résultats T1 fiscal 2027 (7 août 2026)",
};
const ROCKSTAR_SUPPORT = {
  url: "https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions",
  title: "Rockstar Support — plateformes, éditions, versions",
};
const PS_BLOG = {
  url: "https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/",
  title: "PlayStation Blog — DualSense édition limitée (3 sept. 2026)",
};

function desk(
  partial: Omit<
    import("@/lib/content/schema").Article,
    "author" | "reviewer" | "updatedAt" | "status"
  >,
): import("@/lib/content/schema").Article {
  return {
    ...partial,
    status: "published",
    author: AUTHOR,
    reviewer: "editorial",
    updatedAt: NOW,
  };
}

export const DESK_2026_10_FR_ARTICLES: Article[] = [
  desk({
    id: "desk-2026-10-launch-calendar-fr",
    slug: "gta-6-six-weeks-out-launch-calendar",
    locale: "fr",
    title: "Calendrier de lancement GTA 6 (J-43)",
    description:
      "Plus que six semaines : 19 novembre sur deux consoles, préchargement le 12, boîte-code la même semaine. Le calendrier Rockstar, et ses blancs.",
    bodyMarkdown: `*Grand Theft Auto VI* est à **43 jours** d’un mercredi de lancement : le **19 novembre 2026**, PlayStation 5 et Xbox Series X|S. Ce n’est pas une fenêtre de rumeur. C’est la phrase de [rockstargames.com/VI](https://www.rockstargames.com/VI) et du tableau de sorties Take-Two.

Si vous attendez encore une fiche Steam ou un « Trailer 3 vendredi prochain », vous planifiez contre un calendrier que Rockstar n’a pas publié. La fiche utile est courte : précommandes déjà ouvertes, un lundi de préchargement, une boîte-code la même semaine, un lancement qui ne prononce pas le mot PC.
${VC("Hub Vice City sur la carte GTA 6 Map-6", "Vice City est le métro vendu — le calendrier n’ajoute pas de troisième plateforme.")}

## Les dates vraiment écrites

Le communiqué Take-Two du 25 juin 2026 reste le document le plus propre après la page VI.

| Quand | Officiel | Ce que ce n’est pas |
|---|---|---|
| 25 juin 2026, minuit local | Ouverture des précommandes | Pas un store PC |
| 12 novembre 2026, minuit local | Préchargement numérique | Pas « on joue plus tôt » |
| 12 novembre 2026 | **Boîte-code** en rayon pour recharger | Pas un disque dans le tiroir |
| 19 novembre 2026 | Sortie PS5 et Xbox Series X|S | Pas Steam, pas Switch |
| Avant le 20 novembre 2026 | Pack Vintage Vice City sur les achats éligibles | Pas un exclusif Ultimate |

La version physique est un **code dans une boîte**. Rockstar l’a écrit. Si une étiquette de rayon laisse croire à un Blu-ray, l’étiquette a tort. Le code doit pouvoir s’utiliser **dès que la boîte est là**, pour rejoindre le préchargement du 12 — utile si la ligne est lente, inutile si vous comptiez prêter un disque.

## À quoi servent six semaines

1. **Verrouiller une plateforme.** Les sauvegardes croisées ne sont pas annoncées. Un panier PS5 ne devient pas une install Xbox. Le [guide précommande](/fr/guides/gta-6-preorder-guide) est la liste de caisse ; cette page est l’horloge.
2. **Choisir Standard ou Ultimate maintenant.** Les 20 $ d’écart sont des extras, pas un État plus grand. La [carte interactive](/fr/map) ne change pas de SKU.
3. **Préparer le stockage et l’écran** si la machine actuelle est juste. Le [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) est la page matériel.
4. **Ignorer une date de troisième trailer** tant que le Newswire n’en poste pas. L’Extended Look a déjà eu lieu le 27 août.

La semaine du préchargement punira ceux à qui il reste 40 Go et 20 Mb/s. C’est un problème de salon, pas un scoop.

## Les blancs que nous ne remplirons pas

Le PC reste absent du tableau de lineup Take-Two du 7 août 2026 — le même tableau qui imprime le 19 novembre à côté de PS5 et Xbox. « GTA V est arrivé plus tard sur PC, donc VI aussi » est de l’histoire, pas une réservation.

Pas de total de collectibles. Pas de km². Pas de cross-gen. Pas de GTA Online de VI le jour J — Online, aujourd’hui, c’est encore **Los Santos**. Une Shark Card finance la session en cours, pas Leonida.

Le [guide date de sortie](/fr/guides/gta-6-release-date) raconte les reports. Les [lieux](/fr/locations) servent quand vous voulez des hubs nommés plutôt qu’un compte à rebours. Six semaines suffisent pour apprendre les coutures de Vice City, et restent assez courtes pour qu’une mauvaise console ne se rattrape pas d’un rire.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "Ocean Drive s’apprend maintenant — les éditions ne l’ouvrent pas plus tôt.")}

Le calendrier honnête est volontairement plat. La date est fixe. Les plateformes sont deux. Le lundi de préchargement est la seule date mécanique encore publique.
`,
    cluster: "release",
    primaryKeyword: "date de sortie gta 6",
    secondaryKeywords: ["préchargement gta 6", "calendrier gta 6", "gta 6 ps5"],
    sources: [ROCKSTAR_VI, TTWO_PREORDER, ROCKSTAR_SUPPORT],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: ["gta-6-release-date", "gta-6-preorder-guide"],
    eventKey: "story-launch-calendar",
    funnelKind: "mixed",
    affiliateIntents: ["preorder_standard", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Quand sort GTA 6 ?",
        answer:
          "Le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S. Rockstar n’a pas annoncé de date PC dans les mêmes documents.",
      },
      {
        question: "Quand peut-on précharger GTA 6 ?",
        answer:
          "Les précommandes numériques préchargent à partir du 12 novembre 2026, minuit local. La version physique est une boîte-code à activer pour rejoindre cette fenêtre.",
      },
      {
        question: "Y a-t-il un disque GTA 6 ?",
        answer:
          "La version physique annoncée est un code de téléchargement dans une boîte, pas un disque jouable.",
      },
    ],
    notes: "Desk FR — J-43.",
  }),

  desk({
    id: "desk-2026-10-ttwo-fr",
    slug: "ttwo-q1-fy27-gta-6-preorders-zelnick",
    locale: "fr",
    title: "Take-Two : les précommandes GTA 6 penchent Ultimate",
    description:
      "Zelnick a dit des précommandes GTA 6 « inédites » et un mix qui penche vers l’Ultimate à 99,99 $. Pas de chiffre à 89 %. Ce que le dépôt contient vraiment.",
    bodyMarkdown: `Strauss Zelnick parlera des précommandes de *Grand Theft Auto VI*. Il ne vous donnera pas de volume. Le **7 août 2026**, Take-Two a publié le T1 fiscal 2027 (trimestre clos le **30 juin 2026**) : **1,39 milliard de dollars** de net bookings, un peu au-dessus du guidage, et une fourchette annuelle **réitérée de 8,0 à 8,2 milliards**. La date dans le dossier est celle que vous connaissez — **19 novembre 2026**, PS5 et Xbox.

Trois jours plus tard, sur CNBC, il a ajouté le seul commentaire de mix qu’on peut répéter sans mentir : les précommandes **« penchent davantage vers l’édition premium »**, peut-être parce que **les plus fervents achètent d’abord**. C’est un PDG qui décrit **qui s’est présenté en juin-juillet**, pas un camembert Newswire.
${VC("Vice City sur la carte GTA 6 Map-6", "Les 20 $ d’Ultimate n’achètent pas un plus grand Vice City.")}

## Ce que le dossier dit — et s’arrête de dire

Le communiqué est sur l’IR Take-Two. Il n’imprime **ni** taux d’attach VI, **ni** split digital/physique, **ni** pourcentage Ultimate. Les dépenses récurrentes ont encore dominé le trimestre (84 % des net bookings, dit Take-Two), avec NBA 2K et la série GTA déjà en rayon — donc **V et Online**, pas VI, ont payé le T1.

Zelnick a appelé le démarrage « exceptionnel », puis a ajouté le caveat que les agrégateurs sautent : **une précommande se annulera**. Il a aussi refusé de dire si la demande est juste tirée en avant. Ce filet est l’article. Une capture « 89 % Ultimate » n’en est pas un.

| Phrase que vous verrez | Ce qui existe | Étiquette Map-6 |
|---|---|---|
| Précommandes « inédites » | PDG, earnings + CNBC | Commentaire d’exécutif |
| Mix penché Ultimate (~100 $) | PDG, CNBC 10 août 2026 | Directionnel, sans échantillon |
| « 89 % » ou « 90 % » Ultimate | Presse / télémétrie | **Absent** du dépôt |
| 8,0–8,2 Md$ de net bookings FY27 | Outlook, 7 août | Guidage, pas des unités VI |

Si une carte sociale invente une citation — « prenez Ultimate ce soir ou perdez votre place » — jetez-la. Il a parlé du **mix des early adopters**, puis rappelé qu’une précommande n’est pas une vente.

Le test personnel ne change pas : voulez-vous les extras le jour J ? Ultimate évite un second passage en caisse. Vous n’en avez rien à faire ? Le Standard est le jeu entier et la même [carte](/fr/map). La fenêtre du Pack Vintage (achats éligibles avant le **20 novembre 2026**) vaut pour les deux paliers. Vous êtes en physique ? Vous êtes en Standard / boîte-code. Il n’y a pas d’Ultimate physique sur la liste publique.

Le [guide Ultimate vs Standard](/fr/guides/gta-6-ultimate-edition-vs-standard) est le tableau SKU. Le [guide précommande](/fr/guides/gta-6-preorder-guide) bougera quand les pages magasin bougent. Cet article bougera quand Take-Two imprimera un chiffre.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "La géographie trailer est gratuite. Les extras Ultimate ne sont pas un plus grand atlas.")}
`,
    cluster: "preorder",
    primaryKeyword: "édition ultimate gta 6",
    secondaryKeywords: ["zelnick gta 6", "take-two gta 6", "précommande gta 6"],
    sources: [TTWO_Q1, ROCKSTAR_VI, TTWO_PREORDER],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: [
      "gta-6-ultimate-edition-vs-standard",
      "gta-6-preorder-guide",
    ],
    eventKey: "story-ttwo-preorder-mix",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "preorder_collectors"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Take-Two a-t-il dit que 89 % des précommandes sont Ultimate ?",
        answer:
          "Non. Zelnick a dit que le mix penche vers le premium chez les early adopters. Les 89 % et 90 % sont des inférences de presse, pas un chiffre du T1 FY27.",
      },
      {
        question: "Que Take-Two a-t-il publié pour le T1 FY27 ?",
        answer:
          "1,39 milliard de dollars de net bookings pour le trimestre clos le 30 juin 2026, et un outlook FY27 de 8,0 à 8,2 milliards réitéré.",
      },
      {
        question: "Faut-il prendre Ultimate à cause de ce mix ?",
        answer:
          "Seulement si vous voulez les extras officiels. Le Standard est le jeu complet et la même carte. Le mix d’été n’est pas le mix de novembre.",
      },
    ],
    notes: "Desk FR — TTWO.",
  }),

  desk({
    id: "desk-2026-10-collection-fr",
    slug: "gta-6-vice-city-collection-399-no-game",
    locale: "fr",
    title: "Le coffret GTA 6 à 400 $ sans le jeu",
    description:
      "La Goodtime State Vice City Collection : 399,99 $ de merch, 11 objets, expédition à partir du 19 novembre, jeu vendu séparément. Ce qu’il y a dans la caisse.",
    bodyMarkdown: `Le **24 septembre 2026**, Rockstar a mis en ligne un coffret au nom de sitcom : **Grand Theft Auto VI: The Goodtime State – Vice City Collection**. Prix US : **399,99 $**. Lecture UK la même semaine : **349,99 £**. Session allemande le lendemain : **399,99 €**. La phrase qui compte est celle du store, en anglais de Rockstar : **le jeu est vendu séparément**.

Ce n’est pas une Collector’s Edition de la campagne. C’est une caisse merch limitée autour de **Macca the Gator**, une émission dans le jeu, expédiable **à partir du 19 novembre 2026** — le jour du lancement, pas l’heure où le livreur doit sonner.
${VC("Hub Vice City sur la carte GTA 6 Map-6", "L’affiche souvenir est du papier. La ville jouable est sur la carte, pas dans la caisse.")}

## Ce que 400 dollars achètent vraiment

Les ouvertures de fiche (Forbes, Kotaku, FAQ store) s’accordent sur **11 objets**. Map-6 n’en inventera pas un douzième : figurine Macca, Oakley Frogskins, New Era 9FORTY, sac Keys, miroir, verre Chunkee, cuillère, porte-clés rasoir, pins, stickers, poster recto-verso avec une **carte de Leonida** au dos.

Ce poster est la seule raison d’être de cette URL sur un site de carte. C’est du **papier souvenir**, pas une source. Nous ne calquerons pas la [carte interactive](/fr/map) sur une impression merch. Les pins Map-6 viennent encore des plans officiels — voir le [guide carte](/fr/guides/gta-6-map-guide).

| | Vice City Collection | Ultimate | Standard |
|---|---|---|---|
| Paie le jeu | Non | Oui | Oui |
| Prix US typique | 399,99 $ merch | 99,99 $ jeu | 79,99 $ jeu |
| Où | Rockstar Store | Digital console / Rockstar | Console, boîte-code |
| Limite | Un par personne, 18+, quantités limitées | — | — |

Le Newswire a joué la rareté : **while supplies last**. La FAQ parlait de quantités limitées et d’une wishlist. Des couvertures UK ont dit rupture en deux jours. Traitez ça comme un **état de store**, pas un compteur d’unités.

Si vous n’avez pas le jeu, **400 $ ne vous font pas entrer dans Vice City**. Prenez d’abord un [SKU Standard ou Ultimate](/fr/guides/gta-6-preorder-guide). Le coffret n’inclut pas de code. Il n’inclut pas les extras Ultimate. Il ne déplace pas un pin.

Un par personne, compte Rockstar, adultes seulement. Si un revendeur promet une « Collector avec le jeu dedans », l’annonce est mal titrée.
${KEYS("Leonida Keys sur la carte GTA 6 Map-6", "Le sac est estampillé Keys. Les ponts restent une lecture trailer.")}
`,
    cluster: "preorder",
    primaryKeyword: "édition collector gta 6",
    secondaryKeywords: [
      "vice city collection",
      "coffret gta 6",
      "goodtime state",
    ],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.rockstargames.com/newswire",
        title: "Rockstar Newswire — précommande Vice City Collection",
      },
      {
        url: "https://kotaku.com/rockstar-reveals-400-special-edition-of-grand-theft-auto-6-2000736975",
        title: "Kotaku — coffret à 400 $, jeu à part",
      },
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "leonida-keys"],
    relatedGuideSlugs: ["gta-6-preorder-guide", "gta-6-map-guide"],
    eventKey: "story-vice-city-collection",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_collectors", "preorder_standard"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "La Vice City Collection inclut-elle GTA 6 ?",
        answer:
          "Non. La fiche Rockstar dit que le jeu est vendu séparément. Vous achetez 11 objets de merch.",
      },
      {
        question: "Combien coûte le coffret Goodtime State ?",
        answer:
          "399,99 $ aux États-Unis, 349,99 £ au Royaume-Uni selon les lectures de septembre, 399,99 € sur une session allemande. Les frais de port s’ajoutent.",
      },
      {
        question: "Quand le coffret est-il expédié ?",
        answer:
          "Rockstar indique une expédition possible à partir du 19 novembre 2026 — le jour du lancement, pas forcément l’après-midi en sonnette.",
      },
    ],
    notes: "Desk FR — coffret.",
  }),

  desk({
    id: "desk-2026-10-pc-fr",
    slug: "gta-6-pc-still-unannounced-october-2026",
    locale: "fr",
    title: "GTA 6 sur PC : toujours aucune date",
    description:
      "En octobre 2026, Rockstar n’a toujours pas annoncé GTA 6 sur PC. Le lineup Take-Two n’écrit que PS5 et Xbox. À quoi ressemblerait une vraie date.",
    bodyMarkdown: `Il n’y a pas de version PC de *Grand Theft Auto VI* sur un calendrier officiel. Pas d’année. Pas de saison. Pas de note « Windows plus tard » sur [rockstargames.com/VI](https://www.rockstargames.com/VI). Le lineup Take-Two du **7 août 2026** imprime le jeu une fois : **PlayStation 5 et Xbox Series X|S, 19 novembre 2026**. Le même tableau écrit « PC » à côté de NBA 2K27. Pas à côté de VI.

Cette absence est l’info. Le reste est de la analogie avec les 18 mois d’attente de GTA V — et l’analogie est le moteur des fausses dates Steam.
${VC("Hub Vice City sur la carte GTA 6 Map-6", "L’atlas est console first. Il n’y a pas de jeu de pins PC parce qu’il n’y a pas de SKU PC.")}

## Où une vraie annonce atterrirait

Un SKU PC réel apparaît la même semaine à trois endroits : un Newswire plus la page VI ; une vitrine (Rockstar Store et au moins Steam, Epic ou Microsoft PC) ; des configs, même une V1.

Tant que ces trois-là n’existent pas, une miniature YouTube « novembre 2027 » est de la fanfic. Le cloud n’est pas annoncé non plus. Une wishlist GeForce Now n’est pas un produit Rockstar.

Le Support Rockstar nomme **deux** boîtiers current-gen puis parle éditions. Il ne glisse pas un « PC TBA ». Le communiqué du 25 juin liste PlayStation Store, Microsoft Store, Rockstar Games Store et le retail. Pas de phrase Steam.

## Si vous n’avez qu’un PC

Vous ne lancerez pas VI le **19 novembre 2026** sur le hardware de votre bureau. Il n’y a pas d’attente officielle à coller au calendrier. Les options réelles : acheter ou emprunter une PS5 ou une Xbox Series, ou attendre une annonce non datée.

C’est une phrase plus moche que « T2 2027 », c’est pour ça qu’on invente T2 2027. Map-6 ne le fera pas. Le [guide date de sortie](/fr/guides/gta-6-release-date) suit ce que Rockstar a reporté. Une plateforme manquante n’est pas un report. C’est un blanc.

Si vous achetez un GPU « pour GTA 6 », vous l’achetez pour d’autres jeux. Gardez le ticket. Les configs, le jour où elles existent, ne matcheront pas un tableur Reddit de 2024.

Les hubs nommés de Leonida ne dépendent pas de DirectX. La [carte](/fr/map) est le même devoir qu’un acheteur console peut faire en octobre. Un acheteur PC aussi. Il ne lancera simplement pas l’exécutable en novembre.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "On peut étudier Ocean Drive sans clé Steam. On ne peut pas y rouler sur PC en novembre.")}
`,
    cluster: "release",
    primaryKeyword: "gta 6 pc date de sortie",
    secondaryKeywords: ["gta 6 steam", "gta 6 pc", "plateformes gta 6"],
    sources: [ROCKSTAR_VI, TTWO_Q1, ROCKSTAR_SUPPORT],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-release-date", "gta-6-preorder-guide"],
    eventKey: "story-gta6-pc",
    funnelKind: "mixed",
    affiliateIntents: ["console_upgrade", "preorder_standard"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "GTA 6 sort-il sur PC ?",
        answer:
          "Rockstar n’a pas annoncé de version PC. Les listes officielles et le lineup Take-Two d’août 2026 ne nomment que PS5 et Xbox Series X|S.",
      },
      {
        question: "Quelle est la date Steam de GTA 6 ?",
        answer:
          "Il n’y en a pas. Tout mois précis hors Rockstar ou Take-Two est inventé.",
      },
      {
        question: "GTA 6 sera-t-il sur Game Pass ou GeForce Now le jour J ?",
        answer:
          "Ni l’un ni l’autre n’a été annoncé pour VI. Ne planifiez pas novembre autour d’une tuile cloud qui n’existe pas.",
      },
    ],
    notes: "Desk FR — PC.",
  }),

  desk({
    id: "desk-2026-10-preload-fr",
    slug: "gta-6-preload-november-12-code-in-box",
    locale: "fr",
    title: "Préchargement GTA 6 dès le 12 novembre",
    description:
      "Les précommandes numériques GTA 6 se préchargent le 12 novembre à minuit local. Le physique est une boîte-code à activer la même semaine. La séquence réelle.",
    bodyMarkdown: `La seule date mécanique encore publique est un lundi. Le **12 novembre 2026**, minuit local, les précommandes numériques peuvent **précharger**. Take-Two l’a écrit le 25 juin pour que ceux qui ont déjà payé ne se retrouvent pas devant un prompt de 100 Go le matin du lancement.

La version physique arrive en rayon **le même jour**, et c’est une **boîte-code**. Le Support Rockstar le répète : activez dès que vous avez le code pour rejoindre ce préchargement. Pas de disque à glisser. Si votre plan était « acheter le vendredi, installer le samedi », il vous faut le code **avant** le week-end, pas un boîtier de film sous cellophane.
${VC("Vice City sur la carte GTA 6 Map-6", "Le préchargement remplit un disque. Il n’ouvre pas un plus grand Vice City.")}

## Digital contre la boîte en rayon

| | Précommande numérique | Boîte-code |
|---|---|---|
| Préchargement dès le 12 nov., minuit local | Oui, quand le store lâche les bits | Oui, après activation du code |
| Pack Vintage (achat avant le 20 nov.) | Oui | Oui — le Support dit que le code inclut le pack |
| Un mois de GTA+ | Offre digitale ; à réclamer avant le 31 mars 2027 | Absent du paragraphe physique Support |
| Jouer avant le 19 nov. | Non | Non |

Le stockage est le risque ennuyeux. Rockstar n’a pas publié de taille finale dans les documents que nous suivons. Laissez un **gros** morceau libre sur la console que vous lancerez — pas sur le vieux carton du placard. Le [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) se lit avant le 12, pas dessus.

Le minuit est local. Un code acheté à Paris ne suit pas New York. Le [guide précommande](/fr/guides/gta-6-preorder-guide) est la page magasin par magasin ; cet article est la séquence de la semaine.

Ce n’est pas un déblocage anticipé, pas une bêta, pas une raison de camper le 11 sauf si vous aimez les files. L’exécutable devient un jeu le **19 novembre**. Tout ce que vous tirez le 12 sert à ce que mercredi soit un patch, pas un fetch complet.

Les captures « preload is live » d’une région n’engagent pas la vôtre. Croyez la tuile de **votre** compte. Cross-play et cross-saves restent non annoncés : précharger sur la mauvaise famille, c’est offrir une semaine de bande passante à une bibliothèque que vous n’ouvrirez pas.

Un URL desk suffit. Si Rockstar bouge le jour, on change le chapô. Apprenez les [lieux](/fr/locations) sur la [carte](/fr/map) d’ici là. La barre de téléchargement n’enseigne pas Ocean Drive.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "Apprenez la bande en octobre. Le préchargement ne le fera pas à votre place.")}
`,
    cluster: "preorder",
    primaryKeyword: "préchargement gta 6",
    secondaryKeywords: ["boîte-code gta 6", "gta 6 physique", "précommande gta 6"],
    sources: [TTWO_PREORDER, ROCKSTAR_SUPPORT, ROCKSTAR_VI],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["gta-6-preorder-guide", "best-setup-gta-6-ps5-xbox"],
    eventKey: "story-preload-physical",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "storage_ssd"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Quand commence le préchargement de GTA 6 ?",
        answer:
          "Le 12 novembre 2026 à minuit local pour les précommandes numériques. Les acheteurs physiques activent une boîte-code pour rejoindre la même fenêtre.",
      },
      {
        question: "Peut-on jouer à GTA 6 le 12 novembre ?",
        answer:
          "Non. Le préchargement installe le client. Le lancement reste le 19 novembre 2026.",
      },
      {
        question: "La version physique inclut-elle GTA+ ?",
        answer:
          "Le Support liste le Pack Vintage sur le code physique. Le mois de GTA+ offert est décrit comme une offre de précommande numérique.",
      },
    ],
    notes: "Desk FR — préchargement.",
  }),

  desk({
    id: "desk-2026-10-dualsense-fr",
    slug: "gta-6-dualsense-limited-edition-where-to-buy",
    locale: "fr",
    title: "DualSense GTA 6 : noir Direct, blanc magasins",
    description:
      "Deux DualSense officiels GTA 6 à 84,99 €, lancement le 19 novembre. Noir exclusif PlayStation Direct ; blanc aussi en magasins.",
    bodyMarkdown: `Sony a annoncé deux DualSense *Grand Theft Auto VI* en édition limitée le **3 septembre 2026** et ouvert les précommandes le **10 septembre à 10 h locales**. Les deux sortent **à partir du 19 novembre 2026** à **84,99 $ / 84,99 € / 74,99 £**. Le blanc, c’est Vice City à l’aube. Le noir, la nuit. Aucune des deux manettes n’est le jeu.

La phrase de distribution est celle que les lives ont mal recopiée. Aux États-Unis, au Royaume-Uni, en France, Allemagne, Autriche, Espagne, Italie, Pays-Bas, Belgique et Luxembourg, le **noir** est **exclusif PlayStation Direct**. Le **blanc** est sur Direct **et** chez les revendeurs participants. Le Portugal passait par playstation.com/store/hardware. Ailleurs : revendeurs select, date « susceptible de varier ».
${VC("Hub Vice City sur la carte GTA 6 Map-6", "Les pads sont peints comme Vice City. Ils n’ajoutent aucun pin.")}

## Ce que vous achetez

Un DualSense standard avec une peinture et une histoire de rareté. Les haptiques ne deviennent pas une échelle à six étoiles parce que la coque est noire. Si vous avez besoin d’une manette qui marche en novembre, un pad classique — voir le [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) — est l’achat ennuyeux. Si vous voulez l’objet, vous savez déjà la couleur.

PlayStation Direct promettait la **livraison gratuite le jour J** sur les précommandes éligibles. Le store US limitait le noir à **un par commande**. Sony n’a publié **aucun chiffre de stock**. Les « sold out » du 10 septembre étaient vrais pour certaines files, du théâtre pour d’autres. Croyez la tuile live, pas une capture UK de 10 h BST.

| | Noir Limited Edition | Blanc Limited Edition |
|---|---|---|
| Look | Nuit | Aube / pastel |
| Direct (US, UK, UE listée) | Exclusif | Oui |
| Autres magasins dans ces pays | Non | Revendeurs participants |
| Prix | 84,99 € | 84,99 € |
| Jeu inclus | Non | Non |

Les listings scalpers de l’après-midi étaient la taxe prévisible. Une manette qui n’inclut pas la [précommande](/fr/guides/gta-6-preorder-guide) est un mauvais achat de panique à deux fois le prix.

Côté Xbox : le PlayStation Blog ne promet pas de pad Series, parce que c’est un PlayStation Blog. Si Microsoft annonce un pad VI, ce sera un post Microsoft.

Zéro angle carte, et c’est tant mieux. Achetez ou passez. Puis revenez sur la [carte](/fr/map). Une manette ne change pas Ocean Drive.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "Noir nuit, blanc aube — la même bande sur la carte.")}
`,
    cluster: "setup",
    primaryKeyword: "manette gta 6",
    secondaryKeywords: ["dualsense gta 6", "gta 6 ps5", "playstation direct"],
    sources: [PS_BLOG, ROCKSTAR_VI],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city"],
    relatedGuideSlugs: ["best-setup-gta-6-ps5-xbox", "gta-6-preorder-guide"],
    eventKey: "story-dualsense-gta6",
    funnelKind: "purchase",
    affiliateIntents: ["controller", "console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Combien coûte la DualSense GTA 6 ?",
        answer:
          "Prix conseillé Sony : 84,99 $, 84,99 € ou 74,99 £. Lancement à partir du 19 novembre 2026.",
      },
      {
        question: "Où acheter la manette noire GTA 6 ?",
        answer:
          "Aux États-Unis, au Royaume-Uni et dans les pays Direct listés, uniquement sur PlayStation Direct. Ailleurs, Sony a pointé des revendeurs select.",
      },
      {
        question: "La manette inclut-elle GTA 6 ?",
        answer:
          "Non. C’est un DualSense limité. Le jeu s’achète à part.",
      },
    ],
    notes: "Desk FR — DualSense.",
  }),

  desk({
    id: "desk-2026-10-vintage-fr",
    slug: "gta-6-vintage-vice-city-pack-gta-plus",
    locale: "fr",
    title: "Pack Vintage Vice City et un mois de GTA+",
    description:
      "Achetez GTA 6 avant le 20 novembre : Pack Vintage Vice City inclus. En digital, un mois de GTA+ à réclamer avant le 31 mars 2027.",
    bodyMarkdown: `Le bonus de précommande qui **n’est pas** l’Ultimate se manque parce qu’il porte un nom de pub rétro. **Pack Vintage Vice City** : une Vapid Stanier ’55 et un garage Shore Court près d’Ocean Beach, tenues et coupes pour Jason et Lucia, un motif d’arme tropical qui salue la chemise de Tommy Vercetti. Le Support Rockstar le met sur les **précommandes et achats digitaux des deux éditions avant le 20 novembre 2026**. Les codes physiques incluent aussi le pack.

Les acheteurs digitaux ont en plus **un mois de GTA+**. Les conditions PlayStation (page Irlande, même forme ailleurs) disent de le **réclamer avant le 31 mars 2027**, une fois par compte. Ça peut se reconduire en mois payant. Annulez dans les abonnements si vous n’en voulez pas. Un abonné déjà là voit le mois s’ajouter après la réclamation.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "Shore Court est collé à Ocean Beach dans le texte du pack — du sable trailer, pas un portail Ultimate.")}

## Deux bonus, deux horloges

| Bonus | Qui | Horloge | Où ça vit |
|---|---|---|---|
| Pack Vintage Vice City | Standard ou Ultimate, digital **ou** code physique, achat avant le **20 nov. 2026** | Cette date | Dans VI, au fil de l’histoire |
| Un mois de GTA+ | Achat **digital** éligible avant le 20 nov. | Réclamation avant le **31 mars 2027** | GTA+ / catalogue V, pas un plus grand Leonida |

La fiche Xbox du pack est plus lyrique que le Support et, sur au moins une locale, coupe le digital au **19 novembre 2026 23:59:59**. Quand le store contredit le Support, on flag les deux et on lit la tuile qu’on paie.

GTA+, c’est l’abonnement Rockstar pour **l’Online actuel**. Ça fait jouer à V et au catalogue. Ce n’est **pas** un saut de progression VI. Un garage de Los Santos ne déménage pas à Leonida. Le crédit portefeuille pour les Shark Cards reste le sujet de [l’article wallets](/fr/news/gta-online-wallet-cards-before-vi).

## Ultimate est une autre étagère

Les extras Ultimate (véhicules, armes, habits, activités liées à l’histoire) s’ajoutent **par-dessus**. Pas besoin d’Ultimate pour la Stanier. Réclamer GTA+ ne donne pas les extras Ultimate. Le [comparatif](/fr/guides/gta-6-ultimate-edition-vs-standard) est la question des 20 $. Cette page est la question « j’ai pris Standard, j’ai loupé le bonus ? ».

Les objets « seront disponibles à Jason et Lucia au fil de l’histoire ». Traduction : pas le smoking en caisse libre à la minute cinq. N’écrivez pas un chemin de fuite.

Si vous voulez le pack, achetez **avant le 20 novembre**. Si vous êtes digital, décidez si vous **réclamez GTA+** — et si vous casserez le renouvellement. Si vous êtes physique, visez une boîte-code à temps pour le [préchargement du 12](/fr/news/gta-6-preload-november-12-code-in-box). Ouvrez la [carte](/fr/map) pour que la ligne Ocean Beach du pack veuille dire quelque chose.
${VC("Vice City sur la carte GTA 6 Map-6", "Le pack, c’est un costume et une voiture. La ville est la même pour chaque édition.")}
`,
    cluster: "preorder",
    primaryKeyword: "bonus précommande gta 6",
    secondaryKeywords: ["pack vintage vice city", "gta+", "gta 6 standard"],
    sources: [
      ROCKSTAR_SUPPORT,
      TTWO_PREORDER,
      {
        url: "https://www.playstation.com/en-ie/support/games/gta-vi-offer-terms/",
        title: "PlayStation — conditions du mois GTA+ (offre digitale)",
      },
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["ocean-drive", "vice-city"],
    relatedGuideSlugs: [
      "gta-6-preorder-guide",
      "gta-6-ultimate-edition-vs-standard",
    ],
    eventKey: "story-vintage-pack",
    funnelKind: "purchase",
    affiliateIntents: ["preorder_standard", "wallet_topup"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Que contient le Pack Vintage Vice City de GTA 6 ?",
        answer:
          "Une Vapid Stanier ’55 et un garage, des tenues et coupes pour les deux héros, un motif d’arme exclusif. Rockstar dit que les objets se débloquent avec l’histoire.",
      },
      {
        question: "Faut-il l’Ultimate pour avoir le pack Vintage ?",
        answer:
          "Non. Le Support le liste sur les deux éditions si vous achetez avant le 20 novembre 2026, boîte-code comprise.",
      },
      {
        question: "Le mois de GTA+ est-il automatique ?",
        answer:
          "Non. Les acheteurs digitaux le réclament sur la fiche GTA+ avant le 31 mars 2027. L’abonnement peut continuer en payant si vous n’annulez pas.",
      },
    ],
    notes: "Desk FR — pack vintage.",
  }),

  desk({
    id: "desk-2026-10-hubs-fr",
    slug: "gta-6-leonida-named-hubs-october-2026",
    locale: "fr",
    title: "Carte GTA 6 : les six hubs nommés",
    description:
      "Rockstar a nommé six hubs Leonida : Vice City, Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga. Ce que chacun est, ce qu’on ne trace pas.",
    bodyMarkdown: `Leonida est l’État. **Vice City** est la carte postale. Les gens tapent encore « carte GTA 6 Miami » parce que le marketing le veut. Le vocabulaire officiel est plus large, et il n’a pas grandi depuis le dernier cycle trailer. Six destinations vendues, une bande que l’on peut mettre en pause, beaucoup de blanc que nous refusons d’encrer depuis une fuite.

Les noms, tels que Rockstar les a posés sur les affiches et dans l’Extended Look :

- **Vice City** — métro façon Miami, nuit, plages, coutures d’autoroute.
- **Leonida Keys** — ponts, eau, la sortie du métro.
- **Grassrivers** — zones humides, mangrove, faune.
- **Port Gellhorn** — port qui travaille, pas South Beach.
- **Ambrosia** — richesse fermée. Chez Map-6 : [Ambrosia Island](/fr/locations/ambrosia-island).
- **Mount Kalaga** — le nord en dénivelé, pas le marais plat.
${VC("Hub Vice City sur la carte GTA 6 Map-6", "Vice City est le métro. Ce n’est pas tout l’État de Leonida.")}

**Ocean Drive** est de la géographie trailer — une bande de nuit reconnaissable — pas la promesse que chaque néon d’hôtel est canon. On pin l’énergie. On n’étiquette pas un Hyatt.

## Ce que « nommé » veut dire ici

Un hub nommé a une [page lieu](/fr/locations) et une région sur la [carte interactive](/fr/map). Un marais sans nom d’un dump 2022 n’en a pas. Les reconstructions communautaires (y compris Cities: Skylines) servent d’**arguments d’échelle**. Pas de fiche technique. Rockstar n’a pas imprimé de km². Le [guide carte](/fr/guides/gta-6-map-guide) garde les maths dans une boîte « maths ».

Si un TikTok tire une limite de comté à travers Grassrivers, on ne la copie pas. Si le Trailer 2 montre une crête fermée à un timecode scrubable, on ajoute une note, pas une frontière.

| Hub | Ton officiel | Habitude Map-6 |
|---|---|---|
| Vice City | Métro néon | Pins les plus denses |
| Leonida Keys | Fuite / eau | Lectures de ponts |
| Grassrivers | Zone humide | Faune, route rare |
| Port Gellhorn | Port de travail | Grues, pas clubs |
| Ambrosia | Richesse | Fermé, traitement île |
| Mount Kalaga | Nord sauvage | Dénivelé, pas plage |

On écrit ça en octobre parce que les cartes issues de fuites vont re-spiker à l’approche du préchargement. Notre boulot cette semaine-là sera le même : **montrer les six noms, montrer les bandes trailer, cacher le build volé.** La politique fuites plus longue est un autre article. Celle-ci est la carte touriste.

Les éditions n’ajoutent pas de septième hub. L’Ultimate n’ouvre pas Mount Kalaga. Le poster à 400 $ non plus — c’est du papier. Quand Rockstar nommera un septième, on en ajoutera un septième.
${KEYS("Leonida Keys sur la carte GTA 6 Map-6", "Les Keys sont le contraste officiel du métro — de l’eau, pas un comté fuité.")}
`,
    cluster: "map",
    primaryKeyword: "carte gta 6",
    secondaryKeywords: ["leonida", "carte vice city", "lieux gta 6"],
    sources: [ROCKSTAR_VI, {
      url: "https://www.rockstargames.com/VI",
      title: "Rockstar — destinations et médias VI",
    }],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: [
      "vice-city",
      "leonida-keys",
      "grassrivers",
      "port-gellhorn",
      "ambrosia-island",
      "mount-kalaga",
    ],
    relatedGuideSlugs: ["gta-6-map-guide", "leonida-lore-overview"],
    eventKey: "story-leonida-hubs",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Combien de villes dans GTA 6 ?",
        answer:
          "Rockstar vend un État, Leonida, et nomme Vice City comme métro plus cinq autres destinations. Pas de décompte officiel de villes.",
      },
      {
        question: "Ocean Drive est-il une région à part ?",
        answer:
          "C’est une bande trailer dans l’énergie Vice City, pas un septième hub nommé sur les affiches.",
      },
      {
        question: "Utilisez-vous les cartes issues de fuites ?",
        answer:
          "Non. Un pin que nous ne pouvons pas revérifier sur une image officielle reste hors de la carte publique.",
      },
    ],
    notes: "Desk FR — hubs.",
  }),

  desk({
    id: "desk-2026-10-leaks-fr",
    slug: "gta-6-why-we-ignore-leak-maps",
    locale: "fr",
    title: "Pourquoi Map-6 refuse les cartes de fuites",
    description:
      "Le dump 2022 a existé. Map-6 n’hébergera pas une carte issue de fuites. Ce qu’on garde, ce qu’on jette, et pourquoi c’est le produit.",
    bodyMarkdown: `En septembre 2022, beaucoup de *Grand Theft Auto VI* inachevé a quitté Rockstar sans permission. Internet a nommé l’acteur, bâti des wikis, tracé des cartes depuis un build volé. Ces fichiers sont encore dehors. **Ils ne sont pas sur Map-6.**

Ce n’est pas un concours de pureté. C’est un choix de produit. Une carte défendable devant un reviewer AdSense et une citation est une carte qu’on peut **revérifier sur des plans officiels**. Une carte calquée sur du footage teapotuberhacker est une dette avec de plus jolies couleurs. On a déjà une chronologie datée. Cette page est la politique en octobre, à six semaines, quand le dump va re-spiker.
${VC("Vice City sur la carte GTA 6 Map-6", "Si on ne peut pas le mettre en pause sur un upload Rockstar, ce n’est pas un pin public.")}

## Ce que nous utilisons

Trailer 1, Trailer 2, An Extended Look (27 août 2026), captures officielles, Newswire, la page VI. Les noms que Rockstar a imprimés : Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga, Lucia Caminos, Jason Duval. Les phrases Take-Two qui sont sur l’IR ou dans un entretien nommé.

Les timecodes que nous publions sont **notre scrub**, étiquetés approximatifs, contre des encodes YouTube qui bougent. C’est encore plus haut qu’un pin Discord.

## Ce que nous n’utilisons pas

La géographie du build volé, les noms d’intérieurs, les titres de missions, les annuaires de shops, les bios qui n’existent que dans le dump. Une « taille fuitée » vendue en km². Les faux Newswire et les stills IA. Toute reconstruction vers laquelle on ne peut pas pointer une seconde officielle.

Les atlas façon GTABase existent. Ce n’est pas un concurrent qu’on copie. C’est une catégorie qu’on a laissée exprès. Si vous voulez ça, vous savez où c’est. Si vous voulez quelque chose à montrer à un juriste et à un reviewer, vous êtes sur la [carte interactive](/fr/map).

Des morceaux d’un build volé rimeront avec un trailer plus tard. Ça ne fait pas du reste du build une source. Journalisme de base, plus le droit d’auteur. La [chrono des fuites](/fr/news/gta-6-leaks-timeline-verified) est l’étiquette de musée. Cette page est le cordon.

Quand un leaker posterera « la vraie colonne vertébrale » en octobre, on ouvrira les images officielles et on décidera si une couture **nommée** a bougé. On n’importera pas un GeoJSON. On n’offrira pas un toggle. On ne fera pas « juste cette fois » parce que la semaine du préchargement est bonne pour le trafic.

Ceux qui veulent de la rumeur ont des onglets. Ceux qui veulent des [lieux](/fr/locations) tenables ont un atlas. Le [guide carte](/fr/guides/gta-6-map-guide) enseigne le second groupe. On écrit pour eux.
${KEYS("Leonida Keys sur la carte GTA 6 Map-6", "Les ponts qu’on peut scrubber restent. Les limites de comté de 2022 restent dehors.")}
`,
    cluster: "map",
    primaryKeyword: "fuites gta 6",
    secondaryKeywords: ["carte fuitée gta 6", "teapotuberhacker", "carte gta 6"],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.rockstargames.com/newswire",
        title: "Rockstar Newswire — publications officielles uniquement",
      },
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "leonida-keys"],
    relatedGuideSlugs: ["gta-6-map-guide"],
    eventKey: "story-leaks-policy",
    funnelKind: "map_deep_link",
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Map-6 utilise-t-il la fuite GTA 6 de 2022 ?",
        answer:
          "Non. On peut mentionner que la fuite a eu lieu, avec des dates. On ne pinne pas la géographie d’un build volé.",
      },
      {
        question: "Pourquoi d’autres cartes ont-elles plus de pins ?",
        answer:
          "Elles calquent des fichiers inachevés. Nous ne publions que ce que nous pouvons revérifier sur des médias officiels. Moins de pins, c’est le point.",
      },
      {
        question: "Ajouterez-vous des pins de fuite après le lancement ?",
        answer:
          "Après le lancement, la source de vérité est le jeu livré, pas un dump 2022. On cartographiera ce où un joueur peut se tenir.",
      },
    ],
    notes: "Desk FR — politique fuites.",
  }),

  desk({
    id: "desk-2026-10-extended-fr",
    slug: "gta-6-extended-look-what-still-unknown",
    locale: "fr",
    title: "Extended Look GTA 6 : ce qui reste vierge",
    description:
      "L’Extended Look du 27 août a montré le duo, six étoiles et le mode de vie. Six semaines plus tard : ce que ce footage n’a toujours pas tranché.",
    bodyMarkdown: `Le **27 août 2026**, Rockstar a diffusé **An Extended Look** : Netflix à 15 h ET, puis YouTube et la page VI environ six heures plus tard. C’était du footage PlayStation 5 in-game, pas un stream merch. Ça reste le dernier long regard officiel sur les systèmes. Six semaines plus tard, on le traite encore comme un document de design complet. C’est un **échantillon**.

Ce qu’il a vraiment montré, sans pile d’adjectifs :

- On joue **Lucia et Jason**. Le switch avait l’air quasi instantané en libre. Certaines missions verrouillent un point de vue. L’autre peut suivre en IA.
- L’échelle de recherche à **six étoiles** est de retour. Le HUD suit aussi ce que la police **sait** — apparence, armes, véhicule — pas seulement le volume.
- Des jauges de mode de vie façon San Andreas : nourriture, sport, sommeil changent le look du duo.
- Au menu du reel : eau, salles, clubs, PNJ plus denses. Un reel, pas une liste 100 %.
${OD("Ocean Drive sur la carte GTA 6 Map-6", "L’Extended Look a passé du temps sur la bande. Il n’a pas fini l’atlas.")}

Le [hub systèmes](/fr/news/gta-6-gameplay-systems-2026) et le [guide de visionnage](/fr/guides/gta-6-extended-look-how-to-watch) déplient ce qui a été diffusé. Cette page est l’espace négatif.

## Encore vierge après le look

| Sujet | État au 7 oct. 2026 |
|---|---|
| PC | Non annoncé |
| Sauvegardes / jeu croisés | Non annoncé |
| GTA Online dans VI le jour J | Non annoncé comme mode VI |
| Totaux de collectibles | Non imprimés |
| Liste complète d’activités | Échantillon seulement |
| Date d’un troisième trailer | Non postée |
| Taille d’install finale | Absente des docs que nous suivons |

Si un créateur vous dit que le look a « confirmé » une playlist hivernale ou un empire immobilier, il écrit de la fanfic sur une fenêtre Netflix. Rockstar a montré des **phrases de systèmes**, puis est revenu vendre Standard, Ultimate, une caisse à 400 $ et deux DualSense.

Revoyez l’upload officiel, pas un TikTok recadré. Mettez en pause la géographie ; ne posez un pin sur la [carte](/fr/map) que si la couture tient d’un encode à l’autre. Lisez les [lieux](/fr/locations) pour les hubs nommés. Ne construisez pas un build perso autour d’une jauge dont on n’a pas vu les notes de patch.

Le look n’a **pas** changé les éditions. Pas besoin d’Ultimate pour switcher. Pas besoin de la Collection pour voir une course à six étoiles. Le hardware compte plus qu’un pad peint — [guide setup](/fr/guides/best-setup-gta-6-ps5-xbox) si votre TV est à 60 Hz et que ça vous importe.

On écrira un nouveau texte systèmes quand Rockstar enverra un autre long look ou un Newswire qui ajoute une phrase. D’ici là, recoller le footage d’août avec une date d’octobre, c’est comme ça que le calendrier factory est devenu laid. Un URL « ce qui reste vierge » est le refresh honnête.
${VC("Vice City sur la carte GTA 6 Map-6", "Le look a vendu une ville qui réagit. Pas une liste de POI finie.")}
`,
    cluster: "trailer",
    primaryKeyword: "extended look gta 6",
    secondaryKeywords: ["gameplay gta 6", "système wanted gta 6", "lucia jason"],
    sources: [
      ROCKSTAR_VI,
      {
        url: "https://www.netflix.com/tudum",
        title: "Netflix Tudum — fenêtre An Extended Look",
      },
      TTWO_Q1,
    ],
    publishedAt: NOW,
    createdAt: NOW,
    relatedLocationSlugs: ["vice-city", "ocean-drive"],
    relatedGuideSlugs: [
      "gta-6-extended-look-how-to-watch",
      "gta-6-map-guide",
    ],
    eventKey: "story-extended-look-blanks",
    funnelKind: "mixed",
    affiliateIntents: ["console_upgrade"],
    mapCtaPath: "/map",
    faqs: [
      {
        question: "Quand a eu lieu An Extended Look GTA 6 ?",
        answer:
          "Le 27 août 2026. Netflix d’abord à 15 h ET, puis YouTube et rockstargames.com/VI.",
      },
      {
        question: "L’Extended Look a-t-il confirmé une date PC ?",
        answer:
          "Non. C’était du footage PlayStation 5. Le PC reste non annoncé.",
      },
      {
        question: "Le wanted à six étoiles est-il confirmé ?",
        answer:
          "Il apparaît dans le footage officiel, avec un HUD qui tracke le savoir police. Le réglage exact n’est pas dans un doc public.",
      },
    ],
    notes: "Desk FR — Extended Look, blancs.",
  }),
];
