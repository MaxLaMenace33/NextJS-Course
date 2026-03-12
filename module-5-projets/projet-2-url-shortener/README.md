# Projet 2 : URL Shortener

## Description

Créez un **raccourcisseur d'URL** avec dashboard personnel, compteur de clics et analytics basiques. Les utilisateurs authentifiés peuvent créer des liens courts, voir leurs statistiques et gérer leurs URLs.

## Objectifs pédagogiques

À la fin de ce projet, vous saurez :
- ✅ Implémenter des Server Actions Next.js
- ✅ Gérer des routes dynamiques avec redirections
- ✅ Générer des identifiants uniques courts
- ✅ Tracker des événements (clics)
- ✅ Créer un dashboard avec données utilisateur
- ✅ Gérer le CRUD complet d'une entité
- ✅ Optimiser les requêtes base de données

## Tech Stack

### Core
- **Next.js 15** : Framework React
- **TypeScript** : Typage statique
- **React 19** : UI library

### Authentification
- **BetterAuth 1.x** : Solution auth (réutilisée du Projet 1)

### Base de données
- **Prisma 6.x** : ORM TypeScript
- **PostgreSQL** : Base relationnelle

### UI
- **Tailwind CSS** : Styling
- **shadcn/ui** : Composants UI

### Utilitaires
- **nanoid** : Génération d'IDs courts et uniques
- **Zod** : Validation

## Installation

```bash
# Créer le projet
pnpm create next-app@latest url-shortener --typescript --tailwind --app --src-dir --import-alias "@/*"
cd url-shortener

# Installer les dépendances
pnpm add better-auth prisma @prisma/client zod bcryptjs nanoid
pnpm add -D @types/bcryptjs

# Installer shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input label card table badge dialog form select

# Initialiser Prisma
pnpm prisma init
```

## User Stories

### En tant qu'utilisateur connecté

- ✅ Je veux **créer un lien court** à partir d'une URL longue
- ✅ Je veux **voir tous mes liens** dans un dashboard
- ✅ Je veux **voir le nombre de clics** sur chacun de mes liens
- ✅ Je veux **copier un lien court** en un clic
- ✅ Je veux **supprimer un lien** que je n'utilise plus
- ✅ Je veux **voir la date de création** de mes liens

### En tant que visiteur (non connecté)

- ✅ Je veux **être redirigé** automatiquement quand je visite un lien court
- ✅ Je veux voir une **page 404** si le lien court n'existe pas
- ✅ Je veux **m'inscrire** pour créer mes propres liens courts

### En tant qu'administrateur de lien

- ✅ Je veux voir **les détails analytics** d'un lien (derniers clics, total)
- ✅ Je veux **éditer le titre** d'un lien pour mieux l'organiser

## Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  links         Link[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Link {
  id          String   @id @default(cuid())
  shortCode   String   @unique
  originalUrl String
  title       String?
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  clicks      Click[]

  @@index([userId])
  @@index([shortCode])
}

