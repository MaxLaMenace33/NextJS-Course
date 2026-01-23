# Séance 1 : Les Bases de TypeScript

## 📚 Théorie

### Types Primitifs

TypeScript ajoute un système de types statique au-dessus de JavaScript.

```typescript
// String - Type pour les chaînes de caractères
const name: string = "Alice";
const greeting: string = `Hello ${name}`;

/*
   POURQUOI typer string ?
   - TypeScript VÉRIFIE que vous n'assignez que des chaînes
   - Prévient les erreurs de type à la COMPILATION
   - L'éditeur fournit l'AUTOCOMPLÉTION et les méthodes string

   COMMENT ça marche ?
   - : string est une ANNOTATION de type
   - TypeScript vérifie lors de la compilation
   - Le code JavaScript généré ne contient PAS les types

   QUAND l'utiliser ?
   - Paramètres de fonction qui doivent être des strings
   - Variables qui ne changeront jamais de type
   - Valeurs de retour de fonctions
*/

// Number - Type pour TOUS les nombres (entiers et décimaux)
const age: number = 25;
const price: number = 19.99;
const infinity: number = Infinity;
const notANumber: number = NaN;

/*
   POURQUOI typer number ?
   - Un seul type pour TOUS les nombres (pas de int/float comme en Java)
   - Évite les erreurs de calcul avec des non-nombres
   - Autocomplétion des méthodes Number

   ⚠️ ATTENTION :
   - TypeScript ne distingue PAS entiers et décimaux
   - number inclut NaN et Infinity
   - Pour des entiers uniquement, utilisez un type littéral ou une validation runtime
*/

// Boolean - Type pour true/false
const isActive: boolean = true;
const isLoggedIn: boolean = false;

/*
   POURQUOI typer boolean ?
   - Force des valeurs STRICTEMENT true ou false
   - Évite les "truthy/falsy" ambigus
   - Clarifie l'intention du code

   ⚠️ ATTENTION :
   // ❌ Erreur TypeScript
   const flag: boolean = 1; // number n'est pas boolean
   const flag2: boolean = "true"; // string n'est pas boolean

   // ✅ Conversion explicite si nécessaire
   const flag3: boolean = Boolean(1); // true
*/

// Array - Deux syntaxes équivalentes
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

/*
   POURQUOI typer les tableaux ?
   - Garantit que TOUS les éléments sont du même type
   - Autocomplétion sur les éléments
   - Évite les erreurs de manipulation de données

   DEUX SYNTAXES :
   1. number[] → syntaxe courte (préférée)
   2. Array<number> → syntaxe générique

   COMMENT ça marche ?
   numbers.push(4); // ✅ OK
   numbers.push("5"); // ❌ Erreur TypeScript

   QUAND utiliser chaque syntaxe ?
   - number[] : pour les types simples (préféré)
   - Array<number> : pour cohérence avec d'autres génériques
*/

// Tuple - Tableau avec types FIXES à chaque position
const person: [string, number] = ["Alice", 25];
const coordinates: [number, number] = [48.8566, 2.3522];

/*
   POURQUOI les tuples ?
   - Représenter des PAIRES ou GROUPES de valeurs de types différents
   - Ordre et type FIXES pour chaque position
   - Alternative légère aux objets pour des données simples

   COMMENT ça marche ?
   const person: [string, number] = ["Alice", 25];
   person[0] → type string
   person[1] → type number

   DIFFÉRENCE avec Array :
   number[] → tous les éléments sont number
   [string, number] → 1er élément string, 2ème number

   QUAND l'utiliser ?
   - Paires de valeurs : [key, value]
   - Coordonnées : [x, y] ou [latitude, longitude]
   - Résultats de fonctions : [error, result]
   - États React : const [state, setState] = useState()

   ⚠️ ATTENTION :
   person[0] = 25; // ❌ Erreur : number n'est pas string
   person[1] = "Bob"; // ❌ Erreur : string n'est pas number
   person.push(true); // ⚠️ TypeScript ne bloque PAS push/pop (limitation)
*/

// Any - Type "n'importe quoi" (à ÉVITER)
let anything: any = "hello";
anything = 42; // ✅ OK
anything = true; // ✅ OK
anything = {}; // ✅ OK
anything.whatever.foo.bar(); // ✅ Pas d'erreur TS (mais crash runtime !)

/*
   POURQUOI any existe ?
   - Désactiver TypeScript pour une variable
   - Migration progressive de JavaScript vers TypeScript
   - Intégration avec du code JavaScript sans types

   ❌ PROBLÈME avec any :
   - AUCUNE vérification de type
   - AUCUNE autocomplétion
   - PERD tous les bénéfices de TypeScript
   - Risque d'erreurs à l'EXÉCUTION

   QUAND l'utiliser ?
   - JAMAIS dans du nouveau code
   - Temporairement lors de migration JS → TS
   - Vraiment en dernier recours

   ⚠️ CONSEIL :
   - Préférez unknown (voir ci-dessous)
   - Activez "noImplicitAny" dans tsconfig.json
   - any est un "trou" dans la sécurité des types
*/

// Unknown - Type "inconnu" (préférer à any)
let uncertain: unknown = "hello";
uncertain = 42; // ✅ OK
uncertain = {}; // ✅ OK

// uncertain.toUpperCase(); // ❌ Erreur TypeScript
// TypeScript force à vérifier le type avant utilisation

if (typeof uncertain === "string") {
  uncertain.toUpperCase(); // ✅ OK après vérification (type narrowing)
}

/*
   POURQUOI unknown ?
   - Type SÛR pour les valeurs de type INCONNU
   - Force à VÉRIFIER le type avant utilisation
   - Alternative SÉCURISÉE à any

   COMMENT ça marche ?
   - TypeScript bloque toute opération sur unknown
   - Vous DEVEZ vérifier le type (type guard)
   - Après vérification, TypeScript "rétrécit" le type (narrowing)

   DIFFÉRENCE any vs unknown :
   any → tout est permis (dangereux)
   unknown → rien n'est permis sans vérification (sûr)

   QUAND l'utiliser ?
   - Données d'API non typées
   - Résultats JSON.parse()
   - Fonctions génériques qui acceptent n'importe quoi
   - Anywhere you would use any

   💡 EXEMPLE pratique :
   function parseJSON(json: string): unknown {
     return JSON.parse(json); // Type de retour inconnu
   }

   const data = parseJSON('{"name": "Alice"}');
   // data.name // ❌ Erreur

   if (typeof data === "object" && data !== null && "name" in data) {
     console.log(data.name); // ✅ OK après vérification
   }
*/

// Void - Fonction qui ne retourne RIEN
function logMessage(message: string): void {
  console.log(message);
  // Pas de return (ou return; sans valeur)
}

/*
   POURQUOI void ?
   - Indiquer qu'une fonction ne retourne PAS de valeur
   - Différent de undefined (pas de return vs return undefined)
   - Clarifier l'intention : cette fonction a un effet de bord

   COMMENT ça marche ?
   - Fonction avec : void ne peut pas retourner de valeur
   - return; est OK
   - return undefined; est OK
   - return 42; est ❌ Erreur

   QUAND l'utiliser ?
   - Fonctions avec effets de bord (console.log, mutations)
   - Event handlers
   - Callbacks qui ne retournent rien

   💡 NOTE :
   - void en paramètre a un sens différent (fonction peut retourner quelque chose)
   - callback: () => void accepte une fonction qui peut retourner n'importe quoi
*/

// Never - Fonction qui ne retourne JAMAIS
function throwError(message: string): never {
  throw new Error(message);
  // Code après throw n'est jamais atteint
}

function infiniteLoop(): never {
  while (true) {
    // Boucle infinie
  }
}

/*
   POURQUOI never ?
   - Représenter des fonctions qui ne TERMINENT JAMAIS
   - Lance une exception (throw)
   - Boucle infinie
   - Analyse de flux de contrôle

   COMMENT ça marche ?
   - never signifie "aucune valeur possible"
   - Différent de void (void = pas de valeur, never = jamais de retour)

   DIFFÉRENCE void vs never :
   void → fonction termine mais ne retourne rien
   never → fonction ne termine JAMAIS

   QUAND l'utiliser ?
   - Fonctions qui lancent toujours des erreurs
   - Boucles infinies
   - Exhaustive checks dans switch

   💡 EXEMPLE pratique - Exhaustive check :
   type Shape = "circle" | "square";

   function getArea(shape: Shape): number {
     switch (shape) {
       case "circle": return Math.PI;
       case "square": return 1;
       default:
         const exhaustiveCheck: never = shape;
         throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
     }
   }
*/

// Null et Undefined - Types spéciaux
let nullable: null = null;
let undefinedValue: undefined = undefined;

/*
   POURQUOI null et undefined ?
   - Représenter l'ABSENCE de valeur
   - null : absence intentionnelle
   - undefined : absence par défaut/non initialisé

   COMMENT les utiliser avec strictNullChecks ?
   Avec strictNullChecks: true (recommandé) :
   let name: string = null; // ❌ Erreur
   let name: string | null = null; // ✅ OK

   Sans strictNullChecks :
   let name: string = null; // ✅ OK (pas recommandé)

   QUAND l'utiliser ?
   - null : valeur intentionnellement absente
   - undefined : valeur non définie/initialisée

   💡 CONSEIL :
   - Préférez null pour représenter "pas de valeur"
   - Utilisez undefined pour "valeur optionnelle"
   - Activez strictNullChecks dans tsconfig.json
*/
```

