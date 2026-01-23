# Séance 3 : Generics

## 📚 Théorie

### Introduction aux Generics

```typescript
// Sans generics
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}

// Avec generics (réutilisable)
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = getFirst<number>([1, 2, 3]); // number
const firstStr = getFirst<string>(["a", "b"]); // string
const firstAuto = getFirst([true, false]); // boolean (inféré)
```

### Generics avec Interfaces

```typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
```

### Contraintes

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // ✅ string a length
logLength([1, 2, 3]); // ✅ array a length
// logLength(42); // ❌ number n'a pas length
```

## 🎯 Exercices

Voir [exercice.ts](./exercice.ts) et [correction.ts](./correction.ts).
