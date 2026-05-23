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
| Vercel | Hébergement |
