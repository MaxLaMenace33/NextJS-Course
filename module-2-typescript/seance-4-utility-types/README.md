# Séance 4 : Utility Types et Tips Avancés

## 📚 Théorie

### Introduction aux Utility Types - TRANSFORMER DES TYPES

Les Utility Types sont des types GÉNÉRIQUES fournis par TypeScript pour transformer des types existants.

```typescript
/*
   POURQUOI les Utility Types ?
   - ÉVITER la duplication de types
   - TRANSFORMER des types existants facilement
   - RÉUTILISER des patterns de transformation communs
   - Type manipulation sans réécrire tout

   COMMENT ça marche ?
   - Ce sont des types génériques built-in TypeScript
   - Utilisent mapped types, conditional types, etc.
   - Prennent un type en entrée et retournent un type transformé

   QUAND les utiliser ?
   - Créer des variations d'un type existant
   - Forms (Partial pour updates), DTOs
   - API responses (Pick pour projections)
   - State management (Readonly pour immutabilité)

   💡 ANALOGIE :
   Les Utility Types sont comme des FILTRES PHOTO :
   - Photo originale = Type de base
   - Filtre noir et blanc, sépia, flou = Utility Types
   - Même photo, différentes transformations
*/

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
}

// Sans utility types (duplication)
interface UserUpdate {
  id?: string;
  name?: string;
  email?: string;
  age?: number;
  password?: string;
}

// Avec Partial (évite duplication)
type UserUpdate = Partial<User>; // ✅ Plus simple !

/*
   AVANTAGE :
   - Si User change, UserUpdate change automatiquement
   - DRY (Don't Repeat Yourself)
   - Synchronisation automatique
*/
```

### Transformation Types - MODIFIER LES PROPRIÉTÉS

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// ============================================
// Partial<T> : Rendre TOUTES propriétés optionnelles
// ============================================

type PartialUser = Partial<User>;
/*
  Type résultant :
  {
    id?: string;
    name?: string;
    email?: string;
    age?: number;
  }
*/

const updateUser: PartialUser = { name: "Alice" }; // ✅ OK
const updateEmail: PartialUser = { email: "alice@example.com" }; // ✅ OK
const emptyUpdate: PartialUser = {}; // ✅ OK aussi

/*
   POURQUOI Partial<T> ?
   - Pour les MISES À JOUR partielles
   - Ne modifier que certains champs
   - Fonctions update qui n'exigent pas tous les champs

   COMMENT c'est implémenté ?
   type Partial<T> = {
     [P in keyof T]?: T[P];
   };

   - [P in keyof T] : pour chaque propriété P dans T
   - ?: rend la propriété optionnelle
   - T[P] : conserve le type original

   QUAND l'utiliser ?
   - Formulaires de mise à jour (update forms)
   - PATCH requests API
   - Partial state updates
   - Fonctions qui acceptent des updates partiels

   💡 EXEMPLE pratique :
*/

function updateUserData(id: string, updates: Partial<User>): User {
  const currentUser = getUserById(id); // Fonction fictive
  return { ...currentUser, ...updates };
}

updateUserData("1", { name: "Bob" }); // ✅ Seulement le nom
updateUserData("1", { name: "Alice", age: 30 }); // ✅ Nom et âge

// ============================================
// Required<T> : Rendre TOUTES propriétés obligatoires
// ============================================

interface PartialConfig {
  host?: string;
  port?: number;
  timeout?: number;
}

type CompleteConfig = Required<PartialConfig>;
/*
  Type résultant :
  {
    host: string;
    port: number;
    timeout: number;
  }
*/

const config: CompleteConfig = {
  host: "localhost",
  port: 3000,
  timeout: 5000
}; // ✅ Tous les champs requis

// const invalidConfig: CompleteConfig = { host: "localhost" }; // ❌ Manque port, timeout

/*
   POURQUOI Required<T> ?
   - GARANTIR que toutes les propriétés sont présentes
   - Partir d'un type avec propriétés optionnelles
   - Créer une version "complete" d'un type

   COMMENT c'est implémenté ?
   type Required<T> = {
     [P in keyof T]-?: T[P];
   };

   - -? : retire l'optionalité (inverse de ?)

   QUAND l'utiliser ?
   - Valider la complétude de configuration
   - Transformer des inputs partiels en objets complets
   - Après validation de formulaires

   💡 PATTERN :
*/

