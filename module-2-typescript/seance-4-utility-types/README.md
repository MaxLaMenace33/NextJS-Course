# Séance 4 : Utility Types et Tips Avancés

## 📚 Théorie

### Utility Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial<T> : toutes les propriétés optionnelles
type PartialUser = Partial<User>;
const updateUser: PartialUser = { name: "Alice" }; // ✅ OK

// Required<T> : toutes les propriétés obligatoires
type RequiredUser = Required<User>;

// Pick<T, K> : sélectionner certaines propriétés
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: "1", name: "Alice" };

// Omit<T, K> : exclure certaines propriétés
type UserWithoutEmail = Omit<User, "email">;

// Readonly<T> : toutes les propriétés en readonly
type ReadonlyUser = Readonly<User>;

// Record<K, T> : créer un objet avec clés typées
type UserRoles = Record<string, "admin" | "user">;
const roles: UserRoles = {
  alice: "admin",
  bob: "user"
};
```

### Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript sait que c'est un string
  } else {
    console.log(value.toFixed(2)); // TypeScript sait que c'est un number
  }
}
```

## 🎯 Exercices

Voir [exercice.ts](./exercice.ts) et [correction.ts](./correction.ts).
