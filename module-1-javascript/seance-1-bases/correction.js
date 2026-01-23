// ✅ Correction - Séance 1 : Les Bases de JavaScript

// 📝 Exercice 1 : Variables
const PI = 3.14159;
let counter = 0;
counter = counter + 1; // ou counter++

console.log("=== Exercice 1 ===");
console.log("PI:", PI); // 3.14159
console.log("counter:", counter); // 1


// 📝 Exercice 2 : Types de données
const firstName = "Alice"; // Remplacez par votre prénom
const age = 25; // Remplacez par votre âge
const isStudent = true; // true ou false selon votre situation
const address = null;

console.log("\n=== Exercice 2 ===");
console.log("firstName:", firstName, "- Type:", typeof firstName);
console.log("age:", age, "- Type:", typeof age);
console.log("isStudent:", isStudent, "- Type:", typeof isStudent);
console.log("address:", address, "- Type:", typeof address); // "object" (particularité de JS)


// 📝 Exercice 3 : Opérateurs arithmétiques
const price = 99.99;
const quantity = 3;

const total = price * quantity; // 299.97
const tva = total * 0.20; // 59.994
const priceTTC = total + tva; // 359.964

console.log("\n=== Exercice 3 ===");
console.log("Prix unitaire:", price);
console.log("Quantité:", quantity);
console.log("Total HT:", total);
console.log("TVA (20%):", tva);
console.log("Prix TTC:", priceTTC);


// 📝 Exercice 4 : Comparaisons
const a = 10;
const b = "10";
const c = 20;

const isStrictEqual = a === b; // false (nombre !== string)
const isLooseEqual = a == b; // true (à éviter !)
const isLessThan = a < c; // true
const isDifferent = a !== c; // true

console.log("\n=== Exercice 4 ===");
console.log("a === b (strict):", isStrictEqual); // false
console.log("a == b (loose):", isLooseEqual); // true
console.log("a < c:", isLessThan); // true
console.log("a !== c:", isDifferent); // true

// 💡 Explication : Toujours utiliser === et !== pour éviter les conversions implicites


// 📝 Exercice 5 : Conversions de types
const userInput = "123";
const numberString = "456";

const userNumber = Number(userInput); // 123
const parsedNumber = +numberString; // 456

const score = 42;

const scoreText = `${score}`; // "42"
const scoreString = score.toString(); // "42"

console.log("\n=== Exercice 5 ===");
console.log("userNumber:", userNumber, "- Type:", typeof userNumber);
console.log("parsedNumber:", parsedNumber, "- Type:", typeof parsedNumber);
console.log("scoreText:", scoreText, "- Type:", typeof scoreText);
console.log("scoreString:", scoreString, "- Type:", typeof scoreString);


// 📝 Exercice 6 : Opérateurs logiques
const isLoggedIn = true;
const isPremium = false;
const hasAccess = true;

const canViewContent = isLoggedIn && hasAccess; // true
const showAds = !isPremium; // true
const hasPrivileges = isPremium || hasAccess; // true (hasAccess est true)

console.log("\n=== Exercice 6 ===");
console.log("isLoggedIn:", isLoggedIn);
console.log("isPremium:", isPremium);
console.log("hasAccess:", hasAccess);
console.log("canViewContent (isLoggedIn && hasAccess):", canViewContent);
console.log("showAds (!isPremium):", showAds);
console.log("hasPrivileges (isPremium || hasAccess):", hasPrivileges);


// 💡 Points clés à retenir :
console.log("\n=== Points clés ===");
console.log("✅ Utilisez const par défaut, let seulement si nécessaire");
console.log("✅ Toujours utiliser === et !== (comparaison stricte)");
console.log("✅ Attention au type de vos variables");
console.log("✅ Les conversions de types sont courantes en JavaScript");
