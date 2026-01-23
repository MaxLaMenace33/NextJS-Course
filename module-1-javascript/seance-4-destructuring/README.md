# Séance 4 : Destructuring et Spread Operator

## 📚 Théorie

### Destructuring de Tableaux

```javascript
// Sans destructuring - l'ancienne méthode (répétitive et verbeuse)
const colors = ["red", "green", "blue"];
const firstColor = colors[0];
const secondColor = colors[1];

/*
   PROBLÈME de l'ancienne méthode :
   - Code répétitif : colors[0], colors[1], colors[2]...
   - Moins lisible : il faut compter les indices
   - Erreurs fréquentes : oublier un indice, se tromper dans l'ordre
   - Pas pratique pour extraire plusieurs valeurs
*/

// Avec destructuring - la méthode moderne (concise et claire)
const [first, second, third] = colors;
console.log(first); // "red"
console.log(second); // "green"
console.log(third); // "blue"

/*
   POURQUOI le destructuring de tableaux ?
   - Extraire PLUSIEURS valeurs en UNE SEULE ligne
   - Code plus LISIBLE : les noms de variables sont explicites
   - Évite la RÉPÉTITION de colors[0], colors[1], etc.
   - Syntaxe MODERNE et standard en JavaScript

   COMMENT ça marche ?
   - JavaScript "décompose" le tableau en variables individuelles
   - ORDRE IMPORTANT : [first, second, third] correspond à [0, 1, 2]
   - Équivalent à :
     const first = colors[0];
     const second = colors[1];
     const third = colors[2];

   QUAND l'utiliser ?
   - Extraire des valeurs d'un tableau retourné par une fonction
   - Travailler avec des coordonnées [x, y]
   - Parser des données CSV ou structurées
   - Swap de variables (échanger deux valeurs)

   ⚠️ ATTENTION :
   - L'ordre compte ! [first, second] ≠ [second, first]
   - Si le tableau a moins d'éléments, les variables sont undefined
*/

// Ignorer des éléments avec une virgule vide
const [primary, , tertiary] = colors;
console.log(primary); // "red"
console.log(tertiary); // "blue"
// Notez l'espace vide : [primary, , tertiary]
//                                  ↑ skip le 2ème élément

/*
   POURQUOI ignorer des éléments ?
   - Vous ne voulez PAS toutes les valeurs
   - Extraire seulement ce qui vous intéresse
   - Évite de créer des variables inutiles

   COMMENT ça marche ?
   - Utilisez une VIRGULE VIDE (,,) pour sauter un élément
   - L'indice continue de s'incrémenter normalement
   - [primary, , tertiary] = colors
     primary = colors[0]  → "red"
     (skip colors[1])     → ignoré
     tertiary = colors[2] → "blue"

   QUAND l'utiliser ?
   - Fonctions qui retournent [error, result] → ignorer error
   - Tableaux avec des données non pertinentes
   - Extraire le 1er et 3ème élément seulement

   💡 ASTUCE :
   - Vous pouvez ignorer autant d'éléments que vous voulez
   - [first, , , fourth] ignore le 2ème et 3ème
*/

// Valeurs par défaut (si l'élément n'existe pas)
const [a, b, c, d = "yellow"] = colors;
console.log(d); // "yellow"
// colors n'a que 3 éléments, donc d prend la valeur par défaut

/*
   POURQUOI les valeurs par défaut ?
   - Éviter undefined quand le tableau est plus court
   - Fournir des valeurs de SECOURS (fallback)
   - Rendre le code plus ROBUSTE et prévisible

   COMMENT ça marche ?
   - Syntaxe : nomVariable = valeurParDefaut
   - Si l'élément EXISTE → utilise sa valeur
   - Si l'élément N'EXISTE PAS → utilise la valeur par défaut
   - Si l'élément est undefined → utilise la valeur par défaut

   QUAND l'utiliser ?
   - Tableaux de taille variable
   - Configuration optionnelle
   - Parser des données incomplètes

   ⚠️ ATTENTION :
   - null n'active PAS la valeur par défaut (seulement undefined)
   - const [x = 5] = [null] → x vaut null, pas 5
   - const [x = 5] = [undefined] → x vaut 5
*/

// Rest operator (...) - Capturer le RESTE des éléments
const numbers = [1, 2, 3, 4, 5];
const [firstNum, secondNum, ...rest] = numbers;
console.log(firstNum); // 1
console.log(secondNum); // 2
console.log(rest); // [3, 4, 5] ← UN TABLEAU avec les éléments restants

/*
   POURQUOI le rest operator (...) ?
   - Capturer TOUS les éléments restants en UN SEUL tableau
   - Séparer les premiers éléments du reste
   - Travailler avec un nombre variable d'éléments

   COMMENT ça marche ?
   - Syntaxe : ...nomVariable (trois points)
   - Collecte TOUS les éléments non destructurés
   - Crée UN NOUVEAU TABLEAU avec ces éléments
   - [first, second, ...rest] = [1, 2, 3, 4, 5]
     first = 1
     second = 2
     rest = [3, 4, 5] ← tableau des éléments restants

   QUAND l'utiliser ?
   - Séparer le premier élément du reste : [head, ...tail]
   - Extraire quelques éléments et garder les autres
   - Implémenter des fonctions récursives

   ⚠️ RÈGLES IMPORTANTES :
   - ...rest doit être le DERNIER élément
   - ✅ [first, ...rest] → OK
   - ❌ [...rest, first] → ERREUR
   - Vous ne pouvez avoir qu'UN SEUL rest operator
*/
```

