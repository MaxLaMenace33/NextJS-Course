# Séance 6 : Tips Avancés JavaScript

## 📚 Théorie

### Optional Chaining (?.)

L'optional chaining permet d'accéder à des propriétés imbriquées sans risquer d'erreur si une propriété n'existe pas.

```javascript
// Sans optional chaining - L'ANCIEN PROBLÈME
const user = {
  name: "Alice",
  address: {
    city: "Paris"
  }
};

// ❌ DANGER : Risque d'erreur si address n'existe pas
// const city = user.address.city;
// Si user.address est undefined → TypeError: Cannot read property 'city' of undefined

// ✅ Vérifications manuelles (verbose et répétitif)
const city = user && user.address && user.address.city;

/*
   PROBLÈME de l'ancienne méthode :
   - Code RÉPÉTITIF et VERBEUX
   - Difficile à LIRE : beaucoup de &&
   - ERREUR fréquente : oublier une vérification
   - Ne scale PAS bien : user?.a?.b?.c?.d?.e devient horrible
*/

// ✅ Avec optional chaining (moderne et élégant)
const cityModern = user?.address?.city;
// Retourne undefined si une propriété n'existe pas

/*
   POURQUOI l'optional chaining (?.) ?
   - Éviter les ERREURS "Cannot read property of undefined"
   - Code plus CONCIS et LISIBLE
   - Gérer les données OPTIONNELLES facilement
   - Standard MODERNE (ES2020)

   COMMENT ça marche ?
   - user?.address?.city vérifie chaque niveau
   - Si user est null/undefined → retourne undefined (pas d'erreur)
   - Si user.address est null/undefined → retourne undefined
   - Sinon → retourne user.address.city

   Équivalent à :
   user === null || user === undefined ? undefined :
   user.address === null || user.address === undefined ? undefined :
   user.address.city

   QUAND l'utiliser ?
   - Données d'API potentiellement incomplètes
   - Propriétés optionnelles dans des objets
   - Éviter des vérifications if multiples
   - Accéder à des données imbriquées profondes

   ⚠️ ATTENTION :
   - Retourne undefined (pas null)
   - N'utilise PAS pour des propriétés qui DOIVENT exister
   - Si undefined est une valeur valide, combiné avec ?? (nullish coalescing)
*/

// Cas d'usage - Données manquantes
const user2 = { name: "Bob" }; // Pas d'address
console.log(user2?.address?.city); // undefined (pas d'erreur ✅)

// Sans optional chaining
console.log(user2.address.city); // ❌ TypeError!

/*
   💡 PRATIQUE : Données d'API
   const response = await fetch('/api/user');
   const data = await response.json();

   // L'API peut ne pas retourner address
   const city = data?.user?.address?.city ?? "Non spécifié";
*/

// Avec des tableaux - ACCÈS SÉCURISÉ aux indices
const users = [{ name: "Alice" }, { name: "Bob" }];
console.log(users?.[0]?.name); // "Alice"
console.log(users?.[5]?.name); // undefined (pas d'erreur)

/*
   POURQUOI avec les tableaux ?
   - Accéder à des indices qui peuvent ne PAS exister
   - Éviter "Cannot read property 'name' of undefined"

   COMMENT ça marche ?
   - users?.[5] vérifie si users[5] existe
   - Si undefined → retourne undefined
   - Sinon → continue avec .name

   QUAND l'utiliser ?
   - Accéder à des éléments de tableau sans connaître la longueur
   - Tableaux potentiellement vides
   - Données de pagination où la page peut ne pas exister
*/

// Avec des fonctions - APPEL SÉCURISÉ
const obj = {
  greet: () => "Hello"
};
console.log(obj.greet?.()); // "Hello"
console.log(obj.sayBye?.()); // undefined (pas d'erreur)

/*
   POURQUOI avec les fonctions ?
   - Appeler une fonction qui peut ne PAS exister
   - Éviter "obj.sayBye is not a function"

   COMMENT ça marche ?
   - obj.sayBye?.() vérifie si sayBye existe ET est une fonction
   - Si non → retourne undefined
   - Si oui → appelle la fonction

   QUAND l'utiliser ?
   - Callbacks optionnels : options.onSuccess?.()
   - Event handlers : element.onClick?.()
   - Méthodes qui peuvent ne pas être implémentées

   💡 EXEMPLE pratique - Callbacks optionnels :
   function processData(data, options = {}) {
     const result = transform(data);
     options.onSuccess?.(result); // Appelle seulement si défini
     return result;
   }

   processData(data); // Pas de callback, pas d'erreur
   processData(data, { onSuccess: (r) => console.log(r) }); // Callback appelé
*/
```

### Nullish Coalescing (??)

Le nullish coalescing fournit une valeur par défaut UNIQUEMENT si la valeur est `null` ou `undefined`.

