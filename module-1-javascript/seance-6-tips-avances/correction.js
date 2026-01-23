// ✅ Correction - Séance 6 : Tips Avancés JavaScript

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
  }
];

// 1. Ville du premier utilisateur
const city1 = users[0]?.address?.city;

// 2. Ville du deuxième utilisateur
const city2 = users[1]?.address?.city;

// 3. Téléphone avec valeur par défaut
const phone = users[1]?.contact?.phone ?? "Non renseigné";

console.log("=== Exercice 1 ===");
console.log("city1:", city1); // "Paris"
console.log("city2:", city2); // undefined
console.log("phone:", phone); // "Non renseigné"


// 📝 Exercice 2 : Nullish Coalescing

const settings = {
  volume: 0,
  brightness: 50,
  notifications: false
};

// 1. Volume avec ??  (0 est valide)
const volume = settings.volume ?? 50;

// 2. Theme avec valeur par défaut
const theme = settings.theme ?? "light";

// 3. Notifications avec ?? (false est valide)
const notifs = settings.notifications ?? true;

console.log("\n=== Exercice 2 ===");
console.log("volume:", volume); // 0 (pas 50 car 0 est une valeur valide)
console.log("theme:", theme); // "light"
console.log("notifications:", notifs); // false (pas true car false est valide)


// 📝 Exercice 3 : Template Literals

const product = {
  name: "Laptop",
  price: 999.99,
  stock: 5,
  category: "Electronics"
};

// 1. Message simple
const message = `Le produit ${product.name} coûte ${product.price}€`;

// 2. Carte HTML multiligne
const productCard = `
<div class="product">
  <h3>${product.name}</h3>
  <p>Prix: ${product.price}€</p>
  <p>Stock: ${product.stock}</p>
</div>
`;

console.log("\n=== Exercice 3 ===");
console.log(message);
console.log(productCard);


// 📝 Exercice 4 : Array Methods Avancés

const nestedArray = [1, [2, 3], [4, [5, 6]]];

// 1. Aplatir 1 niveau
const flatOnce = nestedArray.flat();

// 2. Aplatir complètement
const flatAll = nestedArray.flat(Infinity);
// ou flat(2) car on sait qu'il y a 2 niveaux

const sentences = ["Hello world", "JavaScript is fun"];

// 3. flatMap pour les mots
const words = sentences.flatMap(s => s.split(" "));

const numbers = [10, 20, 30, 40, 50];

// 4. Dernier élément
const last = numbers.at(-1);

// 5. Avant-dernier
const secondLast = numbers.at(-2);

// 6. Tableau de 1 à 10
const oneToTen = Array.from({ length: 10 }, (_, i) => i + 1);

console.log("\n=== Exercice 4 ===");
console.log("flatOnce:", flatOnce); // [1, 2, 3, 4, [5, 6]]
console.log("flatAll:", flatAll); // [1, 2, 3, 4, 5, 6]
console.log("words:", words); // ["Hello", "world", "JavaScript", "is", "fun"]
console.log("last:", last); // 50
console.log("secondLast:", secondLast); // 40
console.log("oneToTen:", oneToTen); // [1, 2, ..., 10]


// 📝 Exercice 5 : Manipulation d'objets avancée

const entries = [
  ["name", "Alice"],
  ["age", 25],
  ["city", "Paris"]
];

// 1. Convertir en objet
const userObj = Object.fromEntries(entries);

const userData = {
  name: "Bob",
  age: 30,
  city: "Lyon",
  score: 85,
  level: 5
};

// 2. Filtrer les valeurs numériques
const numericData = Object.fromEntries(
  Object.entries(userData).filter(([key, value]) => typeof value === "number")
);

// 3. Vérifier la propriété
const hasName = Object.hasOwn(userData, "name");

console.log("\n=== Exercice 5 ===");
console.log("userObj:", userObj);
console.log("numericData:", numericData); // { age: 30, score: 85, level: 5 }
console.log("hasName:", hasName); // true


// 📝 Exercice 6 : Tips Utiles

const mixedArray = [1, 2, 2, 3, 3, 3, 4, 4, 5];

// 1. Supprimer les doublons
const uniqueNumbers = [...new Set(mixedArray)];

const text = "javascript";

// 2. Capitaliser
const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
// ou : text[0].toUpperCase() + text.slice(1)

// 3. Inverser
const reversed = text.split("").reverse().join("");

// 4. Nombre aléatoire
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

console.log("\n=== Exercice 6 ===");
console.log("uniqueNumbers:", uniqueNumbers); // [1, 2, 3, 4, 5]
console.log("capitalized:", capitalized); // "Javascript"
console.log("reversed:", reversed); // "tpircsavaj"
console.log("random(1, 10):", random(1, 10));


// 📝 Exercice 7 : Guard Clauses

// Version améliorée avec guard clauses
function processOrderImproved(order) {
  if (!order) return "No order";
  if (!order.items || order.items.length === 0) return "No items";
  if (!order.customer) return "No customer";
  if (!order.customer.isVerified) return "Customer not verified";

  return "Order processed";
}

console.log("\n=== Exercice 7 ===");
console.log(processOrderImproved(null)); // "No order"
console.log(processOrderImproved({ items: [] })); // "No items"
console.log(processOrderImproved({ items: [1] })); // "No customer"
console.log(processOrderImproved({ items: [1], customer: {} })); // "Customer not verified"
console.log(processOrderImproved({ items: [1], customer: { isVerified: true } })); // "Order processed"


// 📝 Exercice 8 : Cas pratiques

// 1. getInitials
function getInitials(fullName) {
  return fullName
    .split(" ")
    .map(word => word[0].toUpperCase())
    .join("");
}

// 2. groupBy
function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

// 3. chunk
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Ou version avec reduce :
function chunkV2(array, size) {
  return array.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(item);
    return acc;
  }, []);
}

console.log("\n=== Exercice 8 ===");
console.log("getInitials('John Doe'):", getInitials("John Doe")); // "JD"
console.log("getInitials('Alice Bob Charlie'):", getInitials("Alice Bob Charlie")); // "ABC"

const items = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
];
console.log("groupBy:", groupBy(items, 'type'));
/*
{
  fruit: [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' }
  ],
  vegetable: [
    { type: 'vegetable', name: 'carrot' }
  ]
}
*/

console.log("chunk([1,2,3,4,5], 2):", chunk([1, 2, 3, 4, 5], 2));
// [[1, 2], [3, 4], [5]]
console.log("chunk([1,2,3,4,5,6], 3):", chunk([1, 2, 3, 4, 5, 6], 3));
// [[1, 2, 3], [4, 5, 6]]


// 💡 Points clés à retenir :
console.log("\n=== Points clés ===");
console.log("✅ ?. : accès sécurisé aux propriétés");
console.log("✅ ?? : valeur par défaut (seulement null/undefined)");
console.log("✅ Template literals : interpolation et multiligne");
console.log("✅ flat() : aplatir les tableaux imbriqués");
console.log("✅ at() : accès avec index négatif");
console.log("✅ Set : supprimer les doublons");
console.log("✅ Guard clauses : retours anticipés pour code plus lisible");
