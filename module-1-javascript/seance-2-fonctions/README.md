# Séance 2 : Fonctions et Scope

## 📚 Théorie

### Déclaration de Fonctions

#### Trois façons de déclarer une fonction

JavaScript offre plusieurs syntaxes pour déclarer des fonctions. Chacune a ses particularités.

```javascript
// 1. Function declaration (déclaration classique)
function greet(name) {
  return `Bonjour ${name}`;
}

/*
   COMMENT ça marche ?
   - Crée une fonction nommée dans le scope actuel
   - HOISTING activé : peut être appelée avant sa déclaration
   - Possède son propre contexte "this"

   QUAND l'utiliser ?
   - Fonctions principales de votre code
   - Quand vous voulez profiter du hoisting
   - Fonctions qui ont besoin d'un "this" dynamique
*/

// 2. Function expression (expression de fonction)
const greet2 = function(name) {
  return `Bonjour ${name}`;
};

/*
   COMMENT ça marche ?
   - Crée une fonction anonyme assignée à une variable
   - PAS de hoisting : doit être déclarée avant utilisation
   - Possède son propre contexte "this"

   QUAND l'utiliser ?
   - Fonctions passées en callbacks
   - Quand vous voulez éviter le hoisting
   - Fonctions conditionnelles
*/

// 3. Arrow function (fonction fléchée - ES6)
const greet3 = (name) => {
  return `Bonjour ${name}`;
};

// Arrow function avec return implicite (syntaxe courte)
const greet4 = (name) => `Bonjour ${name}`;

/*
   COMMENT ça marche ?
   - Syntaxe concise introduite en ES6
   - PAS de hoisting
   - N'a PAS son propre "this" (hérite du contexte parent)
   - Pas de "arguments" object
   - Ne peut pas être utilisée comme constructeur (new)

   POURQUOI préférer les arrow functions ?
   - Syntaxe plus courte et lisible
   - Pas de confusion avec "this"
   - Standard moderne
   - Parfait pour les callbacks

   QUAND NE PAS les utiliser ?
   - Méthodes d'objets (this devient imprévisible)
   - Quand vous avez besoin de "arguments"
   - Constructeurs
*/

// Exemple de différence avec "this"
const obj = {
  value: 42,

  // ❌ Arrow function : "this" ne pointe pas vers obj !
  arrowMethod: () => {
    console.log(this.value); // undefined
  },

  // ✅ Fonction classique : "this" pointe vers obj
  normalMethod: function() {
    console.log(this.value); // 42
  }
};
```

---

### Arrow Functions - Règles et Syntaxes

#### Syntaxes possibles

```javascript
// Sans paramètre : () obligatoires
const sayHello = () => "Hello";

/*
   POURQUOI les parenthèses vides ?
   - Syntaxe JavaScript : indique "aucun paramètre"
   - Sans (), JavaScript ne sait pas que c'est une fonction
*/

// Un seul paramètre : () optionnelles
const double = x => x * 2;
const triple = (x) => x * 3; // Avec parenthèses (recommandé pour consistance)

/*
   CONVENTION : Toujours utiliser les parenthèses
   - Plus cohérent avec le reste du code
   - Facilite l'ajout de paramètres plus tard
   - Plus lisible pour les débutants
*/

// Plusieurs paramètres : () obligatoires
const add = (a, b) => a + b;

/*
   RETURN IMPLICITE :
   - Si une seule expression, return automatique
   - Pas besoin du mot-clé "return"
   - Pas besoin d'accolades {}
*/

// Corps de fonction avec plusieurs lignes : {} et return explicite
const complexFunction = (x, y) => {
  const sum = x + y;
  const product = x * y;
  return { sum, product };
};

/*
   QUAND utiliser {} et return ?
   - Plusieurs instructions
   - Logique complexe
   - Variables intermédiaires nécessaires
*/

// Retourner un objet : ATTENTION aux parenthèses !
const createUser = (name, age) => ({ name, age });

/*
   PIÈGE COURANT :

   ❌ const createUser = (name, age) => { name, age };

   JavaScript pense que { } est un BLOC, pas un objet !
   La fonction retourne undefined.

   ✅ const createUser = (name, age) => ({ name, age });

   Les ( ) autour de { } indiquent que c'est un objet à retourner.

   POURQUOI ce piège existe ?
   - Ambiguïté syntaxique : {} peut être un bloc ou un objet
   - () force l'interprétation en tant qu'expression d'objet
*/

// Exemples pratiques
const getUser = id => ({ id, name: "User" + id }); // ✅ Objet retourné
const setName = name => { name: name }; // ❌ Bloc vide, retourne undefined !
```

