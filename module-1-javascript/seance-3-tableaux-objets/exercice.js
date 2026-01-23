// 📝 Exercice 1 : map()
// Utilisez map() pour transformer les tableaux

const numbers = [1, 2, 3, 4, 5];

// 1. Créez un nouveau tableau avec chaque nombre multiplié par 3
// const tripled = VOTRE CODE ICI

// 2. Créez un nouveau tableau avec le carré de chaque nombre
// const squared = VOTRE CODE ICI

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
];

// 3. Créez un tableau contenant uniquement les noms des produits
// const productNames = VOTRE CODE ICI

// 4. Créez un tableau avec les prix augmentés de 10%
// const increasedPrices = VOTRE CODE ICI


// 📝 Exercice 2 : filter()
// Utilisez filter() pour filtrer les éléments

const scores = [45, 67, 89, 34, 92, 78, 55];

// 1. Filtrez les scores supérieurs ou égaux à 60
// const passingScores = VOTRE CODE ICI

// 2. Filtrez les scores inférieurs à 50
// const failingScores = VOTRE CODE ICI

const users = [
  { name: "Alice", age: 25, isActive: true },
  { name: "Bob", age: 17, isActive: false },
  { name: "Charlie", age: 30, isActive: true },
  { name: "David", age: 16, isActive: true }
];

// 3. Filtrez les utilisateurs majeurs (age >= 18)
// const adults = VOTRE CODE ICI

// 4. Filtrez les utilisateurs actifs ET majeurs
// const activeAdults = VOTRE CODE ICI


// 📝 Exercice 3 : reduce()
// Utilisez reduce() pour calculer des valeurs

const prices = [19.99, 29.99, 9.99, 49.99];

// 1. Calculez la somme totale des prix
// const total = VOTRE CODE ICI

// 2. Calculez le produit de tous les nombres (multiplication)
const nums = [2, 3, 4];
// const product = VOTRE CODE ICI

const words = ["Bonjour", "le", "monde"];

// 3. Concaténez tous les mots en une seule phrase (avec des espaces)
// const sentence = VOTRE CODE ICI

const items = [
  { name: "Apple", quantity: 3 },
  { name: "Banana", quantity: 5 },
  { name: "Orange", quantity: 2 }
];

// 4. Calculez la quantité totale d'items
// const totalQuantity = VOTRE CODE ICI


// 📝 Exercice 4 : find() et findIndex()

const students = [
  { id: 1, name: "Alice", grade: "A" },
  { id: 2, name: "Bob", grade: "B" },
  { id: 3, name: "Charlie", grade: "A" },
  { id: 4, name: "David", grade: "C" }
];

// 1. Trouvez l'étudiant avec l'id 3
// const student = VOTRE CODE ICI

// 2. Trouvez l'index de l'étudiant nommé "Bob"
// const bobIndex = VOTRE CODE ICI

// 3. Trouvez le premier étudiant avec la note "A"
// const firstAStudent = VOTRE CODE ICI


// 📝 Exercice 5 : some() et every()

const ages = [22, 25, 19, 30, 17];

// 1. Vérifiez si au moins un âge est inférieur à 18
// const hasMinor = VOTRE CODE ICI

// 2. Vérifiez si tous les âges sont supérieurs ou égaux à 18
// const allAdults = VOTRE CODE ICI

const passwords = ["Pass123!", "weak", "Str0ng!Pass", "12345"];

// 3. Vérifiez si tous les mots de passe ont au moins 8 caractères
// const allStrong = VOTRE CODE ICI

// 4. Vérifiez si au moins un mot de passe contient un chiffre
// const hasNumber = VOTRE CODE ICI (utilisez /\d/.test(password))


// 📝 Exercice 6 : Chaînage de méthodes
// Combinez plusieurs méthodes

const transactions = [
  { type: "income", amount: 1000 },
  { type: "expense", amount: 200 },
  { type: "income", amount: 500 },
  { type: "expense", amount: 150 },
  { type: "income", amount: 300 }
];

// 1. Calculez le total des revenus (type: "income")
// const totalIncome = VOTRE CODE ICI (filter puis reduce)

