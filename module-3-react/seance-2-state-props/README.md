# Séance 2 : State et Props

## 📚 Théorie

### Introduction au State - L'ÉTAT D'UN COMPOSANT

Le **state** (état) est une donnée LOCALE à un composant qui peut CHANGER au fil du temps.

```tsx
/*
   POURQUOI le state ?
   - Stocker des DONNÉES qui changent (compteur, formulaire, toggle)
   - Déclencher un RE-RENDER quand les données changent
   - Chaque composant a son propre state (isolé)
   - Créer des interfaces INTERACTIVES

   COMMENT ça marche ?
   - State = données locales au composant
   - Quand le state change → React re-render le composant
   - Nouveau state → nouveau rendu → nouveau JSX
   - Virtual DOM calcule le DIFF et met à jour le vrai DOM

   QUAND utiliser le state ?
   - Données qui CHANGENT (inputs, toggles, compteurs)
   - Résultats d'API
   - UI state (modal ouvert/fermé, onglet actif)
   - Formulaires

   💡 ANALOGIE :
   Le state est comme une VARIABLE qui déclenche un RE-RENDER :
   - let count = 0; count++ → PAS de re-render
   - useState(0) → setCount(1) → RE-RENDER automatique
*/

// ❌ Sans state - NE FONCTIONNE PAS
function BadCounter() {
  let count = 0; // Variable locale

  const increment = () => {
    count++; // Change la variable
    console.log(count); // Log 1, 2, 3...
    // MAIS l'UI NE SE MET PAS À JOUR !
  };

  return (
    <div>
      <p>Count: {count}</p> {/* Toujours 0 à l'écran */}
      <button onClick={increment}>+1</button>
    </div>
  );
}

/*
   PROBLÈME :
   - count change en mémoire
   - MAIS React ne sait pas que count a changé
   - Pas de re-render → UI figée
*/

// ✅ Avec state - FONCTIONNE
import { useState } from 'react';

function GoodCounter() {
  const [count, setCount] = useState(0); // State

  const increment = () => {
    setCount(count + 1); // Change le state
    // React détecte le changement → RE-RENDER
  };

  return (
    <div>
      <p>Count: {count}</p> {/* Se met à jour ! */}
      <button onClick={increment}>+1</button>
    </div>
  );
}

/*
   SOLUTION :
   - useState(0) : state initial = 0
   - setCount(count + 1) : met à jour le state
   - React re-render le composant
   - Nouvelle valeur affichée
*/
```

### State vs Props - DIFFÉRENCES CLÉS

```tsx
/*
   STATE vs PROPS :

   📦 PROPS :
   - Passées du PARENT au composant
   - READ-ONLY (immutables)
   - Comme des PARAMÈTRES de fonction
   - Parent contrôle les props

   🔄 STATE :
   - LOCALES au composant
   - MODIFIABLES via setState
   - Comme des VARIABLES d'instance
   - Composant contrôle son state

   💡 RÈGLE :
   - Props = données EN ENTRÉE
   - State = données INTERNES
   - State d'un parent peut devenir props d'un enfant
*/

// Exemple
function Parent() {
  const [message, setMessage] = useState("Hello"); // STATE du parent

  return <Child text={message} />; // Devient PROP pour Child
}

function Child({ text }: { text: string }) {
  // text est une PROP (read-only)
  // text = "New"; ❌ Erreur : props immutables
  return <p>{text}</p>;
}

/*
   FLUX DE DONNÉES :
   - Parent State → Child Props
   - Unidirectionnel (top-down)
   - Parent contrôle, enfant affiche
*/
```

### useState - LE HOOK D'ÉTAT

useState est le hook le plus FONDAMENTAL de React pour gérer l'état.

