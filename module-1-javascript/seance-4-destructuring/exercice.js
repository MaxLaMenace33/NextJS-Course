// 📝 Exercice 1 : Destructuring de tableaux

const fruits = ["pomme", "banane", "orange", "fraise", "kiwi"];

// 1. Destructurez pour obtenir les 2 premiers fruits
// const [VOTRE CODE ICI] = fruits;

// 2. Destructurez pour obtenir le premier et le troisième fruit (ignorez le deuxième)
// const [VOTRE CODE ICI] = fruits;

// 3. Destructurez pour obtenir les 2 premiers fruits et le reste dans un tableau
// const [VOTRE CODE ICI] = fruits;

const coordinates = [10, 20];

// 4. Destructurez avec une valeur par défaut pour z = 0
// const [VOTRE CODE ICI] = coordinates;


// 📝 Exercice 2 : Destructuring d'objets

const user = {
  id: 1,
  username: "alice123",
  email: "alice@example.com",
  age: 25,
  city: "Paris"
};

// 1. Destructurez username, email et age
// const { VOTRE CODE ICI } = user;

// 2. Destructurez username en le renommant "name"
// const { VOTRE CODE ICI } = user;

// 3. Destructurez city et country (country par défaut = "France")
// const { VOTRE CODE ICI } = user;

// 4. Destructurez id et mettez le reste dans un objet "otherData"
// const { VOTRE CODE ICI } = user;


// 📝 Exercice 3 : Destructuring imbriqué

const product = {
  name: "Laptop",
  price: 1200,
  specs: {
    cpu: "Intel i7",
    ram: "16GB",
    storage: "512GB SSD"
  },
  manufacturer: {
    name: "TechCorp",
    country: "USA"
  }
};

// 1. Destructurez cpu et ram depuis specs
// const { VOTRE CODE ICI } = product;

// 2. Destructurez le nom du fabricant et renommez-le "brand"
// const { VOTRE CODE ICI } = product;


// 📝 Exercice 4 : Destructuring dans les fonctions

// 1. Créez une fonction displayUser qui prend un objet user
//    et destructure name et age directement dans les paramètres
//    La fonction retourne "Nom: {name}, Age: {age}"
// function displayUser(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }

// 2. Créez une fonction calculateTotal qui prend un objet
//    avec price et quantity (quantity par défaut = 1)
//    et retourne le total
// function calculateTotal(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }

// 3. Créez une fonction getFirstTwo qui prend un tableau
//    et destructure les 2 premiers éléments
//    La fonction retourne un objet { first, second }
// function getFirstTwo(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }


// 📝 Exercice 5 : Spread operator avec tableaux

const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];

// 1. Fusionnez numbers1 et numbers2 avec spread
// const allNumbers = VOTRE CODE ICI

// 2. Créez un nouveau tableau avec 0 au début, puis numbers1, puis 4
// const extended = VOTRE CODE ICI

// 3. Créez une copie de numbers1 et ajoutez-lui 4 et 5
// const copied = VOTRE CODE ICI


// 📝 Exercice 6 : Spread operator avec objets

const defaultConfig = {
  theme: "light",
  language: "fr",
  notifications: true,
  autoSave: true
};

const userConfig = {
  theme: "dark",
  language: "en"
};

// 1. Fusionnez defaultConfig et userConfig (userConfig écrase defaultConfig)
// const finalConfig = VOTRE CODE ICI

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// 2. Créez un nouvel objet basé sur person avec age incrémenté de 1
// const olderPerson = VOTRE CODE ICI

// 3. Créez un nouvel objet basé sur person en ajoutant email: "john@example.com"
// const personWithEmail = VOTRE CODE ICI


// 📝 Exercice 7 : Rest parameters

// 1. Créez une fonction multiply qui multiplie tous ses arguments
//    Utilisez rest parameters
// function multiply(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }

// 2. Créez une fonction greetAll qui prend un message et plusieurs noms
//    Retourne: "{message} {name1}, {name2}, {name3}"
// function greetAll(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }


// 📝 Exercice 8 : Cas pratiques

// 1. Swap: échangez les valeurs de a et b avec destructuring
let a = 10;
let b = 20;
// VOTRE CODE ICI (une seule ligne)

// 2. Créez une fonction updateProduct qui :
//    - Prend un produit et des propriétés à mettre à jour
//    - Retourne un nouveau produit avec les propriétés mises à jour
//    Exemple: updateProduct({ name: "Laptop", price: 1000 }, { price: 900, onSale: true })
//    Retourne: { name: "Laptop", price: 900, onSale: true }
// function updateProduct(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }

// 3. Créez une fonction mergeArrays qui fusionne n'importe quel nombre de tableaux
//    Utilisez rest parameters et spread
// function mergeArrays(VOTRE CODE ICI) {
//   VOTRE CODE ICI
// }


// 🧪 Tests (décommentez pour tester vos réponses)
/*
console.log("=== Exercice 1 ===");
console.log(first, second); // "pomme" "banane"
console.log(firstFruit, thirdFruit); // "pomme" "orange"
console.log(f1, f2, restFruits); // "pomme" "banane" ["orange", "fraise", "kiwi"]
console.log(x, y, z); // 10 20 0

console.log("\n=== Exercice 2 ===");
console.log(username, email, age);
console.log(name); // "alice123"
console.log(city, country); // "Paris" "France"
console.log(id, otherData);

console.log("\n=== Exercice 3 ===");
console.log(cpu, ram); // "Intel i7" "16GB"
console.log(brand); // "TechCorp"

console.log("\n=== Exercice 4 ===");
console.log(displayUser({ name: "Alice", age: 25 })); // "Nom: Alice, Age: 25"
console.log(calculateTotal({ price: 10, quantity: 3 })); // 30
console.log(calculateTotal({ price: 10 })); // 10
console.log(getFirstTwo([1, 2, 3, 4])); // { first: 1, second: 2 }

console.log("\n=== Exercice 5 ===");
console.log(allNumbers); // [1, 2, 3, 4, 5, 6]
console.log(extended); // [0, 1, 2, 3, 4]
console.log(copied); // [1, 2, 3, 4, 5]

console.log("\n=== Exercice 6 ===");
console.log(finalConfig);
// { theme: "dark", language: "en", notifications: true, autoSave: true }
console.log(olderPerson); // { firstName: "John", lastName: "Doe", age: 31 }
console.log(personWithEmail);

console.log("\n=== Exercice 7 ===");
console.log(multiply(2, 3, 4)); // 24
console.log(greetAll("Bonjour", "Alice", "Bob", "Charlie"));
// "Bonjour Alice, Bob, Charlie"

console.log("\n=== Exercice 8 ===");
console.log(a, b); // 20 10
console.log(updateProduct({ name: "Laptop", price: 1000 }, { price: 900, onSale: true }));
console.log(mergeArrays([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
*/