function validateAndComplete(partial: PartialConfig): CompleteConfig | null {
  if (partial.host && partial.port && partial.timeout) {
    return partial as CompleteConfig;
  }
  return null;
}

// ============================================
// Readonly<T> : Rendre TOUTES propriétés readonly
// ============================================

type ReadonlyUser = Readonly<User>;
/*
  Type résultant :
  {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly age: number;
  }
*/

const user: ReadonlyUser = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  age: 25
};

// user.name = "Bob"; // ❌ Erreur : propriété readonly

/*
   POURQUOI Readonly<T> ?
   - IMMUTABILITÉ
   - Empêcher les modifications accidentelles
   - Garantir qu'un objet ne change pas

   COMMENT c'est implémenté ?
   type Readonly<T> = {
     readonly [P in keyof T]: T[P];
   };

   QUAND l'utiliser ?
   - State immutable (Redux, React Context)
   - Paramètres de fonction qu'on ne doit pas modifier
   - Constantes et configuration
   - Programmation fonctionnelle

   💡 IMPORTANT :
   - Readonly est SHALLOW (superficiel)
   - Objets imbriqués restent mutables
*/

interface Post {
  id: string;
  title: string;
  author: {
    name: string;
  };
}

const readonlyPost: Readonly<Post> = {
  id: "1",
  title: "Hello",
  author: { name: "Alice" }
};

// readonlyPost.title = "World"; // ❌ Erreur
readonlyPost.author.name = "Bob"; // ✅ OK ! (nested object pas readonly)

/*
   Pour un readonly PROFOND, utilisez DeepReadonly :
*/

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const deepReadonlyPost: DeepReadonly<Post> = {
  id: "1",
  title: "Hello",
  author: { name: "Alice" }
};

// deepReadonlyPost.author.name = "Bob"; // ❌ Erreur maintenant !

// ============================================
// Record<K, T> : Créer un objet avec clés typées
// ============================================

type UserRoles = Record<string, "admin" | "user" | "guest">;

const roles: UserRoles = {
  alice: "admin",
  bob: "user",
  charlie: "guest"
};

// roles.dave = "superadmin"; // ❌ Erreur : pas dans "admin" | "user" | "guest"

/*
   POURQUOI Record<K, T> ?
   - Créer des DICTIONNAIRES typés
   - Toutes les clés ont le MÊME type de valeur
   - Alternative à interface avec index signature

   COMMENT c'est implémenté ?
   type Record<K extends string | number | symbol, T> = {
     [P in K]: T;
   };

   - K : type des clés (string, number, literal unions)
   - T : type des valeurs

   QUAND l'utiliser ?
   - Mappings clé-valeur
   - Lookups, dictionnaires
   - Enum-like structures
   - Traductions (i18n)

   💡 EXEMPLES pratiques :
*/

// Clés littérales
type StatusMessages = Record<"success" | "error" | "pending", string>;

const messages: StatusMessages = {
  success: "Opération réussie",
  error: "Une erreur est survenue",
  pending: "En cours..."
};

// Clés numériques
type DaySchedule = Record<1 | 2 | 3 | 4 | 5, string[]>;

const schedule: DaySchedule = {
  1: ["Meeting 9am", "Lunch 12pm"],
  2: ["Standup 10am"],
  3: ["Review 2pm"],
  4: ["Planning 11am"],
  5: ["Retro 3pm"]
};

// Configuration par environnement
type Environment = "development" | "staging" | "production";
type EnvConfig = Record<Environment, { apiUrl: string; debug: boolean }>;

