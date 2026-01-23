# Séance 3 : Generics

## 📚 Théorie

### Introduction aux Generics - LE PROBLÈME

Les generics résolvent le problème de la DUPLICATION de code pour différents types.

```typescript
// ❌ PROBLÈME : Sans generics - DUPLICATION
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstBoolean(arr: boolean[]): boolean {
  return arr[0];
}

// On doit créer une fonction pour CHAQUE type... 😰

/*
   PROBLÈMES sans generics :
   - DUPLICATION de code (même logique, types différents)
   - NON MAINTENABLE (modifier la logique = modifier partout)
   - NON EXTENSIBLE (nouveau type = nouvelle fonction)
   - VERBEUX et répétitif
*/

// ❌ ALTERNATIVE : any (perte de type safety)
function getFirstAny(arr: any[]): any {
  return arr[0];
}

const result = getFirstAny([1, 2, 3]); // any 😰
// result.toUpperCase(); // Pas d'erreur TypeScript mais crash runtime !

/*
   PROBLÈMES avec any :
   - PERTE de type safety
   - Pas d'autocomplétion
   - Erreurs détectées au RUNTIME au lieu de compile-time
   - Défait l'intérêt de TypeScript
*/

// ✅ SOLUTION : Generics (type safety + réutilisabilité)
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = getFirst<number>([1, 2, 3]); // number ✅
const firstStr = getFirst<string>(["a", "b"]); // string ✅
const firstBool = getFirst<boolean>([true, false]); // boolean ✅

/*
   POURQUOI les generics ?
   - RÉUTILISER le même code pour DIFFÉRENTS types
   - MAINTENIR la type safety (pas de any)
   - UNE SEULE fonction pour TOUS les types
   - Autocomplétion et vérifications TypeScript

   COMMENT ça marche ?
   - <T> = paramètre de TYPE (comme un paramètre de fonction)
   - T est un PLACEHOLDER pour un type
   - TypeScript REMPLACE T par le type réel lors de l'appel
   - getFirst<number> → T devient number
   - getFirst<string> → T devient string

   QUAND utiliser les generics ?
   - Fonctions qui fonctionnent avec N'IMPORTE QUEL type
   - Structures de données (Array, Map, Set, Promise)
   - Fonctions utilitaires (map, filter, reduce)
   - Composants React réutilisables

   💡 ANALOGIE :
   Les generics sont comme des MOULES en cuisine :
   - Le moule (generic) définit la FORME
   - On peut l'utiliser avec différents ingrédients (types)
   - Chocolat, gelée, glace → même moule, résultats différents
*/

// Type inference automatique
const autoNum = getFirst([1, 2, 3]); // number (TypeScript infère automatiquement)
const autoStr = getFirst(["a", "b"]); // string
const autoMixed = getFirst([1, "a"]); // string | number

/*
   INFERENCE de type :
   - TypeScript peut DEVINER le type T automatiquement
   - Regarde le type des arguments passés
   - Pas besoin d'écrire <number> si évident du contexte
   - Plus concis, même sécurité
*/

firstNum.toFixed(2); // ✅ Méthodes de number disponibles
firstStr.toUpperCase(); // ✅ Méthodes de string disponibles
// firstNum.toUpperCase(); // ❌ Erreur : number n'a pas toUpperCase
```

### Generics avec Fonctions - EXEMPLES COMPLETS

