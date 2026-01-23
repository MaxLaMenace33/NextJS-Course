// 📝 Exercice 1 : Optional Chaining

const users = [
  {
    name: "Alice",
    address: {
      city: "Paris",
      country: "France"
    },
    contact: {
      phone: "123456"
    }
  },
  {
    name: "Bob"
    // Pas d'address ni de contact
  }
];

// 1. Récupérez la ville du premier utilisateur (utilisez ?.)
// const city1 = VOTRE CODE ICI

// 2. Récupérez la ville du deuxième utilisateur (devrait être undefined)
// const city2 = VOTRE CODE ICI

// 3. Récupérez le téléphone du deuxième utilisateur avec valeur par défaut "Non renseigné"
//    (combinez ?. et ??)
// const phone = VOTRE CODE ICI


// 📝 Exercice 2 : Nullish Coalescing

const settings = {
  volume: 0,
  brightness: 50,
  notifications: false
};

// 1. Récupérez le volume avec valeur par défaut 50
//    ⚠️ Attention : utilisez ?? (pas ||) car 0 est une valeur valide
// const volume = VOTRE CODE ICI

// 2. Récupérez theme avec valeur par défaut "light"
// const theme = VOTRE CODE ICI

// 3. Récupérez notifications avec valeur par défaut true
//    ⚠️ Attention : utilisez ?? car false est une valeur valide
// const notifs = VOTRE CODE ICI


// 📝 Exercice 3 : Template Literals

const product = {
  name: "Laptop",
  price: 999.99,
  stock: 5,
  category: "Electronics"
};

// 1. Créez un message avec template literal :
//    "Le produit {name} coûte {price}€"
// const message = VOTRE CODE ICI

// 2. Créez une carte HTML pour le produit (multiligne)
//    <div class="product">
//      <h3>{name}</h3>
//      <p>Prix: {price}€</p>
//      <p>Stock: {stock}</p>
//    </div>
// const productCard = VOTRE CODE ICI


// 📝 Exercice 4 : Array Methods Avancés

const nestedArray = [1, [2, 3], [4, [5, 6]]];

// 1. Aplatissez le tableau sur 1 niveau
// const flatOnce = VOTRE CODE ICI

// 2. Aplatissez complètement le tableau
// const flatAll = VOTRE CODE ICI

const sentences = ["Hello world", "JavaScript is fun"];

// 3. Utilisez flatMap pour obtenir tous les mots
// const words = VOTRE CODE ICI

const numbers = [10, 20, 30, 40, 50];

// 4. Récupérez le dernier élément avec .at()
// const last = VOTRE CODE ICI

// 5. Récupérez l'avant-dernier élément
// const secondLast = VOTRE CODE ICI

// 6. Créez un tableau de 1 à 10 avec Array.from()
// const oneToTen = VOTRE CODE ICI


// 📝 Exercice 5 : Manipulation d'objets avancée

const entries = [
  ["name", "Alice"],
  ["age", 25],
  ["city", "Paris"]
];

// 1. Convertissez entries en objet avec Object.fromEntries()
// const userObj = VOTRE CODE ICI

const userData = {
  name: "Bob",
  age: 30,
  city: "Lyon",
  score: 85,
  level: 5
};

// 2. Filtrez l'objet pour ne garder que les valeurs numériques
//    Utilisez Object.entries(), filter() et Object.fromEntries()
// const numericData = VOTRE CODE ICI

// 3. Vérifiez si userData a la propriété "name" avec Object.hasOwn()
// const hasName = VOTRE CODE ICI


// 📝 Exercice 6 : Tips Utiles

const mixedArray = [1, 2, 2, 3, 3, 3, 4, 4, 5];

// 1. Supprimez les doublons avec Set
// const uniqueNumbers = VOTRE CODE ICI

const text = "javascript";

// 2. Capitalisez la première lettre
// const capitalized = VOTRE CODE ICI

// 3. Inversez la chaîne
// const reversed = VOTRE CODE ICI

// 4. Créez une fonction random(min, max) qui retourne un nombre aléatoire
// const random = VOTRE CODE ICI


// 📝 Exercice 7 : Guard Clauses

// Réécrivez cette fonction avec des guard clauses (retours anticipés)
function processOrder(order) {
  if (order) {
    if (order.items && order.items.length > 0) {
      if (order.customer) {
        if (order.customer.isVerified) {
          return "Order processed";
        } else {
          return "Customer not verified";
        }
      } else {
        return "No customer";
      }
    } else {
      return "No items";
    }
  } else {
    return "No order";
  }
}

// function processOrderImproved(order) {
//   VOTRE CODE ICI
// }


// 📝 Exercice 8 : Cas pratiques

// 1. Créez une fonction getInitials qui prend un nom complet
//    et retourne les initiales (ex: "John Doe" → "JD")
// function getInitials(fullName) {
//   VOTRE CODE ICI
// }

// 2. Créez une fonction groupBy qui groupe un tableau d'objets par une clé
//    Exemple: groupBy([{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}], 'type')
//    → { fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}] }
// function groupBy(array, key) {
//   VOTRE CODE ICI
// }

// 3. Créez une fonction chunk qui divise un tableau en sous-tableaux
//    Exemple: chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
// function chunk(array, size) {
//   VOTRE CODE ICI
// }


// 🧪 Tests (décommentez pour tester vos réponses)
/*
console.log("=== Exercice 1 ===");
console.log("city1:", city1); // "Paris"
console.log("city2:", city2); // undefined
console.log("phone:", phone); // "Non renseigné"

console.log("\n=== Exercice 2 ===");
console.log("volume:", volume); // 0 (pas 50 !)
console.log("theme:", theme); // "light"
console.log("notifications:", notifs); // false (pas true !)

console.log("\n=== Exercice 3 ===");
console.log(message);
console.log(productCard);

console.log("\n=== Exercice 4 ===");
console.log("flatOnce:", flatOnce); // [1, 2, 3, 4, [5, 6]]
console.log("flatAll:", flatAll); // [1, 2, 3, 4, 5, 6]
console.log("words:", words); // ["Hello", "world", "JavaScript", "is", "fun"]
console.log("last:", last); // 50
console.log("secondLast:", secondLast); // 40
console.log("oneToTen:", oneToTen); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log("\n=== Exercice 5 ===");
console.log("userObj:", userObj); // { name: "Alice", age: 25, city: "Paris" }
console.log("numericData:", numericData); // { age: 30, score: 85, level: 5 }
console.log("hasName:", hasName); // true

console.log("\n=== Exercice 6 ===");
console.log("uniqueNumbers:", uniqueNumbers); // [1, 2, 3, 4, 5]
console.log("capitalized:", capitalized); // "Javascript"
console.log("reversed:", reversed); // "tpircsavaj"
console.log("random(1, 10):", random(1, 10)); // Entre 1 et 10

console.log("\n=== Exercice 7 ===");
console.log(processOrderImproved({ items: [1], customer: { isVerified: true } }));

console.log("\n=== Exercice 8 ===");
console.log(getInitials("John Doe")); // "JD"
console.log(groupBy([
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
], 'type'));
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
*/
