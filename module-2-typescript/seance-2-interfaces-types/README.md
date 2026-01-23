# Séance 2 : Interfaces et Types

## 📚 Théorie

### Interfaces

Les interfaces définissent la FORME d'un objet en TypeScript.

```typescript
interface User {
  name: string;
  age: number;
  email?: string; // Propriété optionnelle
  readonly id: string; // Propriété readonly
}

const user: User = {
  id: "123",
  name: "Alice",
  age: 25
  // email omis (optionnel)
};

/*
   POURQUOI les interfaces ?
   - Définir des CONTRATS pour les objets
   - RÉUTILISER des structures de données
   - DOCUMENTER la forme attendue des données
   - Autocomplétion et vérification de types

   COMMENT ça marche ?
   - interface définit un type nommé
   - Toutes les propriétés requises doivent être présentes
   - Les propriétés optionnelles (?) peuvent être omises
   - readonly empêche la modification après création

   QUAND utiliser les interfaces ?
   - Structures d'objets réutilisables
   - Props de composants React
   - Données d'API
   - Modèles de données

   💡 CONSEIL :
   - Utilisez des noms descriptifs (User, Product, Config)
   - Préférez interfaces pour objets
   - Utilisez PascalCase pour les noms
*/

// user.id = "456"; // ❌ Erreur : readonly
user.age = 26; // ✅ OK
user.email = "alice@example.com"; // ✅ OK (optionnel)

// Extension d'interfaces - HÉRITAGE
interface Admin extends User {
  role: string;
  permissions: string[];
}

const admin: Admin = {
  id: "456",
  name: "Bob",
  age: 30,
  role: "admin",
  permissions: ["read", "write", "delete"]
};

/*
   POURQUOI extends ?
   - RÉUTILISER des interfaces existantes
   - Ajouter des propriétés spécifiques
   - Créer des hiérarchies de types
   - Éviter la duplication

   COMMENT ça marche ?
   - extends hérite de TOUTES les propriétés de l'interface parent
   - Admin contient : id, name, age, email, role, permissions
   - Équivalent à copier toutes les propriétés + ajouter les nouvelles

   QUAND utiliser extends ?
   - Créer des variations spécialisées (User → Admin, SuperAdmin)
   - Ajouter des métadonnées (BaseEntity → User)
   - Hiérarchies de données

   💡 EXEMPLES pratiques :
   interface BaseEntity {
     id: string;
     createdAt: Date;
     updatedAt: Date;
   }

   interface Product extends BaseEntity {
     name: string;
     price: number;
   }

   interface Article extends BaseEntity {
     title: string;
     content: string;
   }
*/

// Interfaces pour fonctions
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

/*
   POURQUOI interfaces pour fonctions ?
   - Définir des SIGNATURES de fonctions réutilisables
   - Type pour callbacks et handlers
   - Contrats de fonctions

   QUAND l'utiliser ?
   - Callbacks avec même signature
   - Stratégies (pattern Strategy)
   - Événements handlers
*/

// Index Signature dans interfaces
interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: "Bonjour",
  goodbye: "Au revoir"
};

/*
   Index signature permet des propriétés dynamiques
   - [key: string]: string → n'importe quelle clé string avec valeur string
   - Utile pour dictionnaires, maps, objets dynamiques
*/

// Interfaces hybrides (callable + propriétés)
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

/*
   Les interfaces peuvent combiner :
   - Signature d'appel (fonction)
   - Propriétés
   - Méthodes

   Utilisé rarement, mais utile pour bibliothèques complexes
*/
```

### Type Aliases

Les Type Aliases créent un nom pour N'IMPORTE QUEL type.

```typescript
// Type pour objets (similaire à interface)
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };

/*
   POURQUOI type pour objets ?
   - Alternative à interface
   - Même fonctionnalité pour les objets simples
   - Syntaxe différente mais résultat similaire

   DIFFÉRENCE avec interface :
   - type = alias (surnom pour un type)
   - interface = déclaration d'un nouveau type

   QUAND préférer type ?
   - Unions et intersections complexes
   - Types primitifs avec alias
   - Tuples et types complexes
*/

// Type aliases pour primitifs - CRÉER DES ALIAS
type ID = string | number;
type Username = string;
type Age = number;

let userId: ID = "abc123"; // ✅ OK
userId = 456; // ✅ OK

/*
   POURQUOI aliaser des primitifs ?
   - Donner du SENS aux types
   - Documenter l'intention
   - Faciliter les changements futurs

   ID au lieu de string | number :
   - Plus LISIBLE
   - Plus MAINTENABLE
   - Autodocumenté

   💡 PATTERN COURANT :
   type UserId = string;
   type Email = string;
   type Timestamp = number;

   Aide à comprendre ce que représente chaque valeur
*/

// Types union - PLUSIEURS OPTIONS
type Status = "pending" | "success" | "error";
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

let requestStatus: Status = "pending";
// requestStatus = "loading"; // ❌ Erreur : pas dans le type

/*
   POURQUOI les types union ?
   - Représenter un ENSEMBLE FINI de valeurs
   - Alternative type-safe aux enums
   - Littéraux de chaînes ou nombres

   COMMENT ça marche ?
   - | signifie "OU"
   - La valeur doit être EXACTEMENT l'une des options

   QUAND l'utiliser ?
   - États d'application (loading, success, error)
   - Modes (light, dark)
   - Rôles (user, admin, guest)
   - Méthodes HTTP

   💡 AVANTAGE sur enum :
   - Plus simple (pas de compilation JS supplémentaire)
   - Valeurs littérales directes
   - Meilleure intégration avec JSON
*/

// Types intersection - COMBINER PLUSIEURS TYPES
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type WithId = {
  id: string;
};

type TimestampedUser = User & Timestamped;
type Entity = WithId & Timestamped;

const article: Entity = {
  id: "123",
  createdAt: new Date(),
  updatedAt: new Date()
};

/*
   POURQUOI les intersections (&) ?
   - COMBINER plusieurs types en un
   - Composer des types depuis des morceaux réutilisables
   - Mixins de propriétés

   COMMENT ça marche ?
   - & signifie "ET"
   - Le type résultant contient TOUTES les propriétés

   User & Timestamped contient :
   - Toutes les propriétés de User
   - Toutes les propriétés de Timestamped

   DIFFÉRENCE & vs | :
   - & (intersection) : doit satisfaire TOUS les types
   - | (union) : doit satisfaire AU MOINS UN type

   QUAND utiliser & ?
   - Combiner des mixins (Timestamped, Versioned, etc.)
   - Composer des types complexes
   - Ajouter des métadonnées

   💡 PATTERN COURANT :
   type Auditable = {
     createdBy: string;
     updatedBy: string;
   };

   type AuditedEntity = Entity & Auditable;
*/

// Mapped Types - TRANSFORMER DES TYPES
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;
// Toutes les propriétés deviennent optionnelles

/*
   Les Mapped Types transforment des types
   - Rendre toutes propriétés optionnelles
   - Rendre toutes propriétés readonly
   - Changer les types de valeurs

   Détails en séance 4 (Utility Types)
*/

// Conditional Types - TYPES CONDITIONNELS
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

/*
   Les types conditionnels permettent la logique
   - Si T est X alors Y sinon Z
   - Types avancés et génériques
   - Inférence de types complexes
*/
```