```javascript
// Avec || - L'ANCIEN PROBLÈME
const count = 0;
const result1 = count || 10; // 10 (❌ 0 est considéré comme falsy)

/*
   PROBLÈME avec || :
   - || considère TOUTES les valeurs falsy : 0, "", false, null, undefined, NaN
   - Impossible de distinguer "pas de valeur" (null/undefined) de "valeur 0"
   - 0, "", false sont souvent des VALEURS VALIDES !
*/

// Avec ?? - LA SOLUTION MODERNE
const result2 = count ?? 10; // 0 (✅ 0 est une valeur valide)

/*
   POURQUOI le nullish coalescing (??) ?
   - Traite UNIQUEMENT null et undefined comme "pas de valeur"
   - 0, "", false sont considérés comme des VALEURS VALIDES
   - Plus PRÉCIS et INTENTIONNEL que ||

   COMMENT ça marche ?
   - valeur ?? défaut retourne :
     • défaut si valeur est null OU undefined
     • valeur dans tous les autres cas (même 0, "", false)

   DIFFÉRENCE CRUCIALE avec || :
   || → retourne la première valeur TRUTHY
   ?? → retourne la première valeur NON-NULLISH (≠ null/undefined)

   QUAND l'utiliser ?
   - Valeurs par défaut où 0, "", false sont valides
   - Configurations avec valeurs numériques (count: 0)
   - Chaînes vides intentionnelles (name: "")
   - Booléens false intentionnels (isActive: false)
*/

// Exemples exhaustifs - COMPORTEMENT DÉTAILLÉ
const value1 = null ?? "défaut"; // "défaut" (null → utilise défaut)
const value2 = undefined ?? "défaut"; // "défaut" (undefined → utilise défaut)
const value3 = "" ?? "défaut"; // "" (chaîne vide est valide ✅)
const value4 = 0 ?? "défaut"; // 0 (zéro est valide ✅)
const value5 = false ?? "défaut"; // false (false est valide ✅)
const value6 = NaN ?? "défaut"; // NaN (NaN est une valeur ✅)

/*
   COMPARAISON || vs ?? :

   AVEC || (ancien) :
   0 || 10        → 10  (0 est falsy)
   "" || "text"   → "text" ("" est falsy)
   false || true  → true (false est falsy)

   AVEC ?? (moderne) :
   0 ?? 10        → 0   (0 est valide)
   "" ?? "text"   → ""  ("" est valide)
   false ?? true  → false (false est valide)

   💡 MÉMO :
   - || → "première valeur truthy"
   - ?? → "première valeur qui existe (≠ null/undefined)"
*/

// CAS D'USAGE PRATIQUE - Configuration avec valeurs numériques
function loadConfig(options) {
  const config = {
    timeout: options.timeout ?? 5000,      // 0 est valide
    retries: options.retries ?? 3,         // 0 retries = pas de retry
    verbose: options.verbose ?? false,     // false est valide
    name: options.name ?? "default"        // "" est valide
  };
  return config;
}

loadConfig({ timeout: 0 });
// { timeout: 0, retries: 3, verbose: false, name: "default" }
// timeout: 0 est CONSERVÉ (avec || ce serait 5000)

loadConfig({ verbose: false });
// { timeout: 5000, retries: 3, verbose: false, name: "default" }
// verbose: false est CONSERVÉ (avec || ce serait true)

// Combiner avec optional chaining - LE COMBO PARFAIT
const user = { name: "Alice" };
const city = user?.address?.city ?? "Ville non définie";

/*
   POURQUOI ce combo est puissant ?
   - ?. gère les propriétés manquantes → retourne undefined
   - ?? fournit une valeur par défaut pour null/undefined

   COMMENT ça fonctionne ensemble ?
   1. user?.address?.city tente d'accéder à la propriété
   2. Si undefined (propriété manquante) → ?? fournit le défaut
   3. Si la valeur existe → la retourne même si "", 0, false

   QUAND utiliser ce combo ?
   - Données d'API avec propriétés optionnelles
   - Objets de configuration incomplets
   - Valeurs imbriquées avec fallback

   💡 EXEMPLE pratique - Données d'API :
   const response = await fetch('/api/user');
   const data = await response.json();

   const userName = data?.user?.profile?.displayName ?? "Utilisateur";
   const age = data?.user?.age ?? 18;
   const bio = data?.user?.bio ?? "Pas de bio";

   ⚠️ ATTENTION :
   - Ne pas confondre avec || dans ce cas
   - Si bio = "" (intentionnel) → || retournerait "Pas de bio" (incorrect)
   - Avec ?? → "" est conservé (correct)
*/
```

### Template Literals (Littéraux de gabarits)

Les template literals permettent d'intégrer des variables et expressions directement dans les chaînes.

```javascript
// Interpolation de variables - INTÉGRATION SIMPLE
const name = "Alice";
const age = 25;
const message = `Bonjour ${name}, vous avez ${age} ans`;
// "Bonjour Alice, vous avez 25 ans"

/*
   POURQUOI les template literals ?
   - Intégrer des VARIABLES facilement dans les chaînes
   - Plus LISIBLE que la concaténation
   - Supporter les chaînes MULTI-LIGNES nativement
   - Standard MODERNE (ES6)

   ANCIENNE MÉTHODE (concaténation) :
   const message = "Bonjour " + name + ", vous avez " + age + " ans";
   // ❌ Difficile à lire, erreurs fréquentes avec les espaces

   NOUVELLE MÉTHODE (template literals) :
   const message = `Bonjour ${name}, vous avez ${age} ans`;
   // ✅ Lisible, clair, moins d'erreurs

   COMMENT ça marche ?
   - Utilisez des BACKTICKS ` au lieu de quotes " ou '
   - ${expression} insère la valeur de l'expression
   - L'expression est ÉVALUÉE puis CONVERTIE en chaîne

   QUAND l'utiliser ?
   - Messages avec variables
   - Construction d'URLs, chemins
   - Génération de HTML/SQL/JSON
   - Logs et messages d'erreur
*/

// Expressions - CALCULS DIRECTS dans la chaîne
const price = 99.99;
const quantity = 3;
const total = `Total: ${price * quantity}€`;
// "Total: 299.97€"

/*
   POURQUOI évaluer des expressions ?
   - Effectuer des CALCULS directement dans la chaîne
   - Appeler des FONCTIONS inline
   - Éviter les variables intermédiaires

   COMMENT ça marche ?
   - ${expression} peut contenir N'IMPORTE QUELLE expression JavaScript
   - Calculs : ${a + b}, ${x * 2}
   - Ternaires : ${condition ? "oui" : "non"}
   - Appels de fonction : ${getData()}
   - Accès propriétés : ${user.name}

   💡 EXEMPLES d'expressions :
   ${price * quantity}              // Calcul
   ${age >= 18 ? "Majeur" : "Mineur"}  // Ternaire
   ${items.length}                  // Propriété
   ${calculateTotal()}              // Fonction
   ${user?.name ?? "Anonyme"}       // Optional chaining + nullish coalescing
*/

// Multi-lignes - FORMATAGE NATUREL
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
  </div>
`;

/*
   POURQUOI multi-lignes ?
   - Écrire du HTML, JSON, SQL facilement
   - Respecter L'INDENTATION naturellement
   - Pas besoin de \n ou de concaténation

   ANCIENNE MÉTHODE :
   const html = "<div class=\"card\">\n" +
                "  <h2>" + name + "</h2>\n" +
                "  <p>Age: " + age + "</p>\n" +
                "</div>";
   // ❌ Illisible, échappement des quotes, gestion manuelle de \n

   NOUVELLE MÉTHODE :
   const html = `
     <div class="card">
       <h2>${name}</h2>
     </div>
   `;
   // ✅ Lisible, naturel, respecte l'indentation

   QUAND l'utiliser ?
   - Génération de HTML (emails, templates)
   - Requêtes SQL multi-lignes
   - Configuration JSON/YAML
   - Messages d'erreur détaillés

   ⚠️ ATTENTION :
   - Les espaces et retours à la ligne sont INCLUS dans la chaîne
   - L'indentation est préservée
   - Peut créer des espaces non désirés
*/

// Avec des fonctions - APPELS INLINE
const greeting = `Bonjour ${name.toUpperCase()}`;
// "Bonjour ALICE"

/*
   POURQUOI appeler des fonctions ?
   - TRANSFORMER les données directement
   - FORMATER les valeurs (dates, nombres, texte)
   - Éviter les variables temporaires

   💡 EXEMPLES pratiques :
   `Date: ${new Date().toLocaleDateString()}`
   `Prix: ${price.toFixed(2)}€`
   `Nom: ${name.trim().toUpperCase()}`
   `URL: ${encodeURIComponent(query)}`
*/

// Tagged templates (avancé) - TRAITEMENT PERSONNALISÉ
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return `${acc}${str}<mark>${values[i] || ''}</mark>`;
  }, '');
}

const highlighted = highlight`Prix: ${price}€, Quantité: ${quantity}`;
// "Prix: <mark>99.99</mark>€, Quantité: <mark>3</mark>"

/*
   POURQUOI les tagged templates ?
   - Traitement PERSONNALISÉ des chaînes et valeurs
   - Créer des DSL (Domain Specific Languages)
   - Sanitizer du HTML, SQL injection prevention
   - Internationalisation (i18n)

   COMMENT ça marche ?
   - functionName`template` appelle functionName(strings, ...values)
   - strings = tableau des parties littérales
   - values = tableau des valeurs interpolées

   Exemple breakdown :
   highlight`Prix: ${price}€, Quantité: ${quantity}`

   strings = ["Prix: ", "€, Quantité: ", ""]
   values = [99.99, 3]

   QUAND l'utiliser ?
   - styled-components en React : const Button = styled.div`...`
   - Requêtes SQL sécurisées : sql`SELECT * FROM users WHERE id = ${id}`
   - Internationalisation : i18n`Hello ${name}`
   - Validation et sanitization

   💡 EXEMPLES de bibliothèques utilisant tagged templates :
   - styled-components : css`color: ${props => props.color};`
   - graphql-tag : gql`query { users { id name } }`
   - lit-html : html`<div>${content}</div>`
*/

// BONUS : Cas d'usage pratiques
// 1. Construction d'URL
const userId = 123;
const endpoint = `https://api.example.com/users/${userId}/profile`;

