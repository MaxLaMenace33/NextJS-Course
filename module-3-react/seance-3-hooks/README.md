# Séance 3 : Hooks Essentiels

## 📚 Théorie

### useEffect

```tsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // S'exécute après le rendu
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);

    // Cleanup (optionnel)
    return () => {
      console.log('Cleanup');
    };
  }, []); // Dépendances : [] = une seule fois

  return <div>{data}</div>;
}
```

### useRef

```tsx
import { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

### useMemo et useCallback

```tsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items }: { items: number[] }) {
  // Mémorise le résultat
  const sum = useMemo(() => {
    return items.reduce((a, b) => a + b, 0);
  }, [items]);

  // Mémorise la fonction
  const handleClick = useCallback(() => {
    console.log(sum);
  }, [sum]);

  return <button onClick={handleClick}>Total: {sum}</button>;
}
```

## 🎯 Exercices

Voir [exercice.tsx](./exercice.tsx) et [correction.tsx](./correction.tsx).
