# Portfolio — Guide de personnalisation et de mise en ligne

Portfolio one-page **HTML / CSS / JavaScript**, sans dépendance ni build.
Thème sombre + thème clair, responsive, animations au scroll, formulaire de contact.

---

## 1. Structure du projet

```
portfolio/
├── index.html              ← tout le contenu (textes, projets, liens)
├── assets/
│   ├── css/
│   │   └── styles.css      ← design, couleurs, responsive
│   ├── js/
│   │   └── main.js         ← thème, menu, animations, formulaire
│   └── favicon.svg         ← icône de l'onglet
└── README.md               ← ce guide
```

**Règle d'or :** le contenu se modifie dans `index.html`, le design dans `styles.css`,
les comportements dans `main.js`. On n'a jamais besoin de toucher aux trois à la fois.

---

## 2. Lancer le site en local

### Option A — le plus simple
Double-clique sur `index.html`. Le site s'ouvre dans ton navigateur.
(Tout fonctionne, sauf parfois le chargement de certaines polices hors ligne.)

### Option B — avec un petit serveur local (recommandé)

Avec Node.js :

```bash
npx serve .
```

Avec Python :

```bash
python -m http.server 8000
```

Puis ouvre <http://localhost:3000> (serve) ou <http://localhost:8000> (Python).

Dans VS Code, l'extension **Live Server** fonctionne aussi très bien :
clic droit sur `index.html` → *Open with Live Server*.

---

## 3. Personnaliser le contenu (checklist)

> Conseil : dans VS Code, `Ctrl + H` (Rechercher/Remplacer dans tout le projet)
> pour remplacer `Prénom Nom`, `votre-pseudo`, `contact@votre-email.com`, etc.

### 3.1 Identité
- [ ] **Nom** : `Prénom Nom` → ton nom (header, hero, à propos, footer, JSON-LD).
- [ ] **Pseudo / logo** : `portfolio<span>.dev</span>` → ton prénom ou pseudo.
- [ ] **Titre** : `Développeur Fullstack PHP & JavaScript` → ton intitulé.
- [ ] **Localisation** : `Antananarivo, Madagascar` → ta ville.
- [ ] **Email** : `contact@votre-email.com` → ton email (partout dans `index.html`,
      et une fois dans `assets/js/main.js`, section 8).
- [ ] **GitHub / LinkedIn** : remplace les URLs `https://github.com/votre-pseudo`
      et `https://www.linkedin.com/in/votre-profil`.
- [ ] **Initiales** dans la carte « À propos » : `AM` (`index.html`, section `#apropos`).

### 3.2 Textes
- [ ] Phrase d'accroche du hero (`<h1>`).
- [ ] Paragraphes « À propos ».
- [ ] Liste des atouts (4 `<li>`).
- [ ] Chiffres clés : attributs `data-count` et `data-suffix`
      (ex. `data-count="3" data-suffix="+"`).
- [ ] Rôles animés du hero : tableau `phrases` dans `assets/js/main.js` (section 7).

### 3.3 Compétences
Dans `#competences`, chaque bloc `.skills-card` contient des `<span class="tag">`.
Ajoute / supprime librement des balises :

```html
<span class="tag">Vue.js</span>
```

### 3.4 Études de cas (le plus important pour un dev !)
La section projets contient **3 études de cas** `<article class="case-study">`,
structurées en *Contexte / Mon rôle / Résultat*, puis un bloc `.other-projects`
pour les réalisations secondaires.

Pour modifier ou ajouter une étude de cas :

1. Copie tout le bloc `<article class="case-study reveal"> ... </article>`.
2. Change le titre (`<h3>`), la date (`.case-meta`) et les trois paragraphes
   (`.case-point`).
3. Mets à jour les technologies (`.project-tags`) et la couverture
   (`.case-cover` : badge, index et stack).
4. Change la couleur de couverture : classe `cover-1`, `cover-2`, `cover-3` ou
   `cover-4` (définies dans `styles.css`, section 9).
5. Les projets actuels affichent un cadenas (`.project-private`) car le code est
   privé. Si tu as une démo publique, remplace le `<span class="project-private">`
   par un lien :

