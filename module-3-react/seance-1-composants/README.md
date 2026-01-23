# Séance 1 : Composants et JSX/TSX

## 📚 Théorie

### Introduction à React - QU'EST-CE QUE REACT ?

React est une bibliothèque JavaScript pour construire des interfaces utilisateur DÉCLARATIVES et basées sur des COMPOSANTS.

```tsx
/*
   POURQUOI React ?
   - COMPOSANTS réutilisables (comme des Lego)
   - Interface DÉCLARATIVE (décrire ce qu'on veut, pas comment)
   - PERFORMANT (Virtual DOM)
   - ÉCOSYSTÈME riche (Next.js, React Native, etc.)
   - POPULAIRE et bien supporté

   COMMENT ça marche ?
   - Virtual DOM : React maintient une copie en mémoire du DOM
   - Quand l'état change, React calcule le DIFF
   - Met à jour SEULEMENT ce qui a changé dans le vrai DOM
   - Optimisations automatiques

   QUAND utiliser React ?
   - Applications web interactives
   - Single Page Applications (SPA)
   - Dashboards, admin panels
   - Applications complexes avec beaucoup d'état

   💡 ANALOGIE :
   React est comme un ARCHITECTE :
   - Vous lui dites CE QUE vous voulez (déclaratif)
   - Il s'occupe du COMMENT (Virtual DOM, optimisations)
   - Résultat : interface performante sans micro-gestion
*/

// Sans React (impératif)
const div = document.createElement('div');
div.textContent = "Hello";
div.className = "greeting";
document.body.appendChild(div);

// Avec React (déclaratif)
function Greeting() {
  return <div className="greeting">Hello</div>;
}

/*
   DÉCLARATIF vs IMPÉRATIF :
   - Impératif : dire COMMENT faire (étape par étape)
   - Déclaratif : dire CE QU'on veut (le résultat)

   React = déclaratif → plus simple, moins de bugs
*/
```

### JSX/TSX - LA SYNTAXE DE REACT

JSX (JavaScript XML) permet d'écrire du HTML dans JavaScript. TSX = JSX + TypeScript.

