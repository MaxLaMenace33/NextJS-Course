# Séance 3 : Tableaux et Objets

## 📚 Théorie

### Tableaux (Arrays)

#### Qu'est-ce qu'un tableau ?

Un tableau est une **structure de données ordonnée** qui stocke une collection d'éléments.

```javascript
// Création de tableaux
const fruits = ["pomme", "banane", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "texte", true, null, { name: "objet" }];

/*
   POURQUOI utiliser des tableaux ?
   - Stocker plusieurs valeurs dans une seule variable
   - Maintenir un ordre (indexé de 0 à length-1)
   - Itérer facilement sur les données
   - Manipuler des collections

   COMMENT ça marche ?
   - Indexé : chaque élément a une position (0, 1, 2...)
   - Dynamique : la taille peut changer
   - Type flexible : peut contenir n'importe quel type (même mélangé)
*/

// Accès aux éléments
console.log(fruits[0]); // "pomme" - premier élément (index 0)
console.log(fruits[1]); // "banane" - deuxième élément (index 1)
console.log(fruits[fruits.length - 1]); // "orange" - dernier élément

/*
   POURQUOI index commence à 0 ?
   - Convention historique en informatique
   - Représente l'offset (décalage) depuis le début
   - fruits[0] = 0 position après le début

   COMMENT accéder au dernier élément ?
   - array.length donne le nombre d'éléments
   - Dernier index = length - 1
   - fruits.length = 3, donc fruits[2] est le dernier
*/

// Modification
fruits[1] = "fraise";
console.log(fruits); // ["pomme", "fraise", "orange"]

// Propriété length
console.log(fruits.length); // 3

/*
   ATTENTION : length est MUTABLE
*/
fruits.length = 2;
console.log(fruits); // ["pomme", "fraise"] - dernier élément supprimé !

fruits.length = 5;
console.log(fruits); // ["pomme", "fraise", undefined, undefined, undefined]
```

---

### Méthodes de Tableaux Essentielles

Les méthodes de tableaux sont au cœur de JavaScript moderne. Comprendre **map**, **filter**, **reduce** est essentiel.

#### map() - Transformer chaque élément

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

/*
   POURQUOI map() ?
   - Transforme CHAQUE élément d'un tableau
   - Crée un NOUVEAU tableau (ne modifie pas l'original)
   - Retourne TOUJOURS un tableau de même longueur

   COMMENT ça marche ?
   - Prend une fonction callback
   - Appelle la fonction pour CHAQUE élément
   - Collecte les résultats dans un nouveau tableau

   map(element => transformation)

   Étapes :
   1. num = 1 → 1 * 2 = 2
   2. num = 2 → 2 * 2 = 4
   3. num = 3 → 3 * 2 = 6
   4. num = 4 → 4 * 2 = 8
   5. num = 5 → 5 * 2 = 10

   Résultat : [2, 4, 6, 8, 10]
*/

// Exemple avec objets
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

const names = users.map(user => user.name);
// ["Alice", "Bob"]

const usersWithId = users.map((user, index) => ({
  ...user,
  id: index + 1
}));
// [{ name: "Alice", age: 25, id: 1 }, { name: "Bob", age: 30, id: 2 }]

/*
   PARAMÈTRES du callback :
   - element : l'élément actuel
   - index : position de l'élément (optionnel)
   - array : le tableau complet (optionnel)

   QUAND utiliser map() ?
   - Transformer des données (nombres, objets, strings)
   - Extraire des propriétés spécifiques
   - Ajouter/modifier des propriétés
   - Formater des données pour l'affichage

   ⚠️ NE PAS utiliser map() si :
   - Vous ne retournez rien (utilisez forEach à la place)
   - Vous ne voulez pas un nouveau tableau
   - Vous voulez filtrer (utilisez filter)
*/

// ❌ MAUVAIS : utiliser map() sans retourner
numbers.map(num => {
  console.log(num); // Effet de bord, pas de transformation
});

// ✅ BON : utiliser forEach pour les effets de bord
numbers.forEach(num => {
  console.log(num);
});

// ✅ BON : utiliser map() pour transformer
const squared = numbers.map(num => num * num);
```

---

#### filter() - Filtrer les éléments

```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
// [2, 4]