```html
<a href="https://lien-de-ton-projet.com" target="_blank" rel="noopener noreferrer"
   aria-label="Voir le site de mon projet" title="Démo en ligne">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <path d="M15 3h6v6M10 14 21 3"></path>
  </svg>
</a>
```

Pour les autres réalisations, modifie directement les `<li>` de
`.other-projects-list` (titre, description, stack).

**Astuce visuelle :** remplace la couverture par une vraie capture d'écran :

```html
<div class="case-cover cover-1">
  <img src="assets/img/crm.webp" alt="Aperçu de mon CRM" class="project-shot" />
  <span class="cover-badge">CRM</span>
</div>
```

La classe `.project-shot` est déjà prête dans `styles.css` (l'image remplit la
couverture et zoome légèrement au survol).

Format conseillé : **WebP**, 1200 × 800 px max, moins de 150 Ko.
Compresse sur <https://squoosh.app>.

### 3.5 Parcours & formation
Modifie les 6 blocs `.timeline-item` (poste, entreprise, dates, description, tags).
La formation est volontairement condensée : deux lignes `.education-list`
(Master + Licence), sans les stages déjà présents dans le CV.

### 3.6 CV
1. Exporte ton CV en PDF.
2. Nomme-le `cv.pdf` et place-le dans `assets/`.
3. Ou change les 2 liens `href="assets/cv.pdf"` (header + à propos).

> Sans PDF, ces liens renverront une erreur 404. Pense à mettre le fichier
> **avant** de publier, ou retire les boutons.

---

## 4. Changer les couleurs et les polices

Tout est centralisé en haut de `assets/css/styles.css`, dans `:root` :

```css
:root {
  --bg: #080b12;          /* fond principal */
  --accent: #7c5cff;      /* violet */
  --accent-2: #22d3ee;    /* cyan */
  --gradient: linear-gradient(120deg, #7c5cff 0%, #22d3ee 100%);
  --font-body: "Inter", ...;
  --font-heading: "Space Grotesk", ...;
}
```

- Change `--accent` et `--accent-2` pour adapter l'identité visuelle.
- Le thème clair se règle dans le bloc `[data-theme="light"] { ... }`.
- Les polices sont chargées via Google Fonts dans le `<head>` de `index.html`.
  Pour en changer, remplace l'URL et les variables `--font-*`.

---

## 5. Formulaire de contact

### Comportement par défaut (aucun serveur requis)
À la soumission, le site ouvre le logiciel de messagerie du visiteur avec un
email pré-rempli. Simple et gratuit, mais certains visiteurs sans client mail
configuré ne pourront pas l'utiliser.

**À faire :** remplace l'adresse dans `assets/js/main.js`, section 8 :

```js
const mailto = `mailto:TON-EMAIL?subject=...`;
```

### Envoi direct (recommandé) — Formspree
1. Crée un compte gratuit sur <https://formspree.io>.
2. Crée un formulaire, récupère l'URL du type `https://formspree.io/f/abcdwxyz`.
3. Dans `index.html`, ajoute l'attribut à la balise `<form>` :

```html
<form class="contact-form" id="contact-form" novalidate
      data-endpoint="https://formspree.io/f/abcdwxyz">
```

C'est tout : `main.js` détecte `data-endpoint` et envoie les données en AJAX
(le visiteur reste sur la page, message de confirmation affiché).
Alternatives : Getform, Web3Forms, Netlify Forms (si hébergé sur Netlify).

---

## 6. Mettre le site en ligne

### 6.1 GitHub Pages — gratuit, idéal pour un portfolio

**a. Créer le dépôt**
1. Sur <https://github.com/new>, crée un dépôt public nommé `portfolio`.
2. Ouvre un terminal **dans le dossier du projet** et lance :

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/portfolio.git
git push -u origin main
```

**b. Activer Pages**
1. Va dans **Settings** → **Pages** (menu de gauche).
2. *Source* : **Deploy from a branch**.
3. *Branch* : `main`, dossier `/ (root)` → **Save**.
4. Attends 1–2 minutes. Le site est en ligne à :
   `https://TON-PSEUDO.github.io/portfolio/`

