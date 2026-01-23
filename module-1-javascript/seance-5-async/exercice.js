// 📝 Exercice 1 : Créer des Promises

// 1. Créez une fonction waitFor qui prend un nombre de millisecondes
//    et retourne une Promise qui se résout après ce délai
// function waitFor(ms) {
//   VOTRE CODE ICI
// }

// 2. Créez une fonction randomSuccess qui :
//    - Retourne une Promise
//    - Résout avec "Succès !" si Math.random() > 0.5
//    - Rejette avec "Échec !" sinon
// function randomSuccess() {
//   VOTRE CODE ICI
// }

// 3. Créez une fonction fetchFakeUser qui simule un appel API
//    - Prend un id en paramètre
//    - Attend 1 seconde (utilisez waitFor)
//    - Retourne { id, name: "User" + id, email: `user${id}@example.com` }
// function fetchFakeUser(id) {
//   VOTRE CODE ICI
// }


// 📝 Exercice 2 : Utiliser les Promises avec .then() et .catch()

// 1. Utilisez fetchFakeUser(1) et affichez le résultat avec .then()
// VOTRE CODE ICI

// 2. Utilisez randomSuccess et gérez les deux cas (succès et échec)
// VOTRE CODE ICI


// 📝 Exercice 3 : Async/Await

// 1. Créez une fonction async getUserData qui :
//    - Utilise await avec fetchFakeUser(5)
//    - Affiche "Loading..."
//    - Affiche l'utilisateur récupéré
//    - Retourne l'utilisateur
// async function getUserData() {
//   VOTRE CODE ICI
// }

// 2. Créez une fonction async getMultipleUsers qui :
//    - Prend un tableau d'IDs
//    - Récupère tous les utilisateurs un par un (séquentiellement)
//    - Retourne un tableau d'utilisateurs
// async function getMultipleUsers(ids) {
//   VOTRE CODE ICI
// }


// 📝 Exercice 4 : Gestion d'erreurs

// Fonction qui échoue parfois
function unreliableFunction(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id % 2 === 0) {
        resolve(`Succès pour ID ${id}`);
      } else {
        reject(new Error(`Échec pour ID ${id}`));
      }
    }, 500);
  });
}

// 1. Créez une fonction async safeCall qui :
//    - Appelle unreliableFunction
//    - Utilise try/catch pour gérer les erreurs
//    - Retourne le résultat ou "Erreur attrapée: {message}"
// async function safeCall(id) {
//   VOTRE CODE ICI
// }


// 📝 Exercice 5 : Promise.all()

// 1. Créez une fonction async getAllUsersConcurrent qui :
//    - Prend un tableau d'IDs
//    - Récupère tous les utilisateurs en PARALLÈLE (Promise.all)
//    - Retourne un tableau d'utilisateurs
// async function getAllUsersConcurrent(ids) {
//   VOTRE CODE ICI
// }

// 2. Comparez le temps d'exécution :
//    - getMultipleUsers([1, 2, 3]) : ~3 secondes
//    - getAllUsersConcurrent([1, 2, 3]) : ~1 seconde


// 📝 Exercice 6 : Promise.race()

function fetchFromServer1() {
  return new Promise(resolve =>
    setTimeout(() => resolve("Données du serveur 1"), 1000)
  );
}

function fetchFromServer2() {
  return new Promise(resolve =>
    setTimeout(() => resolve("Données du serveur 2"), 500)
  );
}

function fetchFromServer3() {
  return new Promise(resolve =>
    setTimeout(() => resolve("Données du serveur 3"), 1500)
  );
}

// 1. Créez une fonction getFastestServer qui :
//    - Utilise Promise.race pour récupérer la réponse la plus rapide
//    - Retourne le résultat du serveur le plus rapide
// async function getFastestServer() {
//   VOTRE CODE ICI
// }


// 📝 Exercice 7 : Timeout

// 1. Créez une fonction fetchWithTimeout qui :
//    - Prend une Promise et un timeout (ms)
//    - Utilise Promise.race entre la Promise et un timeout
//    - Rejette avec "Timeout" si le timeout est dépassé
// function fetchWithTimeout(promise, timeout) {
//   VOTRE CODE ICI
// }

// Test : fetchWithTimeout(waitFor(2000), 1000) devrait rejeter


// 📝 Exercice 8 : Cas pratique - Traitement de données

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Keyboard" }
];

// Fonction simulant un appel API pour les détails
function fetchProductDetails(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        price: Math.floor(Math.random() * 1000) + 100,
        stock: Math.floor(Math.random() * 50)
      });
    }, 500);
  });
}

// 1. Créez une fonction async enrichProducts qui :
//    - Prend le tableau products
//    - Pour chaque produit, récupère les détails avec fetchProductDetails
//    - Fusionne les données (nom + détails)
//    - Retourne le tableau enrichi
//    - UTILISEZ Promise.all pour la performance
// async function enrichProducts(products) {
//   VOTRE CODE ICI
// }


// 🧪 Tests (décommentez pour tester vos réponses)
/*
console.log("=== Exercice 1 ===");
waitFor(1000).then(() => console.log("1 seconde écoulée"));

randomSuccess()
  .then(result => console.log(result))
  .catch(error => console.error(error));

fetchFakeUser(1).then(user => console.log(user));

console.log("\n=== Exercice 2 ===");
// Testez vos appels .then() et .catch()

console.log("\n=== Exercice 3 ===");
getUserData().then(user => console.log("Utilisateur retourné:", user));

getMultipleUsers([1, 2, 3]).then(users => {
  console.log("Utilisateurs séquentiels:", users);
});

console.log("\n=== Exercice 4 ===");
safeCall(2).then(console.log); // Devrait réussir
safeCall(3).then(console.log); // Devrait gérer l'erreur

console.log("\n=== Exercice 5 ===");
getAllUsersConcurrent([1, 2, 3]).then(users => {
  console.log("Utilisateurs concurrents:", users);
});

console.log("\n=== Exercice 6 ===");
getFastestServer().then(result => console.log("Serveur le plus rapide:", result));

console.log("\n=== Exercice 7 ===");
fetchWithTimeout(waitFor(500), 1000)
  .then(() => console.log("Succès dans les temps"))
  .catch(error => console.error(error));

fetchWithTimeout(waitFor(2000), 1000)
  .then(() => console.log("Succès"))
  .catch(error => console.error("Timeout attrapé:", error));

console.log("\n=== Exercice 8 ===");
enrichProducts(products).then(enriched => {
  console.log("Produits enrichis:", enriched);
});
*/