### Type Inference (Inférence de type)

TypeScript peut DÉDUIRE automatiquement les types sans que vous les annotiez explicitement.

```typescript
// Type inféré : string (TypeScript voit "Hello" et déduit string)
let message = "Hello";
// message = 42; // ❌ Erreur : Type 'number' is not assignable to type 'string'

/*
   POURQUOI l'inférence de type ?
   - Éviter d'écrire des annotations PARTOUT
   - Code plus CONCIS tout en gardant la sécurité des types
   - TypeScript est intelligent : il analyse le code

   COMMENT ça marche ?
   1. TypeScript regarde la VALEUR assignée
   2. Déduit le type le plus SPÉCIFIQUE
   3. La variable conserve ce type pour toute sa vie

   Exemple :
   let message = "Hello";
   → TypeScript voit "Hello" (string)
   → Infère : let message: string = "Hello"
   → message ne peut plus recevoir autre chose qu'une string

   QUAND faire confiance à l'inférence ?
   - Déclarations avec initialisation
   - Retours de fonctions
   - Types évidents
*/

// Type inféré : number
let count = 0; // TypeScript infère : let count: number = 0
count = 10; // ✅ OK
// count = "ten"; // ❌ Erreur

// Type inféré pour les fonctions - Retour automatique
function add(a: number, b: number) {
  return a + b; // Retour inféré : number (number + number = number)
}

const result = add(2, 3); // result est inféré comme number

/*
   POURQUOI l'inférence de retour ?
   - TypeScript analyse le CORPS de la fonction
   - Déduit le type de retour depuis le return
   - Moins de code à écrire

   COMMENT ça marche ?
   function add(a: number, b: number) {
     return a + b; // a + b est number → retour: number
   }

   TypeScript comprend :
   - a: number + b: number → résultat: number
   - return (number) → fonction retourne number

   QUAND annoter explicitement le retour ?
   ✅ Annoter explicitement :
   - Fonctions publiques/API
   - Fonctions complexes
   - Garantir le type attendu

   function add(a: number, b: number): number {
     return a + b;
   }

   ⚠️ Laisser l'inférence :
   - Fonctions simples privées
   - Retour évident
*/

// EXEMPLES AVANCÉS d'inférence

// 1. Tableaux - Type inféré des éléments
const numbers = [1, 2, 3]; // number[]
const mixed = [1, "two", 3]; // (number | string)[]
const empty = []; // any[] (⚠️ TypeScript ne peut pas deviner)

/*
   TypeScript regarde TOUS les éléments et infère le type commun
   - [1, 2, 3] → tous number → number[]
   - [1, "two"] → number et string → (number | string)[]
   - [] → aucun élément → any[] (attention !)
*/

// 2. Objets - Structure inférée
const user = {
  name: "Alice",
  age: 25
};
// Inféré : { name: string; age: number }

// user.name = "Bob"; // ✅ OK
// user.name = 42; // ❌ Erreur
// user.email = "test@example.com"; // ❌ Erreur : propriété n'existe pas

/*
   TypeScript infère la STRUCTURE complète de l'objet
   - Noms des propriétés
   - Types de chaque propriété
   - Propriétés EXACTES (pas plus, pas moins)
*/

// 3. Const vs Let - Inférence différente
let mutableString = "hello"; // Type: string (peut changer)
const constantString = "hello"; // Type: "hello" (type littéral)

/*
   DIFFÉRENCE let vs const :
   let → type GÉNÉRAL (string, number, boolean)
   const → type LITTÉRAL ("hello", 42, true)

   Pourquoi ?
   - let peut être réassigné → type général
   - const ne peut pas changer → type spécifique (littéral)
*/

// 4. Fonctions fléchées
const multiply = (a: number, b: number) => a * b;
// Retour inféré : number

const greet = (name: string) => `Hello ${name}`;
// Retour inféré : string

/*
   ✅ BONNES PRATIQUES :
   1. Laissez TypeScript inférer QUAND c'est évident
   2. Annotez explicitement les INTERFACES publiques
   3. Annotez explicitement pour plus de CLARTÉ
   4. Utilisez l'inférence pour le code INTERNE

   💡 EXEMPLE - Quand annoter vs laisser inférer :
   // ❌ Trop verbeux (inférence suffit)
   const name: string = "Alice";
   const age: number = 25;

   // ✅ Concis (inférence fait le travail)
   const name = "Alice";
   const age = 25;

   // ✅ Annoter pour clarté (fonction publique)
   export function calculateTotal(items: Item[]): number {
     return items.reduce((sum, item) => sum + item.price, 0);
   }

   // ✅ Inférence OK (fonction privée simple)
   function formatName(first: string, last: string) {
     return `${first} ${last}`; // retour inféré: string
   }
*/
```

