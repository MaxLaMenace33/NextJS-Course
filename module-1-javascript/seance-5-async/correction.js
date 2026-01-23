// ✅ Correction - Séance 5 : Programmation Asynchrone

// 📝 Exercice 1 : Créer des Promises

// 1. waitFor
function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 2. randomSuccess
function randomSuccess() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Succès !");
    } else {
      reject("Échec !");
    }
  });
}

// 3. fetchFakeUser
function fetchFakeUser(id) {
  return waitFor(1000).then(() => ({
    id,
    name: `User${id}`,
    email: `user${id}@example.com`
  }));
}

// Ou avec async/await :
async function fetchFakeUserV2(id) {
  await waitFor(1000);
  return {
    id,
    name: `User${id}`,
    email: `user${id}@example.com`
  };
}

console.log("=== Exercice 1 ===");
console.log("Test waitFor...");
waitFor(1000).then(() => console.log("✅ 1 seconde écoulée"));

console.log("Test randomSuccess...");
randomSuccess()
  .then(result => console.log("✅", result))
  .catch(error => console.error("❌", error));

console.log("Test fetchFakeUser...");
fetchFakeUser(1).then(user => console.log("✅ User:", user));


// 📝 Exercice 2 : Utiliser les Promises avec .then() et .catch()

console.log("\n=== Exercice 2 ===");

// 1. Utiliser fetchFakeUser
fetchFakeUser(1)
  .then(user => console.log("Utilisateur récupéré:", user));

// 2. Gérer randomSuccess
randomSuccess()
  .then(result => console.log("Résultat:", result))
  .catch(error => console.error("Erreur:", error));


// 📝 Exercice 3 : Async/Await

// 1. getUserData
async function getUserData() {
  console.log("Loading...");
  const user = await fetchFakeUser(5);
  console.log("Utilisateur récupéré:", user);
  return user;
}

// 2. getMultipleUsers (séquentiel)
async function getMultipleUsers(ids) {
  const users = [];
  for (const id of ids) {
    const user = await fetchFakeUser(id);
    users.push(user);
  }
  return users;
}

console.log("\n=== Exercice 3 ===");
getUserData().then(user => console.log("User retourné:", user));

console.log("Récupération séquentielle...");
const startSeq = Date.now();
getMultipleUsers([1, 2, 3]).then(users => {
  const elapsed = Date.now() - startSeq;
  console.log("Utilisateurs séquentiels:", users);
  console.log(`Temps: ${elapsed}ms (~3000ms attendu)`);
});


// 📝 Exercice 4 : Gestion d'erreurs

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

// safeCall
async function safeCall(id) {
  try {
    const result = await unreliableFunction(id);
    return result;
  } catch (error) {
    return `Erreur attrapée: ${error.message}`;
  }
}

console.log("\n=== Exercice 4 ===");
safeCall(2).then(console.log); // Devrait réussir
safeCall(3).then(console.log); // Devrait gérer l'erreur


// 📝 Exercice 5 : Promise.all()

// getAllUsersConcurrent (parallèle)
async function getAllUsersConcurrent(ids) {
  const promises = ids.map(id => fetchFakeUser(id));
  return await Promise.all(promises);
}

// Ou version plus courte :
async function getAllUsersConcurrentV2(ids) {
  return await Promise.all(ids.map(id => fetchFakeUser(id)));
}

console.log("\n=== Exercice 5 ===");
console.log("Récupération concurrente...");
const startConc = Date.now();
getAllUsersConcurrent([1, 2, 3]).then(users => {
  const elapsed = Date.now() - startConc;
  console.log("Utilisateurs concurrents:", users);
  console.log(`Temps: ${elapsed}ms (~1000ms attendu)`);
});


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

async function getFastestServer() {
  return await Promise.race([
    fetchFromServer1(),
    fetchFromServer2(),
    fetchFromServer3()
  ]);
}

console.log("\n=== Exercice 6 ===");
getFastestServer().then(result => {
  console.log("Serveur le plus rapide:", result);
  // Devrait être "Données du serveur 2" (500ms)
});


// 📝 Exercice 7 : Timeout

function fetchWithTimeout(promise, timeout) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeout)
  );

  return Promise.race([promise, timeoutPromise]);
}

console.log("\n=== Exercice 7 ===");

fetchWithTimeout(waitFor(500), 1000)
  .then(() => console.log("✅ Succès dans les temps"))
  .catch(error => console.error("❌", error.message));

fetchWithTimeout(waitFor(2000), 1000)
  .then(() => console.log("Succès"))
  .catch(error => console.error("❌ Timeout attrapé:", error.message));


// 📝 Exercice 8 : Cas pratique - Traitement de données

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Keyboard" }
];

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

async function enrichProducts(products) {
  // Récupérer tous les détails en parallèle
  const detailsPromises = products.map(product =>
    fetchProductDetails(product.id)
  );

  const allDetails = await Promise.all(detailsPromises);

  // Fusionner les données
  return products.map((product, index) => ({
    ...product,
    ...allDetails[index]
  }));
}

console.log("\n=== Exercice 8 ===");
enrichProducts(products).then(enriched => {
  console.log("Produits enrichis:");
  enriched.forEach(p => console.log(p));
});


// 💡 Points clés à retenir :
setTimeout(() => {
  console.log("\n=== Points clés ===");
  console.log("✅ Promises : représentent une valeur future");
  console.log("✅ async/await : syntaxe moderne pour les Promises");
  console.log("✅ try/catch : gérer les erreurs avec async/await");
  console.log("✅ Promise.all() : exécuter en parallèle");
  console.log("✅ Promise.race() : prendre la plus rapide");
  console.log("✅ Toujours gérer les erreurs !");
}, 5000);