// 2. Queries SQL (attention aux injections !)
const query = `
  SELECT *
  FROM users
  WHERE age > ${age}
  LIMIT 10
`;

// 3. Messages d'erreur détaillés
const error = new Error(`
  Échec de la requête API
  URL: ${endpoint}
  Statut: ${response.status}
  Message: ${response.statusText}
`);

// 4. Génération de JSON
const json = `{
  "name": "${name}",
  "age": ${age},
  "timestamp": "${Date.now()}"
}`;

/*
   ⚠️ SÉCURITÉ :
   - JAMAIS interpoler directement des données utilisateur dans SQL
   - Utilisez des requêtes préparées ou des ORM
   - JAMAIS interpoler HTML non sanitizé (risque XSS)
   - Échapper les données avant de les insérer

   ✅ BON (sécurisé) :
   db.query('SELECT * FROM users WHERE id = ?', [userId]);

   ❌ MAUVAIS (injection SQL) :
   db.query(`SELECT * FROM users WHERE id = ${userId}`);
*/
```

### Short-Circuit Evaluation (Évaluation en court-circuit)

L'évaluation en court-circuit exploite le comportement de && et || pour écrire du code concis.

```javascript
// && (AND) : retourne la première valeur falsy OU la dernière valeur
true && "Hello"; // "Hello" (true est truthy → continue → retourne "Hello")
false && "Hello"; // false (false est falsy → STOP → retourne false)
null && "Hello"; // null (null est falsy → STOP → retourne null)
"test" && "Hello"; // "Hello" (les deux sont truthy → retourne le dernier)

/*
   POURQUOI && en short-circuit ?
   - Exécuter du code CONDITIONNELLEMENT sans if
   - Vérifier l'EXISTENCE avant d'accéder
   - Code plus CONCIS (pattern en React)

   COMMENT && fonctionne ?
   - Évalue de GAUCHE à DROITE
   - Si une valeur est FALSY → STOP et retourne cette valeur
   - Si TOUTES sont truthy → retourne la DERNIÈRE valeur

   Valeurs FALSY : false, 0, "", null, undefined, NaN

   Comportement détaillé :
   a && b
   → Si a est falsy : retourne a (ne regarde même pas b)
   → Si a est truthy : retourne b

   a && b && c
   → Retourne la première falsy OU c si toutes truthy

   QUAND utiliser && ?
   - Exécution conditionnelle : condition && action()
   - Rendu conditionnel React : {isVisible && <Component />}
   - Vérifications d'existence : obj && obj.method()
*/

// Utilisation pratique - Exécuter du code conditionnellement
const isLoggedIn = true;
isLoggedIn && console.log("Bienvenue"); // Affiche "Bienvenue"

const isLoggedOut = false;
isLoggedOut && console.log("Au revoir"); // N'affiche rien (short-circuit)

/*
   POURQUOI cette syntaxe ?
   - Alternative CONCISE à if (condition) { action(); }
   - Une seule ligne au lieu de trois
   - Pattern très utilisé en React

   ÉQUIVALENT avec if :
   if (isLoggedIn) {
     console.log("Bienvenue");
   }

   ÉQUIVALENT avec && :
   isLoggedIn && console.log("Bienvenue");

   ⚠️ ATTENTION :
   - Utilisez seulement pour des actions SIMPLES
   - Pour du code complexe, préférez if pour la lisibilité
   - En React, attention aux nombres : {count && <div>{count}</div>}
     Si count = 0 → affiche "0" au lieu de rien !
     Solution : {count > 0 && <div>{count}</div>}
*/

// || (OR) : retourne la première valeur truthy OU la dernière valeur
false || "défaut"; // "défaut" (false est falsy → continue → retourne "défaut")
true || "défaut"; // true (true est truthy → STOP → retourne true)
"valeur" || "défaut"; // "valeur" ("valeur" est truthy → STOP → retourne "valeur")
null || undefined || "défaut"; // "défaut" (les deux premiers sont falsy)
null || undefined || 0; // 0 (tous falsy → retourne le dernier)

/*
   POURQUOI || en short-circuit ?
   - Fournir des VALEURS PAR DÉFAUT
   - Choisir la première valeur VALIDE
   - Éviter null/undefined

   COMMENT || fonctionne ?
   - Évalue de GAUCHE à DROITE
   - Si une valeur est TRUTHY → STOP et retourne cette valeur
   - Si TOUTES sont falsy → retourne la DERNIÈRE valeur

   Comportement détaillé :
   a || b
   → Si a est truthy : retourne a (ne regarde même pas b)
   → Si a est falsy : retourne b

   a || b || c
   → Retourne la première truthy OU c si toutes falsy

   QUAND utiliser || ?
   - Valeurs par défaut (MAIS préférez ?? pour 0, "", false)
   - Fallback multiples : value1 || value2 || value3 || default
   - Chaîner des options

   ⚠️ PROBLÈME avec || :
   - Considère 0, "", false comme "pas de valeur"
   - Utilisez ?? si ces valeurs sont valides !
*/

// Utilisation pratique - Valeur par défaut
const username = "" || "Invité"; // "Invité"

/*
   ⚠️ PROBLÈME ici :
   - "" est une chaîne vide VALIDE
   - Mais || considère "" comme falsy
   - Donc "" est remplacé par "Invité"

   SOLUTION MODERNE :
   const username = "" ?? "Invité"; // "" (conservé)
   - ?? traite seulement null/undefined comme "pas de valeur"
*/

// COMPARAISON COMPLÈTE : && vs || vs ??
const a = null;
const b = 0;
const c = "";
const d = "valeur";

// && : retourne première falsy ou dernière
d && b; // 0 (d est truthy → continue → retourne b)
a && d; // null (a est falsy → STOP → retourne a)