### Union Types

Les Union Types permettent à une variable d'être de PLUSIEURS types possibles.

```typescript
// Variable peut être string OU number
let id: string | number;
id = "abc123"; // ✅ OK
id = 123; // ✅ OK
// id = true; // ❌ Erreur : boolean n'est ni string ni number

/*
   POURQUOI les Union Types ?
   - Représenter des valeurs qui peuvent avoir PLUSIEURS types
   - Plus FLEXIBLE qu'un seul type
   - Plus STRICTE que any
   - Reflète la RÉALITÉ : certaines données peuvent varier

   COMMENT ça marche ?
   - Syntaxe : type1 | type2 | type3
   - | signifie "OU" (pas "ET")
   - La valeur doit correspondre à AU MOINS UN des types

   QUAND l'utiliser ?
   - IDs qui peuvent être number ou string
   - Réponses d'API avec plusieurs formats possibles
   - Valeurs de configuration variables
   - États avec plusieurs formes possibles
*/

// Fonction avec union type en paramètre
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}

printId(123); // ✅ OK
printId("abc-123"); // ✅ OK
// printId(true); // ❌ Erreur

/*
   TRAVAILLER avec les Union Types - Type Narrowing

   TypeScript ne sait PAS quel type exact vous avez
   Vous devez VÉRIFIER le type avant d'utiliser des méthodes spécifiques
*/

function processId(id: string | number): string {
  // ❌ id.toUpperCase(); // Erreur : number n'a pas toUpperCase()
  // ❌ id.toFixed(); // Erreur : string n'a pas toFixed()

  // ✅ Type narrowing avec typeof
  if (typeof id === "string") {
    return id.toUpperCase(); // TypeScript sait que id est string ici
  } else {
    return id.toFixed(2); // TypeScript sait que id est number ici
  }
}

/*
   POURQUOI le type narrowing ?
   - TypeScript VÉRIFIE que vous gérez chaque type
   - Évite les erreurs "method does not exist"
   - Force à considérer TOUS les cas

   COMMENT narrower (rétrécir) ?
   1. typeof : pour types primitifs
   2. instanceof : pour classes
   3. in : pour propriétés d'objets
   4. Type guards personnalisés

   💡 TECHNIQUES de narrowing :

   // 1. typeof (primitifs)
   if (typeof value === "string") { ... }

   // 2. instanceof (classes)
   if (value instanceof Date) { ... }

   // 3. in (propriétés)
   if ("name" in value) { ... }

   // 4. Vérification de valeur
   if (value === null) { ... }

   // 5. Type guard personnalisé
   function isString(value: unknown): value is string {
     return typeof value === "string";
   }
*/

// EXEMPLES PRATIQUES d'Union Types

// 1. Réponse d'API - Success ou Error
type ApiResponse =
  | { status: "success"; data: any }
  | { status: "error"; message: string };

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data); // OK : TypeScript sait que c'est success
  } else {
    console.error(response.message); // OK : TypeScript sait que c'est error
  }
}

// 2. Configuration flexible
type Port = number | string;

const port1: Port = 3000; // ✅ OK
const port2: Port = "3000"; // ✅ OK
const port3: Port = "localhost:3000"; // ✅ OK

// 3. Fonction qui accepte plusieurs formats
function formatDate(date: Date | string | number): string {
  if (date instanceof Date) {
    return date.toISOString();
  } else if (typeof date === "string") {
    return new Date(date).toISOString();
  } else {
    return new Date(date).toISOString(); // timestamp
  }
}

/*
   ⚠️ ATTENTION - Union vs Intersection :

   Union (|) : "OU" → A | B signifie "A OU B"
   let value: string | number; // string OU number

   Intersection (&) : "ET" → A & B signifie "A ET B"
   type Combined = TypeA & TypeB; // A ET B (toutes les propriétés)

   💡 MÉMO :
   | = pipe = "ou" = l'un ou l'autre
   & = et = "et" = les deux combinés
*/

// 4. Null/Undefined dans les unions
type NullableString = string | null;
type OptionalNumber = number | undefined;

let name: NullableString = "Alice";
name = null; // ✅ OK

let age: OptionalNumber = 25;
age = undefined; // ✅ OK

/*
   PATTERN COURANT :
   - string | null : peut être null intentionnellement
   - string | undefined : peut être non défini
   - string | null | undefined : peut être les deux

   Avec strictNullChecks, vous DEVEZ gérer null/undefined :
   function greet(name: string | null) {
     if (name === null) {
       console.log("Hello, stranger!");
     } else {
       console.log(`Hello, ${name}!`);
     }
   }
*/
```