const config: EnvConfig = {
  development: { apiUrl: "http://localhost:3000", debug: true },
  staging: { apiUrl: "https://staging.api.com", debug: true },
  production: { apiUrl: "https://api.com", debug: false }
};
```

### Selection Types - CHOISIR OU EXCLURE

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Pick<T, K> : SÉLECTIONNER certaines propriétés
// ============================================

type UserPreview = Pick<User, "id" | "name">;
/*
  Type résultant :
  {
    id: string;
    name: string;
  }
*/

const preview: UserPreview = { id: "1", name: "Alice" };

type UserProfile = Pick<User, "id" | "name" | "email" | "age">;
/*
  {
    id: string;
    name: string;
    email: string;
    age: number;
  }
*/

/*
   POURQUOI Pick<T, K> ?
   - CRÉER une vue PARTIELLE d'un type
   - Ne garder que certaines propriétés
   - DTO (Data Transfer Objects)

   COMMENT c'est implémenté ?
   type Pick<T, K extends keyof T> = {
     [P in K]: T[P];
   };

   - K extends keyof T : K doit être des clés de T
   - [P in K] : pour chaque propriété dans K
   - T[P] : type de cette propriété dans T

   QUAND l'utiliser ?
   - API responses (ne retourner que certains champs)
   - Formulaires (afficher seulement certains champs)
   - Projections de données
   - Éviter d'exposer des données sensibles (password)

   💡 EXEMPLE pratique :
*/

// API endpoint qui ne retourne pas le password
function getUserPublic(id: string): Pick<User, "id" | "name" | "email"> {
  const user = getUserById(id); // Retourne User complet
  return {
    id: user.id,
    name: user.name,
    email: user.email
    // password exclu !
  };
}

// ============================================
// Omit<T, K> : EXCLURE certaines propriétés
// ============================================

type UserWithoutPassword = Omit<User, "password">;
/*
  Type résultant : User sans password
  {
    id: string;
    name: string;
    email: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
  }
*/

type UserWithoutTimestamps = Omit<User, "createdAt" | "updatedAt">;
/*
  {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
  }
*/

/*
   POURQUOI Omit<T, K> ?
   - RETIRER des propriétés non désirées
   - Inverse de Pick
   - Souvent plus simple que Pick quand peu de champs à exclure

   COMMENT c'est implémenté ?
   type Omit<T, K extends string | number | symbol> = {
     [P in Exclude<keyof T, K>]: T[P];
   };

   - Utilise Exclude pour retirer K des clés de T
   - Puis crée un type avec les clés restantes

   QUAND l'utiliser ?
   - Retirer des champs sensibles (password, tokens)
   - Retirer des métadonnées (createdAt, updatedAt)
   - Création d'objets (sans id qui sera auto-généré)

   💡 PATTERN CREATE DTO :
*/

// Pour créer un user, on n'a pas besoin de id, createdAt, updatedAt
type CreateUserDTO = Omit<User, "id" | "createdAt" | "updatedAt">;

function createUser(data: CreateUserDTO): User {
  return {
    id: generateId(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

createUser({
  name: "Alice",
  email: "alice@example.com",
  age: 25,
  password: "hashed_password"
});

/*
   Pick vs Omit - QUAND UTILISER QUOI ?

   ✅ Utilisez Pick quand :
   - Vous voulez SEULEMENT quelques propriétés
   - Liste de propriétés désirées est COURTE
   - Exemple : Pick<User, "id" | "name">

   ✅ Utilisez Omit quand :
   - Vous voulez PRESQUE TOUT sauf quelques propriétés
   - Liste de propriétés à exclure est COURTE
   - Exemple : Omit<User, "password">

   💡 RÈGLE :
   - Peu de propriétés voulues → Pick
   - Peu de propriétés à exclure → Omit
*/
```

### Union/Intersection Manipulation - FILTRER DES TYPES