// || : retourne première truthy ou dernière
a || b || c || d; // "valeur" (première truthy)
a || b || c; // "" (toutes falsy → retourne dernière)

// ?? : retourne première non-nullish ou dernière
a ?? b ?? c ?? d; // 0 (première non-nullish)
b ?? c ?? d; // 0 (b n'est pas nullish)
a ?? undefined ?? d; // "valeur" (première non-nullish)

/*
   PATTERNS PRATIQUES :

   1. Valeur par défaut (préférez ??) :
   const value = userInput ?? defaultValue;

   2. Exécution conditionnelle :
   isReady && startProcess();

   3. Fallback cascade :
   const value = primarySource || secondarySource || fallback;

   4. Vérification d'existence :
   obj && obj.method && obj.method();
   // Mieux avec optional chaining : obj?.method?.()

   5. Valeur par défaut multiple :
   const name = user?.name || profile?.displayName || "Anonyme";

   💡 MÉMO :
   - && → "si truthy, continue"
   - || → "si falsy, continue"
   - ?? → "si nullish, continue"
*/

// EXEMPLES AVANCÉS
// 1. Guard clauses avec &&
function processUser(user) {
  user && user.isActive && user.hasPermission && doSomething(user);
  // Équivalent : if (user && user.isActive && user.hasPermission) { doSomething(user); }
}

// 2. Configuration avec fallbacks multiples
const config = {
  apiUrl: process.env.API_URL || localConfig.apiUrl || "http://localhost:3000",
  timeout: process.env.TIMEOUT || 5000
};

// 3. Rendu conditionnel React
function UserProfile({ user }) {
  return (
    <div>
      {user && user.isVerified && <Badge>Vérifié</Badge>}
      {user?.isPremium && <Crown />}
    </div>
  );
}

/*
   ⚠️ PIÈGES COURANTS :

   1. Confusion && avec if
   // ❌ Mauvais (retourne une valeur inutile)
   const result = condition && calculateSomething();

   // ✅ Bon (si vous avez besoin du résultat)
   const result = condition ? calculateSomething() : null;

   2. || avec des valeurs 0 ou ""
   // ❌ Problème
   const count = 0;
   const display = count || "Aucun"; // "Aucun" (incorrect si 0 est valide)

   // ✅ Solution
   const display = count ?? "Aucun"; // 0 (correct)

   3. && en React avec des nombres
   // ❌ Affiche "0" quand count = 0
   {count && <div>{count} items</div>}

   // ✅ Affiche rien quand count = 0
   {count > 0 && <div>{count} items</div>}
*/
```

### Array Methods Avancés

Méthodes modernes et puissantes pour manipuler les tableaux.

```javascript
// flat() : aplatir un tableau (flatten)
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]] (profondeur 1 par défaut)
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6] (profondeur 2)
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6] (aplatit tout)

/*
   POURQUOI flat() ?
   - APLATIR des tableaux imbriqués (nested arrays)
   - Simplifier des structures complexes
   - Nettoyer des résultats d'API avec tableaux de tableaux

   COMMENT ça marche ?
   - flat() prend un argument : la PROFONDEUR d'aplatissement
   - Profondeur 1 (défaut) : aplatit un niveau
   - Profondeur 2 : aplatit deux niveaux
   - Infinity : aplatit TOUS les niveaux

   Exemple pas à pas :
   [1, [2, 3], [4, [5, 6]]].flat()
   → [1, 2, 3, 4, [5, 6]]  // Aplatit le 1er niveau seulement

   [1, [2, 3], [4, [5, 6]]].flat(2)
   → [1, 2, 3, 4, 5, 6]    // Aplatit 2 niveaux

   QUAND l'utiliser ?
   - Parser des données imbriquées d'API
   - Fusionner des résultats de Promise.all() imbriqués
   - Nettoyer des structures de données complexes

   💡 EXEMPLE pratique :
   const categories = [
     { items: [1, 2, 3] },
     { items: [4, 5] },
     { items: [6] }
   ];
   const allItems = categories.map(c => c.items).flat();
   // [1, 2, 3, 4, 5, 6]
*/

// flatMap() : map + flat en UNE SEULE opération
const sentences = ["Hello world", "How are you"];
const words = sentences.flatMap(s => s.split(" "));
// ["Hello", "world", "How", "are", "you"]

/*
   POURQUOI flatMap() ?
   - Combiner MAP et FLAT en une seule opération
   - Plus PERFORMANT que .map().flat()
   - Cas d'usage : transformer ET aplatir

   COMMENT ça marche ?
   - Applique la fonction de mapping
   - Aplatit le résultat d'UN NIVEAU automatiquement
   - Équivalent à : array.map(fn).flat(1)

   Exemple pas à pas :
   ["Hello world", "How are you"].flatMap(s => s.split(" "))

   1. map() : [["Hello", "world"], ["How", "are", "you"]]
   2. flat() : ["Hello", "world", "How", "are", "you"]

   DIFFÉRENCE avec map() :
   // Avec map() seul
   sentences.map(s => s.split(" "))
   // [["Hello", "world"], ["How", "are", "you"]] ← tableau de tableaux

   // Avec flatMap()
   sentences.flatMap(s => s.split(" "))
   // ["Hello", "world", "How", "are", "you"] ← tableau plat

   QUAND l'utiliser ?
   - Transformer des éléments en PLUSIEURS éléments
   - Diviser des chaînes : string.split()
   - Extraire des sous-éléments
   - Filtrer + transformer en même temps

   💡 EXEMPLES pratiques :
   // 1. Extraire tous les tags de plusieurs posts
   const posts = [
     { tags: ["js", "react"] },
     { tags: ["node", "express"] }
   ];
   const allTags = posts.flatMap(p => p.tags);
   // ["js", "react", "node", "express"]

   // 2. Générer des paires
   const numbers = [1, 2, 3];
   const pairs = numbers.flatMap(n => [n, n * 2]);
   // [1, 2, 2, 4, 3, 6]

   // 3. Filtrer + transformer
   const data = [1, 2, 3, 4, 5];
   const result = data.flatMap(n => n % 2 === 0 ? [n, n * 10] : []);
   // [2, 20, 4, 40] (pairs doublés, impairs ignorés)
*/

// at() : accès avec index négatif (plus pratique)
const arr = [1, 2, 3, 4, 5];
console.log(arr.at(-1)); // 5 (dernier élément)
console.log(arr.at(-2)); // 4 (avant-dernier)
console.log(arr.at(0)); // 1 (premier élément)
console.log(arr.at(2)); // 3 (index 2)