### Literal Types (Types littéraux)

Les Literal Types permettent de spécifier des VALEURS EXACTES plutôt que des types généraux.

```typescript
// Type littéral pour strings - Seulement ces 4 valeurs exactes
let direction: "north" | "south" | "east" | "west";
direction = "north"; // ✅ OK
direction = "south"; // ✅ OK
// direction = "up"; // ❌ Erreur : "up" n'est pas dans le type
// direction = "North"; // ❌ Erreur : la casse compte !

/*
   POURQUOI les Literal Types ?
   - Limiter à des VALEURS SPÉCIFIQUES
   - Plus STRICT que string/number général
   - Éviter les FAUTES DE FRAPPE
   - Autocomplétion dans l'éditeur
   - Alternative type-safe aux enums

   COMMENT ça marche ?
   - Au lieu de type général (string), on spécifie les valeurs exactes
   - "north" | "south" | "east" | "west"
   - TypeScript vérifie que la valeur est EXACTEMENT l'une d'elles

   DIFFÉRENCE avec types généraux :
   let dir: string = "anywhere"; // ✅ OK (trop permissif)
   let dir: "north" | "south" = "anywhere"; // ❌ Erreur (strict)

   QUAND l'utiliser ?
   - Énumérations de valeurs fixes (status, direction, mode)
   - Configuration avec options prédéfinies
   - Types de messages/événements
   - Alternatives aux magic strings
*/

// Avec nombres - Dé à 6 faces
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3; // ✅ OK
// diceRoll = 0; // ❌ Erreur
// diceRoll = 7; // ❌ Erreur

/*
   Les nombres littéraux sont utiles pour :
   - Valeurs numériques limitées (dés, mois, jours de la semaine)
   - Codes d'erreur spécifiques
   - Versions d'API (1, 2, 3)
*/

// EXEMPLES PRATIQUES

// 1. Status d'une requête
type RequestStatus = "idle" | "loading" | "success" | "error";

let status: RequestStatus = "idle";
status = "loading"; // ✅ OK
// status = "pending"; // ❌ Erreur : pas dans le type

/*
   AVANTAGE :
   - Autocomplétion : l'éditeur suggère les 4 valeurs
   - Protection contre fautes de frappe : "loding" → Erreur
   - Documentation : on voit toutes les valeurs possibles
*/

// 2. Configuration de thème
type Theme = "light" | "dark" | "auto";

function setTheme(theme: Theme): void {
  document.body.className = theme;
}

setTheme("dark"); // ✅ OK
// setTheme("blue"); // ❌ Erreur

// 3. HTTP Methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function request(url: string, method: HttpMethod) {
  // ...
}

request("/api/users", "GET"); // ✅ OK
// request("/api/users", "get"); // ❌ Erreur : casse incorrecte

// 4. Boolean littérals (moins courant)
type AlwaysTrue = true;
let flag: AlwaysTrue = true; // ✅ OK
// let flag2: AlwaysTrue = false; // ❌ Erreur

/*
   Utilisé pour :
   - Surcharges de fonctions
   - Types conditionnels avancés
   - Flags compile-time
*/

// 5. Combiner plusieurs types littéraux
type SuccessCode = 200 | 201 | 204;
type ErrorCode = 400 | 401 | 403 | 404 | 500;
type StatusCode = SuccessCode | ErrorCode;

function handleStatus(code: StatusCode) {
  if (code >= 200 && code < 300) {
    console.log("Success");
  } else {
    console.log("Error");
  }
}

/*
   💡 PATTERN COURANT - Type Alias + Literal Types :
   type Size = "small" | "medium" | "large";
   type Color = "red" | "green" | "blue";

   type ButtonProps = {
     size: Size;
     color: Color;
     label: string;
   };
*/

// 6. Literal Types vs Enum
// ❌ Ancien style : Enum
enum Direction {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST"
}

// ✅ Moderne : Literal Types
type DirectionLiteral = "north" | "south" | "east" | "west";

/*
   AVANTAGES Literal Types vs Enum :
   - Plus simple (pas de compilation JavaScript supplémentaire)
   - Plus flexible (union directe)
   - Meilleure intégration avec les valeurs string/number natives
   - Pas de namespace (pas de Direction.North)

   QUAND préférer Enum ?
   - Besoin de valeurs numériques auto-incrémentées
   - Compatibilité avec du code existant
   - Besoin d'un namespace
*/

// 7. Template Literal Types (avancé - TypeScript 4.1+)
type Greeting = `hello ${string}`;

let greet1: Greeting = "hello world"; // ✅ OK
let greet2: Greeting = "hello Alice"; // ✅ OK
// let greet3: Greeting = "hi there"; // ❌ Erreur : ne commence pas par "hello "

/*
   POURQUOI Template Literal Types ?
   - Patterns de strings plus complexes
   - IDs avec préfixes : `user-${string}`, `order-${number}`
   - CSS classes : `btn-${Size}`

   💡 EXEMPLE avancé :
   type EventName = `on${Capitalize<string>}`;
   let event1: EventName = "onClick"; // ✅ OK
   let event2: EventName = "onHover"; // ✅ OK
   // let event3: EventName = "click"; // ❌ Erreur : pas de "on"
*/

/*
   ✅ BONNES PRATIQUES avec Literal Types :
   1. Utilisez-les pour remplacer les "magic strings"
   2. Combinez-les avec type alias pour la réutilisation
   3. Préférez-les aux enums pour des valeurs string simples
   4. Utilisez l'autocomplétion de votre éditeur

   ⚠️ ATTENTION :
   - Les Literal Types sont SENSIBLES à la casse
   - Pensez à const pour obtenir des types littéraux automatiquement
*/
```

