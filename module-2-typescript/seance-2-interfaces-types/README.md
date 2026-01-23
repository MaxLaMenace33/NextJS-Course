# Séance 2 : Interfaces et Types

## 📚 Théorie

### Interfaces

```typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optionnel
  readonly id: string; // Readonly
}

const user: User = {
  id: "123",
  name: "Alice",
  age: 25
};

// Extension d'interfaces
interface Admin extends User {
  role: string;
  permissions: string[];
}

const admin: Admin = {
  id: "456",
  name: "Bob",
  age: 30,
  role: "admin",
  permissions: ["read", "write"]
};
```

### Type Aliases

```typescript
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Types union
type Status = "pending" | "success" | "error";

// Types intersection
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type TimestampedUser = User & Timestamped;
```

### Interface vs Type

```typescript
// ✅ Interface : peut être étendue/fusionnée
interface Window {
  title: string;
}

interface Window {
  size: number; // Fusion avec l'interface précédente
}

// ✅ Type : union et intersection
type Theme = "light" | "dark";
type Color = "red" | "blue" | "green";
type ThemedColor = Theme | Color;

// Règle : Interfaces pour objets, Types pour unions/intersections
```

## 🎯 Exercices

Voir [exercice.ts](./exercice.ts) et [correction.ts](./correction.ts).
