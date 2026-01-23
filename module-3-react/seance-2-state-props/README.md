# Séance 2 : State et Props

## 📚 Théorie

### useState

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(c => c + 1)}>+1 (fonctionnel)</button>
    </div>
  );
}
```

### useState avec TypeScript

```tsx
// Type inféré
const [name, setName] = useState("Alice"); // string

// Type explicite
const [age, setAge] = useState<number>(25);

// Avec interface
interface User {
  name: string;
  age: number;
}

const [user, setUser] = useState<User>({ name: "Alice", age: 25 });
```

### Événements

```tsx
function Form() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

## 🎯 Exercices

Voir [exercice.tsx](./exercice.tsx) et [correction.tsx](./correction.tsx).