```typescript
// Fonction avec un seul paramètre de type
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // number
const str = identity("hello"); // string

/*
   identity = fonction la plus simple avec generic
   - Retourne exactement ce qu'on lui passe
   - Préserve le type
   - Utile pour démonstration et certains patterns
*/

// Fonction avec PLUSIEURS paramètres de type
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const numberString = pair(42, "hello"); // [number, string]
const booleanNumber = pair(true, 10); // [boolean, number]

/*
   POURQUOI plusieurs paramètres de type ?
   - Gérer des types DIFFÉRENTS dans une même fonction
   - Créer des tuples, paires, relations entre types
   - Map, dictionnaires, cache (clé → valeur)

   CONVENTION de nommage :
   - T : Type (premier paramètre générique)
   - U : Second type
   - K : Key (clé)
   - V : Value (valeur)
   - E : Element
   - R : Return type

   Mais vous pouvez utiliser des noms descriptifs :
   - <TUser, TRole>
   - <InputType, OutputType>
*/

// Generic avec valeur par défaut
function wrap<T = string>(value: T): { data: T } {
  return { data: value };
}

const defaultWrap = wrap("hello"); // { data: string }
const numberWrap = wrap<number>(42); // { data: number }

/*
   Types par défaut :
   - <T = string> : si pas spécifié, T = string
   - Utile pour cas d'usage courant
   - Peut être overridé si besoin
*/

// Fonction générique avec logique conditionnelle
function wrapInArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

const arr1 = wrapInArray(42); // number[]
const arr2 = wrapInArray([1, 2, 3]); // number[]
const arr3 = wrapInArray("hello"); // string[]

/*
   POURQUOI ce pattern ?
   - Normaliser les entrées (valeur unique → array)
   - Accepter flexiblement single ou array
   - Retour cohérent (toujours array)

   QUAND l'utiliser ?
   - API qui acceptent single ou multiple items
   - Fonctions utilitaires
   - React hooks (useState, useEffect dependencies)
*/

// Arrow function générique (syntaxe TSX compatible)
const reverseArray = <T,>(arr: T[]): T[] => {
  return arr.reverse();
};

/*
   ⚠️ SYNTAXE IMPORTANTE en TSX (React) :
   - <T,> avec virgule pour éviter confusion avec JSX
   - <T> pourrait être interprété comme balise JSX
   - <T,> indique clairement : c'est un generic

   En .ts pur : <T> suffit
   En .tsx : <T,> recommandé
*/

// Multiple contraintes et valeur de retour inférée
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 25 });
// Type: { name: string } & { age: number }
// Équivalent à : { name: string; age: number }

/*
   POURQUOI T & U ?
   - Combiner deux objets en un seul type
   - Intersection de types
   - Fusion de propriétés

   extends object :
   - Contraindre T et U à être des objets
   - Empêche merge(42, "hello") ❌
   - Garantit que spread operator fonctionne
*/
```

### Generics avec Interfaces - STRUCTURES RÉUTILISABLES

