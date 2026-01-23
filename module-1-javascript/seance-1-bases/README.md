# Séance 1 : Les Bases de JavaScript

## 📚 Théorie

### Variables : let, const, var

#### Pourquoi trois mots-clés différents ?

JavaScript a évolué au fil du temps. `var` était l'unique moyen de déclarer des variables avant ES6 (2015). Aujourd'hui, `let` et `const` offrent un meilleur contrôle et évitent les bugs.

```javascript
// var : ancienne syntaxe (avant ES6) - À ÉVITER
var oldWay = "obsolète";

/*
   POURQUOI ÉVITER var ?
   1. Hoisting problématique : la variable est "remontée" en haut du scope
   2. Pas de block scope : accessible en dehors des blocs {}
   3. Peut être redéclarée sans erreur (source de bugs)
*/

// Exemple du problème avec var
if (true) {
  var x = 10;
}
console.log(x); // 10 - accessible en dehors du bloc ! ❌

// let : variable RÉASSIGNABLE (peut changer de valeur)
let age = 25;
age = 26; // ✅ OK - on peut changer la valeur

/*
   QUAND UTILISER let ?
   - Quand la valeur va changer (compteurs, accumulations)
   - Dans les boucles (for, while)
   - Quand vous devez réassigner la variable
*/

// const : CONSTANTE (ne peut PAS changer de valeur)
const name = "Alice";
// name = "Bob"; // ❌ Erreur ! TypeError: Assignment to constant variable

/*
   QUAND UTILISER const ?
   - Par DÉFAUT : utilisez toujours const
   - Pour les valeurs qui ne doivent pas changer
   - Pour les imports, fonctions, objets de configuration

   POURQUOI const par défaut ?
   - Rend le code plus prévisible et sûr
   - Communique l'intention : "cette valeur ne changera pas"
   - Évite les réassignations accidentelles
   - Facilite le debugging
*/

// ⚠️ ATTENTION : const empêche la RÉASSIGNATION, pas la MUTATION
const user = { name: "Alice" };
// user = { name: "Bob" }; // ❌ Erreur - réassignation interdite
user.name = "Bob"; // ✅ OK - mutation de propriété autorisée

const numbers = [1, 2, 3];
// numbers = [4, 5, 6]; // ❌ Erreur - réassignation interdite
numbers.push(4); // ✅ OK - mutation du tableau autorisée
```

**Règle d'or** :
1. Utilisez `const` par défaut
2. Utilisez `let` seulement si vous devez réassigner
3. N'utilisez **JAMAIS** `var` dans du code moderne

---

### Types de Données Primitifs

JavaScript a 7 types primitifs. Comprendre ces types est essentiel pour éviter les bugs.

#### String (Chaîne de caractères)

```javascript
const text = "Bonjour";
const text2 = 'Hello'; // Simple ou double quotes, même effet
const text3 = `Salut`; // Template literal (backticks)

/*
   COMMENT ça marche ?
   - Les strings sont IMMUABLES (ne peuvent pas être modifiés)
   - Chaque modification crée une NOUVELLE string

   POURQUOI c'est important ?
   - Performance : évitez de concaténer dans des boucles
   - Sécurité : les strings ne peuvent pas être altérées par accident
*/

// Concaténation (ancienne méthode)
const greeting = "Bonjour " + "Alice"; // ❌ Moins lisible

// Template literal (méthode moderne)
const name = "Alice";
const modernGreeting = `Bonjour ${name}`; // ✅ Plus lisible et flexible

/*
   POURQUOI utiliser les template literals ?
   - Plus lisible : ${variable} au lieu de concaténer
   - Multi-lignes : naturellement
   - Expressions : ${1 + 1} fonctionne directement
*/
```

#### Number (Nombre)

