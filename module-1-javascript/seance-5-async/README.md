# Séance 5 : Programmation Asynchrone (Promises et Async/Await)

## 📚 Théorie

### Synchrone vs Asynchrone

#### Pourquoi l'asynchrone existe-t-il ?

JavaScript s'exécute dans un **single thread** (un seul fil d'exécution). Sans asynchrone, le code bloquerait à chaque opération lente (réseau, fichiers, timers), rendant l'application inutilisable.

```javascript
// Synchrone : bloque l'exécution
console.log("1");
console.log("2");
console.log("3");
// Résultat : 1, 2, 3 (dans l'ordre, immédiat)

/*
   COMMENT ça marche ?
   - Chaque ligne s'exécute l'une après l'autre
   - La ligne suivante attend que la précédente soit terminée
   - Exécution prévisible et linéaire

   PROBLÈME :
   - Si une opération prend 5 secondes, tout est bloqué
   - L'interface ne répond plus
   - Terrible expérience utilisateur
*/

// Asynchrone : n'attend pas
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Résultat : 1, 3, 2 (!)

/*
   POURQUOI 1, 3, 2 et pas 1, 2, 3 ?

   JavaScript utilise l'EVENT LOOP :
   1. Exécute le code synchrone d'abord
   2. Place les callbacks asynchrones dans une file d'attente
   3. Quand le code synchrone est fini, exécute les callbacks

   Étapes détaillées :
   1. console.log("1") → affiche "1"
   2. setTimeout() → met le callback dans la file (pas exécuté maintenant !)
   3. console.log("3") → affiche "3"
   4. Code synchrone terminé
   5. Event loop prend le callback de setTimeout → affiche "2"

   POURQUOI c'est important ?
   - Permet de ne pas bloquer l'interface
   - Gère plusieurs opérations "simultanément"
   - Essentiel pour les appels réseau, timers, animations
*/

// Exemple de blocage sans asynchrone
function syncSleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Bloque tout ! ❌
  }
}

console.log("Début");
syncSleep(3000); // BLOQUE pendant 3 secondes
console.log("Fin"); // Attendra 3 secondes

// Exemple non-bloquant avec asynchrone
console.log("Début");
setTimeout(() => {
  console.log("Fin"); // S'exécute après 3s, SANS BLOQUER
}, 3000);
console.log("Entre-temps..."); // S'affiche immédiatement !
```

---

### Promises (Promesses)

#### Qu'est-ce qu'une Promise ?

Une Promise est un **contrat** : "Je te promets de te donner une valeur plus tard (ou une erreur si ça échoue)".

```javascript
// Créer une Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Succès !"); // Tiens ta valeur !
  } else {
    reject("Erreur !"); // Désolé, ça a échoué...
  }
});

/*
   COMMENT ça marche ?

   new Promise(executor) prend une fonction "executor"
   - executor reçoit 2 fonctions : resolve et reject
   - resolve(valeur) : indique que l'opération a réussi
   - reject(erreur) : indique que l'opération a échoué

   POURQUOI deux fonctions ?
   - Pour gérer SUCCÈS et ÉCHEC séparément
   - Impossible de faire les deux : une Promise se résout une seule fois
   - Une fois resolved ou rejected, l'état est permanent (immutable)
*/

// Utiliser une Promise
myPromise
  .then(result => {
    console.log(result); // "Succès !"
    // then() s'exécute si resolve() a été appelé
  })
  .catch(error => {
    console.error(error);
    // catch() s'exécute si reject() a été appelé
  })
  .finally(() => {
    console.log("Terminé");
    // finally() s'exécute TOUJOURS, succès ou échec
  });

/*
   POURQUOI utiliser .then() / .catch() ?

   - Séparation claire succès/échec
   - Chaînage possible (composition)
   - Gestion d'erreurs centralisée
   - Évite le "callback hell" (pyramide de l'enfer)

   CALLBACK HELL (avant les Promises) :
   getData(function(a) {
     getMoreData(a, function(b) {
       getMoreData(b, function(c) {
         getMoreData(c, function(d) {
           // 😱 Illisible !
         });
       });
     });
   });

   AVEC PROMISES (lisible) :
   getData()
     .then(a => getMoreData(a))
     .then(b => getMoreData(b))
     .then(c => getMoreData(c))
     .then(d => console.log(d))
     .catch(error => console.error(error));
*/
```

#### États d'une Promise

Une Promise a **3 états possibles** (et un seul à la fois) :

