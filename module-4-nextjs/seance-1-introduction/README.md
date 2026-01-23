# Séance 1 : Introduction et Setup Next.js

## 📚 Théorie

### Structure d'un Projet Next.js (App Router)

```
my-nextjs-app/
├── app/
│   ├── layout.tsx          # Layout racine
│   ├── page.tsx            # Page d'accueil (/)
│   ├── about/
│   │   └── page.tsx        # Page /about
│   └── api/
│       └── route.ts        # API route
├── public/                 # Fichiers statiques
├── components/             # Composants réutilisables
├── lib/                    # Utilitaires
└── next.config.js          # Configuration Next.js
```

### Server Components vs Client Components

```tsx
// Server Component (par défaut dans app/)
// app/page.tsx
export default async function HomePage() {
  // Peut faire du fetch directement
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();

  return <div>{json.message}</div>;
}

// Client Component (avec "use client")
// app/counter.tsx
'use client'

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

### Quand utiliser quoi ?

**Server Components (par défaut)**
- Fetch de données
- Accès au backend
- Pas d'interactivité
- Meilleure performance

**Client Components ("use client")**
- État (useState)
- Événements (onClick, onChange)
- Hooks (useEffect, etc.)
- Browser APIs

### Layout.tsx

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

### Page.tsx

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Bienvenue sur Next.js</h1>
      <p>Page d'accueil</p>
    </main>
  );
}
```

### Metadata

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon App Next.js',
  description: 'Description de mon application',
};

export default function Page() {
  return <div>Contenu</div>;
}
```

## 🎯 Exercices

Créez un nouveau projet Next.js et expérimentez avec les Server et Client Components.