### Types pour Objets

TypeScript permet de définir la STRUCTURE exacte des objets.

```typescript
// Annotation d'objet - Définir la structure
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// user.name = "Bob"; // ✅ OK
// user.age = "25"; // ❌ Erreur : string n'est pas number
// user.email = "test@example.com"; // ❌ Erreur : propriété n'existe pas

/*
   POURQUOI typer les objets ?
   - Garantir la STRUCTURE de l'objet
   - Autocomplétion des propriétés
   - Éviter les fautes de frappe
   - Documentation intégrée

   COMMENT ça marche ?
   { name: string; age: number }
   - name doit être string
   - age doit être number
   - AUCUNE autre propriété n'est permise

   QUAND l'utiliser ?
   - Objets de configuration
   - Données d'API
   - Props de composants React
   - Paramètres d'options de fonctions

   💡 CONSEIL :
   Pour des objets réutilisés, utilisez type ou interface (voir séance 2)
*/

// Propriété optionnelle - Peut être absente
const user2: { name: string; age?: number } = {
  name: "Bob"
  // age est optionnel (peut être omis)
};

const user3: { name: string; age?: number } = {
  name: "Charlie",
  age: 30 // ou avec age
};

/*
   POURQUOI les propriétés optionnelles ?
   - Certaines propriétés ne sont PAS toujours présentes
   - Configuration avec valeurs optionnelles
   - Données incomplètes d'API

   COMMENT ça marche ?
   - Syntaxe : propertyName?: Type
   - ? signifie "optionnelle"
   - Le type devient automatiquement Type | undefined

   age?: number est équivalent à age: number | undefined

   QUAND l'utiliser ?
   - Propriétés qui peuvent manquer
   - Configuration avec défauts
   - Données utilisateur incomplètes

   ⚠️ ATTENTION :
   Si vous accédez à une propriété optionnelle, elle peut être undefined
   const age = user2.age; // Type: number | undefined
   const nextAge = user2.age + 1; // ❌ Erreur : peut être undefined

   Solution :
   const nextAge = (user2.age ?? 0) + 1; // ✅ OK avec fallback
   if (user2.age !== undefined) {
     const nextAge = user2.age + 1; // ✅ OK après vérification
   }
*/

// Propriété readonly - Ne peut PAS être modifiée
const config: { readonly apiKey: string } = {
  apiKey: "secret"
};

// config.apiKey = "new"; // ❌ Erreur : Cannot assign to 'apiKey' because it is a read-only property

/*
   POURQUOI readonly ?
   - Empêcher la MODIFICATION accidentelle
   - Rendre les objets IMMUTABLES
   - Documenter qu'une propriété ne doit pas changer

   COMMENT ça marche ?
   - readonly empêche la réassignation
   - Uniquement au niveau TypeScript (pas à l'exécution)
   - Protection compile-time, pas runtime

   QUAND l'utiliser ?
   - Constantes de configuration
   - IDs qui ne doivent jamais changer
   - Données immutables

   ⚠️ LIMITES de readonly :
   1. Protection superficielle (shallow)
   const data: { readonly nested: { value: number } } = {
     nested: { value: 10 }
   };
   data.nested = { value: 20 }; // ❌ Erreur
   data.nested.value = 20; // ✅ OK (nested n'est pas readonly)

   2. Protection compile-time seulement
   Le code JavaScript généré ne force PAS l'immutabilité
*/

// EXEMPLES AVANCÉS

// 1. Objet avec plusieurs types de propriétés
type User = {
  id: number;                // requis
  name: string;              // requis
  email?: string;            // optionnel
  readonly createdAt: Date;  // readonly
  isActive: boolean;         // requis
};

const alice: User = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  isActive: true
  // email omis (optionnel)
};

// 2. Index Signature - Propriétés dynamiques
type StringMap = {
  [key: string]: string;
};

const translations: StringMap = {
  hello: "Bonjour",
  goodbye: "Au revoir",
  thanks: "Merci"
  // N'importe quelle clé string avec valeur string
};

/*
   POURQUOI Index Signature ?
   - Objets avec propriétés DYNAMIQUES
   - Dictionnaires / Maps
   - Quand vous ne connaissez pas les noms de propriétés à l'avance

   COMMENT ça marche ?
   [key: string]: string
   - key peut être n'importe quel nom
   - La valeur doit être string

   💡 VARIATIONS :
   [key: string]: number; // Valeurs number
   [key: number]: string; // Clés number (tableaux)
   [key: string]: any; // Valeurs any (éviter)
*/

// 3. Combiner propriétés fixes et index signature
type Config = {
  apiUrl: string;           // propriété fixe
  timeout: number;          // propriété fixe
  [key: string]: any;       // autres propriétés dynamiques
};

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,              // ✅ OK (propriété dynamique)
  cacheEnabled: true       // ✅ OK (propriété dynamique)
};

// 4. Nested Objects - Objets imbriqués
type Address = {
  street: string;
  city: string;
  country: string;
};

type Person = {
  name: string;
  address: Address;  // Objet imbriqué
};

const person: Person = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Paris",
    country: "France"
  }
};

// 5. Intersection de types d'objets
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Article = {
  title: string;
  content: string;
};

type TimestampedArticle = Article & Timestamped;
// Combine TOUTES les propriétés

const article: TimestampedArticle = {
  title: "Hello",
  content: "World",
  createdAt: new Date(),
  updatedAt: new Date()
  // Toutes les propriétés requises
};

/*
   ✅ BONNES PRATIQUES :
   1. Utilisez type ou interface pour objets réutilisés
   2. Marquez les propriétés optionnelles avec ?
   3. Utilisez readonly pour propriétés immutables
   4. Index signature pour dictionnaires dynamiques
   5. & pour combiner des types d'objets

   ⚠️ PIÈGES :
   - readonly est superficiel (shallow)
   - Les propriétés optionnelles peuvent être undefined
   - Index signature rend toutes les propriétés valides
*/
```

