// 📝 Exercice 1 : Arrow Functions
// Convertissez ces fonctions traditionnelles en arrow functions

// 1. Convertissez cette fonction
function multiply(a, b) {
  return a * b;
}
// const multiply = VOTRE CODE ICI

// 2. Convertissez cette fonction (return implicite)
function square(x) {
  return x * x;
}
// const square = VOTRE CODE ICI

// 3. Convertissez cette fonction
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
// const getFullName = VOTRE CODE ICI


// 📝 Exercice 2 : Paramètres par défaut
// Créez les fonctions suivantes avec des paramètres par défaut

// 1. Fonction qui calcule le prix TTC
//    - Paramètres : price, taxRate (défaut: 0.20)
//    - Retourne : price + (price * taxRate)
// const calculateTTC = VOTRE CODE ICI

// 2. Fonction qui crée un message de bienvenue
//    - Paramètres : name (défaut: "Invité"), greeting (défaut: "Bonjour")
//    - Retourne : `${greeting} ${name} !`
// const welcome = VOTRE CODE ICI

// 3. Fonction qui calcule une réduction
//    - Paramètres : price, discount (défaut: 0), fidelityBonus (défaut: 0)
//    - Retourne : price - discount - fidelityBonus
// const calculateDiscount = VOTRE CODE ICI


// 📝 Exercice 3 : Fonctions qui retournent des objets
// Créez des arrow functions qui retournent des objets

// 1. Créez une fonction createProduct qui prend (name, price) et retourne { name, price }
// const createProduct = VOTRE CODE ICI

// 2. Créez une fonction createUser qui prend (username, email, age)
//    et retourne un objet avec ces 3 propriétés
// const createUser = VOTRE CODE ICI

// 3. Créez une fonction getCoordinates qui prend (x, y)
//    et retourne { x, y, sum: x + y }
// const getCoordinates = VOTRE CODE ICI


// 📝 Exercice 4 : Scope
// Complétez le code suivant

const globalMessage = "Message global";

function testScope() {
  const functionMessage = "Message de fonction";

  if (true) {
    const blockMessage = "Message de bloc";

    // 1. Affichez globalMessage
    // console.log(VOTRE CODE ICI);

    // 2. Affichez functionMessage
    // console.log(VOTRE CODE ICI);

    // 3. Affichez blockMessage
    // console.log(VOTRE CODE ICI);
  }

  // 4. Affichez globalMessage et functionMessage (blockMessage n'est pas accessible ici)
  // console.log(VOTRE CODE ICI);
  // console.log(VOTRE CODE ICI);
}


// 📝 Exercice 5 : Closures
// Créez une fonction de compteur avec des closures

// 1. Créez une fonction createBankAccount qui :
//    - Initialise un solde à 0 (variable privée)
//    - Retourne un objet avec 3 méthodes :
//      * deposit(amount) : ajoute au solde
//      * withdraw(amount) : retire du solde
//      * getBalance() : retourne le solde
// function createBankAccount() {
//   VOTRE CODE ICI
// }


// 📝 Exercice 6 : Fonction d'ordre supérieur
// Créez des fonctions qui prennent d'autres fonctions en paramètres

// 1. Créez une fonction repeat qui :
//    - Prend une fonction callback et un nombre n
//    - Exécute callback n fois
// const repeat = VOTRE CODE ICI

// 2. Créez une fonction applyOperation qui :
//    - Prend deux nombres (a, b) et une fonction operation
//    - Retourne le résultat de operation(a, b)
// const applyOperation = VOTRE CODE ICI


// 📝 Exercice 7 : Callback et méthodes
// Utilisez les fonctions comme callbacks

const numbers = [1, 2, 3, 4, 5];

// 1. Créez une fonction isEven qui vérifie si un nombre est pair
// const isEven = VOTRE CODE ICI

// 2. Utilisez filter avec isEven pour obtenir les nombres pairs
// const evenNumbers = VOTRE CODE ICI

// 3. Créez une fonction addTen qui ajoute 10 à un nombre
// const addTen = VOTRE CODE ICI

// 4. Utilisez map avec addTen pour ajouter 10 à chaque nombre
// const numbersPlus10 = VOTRE CODE ICI


// 🧪 Tests (décommentez pour tester vos réponses)
/*
console.log("=== Exercice 1 ===");
console.log(multiply(5, 3)); // 15
console.log(square(4)); // 16
console.log(getFullName("John", "Doe")); // "John Doe"

console.log("\n=== Exercice 2 ===");
console.log(calculateTTC(100)); // 120
console.log(calculateTTC(100, 0.10)); // 110
console.log(welcome()); // "Bonjour Invité !"
console.log(welcome("Alice")); // "Bonjour Alice !"
console.log(welcome("Bob", "Salut")); // "Salut Bob !"
console.log(calculateDiscount(100)); // 100
console.log(calculateDiscount(100, 10)); // 90
console.log(calculateDiscount(100, 10, 5)); // 85

console.log("\n=== Exercice 3 ===");
console.log(createProduct("Laptop", 999)); // { name: "Laptop", price: 999 }
console.log(createUser("alice", "alice@test.com", 25));
// { username: "alice", email: "alice@test.com", age: 25 }
console.log(getCoordinates(3, 4)); // { x: 3, y: 4, sum: 7 }

console.log("\n=== Exercice 4 ===");
testScope();

console.log("\n=== Exercice 5 ===");
const account = createBankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
account.withdraw(30);
console.log(account.getBalance()); // 70
account.deposit(50);
console.log(account.getBalance()); // 120

console.log("\n=== Exercice 6 ===");
repeat(() => console.log("Hello"), 3); // Affiche "Hello" 3 fois
console.log(applyOperation(10, 5, (a, b) => a + b)); // 15
console.log(applyOperation(10, 5, (a, b) => a * b)); // 50

console.log("\n=== Exercice 7 ===");
console.log(evenNumbers); // [2, 4]
console.log(numbersPlus10); // [11, 12, 13, 14, 15]
*/
