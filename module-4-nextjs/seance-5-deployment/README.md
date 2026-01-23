# Séance 5 : Optimisation et Déploiement

## 📚 Théorie

### Image Optimization

```tsx
import Image from 'next/image';

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority // Charge en priorité
    />
  );
}

// Images externes
<Image
  src="https://example.com/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
/>
```

### Font Optimization

```tsx
// app/layout.tsx
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Metadata et SEO

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon Site',
  description: 'Description pour SEO',
  keywords: ['Next.js', 'React', 'SEO'],
  openGraph: {
    title: 'Mon Site',
    description: 'Description',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Site',
    description: 'Description',
    images: ['/twitter-image.jpg'],
  },
};
```

### Metadata Dynamique

```tsx
export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const post = await fetch(`https://api.example.com/posts/${params.id}`)
    .then(res => res.json());

  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

### Variables d'Environnement

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
SECRET_KEY=super-secret
```

```tsx
// Utilisation
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Client et Server
const dbUrl = process.env.DATABASE_URL; // Server uniquement
```

### Déploiement sur Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# 4. Déployer en production
vercel --prod
```

### Configuration next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
  },
  env: {
    CUSTOM_KEY: 'value',
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### Build et Production

```bash
# Build de production
npm run build

# Démarrer le serveur de production
npm start

# Analyser le bundle
npm run build -- --analyze
```

## 🎯 Exercices

1. Optimisez les images de votre app
2. Ajoutez des metadata pour le SEO
3. Déployez sur Vercel

## 🎓 Félicitations !

Vous avez terminé le cours complet Next.js !

### Ce que vous avez appris :

1. **JavaScript** : Bases solides et tips avancés
2. **TypeScript** : Typage et bonnes pratiques
3. **React** : Composants, hooks, context
4. **Next.js** : App Router, data fetching, déploiement

### Prochaines Étapes :

- Construisez un projet personnel
- Explorez l'écosystème Next.js (Prisma, tRPC, etc.)
- Contribuez à des projets open source
- Partagez vos créations !

**Bon développement !** 🚀
