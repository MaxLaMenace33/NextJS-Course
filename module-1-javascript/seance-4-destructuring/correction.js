// ✅ Correction - Séance 4 : Destructuring et Spread Operator

// 📝 Exercice 1 : Destructuring de tableaux

const fruits = ["pomme", "banane", "orange", "fraise", "kiwi"];

// 1. Les 2 premiers fruits
const [first, second] = fruits;

// 2. Premier et troisième fruit
const [firstFruit, , thirdFruit] = fruits;

// 3. Les 2 premiers et le reste
const [f1, f2, ...restFruits] = fruits;

// 4. Avec valeur par défaut
const coordinates = [10, 20];
const [x, y, z = 0] = coordinates;

console.log("=== Exercice 1 ===");
console.log("first, second:", first, second); // "pomme" "banane"
console.log("firstFruit, thirdFruit:", firstFruit, thirdFruit); // "pomme" "orange"
console.log("f1, f2, restFruits:", f1, f2, restFruits);
console.log("x, y, z:", x, y, z); // 10 20 0


// 📝 Exercice 2 : Destructuring d'objets

const user = {
  id: 1,
  username: "alice123",
  email: "alice@example.com",
  age: 25,
  city: "Paris"
};

// 1. Destructurer username, email et age
const { username, email, age } = user;

// 2. Renommer username en name
const { username: name } = user;

// 3. Avec valeur par défaut
const { city, country = "France" } = user;

// 4. Rest operator
const { id, ...otherData } = user;

console.log("\n=== Exercice 2 ===");
console.log("username, email, age:", username, email, age);
console.log("name (renommé):", name);
console.log("city, country:", city, country);
console.log("id:", id);
console.log("otherData:", otherData);


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

// 1. Destructurer cpu et ram
const { specs: { cpu, ram } } = product;

// 2. Renommer le nom du fabricant
const { manufacturer: { name: brand } } = product;

console.log("\n=== Exercice 3 ===");
console.log("cpu, ram:", cpu, ram);
console.log("brand:", brand);


// 📝 Exercice 4 : Destructuring dans les fonctions

// 1. displayUser
function displayUser({ name, age }) {
  return `Nom: ${name}, Age: ${age}`;
}

// 2. calculateTotal avec valeur par défaut
function calculateTotal({ price, quantity = 1 }) {
  return price * quantity;
}

// 3. getFirstTwo
function getFirstTwo([first, second]) {
  return { first, second };
}

console.log("\n=== Exercice 4 ===");
console.log(displayUser({ name: "Alice", age: 25 }));
console.log("Total (avec quantity):", calculateTotal({ price: 10, quantity: 3 })); // 30
console.log("Total (sans quantity):", calculateTotal({ price: 10 })); // 10
console.log(getFirstTwo([1, 2, 3, 4]));


// 📝 Exercice 5 : Spread operator avec tableaux

const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];

// 1. Fusionner
const allNumbers = [...numbers1, ...numbers2];

// 2. Avec éléments supplémentaires
const extended = [0, ...numbers1, 4];

// 3. Copie avec ajouts
const copied = [...numbers1, 4, 5];

console.log("\n=== Exercice 5 ===");
console.log("allNumbers:", allNumbers); // [1, 2, 3, 4, 5, 6]
console.log("extended:", extended); // [0, 1, 2, 3, 4]
console.log("copied:", copied); // [1, 2, 3, 4, 5]


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

// 1. Fusion (userConfig écrase)
const finalConfig = { ...defaultConfig, ...userConfig };

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// 2. Incrémenter age
const olderPerson = { ...person, age: person.age + 1 };

// 3. Ajouter email
const personWithEmail = { ...person, email: "john@example.com" };

console.log("\n=== Exercice 6 ===");
console.log("finalConfig:", finalConfig);
// { theme: "dark", language: "en", notifications: true, autoSave: true }
console.log("olderPerson:", olderPerson);
console.log("personWithEmail:", personWithEmail);


// 📝 Exercice 7 : Rest parameters

// 1. multiply avec rest
function multiply(...numbers) {
  return numbers.reduce((acc, num) => acc * num, 1);
}

// 2. greetAll
function greetAll(message, ...names) {
  return `${message} ${names.join(", ")}`;
}

console.log("\n=== Exercice 7 ===");
console.log("multiply(2, 3, 4):", multiply(2, 3, 4)); // 24
console.log(greetAll("Bonjour", "Alice", "Bob", "Charlie"));


// 📝 Exercice 8 : Cas pratiques

// 1. Swap
let a = 10;
let b = 20;
[a, b] = [b, a];

// 2. updateProduct
function updateProduct(product, updates) {
  return { ...product, ...updates };
}

// 3. mergeArrays
function mergeArrays(...arrays) {
  return arrays.flat();
  // ou: return [].concat(...arrays);
  // ou: return arrays.reduce((acc, arr) => [...acc, ...arr], []);
}

console.log("\n=== Exercice 8 ===");
console.log("a, b après swap:", a, b); // 20 10
console.log(updateProduct(
  { name: "Laptop", price: 1000 },
  { price: 900, onSale: true }
));
console.log(mergeArrays([1, 2], [3, 4], [5, 6]));


// 💡 Points clés à retenir :
console.log("\n=== Points clés ===");
console.log("✅ Destructuring : extrait des valeurs de tableaux/objets");
console.log("✅ Spread (...) : copie et fusionne tableaux/objets");
console.log("✅ Rest (...) : regroupe des éléments dans un tableau");
console.log("✅ Destructuring dans paramètres : code plus concis");
console.log("✅ Valeurs par défaut : évitent undefined");