---

### Paramètres par Défaut

#### Évolution de la syntaxe

```javascript
// ❌ Ancienne méthode (avant ES6)
function greetOld(name) {
  name = name || "Invité";
  return `Bonjour ${name}`;
}

/*
   PROBLÈME avec || :
   - name = 0 → "Invité" (0 est falsy)
   - name = "" → "Invité" (chaîne vide est falsy)
   - name = false → "Invité"

   Pas adapté si 0, "", false sont des valeurs valides !
*/

greetOld(0); // "Bonjour Invité" ❌ On voulait "Bonjour 0"
greetOld(""); // "Bonjour Invité" ❌ On voulait "Bonjour "

// ✅ Méthode moderne (ES6+)
function greet(name = "Invité") {
  return `Bonjour ${name}`;
}

/*
   COMMENT ça marche ?
   - La valeur par défaut est utilisée SEULEMENT si :
     * Le paramètre n'est pas fourni
     * OU le paramètre est undefined
   - 0, "", false, null ne déclenchent PAS le défaut

   POURQUOI c'est mieux ?
   - Comportement prévisible
   - Syntaxe claire et explicite
   - Valeurs falsy ne sont pas remplacées
*/

greet(); // "Bonjour Invité" ✅
greet(undefined); // "Bonjour Invité" ✅
greet("Alice"); // "Bonjour Alice" ✅
greet(0); // "Bonjour 0" ✅ Conserve la valeur 0
greet(""); // "Bonjour " ✅ Conserve la chaîne vide
greet(null); // "Bonjour null" ✅ Conserve null

// Avec plusieurs paramètres
const calculatePrice = (price, tax = 0.20, shipping = 5) => {
  return price + (price * tax) + shipping;
};

/*
   ORDRE DES PARAMÈTRES :
   - Paramètres requis en premier
   - Paramètres optionnels (avec défaut) après
   - Permet d'appeler la fonction naturellement
*/

calculatePrice(100); // 100 + 20 + 5 = 125
calculatePrice(100, 0.10); // 100 + 10 + 5 = 115
calculatePrice(100, 0.10, 10); // 100 + 10 + 10 = 120

// Les valeurs par défaut peuvent être des expressions
function createId(prefix = "user", timestamp = Date.now()) {
  return `${prefix}_${timestamp}`;
}

/*
   ATTENTION : L'expression est évaluée à CHAQUE APPEL
   Date.now() retournera une valeur différente à chaque fois
*/

// Les paramètres peuvent référencer d'autres paramètres
function greetFull(firstName, lastName, fullName = `${firstName} ${lastName}`) {
  return `Bonjour ${fullName}`;
}

greetFull("Alice", "Doe"); // "Bonjour Alice Doe"
greetFull("Bob", "Smith", "Robert Smith"); // "Bonjour Robert Smith"
```

---

### Scope (Portée des Variables)

#### Les 3 niveaux de scope