```tsx
// ============================================
// JSX de base - SYNTAXE FONDAMENTALE
// ============================================

function Welcome() {
  return <h1>Bonjour !</h1>;
}

/*
   POURQUOI JSX ?
   - LISIBLE : ressemble à HTML
   - PUISSANT : toute la puissance de JavaScript
   - TYPE-SAFE : avec TypeScript (TSX)
   - FAMILIER : syntaxe proche du HTML

   COMMENT ça marche ?
   - JSX est COMPILÉ en JavaScript
   - <h1>Hello</h1> devient React.createElement('h1', null, 'Hello')
   - Babel ou TypeScript font la transformation

   QUAND utiliser JSX ?
   - Toujours dans les composants React
   - Alternative : React.createElement (verbeux)
*/

// Ce JSX
const element = <h1 className="title">Hello</h1>;

// Est compilé en
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
);

// ============================================
// Expressions JavaScript dans JSX - {}
// ============================================

function Greeting() {
  const name = "Alice";
  const age = 25;

  return (
    <div>
      <h1>Bonjour {name} !</h1>
      <p>Âge : {age}</p>
      <p>Dans 5 ans : {age + 5}</p>
      <p>{age >= 18 ? "Majeur" : "Mineur"}</p>
    </div>
  );
}

/*
   POURQUOI les accolades {} ?
   - INJECTER du JavaScript dans JSX
   - Afficher des variables, expressions, appels de fonction
   - Rendre le JSX dynamique

   COMMENT ça marche ?
   - Tout ce qui est entre {} est exécuté comme JavaScript
   - Le résultat est affiché dans le JSX
   - Peut être n'importe quelle expression JS

   QUAND utiliser {} ?
   - Afficher des variables : {name}
   - Calculs : {count * 2}
   - Ternaires : {isTrue ? "Oui" : "Non"}
   - Appels de fonction : {getName()}
   - Map pour listes : {items.map(...)}

   ⚠️ ATTENTION :
   - Seulement des EXPRESSIONS (pas de if, for, while)
   - if → ternaire ou &&
   - for → map
*/

function Counter() {
  const count = 5;

  return (
    <div>
      <p>Compte : {count}</p>
      <p>Double : {count * 2}</p>
      <p>Triplet : {count * 3}</p>

      {/* Ternaire OK */}
      <p>{count > 10 ? "Grand" : "Petit"}</p>

      {/* if IMPOSSIBLE */}
      {/* <p>{if (count > 10) "Grand"}</p> ❌ */}
    </div>
  );
}

// ============================================
// Fragments - GROUPER SANS DIV
// ============================================

// Problème : chaque composant doit retourner UN seul élément
function BadComponent() {
  return (
    <h1>Titre</h1>
    <p>Paragraphe</p>
  ); // ❌ Erreur : plusieurs éléments racine
}

// Solution 1 : Wrapper div
function WithDiv() {
  return (
    <div>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </div>
  ); // ✅ OK mais ajoute un div au DOM
}

// Solution 2 : Fragment
function WithFragment() {
  return (
    <>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </>
  ); // ✅ OK et n'ajoute PAS de div au DOM
}

// Fragment avec clé (pour listes)
function ItemList() {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ));
}

/*
   POURQUOI les Fragments ?
   - GROUPER plusieurs éléments sans div supplémentaire
   - Éviter les divs inutiles dans le DOM
   - Meilleure sémantique HTML

   COMMENT ?
   - <></> : syntaxe courte (pas de props)
   - <React.Fragment> : syntaxe longue (accepte key)

   QUAND utiliser ?
   - Retourner plusieurs éléments
   - Éviter des divs superflus
   - Listes avec plusieurs éléments par item
*/

// ============================================
// Différences JSX vs HTML - PIÈGES COURANTS
// ============================================

function JSXDifferences() {
  return (
    <div>
      {/* class → className */}
      <div className="container">✅</div>
      {/* <div class="container">❌</div> */}

      {/* for → htmlFor */}
      <label htmlFor="email">Email :</label>
      {/* <label for="email">❌</label> */}

      {/* Style : objet au lieu de string */}
      <div style={{ color: 'red', fontSize: '16px' }}>✅</div>
      {/* <div style="color: red">❌</div> */}

      {/* camelCase pour attributs */}
      <div onClick={() => {}} tabIndex={0}>✅</div>
      {/* <div onclick="..." tabindex="0">❌</div> */}

      {/* Self-closing tags */}
      <img src="..." alt="..." />
      <br />
      <input type="text" />
      {/* <img src="..."> ❌ Doit être fermé */}

      {/* Commentaires */}
      {/* Ceci est un commentaire JSX */}
      {/* Pas <!-- ceci --> */}
    </div>
  );
}

/*
   POURQUOI ces différences ?
   - JSX est du JAVASCRIPT, pas du HTML
   - "class" est un mot réservé JS → className
   - "for" est un mot réservé JS → htmlFor
   - Cohérence avec JS (camelCase)

   ⚠️ PIÈGES :
   - Oublier className au lieu de class
   - Oublier de fermer les tags auto-fermants
   - Utiliser des strings pour style
*/

// Style inline : objet JavaScript
const titleStyle = {
  color: 'blue',
  fontSize: '24px',
  fontWeight: 'bold',
  // CSS : font-weight
  // JSX : fontWeight (camelCase)
};

function StyledComponent() {
  return <h1 style={titleStyle}>Titre stylé</h1>;
}
```

### Composants - BRIQUES RÉUTILISABLES

Les composants sont les BRIQUES de React. Chaque composant retourne du JSX.

