# Séance 1 : Les Bases de TypeScript

## 📚 Théorie

### Types Primitifs

```typescript
// String
const name: string = "Alice";

// Number
const age: number = 25;
const price: number = 19.99;

// Boolean
const isActive: boolean = true;

// Array
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Tuple (tableau avec types fixes)
const person: [string, number] = ["Alice", 25];

// Any (à éviter)
let anything: any = "hello";
anything = 42; // OK mais pas recommandé

// Unknown (préférer à any)
let uncertain: unknown = "hello";
// uncertain.toUpperCase(); // ❌ Erreur
if (typeof uncertain === "string") {
  uncertain.toUpperCase(); // ✅ OK après vérification
}

// Void (pas de retour)
function logMessage(message: string): void {
  console.log(message);
}

// Never (jamais de retour)
function throwError(message: string): never {
  throw new Error(message);
}

// Null et Undefined
let nullable: null = null;
let undefinedValue: undefined = undefined;
```

### Type Inference

TypeScript déduit automatiquement les types.

```typescript
// Type inféré : string
let message = "Hello";
// message = 42; // ❌ Erreur

// Type inféré : number
let count = 0;

// Type inféré pour les fonctions
function add(a: number, b: number) {
  return a + b; // Retour inféré : number
}
```

### Union Types

```typescript
// Variable peut être string OU number
let id: string | number;
id = "abc123"; // ✅ OK
id = 123; // ✅ OK
// id = true; // ❌ Erreur

// Fonction avec union type
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}
```

### Literal Types

```typescript
// Type littéral
let direction: "north" | "south" | "east" | "west";
direction = "north"; // ✅ OK
// direction = "up"; // ❌ Erreur

// Avec nombres
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
```

### Types pour Objets

```typescript
// Annotation d'objet
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// Propriété optionnelle
const user2: { name: string; age?: number } = {
  name: "Bob"
  // age est optionnel
};

// Propriété readonly
const config: { readonly apiKey: string } = {
  apiKey: "secret"
};
// config.apiKey = "new"; // ❌ Erreur
```

### Types pour Fonctions

```typescript
// Typer les paramètres et le retour
function greet(name: string): string {
  return `Hello ${name}`;
}

// Fonction fléchée
const multiply = (a: number, b: number): number => a * b;

// Paramètre optionnel
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// Paramètre par défaut
function greetUser(name: string = "Guest"): string {
  return `Hello ${name}`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### Type Assertions

```typescript
// Quand vous en savez plus que TypeScript
const myCanvas = document.getElementById("canvas") as HTMLCanvasElement;

// Syntaxe alternative (pas utilisée en JSX/TSX)
const myCanvas2 = <HTMLCanvasElement>document.getElementById("canvas");
```

## 🎯 Exercices

Ouvrez le fichier [exercice.ts](./exercice.ts) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.ts](./correction.ts).
