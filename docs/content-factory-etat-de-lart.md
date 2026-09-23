# Content Factory — état de l'art (sept. 2026)

Implémentation : dossier `factory/` (briefs JSON, Remotion 9:16, QA, file de publication).
Voir `factory/README.md`.


Objectif : produire beaucoup de contenu vidéo/social autour de GTA 6 et de Map-6, à haute
cadence, sans se faire strike ni démonétiser, en réutilisant les compétences data engineering
(pipelines, orchestration, idempotence, observabilité) déjà appliquées à `scripts/content/`.

---

## 0. Le vrai facteur limitant n'est pas la technique

La partie « extraire une vidéo YouTube, la découper, la poster » est un problème résolu :
il existe des SaaS avec API et MCP, et des stacks open source complètes. Ce qui casse un
projet de content factory en 2026, ce sont trois murs non techniques :

1. **Les droits sur le footage GTA** (Rockstar / Take-Two).
2. **Les politiques d'originalité** (YouTube « inauthentic content », TikTok « Originality
   Policy », Instagram recommendation guidelines).
3. **Les autorisations d'API de publication** (audit TikTok, App Review Meta, audit YouTube).

Toute l'architecture doit être conçue autour de ces trois murs, pas autour de l'outil de clipping.

---

## 1. Droits sur le contenu GTA

### Rockstar / Take-Two
Politique officielle (support.rockstargames.com, « Policy on posting copyrighted Rockstar Games material ») :

- Usage **non commercial** toléré : « non-commercial » = tu ne vends pas l'accès au contenu et
  tu ne t'en sers pas pour promouvoir un produit ou service que tu vends.
- Interdits explicites, sous peine de takedown :
  - footage **pré-release / leaké** (y compris unboxing anticipé) ;
  - **spoilers** : fin du jeu, cutscenes isolées, montage de cutscenes, gros reveal scénaristique
    (les cutscenes sont OK dans un let's play narré) ;
  - **in-game entertainment isolé** : stations de radio, émissions TV, spectacles in-game.
- La politique ne s'applique **pas** à l'exploitation commerciale (film, TV, pub, édition).

⚠️ Zone grise majeure pour nous : Map-6 vend un abonnement PRO et pose des liens d'affiliation.
Une chaîne qui pousse vers Map-6 PRO est, littéralement, « material used to promote a product or
service ». En pratique Rockstar ne poursuit personne là-dessus, mais c'est le risque juridique
qu'on prend, et il faut le prendre en connaissance de cause.

### YouTube (monétisation du gameplay)
Doc « Video game and software content » : le footage de jeu est monétisable **seulement** si
l'éditeur t'accorde des droits commerciaux, ou si le commentaire pas-à-pas est étroitement lié à
l'action montrée et apporte une valeur pédagogique. « Simplement montrer quelqu'un jouer » n'est
pas monétisable. Autre piège : les **musiques sous licence** (radios GTA) n'appartiennent pas à
Rockstar → Content ID.

### Conséquence stratégique
Le contenu le plus défendable pour Map-6 n'est **pas** du reclipping de vidéos YouTube d'autrui,
c'est du contenu **généré depuis notre propre donnée** : carte, POIs, collectibles, itinéraires,
comparatifs de prix / deals affiliés, guides précommande. C'est original par construction,
ça ne dépend d'aucun droit tiers, et ça ramène du trafic vers le site.

---

## 2. Politiques d'originalité (le vrai « striker »)

### YouTube
Deux politiques distinctes, souvent confondues :

- **Reused content** : republier du contenu existant sans commentaire original significatif,
  modification substantielle, ou valeur éducative/divertissante. Autorisé si le spectateur voit
  une différence claire entre l'original et ta version (critique, réaction commentée, replay
  expliqué, dialogue réécrit, montage avec storyline).
- **Inauthentic content** (renommé en juillet 2025 depuis « repetitious content », clarifié le
  16 juillet 2026) : 3 catégories non monétisables —
  1. contenu **générique, répétitif ou basé sur template** (facile à produire en masse avec IA,
     CGI, templates, peu de variation d'une vidéo à l'autre) ;
  2. contenu dérangeant / off-putting ;
  3. **personas IA** discutant de sujets sensibles (santé, finance, droit).

  L'évaluation est **au niveau de la chaîne** (thème principal, vidéos les plus vues, vidéos les
  plus récentes, part du watch time, metadata, section À propos), pas vidéo par vidéo.
  Une chaîne trop chargée → exclusion du YPP.