```tsx
// ============================================
// Function Components - FONCTION QUI RETOURNE DU JSX
// ============================================

// Déclaration de fonction
function Welcome() {
  return <h1>Bienvenue !</h1>;
}

// Arrow function
const Greeting = () => {
  return <h1>Bonjour !</h1>;
};

// Arrow function avec return implicite
const Hello = () => <h1>Hello !</h1>;

/*
   POURQUOI des composants ?
   - RÉUTILISABILITÉ : écrire une fois, utiliser partout
   - COMPOSITION : combiner des petits composants en grands
   - ISOLATION : chaque composant a sa logique propre
   - MAINTENABILITÉ : code organisé, facile à débugger

   CONVENTIONS :
   - PascalCase : Welcome, UserProfile, Button
   - Fichier : même nom que le composant (Welcome.tsx)
   - Export : export default Welcome ou export { Welcome }

   💡 RÈGLE D'OR :
   - Un composant = UNE responsabilité
   - Si trop complexe → découper en sous-composants
*/

// ============================================
// Composition de Composants - COMBINER
// ============================================

function Header() {
  return (
    <header>
      <h1>Mon Site</h1>
      <nav>Navigation</nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024</p>
    </footer>
  );
}

function Page() {
  return (
    <div>
      <Header />
      <main>
        <p>Contenu principal</p>
      </main>
      <Footer />
    </div>
  );
}

/*
   POURQUOI la composition ?
   - Construire des UIs COMPLEXES à partir de briques simples
   - Réutiliser Header et Footer partout
   - Chaque composant fait UNE CHOSE bien

   PATTERN :
   - Petits composants simples (Header, Button, Card)
   - Composants moyens (UserProfile, ProductCard)
   - Pages complètes (HomePage, DashboardPage)
*/

// ============================================
// Props - PASSER DES DONNÉES
// ============================================

// Props inline
function WelcomeUser(props: { name: string; age: number }) {
  return (
    <div>
      <h1>Bienvenue {props.name} !</h1>
      <p>Âge : {props.age}</p>
    </div>
  );
}

// Props avec interface (recommandé)
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isAdmin?: boolean; // Optionnel
}

function UserCard(props: UserCardProps) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>Âge : {props.age}</p>
      <p>Email : {props.email}</p>
      {props.isAdmin && <span>👑 Admin</span>}
    </div>
  );
}

// Usage
<UserCard name="Alice" age={25} email="alice@example.com" isAdmin={true} />

/*
   POURQUOI les props ?
   - PERSONNALISER un composant
   - Passer des DONNÉES du parent à l'enfant
   - Rendre les composants RÉUTILISABLES

   COMMENT ?
   - Props = objet passé en paramètre
   - Accès : props.name, props.age, etc.
   - TypeScript : typer avec interface

   QUAND utiliser props ?
   - Données qui changent entre usages
   - Configuration du composant
   - Callbacks (fonctions)

   💡 IMPORTANT :
   - Props sont READ-ONLY (immutables)
   - Ne jamais modifier props.name = "..."
   - Flux de données UNIDIRECTIONNEL (parent → enfant)
*/

// ============================================
// Props Destructuring - PLUS LISIBLE
// ============================================

// Sans destructuring (verbeux)
function UserBadge(props: UserCardProps) {
  return <div>{props.name} - {props.email}</div>;
}

// Avec destructuring (recommandé)
function UserBadgeGood({ name, email, age }: UserCardProps) {
  return <div>{name} - {email}</div>;
}

/*
   POURQUOI destructuring ?
   - MOINS VERBEUX : name au lieu de props.name
   - PLUS LISIBLE : on voit les props utilisées
   - MEILLEURE DX (developer experience)

   PATTERN :
   function Component({ prop1, prop2, prop3 }: Props) {
     // Utiliser prop1, prop2, prop3 directement
   }
*/

// ============================================
// Default Props - VALEURS PAR DÉFAUT
// ============================================

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

function Button({
  text,
  variant = "primary",
  disabled = false
}: ButtonProps) {
  return (
    <button className={variant} disabled={disabled}>
      {text}
    </button>
  );
}

// Usage
<Button text="Cliquez" /> {/* variant="primary", disabled=false */}
<Button text="Supprimer" variant="danger" />
<Button text="Envoyer" disabled={true} />

/*
   POURQUOI des valeurs par défaut ?
   - Props OPTIONNELLES avec comportement par défaut
   - Moins de code dans l'utilisation
   - API plus simple

   COMMENT ?
   - Destructuring avec = : { variant = "primary" }
   - TypeScript : marquer comme optionnel avec ?
*/

// ============================================
// Children Props - CONTENU DYNAMIQUE
// ============================================

interface CardProps {
  title: string;
  children: React.ReactNode; // Type pour children
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="Profil">
  <p>Nom : Alice</p>
  <p>Email : alice@example.com</p>
  <button>Éditer</button>
</Card>

/*
   POURQUOI children ?
   - Passer du CONTENU JSX au composant
   - Composants WRAPPER flexibles
   - Pattern de composition puissant

   COMMENT ?
   - children : React.ReactNode dans les props
   - Tout ce qui est entre <Card>...</Card> devient children

   QUAND utiliser children ?
   - Layout components (Card, Modal, Container)
   - Wrappers (WithAuth, ErrorBoundary)
   - Composition de composants
*/

// ============================================
// Spread Props - TRANSFÉRER TOUTES LES PROPS
// ============================================

interface InputProps {
  label: string;
  error?: string;
  // + toutes les props HTML d'un input
}

function Input({
  label,
  error,
  ...inputProps // Reste des props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} /> {/* Spread */}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Usage
<Input
  label="Email"
  type="email"
  placeholder="votre@email.com"
  required
/>

/*
   POURQUOI spread props ?
   - TRANSFÉRER toutes les props HTML natives
   - Éviter de redéfinir type, placeholder, required, etc.
   - Flexibilité maximale

   PATTERN :
   - ...rest pour capturer les props restantes
   - {...rest} pour les transférer
*/
```