```javascript
// 1. GLOBAL SCOPE (portée globale)
const globalVar = "accessible partout";

/*
   CARACTÉRISTIQUES :
   - Déclaré en dehors de toute fonction/bloc
   - Accessible partout dans le fichier
   - Existe pendant toute la durée de vie de l'application

   ATTENTION : Évitez la pollution du scope global !
   - Risque de conflits de noms
   - Difficile à déboguer
   - Limite : utilisez des modules ES6
*/

function example() {
  // 2. FUNCTION SCOPE (portée de fonction)
  const functionVar = "accessible dans la fonction";

  /*
     CARACTÉRISTIQUES :
     - Accessible partout dans la fonction
     - Pas accessible en dehors
     - var, let, const ont ce comportement dans les fonctions
  */

  if (true) {
    // 3. BLOCK SCOPE (portée de bloc)
    const blockVar = "accessible dans le bloc";
    let blockLet = "aussi dans le bloc";

    /*
       CARACTÉRISTIQUES :
       - let et const : limités au bloc { }
       - var : IGNORE le block scope (remonte au function scope)

       POURQUOI block scope est important ?
       - Limite la portée des variables
       - Réduit les bugs
       - Meilleure encapsulation
    */

    console.log(globalVar); // ✅ OK - remonte jusqu'au global
    console.log(functionVar); // ✅ OK - remonte jusqu'à la fonction
    console.log(blockVar); // ✅ OK - dans le bloc
  }

  console.log(globalVar); // ✅ OK
  console.log(functionVar); // ✅ OK
  // console.log(blockVar); // ❌ Erreur ! blockVar n'existe plus (hors du bloc)
}

// console.log(functionVar); // ❌ Erreur ! functionVar n'existe que dans example()

/*
   RÈGLE DE RECHERCHE (Scope Chain) :
   1. Cherche dans le scope actuel
   2. Si pas trouvé, remonte au scope parent
   3. Continue jusqu'au scope global
   4. Si toujours pas trouvé → ReferenceError
*/

// Exemple de Scope Chain
const level1 = "global";

function outer() {
  const level2 = "outer";

  function inner() {
    const level3 = "inner";

    console.log(level3); // Trouve dans inner
    console.log(level2); // Remonte à outer
    console.log(level1); // Remonte au global
  }

  inner();
}

// Problème avec var (pas de block scope)
function varProblem() {
  if (true) {
    var x = 10; // var ignore le bloc !
  }
  console.log(x); // 10 - accessible ! ❌ Pas idéal
}

function letSolution() {
  if (true) {
    let x = 10; // let respecte le bloc
  }
  // console.log(x); // ❌ Erreur - pas accessible ✅ Comportement attendu
}
```

---

### Closures

#### Qu'est-ce qu'une closure ?

Une **closure** est une fonction qui "se souvient" des variables de son scope parent, même après que la fonction parente ait terminé son exécution.

```javascript
// Exemple basique
function createCounter() {
  let count = 0; // Variable privée

  /*
     POURQUOI count est "privée" ?
     - Déclarée dans createCounter
     - Pas accessible directement de l'extérieur
     - Seules les fonctions retournées y ont accès
  */

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.decrement()); // 1

// Tentative d'accès direct à count
// console.log(count); // ❌ Erreur ! count n'est pas accessible
// console.log(counter.count); // undefined - pas de propriété count

/*
   COMMENT ça marche ?

   1. createCounter() s'exécute
   2. count est créé dans son scope
   3. Les fonctions increment, decrement, getCount sont créées
   4. Ces fonctions "capturent" count (closure)
   5. createCounter() se termine et retourne l'objet
   6. Normalement, count devrait être détruit...
   7. MAIS ! Les fonctions retournées maintiennent count en vie
   8. count existe toujours, accessible uniquement via ces fonctions

   POURQUOI c'est puissant ?
   - Encapsulation : variables privées en JavaScript
   - État persistant : count conserve sa valeur entre les appels
   - Sécurité : impossible de modifier count directement
*/

// Plusieurs instances indépendantes
const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment(); // 1
counter1.increment(); // 2
counter2.increment(); // 1

/*
   CHAQUE appel à createCounter() crée un NOUVEAU count
   counter1 et counter2 ont leur propre count privé
*/

// Exemple pratique : Générateur d'ID
function createIdGenerator() {
  let id = 0;

  return () => ++id;
}

const generateId = createIdGenerator();
console.log(generateId()); // 1
console.log(generateId()); // 2
console.log(generateId()); // 3

/*
   CAS D'USAGE des closures :
   - Variables privées / encapsulation
   - Factory functions (créer des objets avec état)
   - Event handlers avec contexte
   - Currying et composition
   - Memoization
*/

// Exemple : Configuration avec closure
function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}

const errorLogger = createLogger("ERROR");
const infoLogger = createLogger("INFO");

errorLogger("Something went wrong"); // [ERROR] Something went wrong
infoLogger("Operation completed"); // [INFO] Operation completed

/*
   POURQUOI c'est utile ?
   - prefix est "capturé" une fois
   - Pas besoin de le passer à chaque appel
   - Chaque logger a son propre préfixe
*/

// PIÈGE avec les closures et les boucles (var)
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Affiche 3, 3, 3 ❌
  }, 100);
}

/*
   POURQUOI 3, 3, 3 ?
   - var n'a pas de block scope
   - Il n'y a qu'UN SEUL i
   - Quand les callbacks s'exécutent, i vaut 3
*/

// Solution avec let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Affiche 0, 1, 2 ✅
  }, 100);
}

/*
   POURQUOI ça marche ?
   - let a un block scope
   - Chaque itération crée un NOUVEAU i
   - Chaque callback capture son propre i
*/
```

