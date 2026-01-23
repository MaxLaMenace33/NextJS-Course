// ✅ Correction - Séance 3 : Tableaux et Objets

// 📝 Exercice 1 : map()

const numbers = [1, 2, 3, 4, 5];

// 1. Chaque nombre multiplié par 3
const tripled = numbers.map(num => num * 3);

// 2. Carré de chaque nombre
const squared = numbers.map(num => num * num);

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
];

// 3. Noms des produits
const productNames = products.map(product => product.name);

// 4. Prix augmentés de 10%
const increasedPrices = products.map(product => product.price * 1.10);

console.log("=== Exercice 1 ===");
console.log("tripled:", tripled); // [3, 6, 9, 12, 15]
console.log("squared:", squared); // [1, 4, 9, 16, 25]
console.log("productNames:", productNames); // ["Laptop", "Mouse", "Keyboard"]
console.log("increasedPrices:", increasedPrices); // [1100, 27.5, 82.5]


// 📝 Exercice 2 : filter()

const scores = [45, 67, 89, 34, 92, 78, 55];

// 1. Scores >= 60
const passingScores = scores.filter(score => score >= 60);

// 2. Scores < 50
const failingScores = scores.filter(score => score < 50);

const users = [
  { name: "Alice", age: 25, isActive: true },
  { name: "Bob", age: 17, isActive: false },
  { name: "Charlie", age: 30, isActive: true },
  { name: "David", age: 16, isActive: true }
];

// 3. Utilisateurs majeurs
const adults = users.filter(user => user.age >= 18);

// 4. Utilisateurs actifs ET majeurs
const activeAdults = users.filter(user => user.isActive && user.age >= 18);

console.log("\n=== Exercice 2 ===");
console.log("passingScores:", passingScores); // [67, 89, 92, 78, 55]
console.log("failingScores:", failingScores); // [45, 34]
console.log("adults:", adults); // Alice et Charlie
console.log("activeAdults:", activeAdults); // Alice et Charlie


// 📝 Exercice 3 : reduce()

const prices = [19.99, 29.99, 9.99, 49.99];

// 1. Somme totale
const total = prices.reduce((acc, price) => acc + price, 0);

// 2. Produit de tous les nombres
const nums = [2, 3, 4];
const product = nums.reduce((acc, num) => acc * num, 1);

// 3. Concaténation de mots
const words = ["Bonjour", "le", "monde"];
const sentence = words.reduce((acc, word) => acc + " " + word).trim();
// Ou plus élégant :
const sentence2 = words.join(" ");

// 4. Quantité totale
const items = [
  { name: "Apple", quantity: 3 },
  { name: "Banana", quantity: 5 },
  { name: "Orange", quantity: 2 }
];
const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

console.log("\n=== Exercice 3 ===");
console.log("total:", total); // 109.96
console.log("product:", product); // 24
console.log("sentence:", sentence); // "Bonjour le monde"
console.log("sentence2:", sentence2); // "Bonjour le monde"
console.log("totalQuantity:", totalQuantity); // 10


// 📝 Exercice 4 : find() et findIndex()

const students = [
  { id: 1, name: "Alice", grade: "A" },
  { id: 2, name: "Bob", grade: "B" },
  { id: 3, name: "Charlie", grade: "A" },
  { id: 4, name: "David", grade: "C" }
];

// 1. Étudiant avec id 3
const student = students.find(s => s.id === 3);

// 2. Index de Bob
const bobIndex = students.findIndex(s => s.name === "Bob");

// 3. Premier étudiant avec note A
const firstAStudent = students.find(s => s.grade === "A");

console.log("\n=== Exercice 4 ===");
console.log("student:", student); // Charlie
console.log("bobIndex:", bobIndex); // 1
console.log("firstAStudent:", firstAStudent); // Alice


// 📝 Exercice 5 : some() et every()

const ages = [22, 25, 19, 30, 17];

// 1. Au moins un mineur
const hasMinor = ages.some(age => age < 18);

// 2. Tous majeurs
const allAdults = ages.every(age => age >= 18);

