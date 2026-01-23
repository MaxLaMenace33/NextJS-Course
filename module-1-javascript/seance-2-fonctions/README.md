# Séance 2 : Fonctions et Scope

## 📚 Théorie

### Déclaration de Fonctions

```javascript
// Function declaration (hoisting activé)
function greet(name) {
  return `Bonjour ${name}`;
}

// Function expression
const greet2 = function(name) {
  return `Bonjour ${name}`;
};

// Arrow function (syntaxe moderne)
const greet3 = (name) => {
  return `Bonjour ${name}`;
};

// Arrow function (syntaxe courte - return implicite)
const greet4 = (name) => `Bonjour ${name}`;
```

### Arrow Functions - Règles

```javascript
// Sans paramètre
const sayHello = () => "Hello";

// Un seul paramètre (parenthèses optionnelles)
const double = x => x * 2;
const triple = (x) => x * 3; // Avec parenthèses (recommandé)

// Plusieurs paramètres
const add = (a, b) => a + b;

// Corps de fonction avec plusieurs lignes
const complexFunction = (x, y) => {
  const sum = x + y;
  const product = x * y;
  return { sum, product };
};

// Retourner un objet (attention aux parenthèses !)
const createUser = (name, age) => ({ name, age });
// Sans parenthèses : const createUser = (name, age) => { name, age }; // ❌ Erreur !
```

### Paramètres par Défaut

```javascript
// Ancienne méthode
function greetOld(name) {
  name = name || "Invité";
  return `Bonjour ${name}`;
}

// Méthode moderne (ES6+)
function greet(name = "Invité") {
  return `Bonjour ${name}`;
}

greet(); // "Bonjour Invité"
greet("Alice"); // "Bonjour Alice"

// Avec plusieurs paramètres
const calculatePrice = (price, tax = 0.20, shipping = 5) => {
  return price + (price * tax) + shipping;
};
```

### Scope (Portée)

```javascript
// Global scope
const globalVar = "accessible partout";

function example() {
  // Function scope
  const functionVar = "accessible dans la fonction";

  if (true) {
    // Block scope
    const blockVar = "accessible dans le bloc";
    let blockLet = "aussi dans le bloc";

    console.log(globalVar); // ✅ OK
    console.log(functionVar); // ✅ OK
    console.log(blockVar); // ✅ OK
  }

  console.log(globalVar); // ✅ OK
  console.log(functionVar); // ✅ OK
  // console.log(blockVar); // ❌ Erreur ! blockVar n'existe pas ici
}

// console.log(functionVar); // ❌ Erreur ! functionVar n'existe pas ici
```

### Closures

```javascript
// Une closure permet à une fonction d'accéder aux variables de sa fonction parente
function createCounter() {
  let count = 0; // Variable privée

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.decrement()); // 1
// console.log(count); // ❌ Erreur ! count n'est pas accessible directement
```

### Hoisting

```javascript
// Function declaration : hoisting activé
sayHello(); // ✅ Fonctionne !

function sayHello() {
  console.log("Hello");
}

// Function expression et arrow functions : PAS de hoisting
// sayGoodbye(); // ❌ Erreur !

const sayGoodbye = () => {
  console.log("Goodbye");
};
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
