// 📝 Exercice 1 : Types primitifs
// Ajoutez les annotations de type appropriées

// 1. Déclarez une variable firstName de type string
// const firstName VOTRE CODE ICI = "Alice";

// 2. Déclarez une variable age de type number
// const age VOTRE CODE ICI = 25;

// 3. Déclarez une variable isStudent de type boolean
// const isStudent VOTRE CODE ICI = true;

// 4. Déclarez un tableau de nombres
// const scores VOTRE CODE ICI = [85, 90, 78, 92];

// 5. Déclarez un tuple [string, number, boolean]
// const userInfo VOTRE CODE ICI = ["Bob", 30, false];


// 📝 Exercice 2 : Union types

// 1. Créez un type qui accepte string OU number
// let identifier VOTRE CODE ICI;
// identifier = "abc";
// identifier = 123;

// 2. Créez une fonction formatValue qui prend string | number et retourne string
// function formatValue(value VOTRE CODE ICI) VOTRE CODE ICI {
//   return `Value: ${value}`;
// }


// 📝 Exercice 3 : Literal types

// 1. Créez un type status qui peut être "pending" | "success" | "error"
// let status VOTRE CODE ICI;
// status = "pending";

// 2. Créez un type theme qui peut être "light" | "dark"
// type Theme = VOTRE CODE ICI;
// let currentTheme: Theme = "light";


// 📝 Exercice 4 : Types pour objets

// 1. Créez un objet user avec name (string), age (number), email (string optionnel)
// const user VOTRE CODE ICI = {
//   name: "Alice",
//   age: 25
// };

// 2. Créez un objet avec une propriété readonly
// const config VOTRE CODE ICI = {
//   apiUrl: "https://api.example.com",
//   timeout: 5000
// };
// config.timeout = 10000; // Devrait être OK
// config.apiUrl = "new"; // Devrait être une erreur


// 📝 Exercice 5 : Types pour fonctions

// 1. Créez une fonction add qui prend deux numbers et retourne un number
// function add(VOTRE CODE ICI) VOTRE CODE ICI {
//   return a + b;
// }

// 2. Créez une fonction greet avec un paramètre optionnel lastName
// function greet(firstName: string, VOTRE CODE ICI) VOTRE CODE ICI {
//   return lastName ? `Hello ${firstName} ${lastName}` : `Hello ${firstName}`;
// }

// 3. Créez une fonction avec paramètre par défaut
// function createGreeting(name VOTRE CODE ICI) VOTRE CODE ICI {
//   return `Welcome, ${name}!`;
// }

// 4. Créez une fonction avec rest parameters
// function sumAll(VOTRE CODE ICI) VOTRE CODE ICI {
//   return numbers.reduce((acc, n) => acc + n, 0);
// }


// 📝 Exercice 6 : Type inference

// 1. Laissez TypeScript inférer les types (pas d'annotations)
// const inferredString = "Hello";
// const inferredNumber = 42;
// const inferredArray = [1, 2, 3];

// 2. Créez une fonction où le type de retour est inféré
// function multiply(a: number, b: number) {
//   return a * b; // Type de retour inféré
// }


// 📝 Exercice 7 : Type assertions

// 1. Récupérez un élément du DOM et assertez son type
// const inputElement = VOTRE CODE ICI as HTMLInputElement;

// 2. Utilisez type assertion avec unknown
// const value: unknown = "hello world";
// const strLength = VOTRE CODE ICI;


// 🧪 Pour tester : npx ts-node exercice.ts
// Ou compilez : tsc exercice.ts && node exercice.js