/*
   POURQUOI filter() ?
   - Sélectionne les éléments qui respectent une condition
   - Crée un NOUVEAU tableau (ne modifie pas l'original)
   - Retourne un tableau PLUS COURT ou de même longueur (jamais plus long)

   COMMENT ça marche ?
   - Prend une fonction callback qui retourne true/false
   - Garde les éléments où callback retourne true
   - Ignore les éléments où callback retourne false

   filter(element => condition)

   Étapes :
   1. num = 1 → 1 % 2 === 0 ? → false → ignoré
   2. num = 2 → 2 % 2 === 0 ? → true → gardé
   3. num = 3 → 3 % 2 === 0 ? → false → ignoré
   4. num = 4 → 4 % 2 === 0 ? → true → gardé
   5. num = 5 → 5 % 2 === 0 ? → false → ignoré

   Résultat : [2, 4]
*/

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];

const adults = users.filter(user => user.age >= 18);
// [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }]

/*
   QUAND utiliser filter() ?
   - Retirer des éléments non désirés
   - Chercher tous les éléments qui correspondent à un critère
   - Nettoyer des données (supprimer null, undefined, etc.)
   - Séparation de données

   COMBINER filter() et map() :
*/

// Récupérer les noms des adultes
const adultNames = users
  .filter(user => user.age >= 18)
  .map(user => user.name);
// ["Alice", "Charlie"]

/*
   ORDRE IMPORTANT :
   1. filter D'ABORD : réduit le nombre d'éléments
   2. map ENSUITE : opère sur moins d'éléments → plus rapide
*/

// Exemples pratiques
const products = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Mouse", price: 25, inStock: false },
  { name: "Keyboard", price: 75, inStock: true }
];

// Produits en stock
const available = products.filter(p => p.inStock);

// Produits abordables (< 100€) en stock
const affordable = products.filter(p => p.price < 100 && p.inStock);

// Supprimer les valeurs falsy
const values = [0, 1, "", "hello", null, undefined, false, true];
const truthyValues = values.filter(Boolean); // [1, "hello", true]

/*
   ASTUCE : filter(Boolean)
   - Retourne true/false pour chaque élément
   - Garde seulement les truthy
   - Équivalent à : filter(v => !!v)
*/
```

---

#### reduce() - Réduire à une seule valeur

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// 15

/*
   POURQUOI reduce() ?
   - La méthode la plus PUISSANTE
   - Réduit un tableau à UNE SEULE valeur
   - Peut tout faire : somme, moyenne, objet, tableau, string, etc.

   COMMENT ça marche ?
   - Prend une fonction callback ET une valeur initiale
   - Callback reçoit : accumulateur + élément actuel
   - Accumulateur stocke le résultat cumulé
   - Retourne la valeur finale de l'accumulateur

   reduce((accumulateur, element) => nouvelAccumulateur, valeurInitiale)

   Étapes détaillées :
   Iteration 1 : acc = 0,  num = 1 → retourne 0 + 1 = 1
   Iteration 2 : acc = 1,  num = 2 → retourne 1 + 2 = 3
   Iteration 3 : acc = 3,  num = 3 → retourne 3 + 3 = 6
   Iteration 4 : acc = 6,  num = 4 → retourne 6 + 4 = 10
   Iteration 5 : acc = 10, num = 5 → retourne 10 + 5 = 15

   Résultat final : 15
*/

// Exemples variés

// 1. Multiplication (produit)
const product = numbers.reduce((acc, num) => acc * num, 1);
// 1 * 1 * 2 * 3 * 4 * 5 = 120

/*
   IMPORTANT : Valeur initiale
   - Pour somme : 0 (élément neutre de l'addition)
   - Pour produit : 1 (élément neutre de la multiplication)
   - Pour tableau : []
   - Pour objet : {}
*/

// 2. Trouver le maximum
const max = numbers.reduce((acc, num) => num > acc ? num : acc);
// 5

// Ou plus lisible avec Math.max
const max2 = numbers.reduce((acc, num) => Math.max(acc, num));

// 3. Compter les occurrences
const fruits = ["pomme", "banane", "pomme", "orange", "banane", "pomme"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { pomme: 3, banane: 2, orange: 1 }

/*
   ÉTAPES pour compter :
   Départ : acc = {}

   1. fruit = "pomme"
      acc["pomme"] n'existe pas → acc["pomme"] = 0 + 1 = 1
      acc = { pomme: 1 }

   2. fruit = "banane"
      acc["banane"] n'existe pas → acc["banane"] = 0 + 1 = 1
      acc = { pomme: 1, banane: 1 }

   3. fruit = "pomme"
      acc["pomme"] existe (1) → acc["pomme"] = 1 + 1 = 2
      acc = { pomme: 2, banane: 1 }

   ... etc
*/

// 4. Aplatir un tableau de tableaux (flatten)
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5, 6]

// 5. Grouper par propriété
const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" }
];

const byRole = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }
  acc[user.role].push(user);
  return acc;
}, {});
/*
{
  admin: [
    { name: "Alice", role: "admin" },
    { name: "Charlie", role: "admin" }
  ],
  user: [
    { name: "Bob", role: "user" }
  ]
}
*/

// 6. Pipeline de transformations (combine map/filter)
const processedNumbers = numbers.reduce((acc, num) => {
  if (num % 2 === 0) { // Filter : seulement pairs
    acc.push(num * 2); // Map : doubler
  }
  return acc;
}, []);
// [4, 8] (2*2=4, 4*2=8)

/*
   QUAND utiliser reduce() ?
   - Calculer une somme, moyenne, total
   - Trouver min/max
   - Compter des occurrences
   - Grouper des données
   - Transformer tableau → objet
   - Aplatir des tableaux imbriqués
   - Implémenter map/filter personnalisé

   ⚠️ ATTENTION :
   - Toujours retourner l'accumulateur !
   - Choisir la bonne valeur initiale
   - Plus difficile à lire que map/filter → utilisez avec parcimonie
*/
```