model Click {
  id        String   @id @default(cuid())
  linkId    String
  userAgent String?
  referer   String?
  ip        String?
  createdAt DateTime @default(now())

  link      Link     @relation(fields: [linkId], references: [id], onDelete: Cascade)

  @@index([linkId])
  @@index([createdAt])
}
```

## Architecture des Routes

```
src/
├── app/
│   ├── layout.tsx                      # Layout racine
│   ├── page.tsx                        # Homepage avec formulaire
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx               # Page de connexion
│   │   └── sign-up/
│   │       └── page.tsx               # Page d'inscription
│   ├── (protected)/
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Liste de tous les liens
│   │   └── links/
│   │       └── [id]/
│   │           └── page.tsx           # Détails et analytics d'un lien
│   ├── [shortCode]/
│   │   └── page.tsx                   # Redirection automatique
│   └── api/
│       ├── auth/
│       │   └── [...betterauth]/
│       │       └── route.ts            # API routes BetterAuth
│       └── track/
│           └── route.ts                # Track click (optionnel)
├── components/
│   ├── auth/                           # Composants auth (réutilisés)
│   ├── links/
│   │   ├── create-link-form.tsx       # Formulaire de création
│   │   ├── link-card.tsx              # Card affichant un lien
│   │   ├── link-table.tsx             # Table des liens
│   │   ├── copy-button.tsx            # Bouton copier lien
│   │   ├── delete-link-button.tsx     # Bouton supprimer
│   │   └── link-analytics.tsx         # Analytics d'un lien
│   ├── ui/                             # Composants shadcn/ui
│   └── navbar.tsx                      # Navbar
├── lib/
│   ├── auth.ts                         # Configuration BetterAuth
│   ├── db.ts                           # Client Prisma
│   ├── actions/
│   │   └── links.ts                   # Server Actions pour liens
│   └── utils.ts                        # Utilitaires
└── middleware.ts                       # Protection des routes
```

## Composants à créer

### 1. `src/components/links/create-link-form.tsx`
Formulaire pour créer un lien court avec :
- Input pour l'URL originale (validation)
- Input optionnel pour le titre
- Bouton submit avec état loading
- Message de succès avec lien généré

### 2. `src/components/links/link-card.tsx`
Card affichant un lien avec :
- Titre (ou URL si pas de titre)
- Short URL cliquable
- Nombre de clics
- Date de création
- Bouton copier
- Bouton supprimer

### 3. `src/components/links/link-table.tsx`
Table des liens pour le dashboard avec :
- Colonnes : Titre, URL courte, Clics, Date, Actions
- Responsive (cards sur mobile)
- Tri par date ou clics

### 4. `src/components/links/copy-button.tsx`
Bouton pour copier le lien court dans le presse-papier avec feedback visuel.

### 5. `src/components/links/delete-link-button.tsx`
Bouton de suppression avec confirmation (Dialog).

### 6. `src/components/links/link-analytics.tsx`
Composant affichant les analytics d'un lien :
- Graphique des clics par jour (optionnel)
- Liste des derniers clics
- Stats : Total clics, Moyenne par jour, Dernier clic

### 7. `src/lib/actions/links.ts`
Server Actions :
- `createLink(originalUrl, title?)` : Créer un lien
- `deleteLink(linkId)` : Supprimer un lien
- `getUserLinks()` : Récupérer tous les liens de l'utilisateur
- `getLinkAnalytics(linkId)` : Récupérer les stats d'un lien

### 8. `src/app/[shortCode]/page.tsx`
Page de redirection automatique :
- Récupérer le lien par shortCode
- Enregistrer un clic
- Redirect vers l'URL originale
- 404 si shortCode inexistant

## Variables d'environnement

Créez un fichier `.env` :

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/url_shortener"

# BetterAuth
BETTER_AUTH_SECRET="votre-secret-aleatoire-32-caracteres-minimum"
BETTER_AUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Étapes de développement

### Phase 1 : Setup (30min)
1. Créer le projet et installer les dépendances
2. Configurer Prisma avec le schema
3. Configurer BetterAuth (réutiliser Projet 1)
4. Installer shadcn/ui

### Phase 2 : Auth (40min)
5. Copier les composants auth du Projet 1
6. Créer les pages sign-in et sign-up
7. Configurer le middleware

### Phase 3 : Création de liens (1h30)
8. Créer le formulaire de création
9. Implémenter Server Action `createLink`
10. Générer shortCode avec nanoid
11. Valider l'URL avec Zod
12. Afficher le lien généré avec copie

### Phase 4 : Dashboard (1h30)
13. Créer la page dashboard
14. Implémenter Server Action `getUserLinks`
15. Créer le composant LinkCard
16. Créer le composant LinkTable
17. Ajouter bouton copier et supprimer

### Phase 5 : Redirection (1h)
18. Créer la page dynamique `[shortCode]`
19. Récupérer le lien depuis la DB
20. Enregistrer le clic
21. Faire la redirection
22. Gérer le cas 404

### Phase 6 : Analytics (1h)
23. Créer la page de détails d'un lien
24. Implémenter Server Action `getLinkAnalytics`
25. Afficher les stats
26. Lister les derniers clics

### Phase 7 : UX (40min)
27. Ajouter toast notifications
28. Responsive design
29. États de chargement
30. Messages d'erreur

## Critères d'acceptation

### Création de liens
- [ ] Un utilisateur connecté peut créer un lien court
- [ ] L'URL originale doit être valide (http/https)
- [ ] Le shortCode généré est unique (6 caractères)
- [ ] Un titre optionnel peut être ajouté
- [ ] Le lien généré est affiché immédiatement
- [ ] Bouton "Copier" fonctionne et affiche feedback

### Dashboard
- [ ] Liste de tous les liens de l'utilisateur
- [ ] Affichage du nombre de clics pour chaque lien
- [ ] Date de création visible
- [ ] Liens triés par date (plus récents en premier)
- [ ] Bouton supprimer avec confirmation
- [ ] Message si aucun lien

### Redirection
- [ ] Visite de `/abc123` redirige vers l'URL originale
- [ ] Le clic est enregistré en base
- [ ] Page 404 si shortCode inexistant
- [ ] Redirection rapide (< 200ms)

### Analytics
- [ ] Page de détails accessible depuis le dashboard
- [ ] Affichage du total de clics
- [ ] Liste des derniers clics (date, user-agent)
- [ ] Statistiques : clics par jour, dernier clic

### Sécurité
- [ ] Validation de l'URL côté serveur
- [ ] Protection contre les URLs malveillantes
- [ ] Un utilisateur ne peut supprimer que ses liens
- [ ] Middleware protège les routes dashboard

### UI/UX
- [ ] Design responsive (mobile/desktop)
- [ ] Feedback visuel (toast, loading)
- [ ] Copie dans presse-papier fonctionne
- [ ] Messages d'erreur clairs

## Fonctionnalités Bonus

### Niveau 1 (Facile)
- [ ] **Custom short code** : Permettre de choisir le shortCode
- [ ] **QR Code** : Générer un QR code pour chaque lien
- [ ] **Export CSV** : Exporter tous les liens en CSV
- [ ] **Recherche** : Filtrer les liens par titre ou URL

### Niveau 2 (Intermédiaire)
- [ ] **Expiration** : Ajouter une date d'expiration aux liens
- [ ] **Limite de clics** : Désactiver après X clics
- [ ] **Graphique** : Chart.js pour visualiser les clics par jour
- [ ] **Tags** : Organiser les liens par tags

### Niveau 3 (Avancé)
- [ ] **Custom domain** : Support de domaines personnalisés
- [ ] **Analytics avancés** : Pays, device, browser
- [ ] **API publique** : Endpoint pour créer des liens via API
- [ ] **Link preview** : Afficher un aperçu avant redirection

## Ressources

### Documentation officielle
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js Redirects](https://nextjs.org/docs/app/api-reference/functions/redirect)
- [nanoid](https://github.com/ai/nanoid)
- [Prisma Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

### Tutoriels recommandés
- [Building a URL Shortener](https://www.youtube.com/results?search_query=nextjs+url+shortener)
- [Server Actions Deep Dive](https://www.youtube.com/watch?v=O94ESaJtZtM)

### Exemples de code
- [shadcn/ui Table](https://ui.shadcn.com/docs/components/table)
- [shadcn/ui Dialog](https://ui.shadcn.com/docs/components/dialog)

## Conseils

### Génération de shortCode
```typescript
import { customAlphabet } from 'nanoid';