---

### Hoisting

#### Qu'est-ce que le hoisting ?

Le **hoisting** est le comportement de JavaScript qui "remonte" les déclarations en haut de leur scope avant l'exécution.

```javascript
// Function declaration : HOISTING activé
sayHello(); // ✅ Fonctionne !

function sayHello() {
  console.log("Hello");
}

/*
   COMMENT ça marche ?

   JavaScript fait deux passes :
   1. COMPILATION : Enregistre les déclarations
   2. EXÉCUTION : Exécute le code

   Pendant la compilation, function sayHello est "remontée" :

   // Ce que JavaScript "voit" :
   function sayHello() { ... } // Déclaration remontée
   sayHello(); // Puis exécution
*/

// Function expression : PAS de hoisting
// sayGoodbye(); // ❌ Erreur ! Cannot access before initialization

const sayGoodbye = () => {
  console.log("Goodbye");
};

sayGoodbye(); // ✅ OK après la déclaration

/*
   POURQUOI pas de hoisting ?
   - const/let ne sont PAS initialisées pendant le hoisting
   - "Temporal Dead Zone" : zone où la variable existe mais n'est pas accessible
   - Comportement plus prévisible et sûr
*/

// Hoisting avec var (comportement étrange)
console.log(myVar); // undefined ❌ Pas d'erreur !
var myVar = 42;
console.log(myVar); // 42

/*
   Ce que JavaScript fait :
   var myVar; // Déclaration remontée (initialisée à undefined)
   console.log(myVar); // undefined
   myVar = 42; // Assignation reste ici
   console.log(myVar); // 42
*/

// Hoisting avec let/const (Temporal Dead Zone)
// console.log(myLet); // ❌ ReferenceError: Cannot access before initialization
let myLet = 42;

/*
   Ce que JavaScript fait :
   // myLet est déclarée mais dans la "Temporal Dead Zone"
   console.log(myLet); // Erreur !
   myLet = 42; // Ici myLet devient accessible
*/

/*
   BONNE PRATIQUE :
   - Déclarez toujours les fonctions en premier
   - Utilisez function declarations pour les fonctions principales
   - Utilisez const/let (pas var) pour éviter les surprises
   - Ne comptez pas sur le hoisting, soyez explicite
*/

// Exemple pratique : Ordre de déclaration
// ✅ BON : Déclarations en haut
function main() {
  const users = getUsers();
  const filtered = filterUsers(users);
  return filtered;

  function getUsers() { /* ... */ }
  function filterUsers(list) { /* ... */ }
}

// Ou mieux encore (plus moderne)
const main2 = () => {
  // Déclarez tout en haut
  const getUsers = () => { /* ... */ };
  const filterUsers = (list) => { /* ... */ };

  const users = getUsers();
  const filtered = filterUsers(users);
  return filtered;
};
```

---

## 💡 Points Clés à Retenir

### 1. Déclarations de fonctions
- **Function declaration** : hoisting, this dynamique
- **Function expression** : pas de hoisting, assignable
- **Arrow function** : syntaxe courte, pas de this propre, moderne

### 2. Arrow functions
- Return implicite : `x => x * 2`
- Objet retourné : `() => ({ key: value })`
- Pas de this propre : hérite du contexte parent

### 3. Paramètres par défaut
- Syntaxe : `function(param = defaultValue)`
- Seulement si `undefined`, pas pour 0, "", false, null
- Peuvent utiliser d'autres paramètres : `(a, b = a * 2)`

### 4. Scope
- **Global** : accessible partout
- **Function** : limité à la fonction
- **Block** : limité au bloc {} (let/const uniquement)
- Scope Chain : remonte jusqu'à trouver ou erreur

### 5. Closures
- Fonction qui "se souvient" de son environnement
- Variables privées et état persistant
- Chaque instance a son propre scope

### 6. Hoisting
- Function declarations : remontées et utilisables partout
- const/let : Temporal Dead Zone avant déclaration
- var : remonté mais undefined (éviter !)

---

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

**Objectifs d'apprentissage** :
- Convertir des fonctions en arrow functions
- Utiliser des paramètres par défaut
- Comprendre le scope et les closures
- Créer des fonctions avec état privé

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