```tsx
import { useState } from 'react';

// ============================================
// Syntaxe de Base - ARRAY DESTRUCTURING
// ============================================

function Counter() {
  const [count, setCount] = useState(0);
  //     ^      ^          ^
  //     |      |          |
  //  valeur  setter   valeur initiale

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
   POURQUOI cette syntaxe ?
   - useState RETOURNE un tableau [state, setState]
   - Destructuring pour récupérer les deux
   - count : valeur actuelle du state
   - setCount : fonction pour mettre à jour le state
   - useState(0) : valeur INITIALE

   CONVENTION de nommage :
   - [thing, setThing] : nom descriptif + "set" + nom
   - [count, setCount]
   - [isOpen, setIsOpen]
   - [user, setUser]
*/

// ============================================
// useState avec Différents Types - TYPAGE
// ============================================

// Primitifs (inference automatique)
const [name, setName] = useState("Alice"); // string
const [age, setAge] = useState(25); // number
const [isActive, setIsActive] = useState(true); // boolean

// Type explicite
const [count, setCount] = useState<number>(0);
const [text, setText] = useState<string>("");

// Avec interface
interface User {
  name: string;
  age: number;
  email: string;
}

const [user, setUser] = useState<User>({
  name: "Alice",
  age: 25,
  email: "alice@example.com"
});

// State nullable
const [user, setUser] = useState<User | null>(null);

// Avec array
const [items, setItems] = useState<string[]>([]);
const [users, setUsers] = useState<User[]>([]);

/*
   POURQUOI typer le state ?
   - TYPE SAFETY : éviter les erreurs
   - Autocomplétion
   - Documentation du code

   QUAND typer explicitement ?
   - Types complexes (interfaces)
   - Types nullable (T | null)
   - Arrays vides (TypeScript ne peut pas inférer)
   - Unions de types
*/

// ============================================
// Lazy Initialization - INITIALISATION COÛTEUSE
// ============================================

// ❌ Mauvais : calcul exécuté à CHAQUE render
function BadExample() {
  const [data, setData] = useState(expensiveComputation());
  // expensiveComputation() appelée à CHAQUE render !
  // Même si on n'utilise que la valeur initiale une fois
}

// ✅ Bon : fonction appelée SEULEMENT au premier render
function GoodExample() {
  const [data, setData] = useState(() => expensiveComputation());
  // La fonction n'est appelée QU'UNE SEULE FOIS
}

/*
   POURQUOI lazy initialization ?
   - Si initialisation COÛTEUSE (calculs, localStorage)
   - Passer une FONCTION au lieu de la valeur
   - React appelle la fonction seulement au PREMIER render
   - Optimisation de performance

   QUAND l'utiliser ?
   - Lecture depuis localStorage
   - Calculs complexes
   - Transformation de données
*/

function TodoListWithLocalStorage() {
  const [todos, setTodos] = useState(() => {
    // Lecture depuis localStorage seulement au premier render
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  return <div>{/* ... */}</div>;
}

// ============================================
// Multiple States vs Object State - ORGANISATION
// ============================================

// ✅ Multiple states (recommandé si indépendants)
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
}

// ✅ Object state (si liés logiquement)
function FormWithObject() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0
  });

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };
}

/*
   QUAND multiple states ?
   - États INDÉPENDANTS
   - Changent séparément
   - Pas de relation logique

   QUAND object state ?
   - Données LIÉES (formulaire)
   - Toujours mises à jour ensemble
   - Facilite la manipulation groupée

   💡 RÈGLE :
   - Si indépendants → multiple states
   - Si liés → object state
   - Éviter object trop gros (découper)
*/
```

### Updater Functions - MISES À JOUR FONCTIONNELLES

```tsx
// ============================================
// Functional Updates - BASÉ SUR ÉTAT PRÉCÉDENT
// ============================================

function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Peut causer des bugs
  const incrementBad = () => {
    setCount(count + 1);
  };

  // ✅ Recommandé
  const incrementGood = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementGood}>+1</button>
    </div>
  );
}

/*
   POURQUOI functional updates ?
   - GARANTIT que vous utilisez la DERNIÈRE valeur
   - Évite les bugs avec multiples updates
   - Crucial pour async et batching

   COMMENT ?
   - setState(newValue) : valeur directe
   - setState(prev => newValue) : basé sur valeur précédente

   QUAND utiliser functional updates ?
   - Nouvel état dépend de l'ancien
   - Multiples updates rapides
   - Callbacks asynchrones
*/

// Exemple de BUG sans functional update
function BuggyCounter() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    setCount(count + 1); // count = 0 → 1
    setCount(count + 1); // count = 0 → 1 (re-utilise 0 !)
    setCount(count + 1); // count = 0 → 1 (re-utilise 0 !)
    // Résultat : count = 1 (PAS 3 !)
  };

  return <button onClick={incrementThreeTimes}>+3</button>;
}

// ✅ Solution avec functional update
function FixedCounter() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    setCount(c => c + 1); // 0 → 1
    setCount(c => c + 1); // 1 → 2
    setCount(c => c + 1); // 2 → 3
    // Résultat : count = 3 ✅
  };

  return <button onClick={incrementThreeTimes}>+3</button>;
}

/*
   BATCHING :
   - React GROUPE les setState ensemble
   - Un seul re-render pour plusieurs setState
   - Optimisation de performance

   Avec functional updates :
   - React applique les fonctions dans l'ordre
   - Chaque fonction reçoit le résultat de la précédente
   - Garantit la cohérence
*/

// ============================================
// Async State Updates - ÉTAT ASYNCHRONE
// ============================================

function AsyncExample() {
  const [count, setCount] = useState(0);

  const incrementAsync = () => {
    setTimeout(() => {
      // ❌ Mauvais : count peut être obsolète
      setCount(count + 1);

      // ✅ Bon : utilise la dernière valeur
      setCount(c => c + 1);
    }, 1000);
  };

  return <button onClick={incrementAsync}>+1 (async)</button>;
}

/*
   POURQUOI functional updates en async ?
   - count dans le setTimeout capture la valeur AU MOMENT du clic
   - Après 1s, count peut avoir changé
   - Functional update garantit d'utiliser la valeur ACTUELLE
*/
```

