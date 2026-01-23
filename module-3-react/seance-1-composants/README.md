# Séance 1 : Composants et JSX/TSX

## 📚 Théorie

### JSX/TSX

```tsx
// Composant simple
function Welcome() {
  return <h1>Bonjour !</h1>;
}

// Avec variables
function Greeting() {
  const name = "Alice";
  return <h1>Bonjour {name} !</h1>;
}

// Expressions JavaScript
function Counter() {
  const count = 5;
  return <p>Le double est : {count * 2}</p>;
}
```

### Props

```tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

function Button({ text, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {text}
    </button>
  );
}

// Usage
<Button text="Cliquez-moi" onClick={() => console.log("Cliqué!")} />
```

### Rendu Conditionnel

```tsx
function UserGreeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  // Avec if
  if (isLoggedIn) {
    return <h1>Bienvenue !</h1>;
  }
  return <h1>Connectez-vous</h1>;

  // Avec ternaire
  return (
    <h1>{isLoggedIn ? "Bienvenue !" : "Connectez-vous"}</h1>
  );

  // Avec &&
  return (
    <div>
      {isLoggedIn && <h1>Bienvenue !</h1>}
    </div>
  );
}
```

### Listes et Keys

```tsx
interface User {
  id: string;
  name: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 🎯 Exercices

Voir les fichiers d'exemples dans ce dossier.