```typescript
// Interface générique simple
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
const userBox: Box<{ name: string }> = { value: { name: "Alice" } };

/*
   POURQUOI Box<T> ?
   - Wrapper générique pour N'IMPORTE QUELLE valeur
   - Pattern "Container" ou "Wrapper"
   - Ajouter métadonnées autour d'une valeur

   QUAND l'utiliser ?
   - Response wrappers (API)
   - State containers
   - Observable, Promise-like structures
*/

// Interface générique avec méthodes
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
  map<U>(fn: (value: T) => U): Container<U>;
}

/*
   POURQUOI map<U> ?
   - Transformer le contenu SANS changer le container
   - Box<number> → Box<string>
   - Pattern fonctionnel (Functor)

   COMMENT ça marche ?
   - fn prend T et retourne U
   - map retourne Container<U>
   - Nouveau type de container

   💡 EXEMPLE concret :
*/

class SimpleContainer<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }

  map<U>(fn: (value: T) => U): Container<U> {
    return new SimpleContainer(fn(this.value));
  }
}

const numContainer = new SimpleContainer(42);
const strContainer = numContainer.map(n => `Number: ${n}`);
// SimpleContainer<number> → SimpleContainer<string>

/*
   Ce pattern permet :
   - Transformation de type
   - Chaînage d'opérations
   - Composition fonctionnelle
*/

// Interface avec PLUSIEURS paramètres génériques
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const stringNumberPair: KeyValuePair<string, number> = {
  key: "age",
  value: 25
};

const numberBoolPair: KeyValuePair<number, boolean> = {
  key: 1,
  value: true
};

/*
   POURQUOI <K, V> ?
   - Représenter des ASSOCIATIONS clé-valeur
   - Map entries, dictionnaires, cache
   - Clé et valeur peuvent être de types différents

   QUAND l'utiliser ?
   - Map, dictionnaires
   - Configuration objects
   - API responses avec metadata
*/

// Interface générique étendue
interface TimestampedData<T> {
  data: T;
  timestamp: Date;
  version: number;
}

interface APIResponse<T> extends TimestampedData<T> {
  status: "success" | "error";
  message?: string;
}

const userResponse: APIResponse<{ name: string; email: string }> = {
  data: { name: "Alice", email: "alice@example.com" },
  timestamp: new Date(),
  version: 1,
  status: "success"
};

/*
   POURQUOI étendre des interfaces génériques ?
   - COMPOSER des types complexes
   - Réutiliser des patterns communs (Timestamped, Versioned)
   - Ajouter des métadonnées spécifiques

   PATTERN API Response :
   - TimestampedData : données + metadata temporelle
   - APIResponse : ajoute status, message
   - Réutilisable pour TOUT type de données
*/

// Interface avec index signature générique
interface Dictionary<T> {
  [key: string]: T;
}

const numberDict: Dictionary<number> = {
  one: 1,
  two: 2,
  three: 3
};

const userDict: Dictionary<{ name: string; age: number }> = {
  user1: { name: "Alice", age: 25 },
  user2: { name: "Bob", age: 30 }
};

/*
   Dictionary<T> = Record<string, T> (built-in)
   - N'importe quelle clé string
   - Toutes les valeurs du même type T

   QUAND l'utiliser ?
   - Objets dynamiques
   - Lookups, caches
   - Traductions (i18n)
*/
```

### Generics avec Classes - ENCAPSULATION RÉUTILISABLE

```typescript
// Classe générique simple
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // 3

const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");

/*
   POURQUOI Stack<T> ?
   - Structure de données RÉUTILISABLE
   - Type safety pour les éléments
   - Une seule implémentation pour tous types

   Stack (pile LIFO - Last In First Out) :
   - push : ajouter en haut
   - pop : retirer du haut
   - peek : voir le haut sans retirer

   QUAND utiliser des classes génériques ?
   - Collections (Stack, Queue, LinkedList)
   - Gestionnaires de state
   - Services avec types de données variables
*/

// Classe avec contraintes
class Repository<T extends { id: string | number }> {
  private items: Map<string | number, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: string | number): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: string | number): boolean {
    return this.items.delete(id);
  }

  update(id: string | number, updates: Partial<T>): T | undefined {
    const item = this.items.get(id);
    if (item) {
      const updated = { ...item, ...updates };
      this.items.set(id, updated);
      return updated;
    }
    return undefined;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const userRepo = new Repository<User>();
userRepo.add({ id: "1", name: "Alice", email: "alice@example.com" });
const user = userRepo.get("1");

const productRepo = new Repository<Product>();
productRepo.add({ id: 1, name: "Laptop", price: 999 });

/*
   POURQUOI Repository<T> ?
   - Pattern REPOSITORY (abstraction de stockage)
   - CRUD operations type-safe
   - Une classe pour gérer différents types d'entités

   T extends { id: string | number } :
   - CONTRAINTE : T doit avoir une propriété id
   - Garantit qu'on peut toujours accéder à item.id
   - Sans ça, item.id causerait une erreur

   Partial<T> :
   - Pour update : permet de ne mettre à jour que certains champs
   - { name: "Bob" } au lieu de devoir passer tout l'objet

   QUAND l'utiliser ?
   - Gestion d'entités (Users, Products, Articles)
   - Couche d'accès aux données
   - State management
*/

// Classe avec méthodes génériques
class Utils {
  static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  static pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
    return arr.map(item => item[key]);
  }

  static groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
    return arr.reduce((acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  }
}

const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "admin" }
];

const names = Utils.pluck(users, "name"); // string[]
const roles = Utils.pluck(users, "role"); // string[]
const grouped = Utils.groupBy(users, "role");
// { admin: [...], user: [...] }

/*
   POURQUOI keyof T ?
   - CONTRAINDRE K à être une CLÉ de T
   - pluck(users, "name") ✅
   - pluck(users, "invalid") ❌
   - Type safety pour l'accès aux propriétés

   T[K] :
   - Type de la propriété K dans T
   - users: { name: string, ... }[]
   - pluck(users, "name") → string[]
   - Inference automatique du type de retour

   QUAND utiliser ces utilitaires ?
   - Manipulation de tableaux d'objets
   - Extraction de propriétés
   - Groupement de données
*/
```