### Interface vs Type - QUAND UTILISER QUOI ?

```typescript
// ✅ Interface : EXTENSION et FUSION
interface Window {
  title: string;
}

interface Window {
  size: number; // Fusion automatique avec l'interface précédente
}

// Window contient maintenant : { title: string; size: number }

/*
   POURQUOI la fusion d'interfaces ?
   - Étendre des types existants (utile pour bibliothèques)
   - Ajouter des propriétés à des types globaux
   - Augmentation de modules

   COMMENT ça marche ?
   - TypeScript FUSIONNE automatiquement les interfaces de même nom
   - Toutes les propriétés sont combinées
   - Pas de conflit si même propriété avec même type

   QUAND l'utiliser ?
   - Étendre des types de bibliothèques (Window, Document)
   - Module augmentation
   - Déclaration de types globaux

   💡 EXEMPLE pratique :
   // Dans un fichier .d.ts
   interface Window {
     myCustomProperty: string;
   }

   // Maintenant window.myCustomProperty est typé
*/

// ✅ Type : UNION et INTERSECTION
type Theme = "light" | "dark" | "auto";
type Color = "red" | "blue" | "green";
type ThemedColor = Theme | Color;

type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
};

/*
   POURQUOI type pour unions/intersections ?
   - Plus FLEXIBLE que les interfaces
   - Peut représenter des unions de primitifs
   - Intersections de types

   DIFFÉRENCES clés Interface vs Type :

   1. EXTENSION :
   - Interface : extends
   - Type : & (intersection)

   2. FUSION :
   - Interface : fusion automatique ✅
   - Type : pas de fusion ❌

   3. UNIONS :
   - Interface : non ❌
   - Type : oui ✅

   4. TUPLES :
   - Interface : possible mais verbeux
   - Type : simple ✅

   5. MAPPED TYPES :
   - Interface : non ❌
   - Type : oui ✅
*/

// RÈGLES de choix Interface vs Type :

/*
   ✅ Utilisez INTERFACE quand :
   - Vous définissez la forme d'un OBJET
   - Vous voulez l'ÉTENDRE (extends)
   - Vous travaillez avec des CLASSES
   - Vous voulez la FUSION (module augmentation)
   - API publiques de bibliothèques

   ✅ Utilisez TYPE quand :
   - Vous avez des UNIONS (string | number)
   - Vous avez des INTERSECTIONS complexes
   - Vous définissez des TUPLES
   - Vous utilisez des MAPPED TYPES
   - Vous créez des ALIAS pour primitifs

   💡 RÈGLE SIMPLE :
   - Objets → interface
   - Unions, primitifs, intersections → type
   - En cas de doute → interface (extensible)
*/

// EXEMPLES comparatifs

// Interface pour objets
interface UserInterface {
  name: string;
  age: number;
}

interface AdminInterface extends UserInterface {
  role: string;
}

// Type équivalent
type UserType = {
  name: string;
  age: number;
};

type AdminType = UserType & {
  role: string;
};

// Les deux fonctionnent, mais interface est plus idiomatique pour objets

// Type pour unions (interface ne peut pas)
type Status = "loading" | "success" | "error"; // ✅ Seulement avec type
// interface Status... ❌ Impossible

// Type pour tuples
type Coordinate = [number, number]; // ✅ Simple avec type

interface CoordinateInterface {
  0: number;
  1: number;
  length: 2;
} // ❌ Verbeux et peu pratique

/*
   ✅ BONNES PRATIQUES :
   1. Cohérence : choisissez un style pour votre équipe
   2. Interface pour React props (convention)
   3. Type pour états et unions
   4. Interface pour modèles de données

   💡 CONVENTION REACT :
   interface ButtonProps {
     label: string;
     onClick: () => void;
   }

   type AppState = "idle" | "loading" | "error";

   ⚠️ ÉVITEZ :
   - Mélanger interface/type sans raison
   - Type pour tout (utilisez interface quand approprié)
   - Interface pour unions (impossible)
*/
```

## 🎯 Exercices

Voir [exercice.ts](./exercice.ts) et [correction.ts](./correction.ts).
