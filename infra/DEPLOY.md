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

## 8. Checklist go-live

- [ ] `NEXT_PUBLIC_SITE_URL=https://map6.live`
- [ ] DNS map6.live actif + HTTPS
- [ ] map-6.com → 301 vers map6.live
- [ ] GA4 recevant des hits
- [ ] GSC + Bing sitemap soumis
- [ ] `/api/health` → 200
- [ ] Tuiles carte visibles en prod
- [ ] og-default.png présent
