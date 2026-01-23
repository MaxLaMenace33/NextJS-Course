# Séance 3 : Data Fetching

## 📚 Théorie

### Fetch dans Server Components

```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Cache 1 heure
  });

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Options de Cache

```tsx
// Static (par défaut)
fetch('https://api.example.com/data'); // Cached

// Dynamic (toujours frais)
fetch('https://api.example.com/data', { cache: 'no-store' });

// Revalidation périodique
fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalide toutes les 60s
});
```

### Streaming avec Suspense

```tsx
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>Données chargées !</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Ma Page</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

### Loading States

```tsx
// app/posts/loading.tsx
export default function Loading() {
  return <div>Chargement des posts...</div>;
}
```

### Error Handling

```tsx
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Une erreur est survenue !</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
```

## 🎯 Exercices

1. Créez une page qui fetch des données
2. Implémentez Suspense et loading states
3. Gérez les erreurs
