// ✅ Correction - Séance 2 : Fonctions et Scope

// 📝 Exercice 1 : Arrow Functions

// 1. Convertir multiply
const multiply = (a, b) => a * b;

// 2. Convertir square
const square = (x) => x * x;

// 3. Convertir getFullName
const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

console.log("=== Exercice 1 ===");
console.log("multiply(5, 3):", multiply(5, 3)); // 15
console.log("square(4):", square(4)); // 16
console.log("getFullName('John', 'Doe'):", getFullName("John", "Doe")); // "John Doe"


// 📝 Exercice 2 : Paramètres par défaut

// 1. Calculer le prix TTC
const calculateTTC = (price, taxRate = 0.20) => price + (price * taxRate);

// 2. Message de bienvenue
const welcome = (name = "Invité", greeting = "Bonjour") => `${greeting} ${name} !`;

// 3. Calculer avec réduction
const calculateDiscount = (price, discount = 0, fidelityBonus = 0) => {
  return price - discount - fidelityBonus;
};

console.log("\n=== Exercice 2 ===");
console.log("calculateTTC(100):", calculateTTC(100)); // 120
console.log("calculateTTC(100, 0.10):", calculateTTC(100, 0.10)); // 110
console.log("welcome():", welcome()); // "Bonjour Invité !"
console.log("welcome('Alice'):", welcome("Alice")); // "Bonjour Alice !"
console.log("welcome('Bob', 'Salut'):", welcome("Bob", "Salut")); // "Salut Bob !"
console.log("calculateDiscount(100):", calculateDiscount(100)); // 100
console.log("calculateDiscount(100, 10):", calculateDiscount(100, 10)); // 90
console.log("calculateDiscount(100, 10, 5):", calculateDiscount(100, 10, 5)); // 85


// 📝 Exercice 3 : Fonctions qui retournent des objets

// 1. createProduct - ATTENTION aux parenthèses pour retourner un objet !
const createProduct = (name, price) => ({ name, price });

// 2. createUser
const createUser = (username, email, age) => ({ username, email, age });

// 3. getCoordinates
const getCoordinates = (x, y) => ({ x, y, sum: x + y });

console.log("\n=== Exercice 3 ===");
console.log("createProduct('Laptop', 999):", createProduct("Laptop", 999));
console.log("createUser('alice', 'alice@test.com', 25):", createUser("alice", "alice@test.com", 25));
console.log("getCoordinates(3, 4):", getCoordinates(3, 4));


// 📝 Exercice 4 : Scope

const globalMessage = "Message global";

function testScope() {
  const functionMessage = "Message de fonction";

  if (true) {
    const blockMessage = "Message de bloc";

    // Dans le bloc : accès à tout
    console.log("Dans le bloc - globalMessage:", globalMessage);
    console.log("Dans le bloc - functionMessage:", functionMessage);
    console.log("Dans le bloc - blockMessage:", blockMessage);
  }

  // Hors du bloc : pas d'accès à blockMessage
  console.log("Hors du bloc - globalMessage:", globalMessage);
  console.log("Hors du bloc - functionMessage:", functionMessage);
  // console.log(blockMessage); // ❌ Erreur ! blockMessage n'existe pas ici
}

console.log("\n=== Exercice 4 ===");
testScope();


// 📝 Exercice 5 : Closures

function createBankAccount() {
  let balance = 0; // Variable privée accessible uniquement via les méthodes

  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      balance -= amount;
      return balance;
    },
    getBalance: () => balance
  };
}

console.log("\n=== Exercice 5 ===");
const account = createBankAccount();
account.deposit(100);
console.log("Solde après dépôt de 100:", account.getBalance()); // 100
account.withdraw(30);
console.log("Solde après retrait de 30:", account.getBalance()); // 70
account.deposit(50);
console.log("Solde après dépôt de 50:", account.getBalance()); // 120

// 💡 La variable balance est privée, on ne peut pas y accéder directement
// console.log(account.balance); // undefined
// console.log(balance); // ❌ Erreur ! balance n'existe pas dans ce scope


// 📝 Exercice 6 : Fonction d'ordre supérieur

// 1. repeat : exécute une fonction n fois
const repeat = (callback, n) => {
  for (let i = 0; i < n; i++) {
    callback();
  }
};

// 2. applyOperation : applique une opération sur deux nombres
const applyOperation = (a, b, operation) => operation(a, b);

console.log("\n=== Exercice 6 ===");
console.log("repeat 3 fois:");
repeat(() => console.log("  Hello"), 3);

console.log("applyOperation - addition:", applyOperation(10, 5, (a, b) => a + b)); // 15
console.log("applyOperation - multiplication:", applyOperation(10, 5, (a, b) => a * b)); // 50
console.log("applyOperation - division:", applyOperation(10, 5, (a, b) => a / b)); // 2


// 📝 Exercice 7 : Callback et méthodes

const numbers = [1, 2, 3, 4, 5];

// 1. Fonction pour vérifier si un nombre est pair
const isEven = (num) => num % 2 === 0;

// 2. Filtrer les nombres pairs
const evenNumbers = numbers.filter(isEven);

// 3. Fonction pour ajouter 10
const addTen = (num) => num + 10;

// 4. Ajouter 10 à chaque nombre
const numbersPlus10 = numbers.map(addTen);

console.log("\n=== Exercice 7 ===");
console.log("Nombres originaux:", numbers);
console.log("Nombres pairs:", evenNumbers); // [2, 4]
console.log("Nombres + 10:", numbersPlus10); // [11, 12, 13, 14, 15]

// 💡 Alternative : avec des arrow functions inline
const evenNumbers2 = numbers.filter((num) => num % 2 === 0);
const numbersPlus10v2 = numbers.map((num) => num + 10);

console.log("evenNumbers (inline):", evenNumbers2);
console.log("numbersPlus10 (inline):", numbersPlus10v2);


// 💡 Points clés à retenir :
console.log("\n=== Points clés ===");
console.log("✅ Arrow functions : syntaxe concise, pas de hoisting");
console.log("✅ Paramètres par défaut : évitent les vérifications manuelles");
console.log("✅ Scope : const/let ont un scope de bloc");
console.log("✅ Closures : permettent de créer des variables privées");
console.log("✅ Fonctions d'ordre supérieur : fonctions qui prennent/retournent des fonctions");