### Rendu Conditionnel - AFFICHER SELON CONDITIONS

```tsx
// ============================================
// if/else - RETOUR CONDITIONNEL
// ============================================

function UserGreeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return <h1>Bienvenue de retour !</h1>;
  }
  return <h1>Veuillez vous connecter</h1>;
}

/*
   POURQUOI if/else ?
   - Logique SIMPLE et LISIBLE
   - Retourner du JSX différent selon condition
   - Early return pattern

   QUAND utiliser if/else ?
   - Deux versions COMPLÈTEMENT différentes
   - Logique de rendu complexe
   - Early returns
*/

// ============================================
// Ternaire - CONDITION INLINE
// ============================================

function Status({ isOnline }: { isOnline: boolean }) {
  return (
    <div>
      <span className={isOnline ? "online" : "offline"}>
        {isOnline ? "🟢 En ligne" : "⚫ Hors ligne"}
      </span>
    </div>
  );
}

/*
   POURQUOI ternaire ?
   - CONCIS pour conditions simples
   - Directement dans le JSX
   - Bon pour classes CSS conditionnelles

   SYNTAXE :
   {condition ? siVrai : siFaux}

   QUAND utiliser ?
   - Petites différences (texte, classe)
   - Conditions simples
   - Préférer if/else si trop complexe
*/

// ============================================
// && Operator - AFFICHER OU NON
// ============================================

function Notification({ hasNotifications, count }: { hasNotifications: boolean; count: number }) {
  return (
    <div>
      {hasNotifications && (
        <div className="notification">
          Vous avez {count} notifications
        </div>
      )}
    </div>
  );
}

/*
   POURQUOI && ?
   - AFFICHER seulement si condition vraie
   - Alternative à ternaire avec null
   - Plus CONCIS que {condition ? <div>...</div> : null}

   COMMENT ça marche ?
   - true && <div> → affiche <div>
   - false && <div> → n'affiche rien

   ⚠️ PIÈGE :
   - 0 && <div> → affiche 0 !
   - Solution : !!count && <div> ou count > 0 && <div>
*/

function BadCount({ count }: { count: number }) {
  return (
    <div>
      {count && <p>Count : {count}</p>}
    </div>
  );
  // Si count = 0 → affiche 0 dans le DOM !
}

function GoodCount({ count }: { count: number }) {
  return (
    <div>
      {count > 0 && <p>Count : {count}</p>}
    </div>
  );
  // Si count = 0 → n'affiche rien ✅
}

// ============================================
// Switch Pattern - MULTIPLES CONDITIONS
// ============================================

type Status = "loading" | "success" | "error";

function StatusMessage({ status }: { status: Status }) {
  // Pattern avec fonction
  const getMessage = () => {
    switch (status) {
      case "loading":
        return <p>Chargement...</p>;
      case "success":
        return <p>✅ Succès !</p>;
      case "error":
        return <p>❌ Erreur</p>;
      default:
        return null;
    }
  };

  return <div>{getMessage()}</div>;
}

// Ou avec objet (pattern avancé)
const STATUS_MESSAGES = {
  loading: <p>Chargement...</p>,
  success: <p>✅ Succès !</p>,
  error: <p>❌ Erreur</p>,
} as const;

function StatusMessageV2({ status }: { status: Status }) {
  return <div>{STATUS_MESSAGES[status]}</div>;
}

/*
   POURQUOI switch/objet ?
   - MULTIPLES conditions (> 3)
   - Plus LISIBLE que chaîne de ternaires
   - Pattern objet = très performant

   QUAND utiliser ?
   - Status d'application (loading, success, error, etc.)
   - Modes/vues différentes
   - Éviter les ternaires imbriqués
*/

// ============================================
// Null Rendering - NE RIEN AFFICHER
// ============================================

function OptionalComponent({ show }: { show: boolean }) {
  if (!show) {
    return null; // N'affiche rien
  }

  return <div>Contenu</div>;
}

/*
   POURQUOI return null ?
   - Ne RIEN afficher
   - Alternative à && ou ternaire
   - Pattern early return

   QUAND utiliser ?
   - Logique complexe avant le rendu
   - Early return pattern
   - Composant optionnel
*/
```