### Forms et Inputs - FORMULAIRES CONTRÔLÉS

```tsx
// ============================================
// Controlled Components - COMPOSANTS CONTRÔLÉS
// ============================================

function ControlledInput() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input
        value={text} // Valeur contrôlée par React
        onChange={handleChange}
      />
      <p>Vous tapez : {text}</p>
    </div>
  );
}

/*
   POURQUOI controlled components ?
   - React est la "source de vérité" (single source of truth)
   - Valeur de l'input = state React
   - onChange met à jour le state
   - State change → input se met à jour

   AVANTAGES :
   - Validation en temps réel
   - Formatage de la valeur
   - Disabled submit selon validation
   - Contrôle total

   PATTERN :
   1. State stocke la valeur
   2. value={state} lie l'input au state
   3. onChange={handler} met à jour le state
*/

// ============================================
// Uncontrolled Components - COMPOSANTS NON CONTRÔLÉS
// ============================================

import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <div>
      <input ref={inputRef} defaultValue="" />
      <button onClick={handleSubmit}>Envoyer</button>
    </div>
  );
}

/*
   POURQUOI uncontrolled ?
   - Pas de state pour chaque input
   - DOM gère la valeur
   - Accès via ref

   QUAND utiliser ?
   - Formulaires simples
   - Pas besoin de validation temps réel
   - Intégration avec bibliothèques tierces
   - Performance (pas de re-render à chaque frappe)

   ⚠️ PRÉFÉREZ controlled dans la plupart des cas
*/

// ============================================
// Multiple Inputs - PLUSIEURS CHAMPS
// ============================================

function MultipleInputs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
    </form>
  );
}

/*
   PATTERN pour multiples inputs :
   - Un object state pour tout le formulaire
   - Attribut name correspond à la clé du state
   - Handler générique utilise e.target.name
   - [name]: value pour computed property

   AVANTAGES :
   - Un seul handler pour tous les inputs
   - DRY (Don't Repeat Yourself)
   - Facile à étendre
*/

// ============================================
// Form Validation - VALIDATION
// ============================================

function FormWithValidation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    if (!value) {
      setError("Email requis");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError("Email invalide");
    } else {
      setError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!error && email) {
      console.log("Envoyer:", email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
      <button type="submit" disabled={!!error || !email}>
        Envoyer
      </button>
    </form>
  );
}

/*
   VALIDATION en temps réel :
   - State pour les erreurs
   - Validation dans onChange
   - Afficher les erreurs immédiatement
   - Disabled submit si erreurs

   QUAND valider ?
   - onChange : temps réel
   - onBlur : quand l'utilisateur quitte le champ
   - onSubmit : avant d'envoyer
*/
```

### State Immutability - IMMUTABILITÉ DU STATE

Le state en React DOIT être traité comme IMMUTABLE (non modifiable).