/*
   POURQUOI at() ?
   - Accéder aux éléments avec des INDICES NÉGATIFS
   - Plus PRATIQUE que arr[arr.length - 1]
   - Syntaxe MODERNE et CONCISE

   COMMENT ça marche ?
   - Indices POSITIFS : comme l'accès normal [0, 1, 2...]
   - Indices NÉGATIFS : compte depuis la FIN [-1, -2, -3...]

   Mapping des indices :
   arr = [1, 2, 3, 4, 5]
   Index positif :  0  1  2  3  4
   Valeur :         1  2  3  4  5
   Index négatif : -5 -4 -3 -2 -1

   ANCIEN vs NOUVEAU :
   // ❌ Ancien (verbose)
   const last = arr[arr.length - 1];
   const secondLast = arr[arr.length - 2];

   // ✅ Nouveau (concis)
   const last = arr.at(-1);
   const secondLast = arr.at(-2);

   QUAND l'utiliser ?
   - Accéder au DERNIER élément : arr.at(-1)
   - Accéder aux N derniers éléments
   - Quand l'indice peut être négatif (dynamique)

   💡 AVANTAGE : Fonctionne avec des indices calculés
   const index = -1; // Vient d'un calcul
   arr.at(index); // ✅ Fonctionne
   arr[index]; // ❌ undefined

   ⚠️ ATTENTION :
   - at() retourne undefined si l'indice est hors limites
   - Pas d'erreur si l'indice est invalide
*/

// from() : créer un tableau depuis un itérable ou array-like
const str = "Hello";
const chars = Array.from(str); // ["H", "e", "l", "l", "o"]

// Avec fonction de mapping
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]

/*
   POURQUOI Array.from() ?
   - Créer des tableaux depuis des ITÉRABLES (strings, Sets, Maps)
   - Créer des tableaux depuis des ARRAY-LIKE (NodeList, arguments)
   - Générer des SÉQUENCES de valeurs
   - Alternative à [...iterable]

   COMMENT ça marche ?
   - Array.from(iterable) : convertit en tableau
   - Array.from(arrayLike, mapFn) : convertit + applique une fonction

   Signature complète :
   Array.from(iterable, (element, index) => transformation)

   QUAND l'utiliser ?
   - Convertir des strings en tableaux de caractères
   - Convertir des Set/Map en tableaux
   - Générer des séquences numériques
   - Convertir NodeList en tableau
   - Créer des tableaux pré-remplis

   💡 EXEMPLES pratiques :

   // 1. String → Array
   Array.from("Hello") // ["H", "e", "l", "l", "o"]

   // 2. Set → Array (supprimer doublons)
   const unique = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

   // 3. Générer une séquence
   Array.from({ length: 5 }, (_, i) => i + 1) // [1, 2, 3, 4, 5]
   Array.from({ length: 3 }, () => 0) // [0, 0, 0]

   // 4. Mapping pendant la conversion
   Array.from("hello", c => c.toUpperCase()) // ["H", "E", "L", "L", "O"]

   // 5. NodeList → Array (DOM)
   const divs = document.querySelectorAll("div"); // NodeList
   const divsArray = Array.from(divs); // Array
   divsArray.forEach(div => console.log(div)); // ✅ Méthodes de tableau

   // 6. Générer des objets
   const users = Array.from({ length: 3 }, (_, i) => ({
     id: i + 1,
     name: `User ${i + 1}`
   }));
   // [
   //   { id: 1, name: "User 1" },
   //   { id: 2, name: "User 2" },
   //   { id: 3, name: "User 3" }
   // ]

   ALTERNATIVE avec spread :
   [...str] // Même résultat que Array.from(str)
   [...new Set(arr)] // Même résultat que Array.from(new Set(arr))

   DIFFÉRENCE Array.from() vs spread :
   - Array.from() : permet une fonction de mapping
   - [...iterable] : plus concis mais pas de mapping
*/
```

### Object Methods Avancés

Méthodes modernes pour manipuler les objets de manière puissante.

```javascript
// Object.fromEntries() : inverse de Object.entries() - Reconstruire un objet
const entries = [["name", "Alice"], ["age", 25]];
const obj = Object.fromEntries(entries);
// { name: "Alice", age: 25 }

/*
   POURQUOI Object.fromEntries() ?
   - INVERSE de Object.entries()
   - Reconstruire un objet depuis des paires [clé, valeur]
   - Transformer des objets en appliquant map/filter sur entries

   COMMENT ça marche ?
   - Prend un tableau de paires [clé, valeur]
   - Crée un objet avec ces paires
   - Chaque paire devient une propriété

   CYCLE COMPLET :
   Objet → Entries → Transformation → Objet

   const obj = { a: 1, b: 2 };
   const entries = Object.entries(obj); // [["a", 1], ["b", 2]]
   const newObj = Object.fromEntries(entries); // { a: 1, b: 2 }

   QUAND l'utiliser ?
   - Convertir Map → Object
   - Filtrer/transformer des propriétés d'objets
   - Inverser clés et valeurs
   - Construire des objets dynamiquement
*/

// Filtrer un objet - PATTERN TRÈS UTILE
const user = { name: "Alice", age: 25, city: "Paris" };
const filtered = Object.fromEntries(
  Object.entries(user).filter(([key, value]) => typeof value === "string")
);
// { name: "Alice", city: "Paris" } (seulement les propriétés string)

/*
   POURQUOI ce pattern ?
   - Les objets n'ont PAS de méthode filter()
   - Solution : Object → Array → filter → Object

   COMMENT ça marche ?
   Étape par étape :
   1. Object.entries(user)
      → [["name", "Alice"], ["age", 25], ["city", "Paris"]]

   2. .filter(([key, value]) => typeof value === "string")
      → [["name", "Alice"], ["city", "Paris"]]

   3. Object.fromEntries(...)
      → { name: "Alice", city: "Paris" }

   QUAND l'utiliser ?
   - Filtrer des propriétés par type
   - Retirer des propriétés null/undefined
   - Nettoyer des données avant envoi API
   - Sélectionner certaines propriétés

   💡 EXEMPLES pratiques :

   // 1. Retirer les valeurs null/undefined
   const data = { a: 1, b: null, c: undefined, d: 2 };
   const clean = Object.fromEntries(
     Object.entries(data).filter(([_, v]) => v != null)
   );
   // { a: 1, d: 2 }

   // 2. Convertir les valeurs
   const prices = { apple: "1.5", banana: "2.0", orange: "1.2" };
   const numbers = Object.fromEntries(
     Object.entries(prices).map(([k, v]) => [k, parseFloat(v)])
   );
   // { apple: 1.5, banana: 2, orange: 1.2 }

   // 3. Préfixer toutes les clés
   const obj = { name: "Alice", age: 25 };
   const prefixed = Object.fromEntries(
     Object.entries(obj).map(([k, v]) => [`user_${k}`, v])
   );
   // { user_name: "Alice", user_age: 25 }

   // 4. Inverser clés et valeurs
   const obj = { a: "1", b: "2", c: "3" };
   const inverted = Object.fromEntries(
     Object.entries(obj).map(([k, v]) => [v, k])
   );
   // { "1": "a", "2": "b", "3": "c" }

   // 5. Map → Object
   const map = new Map([["name", "Alice"], ["age", 25]]);
   const obj = Object.fromEntries(map);
   // { name: "Alice", age: 25 }
*/