Conclusion : les chaînes faceless et l'IA **ne sont pas interdites**. Le format template
industrialisé, oui. Il faut de la **variance éditoriale** dans le catalogue.

### TikTok
- **Originality Policy** : le contenu non original « may be removed from the For You feed,
  making it harder to discover ». Le contenu portant un watermark ou logo d'une autre plateforme
  est considéré comme non original.
- **Content Sharing Guidelines** (côté développeur) : « An app that copies arbitrary contents
  from other platforms to TikTok » = ❌ non acceptable. Les clients API ne doivent pas superposer
  de watermark / logo / lien promotionnel.

### Instagram
Recommendation guidelines : le contenu largement repurposé d'une autre source avec des
« immaterial edits » est **inéligible aux recommandations** (donc pas de reach explore/reels).

### Ce que ça implique concrètement
- Ne jamais poster un export contenant le watermark d'une autre plateforme (le classique
  « TikTok téléchargé → reposté sur Reels » est mort).
- **Un export propre par plateforme**, pas un fichier unique cross-posté.
- Le shadowban vient du contenu, pas du fait de poster via API (aucune plateforme ne documente
  une pénalité de reach pour publication API).

---

## 3. Publication automatisée : ce que chaque plateforme autorise

| Plateforme | API officielle | Approbation | Cap | Piège principal |
|---|---|---|---|---|
| YouTube | Data API v3 `videos.insert` | Audit pour uploads publics | 100 uploads/j, 10 000 unités/j | Tout upload d'un projet API non vérifié créé après le 28/07/2020 est **forcé en `private`** — pas rejeté, juste invisible |
| TikTok | Content Posting API (Direct Post) | **Audit obligatoire** | ~15 posts/j/créateur, **partagé entre tous les clients API** ; 5 pending shares/24h ; 6 req/min | Non audité = `SELF_ONLY` + compte devant être privé + 5 users/24h |
| Instagram | Graph API content publishing | App Review Meta | 50 containers/24h (doc Meta ; 100 souvent cité) | Compte **Business** lié à une Page FB obligatoire ; comptes perso = impossible |

### Détails qui coûtent des semaines si on les découvre tard

