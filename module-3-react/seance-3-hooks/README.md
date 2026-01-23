# Séance 3 : Hooks Essentiels

## 📚 Théorie

### Introduction aux Hooks - QU'EST-CE QU'UN HOOK ?

Les **Hooks** sont des fonctions qui permettent d'utiliser les fonctionnalités de React dans les composants fonctionnels.

```tsx
/*
   POURQUOI les Hooks ?
   - Utiliser STATE dans les composants fonctionnels
   - Gérer les EFFETS DE BORD (API calls, subscriptions)
   - Réutiliser la LOGIQUE avec état
   - Alternative aux CLASS components
   - Code plus SIMPLE et LISIBLE

   AVANT les Hooks (class components) :
   - Verbeux, complexe
   - Logique dispersée (componentDidMount, componentDidUpdate)
   - Difficile à réutiliser la logique

   APRÈS les Hooks (function components) :
   - Concis, simple
   - Logique regroupée
   - Facile à réutiliser (custom hooks)

   QUAND utiliser les Hooks ?
   - TOUJOURS dans les composants fonctionnels modernes
   - useState : état local
   - useEffect : effets de bord
   - useRef : références DOM, valeurs persistantes
   - useMemo/useCallback : optimisations

   💡 RÈGLES DES HOOKS :
   1. Appeler seulement au TOP LEVEL (pas dans if, for, nested functions)
   2. Appeler seulement dans FUNCTION COMPONENTS ou CUSTOM HOOKS
*/

// ❌ AVANT : Class component (ancien)
class OldCounter extends React.Component {
  state = { count: 0 };

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}

// ✅ APRÈS : Function component avec Hooks (moderne)
import { useState, useEffect } from 'react';

function NewCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

/*
   AVANTAGES des Hooks :
   - 10 lignes au lieu de 20+
   - Logique regroupée (title update)
   - Pas de this
   - Plus lisible
*/
```

### useEffect - EFFETS DE BORD

useEffect permet d'exécuter du code APRÈS le rendu, pour gérer les effets de bord.

```tsx
import { useState, useEffect } from 'react';

// ============================================
// Syntaxe de Base - APRÈS CHAQUE RENDER
// ============================================

function EffectExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Code exécuté APRÈS le render
    console.log('Component rendered');
    document.title = `Count: ${count}`;
  });

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

/*
   POURQUOI useEffect ?
   - Exécuter du code APRÈS le rendu
   - Gérer les EFFETS DE BORD (side effects)
   - API calls, subscriptions, DOM manipulation, timers

   COMMENT ça marche ?
   1. Composant render
   2. React met à jour le DOM
   3. useEffect s'exécute

   SANS dépendances : s'exécute APRÈS CHAQUE RENDER

   ⚠️ Attention : peut causer des boucles infinies si on modifie le state
*/

// ============================================
// Dependencies Array - CONTRÔLER L'EXÉCUTION
// ============================================

function DependenciesExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 1. Pas de dépendances : APRÈS CHAQUE render
  useEffect(() => {
    console.log('Chaque render');
  });

  // 2. Array vide [] : UNE SEULE FOIS (au mount)
  useEffect(() => {
    console.log('Une fois au mount');
    // Équivalent de componentDidMount
  }, []);

  // 3. Dépendances spécifiques : quand elles CHANGENT
  useEffect(() => {
    console.log('Quand count change');
  }, [count]); // S'exécute seulement si count change

  useEffect(() => {
    console.log('Quand count OU name change');
  }, [count, name]); // S'exécute si count OU name change

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

/*
   DEPENDENCIES ARRAY :
   - [] : une fois au mount
   - [dep1, dep2] : quand dep1 ou dep2 changent
   - pas de array : après chaque render

   POURQUOI les dépendances ?
   - CONTRÔLER quand l'effet s'exécute
   - PERFORMANCE : éviter les re-exécutions inutiles
   - ÉVITER les boucles infinies

   ⚠️ RÈGLE : toujours lister TOUTES les dépendances utilisées
*/

// ============================================
// Cleanup Function - NETTOYAGE
// ============================================

function TimerExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Setup : démarrer un timer
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // Cleanup : nettoyer le timer
    return () => {
      clearInterval(interval);
      console.log('Cleanup interval');
    };
  }, []); // Une fois au mount

  return <div>Count: {count}</div>;
}

/*
   POURQUOI cleanup ?
   - NETTOYER les ressources (timers, subscriptions, listeners)
   - Éviter les MEMORY LEAKS
   - Annuler les opérations en cours

   QUAND cleanup s'exécute ?
   - Avant le RE-RUN de l'effet (si dépendances changent)
   - Au UNMOUNT du composant

   PATTERN :
   useEffect(() => {
     // Setup
     const subscription = api.subscribe();

     return () => {
       // Cleanup
       subscription.unsubscribe();
     };
   }, []);
*/

function EventListenerExample() {
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };

    // Setup : ajouter listener
    window.addEventListener('resize', handleResize);

    // Cleanup : retirer listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>Resize the window</div>;
}

/*
   Event listeners :
   - Toujours cleanup pour éviter memory leaks
   - Un listener par render = fuite mémoire
*/

// ============================================
// Data Fetching - APPELS API
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Reset state au début
    setLoading(true);
    setError("");

    // Fetch user data
    fetch(`/api/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // Re-fetch quand userId change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

