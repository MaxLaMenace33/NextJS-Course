# Projet 1 : Auth Starter Kit

## Description

Créez un **système d'authentification complet** avec inscription, connexion, déconnexion, et gestion de profil utilisateur. Ce projet est la fondation de nombreuses applications web et vous permettra de maîtriser BetterAuth avec Next.js 15.

## Objectifs pédagogiques

À la fin de ce projet, vous saurez :
- ✅ Configurer BetterAuth de A à Z
- ✅ Implémenter inscription et connexion
- ✅ Gérer les sessions utilisateur
- ✅ Protéger des routes avec middleware
- ✅ Créer des formulaires avec validation
- ✅ Gérer les états de chargement et erreurs
- ✅ Mettre à jour un profil utilisateur

## Tech Stack

### Core
- **Next.js 15** : Framework React
- **TypeScript** : Typage statique
- **React 19** : UI library

### Authentification
- **BetterAuth 1.x** : Solution auth moderne

### Base de données
- **Prisma 6.x** : ORM TypeScript
- **PostgreSQL** : Base relationnelle

### UI
- **Tailwind CSS** : Styling
- **shadcn/ui** : Composants UI

### Validation
- **Zod** : Validation de schémas

## Installation

```bash
# Créer le projet
pnpm create next-app@latest auth-starter --typescript --tailwind --app --src-dir --import-alias "@/*"
cd auth-starter

# Installer les dépendances
pnpm add better-auth prisma @prisma/client zod bcryptjs
pnpm add -D @types/bcryptjs

# Installer shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input label card form

# Initialiser Prisma
pnpm prisma init
```

## User Stories

### En tant que visiteur

- ✅ Je veux **m'inscrire** avec email et mot de passe afin de créer un compte
- ✅ Je veux **me connecter** avec mes identifiants afin d'accéder à mon espace personnel
- ✅ Je veux voir un **message d'erreur clair** si mes identifiants sont incorrects

### En tant qu'utilisateur connecté

- ✅ Je veux **me déconnecter** pour sécuriser mon compte
- ✅ Je veux **voir mon profil** avec mes informations personnelles
- ✅ Je veux **modifier mon nom** pour personnaliser mon compte
- ✅ Je veux **accéder au dashboard** protégé par authentification

### En tant qu'utilisateur non connecté