**TikTok audit** — cause n°1 de rejet : l'UX. Les guidelines exigent notamment que le
*Privacy Status* soit un dropdown alimenté par `privacy_level_options` (retourné par
`/v2/post/publish/creator_info/query/`) **sans valeur par défaut**, sélectionné manuellement par
l'utilisateur. Postiz s'est fait rejeter exactement là-dessus (issue #1563 du repo). Il faut aussi
gérer le consentement explicite, les interaction controls, la déclaration de contenu commercial,
et vérifier la propriété du domaine si on utilise `PULL_FROM_URL`. Pas de SLA publié ; en
pratique de quelques jours à plusieurs semaines.

**Meta App Review** — permissions `instagram_business_basic` + `instagram_business_content_publish`
(les anciens `instagram_basic` / `instagram_content_publish` sont dépréciés depuis le 27/01/2025).
Il faut un screencast par permission, privacy policy, ToS, vérification d'entreprise, environnement
de test accessible. Comptez 2 à 6 semaines, plusieurs allers-retours probables. Le rate limit suit
la formule Business Use Case (basée sur les impressions du compte) : un petit compte a une toute
petite allocation.

**Reels via API** : conteneur `POST /{ig-user-id}/media` avec `media_type=REELS` et `video_url`
public → polling `GET /{container-id}?fields=status_code` jusqu'à `FINISHED` →
`POST /{ig-user-id}/media_publish`. Éligibilité onglet Reels : 9:16, 5–90 s, H.264/HEVC.
Quota consultable via `GET /{ig-user-id}/content_publishing_limit`.

### Raccourci : déléguer l'audit
C'est l'argument massue des agrégateurs. Ils ont déjà passé les audits, on hérite de leur statut.

- **Ayrshare** — API-first, un seul `POST /post` vers 14+ réseaux (Bluesky, Facebook, GBP,
  Instagram, LinkedIn, Pinterest, Reddit, Snapchat, Telegram, Threads, TikTok, X, WhatsApp,
  YouTube), scheduling ISO-8601 UTC, auto-schedule, auto-repost, validation pré-publication,
  webhooks. Propriétaire, payant. **Le meilleur rapport temps/valeur pour démarrer.**
- **Postiz** — open source, 32 plateformes, API publique
  (`POST https://api.postiz.com/public/v1/posts`, ou `/api/public/v1/posts` en self-hosted),
  payload avec `type`, `date`, `posts[].integration.id`, `posts[].value[]`, et un
  `settings.__type` par provider. Self-hostable → mais alors c'est **toi** qui repasses l'audit
  TikTok avec ton UI, ce qui annule l'avantage.
- **Mixpost** — MIT, self-hosted, 12 plateformes, orienté dashboard Laravel. Même remarque.
- **Blotato** — SaaS orienté automatisation, bonne doc publique sur les politiques.

---

## 4. Extraction depuis YouTube

| Approche | Ce que ça donne | Risque |
|---|---|---|
| **YouTube Data API v3** | Métadonnées uniquement (`videos.list` avec `part=snippet,statistics`). **Aucun endpoint de téléchargement.** Captions réservées au propriétaire de la vidéo. Quota 10 000 unités/j, un `search` = 100 unités | Aucun. C'est la voie sanctionnée |
| **yt-dlp** | Téléchargement réel, transcripts, formats | Hors ToS YouTube, aucun SLA, rate limits par IP, casse régulièrement, infra à maintenir |
| **APIs tierces** (TikHub, etc.) | Lecture sans quota, transcripts de n'importe quelle vidéo publique, streams | Zone grise identique, mais externalisée ; coût par requête |

**Il n'existe aucune voie officielle pour télécharger une vidéo YouTube qu'on ne possède pas.**

→ Pour Map-6 : utiliser la Data API pour la **veille** (détection de sujets, ce que fait déjà
`detect-news.mts`), et produire notre propre footage plutôt que d'extraire celui des autres.
yt-dlp reste utile pour un usage interne (analyse de transcript pour trouver des angles éditoriaux),
pas pour alimenter un pipeline de republication.

---

## 5. Clipping / montage automatisé

### SaaS avec accès programmatique
| Outil | API | MCP natif | Prix d'entrée | Note |
|---|---|---|---|---|
| **Reap** | REST + CLI (`npm i -g reap`) + SDK Python/Node | ✅ `https://mcp.reap.video/mcp`, 10 tools | 9,99 $/mois | Le plus « agent-first ». API dès l'entrée de gamme. Captions 100+ langues, doublage 80+ langues, scheduling. Pattern submit → poll → retrieve, 10 req/min/clé |
| **Ssemble** | REST, API sur tous les plans | ✅ `mcp.ssemble.com`, 9 tools (`create_short`, `get_shorts`, `list_templates`…) | 7,50 $/mois | Crédit = 1 vidéo (pas 1 minute) → nettement moins cher au volume. Webhooks, n8n/Zapier/Make |
| **OpusClip** | API gated sur plan Business | Bridge, pas MCP natif | 15 $/mois | Meilleure détection de scènes visuelles → pertinent pour du **gaming**. ClipAnything accepte des prompts |
| **Vizard / Klap / Submagic** | REST publique | ❌ | 12–15 $/mois | Vizard fort en édition par le texte, Submagic en styling de captions |

Pour du footage de jeu, la détection de moments « viraux » basée sur expressions faciales et ton
vocal (Reap, Vizard) est mal adaptée. OpusClip (scène visuelle) ou une **heuristique maison** sur
notre propre footage marchent mieux.

### Open source / self-hosted
- **OpenShorts** — MIT, Docker, REST + webhooks signés + MCP, pas de compteur d'usage.
- **clip-lab** — pipeline local-first Python : ingest (yt-dlp) → WhisperX → scoring de moments →
  découpe FFmpeg → reframe 1080×1920 → props Remotion → `export.zip`. CLI + FastAPI + Docker Compose.
- **video-wizard** — Next.js 16 + FastAPI (Whisper, FFmpeg, MediaPipe) + Remotion ; file d'attente
  Postgres avec `SELECT ... FOR UPDATE SKIP LOCKED`, retry exponentiel, progression par frame.
  Architecture très proche de ce qu'on ferait nous-mêmes.

### Le stack « from scratch » de référence
```
source → yt-dlp / capture OBS
       → FFmpeg (démux, découpe)
       → WhisperX (transcript aligné au mot)
       → sélection de moments (LLM ou heuristique)
       → reframe 9:16 (MediaPipe / scene detect)
       → Remotion (captions, overlays, data-viz React)
       → FFmpeg (encode final, un export par plateforme)
       → publication
```
Remotion est la brique clé pour nous : les compositions sont du **React**, donc on peut rendre
en vidéo nos propres composants de carte, nos POIs, nos comparatifs de prix. `calculateMetadata()`
permet de dériver la durée depuis la longueur du WAV, sans compter les frames à la main.

---

## 6. Génération de vidéo IA (B-roll original)

Prix API par seconde générée (vérifiés août 2026, à revalider avant tout budget) :

| Modèle | 720p | 1080p / + | Audio natif | Statut |
|---|---|---|---|---|
| Veo 3.1 Lite | ~0,05 $ | — | selon endpoint | GA (Vertex AI / Gemini API) |
| Veo 3.1 Fast | ~0,10 $ | — | selon endpoint | GA |
| Veo 3.1 Standard | 0,40 $ | 0,40 $ (1080p), 0,60 $ (4K) | ✅ (+~50 % de coût) | GA, watermark SynthID invisible |
| Kling 3.0 | ~0,08 $ | ~0,10–0,15 $ | optionnel | GA, le plus « developer-friendly » au volume |
| Seedance / Wan 2.6 | ~0,05–0,08 $ | — | optionnel | Wan 2.6 en **open weights** → fine-tuning possible |
| Sora 2 / 2 Pro | 0,10 $ / 0,30 $ | jusqu'à 0,70 $ | ✅ | ⚠️ **API arrêtée le 24 septembre 2026** — ne pas en faire une dépendance |

Toutes ces APIs sont asynchrones (submit → job id → poll). TTS : ElevenLabs (cloud), XTTS ou
Fish Audio (local/GPU) pour la voix off.

Attention : la catégorie 1 de la politique « inauthentic content » de YouTube vise précisément
la vidéo IA générique produite en masse. L'IA est un **outil de production**, pas la substance
du contenu.

---

## 7. MCP ou programme maison ?

**Les deux, mais pas pour le même usage.**

- **MCP** = interface conversationnelle pour agent. Idéal pour piloter depuis Cursor : « clippe
  cette vidéo, montre-moi les 5 meilleurs moments ». Excellent pour l'exploration, le prototypage,
  le one-shot. Mauvais comme runtime de production : pas de retry, pas d'idempotence, pas de
  backpressure, pas de traçabilité, coût LLM à chaque exécution, non déterministe.
- **Programme maison** = le pipeline de prod. C'est exactement un DAG de data engineering :
  sources → extraction → transformation → contrôle qualité → publication → mesure → réinjection.
  Idempotence, checkpoints, dead-letter queue, observabilité, replay.

**Verdict pour un profil data engineer qui veut du volume :** pipeline en code, avec des appels
API HTTP directs (Reap/Ssemble pour le clipping, Ayrshare ou Postiz pour la publication). Le MCP
sert d'interface d'opérateur au-dessus, pour piloter et déboguer le pipeline en langage naturel.

n8n / Make / Zapier : très bien pour valider une chaîne en 2 heures, mauvais dès que la logique
devient conditionnelle et versionnée. À utiliser comme prototype, pas comme cible.

---

## 8. Ce que ça donne concrètement pour GTA Hub / Map-6

Le repo a déjà la moitié du travail : `scripts/content/` implémente
`detect → draft → review → publish → analyze → improve` avec un `daily-funnel.mts` orchestré,
un scoring de funnel, et de la localisation en 6 langues (`localize-articles.mts`).
**Le pipeline vidéo doit être un deuxième étage branché sur le même détecteur de sujets,
pas un système parallèle.**

### Angles de contenu, classés par risque

| Format | Origine du footage | Risque strike | Valeur produit |
|---|---|---|---|
| Data-viz de la carte (rendu Remotion de nos POIs, itinéraires, heatmaps) | **100 % nous** | ~0 | ⭐⭐⭐ ramène direct sur Map-6 |
| Guides « où trouver X », top 10 collectibles | Nous + captures perso | Faible | ⭐⭐⭐ |
| Comparatifs prix / deals précommande (données `preorder-products.ts`) | 100 % nous | ~0 | ⭐⭐⭐ affiliation |
| Analyse frame-by-frame du trailer officiel avec commentaire | Trailer Rockstar | Moyen (transformation requise) | ⭐⭐ |
| Gameplay commenté | Capture perso | Moyen (musiques radio) | ⭐⭐ |
| Reclipping de vidéos d'autres créateurs | Tiers | **Élevé** | ⭐ |

L'avantage compétitif est la **donnée propriétaire** (carte, POIs, collectibles, prix). C'est ce
qu'aucune ferme à contenu IA ne peut copier, et c'est précisément ce que les politiques
d'originalité récompensent.

### Architecture cible

```
scripts/content/detect-news.mts  ──┬──> pipeline ARTICLE (existant)
   (RSS + YouTube Data API)        │
                                   └──> pipeline VIDEO (à construire)
                                          ├─ script generator (LLM, depuis nos données)
                                          ├─ assets: capture perso / Remotion / Veo-Kling (B-roll)
                                          ├─ TTS + WhisperX (captions alignées)
                                          ├─ render Remotion 1080×1920, export PAR plateforme
                                          ├─ QA gate (durée, ratio, watermark, doublon perceptuel)
                                          └─ publish (Ayrshare/Postiz) + backlink Map-6
                                                └─ analytics → réinjection dans le scoring
```

Points d'ingénierie non négociables :
- **Registre de contenu** (Firestore, comme les articles) : un hash par asset, pour ne jamais
  republier deux fois la même chose et prouver l'originalité.
- **QA gate automatique** avant publication : ratio, durée, absence de watermark, unicité
  perceptuelle vs le catalogue existant, variance de template.
- **Rate limiter par plateforme** respectant les caps réels (TikTok ~15/j partagés, IG 50/24h,
  YouTube 100/j) avec une file persistante.
- **Un export par plateforme**, jamais un fichier unique recyclé.
- **Cadence progressive** : les filtres anti-spam sont agressifs sur les comptes récents et sur
  les pics soudains de fréquence.

### Ordre de construction suggéré
1. Ouvrir les comptes (IG **Business** lié à une Page FB, chaîne YouTube, TikTok) et lancer
   **immédiatement** Meta App Review + audit TikTok, ou souscrire Ayrshare pour les court-circuiter.
   C'est le chemin critique : 2 à 6 semaines.
2. Prototype de rendu Remotion à partir d'une donnée Map-6 réelle (ex. « les 10 collectibles les
   plus ratés »), rendu manuel, posté à la main. Valider que le format performe.
