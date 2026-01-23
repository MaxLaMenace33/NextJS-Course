# Séance 3 : Tableaux et Objets

## 📚 Théorie

### Tableaux (Arrays)

```javascript
// Création de tableaux
const fruits = ["pomme", "banane", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "texte", true, null, { name: "objet" }];

// Accès aux éléments
console.log(fruits[0]); // "pomme"
console.log(fruits[fruits.length - 1]); // "orange" (dernier élément)
```

### Méthodes de Tableaux Essentielles

#### map() - Transformer chaque élément

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];
const names = users.map(user => user.name);
// ["Alice", "Bob"]
```

#### filter() - Filtrer les éléments

```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
// [2, 4]

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 }
];
const adults = users.filter(user => user.age >= 18);
// [{ name: "Alice", age: 25 }]
```

#### reduce() - Réduire à une seule valeur

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// 15

// Explication :
// acc = 0, num = 1 → retourne 0 + 1 = 1
// acc = 1, num = 2 → retourne 1 + 2 = 3
// acc = 3, num = 3 → retourne 3 + 3 = 6
// acc = 6, num = 4 → retourne 6 + 4 = 10
// acc = 10, num = 5 → retourne 10 + 5 = 15
```

#### find() et findIndex()

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
// { id: 2, name: "Bob" }

const index = users.findIndex(u => u.id === 2);
// 1
```

#### some() et every()

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() : au moins un élément respecte la condition
const hasEven = numbers.some(num => num % 2 === 0);
// true (car 2 et 4 sont pairs)

// every() : tous les éléments respectent la condition
const allPositive = numbers.every(num => num > 0);
// true (tous sont positifs)
```

#### Autres méthodes utiles

```javascript
const arr = [1, 2, 3];

// push() : ajoute à la fin
arr.push(4); // [1, 2, 3, 4]

// pop() : retire le dernier
arr.pop(); // [1, 2, 3]

// unshift() : ajoute au début
arr.unshift(0); // [0, 1, 2, 3]

// shift() : retire le premier
arr.shift(); // [1, 2, 3]

// slice() : copie une portion
const portion = arr.slice(1, 3); // [2, 3]

// includes() : vérifie la présence
arr.includes(2); // true

// join() : transforme en string
arr.join(", "); // "1, 2, 3"
```

### Objets (Objects)

```javascript
// Création d'objets
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

// Accès aux propriétés
console.log(user.name); // "Alice" (dot notation)
console.log(user["email"]); // "alice@example.com" (bracket notation)

// Modification
user.age = 26;
user["email"] = "newemail@example.com";

// Ajout de propriétés
user.city = "Paris";

// Suppression
delete user.city;
```

### Méthodes d'Objets

```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

// Object.keys() : récupère les clés
const keys = Object.keys(user);
// ["name", "age", "email"]

// Object.values() : récupère les valeurs
const values = Object.values(user);
// ["Alice", 25, "alice@example.com"]

// Object.entries() : récupère les paires [clé, valeur]
const entries = Object.entries(user);
// [["name", "Alice"], ["age", 25], ["email", "alice@example.com"]]

// Object.assign() : fusion d'objets
const merged = Object.assign({}, user, { city: "Paris" });

// Spread operator (méthode moderne)
const merged2 = { ...user, city: "Paris" };
```

### Méthodes dans les Objets

```javascript
const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this;
  },
  subtract(n) {
    this.value -= n;
    return this;
  },
  getValue() {
    return this.value;
  }
};

// Chaînage de méthodes
calculator.add(10).subtract(3).add(5);
console.log(calculator.getValue()); // 12
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