```typescript
// ============================================
// Exclude<T, U> : RETIRER des types d'une union
// ============================================

type AllStatus = "pending" | "success" | "error" | "cancelled";
type ActiveStatus = Exclude<AllStatus, "cancelled">;
// "pending" | "success" | "error"

type Primitive = string | number | boolean | null | undefined;
type NonNullablePrimitive = Exclude<Primitive, null | undefined>;
// string | number | boolean

/*
   POURQUOI Exclude<T, U> ?
   - FILTRER des types d'une union
   - Retirer des types non désirés
   - Créer des sous-ensembles de types

   COMMENT c'est implémenté ?
   type Exclude<T, U> = T extends U ? never : T;

   - Distributive conditional type
   - Pour chaque type dans T, si T extends U → never, sinon → T
   - never est retiré des unions

   QUAND l'utiliser ?
   - Retirer des valeurs d'une union
   - Filtrer des types
   - Créer des variations de types
*/

// ============================================
// Extract<T, U> : GARDER seulement certains types
// ============================================

type MixedValues = string | number | boolean | null;
type StringOrNumber = Extract<MixedValues, string | number>;
// string | number

type EventType = "click" | "scroll" | "keypress" | "mousemove";
type MouseEvents = Extract<EventType, "click" | "mousemove">;
// "click" | "mousemove"

/*
   POURQUOI Extract<T, U> ?
   - SÉLECTIONNER des types d'une union
   - Inverse de Exclude
   - Filtrer pour garder seulement certains types

   COMMENT c'est implémenté ?
   type Extract<T, U> = T extends U ? T : never;

   - Inverse de Exclude
   - Garde T si T extends U

   QUAND l'utiliser ?
   - Sélectionner un sous-ensemble de types
   - Filtrer des unions
*/

// ============================================
// NonNullable<T> : RETIRER null et undefined
// ============================================

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

type MaybeUser = User | null | undefined;
type DefiniteUser = NonNullable<MaybeUser>;
// User

/*
   POURQUOI NonNullable<T> ?
   - GARANTIR qu'une valeur n'est ni null ni undefined
   - Type safety après validation
   - Retirer les cas null/undefined

   COMMENT c'est implémenté ?
   type NonNullable<T> = T extends null | undefined ? never : T;

   - Équivalent à Exclude<T, null | undefined>

   QUAND l'utiliser ?
   - Après vérifications null checks
   - Type narrowing
   - API qui peuvent retourner null
*/

function processUser(user: User | null): void {
  if (user !== null) {
    // user est maintenant NonNullable<User | null> = User
    console.log(user.name);
  }
}
```

### Function Types - EXTRAIRE DES TYPES DE FONCTIONS

```typescript
// ============================================
// Parameters<T> : EXTRAIRE les paramètres d'une fonction
// ============================================

function createUser(name: string, age: number, email: string): User {
  return { id: generateId(), name, age, email } as User;
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]

// Utilisation
function callCreateUser(params: CreateUserParams): User {
  return createUser(...params);
}

/*
   POURQUOI Parameters<T> ?
   - EXTRAIRE les types de paramètres d'une fonction
   - Réutiliser la signature sans duplication
   - Type-safe function wrappers

   COMMENT c'est implémenté ?
   type Parameters<T extends (...args: any) => any> =
     T extends (...args: infer P) => any ? P : never;

   - infer P : infère le type des paramètres
   - Retourne un tuple des types de paramètres

   QUAND l'utiliser ?
   - Wrappers de fonctions
   - Currying
   - Function composition
   - Éviter duplication de types
*/

// ============================================
// ReturnType<T> : EXTRAIRE le type de retour
// ============================================

function getUser(id: string) {
  return {
    id,
    name: "Alice",
    email: "alice@example.com"
  };
}

type UserType = ReturnType<typeof getUser>;
// { id: string; name: string; email: string }

/*
   POURQUOI ReturnType<T> ?
   - EXTRAIRE le type de retour d'une fonction
   - Éviter de définir le type manuellement
   - Synchronisation automatique

   COMMENT c'est implémenté ?
   type ReturnType<T extends (...args: any) => any> =
     T extends (...args: any) => infer R ? R : any;

   - infer R : infère le type de retour

   QUAND l'utiliser ?
   - Types dérivés de fonctions
   - Éviter duplication
   - Type-driven development
*/

// Exemple pratique combiné
async function fetchUsers() {
  const response = await fetch("/api/users");
  return response.json() as User[];
}

type FetchUsersReturn = ReturnType<typeof fetchUsers>;
// Promise<User[]>

type UnwrappedUsers = Awaited<FetchUsersReturn>;
// User[]

// ============================================
// ConstructorParameters<T> : Paramètres de constructeur
// ============================================

class Point {
  constructor(public x: number, public y: number) {}
}

type PointParams = ConstructorParameters<typeof Point>;
// [number, number]

function createPoint(params: PointParams): Point {
  return new Point(...params);
}

/*
   POURQUOI ConstructorParameters<T> ?
   - Extraire les types de paramètres d'un constructeur
   - Factory patterns
   - Type-safe instantiation helpers
*/

// ============================================
// InstanceType<T> : Type d'instance d'une classe
// ============================================

type PointInstance = InstanceType<typeof Point>;
// Point

function processPoint(point: PointInstance): void {
  console.log(point.x, point.y);
}

/*
   POURQUOI InstanceType<T> ?
   - Obtenir le type d'instance d'une classe
   - Utile quand on a seulement accès au constructeur
*/
```