// Object.hasOwn() : vérifier une propriété de manière SÛRE
const obj2 = { name: "Alice" };
Object.hasOwn(obj2, "name"); // true
Object.hasOwn(obj2, "age"); // false
Object.hasOwn(obj2, "toString"); // false (méthode héritée, pas propre)

/*
   POURQUOI Object.hasOwn() ?
   - Vérifier si une propriété APPARTIENT directement à l'objet
   - Plus SÛR que obj.hasOwnProperty()
   - Évite les problèmes avec null et objets sans prototype

   ANCIENNE MÉTHODE (problématique) :
   obj.hasOwnProperty("name") // ✅ true
   // ❌ Problème : si obj n'a pas de prototype, erreur !
   const obj = Object.create(null);
   obj.hasOwnProperty("name"); // TypeError !

   NOUVELLE MÉTHODE (sûre) :
   Object.hasOwn(obj, "name") // ✅ Toujours sûr
   // Fonctionne même avec Object.create(null)

   COMMENT ça marche ?
   - Vérifie si la propriété est PROPRE à l'objet (own property)
   - Ignore les propriétés HÉRITÉES du prototype
   - Ne lance jamais d'erreur

   DIFFÉRENCE avec "in" :
   const obj = { name: "Alice" };

   "name" in obj; // true (propriété propre)
   "toString" in obj; // true (méthode héritée)

   Object.hasOwn(obj, "name"); // true (propriété propre)
   Object.hasOwn(obj, "toString"); // false (héritée, pas propre)

   QUAND l'utiliser ?
   - Vérifier l'existence d'une propriété propre
   - Avant d'accéder à une propriété optionnelle
   - Valider des données d'objet
   - Éviter les propriétés héritées

   💡 EXEMPLES pratiques :

   // 1. Vérifier avant accès
   const config = { timeout: 5000 };
   if (Object.hasOwn(config, "timeout")) {
     console.log(config.timeout);
   }

   // 2. Valider des données
   function validateUser(user) {
     const required = ["name", "email", "age"];
     return required.every(field => Object.hasOwn(user, field));
   }

   // 3. Copier seulement les propriétés propres
   function copyOwn(obj) {
     return Object.fromEntries(
       Object.entries(obj).filter(([k]) => Object.hasOwn(obj, k))
     );
   }

   ⚠️ ALTERNATIVE MODERNE :
   - Utilisez optional chaining pour l'accès : obj?.property
   - hasOwn pour vérifier l'existence : Object.hasOwn(obj, "property")
*/
```

### Autres Tips Utiles

Collection de techniques et astuces JavaScript pratiques au quotidien.

```javascript
// 1. Convertir en booléen - Deux méthodes
const isTrue = !!value; // Double négation (plus court)
const isFalse = Boolean(value); // Explicite (plus lisible)

/*
   POURQUOI convertir en booléen ?
   - Obtenir true/false depuis n'importe quelle valeur
   - Normaliser les valeurs falsy/truthy
   - Vérifications conditionnelles explicites

   COMMENT ça marche ?
   !! (double négation) :
   - !value → inverse (truthy devient false, falsy devient true)
   - !!value → inverse à nouveau (revient au booléen original)

   Boolean(value) :
   - Fonction constructeur qui convertit en booléen
   - Plus explicite mais plus long

   Exemples :
   !!0 → false
   !!1 → true
   !!"hello" → true
   !!"" → false
   !!null → false
   !!undefined → false

   QUAND l'utiliser ?
   - Convertir des valeurs en vrai booléens
   - Filtrer des valeurs : arr.filter(Boolean)
   - Normaliser des réponses d'API
*/

// 2. Convertir en nombre - Plusieurs méthodes
const num = +strNumber; // Unary plus (plus court)
const num2 = Number(strNumber); // Explicite
const num3 = parseInt(strNumber, 10); // Pour entiers
const num4 = parseFloat(strNumber); // Pour décimaux

/*
   POURQUOI différentes méthodes ?
   - + : le plus court, pour conversions rapides
   - Number() : explicite, convertit tout
   - parseInt() : pour extraire des entiers
   - parseFloat() : pour extraire des décimaux

   COMMENT ça marche ?
   +"42" → 42
   +"3.14" → 3.14
   +"  42  " → 42 (ignore les espaces)
   +"42px" → NaN (caractères non numériques)

   parseInt("42px", 10) → 42 (s'arrête aux caractères non numériques)
   parseFloat("3.14px") → 3.14

   ⚠️ ATTENTION :
   - Vérifiez toujours NaN : isNaN(result) ou Number.isNaN(result)
   - parseInt() nécessite une base (radix) : parseInt(str, 10)
*/

// 3. Arrondir des nombres - Quatre méthodes
Math.floor(4.9); // 4 (vers le bas, floor = plancher)
Math.ceil(4.1); // 5 (vers le haut, ceil = plafond)
Math.round(4.5); // 5 (au plus proche)
Math.trunc(4.9); // 4 (supprime les décimales, tronque)

/*
   POURQUOI différentes méthodes ?
   - Chaque méthode a un comportement différent
   - Choisir selon le cas d'usage

   COMMENT ça marche ?
   Math.floor() : arrondit vers le BAS (vers -∞)
   Math.floor(4.9) → 4
   Math.floor(-4.1) → -5 (attention aux négatifs !)

   Math.ceil() : arrondit vers le HAUT (vers +∞)
   Math.ceil(4.1) → 5
   Math.ceil(-4.9) → -4

   Math.round() : arrondit au plus PROCHE
   Math.round(4.4) → 4
   Math.round(4.5) → 5
   Math.round(4.6) → 5

   Math.trunc() : supprime les DÉCIMALES (vers 0)
   Math.trunc(4.9) → 4
   Math.trunc(-4.9) → -4 (différent de floor !)

   QUAND utiliser chaque méthode ?
   - floor : pagination, indices de tableaux
   - ceil : taille de stockage, pages nécessaires
   - round : affichage de moyennes, températures
   - trunc : extraire la partie entière

   💡 Arrondir à N décimales :
   Math.round(4.567 * 100) / 100 → 4.57
   // Ou plus simple :
   (4.567).toFixed(2) → "4.57" (retourne une string)
*/

// 4. Nombre aléatoire entre min et max (inclusif)
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

random(1, 10); // Nombre entre 1 et 10 (inclus)
random(0, 100); // Nombre entre 0 et 100 (inclus)

/*
   POURQUOI cette formule ?
   - Générer des nombres aléatoires dans une plage
   - min et max sont INCLUS

   COMMENT ça marche ?
   Math.random() → [0, 1) (0 inclus, 1 exclu)

   Décomposition :
   1. Math.random() * (max - min + 1)
      → [0, max - min + 1)

   2. Math.floor(...)
      → [0, max - min] (entiers)

   3. + min
      → [min, max] (décalage)

   Exemple : random(5, 10)
   Math.random() * 6 → [0, 6)
   Math.floor(...) → [0, 5]
   + 5 → [5, 10]

   QUAND l'utiliser ?
   - Jeux : dés, tirages
   - Tests : données aléatoires
   - Simulations
   - Sélection aléatoire d'éléments
*/

