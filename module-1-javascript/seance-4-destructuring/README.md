# Séance 4 : Destructuring et Spread Operator

## 📚 Théorie

### Destructuring de Tableaux

```javascript
// Sans destructuring
const colors = ["red", "green", "blue"];
const firstColor = colors[0];
const secondColor = colors[1];

// Avec destructuring
const [first, second, third] = colors;
console.log(first); // "red"
console.log(second); // "green"
console.log(third); // "blue"

// Ignorer des éléments
const [primary, , tertiary] = colors;
console.log(primary); // "red"
console.log(tertiary); // "blue"

// Valeurs par défaut
const [a, b, c, d = "yellow"] = colors;
console.log(d); // "yellow"

// Rest operator
const numbers = [1, 2, 3, 4, 5];
const [firstNum, secondNum, ...rest] = numbers;
console.log(firstNum); // 1
console.log(secondNum); // 2
console.log(rest); // [3, 4, 5]
```

### Destructuring d'Objets

```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

// Destructuring basique
const { name, age, email } = user;
console.log(name); // "Alice"
console.log(age); // 25

// Renommer les variables
const { name: userName, age: userAge } = user;
console.log(userName); // "Alice"
console.log(userAge); // 25

// Valeurs par défaut
const { name, city = "Paris" } = user;
console.log(city); // "Paris" (valeur par défaut)

// Destructuring imbriqué
const person = {
  name: "Bob",
  address: {
    city: "Lyon",
    country: "France"
  }
};

const { address: { city, country } } = person;
console.log(city); // "Lyon"
console.log(country); // "France"

// Rest operator pour objets
const { name, ...otherInfo } = user;
console.log(name); // "Alice"
console.log(otherInfo); // { age: 25, email: "alice@example.com" }
```

### Destructuring dans les Paramètres de Fonctions

```javascript
// Tableau en paramètre
function displayColors([first, second]) {
  console.log(`Première couleur: ${first}, Deuxième: ${second}`);
}
displayColors(["red", "blue"]);

// Objet en paramètre
function greet({ name, age }) {
  return `Bonjour ${name}, vous avez ${age} ans`;
}
greet({ name: "Alice", age: 25 });

// Avec valeurs par défaut
function createUser({ name, age = 18, role = "user" }) {
  return { name, age, role };
}
createUser({ name: "Bob" });
// { name: "Bob", age: 18, role: "user" }
```

### Spread Operator (...)

#### Avec des Tableaux

```javascript
// Copier un tableau
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (non modifié)
console.log(copy); // [1, 2, 3, 4]

// Fusionner des tableaux
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Ajouter des éléments
const numbers = [2, 3, 4];
const extended = [1, ...numbers, 5];
// [1, 2, 3, 4, 5]
```

#### Avec des Objets

```javascript
// Copier un objet
const user = { name: "Alice", age: 25 };
const userCopy = { ...user };

// Fusionner des objets
const defaults = { theme: "light", language: "fr" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
// { theme: "dark", language: "fr" }
// userPrefs écrase defaults

// Ajouter/modifier des propriétés
const updatedUser = { ...user, age: 26, city: "Paris" };
// { name: "Alice", age: 26, city: "Paris" }
```

### Rest Parameters

```javascript
// Nombre variable d'arguments
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15

// Combiner avec des paramètres normaux
function createMessage(greeting, ...names) {
  return `${greeting} ${names.join(", ")}`;
}

createMessage("Bonjour", "Alice", "Bob", "Charlie");
// "Bonjour Alice, Bob, Charlie"
```

### Cas d'Usage Pratiques

```javascript
// Swap de variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// Retourner plusieurs valeurs
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}
const [min, max] = getMinMax([1, 5, 3, 9, 2]);

// Cloner et modifier
const product = {
  name: "Laptop",
  price: 1000,
  stock: 5
};

const discountedProduct = {
  ...product,
  price: product.price * 0.9,
  onSale: true
};
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
