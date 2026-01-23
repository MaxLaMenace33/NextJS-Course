# Séance 2 : Routing et Navigation

## 📚 Théorie

### File-based Routing

```
app/
├── page.tsx                    # / (homepage)
├── about/
│   └── page.tsx                # /about
├── blog/
│   ├── page.tsx                # /blog
│   └── [slug]/
│       └── page.tsx            # /blog/[slug] (dynamic)
└── dashboard/
    ├── layout.tsx              # Layout pour /dashboard
    ├── page.tsx                # /dashboard
    └── settings/
        └── page.tsx            # /dashboard/settings
```

### Dynamic Routes

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  return <h1>Article : {params.slug}</h1>;
}

// Générer les pages statiques
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}
```

### Navigation avec Link

```tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/hello-world">Blog Post</Link>
    </nav>
  );
}
```

### Navigation Programmatique

```tsx
'use client'

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    // Logique de connexion
    router.push('/dashboard');
  };

  return <button onClick={handleLogin}>Se connecter</button>;
}
```

### Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```

### Route Groups

```tsx
// Grouper sans affecter l'URL
app/
├── (marketing)/
│   ├── layout.tsx
│   ├── page.tsx            # /
│   └── about/
│       └── page.tsx        # /about
└── (app)/
    ├── layout.tsx
    ├── dashboard/
    │   └── page.tsx        # /dashboard
    └── settings/
        └── page.tsx        # /settings
```

## 🎯 Exercices

1. Créez une structure de routing complète
2. Ajoutez des routes dynamiques
3. Implémentez la navigation