---

#### find() et findIndex()

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

// find() : retourne le PREMIER élément qui correspond
const user = users.find(u => u.id === 2);
// { id: 2, name: "Bob" }

// findIndex() : retourne l'INDEX du premier élément
const index = users.findIndex(u => u.id === 2);
// 1

/*
   POURQUOI find() et findIndex() ?
   - find() : récupérer UN élément spécifique
   - findIndex() : connaître la POSITION d'un élément

   COMMENT ça marche ?
   - Parcourt le tableau
   - S'arrête au PREMIER qui correspond
   - Retourne :
     * find() : l'élément trouvé OU undefined
     * findIndex() : l'index OU -1 si pas trouvé

   DIFFÉRENCE avec filter() :
   - filter() : retourne TOUS les éléments → tableau []
   - find() : retourne LE PREMIER élément → élément ou undefined
*/

// find() retourne undefined si pas trouvé
const notFound = users.find(u => u.id === 999);
console.log(notFound); // undefined

// findIndex() retourne -1 si pas trouvé
const notFoundIndex = users.findIndex(u => u.id === 999);
console.log(notFoundIndex); // -1

/*
   QUAND utiliser find() ?
   - Chercher un utilisateur par ID
   - Trouver un produit spécifique
   - Récupérer une configuration

   QUAND utiliser findIndex() ?
   - Modifier un élément à une position
   - Supprimer un élément spécifique
   - Insérer avant/après un élément
*/

// Exemple : Modifier un utilisateur
const userIndex = users.findIndex(u => u.id === 2);
if (userIndex !== -1) {
  users[userIndex] = { ...users[userIndex], name: "Robert" };
}