### Contraintes (Constraints) - LIMITER LES TYPES

Les contraintes permettent de RESTREINDRE quels types peuvent être utilisés comme generics.

```typescript
// Contrainte simple avec extends
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // ✅ string a length
logLength([1, 2, 3]); // ✅ array a length
logLength({ length: 10, value: "test" }); // ✅ objet avec length
// logLength(42); // ❌ number n'a pas length
// logLength(true); // ❌ boolean n'a pas length

/*
   POURQUOI extends ?
   - GARANTIR que T a certaines propriétés
   - Accéder en toute sécurité à item.length
   - Sans extends, TypeScript ne sait pas si T a length

   COMMENT ça marche ?
   - extends = "T doit satisfaire le type HasLength"
   - T peut être string, array, ou tout objet avec length
   - TypeScript vérifie à la compilation

   QUAND utiliser extends ?
   - Accéder à des propriétés spécifiques
   - Garantir des comportements (iterable, comparable)
   - Contraindre à des interfaces
*/

// Contrainte avec keyof - CLÉS D'OBJET
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25, email: "alice@example.com" };

const name = getProperty(user, "name"); // string
const age = getProperty(user, "age"); // number
// const invalid = getProperty(user, "invalid"); // ❌ Erreur

/*
   POURQUOI K extends keyof T ?
   - GARANTIR que key existe dans obj
   - Type safety : pas d'accès à des propriétés inexistantes
   - Autocomplétion des clés disponibles

   keyof T :
   - Crée un type UNION de toutes les clés de T
   - keyof { name: string, age: number } = "name" | "age"
   - K doit être l'une de ces clés

   T[K] :
   - Type INDEXED ACCESS
   - Récupère le type de la propriété K dans T
   - user["name"] → string
   - user["age"] → number

   QUAND l'utiliser ?
   - Getters dynamiques
   - Fonctions utilitaires d'accès aux objets
   - Property pickers
*/

// Contrainte multiple
function copyProperties<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = source[key];
  });
  return result;
}

const fullUser = { id: 1, name: "Alice", email: "alice@example.com", age: 25 };
const partialUser = copyProperties(fullUser, ["name", "email"]);
// Type: { name: string; email: string }

/*
   Pick<T, K> :
   - Utility type built-in TypeScript
   - Crée un type avec SEULEMENT les propriétés K de T
   - Pick<User, "name" | "email"> = { name: string; email: string }

   POURQUOI ce pattern ?
   - Sélectionner un SUBSET de propriétés
   - Créer des vues partielles d'objets
   - DTO (Data Transfer Objects)

   QUAND l'utiliser ?
   - API responses (ne retourner que certains champs)
   - Formulaires (ne modifier que certains champs)
   - Projections de données
*/

// Contrainte à un ensemble de valeurs
function processStatus<T extends "pending" | "success" | "error">(
  status: T
): string {
  switch (status) {
    case "pending":
      return "En cours...";
    case "success":
      return "Terminé !";
    case "error":
      return "Erreur !";
  }
}

processStatus("pending"); // ✅
processStatus("success"); // ✅
// processStatus("invalid"); // ❌

/*
   POURQUOI contraindre à des littéraux ?
   - LIMITER les valeurs possibles
   - Type safety sur les enums-like types
   - Switch exhaustive checking
*/

// Contrainte avec type union
type Primitive = string | number | boolean | null | undefined;

function isPrimitive<T>(value: T): value is T & Primitive {
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean" || value === null || value === undefined;
}

/*
   Type guards avec generics :
   - Combiner generics et type narrowing
   - value is T : predicate de type
   - Permet à TypeScript de RAFFINER le type
*/

// Contrainte récursive
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

function findInTree<T>(node: TreeNode<T>, predicate: (value: T) => boolean): T | null {
  if (predicate(node.value)) {
    return node.value;
  }

  if (node.children) {
    for (const child of node.children) {
      const result = findInTree(child, predicate);
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
}

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2 },
    { value: 3, children: [{ value: 4 }] }
  ]
};

const found = findInTree(tree, v => v === 4); // number | null

/*
   Types récursifs avec generics :
   - TreeNode<T> se référence lui-même
   - children?: TreeNode<T>[]
   - Structures arborescentes type-safe

   QUAND l'utiliser ?
   - Arbres (DOM, AST, file system)
   - Structures récursives
   - Composants imbriqués
*/
```

