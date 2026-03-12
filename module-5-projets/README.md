# Module 5 : Projets d'Entraînement

## Vue d'ensemble

Ce module contient **5 projets pratiques** conçus pour mettre en application toutes les connaissances acquises dans les modules précédents. Chaque projet est une **"one-feature app"** : une application complète focalisée sur une fonctionnalité spécifique, avec un cahier des charges précis et une tech stack imposée.

## Objectifs pédagogiques

- **Appliquer** les concepts de Next.js 15, React, TypeScript en situation réelle
- **Maîtriser** des bibliothèques modernes (BetterAuth, Prisma, shadcn/ui)
- **Construire** des applications complètes from scratch
- **Développer** des bonnes pratiques (architecture, sécurité, UX)
- **Acquérir de l'autonomie** sur des projets réels

## Projets (ordre conseillé)

### 1. Auth Starter Kit ⭐
**Difficulté** : Débutant
**Durée estimée** : 4-6 heures
**Fonctionnalité** : Système d'authentification complet

Authentification avec inscription, connexion, déconnexion, protection de routes et gestion de profil utilisateur.

**Ce que vous apprendrez** :
- Setup de BetterAuth de A à Z
- Session management et middleware Next.js
- Protection de pages et API routes
- Formulaires d'authentification avec validation
- Gestion des états de chargement et erreurs

**Stack** : Next.js 15 · BetterAuth · Prisma · PostgreSQL · Tailwind CSS · shadcn/ui

---

### 2. URL Shortener 🔗
**Difficulté** : Débutant/Intermédiaire
**Durée estimée** : 6-8 heures
**Fonctionnalité** : Raccourcisseur d'URL avec analytics

Créer des liens courts, dashboard personnel, compteur de clics, redirection automatique.

**Ce que vous apprendrez** :
- Server Actions pour la création de données
- Routes dynamiques et redirections Next.js
- Génération d'identifiants uniques (nanoid)
- Dashboard avec données utilisateur authentifié
- Analytics basiques (compteur de clics, date)

**Stack** : Next.js 15 · BetterAuth · Prisma · PostgreSQL · Tailwind CSS · shadcn/ui · nanoid

---

### 3. Markdown Notes 📝
**Difficulté** : Intermédiaire
**Durée estimée** : 8-10 heures
**Fonctionnalité** : Éditeur de notes Markdown

CRUD complet de notes, éditeur Markdown avec preview, organisation par tags, recherche.

**Ce que vous apprendrez** :
- Éditeur riche avec react-md-editor
- CRUD complet avec Server Actions
- Optimistic updates pour une UX fluide
- Système de tags et filtrage
- Recherche full-text

**Stack** : Next.js 15 · BetterAuth · Prisma · PostgreSQL · Tailwind CSS · shadcn/ui · react-md-editor

---

### 4. Waitlist App 📧
**Difficulté** : Intermédiaire
**Durée estimée** : 6-8 heures
**Fonctionnalité** : Page d'inscription avec emails automatiques

Formulaire waitlist, email de confirmation automatique, compteur public d'inscrits, admin dashboard.

**Ce que vous apprendrez** :
- Intégration Resend pour envoi d'emails
- Templates d'emails avec react-email
- Formulaire public sans authentification
- Rate limiting et validation côté serveur
- Dashboard d'administration

**Stack** : Next.js 15 · Prisma · PostgreSQL · Tailwind CSS · shadcn/ui · Resend · react-email

---

### 5. Image Gallery 🖼️
**Difficulté** : Intermédiaire/Avancé
**Durée estimée** : 10-12 heures
**Fonctionnalité** : Galerie d'images personnelle

Upload d'images, galerie responsive, suppression, aperçu lightbox, organisation par albums.

**Ce que vous apprendrez** :
- Upload de fichiers avec UploadThing
- Gestion du stockage cloud
- Galerie responsive avec CSS Grid
- Lightbox et navigation au clavier
- Optimisation d'images Next.js

**Stack** : Next.js 15 · BetterAuth · UploadThing · Prisma · PostgreSQL · Tailwind CSS · shadcn/ui

---

## Pré-requis

Avant de démarrer ces projets, vous devez avoir complété :
- ✅ Module 1 : JavaScript
- ✅ Module 2 : TypeScript
- ✅ Module 3 : React
- ✅ Module 4 : Next.js

## Outils nécessaires