### Types pour Fonctions

TypeScript permet de typer les PARAMÈTRES et les RETOURS de fonctions.

```typescript
// Typer les paramètres et le retour explicitement
function greet(name: string): string {
  return `Hello ${name}`;
}

greet("Alice"); // ✅ OK
// greet(42); // ❌ Erreur : number n'est pas string

/*
   POURQUOI typer les fonctions ?
   - Documenter ce que la fonction ATTEND et RETOURNE
   - Éviter les erreurs de paramètres incorrects
   - Autocomplétion sur les paramètres et retour
   - Sécurité des types pour l'appelant

   COMMENT ça marche ?
   function name(param: Type): ReturnType { ... }
   - Chaque paramètre a son type
   - : ReturnType après les parenthèses spécifie le retour
   - TypeScript vérifie que le return correspond

   QUAND annoter explicitement ?
   - Fonctions publiques / API
   - Callbacks
   - Event handlers
   - Quand le type de retour n'est pas évident
*/

// Fonction fléchée - Même principe
const multiply = (a: number, b: number): number => a * b;

const result = multiply(3, 4); // result: number

/*
   Les arrow functions utilisent la même syntaxe
   (param: Type) => ReturnType
*/

// Paramètre optionnel - Peut être omis
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

buildName("Alice"); // ✅ OK : "Alice"
buildName("Alice", "Smith"); // ✅ OK : "Alice Smith"

/*
   POURQUOI les paramètres optionnels ?
   - Fonctions flexibles avec paramètres non requis
   - Alternative aux surcharges de fonctions

   COMMENT ça marche ?
   - Syntaxe : param?: Type
   - Équivalent à param: Type | undefined
   - Les paramètres optionnels deviennent Type | undefined

   ⚠️ RÈGLES :
   1. Paramètres optionnels DOIVENT être après les requis
   ✅ function f(required: string, optional?: number) { }
   ❌ function f(optional?: number, required: string) { } // Erreur

   2. Vérifiez toujours si le paramètre est fourni
   function buildName(firstName: string, lastName?: string) {
     if (lastName) { // ✅ Vérification
       return `${firstName} ${lastName}`;
     }
     return firstName;
   }
*/

// Paramètre par défaut - Valeur si non fourni
function greetUser(name: string = "Guest"): string {
  return `Hello ${name}`;
}

greetUser(); // "Hello Guest"
greetUser("Alice"); // "Hello Alice"

/*
   POURQUOI les paramètres par défaut ?
   - Fournir une valeur FALLBACK
   - Rendre les fonctions plus pratiques
   - Éviter les vérifications if

   COMMENT ça marche ?
   - Syntaxe : param: Type = defaultValue
   - Si le paramètre n'est pas fourni, la valeur par défaut est utilisée
   - TypeScript infère le type depuis la valeur par défaut

   💡 Type inference avec défaut :
   function greet(name = "Guest") { // Type inféré : string
     return `Hello ${name}`;
   }

   ⚠️ DIFFÉRENCE optionnel vs défaut :
   optionnel (?) : peut être undefined, vous devez gérer
   défaut (=) : n'est jamais undefined, toujours une valeur
*/

// Rest parameters - Nombre variable d'arguments
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15
sum(); // 0

/*
   POURQUOI rest parameters ?
   - Accepter un NOMBRE VARIABLE d'arguments
   - Tous les arguments sont collectés dans un tableau
   - Plus moderne que l'objet arguments

   COMMENT ça marche ?
   - Syntaxe : ...param: Type[]
   - Collecte tous les arguments restants dans un tableau
   - Le type est toujours un tableau : number[], string[], etc.

   ⚠️ RÈGLES :
   1. Rest parameter doit être le DERNIER
   ✅ function f(a: string, ...rest: number[]) { }
   ❌ function f(...rest: number[], a: string) { } // Erreur

   2. Un seul rest parameter par fonction
   ❌ function f(...rest1: number[], ...rest2: string[]) { } // Erreur
*/

// EXEMPLES AVANCÉS

// 1. Type de fonction complet (Function Type)
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

/*
   POURQUOI définir un Function Type ?
   - Réutiliser la signature de fonction
   - Type pour callbacks
   - Documenter des contrats de fonction

   COMMENT ça marche ?
   type FunctionName = (param: Type) => ReturnType
   - (param: Type) : paramètres
   - => ReturnType : type de retour
*/

// 2. Callback typé
function fetchData(url: string, callback: (data: any) => void): void {
  // Simule un fetch
  setTimeout(() => {
    callback({ result: "data" });
  }, 1000);
}

fetchData("/api/users", (data) => {
  console.log(data); // data: any
});

// 3. Fonctions génériques (aperçu, détails en séance 3)
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // T = number
const str = identity("hello"); // T = string

// 4. Overload Signatures - Surcharges
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

format("hello"); // string
format(42); // string

/*
   POURQUOI les overloads ?
   - Même nom de fonction, comportements différents selon les types
   - Documentation claire des différentes utilisations
   - TypeScript choisit la bonne signature

   COMMENT ça marche ?
   1. Déclarer les signatures (overloads)
   2. Implémenter avec union type
   3. TypeScript matche la signature appropriée
*/

// 5. Fonction qui retourne une fonction (Higher-Order Function)
function createMultiplier(factor: number): (n: number) => number {
  return (n) => n * factor;
}

const double = createMultiplier(2);
double(5); // 10

/*
   Type de retour : (n: number) => number
   - La fonction retourne une autre fonction
   - Cette fonction retournée prend un number et retourne un number
*/

// 6. Void vs undefined
function logVoid(): void {
  console.log("Hello");
  // Pas de return
}

function logUndefined(): undefined {
  console.log("Hello");
  return undefined; // DOIT retourner undefined explicitement
}

/*
   DIFFÉRENCE void vs undefined :
   - void : fonction ne retourne rien (ou ignore le retour)
   - undefined : fonction retourne undefined explicitement

   💡 CONSEIL :
   - Utilisez void pour les fonctions avec effets de bord
   - undefined rarement utilisé
*/

/*
   ✅ BONNES PRATIQUES :
   1. Annotez explicitement les fonctions publiques
   2. Utilisez l'inférence pour les fonctions simples internes
   3. Paramètres optionnels après les requis
   4. Préférez les valeurs par défaut aux optionnels quand possible
   5. Définissez des Function Types pour réutilisation

   ⚠️ PIÈGES :
   - Paramètres optionnels doivent être vérifiés
   - Rest parameter doit être le dernier
   - Void accepte n'importe quel retour (pour callbacks)

   💡 EXEMPLES de Function Types courants :
   type EventHandler = (event: Event) => void;
   type Validator = (value: any) => boolean;
   type Mapper<T, U> = (item: T) => U;
   type Predicate<T> = (item: T) => boolean;
*/
```