/*
   PATTERN data fetching :
   1. States : data, loading, error
   2. useEffect pour fetch
   3. Dépendances : paramètres de fetch (userId)
   4. Gérer loading/error states
   5. Afficher conditionnellement

   ⚠️ PROBLÈME : Race condition possible
   Si userId change rapidement, réponses peuvent arriver dans le désordre
*/

// ✅ Solution : Cleanup pour annuler les requêtes obsolètes
function SafeUserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // Flag pour annulation

    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) { // Seulement si pas annulé
          setUser(data);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true; // Annuler au cleanup
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

/*
   Race condition fix :
   - Flag cancelled
   - Cleanup met cancelled = true
   - Ignorer la réponse si cancelled

   MODERNE : AbortController
*/

function ModernFetch({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setUser)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });

    return () => controller.abort(); // Annuler la requête
  }, [userId]);

  return <div>{user?.name}</div>;
}

/*
   AbortController :
   - API moderne pour annuler fetch
   - Plus propre que flag manuel
   - Supporte par fetch natif
*/

// ============================================
// Multiple Effects - SÉPARER LES CONCERNS
// ============================================

function MultipleEffects() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Effect 1 : Document title
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Effect 2 : LocalStorage
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  // Effect 3 : Event listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setCount(c => c + 1);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return <div>...</div>;
}

/*
   POURQUOI plusieurs effects ?
   - SÉPARER les concerns
   - Chaque effect = une responsabilité
   - Plus lisible et maintenable

   PATTERN :
   - Un effect par fonctionnalité
   - Pas de mega-effect qui fait tout
*/
```

### useRef - RÉFÉRENCES ET VALEURS PERSISTANTES

useRef crée une référence MUTABLE qui persiste entre les renders SANS causer de re-render.

```tsx
import { useRef, useEffect } from 'react';

// ============================================
// DOM Refs - ACCÉDER AUX ÉLÉMENTS DOM
// ============================================

function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

/*
   POURQUOI useRef pour le DOM ?
   - ACCÉDER directement à un élément DOM
   - Appeler des méthodes DOM (focus, scroll, etc.)
   - Mesurer dimensions, position

   COMMENT ?
   - useRef<HTMLInputElement>(null)
   - ref={inputRef} sur l'élément
   - inputRef.current = élément DOM réel

   QUAND utiliser ?
   - Focus management
   - Scroll to element
   - Intégration avec libs tierces (charts, maps)
   - Mesures (width, height)
*/

// Exemple : Scroll to bottom
function ChatMessages({ messages }: { messages: string[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Scroll quand messages changent

  return (
    <div className="chat">
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      <div ref={bottomRef} /> {/* Marqueur pour scroll */}
    </div>
  );
}

/*
   Pattern scroll to bottom :
   - Ref sur élément en bas
   - useEffect scroll au nouveau message
   - Dépendance : messages
*/

// ============================================
// Mutable Values - VALEURS QUI PERSISTENT
// ============================================

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>();

  useEffect(() => {
    prevCountRef.current = count; // Stocker la valeur précédente
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
   POURQUOI useRef pour valeurs ?
   - Stocker une valeur qui PERSISTE entre renders
   - SANS causer de re-render quand elle change
   - Alternative à state pour données non visuelles

   DIFFÉRENCE avec state :
   - useState : change → re-render
   - useRef : change → PAS de re-render

   QUAND utiliser ?
   - Valeur précédente
   - Compteurs internes
   - Flags (isMounted)
   - Instance variables
*/

// Éviter memory leak avec isMounted
function SafeAsyncComponent() {
  const [data, setData] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (isMounted.current) { // Seulement si encore monté
          setData(data);
        }
      });

    return () => {
      isMounted.current = false; // Component unmounted
    };
  }, []);

  return <div>{data}</div>;
}

