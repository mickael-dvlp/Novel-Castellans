# L'ascension du Phénix — Site de lecture

Site de lecture de light novel généré statiquement avec Next.js, pensé pour publier des chapitres en Markdown avec une interface d'administration sans code.

---

## Ce qui est en place

### Site de lecture
- **Next.js 15 App Router** avec génération statique (SSG) — supporte ~1000 chapitres sans ralentissement
- **Thème liseuse** : mode sombre activé par défaut, toggle jour/nuit dans la navbar
- **Chapitres en Markdown** dans `content/chapters/` avec frontmatter (`title`, `chapter`, `date`)
- **Routes** `/chapitre/[slug]` générées automatiquement à chaque build
- **Page d'accueil immersive** en `100dvh` fixe : fond lave animé, cendres tombantes, braises montantes
- **Navigation** précédent / suivant entre chapitres
- **Sauvegarde de progression** en localStorage — bouton "Reprendre la lecture" sur l'accueil
- **Responsive** — lisible sur mobile, tablette et desktop
- **Favicon** depuis `public/image/favicon.ico`

### Animation page d'accueil
- **Fond lave** (canvas `requestAnimationFrame`) : 6 bassins de lave pulsants, 9 fissures lumineuses à scintillement indépendant
- **Particules** : cendres grises qui tombent en dérive + braises orangées qui remontent avec halo
- **Entrées animées** (Framer Motion) : titre en fondu/glissement, chapitres en stagger
- **Scroll isolé** : la page ne scroll pas, seule la liste des chapitres défile en interne

### Interface d'administration (Decap CMS)
- Accessible sur `/admin` — aucun accès au code nécessaire
- Créer, modifier, supprimer des chapitres via un éditeur visuel
- Authentification par compte GitHub (OAuth)
- Les chapitres publiés depuis l'admin créent automatiquement un commit sur le dépôt

### OAuth GitHub (backend)
- Route `/api/auth` — initie le flux OAuth
- Route `/api/auth/callback` — échange le code contre un token et le transmet à Decap CMS
- Fonctionne aussi bien en local (`localhost:3000`) qu'en production (Vercel)

---

## Ce qui reste à faire

### 1. Créer une GitHub OAuth App

Sur [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps** → **New OAuth App** :

| Champ | Valeur |
|---|---|
| Homepage URL | `https://ton-site.vercel.app` |
| Authorization callback URL | `https://ton-site.vercel.app/api/auth/callback` |

> Pour le développement local, ajouter aussi `http://localhost:3000/api/auth/callback` comme callback URL (GitHub accepte plusieurs valeurs).

Copier le **Client ID** et générer un **Client Secret**.

### 2. Configurer le dépôt dans l'admin CMS

Dans [public/admin/index.html](public/admin/index.html), remplacer :

```js
repo: 'TON-COMPTE/TON-REPO',
```

par :

```js
repo: 'mickael-dvlp/Novel-Castellans',
```

### 3. Variables d'environnement en local

Créer un fichier `.env.local` à la racine (non versionné) :

```env
GITHUB_CLIENT_ID=ton_client_id_ici
GITHUB_CLIENT_SECRET=ton_client_secret_ici
```

### 4. Déployer sur Vercel

1. Importer le dépôt `mickael-dvlp/Novel-Castellans` sur [vercel.com](https://vercel.com)
2. Dans **Settings → Environment Variables**, ajouter :
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
3. Déclencher un redéploiement

---

## Structure des chapitres

Chaque chapitre est un fichier Markdown dans `content/chapters/` :

```markdown
---
title: "Le titre du chapitre"
chapter: 1
date: "2026-05-08"
---

Contenu du chapitre en Markdown...
```

> Le nom du fichier importe peu (`001.md`, `1.md`, etc.) — c'est le champ `chapter` dans le frontmatter qui fait foi.

---

## Stack technique

| Outil | Usage |
|---|---|
| Next.js 15 | Framework (App Router + SSG) |
| Tailwind CSS + Typography | Styles et thème liseuse |
| next-themes | Toggle dark/light mode |
| gray-matter | Parsing du frontmatter Markdown |
| marked | Conversion Markdown → HTML |
| Framer Motion | Animations d'entrée (page d'accueil) |
| Canvas 2D API | Animation lave + particules |
| Decap CMS v3 | Interface d'administration |
| Vercel | Hébergement (à configurer) |
