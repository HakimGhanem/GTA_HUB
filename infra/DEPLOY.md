# Map-6 — Infrastructure & acquisition

## Pourquoi Next.js sur Cloud Run (et pas Flask)

Map-6 est déjà une app **Next.js 16** avec 1400+ pages SSG, sitemap, JSON-LD et carte MapLibre.
Flask impliquerait une réécriture complète sans gain SEO.

| Option | Verdict |
|--------|---------|
| **Next.js → Cloud Run** | Recommandé si vous voulez tout sur GCP |
| **Next.js → Vercel** | Plus simple pour le frontend (déjà configuré) |
| Flask seul | Non adapté à cette stack |

Cloud Run héberge le conteneur Next.js standalone (`output: "standalone"`).

---

## 1. Déploiement Cloud Run

### Prérequis GCP

```bash
gcloud auth login
export GCP_PROJECT=votre-project-id
gcloud config set project $GCP_PROJECT

# Artifact Registry (une fois)
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
gcloud artifacts repositories create cloud-run-source-deploy \
  --repository-format=docker --location=europe-west1
```

### Deploy

```bash
chmod +x scripts/deploy-cloudrun.sh
export GCP_PROJECT=votre-project-id
export NEXT_PUBLIC_SITE_URL=https://map6.live
./scripts/deploy-cloudrun.sh
```

### Variables d'environnement Cloud Run

Dans la console ou via CLI après deploy :

```bash
gcloud run services update map6 --region europe-west1 \
  --set-env-vars="NEXT_PUBLIC_SITE_URL=https://map6.live,\
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX,\
NEXT_PUBLIC_GSC_VERIFICATION=xxx,\
NEXT_PUBLIC_BING_VERIFICATION=xxx,\
NEXT_PUBLIC_GTADB_ENABLED=true"
```

**Tuiles GTADB (~plusieurs Go)** : ne pas mettre dans l'image Docker.
Options :
- **Cloud Storage** + CDN (recommandé prod)
- **Build step** : `npm run tiles:fetch-gtadb` dans CI avant `docker build`
- **Vercel** pour l'app + GCS pour `/tiles/*` en proxy

Health check : `GET /api/health` → `{"status":"ok"}`

---

## 2. DNS Squarespace → Cloud Run

Domaines achetés : **map6.live** (canonical) + **map-6.com** (redirect).

### Étape A — Domain mapping Cloud Run

1. GCP Console → **Cloud Run** → service `map6` → **Manage custom domains**
2. Ajouter `map6.live` et `www.map6.live`
3. GCP affiche les enregistrements DNS à créer

### Étape B — Squarespace DNS (map6.live)

Dans **Domains → map6.live → DNS Settings** :

| Type | Host | Valeur |
|------|------|--------|
| CNAME | `www` | (valeur fournie par GCP domain mapping) |
| A / CNAME | `@` | (records GCP pour apex — souvent 4× A ou ALIAS) |

> Squarespace : si apex CNAME impossible, utiliser **Google Cloud Load Balancer** + certificat managed, ou pointer apex via les A records GCP.

### Étape C — map-6.com → redirect

Le middleware Next.js redirige déjà `map-6.com` → `https://map6.live` (301).

DNS pour **map-6.com** :
- Même cible que map6.live (CNAME vers Cloud Run mapping), **ou**
- Squarespace redirect (si dispo) vers `https://map6.live`

Vérifier après propagation (24–48 h) :

```bash
curl -I https://map-6.com
curl -I https://map6.live/api/health
```

---

## 3. Google Analytics 4 (acquisition)