### Listes et Keys - AFFICHER DES COLLECTIONS

```tsx
// ============================================
// map() pour Listes - TRANSFORMER TABLEAU EN JSX
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

function UserList() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

/*
   POURQUOI map() ?
   - TRANSFORMER un tableau de données en tableau de JSX
   - Pattern le plus courant pour les listes
   - Fonctionnel et concis

   COMMENT ?
   - users.map(user => <li>...</li>)
   - Retourne un nouveau tableau de JSX
   - React affiche chaque élément

   QUAND utiliser map() ?
   - Listes de données (users, products, posts)
   - Navigation items
   - Tableaux, cartes, grilles
*/

// ============================================
// Keys - IDENTIFIER LES ÉLÉMENTS
// ============================================

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id} // ✅ IMPORTANT
          product={product}
        />
      ))}
    </div>
  );
}

/*
   POURQUOI les keys ?
   - IDENTIFIER de manière unique chaque élément
   - React sait quel élément a changé/été ajouté/supprimé
   - PERFORMANCE : évite de re-render tout la liste
   - Préserve l'état des composants

   COMMENT choisir une key ?
   - ✅ ID unique et stable : key={item.id}
   - ✅ UUID, database ID
   - ⚠️ Index SEULEMENT si :
     - Liste ne change jamais d'ordre
     - Pas d'ajout/suppression
     - Vraiment aucun ID disponible

   ❌ MAUVAISES keys :
   - Index dans liste dynamique
   - Math.random() (change à chaque render)
   - Valeurs non uniques

   QUAND index est OK :
   - Liste statique (navigation)
   - Ordre ne change jamais
   - Pas d'état dans les items
*/

// ⚠️ DANGER : Index comme key
function BadList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // ⚠️ Problématique si liste change
      ))}
    </ul>
  );
}

/*
   PROBLÈME avec index :
   - Si vous supprimez item[1], tous les indices changent
   - React pense que item[2] est devenu item[1]
   - Peut causer des bugs d'état
   - Performance dégradée

   Exemple :
   [A, B, C] avec index [0, 1, 2]
   Supprimer B
   [A, C] avec index [0, 1]
   React pense que C est un NOUVEL élément avec index 1
*/

// ✅ BON : ID unique comme key
function GoodList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li> // ✅ ID stable
      ))}
    </ul>
  );
}

// ============================================
// Listes Vides - GESTION
// ============================================

function UserListWithEmpty({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p>Aucun utilisateur</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Ou inline
function UserListInline({ users }: { users: User[] }) {
  return (
    <div>
      {users.length === 0 ? (
        <p>Aucun utilisateur</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*
   POURQUOI gérer les listes vides ?
   - EXPÉRIENCE UTILISATEUR
   - Éviter un écran vide
   - Message explicite

   PATTERN :
   - Early return si vide
   - Ou ternaire pour message alternatif
*/
```

### Events - GÉRER LES INTERACTIONS