### Type Assertions (Assertions de type)

Les Type Assertions permettent de dire à TypeScript "Fais-moi confiance, je sais ce que je fais".

```typescript
// Quand vous en savez plus que TypeScript
const myCanvas = document.getElementById("canvas") as HTMLCanvasElement;

// Sans assertion, TypeScript ne connaît que le type générique
const elem = document.getElementById("canvas"); // Type: HTMLElement | null

// Avec assertion, vous spécifiez le type exact
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// Maintenant TypeScript sait que c'est un HTMLCanvasElement

canvas.getContext("2d"); // ✅ OK : méthode disponible sur HTMLCanvasElement

/*
   POURQUOI les Type Assertions ?
   - Vous en savez PLUS que TypeScript sur le type
   - TypeScript est trop GÉNÉRAL ou trop STRICT
   - Travailler avec des APIs non typées
   - DOM : TypeScript ne sait pas quel élément HTML vous ciblez

   COMMENT ça marche ?
   - Syntaxe : value as Type
   - "Force" TypeScript à considérer value comme Type
   - Aucune conversion runtime (seulement compile-time)

   ⚠️ DANGER :
   - Vous DÉSACTIVEZ les vérifications de TypeScript
   - Si vous vous trompez → erreur à l'EXÉCUTION
   - TypeScript ne vérifie PAS si l'assertion est correcte

   QUAND l'utiliser ?
   - DOM : vous savez quel type d'élément vous avez
   - APIs externes non typées
   - Après des vérifications runtime que TypeScript ne comprend pas
   - En DERNIER RECOURS
*/

// Syntaxe alternative (PAS utilisée en JSX/TSX)
const myCanvas2 = <HTMLCanvasElement>document.getElementById("canvas");

/*
   DEUX SYNTAXES :
   1. as Type → utilisée partout, y compris JSX/TSX
   2. <Type> → conflit avec JSX, éviter en React

   💡 CONSEIL :
   Utilisez TOUJOURS as Type pour cohérence
*/

// EXEMPLES PRATIQUES

// 1. DOM Elements - Cas d'usage le plus courant
const input = document.getElementById("email") as HTMLInputElement;
console.log(input.value); // ✅ OK : .value existe sur HTMLInputElement

const button = document.querySelector(".submit") as HTMLButtonElement;
button.disabled = true; // ✅ OK : .disabled existe sur HTMLButtonElement

/*
   POURQUOI nécessaire ?
   - getElementById retourne HTMLElement | null
   - HTMLElement n'a pas .value, .checked, etc.
   - Vous savez que c'est un input → assertez
*/

// 2. API Response - JSON.parse()
interface User {
  id: number;
  name: string;
  email: string;
}

const jsonString = '{"id": 1, "name": "Alice", "email": "alice@example.com"}';
const user = JSON.parse(jsonString) as User;

console.log(user.name); // ✅ OK : TypeScript sait que c'est User

/*
   JSON.parse() retourne any
   - Vous savez la structure du JSON
   - Assertez le type pour l'autocomplétion

   ⚠️ ATTENTION :
   L'assertion ne VALIDE PAS la structure
   Si le JSON est différent → erreur runtime
   Considérez une bibliothèque de validation (zod, yup)
*/

// 3. Unknown vers un type spécifique
function processValue(value: unknown): string {
  // Vérification runtime
  if (typeof value === "string") {
    return value; // ✅ TypeScript narrow automatiquement
  }

  // Ou assertion si vous êtes sûr
  return (value as string).toUpperCase();
  // ⚠️ Dangereux si value n'est pas string
}

// 4. Narrowing impossible - TypeScript ne comprend pas
const data: any = fetchSomeData();

// Vous avez vérifié manuellement mais TypeScript ne le voit pas
if (checkIsValid(data)) {
  const validData = data as ValidType;
  // Utilisez validData
}

// 5. Casting vers des types plus ou moins spécifiques
// Plus spécifique (common)
const element = document.querySelector("div") as HTMLDivElement;

// Plus général (rare)
const anything = someValue as any; // ⚠️ Éviter !

// Double assertion (très rare, dernier recours)
const value = (someValue as unknown) as TargetType;

/*
   Double assertion :
   - Utilisée quand les types sont trop éloignés
   - TypeScript refuse l'assertion directe
   - Passer par unknown/any intermédiaire
   - ⚠️ TRÈS DANGEREUX, éviter absolument
*/

// 6. Const Assertion - Type littéral au lieu de général
const config1 = { apiUrl: "https://api.example.com" };
// Type: { apiUrl: string }

const config2 = { apiUrl: "https://api.example.com" } as const;
// Type: { readonly apiUrl: "https://api.example.com" }

/*
   POURQUOI as const ?
   - Obtenir des types LITTÉRAUX au lieu de types généraux
   - Rendre l'objet READONLY
   - Utile pour configurations constantes

   COMMENT ça marche ?
   as const transforme :
   - "hello" : string → "hello" : "hello"
   - [1, 2] : number[] → [1, 2] : readonly [1, 2]
   - { x: 1 } → { readonly x: 1 }
*/

const directions = ["north", "south", "east", "west"] as const;
// Type: readonly ["north", "south", "east", "west"]

type Direction = typeof directions[number];
// Type: "north" | "south" | "east" | "west"

/*
   💡 PATTERN PUISSANT :
   1. Définir un tableau const
   2. Extraire le type union depuis le tableau
   3. Source unique de vérité
*/

// 7. Non-null Assertion - Affirmer qu'une valeur n'est pas null
const canvas = document.getElementById("canvas")!;
// ! dit "je suis sûr que ce n'est pas null"

// Équivalent à :
const canvas2 = document.getElementById("canvas") as HTMLElement;

/*
   POURQUOI ! (non-null assertion) ?
   - Raccourci pour "pas null, pas undefined"
   - Utilisé quand vous SAVEZ que la valeur existe

   ⚠️ DANGER :
   Si la valeur est null → erreur runtime
   Préférez une vérification :
   const canvas = document.getElementById("canvas");
   if (canvas) {
     // Utilisez canvas en sécurité
   }
*/

/*
   ✅ BONNES PRATIQUES :
   1. Utilisez as Type quand vous en savez vraiment plus
   2. Préférez le type narrowing (if, typeof, instanceof)
   3. Validez les données d'API avec des bibliothèques
   4. as const pour configurations constantes
   5. Évitez ! sauf si vous êtes absolument sûr

   ❌ MAUVAISES PRATIQUES :
   1. as any pour contourner les erreurs
   2. Assertions sans vérifications
   3. Double assertions (as unknown as Type)
   4. ! sur des valeurs qui peuvent être null

   ⚠️ RÈGLE D'OR :
   "Les Type Assertions désactivent la sécurité de TypeScript.
   Utilisez-les avec précaution et seulement quand nécessaire."

   💡 ALTERNATIVES aux assertions :
   // ❌ Assertion
   const data = apiResponse as User;

   // ✅ Type Guard
   function isUser(value: unknown): value is User {
     return typeof value === "object" && value !== null && "id" in value;
   }
   if (isUser(apiResponse)) {
     // apiResponse est User ici
   }

   // ✅ Validation avec bibliothèque (zod)
   import { z } from "zod";
   const UserSchema = z.object({
     id: z.number(),
     name: z.string()
   });
   const user = UserSchema.parse(apiResponse); // Valide et type
*/
```

## 🎯 Exercices

Ouvrez le fichier [exercice.ts](./exercice.ts) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.ts](./correction.ts).