```tsx
// ============================================
// Objects - NE PAS MODIFIER DIRECTEMENT
// ============================================

function UserProfile() {
  const [user, setUser] = useState({
    name: "Alice",
    age: 25,
    email: "alice@example.com"
  });

  // ❌ MAUVAIS : mutation directe
  const updateNameBad = () => {
    user.name = "Bob"; // Modifie l'objet directement
    setUser(user); // React ne détecte PAS le changement !
  };

  // ✅ BON : créer un nouvel objet
  const updateNameGood = () => {
    setUser({ ...user, name: "Bob" }); // Spread + override
  };

  // ✅ BON : functional update
  const updateNameBetter = () => {
    setUser(prev => ({ ...prev, name: "Bob" }));
  };
}

/*
   POURQUOI immutabilité ?
   - React compare par RÉFÉRENCE (===)
   - Si même référence → pas de re-render
   - Nouvel objet → nouvelle référence → re-render

   COMMENT ?
   - Spread operator : { ...obj, key: newValue }
   - Crée un NOUVEAU objet
   - React détecte le changement
*/

// ============================================
// Arrays - MÉTHODES IMMUTABLES
// ============================================

function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);

  // ✅ Ajouter un élément
  const addTodo = (text: string) => {
    setTodos([...todos, text]); // Spread
    // Ou : setTodos(prev => [...prev, text]);
  };

  // ✅ Supprimer un élément
  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // ✅ Modifier un élément
  const updateTodo = (index: number, newText: string) => {
    setTodos(todos.map((todo, i) =>
      i === index ? newText : todo
    ));
  };

  // ❌ MAUVAIS : mutations directes
  const badAdd = (text: string) => {
    todos.push(text); // ❌ Mutation !
    setTodos(todos); // React ne détecte pas !
  };

  const badRemove = (index: number) => {
    todos.splice(index, 1); // ❌ Mutation !
    setTodos(todos);
  };
}

/*
   MÉTHODES IMMUTABLES pour arrays :
   - ✅ spread : [...arr, item]
   - ✅ filter() : retire des éléments
   - ✅ map() : transforme des éléments
   - ✅ concat() : combine des arrays
   - ✅ slice() : copie une portion

   MÉTHODES À ÉVITER (mutations) :
   - ❌ push(), pop(), shift(), unshift()
   - ❌ splice()
   - ❌ sort(), reverse() (muent l'array)
   - Si besoin : copier puis muter [...arr].sort()
*/

// ============================================
// Nested Data - DONNÉES IMBRIQUÉES
// ============================================

interface User {
  name: string;
  address: {
    street: string;
    city: string;
  };
  hobbies: string[];
}

function ProfileEditor() {
  const [user, setUser] = useState<User>({
    name: "Alice",
    address: {
      street: "123 Main St",
      city: "Paris"
    },
    hobbies: ["reading", "coding"]
  });

  // Modifier une propriété imbriquée
  const updateCity = (newCity: string) => {
    setUser({
      ...user,
      address: {
        ...user.address, // Copier l'address
        city: newCity // Override city
      }
    });
  };

  // Ajouter un hobby
  const addHobby = (hobby: string) => {
    setUser({
      ...user,
      hobbies: [...user.hobbies, hobby]
    });
  };

  // Pattern avec Immer (bibliothèque)
  // import { produce } from 'immer';
  const updateWithImmer = (newCity: string) => {
    setUser(produce(user, draft => {
      draft.address.city = newCity; // Mutation dans draft
    }));
  };
}

/*
   Données imbriquées :
   - Spread à CHAQUE niveau
   - Verbeux mais nécessaire
   - Alternative : Immer (syntaxe mutation mais immutable)

   💡 ASTUCE :
   Si trop de nesting → refactor le state
   - Aplatir la structure
   - Séparer en plusieurs states
*/
```

### Lifting State Up - PARTAGER LE STATE

Quand plusieurs composants ont besoin du MÊME état, on le "remonte" au parent commun.

```tsx
// ============================================
// Problème : State Dupliqué - ISOLÉ
// ============================================

// ❌ Chaque composant a son propre state
function BadExample() {
  return (
    <div>
      <ComponentA /> {/* State count isolé */}
      <ComponentB /> {/* State count isolé */}
    </div>
  );
}

function ComponentA() {
  const [count, setCount] = useState(0);
  return <div>A: {count}</div>;
}

function ComponentB() {
  const [count, setCount] = useState(0);
  return <div>B: {count}</div>;
}

// Problème : A et B ne partagent PAS le state

// ============================================
// Solution : Lift State Up - REMONTER
// ============================================

// ✅ State dans le parent commun
function GoodExample() {
  const [count, setCount] = useState(0); // State partagé

  return (
    <div>
      <ComponentA count={count} onIncrement={() => setCount(c => c + 1)} />
      <ComponentB count={count} />
    </div>
  );
}

function ComponentA({ count, onIncrement }: { count: number; onIncrement: () => void }) {
  return (
    <div>
      A: {count}
      <button onClick={onIncrement}>+1</button>
    </div>
  );
}

function ComponentB({ count }: { count: number }) {
  return <div>B: {count}</div>;
}

/*
   POURQUOI lift state up ?
   - PARTAGER le state entre composants
   - Single source of truth (une seule source)
   - Synchronisation automatique

   PATTERN :
   1. Identifier le parent commun
   2. Déplacer le state dans ce parent
   3. Passer le state via props aux enfants
   4. Passer les setters via props (callbacks)

   QUAND l'utiliser ?
   - Deux composants ont besoin du même état
   - Communication entre frères (siblings)
   - Synchronisation de données
*/

// ============================================
// Communication Enfant → Parent - CALLBACKS
// ============================================

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} /> {/* Enfant peut ajouter */}
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}

function AddTodoForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text); // Appelle le callback du parent
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
}

function TodoList({ todos, onToggle }: { todos: Todo[]; onToggle: (id: string) => void }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

/*
   PATTERN callback :
   - Parent définit une fonction (addTodo, toggleTodo)
   - Passe la fonction via props à l'enfant
   - Enfant appelle la fonction avec des données
   - Parent met à jour son state

   FLUX :
   - Enfant → callback(data)
   - Parent → reçoit data → update state
   - State change → props changent → enfants re-render

   💡 Ce pattern simule une "remontée" de données
*/
```