// 5. Vérifier le type - Trois méthodes
Array.isArray([]); // true (pour les tableaux)
typeof "text"; // "string" (pour les primitifs)
value instanceof Date; // true/false (pour les objets)

/*
   POURQUOI trois méthodes ?
   - typeof : primitifs (string, number, boolean, undefined, symbol)
   - Array.isArray() : spécifique aux tableaux
   - instanceof : instances d'objets

   COMMENT ça marche ?
   typeof :
   typeof "hello" → "string"
   typeof 42 → "number"
   typeof true → "boolean"
   typeof undefined → "undefined"
   typeof null → "object" (⚠️ bug historique !)
   typeof [] → "object" (⚠️ pas utile pour tableaux)
   typeof {} → "object"

   Array.isArray() :
   Array.isArray([]) → true
   Array.isArray({}) → false
   Array.isArray("text") → false

   instanceof :
   new Date() instanceof Date → true
   [] instanceof Array → true
   {} instanceof Object → true

   QUAND utiliser chaque méthode ?
   - typeof : types primitifs
   - Array.isArray() : vérifier si tableau
   - instanceof : vérifier la classe/constructeur
*/

// 6. Cloner un objet/tableau - Copie profonde
const clone = structuredClone(original); // Méthode moderne (recommandée)
const clone2 = JSON.parse(JSON.stringify(original)); // Ancienne méthode

/*
   POURQUOI structuredClone() ?
   - Copie PROFONDE (deep copy) native
   - Gère les types complexes (Date, Map, Set, RegExp)
   - Plus RAPIDE et SÛRE que JSON

   COMMENT ça marche ?
   structuredClone() :
   - Clone récursivement toutes les propriétés
   - Gère les références circulaires
   - Préserve les types (Date reste Date, Set reste Set)

   JSON.parse(JSON.stringify()) :
   - Convertit en JSON puis reparse
   - ❌ Perd les fonctions
   - ❌ Perd undefined
   - ❌ Convertit Date en string
   - ❌ Ne gère pas les références circulaires

   Comparaison :
   const obj = {
     date: new Date(),
     func: () => {},
     undef: undefined,
     set: new Set([1, 2])
   };

   structuredClone(obj) :
   // ✅ { date: Date, set: Set }
   // ⚠️ func perdue (fonctions non clonables)

   JSON.parse(JSON.stringify(obj)) :
   // ❌ { date: "2024-...", set: {} }
   // func et undef perdues

   QUAND l'utiliser ?
   - Copier des objets/tableaux imbriqués
   - Éviter les mutations accidentelles
   - State management (React, Redux)
*/

// 7. Supprimer les doublons - Avec Set
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

/*
   POURQUOI ce pattern ?
   - Supprimer les DOUBLONS en une ligne
   - PERFORMANT pour grands tableaux
   - ÉLÉGANT et moderne

   COMMENT ça marche ?
   1. new Set(arr) → Set ne garde que des valeurs uniques
   2. [...set] → Convertit le Set en tableau

   QUAND l'utiliser ?
   - Nettoyer des listes avec doublons
   - Comparer des tableaux (union, intersection)
   - Validation de données

   💡 EXEMPLES avancés :
   // Doublons d'objets (par propriété)
   const users = [
     { id: 1, name: "Alice" },
     { id: 2, name: "Bob" },
     { id: 1, name: "Alice" }
   ];
   const unique = [...new Map(users.map(u => [u.id, u])).values()];
   // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
*/

// 8. Inverser une chaîne
const reversed = str.split("").reverse().join("");

/*
   POURQUOI ce pattern ?
   - Inverser l'ordre des caractères
   - Palindromes, cryptographie simple

   COMMENT ça marche ?
   1. split("") → ["h", "e", "l", "l", "o"]
   2. reverse() → ["o", "l", "l", "e", "h"]
   3. join("") → "olleh"

   ⚠️ ATTENTION :
   - Ne fonctionne pas correctement avec les emojis
   - "😀".split("").reverse().join("") peut donner un résultat incorrect
*/

// 9. Capitaliser (première lettre en majuscule)
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

capitalize("hello"); // "Hello"
capitalize("world"); // "World"

/*
   COMMENT ça marche ?
   1. str.charAt(0) → première lettre
   2. .toUpperCase() → en majuscule
   3. + str.slice(1) → reste de la chaîne

   ALTERNATIVE :
   const capitalize = str => str[0].toUpperCase() + str.slice(1);

   💡 VARIANTES :
   // Capitaliser chaque mot
   const titleCase = str =>
     str.split(" ").map(word => capitalize(word)).join(" ");

   titleCase("hello world"); // "Hello World"
*/

// 10. Debounce (éviter les appels répétés)
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/*
   POURQUOI debounce ?
   - LIMITER le nombre d'appels d'une fonction
   - Attendre que l'utilisateur ARRÊTE d'agir
   - Optimiser les performances

   COMMENT ça marche ?
   1. Retourne une nouvelle fonction "debounced"
   2. Chaque appel annule le timer précédent
   3. Le timer se déclenche seulement après `delay` ms de pause

   QUAND l'utiliser ?
   - Recherche en temps réel (search bar)
   - Redimensionnement de fenêtre (resize)
   - Saisie dans un formulaire
   - Scroll events

   💡 EXEMPLE pratique :
   const searchAPI = debounce((query) => {
     fetch(`/api/search?q=${query}`);
   }, 300);

   // L'utilisateur tape "hello"
   // h -> timer: 300ms
   // he -> annule, nouveau timer: 300ms
   // hel -> annule, nouveau timer: 300ms
   // hell -> annule, nouveau timer: 300ms
   // hello -> annule, nouveau timer: 300ms
   // ... 300ms après, l'API est appelée UNE SEULE fois

   DIFFÉRENCE avec throttle :
   - debounce : attend la FIN de l'activité
   - throttle : limite à X appels par seconde

   ⚠️ ATTENTION :
   - Le contexte (this) peut être perdu
   - Utilisez une arrow function ou bind
*/
```

### Patterns Utiles

Patterns et techniques pour écrire du code JavaScript propre et maintenable.

```javascript
// Pattern Guard Clauses (retour anticipé) - Éviter l'imbrication
// ❌ MAUVAIS : Pyramid of Doom (imbrication profonde)
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        if (user.email) {
          // Logique métier ici
          // Code imbriqué difficile à lire
        }
      }
    }
  }
}

// ✅ BON : Guard Clauses (retours anticipés)
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;
  if (!user.email) return;

  // Logique métier ici
  // Code au même niveau, facile à lire
}