```javascript
const age = 30;          // Entier
const price = 19.99;     // Décimal (float)
const negative = -42;    // Négatif
const billion = 1e9;     // Notation scientifique (1 milliard)

/*
   COMMENT ça marche ?
   - JavaScript a UN SEUL type pour les nombres
   - Pas de distinction int/float comme dans d'autres langages
   - Utilise le format IEEE 754 (double précision 64 bits)

   POURQUOI c'est important ?
   - Précision limitée avec les décimaux
   - 0.1 + 0.2 !== 0.3 en JavaScript (problème de précision)
*/

// Problème de précision
console.log(0.1 + 0.2); // 0.30000000000000004 ❌

// Solution : arrondir pour les calculs financiers
const result = Math.round((0.1 + 0.2) * 100) / 100; // 0.3 ✅

/*
   QUAND utiliser des bibliothèques ?
   - Pour l'argent : utilisez decimal.js ou currency.js
   - Pour les calculs précis : BigInt pour les très grands entiers
*/

// Valeurs spéciales
const infinite = Infinity;
const notANumber = NaN; // "Not a Number" - résultat d'opération invalide

console.log(10 / 0); // Infinity
console.log("texte" * 2); // NaN

/*
   POURQUOI vérifier NaN ?
   - NaN !== NaN (seule valeur non égale à elle-même !)
   - Utilisez Number.isNaN() pour vérifier
*/
```

#### Boolean (Booléen)

```javascript
const isActive = true;
const isCompleted = false;

/*
   COMMENT ça marche ?
   - Seulement 2 valeurs possibles : true ou false
   - Résultat des comparaisons et conditions

   POURQUOI c'est fondamental ?
   - Base de toute logique conditionnelle (if, while, etc.)
   - Utilisé dans les opérateurs logiques (&&, ||, !)
*/

// Valeurs "truthy" et "falsy"
/*
   JavaScript convertit automatiquement les valeurs en booléen
   dans un contexte booléen (if, while, etc.)

   FALSY (considérées comme false) :
   - false
   - 0
   - "" (chaîne vide)
   - null
   - undefined
   - NaN

   TRUTHY (tout le reste, considéré comme true) :
   - true
   - Nombres non nuls (1, -1, 3.14)
   - Chaînes non vides ("hello", "0", "false")
   - Objets et tableaux (même vides : {}, [])
*/

if ("") {
  // Ne s'exécute JAMAIS (chaîne vide = falsy)
}

if ("0") {
  // S'exécute TOUJOURS (chaîne non vide = truthy)
}

/*
   POURQUOI connaître truthy/falsy ?
   - Écrire du code plus concis
   - Comprendre les bugs de condition
   - Utiliser les short-circuit (&& et ||)
*/
```

#### Undefined vs Null

```javascript
// Undefined : variable déclarée mais non initialisée
let notDefined;
console.log(notDefined); // undefined

/*
   QUAND avoir undefined ?
   - Variable déclarée sans valeur
   - Propriété d'objet inexistante
   - Fonction sans return
   - Paramètre de fonction non fourni
*/

function exemple() {
  // Pas de return
}
console.log(exemple()); // undefined

// Null : valeur "vide" INTENTIONNELLE
const emptyValue = null;

/*
   DIFFÉRENCE undefined vs null :

   undefined = JavaScript dit "je ne sais pas, pas défini"
   null = Le développeur dit "c'est vide intentionnellement"

   POURQUOI cette distinction ?
   - null : "absence intentionnelle de valeur"
   - undefined : "pas encore de valeur" ou "oublié"

   QUAND utiliser null ?
   - Initialiser une variable qui aura une valeur plus tard
   - Indiquer qu'un objet/valeur est intentionnellement absent
   - Reset une valeur à "vide"
*/

// Exemple pratique
let user = null; // On sait qu'il n'y a pas d'utilisateur connecté
// ... après connexion
user = { name: "Alice", id: 1 };
// ... après déconnexion
user = null; // On reset intentionnellement

/*
   ⚠️ PIÈGE avec typeof :
*/
console.log(typeof undefined); // "undefined" ✅
console.log(typeof null);      // "object" ❌ (bug historique JS !)
```

#### Symbol (Identifiant unique)