### Utility Types avec Generics - TYPES AVANCÉS

```typescript
// Créer nos propres utility types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type MutableUser = {
  name: string;
  age: number;
};

type ReadonlyUser = Readonly<MutableUser>;
// { readonly name: string; readonly age: number }

/*
   Mapped Types :
   - [P in keyof T] : pour CHAQUE propriété P dans T
   - T[P] : type de la propriété P
   - readonly : modificateur appliqué à chaque propriété

   POURQUOI créer des utility types ?
   - Transformer des types existants
   - Réutiliser des patterns de transformation
   - Éviter la duplication de types
*/

// DeepPartial - rendre TOUT optionnel récursivement
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      user: string;
      password: string;
    };
  };
  api: {
    url: string;
    timeout: number;
  };
}

const partialConfig: DeepPartial<Config> = {
  database: {
    host: "localhost"
    // port, credentials optionnels !
  }
  // api optionnel !
};

/*
   DeepPartial récursif :
   - T[P] extends object ? ... : ...
   - Si la propriété est un objet, applique DeepPartial récursivement
   - Sinon, garde le type tel quel
   - Rend TOUTES les propriétés optionnelles, même imbriquées

   QUAND l'utiliser ?
   - Configuration par défaut avec overrides
   - Mise à jour partielle d'objets complexes
   - Patches, deltas
*/

// Exclude et Extract
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;

type AllTypes = "a" | "b" | "c" | "d";
type Excluded = Exclude<AllTypes, "b" | "c">; // "a" | "d"
type Extracted = Extract<AllTypes, "b" | "c">; // "b" | "c"

/*
   Conditional Types :
   - T extends U ? X : Y
   - Si T est assignable à U, alors X, sinon Y

   Exclude :
   - RETIRER des types d'une union
   - Exclude<"a"|"b"|"c", "b"> = "a"|"c"

   Extract :
   - GARDER seulement certains types
   - Extract<"a"|"b"|"c", "b"|"c"> = "b"|"c"

   QUAND l'utiliser ?
   - Filtrer des unions
   - Type transformations
   - Type manipulation avancée
*/

// ReturnType - extraire le type de retour
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Alice", email: "alice@example.com" };
}

type UserReturnType = ReturnType<typeof getUser>;
// { id: number; name: string; email: string }

/*
   infer R :
   - MOT-CLÉ pour INFÉRER un type
   - Dans un type conditionnel
   - R est le type de retour inféré

   POURQUOI ReturnType ?
   - Extraire le type sans le définir manuellement
   - DRY (Don't Repeat Yourself)
   - Synchronisation automatique

   QUAND l'utiliser ?
   - Types dérivés de fonctions existantes
   - Éviter duplication de types
   - Type-driven development
*/

// Awaited - extraire le type d'une Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;

type PromiseNumber = Promise<number>;
type UnwrappedNumber = Awaited<PromiseNumber>; // number

async function fetchUser() {
  return { id: 1, name: "Alice" };
}

type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string }

/*
   Awaited<T> :
   - UNWRAP une Promise
   - Promise<number> → number
   - Promise<Promise<string>> → string (récursif)

   Combiner ReturnType + Awaited :
   - Obtenir le type de données retourné par une fonction async
   - Sans définir manuellement le type
*/
```