/*
   POURQUOI les Guard Clauses ?
   - Éviter l'IMBRICATION profonde (pyramid of doom)
   - Code plus LISIBLE et MAINTENABLE
   - Erreurs et cas limites traités en PREMIER
   - "Happy path" au niveau principal

   COMMENT ça marche ?
   - Vérifier les CONDITIONS D'ERREUR en premier
   - RETOURNER immédiatement si invalide
   - Le code "normal" est au niveau principal (pas imbriqué)

   Structure :
   1. Vérifications des paramètres
   2. Vérifications des conditions préalables
   3. Logique métier principale (non imbriquée)

   QUAND l'utiliser ?
   - Validation de paramètres
   - Vérifications de permissions
   - Conditions préalables multiples
   - Toute fonction avec plusieurs conditions

   💡 RÈGLE D'OR :
   "Fail fast, succeed late"
   → Échouez rapidement, réussissez à la fin

   COMPARAISON :
   ❌ Imbrication :
   - Difficile à lire
   - Logique métier enfouie
   - Difficile à modifier

   ✅ Guard clauses :
   - Facile à lire
   - Logique métier visible
   - Facile d'ajouter des vérifications
*/

// Pattern Default Object - Valeurs par défaut avec spread
function createUser(options = {}) {
  const defaults = {
    role: "user",
    isActive: true,
    theme: "light",
    notifications: true
  };

  return { ...defaults, ...options };
}

createUser(); // Toutes les valeurs par défaut
// { role: "user", isActive: true, theme: "light", notifications: true }

createUser({ role: "admin", theme: "dark" }); // Surcharges
// { role: "admin", isActive: true, theme: "dark", notifications: true }

/*
   POURQUOI ce pattern ?
   - Fournir des VALEURS PAR DÉFAUT complètes
   - Permettre des SURCHARGES sélectives
   - Code FLEXIBLE et ROBUSTE

   COMMENT ça marche ?
   1. Définir un objet defaults avec toutes les valeurs par défaut
   2. { ...defaults, ...options } merge les deux
   3. options ÉCRASE defaults pour les propriétés présentes

   Étape par étape :
   createUser({ role: "admin" })
   → { ...defaults, role: "admin" }
   → { role: "admin", isActive: true, theme: "light", ... }

   QUAND l'utiliser ?
   - Fonctions de configuration
   - Constructeurs d'objets
   - Initialisation de state
   - API publiques

   💡 VARIANTE avec validation :
   function createUser(options = {}) {
     const defaults = { role: "user", isActive: true };
     const user = { ...defaults, ...options };

     // Validation
     if (!["user", "admin"].includes(user.role)) {
       throw new Error("Invalid role");
     }

     return user;
   }

   ⚠️ ATTENTION :
   - options écrase defaults (ordre important)
   - Copie superficielle (shallow copy)
   - Pour objets imbriqués, utilisez structuredClone
*/

// Pattern Memoization (cache) - Optimiser les calculs coûteux
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Utilisation
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(40); // Calculé et mis en cache
fibonacci(40); // Retourné depuis le cache (instantané)

/*
   POURQUOI la memoization ?
   - OPTIMISER les fonctions avec calculs COÛTEUX
   - Éviter de recalculer les MÊMES résultats
   - Améliorer les PERFORMANCES drastiquement

   COMMENT ça marche ?
   1. Créer un cache (Map)
   2. Générer une clé depuis les arguments
   3. Si la clé existe dans le cache → retourner le résultat cached
   4. Sinon → calculer, mettre en cache, retourner

   Exemple Fibonacci :
   fibonacci(5) → calcul
   fibonacci(5) → cache (instantané)

   Sans memoization : fibonacci(40) → ~2 secondes
   Avec memoization : fibonacci(40) → ~1ms la 2ème fois

   QUAND l'utiliser ?
   - Fonctions PURES (même entrée → même sortie)
   - Calculs COÛTEUX (récursion, calculs complexes)
   - Appels FRÉQUENTS avec mêmes arguments

   💡 EXEMPLES pratiques :
   // 1. Calculs mathématiques
   const expensiveCalculation = memoize((x, y) => {
     // Calcul très lourd
     return x ** y;
   });

   // 2. Requêtes API
   const fetchUser = memoize(async (id) => {
     const response = await fetch(`/api/users/${id}`);
     return response.json();
   });

   // 3. Parsing de données
   const parseData = memoize((jsonString) => {
     return JSON.parse(jsonString);
   });

   ⚠️ LIMITES :
   - Consomme de la MÉMOIRE (le cache grandit)
   - Seulement pour fonctions PURES
   - La clé JSON.stringify() peut être coûteuse
   - Pas adapté pour arguments complexes (objets, fonctions)

   💡 AMÉLIORATION avec limite de cache :
   function memoize(fn, maxSize = 100) {
     const cache = new Map();
     return function (...args) {
       const key = JSON.stringify(args);
       if (cache.has(key)) {
         return cache.get(key);
       }
       const result = fn(...args);
       cache.set(key, result);

       // Limiter la taille du cache (FIFO)
       if (cache.size > maxSize) {
         const firstKey = cache.keys().next().value;
         cache.delete(firstKey);
       }

       return result;
     };
   }
*/

// BONUS : Autres patterns utiles

// 1. Factory Pattern - Créer des objets
function createLogger(prefix) {
  return {
    log: (message) => console.log(`[${prefix}] ${message}`),
    error: (message) => console.error(`[${prefix}] ERROR: ${message}`),
    warn: (message) => console.warn(`[${prefix}] WARNING: ${message}`)
  };
}

const userLogger = createLogger("USER");
userLogger.log("User logged in"); // [USER] User logged in

/*
   POURQUOI ?
   - Créer des objets SIMILAIRES avec configuration différente
   - Encapsuler la logique de création
   - Éviter la duplication de code
*/

// 2. Module Pattern - Encapsulation
const counter = (function() {
  let count = 0; // Variable privée

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
})();

counter.increment(); // 1
counter.getValue(); // 1
// counter.count → undefined (privé)

/*
   POURQUOI ?
   - Créer des variables PRIVÉES
   - Exposer seulement l'API publique
   - Éviter la pollution du scope global
*/

// 3. Pipeline Pattern - Chaîner des transformations
const pipe = (...fns) => (value) =>
  fns.reduce((acc, fn) => fn(acc), value);

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x ** 2;

const transform = pipe(addOne, double, square);
transform(2); // ((2 + 1) * 2) ** 2 = 36

/*
   POURQUOI ?
   - Composer des TRANSFORMATIONS multiples
   - Code DÉCLARATIF et LISIBLE
   - Réutiliser des fonctions simples
*/

// 4. Retry Pattern - Réessayer en cas d'échec
async function retry(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Utilisation
await retry(() => fetch("/api/data"), 3, 2000);

/*
   POURQUOI ?
   - Gérer les ÉCHECS TEMPORAIRES (réseau, API)
   - Améliorer la RÉSILIENCE
   - Éviter les erreurs dues à des problèmes passagers
*/
```

## 🎯 Exercices

Ouvrez le fichier [exercice.js](./exercice.js) et complétez les parties manquantes.

## ✅ Correction

Une fois vos exercices terminés, comparez avec la [correction.js](./correction.js).