### Destructuring d'Objets

```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

// Destructuring basique - extraire des propriétés
const { name, age, email } = user;
console.log(name); // "Alice"
console.log(age); // 25

/*
   POURQUOI le destructuring d'objets ?
   - Extraire PLUSIEURS propriétés en UNE ligne
   - Éviter la RÉPÉTITION de user.name, user.age, user.email
   - Code plus LISIBLE et CONCIS
   - ORDRE N'IMPORTE PAS : { age, name } fonctionne aussi bien

   COMMENT ça marche ?
   - JavaScript extrait les propriétés par LEUR NOM
   - { name, age } cherche user.name et user.age
   - Équivalent à :
     const name = user.name;
     const age = user.age;
     const email = user.email;

   DIFFÉRENCE avec les tableaux :
   - Tableaux : l'ORDRE compte [first, second]
   - Objets : les NOMS comptent { name, age }
   - { age, name } = { name, age } fonctionne parfaitement

   QUAND l'utiliser ?
   - Extraire des propriétés d'un objet retourné par une API
   - Simplifier l'accès aux propriétés dans une fonction
   - Travailler avec des configurations ou options
   - Destructurer props dans React

   ⚠️ ATTENTION :
   - Les noms de variables DOIVENT correspondre aux noms des propriétés
   - { nom, age } ne trouvera PAS user.name (cherchera user.nom)
   - Si la propriété n'existe pas → undefined
*/

// Renommer les variables (aliasing)
const { name: userName, age: userAge } = user;
console.log(userName); // "Alice"
console.log(userAge); // 25
// name n'existe PAS ici, seulement userName

/*
   POURQUOI renommer ?
   - Éviter les CONFLITS de noms de variables
   - Rendre les noms plus EXPLICITES ou contextuels
   - Adapter les noms de l'API à votre nomenclature

   COMMENT ça marche ?
   - Syntaxe : { propriétéOriginale: nouveauNom }
   - { name: userName } signifie :
     "Prends user.name et appelle-le userName"
   - La propriété originale (name) n'est PAS accessible

   QUAND l'utiliser ?
   - Plusieurs objets avec des propriétés de même nom
   - Améliorer la clarté du code
   - Respecter les conventions de nommage de votre projet

   💡 EXEMPLE pratique :
   const response = { data: [...] };
   const request = { data: [...] };
   // Conflit de nom !
   const { data: responseData } = response;
   const { data: requestData } = request;
*/

// Valeurs par défaut (si la propriété n'existe pas)
const { name, city = "Paris" } = user;
console.log(city); // "Paris" (valeur par défaut)
// user.city n'existe pas, donc city prend "Paris"

/*
   POURQUOI les valeurs par défaut ?
   - Éviter undefined pour les propriétés manquantes
   - Fournir des valeurs de SECOURS (fallback)
   - Gérer des objets incomplets ou optionnels

   COMMENT ça marche ?
   - Syntaxe : { propriété = valeurParDefaut }
   - Si la propriété EXISTE → utilise sa valeur
   - Si la propriété N'EXISTE PAS → utilise la valeur par défaut
   - Si la propriété est undefined → utilise la valeur par défaut

   QUAND l'utiliser ?
   - Configurations avec valeurs optionnelles
   - Objets d'options de fonctions
   - Parser des données d'API incomplètes

   ⚠️ ATTENTION :
   - null n'active PAS la valeur par défaut
   - { x = 5 } avec {x: null} → x vaut null, pas 5
   - { x = 5 } avec {x: undefined} → x vaut 5
   - { x = 5 } avec {} → x vaut 5
*/

// Destructuring imbriqué (nested)
const person = {
  name: "Bob",
  address: {
    city: "Lyon",
    country: "France"
  }
};

const { address: { city, country } } = person;
console.log(city); // "Lyon"
console.log(country); // "France"
// ⚠️ address n'est PAS accessible ici, seulement city et country

/*
   POURQUOI le destructuring imbriqué ?
   - Accéder directement aux propriétés PROFONDES
   - Éviter person.address.city, person.address.country
   - Extraire des valeurs dans des objets complexes

   COMMENT ça marche ?
   - Syntaxe : { objet: { propriété } }
   - { address: { city } } signifie :
     1. Trouve person.address
     2. Dans address, extrais city
   - Équivalent à : const city = person.address.city;

   IMPORTANT : Deux syntaxes différentes
   - { address: { city } } → extrait person.address.city dans city
     address N'EST PAS accessible
   - { address } → extrait person.address dans address
     city N'EST PAS accessible

   QUAND l'utiliser ?
   - Données d'API avec structures imbriquées
   - Configuration avec niveaux multiples
   - Objets complexes (user.profile.settings.theme)

   ⚠️ ATTENTION :
   - Si address est undefined → ERREUR !
   - Utilisez des valeurs par défaut :
     const { address: { city } = {} } = person;
   - Ou vérifiez l'existence avant :
     if (person.address) { ... }
*/

// Rest operator (...) pour objets - Capturer le RESTE des propriétés
const { name, ...otherInfo } = user;
console.log(name); // "Alice"
console.log(otherInfo); // { age: 25, email: "alice@example.com" }
// otherInfo contient TOUTES les propriétés sauf name

/*
   POURQUOI le rest operator pour objets ?
   - Séparer QUELQUES propriétés du RESTE
   - Créer un nouvel objet SANS certaines propriétés
   - Exclure des propriétés sensibles (passwords, tokens)

   COMMENT ça marche ?
   - Syntaxe : { prop1, prop2, ...rest }
   - Collecte TOUTES les propriétés non destructurées
   - Crée UN NOUVEL OBJET avec ces propriétés
   - const { name, ...rest } = user
     name = "Alice"
     rest = { age: 25, email: "alice@example.com" }

   QUAND l'utiliser ?
   - Retirer des propriétés d'un objet : const { password, ...safe } = user
   - Passer des props dans React : <Component {...otherProps} />
   - Séparer les données de configuration

   💡 EXEMPLE pratique - Retirer le mot de passe :
   const userWithPassword = {
     name: "Alice",
     email: "alice@example.com",
     password: "secret123"
   };

   const { password, ...safeUser } = userWithPassword;
   // safeUser = { name: "Alice", email: "alice@example.com" }
   // password est isolé et peut être ignoré

   ⚠️ RÈGLES :
   - ...rest doit être le DERNIER élément
   - ✅ { name, ...rest } → OK
   - ❌ { ...rest, name } → ERREUR
*/
```