// Alternative moderne : findLast() et findLastIndex() (ES2023)
const lastUser = users.findLast(u => u.id > 0);
// Trouve en partant de la FIN
```

---

#### some() et every()

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() : au moins UN élément respecte la condition
const hasEven = numbers.some(num => num % 2 === 0);
// true (car 2 et 4 sont pairs)

// every() : TOUS les éléments respectent la condition
const allPositive = numbers.every(num => num > 0);
// true (tous sont > 0)

/*
   POURQUOI some() et every() ?
   - Vérifier des conditions sur un tableau
   - Retournent un BOOLÉEN (true/false)
   - Court-circuit : s'arrêtent dès que le résultat est connu

   COMMENT ça marche ?

   some() :
   - Parcourt le tableau
   - S'arrête au PREMIER true
   - Retourne true si AU MOINS UN est true
   - Retourne false si TOUS sont false

   every() :
   - Parcourt le tableau
   - S'arrête au PREMIER false
   - Retourne true si TOUS sont true
   - Retourne false si AU MOINS UN est false
*/

// Exemples pratiques

// Vérifier si un tableau contient au moins un admin
const users = [
  { name: "Alice", role: "user" },
  { name: "Bob", role: "admin" },
  { name: "Charlie", role: "user" }
];

const hasAdmin = users.some(u => u.role === "admin");
// true

const allAdmins = users.every(u => u.role === "admin");
// false

// Validation de formulaire
const formFields = [
  { name: "email", value: "test@test.com", required: true },
  { name: "password", value: "123456", required: true },
  { name: "age", value: "", required: false }
];

// Tous les champs requis sont remplis ?
const isValid = formFields
  .filter(f => f.required)
  .every(f => f.value !== "");
// true

// Au moins un champ vide ?
const hasEmpty = formFields.some(f => f.value === "");
// true

/*
   COURT-CIRCUIT (optimization) :

   some() avec [1, 2, 3, 4, 5]
   Cherche un pair :
   - Teste 1 : impair → continue
   - Teste 2 : PAIR → retourne true immédiatement
   - N'évalue PAS 3, 4, 5 (économise du temps)

   every() avec [1, 2, 3, 4, 5]
   Vérifie si tous positifs :
   - Teste 1 : > 0 → continue
   - Teste 2 : > 0 → continue
   - ...
   - Teste 5 : > 0 → retourne true

   every() avec [1, -2, 3]
   - Teste 1 : > 0 → continue
   - Teste -2 : NOT > 0 → retourne false immédiatement
   - N'évalue PAS 3

   QUAND utiliser ?
   - some() : "existe-t-il au moins un..."
   - every() : "est-ce que tous..."
   - Validation de données
   - Vérifications de permissions
   - Checks de qualité
*/
```

---

#### Autres méthodes utiles

```javascript
const arr = [1, 2, 3];

// push() : ajoute à la FIN (modifie l'original)
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

/*
   POURQUOI push() ?
   - Ajouter des éléments dynamiquement
   - Retourne la NOUVELLE longueur
   - MUTE le tableau original
*/

// pop() : retire le DERNIER (modifie l'original)
const last = arr.pop();
console.log(last); // 4
console.log(arr); // [1, 2, 3]

// unshift() : ajoute au DÉBUT (modifie l'original)
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3]

// shift() : retire le PREMIER (modifie l'original)
const first = arr.shift();
console.log(first); // 0
console.log(arr); // [1, 2, 3]

/*
   ⚠️ PERFORMANCE :
   - push/pop : rapides (fin du tableau)
   - unshift/shift : LENTS (début → réindexation de TOUT)

   Pour grandes listes, préférez push/pop
*/

// slice() : copie une PORTION (ne modifie PAS l'original)
const portion = arr.slice(1, 3);
// [2, 3] (de index 1 INCLUS à 3 EXCLUS)

/*
   POURQUOI slice() ?
   - Extraire une partie
   - Copier un tableau : arr.slice()
   - Ne modifie PAS l'original (immutable)

   SYNTAXE : slice(start, end)
   - start : index de début (inclus)
   - end : index de fin (EXCLUS)
   - Si end omis : jusqu'à la fin
   - Indices négatifs : compte depuis la fin
*/

const numbers = [0, 1, 2, 3, 4];
console.log(numbers.slice(2));     // [2, 3, 4] (de 2 à la fin)
console.log(numbers.slice(-2));    // [3, 4] (2 derniers)
console.log(numbers.slice(1, -1)); // [1, 2, 3] (sans premier et dernier)

// Copier un tableau (shallow copy)
const copy = numbers.slice();

// includes() : vérifie la PRÉSENCE
const hasTwo = arr.includes(2); // true

/*
   includes() vs indexOf() :
   - includes(value) : retourne boolean (true/false)
   - indexOf(value) : retourne index (nombre ou -1)

   includes() est plus lisible pour vérifier l'existence
*/

if (arr.includes(2)) { // ✅ Clair
  console.log("2 est présent");
}

if (arr.indexOf(2) !== -1) { // ❌ Moins lisible
  console.log("2 est présent");
}

// join() : transforme en STRING
const str = arr.join(", "); // "1, 2, 3"

/*
   POURQUOI join() ?
   - Convertir tableau → string
   - Paramètre = séparateur
   - Par défaut : virgule ","
*/

console.log(arr.join());      // "1,2,3"
console.log(arr.join(" - ")); // "1 - 2 - 3"
console.log(arr.join(""));    // "123"

// reverse() : inverse l'ordre (modifie l'original)
arr.reverse();
console.log(arr); // [3, 2, 1]

// sort() : trie (modifie l'original)
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
nums.sort();
console.log(nums); // [1, 1, 2, 3, 4, 5, 6, 9]

/*
   ⚠️ PIÈGE avec sort() :
   - Par défaut, trie en ALPHABÉTIQUE (convertit en strings)
   - [1, 2, 10, 20].sort() → [1, 10, 2, 20] ❌

   SOLUTION : fonction de comparaison
*/

nums.sort((a, b) => a - b); // Tri numérique croissant
nums.sort((a, b) => b - a); // Tri numérique décroissant
```