> Astuce : si tu nommes le dépôt `TON-PSEUDO.github.io`, le site sera servi
> directement à `https://TON-PSEUDO.github.io/` (sans `/portfolio`).

**c. Mettre à jour le site**
À chaque modification :

```bash
git add .
git commit -m "Mise à jour du portfolio"
git push
```

GitHub Pages republie automatiquement en ~1 minute.

### 6.2 Vercel — encore plus rapide
1. Crée un compte sur <https://vercel.com> (connexion avec GitHub).
2. **Add New → Project** → importe ton dépôt.
3. Framework preset : **Other**. Aucun build à configurer.
4. **Deploy**. Tu obtiens une URL `https://portfolio-xxx.vercel.app`.
5. Chaque `git push` redéploie automatiquement.

### 6.3 Netlify
1. <https://app.netlify.com> → **Add new site → Import an existing project**.
2. Choisis GitHub, sélectionne le dépôt.
3. Build command : *vide*. Publish directory : `.` (racine).
4. **Deploy site**.

### 6.4 Nom de domaine personnalisé (optionnel)
- Achète un domaine (ex. `votre-domaine.com`) chez OVH, Namecheap, Porkbun…
- **GitHub Pages** : Settings → Pages → *Custom domain* → saisis le domaine,
  puis chez ton registrar crée un enregistrement `CNAME` vers
  `TON-PSEUDO.github.io` (pour un sous-domaine) ou des enregistrements `A`
  vers les IP GitHub (pour un domaine racine). Coche *Enforce HTTPS*.
- **Vercel / Netlify** : *Settings → Domains → Add domain*, puis suis les
  instructions DNS affichées. HTTPS est automatique.

---

## 7. SEO et partage sur les réseaux

Dans le `<head>` de `index.html`, mets à jour :
- `<title>`, `<meta name="description">`, `<meta name="author">` ;
- les balises **Open Graph** (`og:title`, `og:description`, `og:url`, `og:image`) ;
- le bloc **JSON-LD** (nom, poste, URL, réseaux).

**Image de partage (`og:image`)** : crée une image **1200 × 630 px** (fond sombre,
ton nom + ton titre), exporte-la en `assets/og-image.png`, puis vérifie l'aperçu sur
<https://www.opengraph.xyz>. C'est ce visuel qui s'affiche quand on partage ton lien
sur LinkedIn ou Twitter.

---

## 8. Checklist avant de publier

- [ ] Nom, email, GitHub et LinkedIn remplacés **partout** (Ctrl + H).
- [ ] Au moins **3 études de cas** complètes (Contexte / Mon rôle / Résultat).
- [ ] CV PDF présent dans `assets/` (ou boutons retirés).
- [ ] Formulaire testé (mailto ou Formspree).
- [ ] Liens testés : aucun `href="#"` restant sur un projet.
- [ ] Site vérifié sur mobile (mode responsive des DevTools).
- [ ] Thème clair **et** sombre testés.
- [ ] `title` et `description` à jour.
- [ ] Image `og-image.png` ajoutée.
- [ ] Favicon visible dans l'onglet.
- [ ] Ouverture en navigation privée pour vérifier qu'il n'y a pas d'erreur.

---

## 9. Aller plus loin (facultatif)

Ce portfolio est volontairement **statique** : rapide, gratuit à héberger, sans
maintenance. Si tu veux montrer tes compétences en framework :

- **Next.js** : recrée ce design en composants React, ajoute un blog en MDX.
  Déploiement Vercel en un clic.
- **Astro** : excellent pour un site de contenu ultra-rapide.
- **Animations** : ajoute GSAP ou Framer Motion pour des transitions plus poussées.
- **Blog** : un article technique bien écrit vaut souvent plus qu'un dixième projet.

---

## 10. Crédits

Design et code : toi 🙂 — polices [Inter](https://fonts.google.com/specimen/Inter)
et [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts, licence OFL).
Aucune bibliothèque JavaScript externe.