### Destructuring dans les Paramètres de Fonctions

```javascript
// Tableau en paramètre - destructurer directement dans la signature
function displayColors([first, second]) {
  console.log(`Première couleur: ${first}, Deuxième: ${second}`);
}
displayColors(["red", "blue"]);
// "Première couleur: red, Deuxième: blue"

/*
   POURQUOI destructurer dans les paramètres ?
   - Extraire les valeurs DIRECTEMENT à l'arrivée
   - Code plus CONCIS et LISIBLE
   - Évite de destructurer à l'intérieur de la fonction

   COMMENT ça marche ?
   - Au lieu de : function displayColors(colors) { const [first, second] = colors; }
   - On écrit : function displayColors([first, second]) { ... }
   - JavaScript destructure automatiquement l'argument

   QUAND l'utiliser ?
   - Fonctions qui reçoivent toujours des tableaux structurés
   - Coordonnées : function move([x, y]) { ... }
   - Résultats de fonctions : function handle([error, result]) { ... }

   ⚠️ ATTENTION :
   - Si vous passez undefined → ERREUR !
   - Utilisez une valeur par défaut :
     function displayColors([first, second] = []) { ... }
*/

// Objet en paramètre - LA PRATIQUE LA PLUS COURANTE
function greet({ name, age }) {
  return `Bonjour ${name}, vous avez ${age} ans`;
}
greet({ name: "Alice", age: 25 });
// "Bonjour Alice, vous avez 25 ans"

/*
   POURQUOI destructurer des objets en paramètres ?
   - CLARTÉ : on voit immédiatement quelles propriétés sont utilisées
   - ORDRE N'IMPORTE PAS : greet({ age: 25, name: "Alice" }) fonctionne
   - PRATIQUE STANDARD en JavaScript moderne
   - Très utilisé dans React pour les props

   COMMENT ça marche ?
   - Au lieu de : function greet(user) { return `Bonjour ${user.name}`; }
   - On écrit : function greet({ name, age }) { ... }
   - Plus besoin de user.name, user.age dans la fonction

   QUAND l'utiliser ?
   - Fonctions avec plusieurs paramètres optionnels
   - Configuration d'options
   - Components React
   - Toute fonction qui reçoit un objet

   💡 AVANTAGE ÉNORME :
   - Sans destructuring : function create(name, age, email, role, city, country) { ... }
     → Difficile de se rappeler l'ordre !
   - Avec destructuring : function create({ name, age, email, role, city, country }) { ... }
     → L'ordre n'importe pas !
     create({ role: "admin", name: "Bob", age: 30 })
*/

// Avec valeurs par défaut - PATTERN TRÈS COURANT
function createUser({ name, age = 18, role = "user" }) {
  return { name, age, role };
}
createUser({ name: "Bob" });
// { name: "Bob", age: 18, role: "user" }

createUser({ name: "Alice", age: 25, role: "admin" });
// { name: "Alice", age: 25, role: "admin" }

/*
   POURQUOI combiner destructuring + valeurs par défaut ?
   - Créer des PARAMÈTRES OPTIONNELS facilement
   - Fournir des VALEURS PAR DÉFAUT intelligentes
   - Rendre les fonctions plus FLEXIBLES

   COMMENT ça marche ?
   - { name, age = 18 } signifie :
     "Extrais name (requis) et age (18 par défaut)"
   - Si on passe { name: "Bob" } → age prend 18
   - Si on passe { name: "Bob", age: 30 } → age prend 30

   QUAND l'utiliser ?
   - Fonctions de configuration
   - Fonctions avec options multiples
   - Créateurs d'objets avec valeurs par défaut

   💡 PATTERN COMPLET avec objet par défaut :
   function createUser({ name, age = 18, role = "user" } = {}) {
     return { name, age, role };
   }
   createUser(); // Ne crash pas ! {} est utilisé

   ⚠️ SANS = {} :
   createUser(); // ERREUR : Cannot destructure undefined

   ⚠️ AVEC = {} :
   createUser(); // OK : { name: undefined, age: 18, role: "user" }
*/

// BONUS : Renommer + valeur par défaut
function processData({
  id: userId,           // Renommer id en userId
  name = "Anonymous",   // Valeur par défaut pour name
  ...metadata          // Capturer le reste
}) {
  console.log(userId, name, metadata);
}

processData({ id: 123, email: "test@example.com" });
// 123 "Anonymous" { email: "test@example.com" }
```