---

### Objets (Objects)

#### Qu'est-ce qu'un objet ?

Un objet est une **collection de propriétés** (clé: valeur).

```javascript
// Création d'objets
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

/*
   POURQUOI les objets ?
   - Grouper des données liées
   - Représenter des entités (utilisateur, produit, etc.)
   - Structurer des données complexes
   - Associer des comportements (méthodes) aux données

   COMMENT ça marche ?
   - Paires clé: valeur
   - Clés = strings (ou Symbols)
   - Valeurs = n'importe quel type
   - Accès par . ou []
*/

// Accès aux propriétés

// 1. Dot notation (recommandé)
console.log(user.name); // "Alice"

// 2. Bracket notation
console.log(user["email"]); // "alice@example.com"

/*
   QUAND utiliser bracket notation [] ?
   - Clé avec espaces : user["first name"]
   - Clé dynamique : user[variableKey]
   - Clé avec caractères spéciaux : user["user-id"]

   SINON : dot notation (plus lisible)
*/

// Accès dynamique
const property = "age";
console.log(user[property]); // 25

// Modification
user.age = 26;
user["email"] = "newemail@example.com";

// Ajout de propriétés
user.city = "Paris";
user.isActive = true;

/*
   POURQUOI on peut ajouter des propriétés ?
   - JavaScript est dynamique
   - Objets sont mutables
   - Pas de schéma fixe (contrairement aux langages typés)

   ⚠️ Peut causer des bugs : TypeScript aide à éviter ça
*/

// Suppression
delete user.city;

/*
   delete : retire une propriété
   - Retourne true (succès) ou false (échec)
   - Rarement utilisé (préférez mettre à undefined)
*/

user.city = undefined; // ✅ Préféré (garde la propriété)
delete user.isActive;  // Supprime complètement la propriété

// Vérifier l'existence d'une propriété
"name" in user; // true
"deleted" in user; // false

user.hasOwnProperty("name"); // true
```

---

### Méthodes d'Objets

```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

// Object.keys() : récupère les CLÉS
const keys = Object.keys(user);
// ["name", "age", "email"]

/*
   POURQUOI Object.keys() ?
   - Itérer sur les propriétés
   - Compter le nombre de propriétés
   - Vérifier si objet est vide

   Retourne un TABLEAU de strings
*/

// Vérifier si objet vide
const isEmpty = Object.keys(user).length === 0; // false

// Object.values() : récupère les VALEURS
const values = Object.values(user);
// ["Alice", 25, "alice@example.com"]

// Object.entries() : récupère les PAIRES [clé, valeur]
const entries = Object.entries(user);
// [["name", "Alice"], ["age", 25], ["email", "alice@example.com"]]

/*
   POURQUOI Object.entries() ?
   - Transformer objet en tableau
   - Itérer avec for...of
   - Utiliser map/filter/reduce sur les propriétés
*/

// Itération sur un objet
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

// Filtrer les propriétés d'un objet
const filtered = Object.fromEntries(
  Object.entries(user).filter(([key, value]) => typeof value === "string")
);
// { name: "Alice", email: "alice@example.com" }

// Object.assign() : fusion d'objets
const defaults = { theme: "light", lang: "fr" };
const userPrefs = { theme: "dark" };

const merged = Object.assign({}, defaults, userPrefs);
// { theme: "dark", lang: "fr" }

/*
   COMMENT Object.assign() marche ?
   - Copie les propriétés de source vers target
   - Object.assign(target, source1, source2, ...)
   - Les sources suivantes écrasent les précédentes
   - MUTE le target !

   ⚠️ PIÈGE : Premier argument est muté
*/

const target = {};
Object.assign(target, defaults, userPrefs);
// target est maintenant { theme: "dark", lang: "fr" }

// ✅ MODERN: Spread operator (préféré)
const merged2 = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "fr" }

/*
   POURQUOI préférer spread (...) ?
   - Plus lisible
   - Immuable (ne mute rien)
   - Plus court
   - Standard moderne
*/

// Shallow copy vs Deep copy
const original = {
  name: "Alice",
  address: { city: "Paris" }
};

// Shallow copy (copie superficielle)
const shallow = { ...original };
shallow.address.city = "Lyon";
console.log(original.address.city); // "Lyon" ❌ Original modifié !

/*
   POURQUOI original est modifié ?
   - Spread copie seulement le PREMIER niveau
   - address est une RÉFÉRENCE (objet imbriqué)
   - Les deux pointent vers le MÊME objet address

   SOLUTION : Deep copy
*/

// Deep copy (copie profonde)
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "Marseille";
console.log(original.address.city); // "Lyon" ✅ Original intact

/*
   ⚠️ LIMITATIONS de JSON.parse/stringify :
   - Perd les fonctions
   - Perd undefined
   - Perd les Symbols
   - Perd les Dates (deviennent des strings)

   Pour deep copy complet : utiliser une bibliothèque (lodash.cloneDeep)
   Ou structuredClone() (moderne, ES2022)
*/

const deepModern = structuredClone(original);
```