```javascript
const id = Symbol('id');
const id2 = Symbol('id');

console.log(id === id2); // false - chaque Symbol est unique !

/*
   COMMENT ça marche ?
   - Crée une valeur UNIQUE et IMMUABLE
   - Même avec la même description, deux Symbols sont différents

   POURQUOI utiliser Symbol ?
   - Créer des propriétés d'objet "privées"
   - Éviter les collisions de clés
   - Utilisé en interne par JavaScript (Symbol.iterator, etc.)

   QUAND l'utiliser ?
   - Bibliothèques : pour éviter de polluer les objets
   - Propriétés cachées : non énumérables par défaut
   - Rarement en code applicatif standard
*/
```

---

### Opérateurs

#### Opérateurs Arithmétiques

```javascript
// Addition
const sum = 5 + 3; // 8

// Soustraction
const diff = 10 - 4; // 6

// Multiplication
const product = 4 * 5; // 20

// Division
const quotient = 20 / 4; // 5

// Modulo (reste de la division)
const remainder = 10 % 3; // 1

/*
   COMMENT marche le modulo (%) ?
   10 % 3 signifie : "quel est le reste quand je divise 10 par 3 ?"
   10 ÷ 3 = 3 reste 1 → donc 10 % 3 = 1

   POURQUOI utiliser le modulo ?
   - Vérifier si un nombre est pair : n % 2 === 0
   - Cycles répétitifs : position % longueur
   - Limiter une valeur : value % max
*/

// Exemples pratiques
const isPair = (n) => n % 2 === 0;
console.log(isPair(4)); // true
console.log(isPair(5)); // false

// Cycle de 0 à 4 répété
for (let i = 0; i < 10; i++) {
  console.log(i % 5); // 0,1,2,3,4,0,1,2,3,4
}

// Opérateurs d'incrémentation
let count = 0;
count++; // count = count + 1 (post-incrémentation)
++count; // count = count + 1 (pré-incrémentation)
count += 5; // count = count + 5 (raccourci)

/*
   DIFFÉRENCE ++ avant vs après :
*/
let x = 5;
console.log(x++); // Affiche 5, PUIS incrémente (x = 6)
console.log(++x); // Incrémente PUIS affiche (x = 7, affiche 7)

/*
   POURQUOI utiliser les raccourcis ?
   - Plus concis : count += 5 vs count = count + 5
   - Intention claire : "j'ajoute à count"
   - Marche avec tous les opérateurs : +=, -=, *=, /=, %=
*/
```

#### Opérateurs de Comparaison

```javascript
// Égalité STRICTE (valeur ET type)
5 === 5;   // true
5 === "5"; // false (types différents)

// Différence STRICTE
5 !== 3;   // true
5 !== "5"; // true (types différents)

/*
   POURQUOI TOUJOURS utiliser === et !== ?

   JavaScript a aussi == et != (égalité faible)
   Ils font des conversions automatiques (coercion)
   C'est une source MAJEURE de bugs !
*/

// ⚠️ ÉVITEZ == et != - comportement imprévisible
"5" == 5;   // true (conversion automatique) ❌ DANGEREUX
"" == 0;    // true ❌ WTF ?
false == 0; // true ❌ Confusing
null == undefined; // true ❌ Pourquoi ?

// ✅ UTILISEZ === et !== - comportement prévisible
"5" === 5;  // false (types différents) ✅ CLAIR
"" === 0;   // false ✅ LOGIQUE
false === 0; // false ✅ ÉVIDENT

/*
   RÈGLE ABSOLUE : JAMAIS ==, TOUJOURS ===

   Exception rare : if (x == null) pour tester null ET undefined
   Mais préférez : if (x === null || x === undefined)
   Ou mieux : if (x ?? false)
*/

// Comparaisons numériques
5 > 3;   // true - supérieur
5 >= 5;  // true - supérieur ou égal
5 < 10;  // true - inférieur
5 <= 5;  // true - inférieur ou égal

/*
   COMMENT ça marche avec les strings ?
   - Comparaison alphabétique (code Unicode)
*/
"a" < "b"; // true
"abc" < "abd"; // true (compare caractère par caractère)
"Z" < "a"; // true (majuscules avant minuscules en Unicode)
```