3. Industrialiser : générateur de script LLM branché sur `detect-news` + rendu + QA gate.
4. Brancher la publication et le rate limiter.
5. Boucle analytics → scoring, en réutilisant `analyze.mts` / `improve.mts`.

### Budget indicatif (mensuel, régime de croisière)
- Clipping SaaS (si utilisé) : 8–15 $
- Publication (Ayrshare) : plan payant, ~selon volume de profils
- B-roll IA : à 0,10 $/s, 30 s de B-roll par vidéo × 60 vidéos/mois ≈ 180 $ (Veo Fast) ou ≈ 50 $ (Kling)
- TTS ElevenLabs : ~20 $
- Rendu Remotion : local (0 $) ou Lambda selon le volume

Le poste dominant est la génération IA. Le maximiser n'est pas souhaitable : c'est aussi le poste
qui augmente le risque « inauthentic content ». Privilégier le rendu Remotion de nos propres données,
qui est gratuit et original.

---

## Sources principales
- Rockstar Games — Policy on posting copyrighted Rockstar Games material
- YouTube — Channel monetization policies (reused / inauthentic content, MAJ 15/07/2025, clarif. 16/07/2026)
- YouTube — Video game and software content
- YouTube Data API v3 — quotas et compliance
- TikTok for Developers — Content Sharing Guidelines, Content Posting API (Direct Post)
- Meta — Instagram Platform content publishing, `content_publishing_limit`
- Reap — State of top AI video clipping tools 2026 (benchmark avril 2026, 9 outils)
- Postiz Public API docs ; Mixpost ; Ayrshare publishing API
- Vertex AI / OpenAI / Kuaishou — grilles tarifaires vidéo (août 2026)