// Alphabet sans caractères ambigus (0, O, I, l)
const nanoid = customAlphabet('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 6);

export function generateShortCode(): string {
  return nanoid();
}
```

### Validation d'URL
```typescript
import { z } from 'zod';

const linkSchema = z.object({
  originalUrl: z.string().url().startsWith('http'),
  title: z.string().max(100).optional(),
});
```

### Copier dans le presse-papier
```typescript
async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
  // Afficher toast de succès
}
```

### Performance
- ✅ Utiliser `select` Prisma pour ne récupérer que les champs nécessaires
- ✅ Index sur `shortCode` pour les recherches rapides
- ✅ Lazy load des analytics (ne charger que si demandé)
- ✅ Cache les redirections populaires (optionnel)

## Déploiement

### Configuration Vercel
```bash
# Variables d'environnement Vercel
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=https://votre-app.vercel.app
NEXT_PUBLIC_APP_URL=https://votre-app.vercel.app
```

### Optimisations
- Activer Edge Runtime pour les redirections (optionnel)
- Configurer le cache pour `/[shortCode]`
- Ajouter rate limiting sur création de liens

## Checklist finale

- [ ] Tous les critères d'acceptation validés
- [ ] Code commit sur GitHub avec README
- [ ] App déployée sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Migrations Prisma appliquées en prod
- [ ] Tests manuels complets (création, redirection, suppression)
- [ ] Design responsive
- [ ] Performance (redirections < 200ms)

---

**Félicitations !** 🎉

Vous avez créé un raccourcisseur d'URL fonctionnel avec analytics. Passez au **Projet 3 : Markdown Notes** pour apprendre à gérer un CRUD complet avec éditeur riche.
