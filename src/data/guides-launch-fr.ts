import type { LocalizedGuide } from "./guides-i18n";

/** Version française des trois guides de la fenêtre de lancement. */
export const LAUNCH_GUIDES_FR: Record<string, LocalizedGuide> = {
  "gta-6-release-time": {
    title: "Heure de sortie de GTA 6 — à quelle heure dans votre fuseau",
    description:
      "GTA 6 sort le 19 novembre 2026 sur PS5 et Xbox Series X|S. Ce que Rockstar a réellement publié sur le déverrouillage, ce que minuit local veut dire chez vous, et comment être prêt.",
    readTime: 9,
    answer:
      "Grand Theft Auto VI sort le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S. Rockstar n'a pas publié d'heure de déverrouillage, mais chaque étape datée de ce lancement — ouverture des précommandes le 25 juin et préchargement le 12 novembre — s'est faite à minuit heure locale. Tablez donc sur 00h00 le 19 novembre chez vous plutôt que sur un moment mondial unique.",
    comparison: {
      caption:
        "Si le déverrouillage suit le schéma « minuit local » retenu pour les précommandes et le préchargement, voici quand commence le 19 novembre 2026 chez vous. Les décalages UTC sont ceux en vigueur cette semaine-là, une fois les changements d'heure européen et nord-américain passés.",
      headers: ["Où vous êtes", "Déverrouillage local", "Même instant en UTC"],
      rows: [
        ["Auckland (NZDT, UTC+13)", "jeu. 19 nov., 00h00", "mer. 18 nov., 11h00"],
        ["Sydney (AEDT, UTC+11)", "jeu. 19 nov., 00h00", "mer. 18 nov., 13h00"],
        ["Tokyo / Séoul (UTC+9)", "jeu. 19 nov., 00h00", "mer. 18 nov., 15h00"],
        ["Dubaï (UTC+4)", "jeu. 19 nov., 00h00", "mer. 18 nov., 20h00"],
        ["Paris / Bruxelles / Genève (CET, UTC+1)", "jeu. 19 nov., 00h00", "mer. 18 nov., 23h00"],
        ["Londres / Lisbonne (GMT, UTC+0)", "jeu. 19 nov., 00h00", "jeu. 19 nov., 00h00"],
        ["Montréal / New York (EST, UTC−5)", "jeu. 19 nov., 00h00", "jeu. 19 nov., 05h00"],
        ["Chicago (CST, UTC−6)", "jeu. 19 nov., 00h00", "jeu. 19 nov., 06h00"],
        ["Los Angeles / Vancouver (PST, UTC−8)", "jeu. 19 nov., 00h00", "jeu. 19 nov., 08h00"],
      ],
    },
    content: [
      "Grand Theft Auto VI sort le jeudi 19 novembre 2026, sur PlayStation 5 et Xbox Series X|S. Cette date vient de Rockstar et Take-Two la répète depuis des mois. L'heure, elle, n'a jamais été publiée — et c'est précisément la raison d'être de cette page : la question la plus posée de la semaine de lancement n'a pas encore de réponse officielle, seulement un schéma très net.",
      "Ce schéma, le voici. Les précommandes ont ouvert le 25 juin 2026 à minuit, heure locale. Le préchargement démarre le 12 novembre 2026, également à minuit local. Deux fois de suite, Rockstar a déroulé ce lancement à l'horloge de chacun plutôt qu'à un instant mondial unique. Si la troisième étape suit les deux premières, GTA 6 devient jouable à 00h00 le 19 novembre là où vous vous trouvez — ce qui fait jouer la Nouvelle-Zélande près d'une journée avant la côte ouest américaine.",
      "L'autre possibilité, que certains éditeurs préfèrent, est un déverrouillage mondial simultané calé sur un seul fuseau. Ça existe, et Rockstar pourrait le faire. Mais rien dans le calendrier publié ne va dans ce sens, et aucun compte à rebours mondial n'a été annoncé. Tant qu'un Newswire ne dit pas le contraire, traitez minuit local comme hypothèse de travail et le tableau ci-dessus comme une conversion arithmétique, pas comme une déclaration de Rockstar.",
      "Ce que ça change concrètement en France : le jeu se déverrouille dans la nuit de mercredi à jeudi, et les premiers streams viendront d'Océanie et d'Asie plusieurs heures avant votre propre minuit. Si vous tenez à découvrir le jeu sans rien vous faire spoiler, la fenêtre entre 13h00 le 18 novembre, heure de Paris, et votre minuit est la zone à risque. Organisez-vous pour ça plutôt que pour une rumeur annonçant une heure pratique pour l'Europe.",
      "Être prêt à minuit est un problème distinct de savoir quand tombe minuit, et c'est le seul que vous pouvez régler dès maintenant. Le préchargement du 12 novembre est tout l'intérêt des sept jours que Rockstar a laissés : le téléchargement se termine bien avant l'ouverture, et à 00h00 vous déchiffrez au lieu de télécharger. Notre guide du préchargement détaille la marche à suivre sur les deux consoles, et le guide de l'espace disque explique combien libérer avant que la file ne démarre.",
      "Les acheteurs de la version boîte ont une étape de plus, et elle mérite d'être lue deux fois. L'édition Standard physique est un code dans un boîtier, pas un disque. Les codes sont utilisables dès le 12 novembre justement pour que les acheteurs physiques puissent précharger comme les autres. Si votre exemplaire arrive par la poste plutôt qu'en magasin, une livraison qui glisse après le 19 novembre vous fait déverrouiller en retard quelle que soit l'heure officielle — c'est le meilleur argument en faveur du numérique si jouer à minuit compte pour vous.",
      "L'autre panne évitable, c'est le compte. Ce qui lâche à minuit, ce n'est jamais le jeu : ce sont les écrans de paiement et de validation du store, saturés au même moment par le monde entier. Vérifiez l'adresse e-mail et le mot de passe du compte PlayStation Network ou Xbox sur lequel vous allez réellement jouer, assurez-vous que les codes de double authentification arrivent sur un téléphone que vous aurez en main, et contrôlez que le moyen de paiement enregistré en juin n'a pas expiré depuis.",
      "Si vous comptez veiller, décidez à l'avance de ce que vous ferez de la première heure. La plupart des joueurs la passent dans la séquence d'ouverture ; les chasseurs de carte la passent à confirmer la géographie. Map-6 est fait pour les seconds : ouvrez la carte en plein écran, filtrez sur les landmarks, et comparez le premier trajet aux régions que les trailers ont déjà montrées — Vice City, les Leonida Keys, les Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga. Les coordonnées du HUD partent directement dans vos notes.",
      "Un mot sur ce qui n'arrivera pas le 19 novembre. Aucune version PC n'est annoncée, il n'existe donc aucune heure de déverrouillage PC à chercher. La sauvegarde croisée entre PlayStation et Xbox n'a pas été annoncée non plus. Et aucune liste officielle de collectibles n'a été publiée, ce qui signifie que toute « carte complète des collectibles » qui circule avant la sortie est une supposition. Map-6 remplira ces couches après le lancement, à partir de trouvailles vérifiées en jeu.",
      "Cette page sera révisée dès que Rockstar publiera une heure. Si un billet Newswire, un compte à rebours du PlayStation Store ou une fiche Xbox annonce un horaire précis, le tableau ci-dessus est remplacé par ce chiffre et l'hypothèse disparaît. En attendant, vous avez la date publiée, le schéma des deux étapes précédentes, et de quoi le convertir dans votre fuseau.",
    ],
    faq: [
      {
        question: "À quelle heure sort GTA 6 ?",
        answer:
          "Rockstar n'a pas publié d'heure. Les précommandes du 25 juin 2026 et le préchargement du 12 novembre 2026 ont tous deux ouvert à minuit heure locale : le scénario le plus probable est donc 00h00 locale le 19 novembre 2026. Rien n'est confirmé, et cette page sera mise à jour si Rockstar annonce un horaire.",
      },
      {
        question: "Tout le monde aura-t-il GTA 6 au même moment dans le monde ?",
        answer:
          "Probablement pas. Un déploiement à minuit local fait déverrouiller la Nouvelle-Zélande environ 21 heures avant la côte ouest américaine. Un déverrouillage mondial unique reste possible mais n'a pas été annoncé et romprait le schéma suivi jusqu'ici.",
      },
      {
        question: "Puis-je jouer dès minuit avec la version boîte ?",
        answer:
          "Seulement si le boîtier est déjà chez vous. L'édition Standard physique contient un code de téléchargement et non un disque, et les codes fonctionnent dès le 12 novembre pour permettre le préchargement. Si la livraison glisse après le jour de sortie, vous déverrouillez à l'arrivée du colis.",
      },
    ],
  },
  "gta-6-preload": {
    title: "Préchargement de GTA 6 — le 12 novembre, pas à pas",
    description:
      "Le préchargement de GTA 6 ouvre le 12 novembre 2026, sept jours avant la sortie. Comment lancer le téléchargement sur PlayStation 5 et Xbox Series X|S, et ce que doivent faire les acheteurs en boîte.",
    readTime: 9,
    answer:
      "Le préchargement de GTA 6 démarre le 12 novembre 2026 à minuit heure locale, sept jours avant la sortie du 19 novembre. Les acheteurs numériques retrouvent le téléchargement en file automatiquement sur PlayStation 5 et Xbox Series X|S ; les acheteurs en boîte doivent d'abord activer le code du boîtier, l'édition Standard physique livrant un code et non un disque.",
    content: [
      "Rockstar a fixé le préchargement de Grand Theft Auto VI au 12 novembre 2026, à minuit heure locale, soit une semaine pleine avant la sortie du 19 novembre. Cet écart est inhabituellement généreux et il est voulu : sept jours de marge, c'est l'assurance de ne pas regarder une barre de progression le soir du lancement. Si vous ne faites qu'une seule chose pour préparer la sortie, faites celle-là.",
      "Sur PlayStation 5, une précommande numérique se télécharge toute seule dès l'ouverture du préchargement, à condition que la console ait de la place et qu'elle soit allumée ou en veille avec les téléchargements automatiques activés. Vérifiez dans Paramètres, puis Système, puis Économie d'énergie, que la console garde sa connexion réseau en veille ; et dans Paramètres, puis Données sauvegardées et paramètres de jeu, que les téléchargements automatiques sont autorisés. Si rien n'apparaît le 12 novembre, ouvrez votre bibliothèque, trouvez la précommande et lancez le téléchargement à la main.",
      "Sur Xbox Series X|S, le mécanisme passe par le démarrage instantané et les mises à jour automatiques. Une copie numérique précommandée apparaît dans Mes jeux et applications, dans une section « Prêt à installer » ou « En file d'attente ». Si la console est réglée sur l'économie d'énergie plutôt que sur le démarrage instantané, elle ne se réveillera pas pour télécharger la nuit : changez le mode d'alimentation ou lancez le téléchargement manuellement le lendemain matin.",
      "Les acheteurs en boîte ont une étape supplémentaire, et c'est celle qui piège le plus de monde. L'édition Standard physique de GTA 6 est un code dans un boîtier, pas un disque. Rockstar a rendu ces codes utilisables dès le 12 novembre précisément pour que les acheteurs physiques puissent précharger en même temps que les autres — mais seulement une fois le boîtier entre vos mains et le code activé sur le store. Activez-le le jour où il arrive, pas le soir du lancement.",
      "Libérer de la place est à régler avant le 12 novembre, pas pendant. Rockstar n'a pas publié la taille d'installation de GTA 6 : il n'existe donc aucun chiffre officiel sur lequel se caler. Notre guide de l'espace disque explique comment se donner une marge raisonnable et comment faire de la place sur les deux consoles sans perdre de sauvegardes. La seule règle qui tient toujours : ne vous laissez pas quelques gigaoctets de marge, car le correctif du premier jour doit aussi se loger quelque part.",
      "Attendez-vous d'ailleurs à ce correctif. Les fichiers préchargés sont presque toujours un peu plus anciens que la version finale, et une mise à jour plus légère se télécharge le 19 novembre ou la veille. C'est pour cette raison qu'un jeu préchargé peut encore afficher une barre de progression le matin de la sortie — et c'est pourquoi terminer le gros téléchargement le 12 plutôt que le 18 compte davantage qu'il n'y paraît.",
      "Un jeu préchargé reste verrouillé jusqu'à l'heure d'ouverture. Vous le verrez installé, avec un minuteur ou un cadenas sur la tuile selon la console, et il refusera de se lancer. C'est normal, ce n'est pas un téléchargement raté. Notre guide de l'heure de sortie explique ce que sera probablement ce moment dans votre fuseau, puisque Rockstar a publié la date mais jamais l'heure.",
      "Si le téléchargement bloque, commencez par les gestes simples avant les grandes manœuvres : mettre la file en pause puis la reprendre, vérifier qu'aucun autre appareil du foyer ne sature la connexion, et contrôler que la console n'a pas manqué de place en cours de route. Reconstruire la base de données PlayStation ou vider le stockage persistant Xbox sont des derniers recours, pas des premiers réflexes, et ne servent normalement à rien dans une fenêtre de sept jours.",
      "Profitez plutôt de la semaine. La carte de Leonida est déjà explorable sur Map-6 : la visionneuse plein écran couvre Vice City, les Leonida Keys, les Grassrivers, Port Gellhorn, Ambrosia et Mount Kalaga, avec plus d'un millier de bâtiments rapprochés des adresses de Floride du Sud qui leur ont servi de modèle. Arriver le 19 novembre en sachant déjà comment l'État s'articule vaut mieux qu'un téléchargement plus rapide.",
      "Les dates de cette page viennent du calendrier publié par Rockstar : 12 novembre pour le préchargement, 19 novembre pour la sortie, codes utilisables dès le 12 novembre pour l'édition Standard en boîte. Les comportements de console décrits ici relèvent du fonctionnement standard des plateformes, pas d'une spécification de Rockstar. Si l'éditeur déplace la date de préchargement, cette page bouge avec elle.",
    ],
    faq: [
      {
        question: "Quand commence le préchargement de GTA 6 ?",
        answer:
          "Le 12 novembre 2026 à minuit heure locale, sept jours avant la sortie du 19 novembre. Le téléchargement se met en file automatiquement pour les précommandes numériques sur PlayStation 5 et Xbox Series X|S quand la console est réglée pour télécharger en veille ou en démarrage instantané.",
      },
      {
        question: "Peut-on précharger GTA 6 avec la version physique ?",
        answer:
          "Oui, une fois le code activé. L'édition Standard en boîte contient un code de téléchargement et non un disque, et Rockstar a rendu ces codes utilisables dès le 12 novembre pour que les acheteurs physiques préchargent en même temps que les autres.",
      },
      {
        question: "Pourquoi ma copie préchargée télécharge-t-elle encore le jour de la sortie ?",
        answer:
          "C'est presque certainement le correctif du premier jour. Les fichiers préchargés sont compilés plusieurs jours avant la sortie, une mise à jour plus légère arrive donc le jour J ou la veille. Elle est bien plus rapide que le téléchargement principal, ce qui ne retire rien à l'intérêt du préchargement.",
      },
    ],
  },
  "gta-6-file-size": {
    title: "Taille de GTA 6 — combien d'espace libérer avant la sortie",
    description:
      "Rockstar n'a pas publié la taille d'installation de GTA 6. Ce que ça implique, combien de place prévoir sur PS5 et Xbox Series X|S, et comment la libérer sans perdre ses sauvegardes.",
    readTime: 9,
    answer:
      "Rockstar n'a pas publié la taille d'installation de GTA 6 : aucun chiffre officiel n'existe. Le préchargement ouvre le 12 novembre 2026, c'est donc la date limite pour avoir la place prête. Libérer environ 150 Go sur PlayStation 5 ou Xbox Series X|S laisse de quoi accueillir l'installation, le correctif du premier jour et les captures sans rien supprimer à minuit.",
    comparison: {
      caption:
        "Tailles d'installation publiées pour des jeux en monde ouvert comparables, à titre de repère uniquement. Aucune n'est une prévision pour GTA 6, dont Rockstar n'a annoncé aucun chiffre.",
      headers: ["Jeu", "Plateforme", "Installation approximative"],
      rows: [
        ["Red Dead Redemption 2", "PS4 / Xbox One", "~150 Go"],
        ["Grand Theft Auto V (Expanded & Enhanced)", "PS5 / Xbox Series X|S", "~86 Go"],
        ["Call of Duty: Modern Warfare III", "PS5 / Xbox Series X|S", "~150 Go"],
        ["Grand Theft Auto VI", "PS5 / Xbox Series X|S", "Non annoncée"],
      ],
    },
    content: [
      "La réponse honnête d'abord : Rockstar n'a pas publié la taille de Grand Theft Auto VI. Aucun billet Newswire, aucune fiche de store, aucune diapositive de Take-Two n'a donné de taille d'installation. Tous les chiffres précis qui circulent en ce moment — et il y en a plusieurs, assénés avec beaucoup d'aplomb — sont des suppositions déguisées en fuites. Map-6 ne les publie pas, et c'est pourquoi cette page vous explique comment vous organiser plutôt que de vous donner un nombre inventé.",
      "Ce dont vous avez besoin, ce n'est de toute façon pas la taille exacte : c'est assez de marge pour ne plus jamais y penser. L'échéance est le 12 novembre 2026, date d'ouverture du préchargement, et non le 19 novembre. Une console qui tombe à court d'espace au milieu d'un préchargement transforme une fenêtre confortable de sept jours en course contre la montre le soir du lancement.",
      "Le tableau ci-dessus est un repère, pas une prédiction. Red Dead Redemption 2 pesait environ 150 Go, l'édition enrichie de GTA V tourne autour de 86 Go sur les consoles actuelles, et les gros jeux de tir dépassent régulièrement les 150 Go. GTA 6 est un jeu plus vaste et bien plus récent que tous ceux-là, ce qui donne la direction mais pas le chiffre. Viser 150 Go libres est raisonnable : assez généreux pour absorber une installation plus lourde que prévu, assez modeste pour ne pas vider votre bibliothèque.",
      "Ne calculez pas au gigaoctet près. L'installation n'est que la première ponction sur votre disque. Le correctif du premier jour doit se décompresser quelque part, et les mises à jour console réclament souvent de l'espace temporaire en plus de la taille finale. Les captures vidéo et les captures d'écran mangent le reste, et GTA est typiquement le jeu que les gens enregistrent. Un disque rempli à 99 % est un disque qui fait échouer une mise à jour au pire moment.",
      "Sur PlayStation 5, commencez par Paramètres, puis Stockage. La console affiche ce qui est installé et ce que chaque jeu vous coûte, et permet de supprimer des jeux sans toucher aux sauvegardes, qui vivent à part et se synchronisent dans le cloud avec un abonnement PlayStation Plus. Les jeux terminés peuvent aussi être déplacés sur un disque USB de stockage étendu plutôt que supprimés : un jeu PS5 rangé là doit être ramené sur le SSD pour se lancer, mais c'est plus rapide que de retélécharger cent gigaoctets.",
      "Sur Xbox Series X|S, l'équivalent se trouve dans Paramètres, puis Système, puis Périphériques de stockage. Le même découpage s'applique : les sauvegardes sont liées à votre compte et au cloud, pas à la console. Xbox est plus souple sur les disques externes, un disque USB pouvant conserver indéfiniment des jeux Series X|S même s'ils doivent être recopiés sur le SSD interne pour tourner. Dans les deux cas, faites ces déplacements maintenant et non pendant le préchargement.",
      "Si vous envisagez une extension plutôt qu'un grand ménage, les deux consoles le permettent. La PlayStation 5 accepte un SSD NVMe interne répondant aux exigences de débit de Sony, et la Xbox Series X|S utilise une carte d'extension officielle qui se comporte exactement comme le stockage interne. Rien de tout cela n'est indispensable pour un seul jeu, mais si votre disque est saturé depuis un an, c'est le moment évident. Notre guide de configuration détaille les options qui valent leur prix.",
      "Les acheteurs en boîte n'échappent à rien de tout ça. L'édition Standard physique de GTA 6 est un code de téléchargement et non un disque : l'installation complète atterrit sur votre disque exactement comme pour une copie numérique. Dans cette sortie, aucune version ne vous économise de la place.",
      "Un mot sur les chiffres que vous allez voir passer ce mois-ci. Les tailles d'installation apparaissent bien sur les fiches de store peu avant la sortie, souvent quelques jours à l'avance, et elles changent parfois entre le préchargement et le lancement. Quand une taille s'affichera sur le PlayStation Store ou le Microsoft Store, ce sera un vrai chiffre et cette page le reprendra en citant sa source. D'ici là, tout ce qui est précis relève de la spéculation, y compris les nombres repris par des sites qui devraient le savoir.",
      "Pendant que le disque se vide, la carte, elle, ne prend aucune place. Map-6 tourne dans un navigateur : la visionneuse plein écran couvre Leonida de bout en bout, avec plus d'un millier de bâtiments rapprochés des adresses réelles de Floride du Sud dont ils s'inspirent, et le guide du préchargement détaille les étapes du 12 novembre.",
    ],
    faq: [
      {
        question: "Combien de Go fait GTA 6 ?",
        answer:
          "Rockstar n'a annoncé aucune taille d'installation et aucun chiffre officiel n'existe. Les fiches de store publient normalement une taille peu avant la sortie. En attendant, libérer environ 150 Go sur PlayStation 5 ou Xbox Series X|S est une marge raisonnable qui couvre l'installation, le correctif du premier jour et les captures.",
      },
      {
        question: "Pour quand faut-il avoir libéré la place ?",
        answer:
          "Pour le 12 novembre 2026, date d'ouverture du préchargement, et non pour le 19 novembre. Manquer d'espace en plein préchargement gâche les sept jours de marge que Rockstar a laissés entre les deux dates.",
      },
      {
        question: "La version physique prend-elle moins de place ?",
        answer:
          "Non. L'édition Standard en boîte de GTA 6 contient un code de téléchargement et non un disque : le jeu s'installe intégralement sur votre disque, exactement comme pour un achat numérique.",
      },
    ],
  },
};