### Patterns Avancés - TECHNIQUES PRATIQUES

```typescript
// Generic Factory Pattern
interface Product {
  id: number;
  name: string;
}

interface User {
  id: string;
  email: string;
}

type EntityFactory<T> = {
  create(data: Omit<T, "id">): T;
  createMany(data: Omit<T, "id">[]): T[];
};

function createFactory<T extends { id: string | number }>(
  idGenerator: () => string | number
): EntityFactory<T> {
  return {
    create(data: Omit<T, "id">): T {
      return { id: idGenerator(), ...data } as T;
    },
    createMany(data: Omit<T, "id">[]): T[] {
      return data.map(item => this.create(item));
    }
  };
}

let productId = 0;
const productFactory = createFactory<Product>(() => ++productId);

const product = productFactory.create({ name: "Laptop" });
// { id: 1, name: "Laptop" }

/*
   Factory Pattern avec generics :
   - Créer des objets avec ID auto-généré
   - Type-safe factory pour différents types
   - Omit<T, "id"> : T sans la propriété id

   QUAND l'utiliser ?
   - Génération d'entités avec IDs
   - Test data factories
   - Object builders
*/

// Builder Pattern avec generics
class QueryBuilder<T> {
  private filters: Array<(item: T) => boolean> = [];
  private sortFn?: (a: T, b: T) => number;
  private limitValue?: number;

  where(predicate: (item: T) => boolean): this {
    this.filters.push(predicate);
    return this;
  }

  sort(compareFn: (a: T, b: T) => number): this {
    this.sortFn = compareFn;
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  execute(data: T[]): T[] {
    let result = [...data];

    // Apply filters
    for (const filter of this.filters) {
      result = result.filter(filter);
    }

    // Apply sort
    if (this.sortFn) {
      result = result.sort(this.sortFn);
    }

    // Apply limit
    if (this.limitValue !== undefined) {
      result = result.slice(0, this.limitValue);
    }

    return result;
  }
}

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 }
];

const result = new QueryBuilder<{ name: string; age: number }>()
  .where(u => u.age >= 25)
  .sort((a, b) => a.age - b.age)
  .limit(2)
  .execute(users);

/*
   Builder Pattern :
   - Chaînage de méthodes (fluent API)
   - Construire des requêtes/objets complexes
   - return this pour chaînage

   POURQUOI ce pattern ?
   - Lisibilité (API fluide)
   - Composition d'opérations
   - Type safety à chaque étape

   QUAND l'utiliser ?
   - Query builders (ORM, filtres)
   - Configuration builders
   - Validation chains
*/

// Event Emitter générique
class EventEmitter<TEvents extends Record<string, any>> {
  private listeners: {
    [K in keyof TEvents]?: Array<(data: TEvents[K]) => void>;
  } = {};

  on<K extends keyof TEvents>(event: K, callback: (data: TEvents[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof TEvents>(event: K, data: TEvents[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

// Définir les types d'événements
type AppEvents = {
  userLoggedIn: { userId: string; timestamp: Date };
  userLoggedOut: { userId: string };
  dataUpdated: { entity: string; id: number };
};

const emitter = new EventEmitter<AppEvents>();

emitter.on("userLoggedIn", (data) => {
  // data est typé : { userId: string; timestamp: Date }
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.emit("userLoggedIn", {
  userId: "123",
  timestamp: new Date()
});

// emitter.emit("userLoggedIn", { invalid: true }); // ❌ Erreur

/*
   Event Emitter type-safe :
   - TEvents = Record des événements et leurs données
   - on/emit type-safe
   - Autocomplétion des noms d'événements
   - Type checking des données

   TEvents[K] :
   - Indexed access sur le type d'événements
   - Récupère le type de données pour l'événement K

   QUAND l'utiliser ?
   - Event systems
   - PubSub patterns
   - Communication entre composants
*/

// Generic Cache avec TTL
class Cache<K, V> {
  private store = new Map<K, { value: V; expiry: number }>();

  set(key: K, value: V, ttlMs: number = 60000): void {
    this.store.set(key, {
      value,
      expiry: Date.now() + ttlMs
    });
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.store.clear();
  }
}

const userCache = new Cache<string, { name: string; email: string }>();
userCache.set("user1", { name: "Alice", email: "alice@example.com" }, 5000);

/*
   Cache générique :
   - K = type de clé (string, number, etc.)
   - V = type de valeur
   - TTL (Time To Live) en millisecondes
   - Expiration automatique

   QUAND l'utiliser ?
   - Cache de données API
   - Memoization avec expiration
   - Session storage
*/
```