### Spread Operator (...)

Le spread operator "étale" ou "décompose" un tableau/objet en éléments individuels.

#### Avec des Tableaux

```javascript
// Copier un tableau - SHALLOW COPY (copie superficielle)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (non modifié ✅)
console.log(copy); // [1, 2, 3, 4]

/*
   POURQUOI utiliser le spread pour copier ?
   - Crée une COPIE INDÉPENDANTE du tableau
   - Modifier la copie ne modifie PAS l'original
   - Syntaxe CONCISE et MODERNE

   COMMENT ça marche ?
   - [...original] "étale" tous les éléments dans un nouveau tableau
   - Équivalent à : const copy = [original[0], original[1], original[2]]
   - Crée un NOUVEAU tableau avec les MÊMES valeurs

   ⚠️ COPIE SUPERFICIELLE (shallow copy) :
   - Copie les VALEURS primitives
   - Copie les RÉFÉRENCES d'objets (pas les objets eux-mêmes)

   const original = [{ name: "Alice" }];
   const copy = [...original];
   copy[0].name = "Bob";
   console.log(original[0].name); // "Bob" ← modifié ! 😱

   Pour une copie profonde d'objets imbriqués :
   const copy = structuredClone(original);

   QUAND l'utiliser ?
   - Dupliquer un tableau avant de le modifier
   - Éviter les mutations accidentelles
   - Travailler avec l'immutabilité (React, Redux)
*/

// Fusionner des tableaux - CONCATENATION
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

/*
   POURQUOI fusionner avec spread ?
   - Combine plusieurs tableaux en UN SEUL
   - Plus LISIBLE que arr1.concat(arr2)
   - Permet de fusionner plus de 2 tableaux facilement

   COMMENT ça marche ?
   - [...arr1, ...arr2] étale les deux tableaux dans un nouveau
   - Équivalent à : [1, 2, 3, 4, 5, 6]
   - Ordre préservé : arr1 en premier, arr2 ensuite

   QUAND l'utiliser ?
   - Combiner des listes de données
   - Ajouter des éléments d'un tableau à un autre
   - Fusionner des résultats de plusieurs sources

   💡 ASTUCE : Fusionner 3+ tableaux
   const all = [...arr1, ...arr2, ...arr3, ...arr4];
*/

// Ajouter des éléments - INSERTION FLEXIBLE
const numbers = [2, 3, 4];
const extended = [1, ...numbers, 5];
// [1, 2, 3, 4, 5]

/*
   POURQUOI utiliser spread pour ajouter ?
   - Insérer des éléments N'IMPORTE OÙ
   - Au début : [0, ...numbers]
   - Au milieu : [1, 2, ...numbers, 5]
   - À la fin : [...numbers, 5, 6]

   COMMENT ça marche ?
   - [1, ...numbers, 5] devient [1, 2, 3, 4, 5]
   - JavaScript étale numbers à sa position

   QUAND l'utiliser ?
   - Ajouter des éléments sans mutation (push/unshift modifient l'original)
   - Créer une nouvelle version d'un tableau
   - Immutabilité en React

   💡 COMPARAISON :
   Avec mutation :
   numbers.push(5);        // Modifie original
   numbers.unshift(1);     // Modifie original

   Sans mutation (immutable) :
   const extended = [1, ...numbers, 5]; // Nouveau tableau
*/
```