### Promise Types - TRAVAILLER AVEC L'ASYNCHRONE

```typescript
// ============================================
// Awaited<T> : UNWRAP Promise (extraire le type)
// ============================================

type PromiseString = Promise<string>;
type UnwrappedString = Awaited<PromiseString>;
// string

type NestedPromise = Promise<Promise<number>>;
type UnwrappedNumber = Awaited<NestedPromise>;
// number (unwrap récursif)

/*
   POURQUOI Awaited<T> ?
   - EXTRAIRE le type d'une Promise
   - Unwrap récursif (Promise<Promise<T>> → T)
   - Type des valeurs après await

   COMMENT c'est implémenté ?
   type Awaited<T> =
     T extends Promise<infer U> ? Awaited<U> : T;

   - Récursif pour gérer Promise<Promise<...>>

   QUAND l'utiliser ?
   - Types de retour de fonctions async
   - Combiné avec ReturnType
*/

async function fetchData() {
  return { data: [1, 2, 3], count: 3 };
}

type FetchDataResult = Awaited<ReturnType<typeof fetchData>>;
// { data: number[]; count: number }

// Utilisation pratique
async function processData(): Promise<FetchDataResult> {
  const result = await fetchData();
  return result;
}
```

### String Manipulation Types - TRANSFORMER DES STRINGS

TypeScript 4.1+ fournit des utility types pour manipuler les TYPES de chaînes littérales.

```typescript
// ============================================
// Uppercase<T> : MAJUSCULES
// ============================================

type Greeting = "hello";
type LoudGreeting = Uppercase<Greeting>;
// "HELLO"

type Method = "get" | "post" | "put" | "delete";
type HTTPMethod = Uppercase<Method>;
// "GET" | "POST" | "PUT" | "DELETE"

/*
   POURQUOI Uppercase<T> ?
   - Transformer des string literal types en majuscules
   - Conventions de nommage (HTTP methods, constants)
   - Type transformations
*/

// ============================================
// Lowercase<T> : MINUSCULES
// ============================================

type Command = "SAVE" | "LOAD" | "DELETE";
type LowercaseCommand = Lowercase<Command>;
// "save" | "load" | "delete"

// ============================================
// Capitalize<T> : Première lettre en MAJUSCULE
// ============================================

type Animal = "cat" | "dog" | "bird";
type CapitalizedAnimal = Capitalize<Animal>;
// "Cat" | "Dog" | "Bird"

// ============================================
// Uncapitalize<T> : Première lettre en MINUSCULE
// ============================================

type ClassName = "User" | "Product" | "Order";
type PropertyName = Uncapitalize<ClassName>;
// "user" | "product" | "order"

/*
   QUAND utiliser ces types ?
   - Générer des noms de propriétés à partir de noms de classes
   - Conventions de nommage
   - Transformations de types string literals
   - Patterns de génération de code
*/

// Exemple pratique
type EventName = "click" | "scroll" | "keypress";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onScroll" | "onKeypress"

type EventHandlers = {
  [K in EventName as `on${Capitalize<K>}`]: (event: Event) => void;
};
/*
  {
    onClick: (event: Event) => void;
    onScroll: (event: Event) => void;
    onKeypress: (event: Event) => void;
  }
*/
```

### Type Guards - AFFINER LES TYPES

Les type guards permettent de RAFFINER (narrow) le type d'une variable à l'exécution.

