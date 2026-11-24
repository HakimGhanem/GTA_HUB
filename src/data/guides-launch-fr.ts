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
    title: "Taille de GTA 6 — 212 Go sur PS5, et chaque patch depuis la sortie",
    description:
      "GTA 6 demande jusqu'à 212 Go sur PS5 et environ 212 Go sur Xbox Series X|S. Chaque mise à jour depuis la sortie avec sa taille, la mise à jour système PS5 obligatoire, et la place à garder libre.",
    readTime: 6,
    answer:
      "GTA 6 occupe jusqu'à 212 Go sur PlayStation 5, selon la note de stockage de Rockstar, et environ 211,9 Go sur Xbox Series X|S une fois les mises à jour de lancement installées. Trois mises à jour sont sorties (1.002.000, 1.002.001 et 1.002.002), pour environ 2,3 Go sur PS5 et 5,4 Go sur Xbox. Sur PS5, le logiciel système 26.07-14.23.00 (environ 1,27 Go) est aussi obligatoire. Gardez environ 240 Go libres pour que le prochain patch puisse s'installer.",
    comparison: {
      caption:
        "Mises à jour de GTA 6 selon PlayStation Game Size, KeenGamer, Forbes, Pure Xbox et Tbreak. Rockstar n'a publié aucune note de patch. Tailles approximatives, variables selon la région.",
      headers: ["Mise à jour", "Sortie", "PS5", "Xbox Series X|S"],
      rows: [
        ["1.002.000", "13 nov. 2026", "~1,07 Go", "~2,18 Go"],
        ["1.002.001", "16 nov. 2026", "~602,5 Mo", "~1,59 Go"],
        ["1.002.002", "23 nov. 2026", "~603 Mo", "~1,6 Go"],
        ["Installation", "19 nov. 2026", "jusqu'à 212 Go", "~211,9 Go"],
      ],
    },
    content: [
      "GTA 6 est sorti : cette page n'a plus besoin de deviner. La note de stockage de Rockstar, citée par VICE le soir du lancement, indique que la version PlayStation 5 peut demander jusqu'à 212 Go selon la console. Sur Xbox Series X|S, l'installation pèse environ 211,9 Go après la deuxième mise à jour de lancement. Chaque chiffre de cette page cite sa source ; Map-6 n'a pas mesuré d'installation lui-même.",
      "Le jeu est sorti en version 1.002.001. Deux mises à jour obligatoires sont arrivées avant le lancement : 1.002.000 le 13 novembre (environ 1,07 Go sur PS5, 2,18 Go sur Xbox) et 1.002.001 le 16 novembre (environ 602,5 Mo sur PS5, 1,59 Go sur Xbox, où elle s'affiche 1.0.2.1). Si vous avez préchargé avec les mises à jour automatiques, vous avez déjà les deux. VICE parle de « patch day one » ; Rockstar n'a jamais employé ce terme.",
      "La première mise à jour après la sortie, 1.002.002, est déployée depuis le 23 novembre : environ 603 Mo sur PS5 et 1,6 Go sur Xbox, selon PlayStation Game Size relayé par Tbreak. Sur PS5, elle arrive par vagues sur plusieurs heures : ne pas la voir tout de suite est normal. Rockstar n'a publié aucune note de patch, ni pour celle-ci ni pour les deux précédentes ; toute liste de correctifs lue ailleurs est rapportée, pas officielle.",
      "Sur PS5, un téléchargement de plus est nécessaire avant de lancer le jeu : le logiciel système 26.07-14.23.00, environ 1,27 Go, sorti le 17 novembre. PlayStation Support a indiqué que GTA 6 l'exige, et Rockstar a relayé l'avertissement. Si le jeu refuse de démarrer sur PS5, mettez d'abord la console à jour.",
      "Combien garder de libre : installation et mises à jour font environ 214 Go sur PS5 et 217 Go sur Xbox. Une console applique un patch en écrivant les nouveaux fichiers à côté des anciens ; il lui faut donc une marge au-delà de la taille du patch. Garder environ 240 Go libres couvre la prochaine mise à jour sans erreur de stockage en plein téléchargement.",
      "Libérer de la place sans perdre ses sauvegardes. Sur PlayStation 5, allez dans Paramètres, puis Stockage : supprimer un jeu ne supprime jamais sa sauvegarde, et PlayStation Plus la synchronise dans le cloud. Les jeux PS5 terminés peuvent aller sur un disque USB de stockage étendu au lieu d'être supprimés. Sur Xbox Series X|S, allez dans Paramètres, Système, Périphériques de stockage ; les sauvegardes suivent votre compte. Un disque USB peut stocker des jeux Series X|S, mais il faut les recopier sur le SSD interne ou une carte d'extension pour y jouer.",
      "L'édition physique contient un code de téléchargement, pas un disque : elle demande exactement la même place que la version numérique. Si votre disque est toujours plein, un SSD NVMe pour PS5 ou une carte d'extension officielle pour Xbox Series X|S est la solution durable ; notre guide de configuration détaille les modèles qui valent leur prix.",
      "Le temps de téléchargement dépend de votre connexion, pas de la console. À 100 Mb/s, 212 Go prennent environ quatre heures et demie ; les mises à jour ajoutent quelques minutes. Pendant l'installation, la carte ne prend aucune place : Map-6 tourne dans un navigateur, sur téléphone ou second écran, avec plus de 1 900 bâtiments de Leonida rapprochés des adresses réelles de Floride du Sud dont ils s'inspirent.",
    ],
    faq: [
      {
        question: "Combien de Go fait GTA 6 ?",
        answer:
          "Jusqu'à 212 Go sur PlayStation 5, selon la note de stockage de Rockstar, et environ 211,9 Go sur Xbox Series X|S après les mises à jour de lancement. Les trois mises à jour sorties ajoutent environ 2,3 Go sur PS5 et 5,4 Go sur Xbox.",
      },
      {
        question: "Quelle est la dernière mise à jour de GTA 6 ?",
        answer:
          "La version 1.002.002, déployée depuis le 23 novembre 2026 : environ 603 Mo sur PS5 et 1,6 Go sur Xbox Series X|S. Rockstar n'a pas publié de note de patch.",
      },
      {
        question: "Pourquoi GTA 6 ne se lance pas sur ma PS5 ?",
        answer:
          "Vérifiez d'abord le logiciel système. PlayStation Support indique que GTA 6 exige la version 26.07-14.23.00 (environ 1,27 Go, sortie le 17 novembre 2026). Cherchez ensuite une mise à jour du jeu via le bouton Options sur la tuile GTA 6.",
      },
      {
        question: "L'édition physique prend-elle moins de place ?",
        answer:
          "Non. La boîte contient un code de téléchargement, pas un disque : les 212 Go s'installent sur votre console exactement comme pour une copie numérique.",
      },
    ],
  },
  "gta-6-reviews": {
    title: "Tests de GTA 6 — date d'embargo et notes de la presse",
    description:
      "Aucune date d'embargo ni d'envoi des codes presse n'est annoncée pour GTA 6, et aucune note n'existe encore. Ce qui est confirmé, ce qu'a fait Rockstar pour GTA V et RDR2, et quand cette page bouge.",
    readTime: 6,
    answer:
      "Il n'existe encore aucun test de GTA 6. Rockstar n'a annoncé ni date d'embargo ni envoi des codes à la presse : aucune note Metacritic ou OpenCritic n'existe. Pour GTA V et Red Dead Redemption 2, les tests étaient tombés la veille de la sortie.",
    comparison: {
      caption:
        "Date de publication des tests pour les deux derniers jeux Rockstar. Simple précédent : Rockstar n'a rien annoncé pour GTA 6.",
      headers: ["Jeu", "Tests publiés", "Sortie", "Metacritic"],
      rows: [
        ["Grand Theft Auto V", "16 septembre 2013", "17 septembre 2013", "97 (PS3)"],
        ["Red Dead Redemption 2", "25 octobre 2018", "26 octobre 2018", "97 (PS4)"],
        ["Grand Theft Auto VI", "Non annoncée", "19 novembre 2026", "Pas encore de note"],
      ],
    },
    content: [
      "Point au 26 octobre 2026 : aucun média n'a publié de test de Grand Theft Auto VI, tout simplement parce que personne hors de Rockstar n'en a le droit. Le studio n'a annoncé aucun embargo, n'a pas dit quand la presse recevra ses codes, et les pages Metacritic et OpenCritic n'affichent aucune note. Tout « premier verdict » qui circule est une supposition ou un faux.",
      "Ce qui est confirmé entoure la fenêtre des tests sans la fixer. Le jeu sort le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S, et le préchargement numérique ouvre le 12 novembre. Pour un jeu de cette taille, les tests tombent presque toujours avant la sortie : il reste donc environ trois semaines.",
      "Le seul repère utile, c'est l'historique de Rockstar. Les tests de Grand Theft Auto V sont parus le 16 septembre 2013, la veille de la sortie. Red Dead Redemption 2 a suivi le même schéma en 2018 : tests le 25 octobre, sortie le 26. Les deux ont obtenu 97 sur Metacritic. C'est un précédent, pas un engagement : un jeu plus gros et un préchargement une semaine avant peuvent décaler la fenêtre dans un sens comme dans l'autre.",
      "Les rumeurs de la semaine se rangent en deux familles. Des comptes d'initiés affirment que les codes presse partiront bientôt, et une partie des fans attend une annonce le jeudi 29 octobre, parce que Rockstar publie quelque chose sur GTA 6 chaque jeudi depuis l'Extended Look d'août. Rockstar n'a rien annoncé pour cette date. Considérez les deux comme non confirmées tant que le Newswire ou un média testeur ne l'écrit pas.",
      "Les fausses notes circulent surtout dans les jours qui précèdent un embargo. Une capture de page Metacritic avec un chiffre, un « test qui a fuité » sur un forum ou une note attribuée à un magazine qui n'a rien publié ne sont pas des tests. Un vrai test paraît sur le site du média, signé, au même moment que des dizaines d'autres.",
      "Ce que les tests trancheront, et ce qu'ils ne changeront pas : ils diront si l'histoire, l'alternance entre Lucia et Jason et le monde ouvert tiennent leurs promesses. Ils ne changeront ni le prix, ni les éditions, ni les plateformes, et ils arriveront trop tard pour peser sur le pack Vintage Vice City, qui demande seulement d'acheter avant le 20 novembre. Attendre les notes avant de précommander ne vous fait rien perdre.",
      "Dès qu'une date d'embargo sera annoncée, elle s'affichera en tête de cette page avec sa source. Quand les tests tomberont, la page donnera les moyennes et les liens vers les principaux médias. D'ici là, le guide de la date de sortie couvre le calendrier et celui sur la taille du jeu explique quoi préparer sur votre console.",
    ],
    faq: [
      {
        question: "Quand sortent les tests de GTA 6 ?",
        answer:
          "Rockstar n'a annoncé aucune date d'embargo. Pour GTA V et Red Dead Redemption 2, les tests étaient parus la veille de la sortie ; GTA 6 sort le 19 novembre 2026.",
      },
      {
        question: "La presse a-t-elle reçu ses codes de GTA 6 ?",
        answer:
          "Rien de ce qu'ont publié Rockstar ou les médias testeurs ne l'indique. Les annonces d'un envoi imminent viennent de comptes d'initiés et ne sont pas confirmées.",
      },
      {
        question: "Quelle est la note Metacritic de GTA 6 ?",
        answer:
          "Il n'y en a pas encore. Une note n'apparaît qu'à la levée de l'embargo, quand les médias publient ; tout chiffre partagé avant est faux.",
      },
    ],
  },
};
