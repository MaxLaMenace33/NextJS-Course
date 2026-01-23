# Séance 1 : Les Bases de JavaScript

## 📚 Théorie

### Variables : let, const, var

```javascript
// var : ancienne syntaxe, éviter
var oldWay = "obsolète";

// let : variable réassignable
let age = 25;
age = 26; // OK

// const : constante, non réassignable
const name = "Alice";
// name = "Bob"; // ❌ Erreur !
```

**Règle d'or** : Utilisez `const` par défaut, `let` seulement si vous devez réassigner.

### Types de Données Primitifs

```javascript
// String (chaîne de caractères)
const text = "Bonjour";

// Number (nombre)
const age = 30;
const price = 19.99;

// Boolean (booléen)
const isActive = true;
const isCompleted = false;

// Undefined (non défini)
let notDefined;
console.log(notDefined); // undefined

// Null (valeur nulle intentionnelle)
const emptyValue = null;

// Symbol (unique identifier)
const id = Symbol('id');
```

### Opérateurs

```javascript
// Arithmétiques
const sum = 5 + 3;        // 8
const diff = 10 - 4;      // 6
const product = 4 * 5;    // 20
const quotient = 20 / 4;  // 5
const remainder = 10 % 3; // 1 (modulo)

// Comparaison
5 === 5   // true (égalité stricte)
5 !== 3   // true (différence stricte)
5 > 3     // true
5 >= 5    // true
5 < 10    // true

// ⚠️ Évitez == et != (égalité faible)
"5" == 5  // true (mauvais !)
"5" === 5 // false (bon !)

// Logiques
true && false  // false (ET)
true || false  // true (OU)
!true          // false (NON)
```

### Conversion de Types

```javascript
// String vers Number
const strNumber = "42";
const num = Number(strNumber);     // 42
const num2 = parseInt(strNumber);  // 42
const num3 = +strNumber;           // 42 (raccourci)

// Number vers String
const number = 42;
const str = String(number);        // "42"
const str2 = number.toString();    // "42"
const str3 = `${number}`;          // "42" (template literal)

// Vers Boolean
Boolean(1);       // true
Boolean(0);       // false
Boolean("");      // false
Boolean("text");  // true
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
