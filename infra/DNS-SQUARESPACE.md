# DNS Squarespace — Map-6 → Cloud Run

Projet : **gtahub-503009** · Service : **map6** · Région : **europe-west1**

---

### map6.live — À configurer MAINTENANT (domain mapping créé)

| Type | Host | Data |
|------|------|------|
| A | `@` | `216.239.32.21` |
| A | `@` | `216.239.34.21` |
| A | `@` | `216.239.36.21` |
| A | `@` | `216.239.38.21` |
| CNAME | `www` | `ghs.googlehosted.com` |
| TXT | `@` | `google-site-verification=...` (Search Console) |

`map-6.com` redirigera automatiquement vers `https://map6.live`.

---

## map-6.com — Déjà configuré

### 1. Garder le TXT Search Console (déjà fait)

| Type | Host | Data |
|------|------|------|
| TXT | `@` | `google-site-verification=...` |

### 2. Apex `@` — 4 enregistrements A

| Type | Host | Data |
|------|------|------|
| A | `@` | `216.239.32.21` |
| A | `@` | `216.239.34.21` |
| A | `@` | `216.239.36.21` |
| A | `@` | `216.239.38.21` |

### 3. www — CNAME

| Type | Host | Data |
|------|------|------|
| CNAME | `www` | `ghs.googlehosted.com` |

### 4. IPv6 (optionnel)

| Type | Host | Data |
|------|------|------|
| AAAA | `@` | `2001:4860:4802:32::15` |
| AAAA | `@` | `2001:4860:4802:34::15` |
| AAAA | `@` | `2001:4860:4802:36::15` |
| AAAA | `@` | `2001:4860:4802:38::15` |

> Squarespace : cliquer **SAVE** sur chaque record. TTL 4 h OK.

Certificat SSL : actif 15–60 min après DNS propagé.

Test :
```bash
curl -I https://map-6.com/api/health
```

---

## map6.live — Prochaine étape

1. Search Console → ajouter propriété **Domaine** `map6.live`
2. TXT `@` dans Squarespace (comme map-6.com)
3. Vérifier → puis :
   ```bash
   GCP_PROJECT=gtahub-503009 ./scripts/setup-domain-mappings.sh
   ```

`map6.live` = domaine **canonical** (le middleware redirige map-6.com → map6.live).

---

## URL temporaire (déjà live)

https://map6-e5wwzkuyoq-ew.a.run.app