### Installation locale
- **Node.js** 20+ : [nodejs.org](https://nodejs.org)
- **pnpm** (recommandé) : `npm install -g pnpm`
- **PostgreSQL** : [postgresql.org](https://www.postgresql.org/) ou Docker
- **Git** : pour le versioning

### Services externes (gratuits)
- **Vercel** : déploiement Next.js ([vercel.com](https://vercel.com))
- **Neon** ou **Supabase** : base PostgreSQL gratuite
- **UploadThing** : stockage d'images gratuit
- **Resend** : envoi d'emails gratuit (100/jour)

## Structure type d'un projet

Chaque cahier des charges suit la même structure :

1. **Description** : Vue d'ensemble du projet
2. **Objectifs pédagogiques** : Ce que vous allez apprendre
3. **Tech Stack** : Technologies utilisées avec commandes d'installation
4. **User Stories** : Fonctionnalités du point de vue utilisateur
5. **Schema Prisma** : Modèle de base de données complet
6. **Architecture** : Structure du dossier `app/`
7. **Composants** : Liste des composants à créer
8. **Variables d'environnement** : `.env.example` complet
9. **Critères d'acceptation** : Checklist de fin de projet
10. **Bonus** : Fonctionnalités optionnelles pour aller plus loin
11. **Ressources** : Documentation officielle

## Comment utiliser ces projets ?

### Approche recommandée

1. **Lisez le cahier des charges en entier** avant de coder
2. **Suivez l'ordre suggéré** (Auth Starter → ... → Image Gallery)
3. **Codez sans regarder la solution** (il n'y en a pas !) - c'est du vrai apprentissage
4. **Référez-vous aux modules précédents** si vous bloquez
5. **Prenez votre temps** - la qualité > vitesse
6. **Déployez votre projet** sur Vercel pour le portfolio

### Organisation du travail

**Session type (2-3h)** :
1. Setup du projet (create-next-app, installations)
2. Configuration (Prisma, BetterAuth, Tailwind)
3. Implémentation d'une feature
4. Tests manuels et debug
5. Commit Git

**Progression recommandée** :
- Projet 1-2 : Une session chacun (weekend)
- Projet 3-4 : Deux sessions chacun (semaine)
- Projet 5 : Trois sessions (projet final)

## Stack technique commune

Tous les projets partagent une base technique :

### Core
- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique
- **React 19** : UI library

### Base de données
- **Prisma** : ORM TypeScript
- **PostgreSQL** : Base relationnelle

### Styling
- **Tailwind CSS** : Utility-first CSS
- **shadcn/ui** : Composants UI réutilisables

### Authentification (Projets 1, 2, 3, 5)
- **BetterAuth** : Auth moderne pour Next.js

### Autres (selon projet)
- **nanoid** : Génération d'IDs courts (Projet 2)
- **react-md-editor** : Éditeur Markdown (Projet 3)
- **Resend** + **react-email** : Emails (Projet 4)
- **UploadThing** : Upload fichiers (Projet 5)

## Ressources

### Documentation officielle
- [Next.js](https://nextjs.org/docs)
- [BetterAuth](https://www.better-auth.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Communauté
- [Next.js Discord](https://nextjs.org/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

## Critères de réussite

À la fin de ces 5 projets, vous devriez être capable de :

✅ Créer une app Next.js 15 from scratch
✅ Intégrer un système d'authentification complet
✅ Gérer une base de données avec Prisma
✅ Implémenter des Server Actions
✅ Utiliser shadcn/ui efficacement
✅ Gérer les uploads de fichiers
✅ Envoyer des emails transactionnels
✅ Déployer sur Vercel
✅ Suivre les best practices (sécurité, performance, UX)

## Portfolio

Ces projets sont conçus pour **votre portfolio** :
- Code propre et documenté
- Fonctionnalités réelles et utilisables
- Déployés en production (Vercel)
- Tech stack moderne et recherchée

**Conseil** : Créez un repo GitHub public pour chaque projet et ajoutez-les à votre CV/LinkedIn.

---

## Prochaines étapes

1. Vérifiez que vous avez tous les pré-requis installés
2. Créez vos comptes sur les services externes (Vercel, Neon, etc.)
3. Commencez par le **Projet 1 : Auth Starter Kit**
4. Codez, apprenez, partagez !

**Bon courage et amusez-vous bien !** 🚀