1. [analytics.google.com](https://analytics.google.com) → créer propriété **Map-6**
2. Flux Web → URL `https://map6.live`
3. Copier **Measurement ID** (`G-XXXXXXXX`) → `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Redéployer

Déjà intégré via `@next/third-parties/google` (production uniquement).

### Rapports utiles dès J1

- **Acquisition** → Trafic → Source/support
- **Engagement** → Pages : `/map`, `/locations/*`
- **Événements** : activer Enhanced measurement (scroll, outbound clicks)

### Lier GA4 ↔ Search Console

GA4 Admin → Associations → Search Console → lier la propriété GSC.

---

## 4. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter propriété **Domaine** `map6.live` (DNS TXT) **ou** préfixe URL
3. Vérification HTML tag → `NEXT_PUBLIC_GSC_VERIFICATION`
4. Soumettre sitemap : `https://map6.live/sitemap.xml`
5. Inspecter `/` et `/map` pour indexation

---

## 5. Bing Webmaster Tools

1. [bing.com/webmasters](https://www.bing.com/webmasters)
2. Ajouter site `https://map6.live`
3. Vérification meta → `NEXT_PUBLIC_BING_VERIFICATION`
4. Soumettre sitemap identique
5. **IndexNow** (déjà dans le code) :
   ```bash
   # Générer une clé
   openssl rand -hex 16
   # → INDEXNOW_KEY dans env
   # → créer public/{KEY}.txt contenant la clé
   curl -X POST https://map6.live/api/indexnow \
     -H "Content-Type: application/json" \
     -d '{"urls":["/","/map","/locations"]}'
   ```

Optionnel : **Microsoft Clarity** (gratuit) → `NEXT_PUBLIC_CLARITY_ID`

---

## 6. SEO & GEO (Generative Engine Optimization)

Déjà en place dans le code :

| Élément | Fichier |
|---------|---------|
| Sitemap dynamique (1400+ URLs) | `src/app/sitemap.ts` |
| robots.txt | `src/app/robots.ts` |
| Canonical URLs | `buildMetadata()` |
| JSON-LD WebSite, Organization, WebApplication | `layout.tsx` |
| JSON-LD FAQ (homepage) | `(content)/page.tsx` |
| JSON-LD Place par location | `locations/[slug]/page.tsx` |
| llms.txt pour crawlers IA | `public/llms.txt` |
| Redirect canonical domain | `src/middleware.ts` |

### Actions manuelles acquisition

- [ ] Créer **og-default.png** 1200×630 dans `public/`
- [ ] Profils Reddit/Twitter/Discord avec lien map6.live/map
- [ ] Backlinks communauté GTA (GTADB attribution = lien naturel)
- [ ] Publier guides `/guides/*` régulièrement (IndexNow après chaque ajout)
- [ ] Surveiller GSC : CTR, requêtes « gta 6 map », « vice city map »

### Mots-clés cibles

- gta 6 map, gta 6 interactive map, vice city map
- gta 6 collectibles map, gta 6 interactive map, gta vi locations

---

## 7. Alternative Vercel (plus rapide)

Si Cloud Run est bloquant pour les tuiles lourdes :

```bash
npx vercel --prod
```

Vercel → Settings → Domains : ajouter `map6.live`, `map-6.com`
DNS Squarespace : CNAME `@` et `www` vers `cname.vercel-dns.com`

---

## 8. Content engine (news loop)

Pipeline: **detect → draft → human review → publish → analyze → improve**.

### Local (file store — default)

Articles live in `data/content/*.json` when `FIRESTORE_ENABLED` is unset.

```bash
npm run content:seed          # trailer draft
npm run content:detect        # RSS → topics
npm run content:draft         # topic → drafted article (LLM or template)
npm run content:review        # list queue
npm run content:review -- --approve <id> --reviewer you
npm run content:analyze -- --csv ~/Downloads/Pages.csv
npm run content:improve -- --slug gta-6-trailer-3-what-we-know
```

### Production secrets (Cloud Run)

```bash
gcloud run services update map6 --region europe-west1 --project gtahub-503009 \
  --set-env-vars="CONTENT_API_SECRET=$(openssl rand -hex 24),INDEXNOW_KEY=<hex>,FIRESTORE_ENABLED=true,FIRESTORE_PROJECT_ID=gtahub-503009"
```

- Create Firestore DB in `gtahub-503009` (Native mode).
- Grant the Cloud Run service account `roles/datastore.user`.
- Create `public/<INDEXNOW_KEY>.txt` containing the key, redeploy.
- **Do not rely on file-store writes in Cloud Run** (ephemeral disk) — enable Firestore for multi-instance publish.

### Publish via API

```bash
curl -X POST https://map-6.com/api/content/publish \
  -H "Authorization: Bearer $CONTENT_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"articleId":"<id>","reviewer":"hakim"}'
```

Review checklist before approve:

- [ ] No invented trailer dates
- [ ] ≥2 real sources
- [ ] ≥3 internal links (`/map`, locations, guides)
- [ ] Title 30–60 chars, meta 120–160
- [ ] Rumors explicitly labeled

### Cron (daily funnel — 17:00 Europe/Paris)

**Goal:** volume pages that match **purchase** or **clip** intent (not generic news).

```bash
# Full CLI pipeline (detect → draft top N → optional publish + IndexNow)
npm run content:daily -- --limit 2
# Auto-publish only when ready:
# CONTENT_DAILY_AUTO_PUBLISH=true npm run content:daily -- --limit 2 --publish

# One-shot Scheduler bootstrap (HTTP enrich/publish drafted queue)
CONTENT_API_SECRET=... bash scripts/setup-content-scheduler.sh
```

| Job | Schedule | TZ | Target |
|-----|----------|-----|--------|
| `map6-content-daily` | `0 17 * * *` | `Europe/Paris` | `POST /api/content/daily` |
| detect+draft (Job) | `0 17 * * *` | `Europe/Paris` | `npm run content:daily` |
| analyze | `0 9 * * 1` | UTC | GSC CSV + `content:analyze` |

Keep `publish:false` until the review queue is trusted. IndexNow + sitemap ping run at the end of `content:daily`.

---

## 9. Checklist go-live

- [ ] `NEXT_PUBLIC_SITE_URL=https://map-6.com`
- [ ] DNS map-6.com / map6.live actifs + HTTPS
- [ ] GA4 recevant des hits
- [ ] GSC + Bing sitemap soumis (`/sitemap.xml`, `/news.xml`)
- [ ] `/api/health` → 200
- [ ] Tuiles carte visibles en prod
- [ ] og-default.png présent
- [ ] `CONTENT_API_SECRET` + IndexNow configurés
- [ ] Firestore enabled for content publish (prod)