### Bonnes Pratiques - CONVENTIONS ET ASTUCES

```tsx
/*
   ✅ BONNES PRATIQUES STATE :

   1. NOMMAGE :
      - Descriptif : [isLoading, setIsLoading] pas [state, setState]
      - Convention : [thing, setThing]
      - Boolean : isX, hasX, shouldX

   2. INITIALISATION :
      - Toujours une valeur initiale
      - Lazy init pour calculs coûteux : useState(() => ...)
      - Typage explicite si TypeScript ne peut pas inférer

   3. UPDATES :
      - Functional updates si dépend de previous : setCount(c => c + 1)
      - Immutabilité : toujours créer nouveaux objets/arrays
      - Batching : React groupe les setState

   4. ORGANISATION :
      - States liés → object state
      - States indépendants → states séparés
      - Lift state up si besoin partagé
      - Éviter state pour données dérivées

   5. FORMS :
      - Controlled components en général
      - Uncontrolled si simple ou intégration tierce
      - Validation en temps réel
      - Disabled submit si erreurs

   ⚠️ PIÈGES COURANTS :

   1. MUTATION DIRECTE :
      ❌ user.name = "Bob"; setUser(user);
      ✅ setUser({ ...user, name: "Bob" });

   2. STALE CLOSURE :
      ❌ setTimeout(() => setCount(count + 1), 1000);
      ✅ setTimeout(() => setCount(c => c + 1), 1000);

   3. DÉRIVATION AU LIEU DE STATE :
      ❌ const [count, setCount] = useState(0);
         const [doubleCount, setDoubleCount] = useState(0);
      ✅ const [count, setCount] = useState(0);
         const doubleCount = count * 2;

   4. STATE POUR PROPS :
      ❌ const [name, setName] = useState(props.name);
      ✅ Utiliser props.name directement
      Exception : valeur initiale différente de props actuelle

   5. OUBLIER KEY dans listes :
      ❌ {todos.map(todo => <li>...</li>)}
      ✅ {todos.map(todo => <li key={todo.id}>...</li>)}

   6. TROP DE STATE :
      - Si dérivable → pas de state
      - const fullName = `${firstName} ${lastName}`
      - Pas besoin de state pour fullName

   💡 PATTERNS UTILES :

   1. Toggle State :
      const [isOpen, setIsOpen] = useState(false);
      const toggle = () => setIsOpen(prev => !prev);

   2. Reset State :
      const [formData, setFormData] = useState(initialFormData);
      const reset = () => setFormData(initialFormData);

   3. Multiple Updates :
      setUser(prev => ({ ...prev, name: "Bob" }));
      setUser(prev => ({ ...prev, age: 30 }));
      // React batche les deux updates

   4. Conditional State :
      const [data, setData] = useState(initialData);
      if (someCondition) {
        // Mettre à jour seulement si condition
        setData(newData);
      }

   💡 QUAND UTILISER QUOI :

   - useState : état LOCAL simple
   - useReducer : état COMPLEXE avec logique
   - Context : état GLOBAL partagé
   - Props : données du PARENT
   - Computed values : PAS de state, dériver des autres

   💡 ORGANISATION FICHIERS :
      components/
        TodoApp/
          TodoApp.tsx (state principal)
          AddTodoForm.tsx (state local pour input)
          TodoList.tsx (reçoit via props)
          TodoItem.tsx (reçoit via props)
*/
```

## 🎯 Exercices

Voir [exercice.tsx](./exercice.tsx) et [correction.tsx](./correction.tsx).