- ✅ Je veux être **redirigé vers la page de connexion** si j'essaie d'accéder au dashboard
- ✅ Je ne veux **pas pouvoir accéder aux pages protégées** sans être authentifié

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
```

## Architecture des Routes

```
src/
├── app/
│   ├── layout.tsx                  # Layout racine
│   ├── page.tsx                    # Homepage (publique)
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx           # Page de connexion
│   │   └── sign-up/
│   │       └── page.tsx           # Page d'inscription
│   ├── (protected)/
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Dashboard (protégé)
│   │   └── profile/
│   │       └── page.tsx           # Page profil (protégé)
│   └── api/
│       └── auth/
│           └── [...betterauth]/
│               └── route.ts        # API routes BetterAuth
├── components/
│   ├── auth/
│   │   ├── sign-in-form.tsx       # Formulaire de connexion
│   │   ├── sign-up-form.tsx       # Formulaire d'inscription
│   │   └── sign-out-button.tsx    # Bouton de déconnexion
│   ├── ui/                         # Composants shadcn/ui
│   └── navbar.tsx                  # Navbar avec état auth
├── lib/
│   ├── auth.ts                     # Configuration BetterAuth
│   ├── db.ts                       # Client Prisma
│   └── utils.ts                    # Utilitaires (cn, etc.)
└── middleware.ts                   # Protection des routes
```

## Composants à créer

### 1. `src/components/navbar.tsx`
Navbar avec bouton sign-in/out selon l'état d'authentification.

### 2. `src/components/auth/sign-in-form.tsx`
Formulaire de connexion avec email et password, validation Zod, gestion erreurs.

### 3. `src/components/auth/sign-up-form.tsx`
Formulaire d'inscription avec email, password, confirmation password.

### 4. `src/components/auth/sign-out-button.tsx`
Bouton de déconnexion avec confirmation optionnelle.

### 5. `src/lib/auth.ts`
Configuration BetterAuth avec stratégie credentials.

### 6. `src/lib/db.ts`
Export du client Prisma (singleton).

### 7. `src/middleware.ts`
Middleware Next.js pour protéger les routes `/dashboard` et `/profile`.

## Variables d'environnement

Créez un fichier `.env` :

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/auth_starter"

# BetterAuth
BETTER_AUTH_SECRET="votre-secret-aleatoire-32-caracteres-minimum"
BETTER_AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

## Étapes de développement

### Phase 1 : Setup (30min)
1. Créer le projet Next.js
2. Installer toutes les dépendances
3. Configurer Prisma et créer la DB
4. Installer shadcn/ui

### Phase 2 : Base de données (20min)
5. Copier le schema Prisma
6. Exécuter `pnpm prisma migrate dev --name init`
7. Générer le client Prisma
8. Créer `src/lib/db.ts`

### Phase 3 : BetterAuth (40min)
9. Créer `src/lib/auth.ts` avec configuration
10. Créer API route `api/auth/[...betterauth]/route.ts`
11. Tester l'endpoint `/api/auth/session`

### Phase 4 : Formulaires (1h30)
12. Créer le formulaire d'inscription
13. Créer le formulaire de connexion
14. Ajouter validation Zod
15. Gérer les états de chargement et erreurs

### Phase 5 : Pages (1h)
16. Créer page `/sign-in`
17. Créer page `/sign-up`
18. Créer page `/dashboard` (protégée)
19. Créer page `/profile` (protégée)

### Phase 6 : Protection (30min)
20. Créer middleware pour protéger les routes
21. Tester la redirection si non authentifié

### Phase 7 : Navbar (30min)
22. Créer navbar avec état auth
23. Ajouter bouton sign-out

### Phase 8 : Profile (40min)
24. Formulaire de modification du profil
25. Server Action pour update
26. Optimistic update (optionnel)

## Critères d'acceptation

### Inscription
- [ ] L'utilisateur peut s'inscrire avec email et mot de passe
- [ ] Le mot de passe doit avoir au moins 8 caractères
- [ ] L'email doit être valide et unique
- [ ] Message d'erreur si l'email existe déjà
- [ ] Redirection vers `/dashboard` après inscription

### Connexion
- [ ] L'utilisateur peut se connecter avec email et mot de passe
- [ ] Message d'erreur si identifiants incorrects
- [ ] Redirection vers `/dashboard` après connexion
- [ ] Lien vers page d'inscription si pas de compte

### Déconnexion
- [ ] Bouton "Se déconnecter" visible quand connecté
- [ ] Redirection vers `/` après déconnexion
- [ ] Session supprimée correctement

### Protection de routes
- [ ] `/dashboard` accessible uniquement si connecté
- [ ] `/profile` accessible uniquement si connecté
- [ ] Redirection vers `/sign-in` si tentative d'accès non auth
- [ ] Pages `/sign-in` et `/sign-up` accessibles sans auth

### Profil utilisateur
- [ ] Affichage de l'email utilisateur
- [ ] Affichage du nom (ou "Non renseigné")
- [ ] Formulaire de modification du nom
- [ ] Message de succès après modification

### UI/UX
- [ ] Design responsive (mobile/desktop)
- [ ] États de chargement visibles (spinners, disabled buttons)
- [ ] Messages d'erreur clairs et en français
- [ ] Navbar avec état auth (Sign In vs Sign Out)

## Fonctionnalités Bonus

### Niveau 1 (Facile)
- [ ] **Toast notifications** : Utiliser sonner pour les messages de succès/erreur
- [ ] **Avatar** : Afficher les initiales de l'utilisateur dans un cercle
- [ ] **Dark mode** : Ajouter un toggle dark/light mode
- [ ] **Remember me** : Checkbox pour prolonger la session

### Niveau 2 (Intermédiaire)
- [ ] **Email verification** : Envoyer un email de vérification à l'inscription
- [ ] **Forgot password** : Flux de réinitialisation du mot de passe
- [ ] **OAuth** : Ajouter sign-in avec Google/GitHub
- [ ] **2FA** : Ajouter l'authentification à deux facteurs

### Niveau 3 (Avancé)
- [ ] **Rate limiting** : Limiter les tentatives de connexion
- [ ] **Session management** : Page listant toutes les sessions actives
- [ ] **Activity log** : Historique des connexions
- [ ] **Account deletion** : Permet de supprimer son compte

## Ressources

### Documentation officielle
- [Next.js App Router](https://nextjs.org/docs/app)
- [BetterAuth](https://www.better-auth.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)

### Tutoriels recommandés
- [BetterAuth Quick Start](https://www.better-auth.com/docs/quick-start)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/building-your-application/authentication)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)

### Exemples de code
- [BetterAuth Examples](https://github.com/better-auth/better-auth/tree/main/examples)
- [shadcn/ui Form Examples](https://ui.shadcn.com/docs/components/form)

## Conseils

### Sécurité
- ⚠️ **Jamais** stocker les mots de passe en clair
- ✅ Utiliser bcrypt pour hasher (BetterAuth le fait automatiquement)
- ✅ Valider côté serveur ET client
- ✅ Utiliser HTTPS en production
- ✅ Définir des CORS appropriés

### Performance
- ✅ Utiliser les Server Components quand possible
- ✅ Client Components uniquement pour l'interactivité
- ✅ Optimiser les requêtes Prisma (select les champs nécessaires)

### DX (Developer Experience)
- ✅ Typer toutes les fonctions et composants
- ✅ Utiliser des noms de variables explicites
- ✅ Commenter le code complexe
- ✅ Commit fréquemment avec messages clairs

## Déploiement

### Préparer le déploiement
1. Créer une base PostgreSQL sur [Neon](https://neon.tech) ou [Supabase](https://supabase.com)
2. Copier la `DATABASE_URL` dans les variables d'environnement Vercel
3. Générer un `BETTER_AUTH_SECRET` : `openssl rand -base64 32`
4. Définir `BETTER_AUTH_URL` avec votre domaine Vercel

### Déployer sur Vercel
```bash
# Installer Vercel CLI
pnpm add -g vercel

# Déployer
vercel

# Lancer les migrations en production
pnpm prisma migrate deploy
```

### Variables d'environnement Vercel
```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=https://votre-app.vercel.app
```

## Checklist finale

Avant de considérer le projet terminé :

- [ ] Tous les critères d'acceptation sont validés
- [ ] Le code est commit sur GitHub
- [ ] Le README du projet est à jour
- [ ] L'application est déployée sur Vercel
- [ ] Les variables d'environnement sont configurées
- [ ] Les migrations Prisma sont appliquées en prod
- [ ] L'app fonctionne en production
- [ ] Aucune erreur dans la console
- [ ] Le design est responsive
- [ ] Les formulaires ont une validation

---

**Félicitations !** 🎉

Vous avez créé votre premier système d'authentification complet avec Next.js 15 et BetterAuth. Vous pouvez maintenant passer au **Projet 2 : URL Shortener** qui réutilisera ce système d'auth.