---

### Méthodes dans les Objets

```javascript
const calculator = {
  value: 0,

  add(n) {
    this.value += n;
    return this; // Permet le chaînage
  },

  subtract(n) {
    this.value -= n;
    return this;
  },

  multiply(n) {
    this.value *= n;
    return this;
  },

  getValue() {
    return this.value;
  }
};

/*
   POURQUOI retourner this ?
   - Permet le CHAÎNAGE de méthodes
   - Appeler plusieurs méthodes à la suite
   - Pattern fluent / chainable API
*/

// Chaînage de méthodes
calculator
  .add(10)      // value = 10
  .subtract(3)  // value = 7
  .multiply(2)  // value = 14
  .add(5);      // value = 19

console.log(calculator.getValue()); // 19

/*
   COMMENT ça marche ?
   1. calculator.add(10) → modifie value → retourne calculator
   2. calculator.subtract(3) → modifie value → retourne calculator
   3. ...

   Chaque méthode retourne l'objet → permet d'appeler la suivante
*/

// Syntaxe de méthode (ES6)
const obj = {
  // ❌ Ancienne syntaxe
  oldMethod: function() {
    return "old";
  },

  // ✅ Nouvelle syntaxe (plus courte)
  newMethod() {
    return "new";
  }
};

/*
   Syntaxe moderne :
   - Plus concise
   - Identique en fonctionnement
   - Standard ES6+
*/
```

---

## 💡 Points Clés à Retenir

### Tableaux

**Méthodes immutables** (ne modifient PAS l'original) :
- `map()` : transformer → nouveau tableau
- `filter()` : filtrer → nouveau tableau
- `slice()` : copier une portion
- `concat()` : fusionner tableaux

**Méthodes mutables** (MODIFIENT l'original) :
- `push/pop` : ajouter/retirer à la fin
- `unshift/shift` : ajouter/retirer au début
- `splice` : modifier n'importe où
- `sort/reverse` : réorganiser

**Recherche** :
- `find()` : premier élément correspondant
- `findIndex()` : position du premier correspondant
- `includes()` : booléen de présence

**Validation** :
- `some()` : au moins un
- `every()` : tous

**Réduction** :
- `reduce()` : tableau → valeur unique

### Objets

**Accès** :
- Dot notation : `obj.prop`
- Bracket notation : `obj["prop"]` (dynamique)

**Itération** :
- `Object.keys()` : tableau de clés
- `Object.values()` : tableau de valeurs
- `Object.entries()` : tableau de [clé, valeur]

**Manipulation** :
- Spread `{...obj}` : copie shallow
- `Object.assign()` : fusion (mutable)
- `structuredClone()` : copie deep (moderne)

---

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

**Objectifs d'apprentissage** :
- Maîtriser map, filter, reduce
- Comprendre immutable vs mutable
- Manipuler des objets
- Combiner les méthodes

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