```tsx
// ============================================
// Event Handlers - GÉRER LES CLICS, INPUTS, ETC.
// ============================================

function ButtonExample() {
  const handleClick = () => {
    console.log("Bouton cliqué !");
  };

  return (
    <button onClick={handleClick}>
      Cliquez-moi
    </button>
  );
}

// Inline handler (simple)
function InlineExample() {
  return (
    <button onClick={() => console.log("Cliqué")}>
      Cliquer
    </button>
  );
}

/*
   POURQUOI event handlers ?
   - RÉAGIR aux interactions utilisateur
   - Clics, saisies, soumissions, etc.
   - Cœur de l'interactivité

   SYNTAXE :
   - onClick={handleClick} : passe la fonction
   - onClick={() => ...} : fonction inline
   - ❌ onClick={handleClick()} : appelle immédiatement (erreur)

   QUAND inline vs fonction ?
   - Inline : logique très simple (1 ligne)
   - Fonction : logique complexe, réutilisable
*/

// ============================================
// Event avec Paramètres - PASSER DES DONNÉES
// ============================================

function ItemList({ items }: { items: Item[] }) {
  const handleDelete = (id: string) => {
    console.log("Supprimer item", id);
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

/*
   POURQUOI arrow function ?
   - PASSER des paramètres au handler
   - onClick={() => handleDelete(id)}
   - Sans arrow : handleDelete s'exécute immédiatement

   ❌ onClick={handleDelete(id)} : s'exécute au render
   ✅ onClick={() => handleDelete(id)} : s'exécute au clic
*/

// ============================================
// Synthetic Events - ÉVÉNEMENTS REACT
// ============================================

function InputExample() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Valeur :", event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche rechargement de page
    console.log("Formulaire soumis");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">Envoyer</button>
    </form>
  );
}

/*
   POURQUOI Synthetic Events ?
   - React NORMALISE les événements entre navigateurs
   - API cohérente
   - Performance (event pooling)

   TYPES courants :
   - React.ChangeEvent<HTMLInputElement> : onChange input
   - React.FormEvent<HTMLFormElement> : onSubmit form
   - React.MouseEvent<HTMLButtonElement> : onClick button
   - React.KeyboardEvent : onKeyDown, onKeyPress

   event.preventDefault() :
   - Empêche comportement par défaut
   - Formulaire : empêche rechargement
   - Lien : empêche navigation
*/

// ============================================
// Event Types - TYPAGE TYPESCRIPT
// ============================================

interface FormProps {
  onSubmit: (data: { name: string; email: string }) => void;
}

function Form({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" />
      <input name="email" type="email" />
      <button type="submit">Envoyer</button>
    </form>
  );
}

/*
   POURQUOI typer les events ?
   - TYPE SAFETY
   - Autocomplétion
   - Éviter les erreurs

   PATTERN :
   - React.FormEvent, React.ChangeEvent, etc.
   - e.currentTarget pour accéder au formulaire
*/
```

### Style - STYLISER LES COMPOSANTS