```javascript
/*
   1. PENDING (en attente) - état initial
      - La Promise a été créée
      - L'opération asynchrone est en cours
      - Ni resolve() ni reject() n'ont été appelés

   2. FULFILLED (résolue/accomplie) - succès ✅
      - resolve() a été appelé
      - La valeur est disponible
      - État final, ne changera plus

   3. REJECTED (rejetée) - échec ❌
      - reject() a été appelé
      - Une erreur s'est produite
      - État final, ne changera plus

   TRANSITIONS POSSIBLES :
   Pending → Fulfilled ✅
   Pending → Rejected ❌

   IMPOSSIBLE :
   Fulfilled → Rejected (❌ non)
   Rejected → Fulfilled (❌ non)
   Une Promise ne change d'état qu'UNE SEULE FOIS
*/

// Exemple pratique : simuler un appel API
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Simule un délai réseau
    setTimeout(() => {
      if (id > 0) {
        // Succès : resolve avec les données
        resolve({
          id,
          name: "Alice",
          email: "alice@example.com"
        });
      } else {
        // Échec : reject avec une erreur
        reject(new Error("ID invalide"));
      }
    }, 1000); // 1 seconde de délai
  });
}

/*
   POURQUOI setTimeout ?
   - Simule une opération asynchrone (appel réseau, lecture fichier, etc.)
   - En vrai, vous utiliseriez fetch(), fs.readFile(), etc.

   QUAND utiliser une Promise ?
   - Appels API (fetch)
   - Opérations de base de données
   - Lecture/écriture de fichiers
   - Timers complexes
   - Toute opération qui prend du temps
*/

// Utilisation
fetchUser(1)
  .then(user => {
    console.log("Utilisateur récupéré:", user);
    // { id: 1, name: "Alice", email: "alice@example.com" }
  })
  .catch(error => {
    console.error("Erreur:", error.message);
  });

fetchUser(-1) // ID invalide
  .catch(error => {
    console.error("Erreur:", error.message); // "ID invalide"
  });
```

---

### Chaîner les Promises

#### Pourquoi chaîner ?