// 2. Calculez le total des dépenses (type: "expense")
// const totalExpense = VOTRE CODE ICI

// 3. Obtenez les montants des revenus uniquement, doublés
// const doubledIncomes = VOTRE CODE ICI (filter puis map)


// 📝 Exercice 7 : Manipulation d'objets

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// 1. Récupérez toutes les clés de l'objet person
// const personKeys = VOTRE CODE ICI

// 2. Récupérez toutes les valeurs de l'objet person
// const personValues = VOTRE CODE ICI

// 3. Créez un nouvel objet en ajoutant la propriété email: "john@example.com"
//    (utilisez le spread operator)
// const personWithEmail = VOTRE CODE ICI

// 4. Créez un objet settings avec les propriétés par défaut
const defaultSettings = {
  theme: "light",
  notifications: true,
  language: "fr"
};

const userSettings = {
  theme: "dark",
  language: "en"
};

// Fusionnez les objets (userSettings doit écraser defaultSettings)
// const finalSettings = VOTRE CODE ICI


// 📝 Exercice 8 : Objets avec méthodes

// Créez un objet shoppingCart avec :
// - Une propriété items (tableau vide)
// - Une méthode addItem(item) qui ajoute un item { name, price, quantity }
// - Une méthode removeItem(name) qui retire un item par son nom
// - Une méthode getTotal() qui calcule le total (price * quantity pour chaque item)
// - Une méthode getItemCount() qui retourne le nombre total d'items

// const shoppingCart = {
//   VOTRE CODE ICI
// };


// 🧪 Tests (décommentez pour tester vos réponses)
/*
console.log("=== Exercice 1 ===");
console.log("tripled:", tripled); // [3, 6, 9, 12, 15]
console.log("squared:", squared); // [1, 4, 9, 16, 25]
console.log("productNames:", productNames); // ["Laptop", "Mouse", "Keyboard"]
console.log("increasedPrices:", increasedPrices); // [1100, 27.5, 82.5]

console.log("\n=== Exercice 2 ===");
console.log("passingScores:", passingScores); // [67, 89, 92, 78, 55]
console.log("failingScores:", failingScores); // [45, 34]
console.log("adults:", adults); // Alice et Charlie
console.log("activeAdults:", activeAdults); // Alice et Charlie

console.log("\n=== Exercice 3 ===");
console.log("total:", total); // 109.96
console.log("product:", product); // 24
console.log("sentence:", sentence); // "Bonjour le monde"
console.log("totalQuantity:", totalQuantity); // 10

console.log("\n=== Exercice 4 ===");
console.log("student:", student); // Charlie
console.log("bobIndex:", bobIndex); // 1
console.log("firstAStudent:", firstAStudent); // Alice

console.log("\n=== Exercice 5 ===");
console.log("hasMinor:", hasMinor); // true
console.log("allAdults:", allAdults); // false
console.log("allStrong:", allStrong); // false
console.log("hasNumber:", hasNumber); // true

console.log("\n=== Exercice 6 ===");
console.log("totalIncome:", totalIncome); // 1800
console.log("totalExpense:", totalExpense); // 350
console.log("doubledIncomes:", doubledIncomes); // [2000, 1000, 600]

console.log("\n=== Exercice 7 ===");
console.log("personKeys:", personKeys); // ["firstName", "lastName", "age"]
console.log("personValues:", personValues); // ["John", "Doe", 30]
console.log("personWithEmail:", personWithEmail);
console.log("finalSettings:", finalSettings);
// { theme: "dark", notifications: true, language: "en" }

console.log("\n=== Exercice 8 ===");
shoppingCart.addItem({ name: "Apple", price: 1.5, quantity: 3 });
shoppingCart.addItem({ name: "Banana", price: 0.8, quantity: 5 });
console.log("Total:", shoppingCart.getTotal()); // 8.5
console.log("Item count:", shoppingCart.getItemCount()); // 2
shoppingCart.removeItem("Apple");
console.log("Total après suppression:", shoppingCart.getTotal()); // 4
console.log("Item count après suppression:", shoppingCart.getItemCount()); // 1
*/
