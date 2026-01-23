# Séance 5 : Programmation Asynchrone (Promises et Async/Await)

## 📚 Théorie

### Synchrone vs Asynchrone

```javascript
// Synchrone : bloque l'exécution
console.log("1");
console.log("2");
console.log("3");
// Résultat : 1, 2, 3

// Asynchrone : n'attend pas
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Résultat : 1, 3, 2
```

### Promises (Promesses)

Une Promise représente une valeur qui sera disponible maintenant, plus tard, ou jamais.

```javascript
// Créer une Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Succès !");
  } else {
    reject("Erreur !");
  }
});

// Utiliser une Promise
myPromise
  .then(result => {
    console.log(result); // "Succès !"
  })
  .catch(error => {
    console.error(error);
  });
```

### États d'une Promise

1. **Pending** (en attente) : état initial
2. **Fulfilled** (résolue) : opération réussie
3. **Rejected** (rejetée) : opération échouée

```javascript
// Exemple pratique : simuler un appel API
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice", email: "alice@example.com" });
      } else {
        reject(new Error("ID invalide"));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### Chaîner les Promises

```javascript
fetchUser(1)
  .then(user => {
    console.log("User:", user);
    return fetchOrders(user.id); // Retourne une nouvelle Promise
  })
  .then(orders => {
    console.log("Orders:", orders);
    return processOrders(orders);
  })
  .then(result => {
    console.log("Result:", result);
  })
  .catch(error => {
    console.error("Erreur:", error);
  });
```

### Async/Await

Syntaxe moderne pour gérer les Promises de manière plus lisible.

```javascript
// Sans async/await
function getUser() {
  return fetchUser(1)
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(error => {
      console.error(error);
    });
}

// Avec async/await
async function getUser() {
  try {
    const user = await fetchUser(1);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}
```

### Règles d'Async/Await

```javascript
// 1. async devant la fonction
async function myFunction() {
  // ...
}

// 2. await uniquement dans une fonction async
async function getData() {
  const data = await fetchData(); // ✅ OK
}

// await fetchData(); // ❌ Erreur ! Pas dans une fonction async

// 3. Une fonction async retourne toujours une Promise
async function getValue() {
  return 42;
}

getValue().then(value => console.log(value)); // 42
```

### Gestion d'Erreurs

```javascript
// Avec try/catch
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error; // Re-lancer l'erreur si nécessaire
  }
}

// Avec .catch()
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Promise.all()

Attendre plusieurs Promises en parallèle.

```javascript
// Exécution séquentielle (lent)
async function getDataSequential() {
  const user = await fetchUser(1); // Attend 1s
  const posts = await fetchPosts(1); // Attend 1s
  const comments = await fetchComments(1); // Attend 1s
  // Total : ~3s
  return { user, posts, comments };
}

// Exécution parallèle (rapide)
async function getDataParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  // Total : ~1s (toutes en même temps)
  return { user, posts, comments };
}
```

### Promise.race()

Retourne la première Promise qui se termine.

```javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve("Lent"), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve("Rapide"), 500));

Promise.race([promise1, promise2])
  .then(result => console.log(result)); // "Rapide"
```

### Cas d'Usage Pratiques

```javascript
// Simuler un délai
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function exemple() {
  console.log("Début");
  await delay(2000); // Attend 2 secondes
  console.log("Fin");
}

// Retry automatique
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(1000 * (i + 1)); // Délai exponentiel
    }
  }
}

// Timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeout)
  );

  const fetchPromise = fetch(url).then(r => r.json());

  return Promise.race([fetchPromise, timeoutPromise]);
}
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