#### Opérateurs Logiques

```javascript
// AND (&&) - true seulement si LES DEUX sont true
true && true;   // true
true && false;  // false
false && true;  // false
false && false; // false

/*
   COMMENT && marche vraiment ?
   - Évalue de gauche à droite
   - S'arrête au premier "falsy" et le retourne
   - Si tout est "truthy", retourne la dernière valeur
*/

console.log(1 && 2 && 3); // 3 (toutes truthy, retourne la dernière)
console.log(1 && 0 && 3); // 0 (s'arrête au premier falsy)
console.log(null && "hello"); // null (s'arrête à null)

/*
   POURQUOI c'est utile ?
   - Short-circuit evaluation : évite d'exécuter du code inutile
   - Exécution conditionnelle : condition && action()
*/

const user = { name: "Alice" };
user && console.log(user.name); // Affiche seulement si user existe

// OR (||) - true si AU MOINS UN est true
true || false;  // true
false || true;  // true
false || false; // false

/*
   COMMENT || marche vraiment ?
   - Évalue de gauche à droite
   - S'arrête au premier "truthy" et le retourne
   - Si tout est "falsy", retourne la dernière valeur
*/

console.log(0 || 1 || 2); // 1 (premier truthy)
console.log(null || undefined || "default"); // "default"

/*
   POURQUOI c'est utile ?
   - Valeurs par défaut (avant l'opérateur ??)
*/
const username = userInput || "Invité"; // Si userInput est vide, utilise "Invité"

// NOT (!) - inverse la valeur booléenne
!true;  // false
!false; // true

/*
   UTILISATION pratique : double négation !!
   Convertit n'importe quelle valeur en booléen
*/
!!1;      // true
!!0;      // false
!!"text"; // true
!!"";     // false

/*
   POURQUOI !! ?
   - Conversion explicite en booléen
   - Plus lisible que Boolean(value)
   - Utile pour les conditions complexes
*/
```

---

### Conversion de Types

JavaScript fait beaucoup de conversions automatiques (coercion), mais il vaut mieux être explicite !

#### String vers Number

```javascript
const strNumber = "42";

// Méthode 1 : Number() - conversion explicite
const num1 = Number(strNumber); // 42

/*
   COMMENT Number() marche ?
   - Tente de parser toute la chaîne
   - Retourne NaN si la conversion échoue

   QUAND l'utiliser ?
   - Pour convertir des entrées utilisateur
   - Quand vous voulez NaN en cas d'échec
*/
console.log(Number("42"));    // 42
console.log(Number("42.5"));  // 42.5
console.log(Number("42px"));  // NaN (caractères non numériques)
console.log(Number(""));      // 0 (chaîne vide = 0)
console.log(Number("  42  ")); // 42 (espaces ignorés)

// Méthode 2 : parseInt() - conversion d'entier
const num2 = parseInt(strNumber); // 42

/*
   COMMENT parseInt() marche ?
   - Parse jusqu'au premier caractère non numérique
   - Ignore les espaces au début
   - Accepte une base (2 pour binaire, 16 pour hexa, etc.)

   QUAND l'utiliser ?
   - Pour extraire un nombre d'une chaîne mixte
   - Pour parser des bases différentes
*/
console.log(parseInt("42"));      // 42
console.log(parseInt("42.9"));    // 42 (ignore les décimales)
console.log(parseInt("42px"));    // 42 (s'arrête à 'p')
console.log(parseInt("   42  ")); // 42
console.log(parseInt("hello"));   // NaN

// Avec base
console.log(parseInt("1010", 2));  // 10 (binaire)
console.log(parseInt("FF", 16));   // 255 (hexadécimal)

// Méthode 3 : parseFloat() - conversion avec décimales
const num3 = parseFloat("42.5"); // 42.5

// Méthode 4 : Opérateur + (raccourci)
const num4 = +strNumber; // 42

/*
   COMMENT + marche ?
   - Opérateur unaire qui force la conversion en nombre
   - Équivalent à Number()

   POURQUOI l'utiliser ?
   - Plus court : +value vs Number(value)
   - Idiomatique en JavaScript

   ATTENTION : source de confusion pour les débutants
*/
console.log(+"42");   // 42
console.log(+"42.5"); // 42.5
console.log(+"");     // 0
console.log(+"hello"); // NaN

/*
   QUEL CHOISIR ?
   - Number() : conversion standard, lisible
   - parseInt() : extraire entier d'une chaîne mixte
   - parseFloat() : extraire décimal d'une chaîne mixte
   - + : raccourci rapide si vous êtes à l'aise
*/
```

