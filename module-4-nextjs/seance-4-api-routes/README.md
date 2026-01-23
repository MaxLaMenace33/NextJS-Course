# Séance 4 : API Routes et Server Actions

## 📚 Théorie

### Route Handlers (API Routes)

```tsx
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: 'Data received',
    data: body
  });
}
```

### Dynamic API Routes

```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  });

  return NextResponse.json(user);
}
```

### Server Actions

```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const post = await db.post.create({
    data: { title, content }
  });

  return { success: true, post };
}
```

### Utilisation de Server Actions

```tsx
// app/create-post/page.tsx
import { createPost } from '@/app/actions';

export default function CreatePostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Titre" required />
      <textarea name="content" placeholder="Contenu" required />
      <button type="submit">Créer</button>
    </form>
  );
}
```

### Server Actions avec Client Components

```tsx
'use client'

import { useState } from 'react';
import { createPost } from '@/app/actions';

export default function CreatePostForm() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await createPost(formData);
    setPending(false);
    console.log(result);
  }

  return (
    <form action={handleSubmit}>
      <input name="title" />
      <textarea name="content" />
      <button disabled={pending}>
        {pending ? 'Création...' : 'Créer'}
      </button>
    </form>
  );
}
```

## 🎯 Exercices

1. Créez des API routes
2. Implémentez des Server Actions
3. Créez un formulaire avec mutations