#### Avec des Objets

```javascript
// Copier un objet - SHALLOW COPY
const user = { name: "Alice", age: 25 };
const userCopy = { ...user };

userCopy.age = 30;
console.log(user.age); // 25 (non modifié ✅)
console.log(userCopy.age); // 30

/*
   POURQUOI utiliser spread pour copier des objets ?
   - Crée une COPIE INDÉPENDANTE de l'objet
   - Modifier la copie ne modifie PAS l'original
   - Syntaxe MODERNE et LISIBLE
   - Alternative à Object.assign({}, user)

   COMMENT ça marche ?
   - { ...user } crée un nouvel objet avec les mêmes propriétés
   - Copie toutes les propriétés énumérables
   - Équivalent à : { name: user.name, age: user.age }

   ⚠️ COPIE SUPERFICIELLE (shallow copy) :
   - Copie les valeurs primitives
   - Copie les RÉFÉRENCES d'objets imbriqués

   const user = { name: "Alice", address: { city: "Paris" } };
   const copy = { ...user };
   copy.address.city = "Lyon";
   console.log(user.address.city); // "Lyon" ← modifié ! 😱

   Pour une copie profonde :
   const copy = structuredClone(user);

   QUAND l'utiliser ?
   - Dupliquer un objet avant modification
   - Immutabilité dans React (éviter mutations de state)
   - Créer des variantes d'objets
*/

// Fusionner des objets - MERGE avec écrasement
const defaults = { theme: "light", language: "fr" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
// { theme: "dark", language: "fr" }
// userPrefs.theme ÉCRASE defaults.theme

/*
   POURQUOI fusionner avec spread ?
   - Combiner plusieurs objets de configuration
   - Appliquer des SURCHARGES (overrides)
   - Créer des objets composés

   COMMENT ça marche ?
   - { ...defaults, ...userPrefs } étale les deux objets
   - En cas de propriétés identiques, le DERNIER gagne
   - defaults.theme = "light" est écrasé par userPrefs.theme = "dark"
   - language n'est pas écrasé (existe seulement dans defaults)

   ORDRE IMPORTANT :
   { ...defaults, ...userPrefs }
   → userPrefs écrase defaults

   { ...userPrefs, ...defaults }
   → defaults écrase userPrefs (inverse !)

   QUAND l'utiliser ?
   - Configurations avec valeurs par défaut + surcharges utilisateur
   - Merge d'options
   - Composer des objets de plusieurs sources

   💡 PATTERN TRÈS COURANT :
   const config = {
     ...defaultConfig,      // Valeurs par défaut
     ...userConfig,         // Surcharges utilisateur
     version: "1.0.0"       // Valeur forcée
   };
*/

// Ajouter/modifier des propriétés - UPDATE IMMUTABLE
const updatedUser = { ...user, age: 26, city: "Paris" };
// { name: "Alice", age: 26, city: "Paris" }
// age est MODIFIÉ (écrasé)
// city est AJOUTÉ
// name est CONSERVÉ

/*
   POURQUOI utiliser spread pour modifier ?
   - Créer une NOUVELLE version sans modifier l'original
   - IMMUTABILITÉ : pattern essentiel en React
   - Évite les bugs liés aux mutations

   COMMENT ça marche ?
   - { ...user, age: 26 } copie user puis écrase/ajoute des propriétés
   - Ordre d'évaluation :
     1. Copie toutes les propriétés de user
     2. Écrase age avec 26
     3. Ajoute city: "Paris"

   ORDRE IMPORTANT pour écrasement :
   { ...user, age: 26 }
   → age est écrasé à 26

   { age: 26, ...user }
   → age garde la valeur de user.age (25)

   QUAND l'utiliser ?
   - Mettre à jour le state dans React
   - Créer des versions modifiées d'objets
   - Maintenir l'immutabilité dans votre code

   💡 PATTERN REACT très courant :
   const [user, setUser] = useState({ name: "Alice", age: 25 });

   // ❌ MAUVAIS : mutation directe
   user.age = 26;
   setUser(user);

   // ✅ BON : création d'un nouvel objet
   setUser({ ...user, age: 26 });

   ⚠️ ATTENTION à l'ordre :
   { ...user, age: 26, city: "Paris" } // ✅ age écrasé, city ajouté
   { age: 26, ...user, city: "Paris" } // ❌ age garde 25 !
*/
```