```typescript
// ============================================
// typeof Type Guard - TYPES PRIMITIFS
// ============================================

function processValue(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript SAIT que value est string ici
    return value.toUpperCase();
  } else {
    // TypeScript SAIT que value est number ici
    return value.toFixed(2);
  }
}

/*
   POURQUOI typeof ?
   - DIFFÉRENCIER les types primitifs à runtime
   - Type narrowing automatique
   - Vérifications runtime + compile-time safety

   typeof retourne :
   - "string", "number", "boolean"
   - "undefined", "object", "function"
   - "symbol", "bigint"

   ⚠️ ATTENTION :
   - typeof null === "object" (bug historique JS)
   - typeof [] === "object"
   - typeof new Date() === "object"
*/

// ============================================
// instanceof Type Guard - CLASSES ET CONSTRUCTEURS
// ============================================

class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    // TypeScript SAIT que animal est Dog
    animal.bark();
  } else {
    // TypeScript SAIT que animal est Cat
    animal.meow();
  }
}

/*
   POURQUOI instanceof ?
   - VÉRIFIER si un objet est une instance d'une classe
   - Type narrowing pour classes
   - Vérification de la chaîne de prototypes

   QUAND l'utiliser ?
   - Différencier des instances de classes
   - Vérifier des types built-in (Date, RegExp, Array, Error)
*/

function processInput(input: string | Date): string {
  if (input instanceof Date) {
    return input.toISOString();
  } else {
    return input.toUpperCase();
  }
}

// ============================================
// Custom Type Guards - value is Type
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin";
  permissions: string[];
}

// Type guard personnalisé
function isAdmin(user: User | Admin): user is Admin {
  return (user as Admin).role === "admin";
}

function processUser(user: User | Admin): void {
  if (isAdmin(user)) {
    // TypeScript SAIT que user est Admin ici
    console.log(user.permissions);
  } else {
    // TypeScript SAIT que user est User ici
    console.log(user.name);
  }
}

/*
   POURQUOI value is Type ?
   - CRÉER des type guards personnalisés
   - Type narrowing pour types complexes
   - Logique de vérification réutilisable

   SYNTAXE :
   function isType(value: unknown): value is SpecificType {
     // Vérifications runtime
     return ...;
   }

   - value is Type : type predicate
   - Informe TypeScript du type après vérification

   QUAND l'utiliser ?
   - Interfaces sans instanceof possible
   - Logique de vérification complexe
   - Type narrowing sur unions
*/

// Exemples de type guards utiles

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return typeof obj === "object" && obj !== null && key in obj;
}

// Utilisation
function processUnknown(value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else if (isNumber(value)) {
    console.log(value.toFixed(2));
  } else if (isArray(value)) {
    console.log(value.length);
  }
}

// ============================================
// in Operator - VÉRIFIER L'EXISTENCE DE PROPRIÉTÉ
// ============================================

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  if ("radius" in shape) {
    // TypeScript SAIT que shape est Circle
    return Math.PI * shape.radius ** 2;
  } else {
    // TypeScript SAIT que shape est Square
    return shape.sideLength ** 2;
  }
}

/*
   POURQUOI in operator ?
   - VÉRIFIER si une propriété existe dans un objet
   - Type narrowing basé sur les propriétés
   - Alternative aux discriminated unions

   SYNTAXE :
   "propertyName" in object

   QUAND l'utiliser ?
   - Types avec propriétés distinctes
   - Objets dynamiques
   - Narrowing sur unions
*/

// ============================================
// Discriminated Unions - PATTERN LE PLUS RECOMMANDÉ
// ============================================

interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  error: string;
}

interface LoadingResponse {
  status: "loading";
}

type APIResponse = SuccessResponse | ErrorResponse | LoadingResponse;

function handleResponse(response: APIResponse): void {
  switch (response.status) {
    case "success":
      // TypeScript SAIT que response est SuccessResponse
      console.log(response.data);
      break;
    case "error":
      // TypeScript SAIT que response est ErrorResponse
      console.error(response.error);
      break;
    case "loading":
      // TypeScript SAIT que response est LoadingResponse
      console.log("Loading...");
      break;
  }
}

/*
   POURQUOI discriminated unions ?
   - PATTERN LE PLUS TYPE-SAFE
   - Propriété commune (discriminant) pour différencier
   - Exhaustiveness checking avec switch

   STRUCTURE :
   1. Union de types
   2. Propriété commune (discriminant)
   3. Valeurs littérales différentes pour chaque type

   QUAND l'utiliser ?
   - États d'application (loading, success, error)
   - API responses
   - Events avec différentes données
   - Actions Redux

   💡 AVANTAGES :
   - Type narrowing automatique
   - Exhaustiveness checking
   - Autocomplétion
   - Impossible d'oublier un cas
*/

// Exhaustiveness checking
function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

function handleResponseExhaustive(response: APIResponse): void {
  switch (response.status) {
    case "success":
      console.log(response.data);
      break;
    case "error":
      console.error(response.error);
      break;
    case "loading":
      console.log("Loading...");
      break;
    default:
      // Si on ajoute un nouveau status sans gérer ce cas,
      // TypeScript génère une erreur ici
      assertNever(response);
  }
}
```

