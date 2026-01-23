# Séance 6 : Tips Avancés JavaScript

## 📚 Théorie

### Optional Chaining (?.)

Accéder à des propriétés imbriquées sans risquer d'erreur si une propriété n'existe pas.

```javascript
// Sans optional chaining
const user = {
  name: "Alice",
  address: {
    city: "Paris"
  }
};

// ❌ Risque d'erreur si address n'existe pas
// const city = user.address.city;

// ✅ Vérifications manuelles (verbose)
const city = user && user.address && user.address.city;

// ✅ Avec optional chaining (moderne)
const cityModern = user?.address?.city;
// Retourne undefined si une propriété n'existe pas

// Cas d'usage
const user2 = { name: "Bob" }; // Pas d'address
console.log(user2?.address?.city); // undefined (pas d'erreur)

// Avec des tableaux
const users = [{ name: "Alice" }, { name: "Bob" }];
console.log(users?.[0]?.name); // "Alice"
console.log(users?.[5]?.name); // undefined

// Avec des fonctions
const obj = {
  greet: () => "Hello"
};
console.log(obj.greet?.()); // "Hello"
console.log(obj.sayBye?.()); // undefined (pas d'erreur)
```

### Nullish Coalescing (??)

Fournir une valeur par défaut uniquement si la valeur est `null` ou `undefined`.

```javascript
// Avec || (problème avec 0, "", false)
const count = 0;
const result1 = count || 10; // 10 (❌ 0 est considéré comme falsy)

// Avec ?? (seulement null/undefined)
const result2 = count ?? 10; // 0 (✅ 0 est une valeur valide)

// Exemples
const value1 = null ?? "défaut"; // "défaut"
const value2 = undefined ?? "défaut"; // "défaut"
const value3 = "" ?? "défaut"; // "" (chaîne vide est valide)
const value4 = 0 ?? "défaut"; // 0
const value5 = false ?? "défaut"; // false

// Combiner avec optional chaining
const user = { name: "Alice" };
const city = user?.address?.city ?? "Ville non définie";
```

### Template Literals

```javascript
// Interpolation de variables
const name = "Alice";
const age = 25;
const message = `Bonjour ${name}, vous avez ${age} ans`;

// Expressions
const price = 99.99;
const quantity = 3;
const total = `Total: ${price * quantity}€`;

// Multi-lignes
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;

// Avec des fonctions
const greeting = `Bonjour ${name.toUpperCase()}`;

// Tagged templates (avancé)
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return `${acc}${str}<mark>${values[i] || ''}</mark>`;
  }, '');
}

const highlighted = highlight`Prix: ${price}€, Quantité: ${quantity}`;
```

### Short-Circuit Evaluation

```javascript
// && : retourne la première valeur falsy ou la dernière
true && "Hello"; // "Hello"
false && "Hello"; // false
null && "Hello"; // null

// Utilisation : exécuter du code conditionnellement
const isLoggedIn = true;
isLoggedIn && console.log("Bienvenue"); // Affiche "Bienvenue"

// || : retourne la première valeur truthy ou la dernière
false || "défaut"; // "défaut"
true || "défaut"; // true
"valeur" || "défaut"; // "valeur"

// Utilisation : valeur par défaut
const username = "" || "Invité"; // "Invité"
```

### Array Methods Avancés

```javascript
// flat() : aplatir un tableau
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6] (profondeur 2)

// flatMap() : map + flat
const sentences = ["Hello world", "How are you"];
const words = sentences.flatMap(s => s.split(" "));
// ["Hello", "world", "How", "are", "you"]

// at() : accès avec index négatif
const arr = [1, 2, 3, 4, 5];
console.log(arr.at(-1)); // 5 (dernier élément)
console.log(arr.at(-2)); // 4 (avant-dernier)

// from() : créer un tableau
const str = "Hello";
const chars = Array.from(str); // ["H", "e", "l", "l", "o"]

const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]
```

### Object Methods Avancés

```javascript
// Object.fromEntries() : inverse de Object.entries()
const entries = [["name", "Alice"], ["age", 25]];
const obj = Object.fromEntries(entries);
// { name: "Alice", age: 25 }

// Filtrer un objet
const user = { name: "Alice", age: 25, city: "Paris" };
const filtered = Object.fromEntries(
  Object.entries(user).filter(([key, value]) => typeof value === "string")
);
// { name: "Alice", city: "Paris" }

// Object.hasOwn() : vérifier une propriété
const obj2 = { name: "Alice" };
Object.hasOwn(obj2, "name"); // true
Object.hasOwn(obj2, "age"); // false
```

### Autres Tips Utiles

```javascript
// 1. Convertir en booléen
const isTrue = !!value;
const isFalse = Boolean(value);

// 2. Convertir en nombre
const num = +strNumber;
const num2 = Number(strNumber);

// 3. Arrondir des nombres
Math.floor(4.9); // 4 (vers le bas)
Math.ceil(4.1); // 5 (vers le haut)
Math.round(4.5); // 5 (au plus proche)
Math.trunc(4.9); // 4 (supprime les décimales)

// 4. Nombre aléatoire entre min et max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 5. Vérifier le type
Array.isArray([]); // true
typeof "text"; // "string"
value instanceof Date; // true/false

// 6. Cloner un objet/tableau
const clone = structuredClone(original); // Méthode moderne
const clone2 = JSON.parse(JSON.stringify(original)); // Ancienne méthode

// 7. Supprimer les doublons
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// 8. Inverser une chaîne
const reversed = str.split("").reverse().join("");

// 9. Capitaliser
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// 10. Debounce (éviter les appels répétés)
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
```

### Patterns Utiles

```javascript
// Pattern Guard Clauses (retour anticipé)
// ❌ Mauvais : imbrication profonde
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // ...
      }
    }
  }
}

// ✅ Bon : retours anticipés
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;
  // ...
}

// Pattern Default Object
function createUser(options = {}) {
  const defaults = {
    role: "user",
    isActive: true,
    theme: "light"
  };

  return { ...defaults, ...options };
}

// Pattern Memoization (cache)
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