#### Number vers String

```javascript
const number = 42;

// Méthode 1 : String() - conversion explicite
const str1 = String(number); // "42"

// Méthode 2 : .toString() - méthode d'objet Number
const str2 = number.toString(); // "42"

/*
   DIFFÉRENCE String() vs .toString() ?
   - String() marche avec null et undefined
   - .toString() provoque une erreur avec null/undefined
*/
console.log(String(null));      // "null" ✅
// console.log(null.toString()); // ❌ Erreur !

/*
   .toString() accepte une base !
*/
const binary = (10).toString(2);  // "1010" (binaire)
const hex = (255).toString(16);   // "ff" (hexadécimal)

// Méthode 3 : Template literal (recommandé)
const str3 = `${number}`; // "42"

/*
   POURQUOI préférer les template literals ?
   - Plus lisible dans des phrases
   - Convertit automatiquement
   - Moderne et idiomatique
*/
const message = `Vous avez ${42} ans`; // Clair et lisible

// Méthode 4 : Concaténation avec string vide
const str4 = number + ""; // "42"

/*
   ATTENTION : cette méthode est un "hack"
   Fonctionne mais peu lisible
   Préférez les méthodes explicites
*/
```

#### Vers Boolean

```javascript
// Méthode 1 : Boolean() - conversion explicite
Boolean(1);       // true
Boolean(0);       // false
Boolean("");      // false
Boolean("text");  // true
Boolean(null);    // false
Boolean(undefined); // false
Boolean(NaN);     // false
Boolean({});      // true (objet vide = truthy !)
Boolean([]);      // true (tableau vide = truthy !)

/*
   POURQUOI Boolean() ?
   - Conversion explicite et lisible
   - Utile pour clarifier l'intention
*/

// Méthode 2 : Double négation !! (idiomatique)
!!1;        // true
!!0;        // false
!!"";       // false
!!"text";   // true

/*
   COMMENT !! marche ?
   - Premier ! : inverse et convertit en booléen
   - Second ! : re-inverse pour avoir la valeur booléenne vraie

   POURQUOI l'utiliser ?
   - Plus court et idiomatique en JavaScript
   - Conversion rapide
*/

// Cas d'usage pratique
function hasContent(str) {
  return !!str; // Retourne true si str n'est pas vide
}

/*
   QUAND convertir explicitement ?
   - Pour clarifier l'intention dans les conditions
   - Pour stocker un état booléen
   - Pour des APIs qui attendent un vrai booléen
*/
```

---

## 💡 Points Clés à Retenir

### 1. Variables
- **const** par défaut (immuabilité de la référence)
- **let** seulement si réassignation nécessaire
- **var** jamais (problèmes de scope)

### 2. Types
- JavaScript a 7 types primitifs
- Comprendre truthy/falsy évite 80% des bugs
- null vs undefined : intentionnel vs non défini

### 3. Opérateurs
- **===** toujours, **==** jamais (sauf cas rarissimes)
- **&&** et **||** font du short-circuit (optimisation)
- Modulo **%** : pairs/impairs, cycles, limites

### 4. Conversions
- Préférer les conversions **explicites** (Number, String, Boolean)
- **+** et **!!** sont idiomatiques mais moins lisibles
- Template literals **`${}`** pour number→string dans du texte

---

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

**Objectifs d'apprentissage** :
- Choisir entre const, let (jamais var)
- Identifier les types de données
- Utiliser les bons opérateurs (===, pas ==)
- Convertir explicitement les types

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
