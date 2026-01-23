// ✅ Correction - Séance 1 : Les Bases de TypeScript

// 📝 Exercice 1 : Types primitifs

const firstName: string = "Alice";
const age: number = 25;
const isStudent: boolean = true;
const scores: number[] = [85, 90, 78, 92];
const userInfo: [string, number, boolean] = ["Bob", 30, false];

console.log("=== Exercice 1 ===");
console.log({ firstName, age, isStudent, scores, userInfo });


// 📝 Exercice 2 : Union types

let identifier: string | number;
identifier = "abc";
identifier = 123;

function formatValue(value: string | number): string {
  return `Value: ${value}`;
}

console.log("\n=== Exercice 2 ===");
console.log(formatValue("hello")); // "Value: hello"
console.log(formatValue(42)); // "Value: 42"


// 📝 Exercice 3 : Literal types

let status: "pending" | "success" | "error";
status = "pending";
status = "success";

type Theme = "light" | "dark";
let currentTheme: Theme = "light";

console.log("\n=== Exercice 3 ===");
console.log({ status, currentTheme });


// 📝 Exercice 4 : Types pour objets

const user: { name: string; age: number; email?: string } = {
  name: "Alice",
  age: 25
};

const config: { readonly apiUrl: string; timeout: number } = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
config.timeout = 10000; // ✅ OK
// config.apiUrl = "new"; // ❌ Erreur (readonly)

console.log("\n=== Exercice 4 ===");
console.log({ user, config });


// 📝 Exercice 5 : Types pour fonctions

function add(a: number, b: number): number {
  return a + b;
}

function greet(firstName: string, lastName?: string): string {
  return lastName ? `Hello ${firstName} ${lastName}` : `Hello ${firstName}`;
}

function createGreeting(name: string = "Guest"): string {
  return `Welcome, ${name}!`;
}

function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log("\n=== Exercice 5 ===");
console.log(add(5, 3)); // 8
console.log(greet("Alice")); // "Hello Alice"
console.log(greet("Alice", "Smith")); // "Hello Alice Smith"
console.log(createGreeting()); // "Welcome, Guest!"
console.log(createGreeting("Bob")); // "Welcome, Bob!"
console.log(sumAll(1, 2, 3, 4, 5)); // 15


// 📝 Exercice 6 : Type inference

const inferredString = "Hello"; // string (inféré)
const inferredNumber = 42; // number (inféré)
const inferredArray = [1, 2, 3]; // number[] (inféré)

function multiply(a: number, b: number) {
  return a * b; // Retour inféré : number
}

console.log("\n=== Exercice 6 ===");
console.log(multiply(4, 5)); // 20


// 📝 Exercice 7 : Type assertions

// En environnement DOM (navigateur)
// const inputElement = document.getElementById("myInput") as HTMLInputElement;
// inputElement.value = "Hello";

// Avec unknown
const value: unknown = "hello world";
const strLength = (value as string).length;

console.log("\n=== Exercice 7 ===");
console.log("String length:", strLength); // 11


// 💡 Points clés
console.log("\n=== Points clés ===");
console.log("✅ Annotations de type : explicites");
console.log("✅ Type inference : automatique");
console.log("✅ Union types : plusieurs types possibles");
console.log("✅ Literal types : valeurs exactes");
console.log("✅ Optionnel : propriété?");
console.log("✅ Readonly : propriété non modifiable");

// Pour exécuter : npx ts-node correction.ts