```tsx
// ============================================
// Inline Styles - STYLE DIRECTEMENT
// ============================================

function InlineStyleExample() {
  const titleStyle = {
    color: 'blue',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div>
      <h1 style={titleStyle}>Titre</h1>
      <p style={{ color: 'red', margin: '10px' }}>Texte</p>
    </div>
  );
}

/*
   POURQUOI inline styles ?
   - Style DYNAMIQUE basé sur props/état
   - Scope au composant
   - Pas de fichier CSS séparé

   ⚠️ INCONVÉNIENTS :
   - Pas de :hover, :focus, media queries
   - Moins performant que CSS
   - Verbeux pour beaucoup de styles

   QUAND utiliser ?
   - Styles très dynamiques
   - Prototypage rapide
   - Styles conditionnels simples
*/

// ============================================
// CSS Classes - APPROCHE CLASSIQUE
// ============================================

function ClassExample() {
  return (
    <div className="container">
      <h1 className="title">Titre</h1>
      <p className="description">Description</p>
    </div>
  );
}

/*
   POURQUOI classes CSS ?
   - Séparation style/logique
   - Réutilisabilité
   - :hover, :focus, media queries
   - Performance

   FICHIER CSS :
   .container { ... }
   .title { ... }
*/

// ============================================
// Conditional Classes - CLASSES DYNAMIQUES
// ============================================

function Button({ variant, disabled }: { variant: "primary" | "secondary"; disabled: boolean }) {
  // Ternaire simple
  return (
    <button className={disabled ? "button-disabled" : `button-${variant}`}>
      Cliquer
    </button>
  );
}

// Template literal (plusieurs classes)
function Card({ highlighted, large }: { highlighted: boolean; large: boolean }) {
  return (
    <div className={`card ${highlighted ? 'card-highlighted' : ''} ${large ? 'card-large' : ''}`}>
      Contenu
    </div>
  );
}

// Avec classnames library (recommandé)
import classNames from 'classnames';

function CardWithClassNames({ highlighted, large }: { highlighted: boolean; large: boolean }) {
  return (
    <div className={classNames('card', {
      'card-highlighted': highlighted,
      'card-large': large,
    })}>
      Contenu
    </div>
  );
}

/*
   POURQUOI classes conditionnelles ?
   - Styles DYNAMIQUES selon état/props
   - Variants de composants
   - États (hover, active, disabled)

   PATTERN :
   - Ternaire : simple condition
   - Template literal : plusieurs classes
   - classNames lib : le plus lisible
*/
```

### Bonnes Pratiques - CONVENTIONS ET ASTUCES

```tsx
/*
   ✅ BONNES PRATIQUES COMPOSANTS :

   1. NOMMAGE :
      - PascalCase : UserProfile, Button, Card
      - Descriptif : UserList pas List
      - Cohérent avec le fichier : UserProfile.tsx

   2. STRUCTURE :
      - Une responsabilité par composant
      - Si > 200 lignes → découper
      - Props interface en haut du fichier

   3. PROPS :
      - Interface pour typer les props
      - Destructuring dans signature
      - Valeurs par défaut pour optionnels
      - children pour contenu dynamique

   4. RENDU CONDITIONNEL :
      - Early return pour cas simples
      - Ternaire pour petites différences
      - && pour affichage conditionnel
      - Objet/switch pour multiples conditions

   5. LISTES :
      - Toujours une key UNIQUE et STABLE
      - Préférer ID à index
      - Gérer le cas liste vide

   6. EVENTS :
      - Fonctions nommées pour logique complexe
      - Inline pour logique très simple
      - Typer les événements (TypeScript)
      - preventDefault pour formulaires

   7. STYLE :
      - CSS classes en priorité
      - Inline seulement pour styles dynamiques
      - classNames library pour classes conditionnelles
      - CSS Modules pour scope

   ⚠️ PIÈGES COURANTS :

   1. OUBLIER KEY dans les listes :
      ❌ {items.map(item => <li>...</li>)}
      ✅ {items.map(item => <li key={item.id}>...</li>)}

   2. MODIFIER LES PROPS :
      ❌ props.name = "Bob"
      ✅ Props sont read-only !

   3. APPELER HANDLER AU LIEU DE PASSER :
      ❌ onClick={handleClick()} // S'exécute immédiatement
      ✅ onClick={handleClick}

   4. OUBLIER className :
      ❌ <div class="container">
      ✅ <div className="container">

   5. INDEX COMME KEY :
      ❌ {items.map((item, i) => <li key={i}>...)}
      ✅ {items.map(item => <li key={item.id}>...)}

   6. && avec 0 :
      ❌ {count && <div>Count</div>} // Affiche 0 si count = 0
      ✅ {count > 0 && <div>Count</div>}

   💡 PATTERNS UTILES :

   1. Container/Presentational :
      - Container : logique, état
      - Presentational : affichage pur

   2. Composition :
      - Préférer composition à héritage
      - children pour flexibilité

   3. Props spread :
      - {...props} pour transférer props HTML

   4. Conditional rendering :
      - Early return pour simplicité
      - Ternaire dans JSX pour petites différences

   💡 ORGANISATION FICHIERS :
      components/
        Button/
          Button.tsx
          Button.module.css
          Button.test.tsx
        UserCard/
          UserCard.tsx
          UserCard.module.css
*/
```

## 🎯 Exercices

Voir les fichiers d'exemples dans ce dossier.