/*
   isMounted pattern :
   - Éviter setState sur composant unmounted
   - useRef pour flag car pas besoin de re-render
*/

// ============================================
// Interval/Timer avec useRef - RÉFÉRENCES
// ============================================

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number>();

  const start = () => {
    if (intervalRef.current) return; // Déjà démarré

    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  useEffect(() => {
    return () => stop(); // Cleanup au unmount
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

/*
   POURQUOI useRef pour intervalId ?
   - Besoin de garder l'ID pour clearInterval
   - Pas besoin de re-render quand ID change
   - Accès depuis plusieurs fonctions
*/

// ============================================
// useRef vs useState - QUAND UTILISER QUOI
// ============================================

/*
   ✅ Utilisez useState quand :
   - La valeur est affichée dans le JSX
   - Changement doit déclencher un re-render
   - Données visuelles (count, name, isOpen)

   ✅ Utilisez useRef quand :
   - Référence à un élément DOM
   - Valeur qui persiste SANS re-render
   - Données non visuelles (intervalId, previousValue)
   - Instance variables (isMounted, cache)

   💡 RÈGLE :
   - Affiché à l'écran ? → useState
   - Interne seulement ? → useRef
*/
```

### useMemo - MÉMORISATION DE VALEURS

useMemo mémorise le RÉSULTAT d'un calcul coûteux et ne le recalcule que si les dépendances changent.

```tsx
import { useState, useMemo } from 'react';

// ============================================
// Problème : Calculs Coûteux - SANS MEMO
// ============================================

function ExpensiveComponent({ items }: { items: number[] }) {
  const [count, setCount] = useState(0);

  // ❌ Recalculé à CHAQUE render (même si items ne change pas)
  const sum = items.reduce((acc, item) => acc + item, 0);

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
   PROBLÈME :
   - sum recalculé même si items ne change pas
   - Cliquer sur +1 → re-render → sum recalculé
   - Gaspillage si calcul coûteux
*/

// ✅ Solution : useMemo
function OptimizedComponent({ items }: { items: number[] }) {
  const [count, setCount] = useState(0);

  // ✅ Recalculé SEULEMENT si items change
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return items.reduce((acc, item) => acc + item, 0);
  }, [items]); // Dépendances

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
   POURQUOI useMemo ?
   - ÉVITER les calculs coûteux inutiles
   - Mémoriser le résultat
   - Recalculer seulement si dépendances changent

   COMMENT ça marche ?
   - 1er render : calcule et mémorise
   - Re-renders : retourne valeur mémorisée
   - Dépendances changent : recalcule

   QUAND utiliser ?
   - Calculs COÛTEUX (filter, map, reduce sur grandes listes)
   - Transformations de données
   - Génération d'objets complexes
   - Référence d'objet stable pour dépendances

   ⚠️ NE PAS ABUSER :
   - Pas nécessaire pour calculs simples
   - Overhead de mémorisation
   - Utilisez seulement si réel problème de perf
*/

// ============================================
// useMemo pour Référence Stable - ÉVITER RE-RENDERS
// ============================================

function ParentComponent() {
  const [count, setCount] = useState(0);

  // ❌ Nouvel objet à chaque render
  const config = { theme: 'dark', locale: 'fr' };

  // ✅ Même objet sauf si dépendances changent
  const stableConfig = useMemo(() => ({
    theme: 'dark',
    locale: 'fr'
  }), []); // Pas de dépendances = toujours le même objet

  return <ChildComponent config={stableConfig} />;
}

/*
   POURQUOI référence stable ?
   - Objets/arrays créés dans render = nouvelle référence
   - Passé en props → enfant re-render même si valeur identique
   - useMemo garantit même référence

   PATTERN :
   - useMemo pour objets/arrays passés en props
   - Évite re-renders inutiles des enfants
*/

// Exemple avec filtrage
function SearchList({ items, searchTerm }: { items: string[]; searchTerm: string }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <ul>
      {filteredItems.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/*
   Filtrage mémorisé :
   - Ne filtre que si items ou searchTerm change
   - Pas de filtrage si autre state change
*/
```

### useCallback - MÉMORISATION DE FONCTIONS

useCallback mémorise une FONCTION et ne la recrée que si les dépendances changent.

```tsx
import { useState, useCallback, memo } from 'react';

// ============================================
// Problème : Fonctions Recréées - SANS CALLBACK
// ============================================

function ParentBad() {
  const [count, setCount] = useState(0);

  // ❌ Nouvelle fonction à CHAQUE render
  const handleClick = () => {
    console.log('Clicked');
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child onClick={handleClick} />
    </div>
  );
}

const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child render');
  return <button onClick={onClick}>Child Button</button>;
});

/*
   PROBLÈME :
   - handleClick recréée à chaque render de Parent
   - Nouvelle fonction = nouvelle référence
   - Child reçoit nouvelle prop → re-render
   - Même si memo utilisé !

   memo ignore les re-renders si props identiques
   Mais fonction = toujours nouvelle référence
*/

// ✅ Solution : useCallback
function ParentGood() {
  const [count, setCount] = useState(0);

  // ✅ Même fonction sauf si dépendances changent
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Pas de dépendances

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child onClick={handleClick} />
    </div>
  );
}

/*
   POURQUOI useCallback ?
   - MÉMORISER une fonction
   - Même référence entre renders
   - Évite re-renders d'enfants avec memo

   QUAND utiliser ?
   - Fonction passée en props à enfant avec memo
   - Fonction dans dépendances de useEffect
   - Callbacks complexes
   - Event handlers passés à enfants

   ⚠️ NE PAS ABUSER :
   - Inutile si pas passé en props
   - Overhead de mémorisation
*/

// ============================================
// useCallback avec Dépendances - CAPTURES
// ============================================

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fonction dépend de query
  const search = useCallback(() => {
    console.log('Searching for:', query);
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]); // Dépendance : query

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
    </div>
  );
}