### Rest Parameters

Rest parameters (paramètres rest) permettent de capturer un nombre VARIABLE d'arguments dans un tableau.

```javascript
// Nombre variable d'arguments - fonction flexible
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15
sum(10); // 10
sum(); // 0

/*
   POURQUOI les rest parameters ?
   - Accepter un NOMBRE VARIABLE d'arguments
   - Créer des fonctions FLEXIBLES
   - Remplacer l'ancien objet "arguments" (obsolète)

   COMMENT ça marche ?
   - ...numbers collecte TOUS les arguments dans un TABLEAU
   - function sum(...numbers) { console.log(numbers); }
     sum(1, 2, 3) → numbers = [1, 2, 3]
   - numbers est un VRAI tableau (contrairement à arguments)

   DIFFÉRENCE avec arguments (ancien style) :
   // ❌ Ancien : arguments n'est PAS un vrai tableau
   function oldSum() {
     const args = Array.from(arguments); // Conversion nécessaire
     return args.reduce((a, b) => a + b);
   }

   // ✅ Moderne : ...numbers EST un vrai tableau
   function sum(...numbers) {
     return numbers.reduce((a, b) => a + b, 0);
   }

   QUAND l'utiliser ?
   - Fonctions mathématiques : sum, multiply, average
   - Fonctions avec nombre inconnu d'arguments
   - Logger avec plusieurs messages
   - Combiner des valeurs

   💡 AVANTAGE :
   - numbers est un vrai tableau → tous les méthodes disponibles
   - map(), filter(), reduce(), forEach(), etc.
*/

// Combiner avec des paramètres normaux
function createMessage(greeting, ...names) {
  return `${greeting} ${names.join(", ")}`;
}

createMessage("Bonjour", "Alice", "Bob", "Charlie");
// "Bonjour Alice, Bob, Charlie"

createMessage("Hello", "John");
// "Hello John"

/*
   POURQUOI combiner paramètres normaux + rest ?
   - Séparer les arguments REQUIS des arguments OPTIONNELS
   - greeting est REQUIS
   - names est OPTIONNEL et variable

   COMMENT ça marche ?
   - Les premiers arguments remplissent les paramètres normaux
   - Les arguments RESTANTS vont dans le rest parameter
   - createMessage("Hi", "A", "B", "C")
     greeting = "Hi"
     names = ["A", "B", "C"]

   ⚠️ RÈGLES IMPORTANTES :
   1. Rest parameter doit être le DERNIER paramètre
      ✅ function test(a, b, ...rest) { }
      ❌ function test(...rest, a, b) { } // ERREUR

   2. Un SEUL rest parameter par fonction
      ❌ function test(...rest1, ...rest2) { } // ERREUR

   QUAND l'utiliser ?
   - Premier paramètre obligatoire + liste variable
   - Loggers : log(level, ...messages)
   - Formatters : format(template, ...values)

   💡 EXEMPLES pratiques :
   function log(level, ...messages) {
     console.log(`[${level}]`, ...messages);
   }
   log("INFO", "User logged in", "ID:", 123);
   // [INFO] User logged in ID: 123

   function makeArray(length, ...elements) {
     return elements.slice(0, length);
   }
   makeArray(2, "a", "b", "c", "d"); // ["a", "b"]
*/

// COMPARAISON : Rest vs Spread
/*
   REST (...) : COLLECTE des arguments → crée un tableau
   - Dans les PARAMÈTRES de fonction
   - function sum(...numbers) → numbers = [1, 2, 3]

   SPREAD (...) : DÉCOMPOSE un tableau → éléments individuels
   - Dans les APPELS de fonction ou littéraux
   - const arr = [1, 2, 3]; sum(...arr) → sum(1, 2, 3)

   MÊME SYNTAXE, USAGE INVERSE :
   function sum(...numbers) {  // REST : collecte en tableau
     console.log(numbers);     // [1, 2, 3]
   }

   const arr = [1, 2, 3];
   sum(...arr);                // SPREAD : décompose le tableau

   💡 MÉMO :
   - REST = Rassemble (Rest = reste → collecte ce qui reste)
   - SPREAD = Étale (Spread = étaler → décompose)
*/
```