const passwords = ["Pass123!", "weak", "Str0ng!Pass", "12345"];

// 3. Tous >= 8 caractères
const allStrong = passwords.every(pwd => pwd.length >= 8);

// 4. Au moins un avec un chiffre
const hasNumber = passwords.some(pwd => /\d/.test(pwd));

console.log("\n=== Exercice 5 ===");
console.log("hasMinor:", hasMinor); // true
console.log("allAdults:", allAdults); // false
console.log("allStrong:", allStrong); // false
console.log("hasNumber:", hasNumber); // true


// 📝 Exercice 6 : Chaînage de méthodes

const transactions = [
  { type: "income", amount: 1000 },
  { type: "expense", amount: 200 },
  { type: "income", amount: 500 },
  { type: "expense", amount: 150 },
  { type: "income", amount: 300 }
];

// 1. Total des revenus
const totalIncome = transactions
  .filter(t => t.type === "income")
  .reduce((acc, t) => acc + t.amount, 0);

// 2. Total des dépenses
const totalExpense = transactions
  .filter(t => t.type === "expense")
  .reduce((acc, t) => acc + t.amount, 0);

// 3. Revenus doublés
const doubledIncomes = transactions
  .filter(t => t.type === "income")
  .map(t => t.amount * 2);

console.log("\n=== Exercice 6 ===");
console.log("totalIncome:", totalIncome); // 1800
console.log("totalExpense:", totalExpense); // 350
console.log("doubledIncomes:", doubledIncomes); // [2000, 1000, 600]


// 📝 Exercice 7 : Manipulation d'objets

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// 1. Clés de l'objet
const personKeys = Object.keys(person);

// 2. Valeurs de l'objet
const personValues = Object.values(person);

// 3. Ajouter email avec spread
const personWithEmail = {
  ...person,
  email: "john@example.com"
};

// 4. Fusion d'objets
const defaultSettings = {
  theme: "light",
  notifications: true,
  language: "fr"
};

const userSettings = {
  theme: "dark",
  language: "en"
};

// userSettings écrase defaultSettings
const finalSettings = {
  ...defaultSettings,
  ...userSettings
};

console.log("\n=== Exercice 7 ===");
console.log("personKeys:", personKeys); // ["firstName", "lastName", "age"]
console.log("personValues:", personValues); // ["John", "Doe", 30]
console.log("personWithEmail:", personWithEmail);
console.log("finalSettings:", finalSettings);
// { theme: "dark", notifications: true, language: "en" }


// 📝 Exercice 8 : Objets avec méthodes

const shoppingCart = {
  items: [],

  addItem(item) {
    this.items.push(item);
  },

  removeItem(name) {
    this.items = this.items.filter(item => item.name !== name);
  },

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  },

  getItemCount() {
    return this.items.length;
  }
};

console.log("\n=== Exercice 8 ===");
shoppingCart.addItem({ name: "Apple", price: 1.5, quantity: 3 });
shoppingCart.addItem({ name: "Banana", price: 0.8, quantity: 5 });
console.log("Items:", shoppingCart.items);
console.log("Total:", shoppingCart.getTotal()); // 8.5
console.log("Item count:", shoppingCart.getItemCount()); // 2

shoppingCart.removeItem("Apple");
console.log("Items après suppression:", shoppingCart.items);
console.log("Total après suppression:", shoppingCart.getTotal()); // 4
console.log("Item count après suppression:", shoppingCart.getItemCount()); // 1


// 💡 Points clés à retenir :
console.log("\n=== Points clés ===");
console.log("✅ map() : transforme chaque élément");
console.log("✅ filter() : filtre les éléments selon une condition");
console.log("✅ reduce() : réduit à une seule valeur");
console.log("✅ find() : trouve le premier élément qui correspond");
console.log("✅ some() : au moins un élément correspond");
console.log("✅ every() : tous les éléments correspondent");
console.log("✅ Chaînage : combiner plusieurs méthodes");
console.log("✅ Spread operator : ...objet pour copier/fusionner");