/*
   Dépendances de useCallback :
   - Lister toutes les variables utilisées
   - Fonction recréée si dépendances changent
   - Sinon, même fonction
*/

// ============================================
// useCallback vs useMemo - DIFFÉRENCE
// ============================================

function DifferenceExample() {
  const [count, setCount] = useState(0);

  // useMemo : mémorise la VALEUR retournée
  const doubledCount = useMemo(() => {
    return count * 2;
  }, [count]);
  // doubledCount = nombre

  // useCallback : mémorise la FONCTION
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  // increment = fonction

  // Équivalent :
  const incrementMemo = useMemo(() => {
    return () => setCount(c => c + 1);
  }, []);

  return <div>{doubledCount}</div>;
}

/*
   DIFFÉRENCE :
   - useMemo(() => value) : retourne value
   - useCallback(fn) : retourne fn
   - useCallback(fn, deps) = useMemo(() => fn, deps)

   QUAND utiliser quoi ?
   - Valeur calculée → useMemo
   - Fonction → useCallback
*/
```

### Custom Hooks - RÉUTILISER LA LOGIQUE

Custom hooks permettent d'extraire et RÉUTILISER la logique avec état.

```tsx
// ============================================
// Custom Hook Simple - LOGIQUE RÉUTILISABLE
// ============================================

// Hook pour toggle
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse] as const;
}

// Usage
function ModalExample() {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
}

/*
   POURQUOI custom hooks ?
   - RÉUTILISER la logique
   - Composants plus simples
   - Séparer concerns
   - Testable isolément

   CONVENTION :
   - Nom commence par "use" (useToggle, useFetch)
   - Peut utiliser d'autres hooks
   - Retourne valeurs/fonctions utiles
*/

// ============================================
// useFetch - DATA FETCHING RÉUTILISABLE
// ============================================

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserList() {
  const { data: users, loading, error, refetch } = useFetch<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

/*
   useFetch pattern :
   - Encapsule toute la logique de fetch
   - Réutilisable partout
   - States : data, loading, error
   - Fonction refetch

   AVANTAGES :
   - DRY : pas de duplication
   - Testable
   - Facile à améliorer (cache, retry, etc.)
*/

// ============================================
// useLocalStorage - PERSISTENCE
// ============================================

function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initialization
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sauvegarder quand value change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function TodoApp() {
  const [todos, setTodos] = useLocalStorage<string[]>('todos', []);

  const addTodo = (text: string) => {
    setTodos([...todos, text]);
  };

  return <div>...</div>;
}

/*
   useLocalStorage :
   - Synchronise state avec localStorage
   - Persiste automatiquement
   - Charge au mount
*/

// ============================================
// useDebounce - DÉLAI
// ============================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Faire la recherche seulement après 500ms sans changement
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}