### Type Assertions - FORCER UN TYPE

```typescript
// ============================================
// as Keyword - ASSERTION DE TYPE
// ============================================

const input = document.getElementById("username"); // HTMLElement | null
const inputElement = input as HTMLInputElement;
inputElement.value = "Alice";

/*
   POURQUOI as ?
   - DIRE à TypeScript : "Je sais mieux que toi quel est le type"
   - Bypass des vérifications de TypeScript
   - Quand vous avez plus d'information que le compilateur

   ⚠️ DANGER :
   - Vous pouvez vous tromper !
   - Runtime errors si mauvais type
   - À utiliser avec PRUDENCE

   QUAND l'utiliser ?
   - DOM manipulation (TypeScript ne sait pas quel élément)
   - API externes peu typées
   - JSON.parse, fetch responses
   - Quand vous êtes SÛR du type
*/

// Mieux : vérifier avant d'asserter
const safeInput = document.getElementById("username");
if (safeInput instanceof HTMLInputElement) {
  safeInput.value = "Alice"; // Type-safe !
}

// ============================================
// Non-null Assertion (!) - AFFIRMER NON-NULL
// ============================================

function getUser(id: string): User | null {
  // ...
  return null;
}

const user = getUser("1");
// user!.name; // ⚠️ DANGER : affirme que user n'est pas null

/*
   POURQUOI ! ?
   - AFFIRMER qu'une valeur n'est pas null/undefined
   - Quand TypeScript pense que c'est nullable mais vous savez que non

   ⚠️ DANGER :
   - Runtime error si effectivement null !
   - Évitez autant que possible

   MIEUX :
   - Vérifier avec if (user !== null)
   - Utiliser optional chaining (user?.name)
*/

// Cas d'usage acceptable : après vérification
const users = ["Alice", "Bob"];
const firstUser = users.find(u => u === "Alice")!;
// On SAIT que "Alice" existe, donc ! est acceptable

// ============================================
// const Assertions - INFÉRER LE TYPE LE PLUS STRICT
// ============================================

const colors = ["red", "green", "blue"] as const;
// Type : readonly ["red", "green", "blue"]
// Sans as const : string[]

type Color = typeof colors[number];
// "red" | "green" | "blue"

const config = {
  apiUrl: "https://api.com",
  timeout: 5000
} as const;
// Type : { readonly apiUrl: "https://api.com"; readonly timeout: 5000 }
// Sans as const : { apiUrl: string; timeout: number }

/*
   POURQUOI as const ?
   - INFÉRER des types LITTÉRAUX au lieu de types généraux
   - Rendre tout readonly
   - Tuples au lieu d'arrays
   - Valeurs littérales au lieu de types primitifs

   COMMENT ça marche ?
   - Transforme les types en readonly
   - Infère les types les plus stricts possibles
   - "hello" au lieu de string
   - [1, 2] au lieu de number[]

   QUAND l'utiliser ?
   - Constantes qui ne changent jamais
   - Configuration readonly
   - Tuples de valeurs fixes
   - Créer des unions à partir de tableaux
*/

// Pattern : créer une union depuis un tableau
const STATUS_LIST = ["pending", "success", "error"] as const;
type Status = typeof STATUS_LIST[number];
// "pending" | "success" | "error"

// Évite la duplication
// Au lieu de :
type StatusDuplicate = "pending" | "success" | "error";
const statusListDuplicate = ["pending", "success", "error"];
// Duplication ! Risque de désynchronisation
```

### Advanced Conditional Types - TYPES CONDITIONNELS AVANCÉS