### Cas d'Usage Pratiques

Voyons des exemples réels d'utilisation du destructuring et du spread operator.

```javascript
// 1. Swap de variables - ÉCHANGER deux valeurs en UNE ligne
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

/*
   POURQUOI c'est génial ?
   - Échange de valeurs en UNE SEULE ligne
   - Pas besoin de variable temporaire

   ANCIENNE MÉTHODE (3 lignes) :
   let temp = a;
   a = b;
   b = temp;

   NOUVELLE MÉTHODE (1 ligne) :
   [a, b] = [b, a];

   COMMENT ça marche ?
   1. [b, a] crée un tableau temporaire [2, 1]
   2. [a, b] destructure ce tableau
   3. a reçoit 2, b reçoit 1

   QUAND l'utiliser ?
   - Trier des valeurs : if (a > b) [a, b] = [b, a];
   - Permutations circulaires : [a, b, c] = [c, a, b];
   - Algorithmes de tri
*/

// 2. Retourner plusieurs valeurs depuis une fonction
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}
const [min, max] = getMinMax([1, 5, 3, 9, 2]);
console.log(min, max); // 1 9

/*
   POURQUOI retourner un tableau ?
   - Retourner PLUSIEURS valeurs d'un coup
   - Éviter de créer un objet juste pour ça
   - Destructurer directement le résultat

   COMMENT ça marche ?
   - getMinMax() retourne [1, 9]
   - const [min, max] destructure ce tableau
   - min = 1, max = 9

   ALTERNATIVE avec objet :
   function getMinMax(numbers) {
     return { min: Math.min(...numbers), max: Math.max(...numbers) };
   }
   const { min, max } = getMinMax([1, 5, 3, 9, 2]);

   QUAND préférer tableau vs objet ?
   - TABLEAU : ordre logique, peu de valeurs (2-3)
   - OBJET : clarté des noms, beaucoup de valeurs

   💡 AUTRES EXEMPLES :
   - function parseDate(str) { return [year, month, day]; }
   - function divide(a, b) { return [quotient, remainder]; }
   - function fetchUser(id) { return [user, error]; }
*/

// 3. Cloner et modifier - Pattern IMMUTABILITÉ
const product = {
  name: "Laptop",
  price: 1000,
  stock: 5
};

const discountedProduct = {
  ...product,
  price: product.price * 0.9,
  onSale: true
};

console.log(product.price); // 1000 (original non modifié ✅)
console.log(discountedProduct.price); // 900
console.log(discountedProduct.onSale); // true

/*
   POURQUOI ce pattern ?
   - Créer des VARIANTES sans modifier l'original
   - IMMUTABILITÉ : principe fondamental en React
   - Évite les bugs liés aux mutations

   COMMENT ça marche ?
   - { ...product } copie toutes les propriétés
   - price: product.price * 0.9 écrase la propriété price
   - onSale: true ajoute une nouvelle propriété

   QUAND l'utiliser ?
   - Créer des variantes de produits (promotions, versions)
   - Mettre à jour le state React
   - Générer des objets similaires

   💡 PATTERN REACT très courant :
   const [products, setProducts] = useState([...]);

   // Mettre à jour un produit
   const updateProduct = (id, changes) => {
     setProducts(products.map(p =>
       p.id === id
         ? { ...p, ...changes }  // Clone + modifications
         : p
     ));
   };
*/

// 4. Extraire des propriétés d'une API response
const apiResponse = {
  data: { id: 1, name: "Alice", email: "alice@example.com" },
  status: 200,
  headers: { "content-type": "application/json" }
};

const { data: user, status } = apiResponse;
console.log(user); // { id: 1, name: "Alice", email: "alice@example.com" }
console.log(status); // 200

/*
   POURQUOI c'est pratique ?
   - Extraire SEULEMENT ce dont vous avez besoin
   - Renommer pour plus de clarté (data → user)
   - Ignorer les propriétés non pertinentes

   QUAND l'utiliser ?
   - Travailler avec des réponses d'API
   - Nettoyer des données complexes
   - Simplifier l'accès aux données imbriquées
*/

// 5. Options de fonction avec valeurs par défaut
function createNotification({
  title,
  message,
  type = "info",
  duration = 3000,
  position = "top-right",
  closable = true
} = {}) {
  return { title, message, type, duration, position, closable };
}

// Utilisation minimale
createNotification({
  title: "Success",
  message: "Operation completed"
});
// { title: "Success", message: "Operation completed",
//   type: "info", duration: 3000, position: "top-right", closable: true }

// Utilisation avec surcharges
createNotification({
  title: "Error",
  message: "Something went wrong",
  type: "error",
  duration: 5000
});

/*
   POURQUOI ce pattern ?
   - FLEXIBILITÉ : utilisateur ne spécifie que ce qui change
   - LISIBILITÉ : paramètres nommés, ordre n'importe pas
   - MAINTENABILITÉ : facile d'ajouter de nouvelles options

   PATTERN COMPLET expliqué :
   {
     title,              // Requis
     message,            // Requis
     type = "info",      // Optionnel avec défaut
     ...
   } = {}                // Défaut pour l'objet entier (évite crash)

   ⚠️ Sans = {} :
   createNotification(); // ERREUR

   ✅ Avec = {} :
   createNotification(); // OK (tous les défauts)

   QUAND l'utiliser ?
   - Fonctions de configuration
   - Composants React avec props
   - Initialisation d'objets complexes
   - APIs publiques de bibliothèques
*/

// 6. Combiner des configurations
const defaultTheme = {
  primaryColor: "#007bff",
  fontSize: 16,
  fontFamily: "Arial",
  spacing: 8
};

const userTheme = {
  primaryColor: "#ff6b6b",
  fontSize: 18
};

const finalTheme = {
  ...defaultTheme,
  ...userTheme
};
// { primaryColor: "#ff6b6b", fontSize: 18, fontFamily: "Arial", spacing: 8 }
// userTheme écrase primaryColor et fontSize
// fontFamily et spacing viennent de defaultTheme

/*
   POURQUOI ce pattern ?
   - Configuration par COUCHES (defaults → user → app)
   - Principe de SURCHARGE progressive
   - Valeurs par défaut + personnalisation utilisateur

   PATTERN MULTI-NIVEAUX :
   const config = {
     ...systemDefaults,     // Base
     ...userPreferences,    // Surcharge utilisateur
     ...sessionOverrides,   // Surcharge temporaire
     version: "1.0.0"       // Valeur forcée (non surchargeable)
   };

   QUAND l'utiliser ?
   - Systèmes de thèmes
   - Configurations d'application
   - Préférences utilisateur
   - Merge de données de plusieurs sources
*/

// 7. Séparer les props dans React
function UserCard({ name, avatar, isOnline, ...otherProps }) {
  return (
    <div {...otherProps}>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      {isOnline && <span>🟢 Online</span>}
    </div>
  );
}

/*
   POURQUOI séparer certaines props ?
   - Extraire les props SPÉCIFIQUES que vous utilisez
   - Passer le RESTE au composant enfant (className, onClick, etc.)
   - Rendre le composant FLEXIBLE

   COMMENT ça marche ?
   - { name, avatar, isOnline, ...otherProps } extrait 3 props
   - otherProps contient TOUT LE RESTE (className, style, onClick...)
   - <div {...otherProps}> passe ces props au div

   QUAND l'utiliser ?
   - Composants wrapper
   - Composants réutilisables
   - Passer des props natives (className, style, data-*)

   💡 EXEMPLE d'utilisation :
   <UserCard
     name="Alice"
     avatar="/avatar.jpg"
     isOnline={true}
     className="card"      // Va dans otherProps
     onClick={handleClick} // Va dans otherProps
     data-id="123"         // Va dans otherProps
   />
*/
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