### Bonnes Pratiques - CONVENTIONS ET ASTUCES

```typescript
/*
   ✅ BONNES PRATIQUES :

   1. NOMMAGE des paramètres de type :
      - T : Type générique principal
      - K : Key (clé)
      - V : Value (valeur)
      - E : Element
      - P : Property
      - R : Return type
      - Ou noms descriptifs : <TUser, TConfig>

   2. CONTRAINTES :
      - Toujours contraindre si vous accédez à des propriétés
      - <T extends HasId> si vous utilisez item.id
      - <K extends keyof T> pour l'accès dynamique

   3. INFERENCE :
      - Laissez TypeScript inférer quand possible
      - getFirst([1, 2, 3]) au lieu de getFirst<number>([1, 2, 3])
      - Plus concis, même sécurité

   4. VALEURS PAR DÉFAUT :
      - <T = string> pour types par défaut
      - Évite de spécifier pour le cas courant

   5. ÉVITEZ any :
      - Ne jamais utiliser <T = any>
      - Utilisez unknown si vraiment nécessaire
      - Contraignez autant que possible

   ⚠️ PIÈGES COURANTS :

   1. Oublier extends pour contraintes :
      ❌ function len<T>(item: T) { return item.length; }
      ✅ function len<T extends HasLength>(item: T) { return item.length; }

   2. Sur-généraliser :
      - Si vous n'avez besoin que de string[], n'utilisez pas T[]
      - Generics utiles seulement si réutilisable pour PLUSIEURS types

   3. Complexité excessive :
      - Ne pas créer des types génériques trop complexes
      - Préférez la lisibilité à la "cleverness"

   💡 QUAND UTILISER LES GENERICS :
   - ✅ Collections et structures de données
   - ✅ Fonctions utilitaires réutilisables
   - ✅ API wrappers et clients
   - ✅ React components réutilisables
   - ✅ Patterns (Factory, Builder, Repository)

   💡 QUAND NE PAS UTILISER :
   - ❌ Fonction utilisée avec un seul type
   - ❌ "Au cas où" sans besoin réel
   - ❌ Complexité qui nuit à la lisibilité
*/
```

## 🎯 Exercices

Voir [exercice.ts](./exercice.ts) et [correction.ts](./correction.ts).