Dans la vraie vie, les opérations asynchrones dépendent souvent les unes des autres :
1. Récupérer un utilisateur
2. Récupérer ses commandes (besoin de l'ID utilisateur)
3. Traiter les commandes

```javascript
// ❌ MAUVAIS : Pyramide de l'enfer (callback hell)
fetchUser(1, (user) => {
  fetchOrders(user.id, (orders) => {
    processOrders(orders, (result) => {
      console.log(result);
    });
  });
});

// ✅ BON : Chaînage de Promises
fetchUser(1)
  .then(user => {
    console.log("User:", user);
    // Retourner une Promise pour la chaîner
    return fetchOrders(user.id);
  })
  .then(orders => {
    console.log("Orders:", orders);
    // Chaîner une autre Promise
    return processOrders(orders);
  })
  .then(result => {
    console.log("Result:", result);
  })
  .catch(error => {
    // UN SEUL catch pour TOUTES les erreurs !
    console.error("Erreur:", error);
  });

/*
   COMMENT le chaînage marche ?

   .then() retourne TOUJOURS une Promise :
   - Si vous retournez une valeur → Promise.resolve(valeur)
   - Si vous retournez une Promise → cette Promise
   - Si vous ne retournez rien → Promise.resolve(undefined)

   POURQUOI c'est puissant ?
   - Code linéaire et lisible (comme du code synchrone)
   - Une seule gestion d'erreur (.catch à la fin)
   - L'erreur "bubble up" automatiquement
   - Composition facile d'opérations
*/

// Exemple détaillé
function step1() {
  return Promise.resolve("Résultat 1");
}

function step2(prev) {
  console.log("Reçu de step1:", prev); // "Résultat 1"
  return Promise.resolve("Résultat 2");
}

function step3(prev) {
  console.log("Reçu de step2:", prev); // "Résultat 2"
  return Promise.resolve("Résultat final");
}

step1()
  .then(step2)  // Passe le résultat de step1 à step2
  .then(step3)  // Passe le résultat de step2 à step3
  .then(final => console.log("Final:", final)); // "Résultat final"

/*
   PIÈGES COURANTS :

   1. Oublier de retourner la Promise
*/
fetchUser(1)
  .then(user => {
    fetchOrders(user.id); // ❌ Oubli du return !
  })
  .then(orders => {
    console.log(orders); // undefined ! 😱
  });

// ✅ CORRECT :
fetchUser(1)
  .then(user => {
    return fetchOrders(user.id); // ✅ Return !
  })
  .then(orders => {
    console.log(orders); // Les vraies commandes ✅
  });

/*
   2. Imbriquer des .then() (inutile !)
*/
fetchUser(1)
  .then(user => {
    return fetchOrders(user.id)
      .then(orders => { // ❌ Imbrication inutile
        return processOrders(orders);
      });
  });

// ✅ CORRECT : Chaînage plat
fetchUser(1)
  .then(user => fetchOrders(user.id))
  .then(orders => processOrders(orders));
```

---

### Async/Await

#### Pourquoi async/await ?

async/await est du **sucre syntaxique** par-dessus les Promises. Ça rend le code asynchrone **ressemblant à du code synchrone** (plus lisible !).

```javascript
// Avec Promises (.then)
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

// Avec async/await (plus lisible)
async function getUser() {
  try {
    const user = await fetchUser(1);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

/*
   COMMENT async/await marche ?

   1. async devant une fonction :
      - La fonction retourne TOUJOURS une Promise
      - Vous pouvez utiliser await à l'intérieur

   2. await devant une Promise :
      - "Attend" que la Promise se résolve
      - Retourne la valeur de resolve()
      - Si la Promise est rejetée, lève une erreur (catchable avec try/catch)

   POURQUOI c'est mieux ?
   - Syntaxe familière (comme du code synchrone)
   - Pas de .then() à enchaîner
   - Gestion d'erreur avec try/catch (standard)
   - Débogage plus facile (stack traces plus clairs)
   - Moins d'imbrication
*/

// Règle 1 : async rend la fonction asynchrone
async function exemple() {
  return 42;
}

// Équivalent à :
function exemple() {
  return Promise.resolve(42);
}

exemple().then(value => console.log(value)); // 42

/*
   Règle 2 : await PAUSE l'exécution
   (mais ne bloque PAS le thread !)
*/

async function sequentialExample() {
  console.log("Début");

  const user = await fetchUser(1);
  // ⏸️ Pause ici jusqu'à ce que fetchUser se résolve
  console.log("User récupéré:", user);

  const orders = await fetchOrders(user.id);
  // ⏸️ Pause ici jusqu'à ce que fetchOrders se résolve
  console.log("Orders récupérées:", orders);

  console.log("Fin");
}

/*
   ATTENTION : await ne bloque PAS le thread !
   - Le code continue ailleurs dans l'application
   - Seule la fonction async est "mise en pause"
   - Le reste de votre app continue de fonctionner
*/

// Règle 3 : await uniquement dans une fonction async
function regular() {
  const user = await fetchUser(1); // ❌ Erreur de syntaxe !
}

async function asyncFunc() {
  const user = await fetchUser(1); // ✅ OK
}

// Exception : top-level await (ES2022, dans les modules)
// Dans un fichier .mjs ou module
const user = await fetchUser(1); // ✅ OK au niveau racine d'un module
```

#### Gestion d'erreurs avec async/await

```javascript
// try/catch : gestion d'erreur naturelle
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    // Attrape TOUTES les erreurs (réseau, parsing JSON, etc.)
    console.error("Erreur:", error);
    throw error; // Re-lancer si nécessaire
  }
}

/*
   POURQUOI try/catch ?
   - Syntaxe standard et familière
   - Capture toutes les erreurs de la chaîne
   - Plus lisible que .catch()
   - Permet du code de nettoyage (finally)
*/

// Avec finally
async function fetchWithCleanup() {
  let connection;
  try {
    connection = await openConnection();
    const data = await connection.getData();
    return data;
  } catch (error) {
    console.error("Erreur:", error);
  } finally {
    // S'exécute TOUJOURS (succès ou échec)
    if (connection) {
      await connection.close();
    }
  }
}

/*
   QUAND utiliser finally ?
   - Fermer des connexions
   - Nettoyer des ressources
   - Masquer un loader
   - Code qui doit s'exécuter peu importe le résultat
*/

// Attraper sans try/catch (avec .catch())
async function alternative() {
  const user = await fetchUser(1).catch(error => {
    console.error("Erreur user:", error);
    return null; // Valeur par défaut
  });

  if (!user) return;

  // Continue...
}

/*
   QUAND utiliser .catch() avec await ?
   - Pour gérer une erreur spécifique
   - Fournir une valeur par défaut
   - Continuer l'exécution même en cas d'erreur
*/
```

---

### Promise.all()

#### Exécution parallèle

```javascript
// ❌ SÉQUENTIEL (lent) - attend chaque opération
async function getDataSequential() {
  const user = await fetchUser(1);      // Attend 1s
  const posts = await fetchPosts(1);    // Attend 1s
  const comments = await fetchComments(1); // Attend 1s
  // Total : ~3 secondes
  return { user, posts, comments };
}

// ✅ PARALLÈLE (rapide) - toutes en même temps !
async function getDataParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  // Total : ~1 seconde (la plus lente)
  return { user, posts, comments };
}

/*
   COMMENT Promise.all() marche ?
   - Prend un tableau de Promises
   - Lance TOUTES les Promises en parallèle
   - Attend que TOUTES soient résolues
   - Retourne un tableau de résultats (dans le même ordre)

   POURQUOI l'utiliser ?
   - Performance : 3x plus rapide dans l'exemple
   - Quand les opérations sont indépendantes
   - Économie de temps sur les requêtes réseau

   ⚠️ ATTENTION :
   - Si UNE Promise échoue, Promise.all() rejette IMMÉDIATEMENT
   - Les autres Promises continuent mais leurs résultats sont ignorés
*/

// Gestion d'erreurs avec Promise.all()
async function fetchAllWithError() {
  try {
    const results = await Promise.all([
      fetchUser(1),
      fetchUser(-1), // ❌ Cette Promise va échouer
      fetchUser(2)
    ]);
    console.log(results);
  } catch (error) {
    console.error("Une des Promises a échoué:", error);
    // On ne sait pas laquelle a échoué
    // Les résultats réussis sont perdus
  }
}

// Alternative : Promise.allSettled() (ES2020)
async function fetchAllSettled() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-1), // Échoue
    fetchUser(2)
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`User ${index}:`, result.value);
    } else {
      console.error(`User ${index} erreur:`, result.reason);
    }
  });
}

/*
   DIFFÉRENCE Promise.all() vs Promise.allSettled() :

   Promise.all() :
   - Rejette si UNE Promise échoue
   - Plus rapide car s'arrête à la première erreur
   - Utilisez quand TOUTES les Promises DOIVENT réussir

   Promise.allSettled() :
   - Attend TOUTES les Promises (succès ou échec)
   - Retourne les résultats de toutes
   - Utilisez quand certaines peuvent échouer sans problème
*/
```

---

### Promise.race()

#### La plus rapide gagne

```javascript
const promise1 = new Promise(resolve =>
  setTimeout(() => resolve("Lent"), 1000)
);

const promise2 = new Promise(resolve =>
  setTimeout(() => resolve("Rapide"), 500)
);

Promise.race([promise1, promise2])
  .then(result => console.log(result)); // "Rapide"

/*
   COMMENT Promise.race() marche ?
   - Lance toutes les Promises en parallèle
   - Retourne le résultat de la PREMIÈRE qui se termine
   - Succès OU échec (peu importe)
   - Les autres Promises continuent mais sont ignorées

   QUAND l'utiliser ?
   - Timeout pour une opération
   - Requêtes vers plusieurs serveurs (prendre le plus rapide)
   - Fallback si une source est lente
*/

// Cas d'usage : Timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeout)
  );

  const fetchPromise = fetch(url);

  return Promise.race([fetchPromise, timeoutPromise]);
}

/*
   POURQUOI c'est utile ?
   - fetch() n'a pas de timeout intégré
   - Évite d'attendre indéfiniment
   - Meilleure expérience utilisateur
*/

// Utilisation
try {
  const response = await fetchWithTimeout('https://api.slow.com', 3000);
  const data = await response.json();
  console.log(data);
} catch (error) {
  if (error.message === "Timeout") {
    console.error("La requête a pris trop de temps");
  }
}
```

---

## 💡 Points Clés à Retenir

### 1. Comprendre l'asynchrone
- JavaScript est **single-threaded** → besoin d'asynchrone
- **Event loop** : exécute le code sync puis async
- Sans asynchrone, l'application se bloquerait

### 2. Promises
- **3 états** : pending, fulfilled, rejected
- **.then()** pour le succès, **.catch()** pour les erreurs
- **Chaînage** : retourner une Promise dans .then()
- **Promise.all()** : parallèle, toutes doivent réussir
- **Promise.race()** : la plus rapide gagne

### 3. Async/Await
- **async** : rend la fonction asynchrone
- **await** : attend une Promise (pause la fonction)
- **try/catch** : gestion d'erreur naturelle
- Plus **lisible** que .then() / .catch()

### 4. Performance
- **Séquentiel** : une après l'autre (lent)
- **Parallèle** : Promise.all() (rapide)
- Utilisez le parallèle quand les opérations sont indépendantes

### 5. Erreurs
- Une Promise rejetée non catchée → erreur
- **Toujours** gérer les erreurs (catch ou try/catch)
- Promise.all() rejette si une seule échoue
- Promise.allSettled() pour gérer les échecs individuels

---

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

**Objectifs d'apprentissage** :
- Créer et utiliser des Promises
- Maîtriser async/await
- Gérer les erreurs
- Optimiser avec Promise.all()

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