/*
   useDebounce :
   - Retarde la mise à jour d'une valeur
   - Utile pour search (pas de requête à chaque touche)
   - Optimisation de performance
*/
```

### Bonnes Pratiques - CONVENTIONS ET ASTUCES

```tsx
/*
   ✅ BONNES PRATIQUES HOOKS :

   1. RÈGLES DES HOOKS (OBLIGATOIRES) :
      - Appeler au TOP LEVEL (pas dans if, loops, nested functions)
      - Appeler dans FUNCTION COMPONENTS ou CUSTOM HOOKS
      - ESLint : eslint-plugin-react-hooks

   2. useEffect :
      - Toujours lister les dépendances
      - Cleanup pour timers, subscriptions, listeners
      - Séparer les concerns (plusieurs effects)
      - [] pour mount seulement

   3. useRef :
      - DOM refs : accès aux éléments
      - Valeurs persistantes sans re-render
      - isMounted, intervalId, previousValue

   4. useMemo/useCallback :
      - NE PAS ABUSER (overhead)
      - Seulement si réel problème de perf
      - useMemo pour valeurs, useCallback pour fonctions
      - Profiler d'abord, optimiser après

   5. CUSTOM HOOKS :
      - Nom commence par "use"
      - Retourne tuple ou objet
      - Documentation claire
      - Testable isolément

   ⚠️ PIÈGES COURANTS :

   1. DÉPENDANCES MANQUANTES :
      ❌ useEffect(() => { console.log(count); }, []);
      ✅ useEffect(() => { console.log(count); }, [count]);

   2. OUBLIER CLEANUP :
      ❌ useEffect(() => { setInterval(...); }, []);
      ✅ useEffect(() => {
           const id = setInterval(...);
           return () => clearInterval(id);
         }, []);

   3. STALE CLOSURE :
      ❌ useEffect(() => {
           setInterval(() => setCount(count + 1), 1000);
         }, []);
      ✅ useEffect(() => {
           setInterval(() => setCount(c => c + 1), 1000);
         }, []);

   4. useEffect BOUCLE INFINIE :
      ❌ useEffect(() => { setCount(count + 1); }); // Pas de deps
      ✅ useEffect(() => { setCount(count + 1); }, []); // Avec deps

   5. RÉFÉRENCE INSTABLE :
      ❌ <Child items={data.filter(x => x.active)} />
      ✅ const filtered = useMemo(() => data.filter(x => x.active), [data]);
         <Child items={filtered} />

   💡 PATTERNS UTILES :

   1. useEffect pour side effects :
      - API calls
      - Subscriptions
      - DOM manipulation
      - Event listeners
      - Timers

   2. useRef pour :
      - DOM access
      - Previous values
      - Instance variables
      - Mutable values sans re-render

   3. useMemo pour :
      - Calculs coûteux
      - Filtrage/tri de grandes listes
      - Références stables d'objets

   4. useCallback pour :
      - Callbacks passés à enfants memo
      - Dépendances de useEffect

   💡 ORDRE D'EXÉCUTION :

   1. Composant render (function body)
   2. React met à jour le DOM
   3. useLayoutEffect (synchrone)
   4. Navigateur paint
   5. useEffect (asynchrone)

   Cleanup :
   - Avant re-run de l'effect
   - Au unmount

   💡 ORGANISATION :
      hooks/
        useToggle.ts
        useFetch.ts
        useLocalStorage.ts
        useDebounce.ts

   💡 QUAND UTILISER QUOI :

   - useState : état local
   - useEffect : side effects
   - useContext : état global
   - useReducer : état complexe
   - useRef : DOM, valeurs persistantes
   - useMemo : valeurs calculées
   - useCallback : fonctions mémorisées
   - Custom hooks : logique réutilisable
*/
```

## 🎯 Exercices

Voir [exercice.tsx](./exercice.tsx) et [correction.tsx](./correction.tsx).