```typescript
// ============================================
// infer Keyword - INFÉRER DES TYPES
// ============================================

// Extraire le type d'élément d'un tableau
type ElementType<T> = T extends (infer U)[] ? U : T;

type StringArray = string[];
type Element = ElementType<StringArray>;
// string

type NumberElement = ElementType<number>;
// number (pas un tableau)

/*
   POURQUOI infer ?
   - EXTRAIRE des types dans des types conditionnels
   - "Capturer" un type pour l'utiliser
   - Patterns avancés de manipulation de types

   SYNTAXE :
   T extends SomePattern<infer U> ? U : Fallback

   - infer U : capture le type à cette position
*/

// Extraire le type de retour d'une fonction
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(): string {
  return "Hello";
}

type GreetReturn = MyReturnType<typeof greet>;
// string

// Extraire le premier paramètre
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

function process(name: string, age: number): void {}

type FirstParam = FirstParameter<typeof process>;
// string

// ============================================
// Distributive Conditional Types - DISTRIBUTION
// ============================================

type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// string[] | number[] (distributif)
// Pas (string | number)[]

/*
   POURQUOI distributif ?
   - Les conditional types se DISTRIBUENT sur les unions
   - ToArray<A | B> = ToArray<A> | ToArray<B>

   COMMENT éviter la distribution ?
   - Envelopper T dans un tuple
*/

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Combined = ToArrayNonDist<string | number>;
// (string | number)[]

/*
   QUAND utiliser ?
   - Transformation de chaque membre d'une union
   - Patterns avancés de manipulation de types
*/

// Exemple : retirer readonly de manière récursive
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P];
};

type ReadonlyNested = {
  readonly a: string;
  readonly nested: {
    readonly b: number;
  };
};

type MutableNested = Mutable<ReadonlyNested>;
// { a: string; nested: { b: number } }
```

### Bonnes Pratiques - CONVENTIONS ET ASTUCES

```typescript
/*
   ✅ BONNES PRATIQUES UTILITY TYPES :

   1. PRÉFÉREZ les utility types aux définitions manuelles :
      ✅ type Update = Partial<User>
      ❌ type Update = { id?: string; name?: string; ... }

   2. COMBINEZ les utility types :
      type PublicUser = Omit<User, "password">
      type CreateUser = Omit<User, "id" | "createdAt">
      type UpdateUser = Partial<Omit<User, "id">>

   3. CRÉEZ des utility types réutilisables :
      type WithTimestamps<T> = T & {
        createdAt: Date;
        updatedAt: Date;
      }
      type WithId<T> = T & { id: string }

   4. UTILISEZ Pick/Omit intelligemment :
      - Peu de propriétés voulues → Pick
      - Peu de propriétés à exclure → Omit

   5. TYPE GUARDS :
      - Discriminated unions en priorité
      - Custom type guards pour logique complexe
      - Évitez les assertions (as) autant que possible

   ⚠️ PIÈGES COURANTS :

   1. ABUS des assertions (as) :
      ❌ const user = data as User; // Dangereux !
      ✅ function isUser(data: unknown): data is User { ... }

   2. OUBLI de vérifications null :
      ❌ user!.name; // Dangereux !
      ✅ user?.name ou if (user) { user.name }

   3. MAUVAISE utilisation de Partial :
      ❌ function update(user: Partial<User>) { user.id.toUpperCase() }
      // id peut être undefined !
      ✅ Vérifier ou utiliser Required<Partial<User>>

   4. CONFUSION Pick/Omit :
      // Si User a 10 propriétés et vous en voulez 2
      ✅ Pick<User, "id" | "name">
      ❌ Omit<User, "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h">

   💡 PATTERNS UTILES :

   1. DTO Pattern :
      type CreateDTO<T> = Omit<T, "id" | "createdAt" | "updatedAt">
      type UpdateDTO<T> = Partial<Omit<T, "id">>

   2. Public/Private :
      type Public<T> = Omit<T, "password" | "token" | "secret">

   3. Nullable Handling :
      type Nullable<T> = T | null
      type Maybe<T> = T | undefined
      type Optional<T> = T | null | undefined

   4. Deep Transformations :
      type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
      }

      type DeepReadonly<T> = {
        readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
      }

   💡 QUAND UTILISER QUOI :

   - Partial : Updates partiels, formulaires
   - Required : Validation, configuration complète
   - Readonly : Immutabilité, state management
   - Pick : Projections, vues partielles
   - Omit : Retirer des champs sensibles, DTOs
   - Record : Dictionnaires, lookups
   - Exclude/Extract : Filtrage d'unions
   - ReturnType/Parameters : Types dérivés de fonctions
   - Type Guards : Narrowing, validation runtime
*/
```

## 🎯 Exercices

Voir [exercice.ts](./exercice.ts) et [correction.ts](./correction.ts).
