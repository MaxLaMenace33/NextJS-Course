// 📝 Exercice : Composants et JSX

// 1. Créez un composant Card qui affiche un titre et une description
interface CardProps {
  // VOTRE CODE ICI
}

// function Card(VOTRE CODE ICI) {
//   return (
//     <div className="card">
//       {/* VOTRE CODE ICI */}
//     </div>
//   );
// }

// 2. Créez un composant ProductList qui affiche une liste de produits
interface Product {
  id: string;
  name: string;
  price: number;
}

// function ProductList({ products }: { products: Product[] }) {
//   return (
//     <ul>
//       {/* VOTRE CODE ICI : utilisez map() */}
//     </ul>
//   );
// }

// 3. Créez un composant StatusBadge avec rendu conditionnel
type Status = "success" | "warning" | "error";

// function StatusBadge({ status }: { status: Status }) {
//   // VOTRE CODE ICI
//   // Affichez un texte et une couleur différents selon le status
// }

// 4. Créez un composant UserProfile avec props optionnelles
interface UserProfileProps {
  name: string;
  email?: string;
  avatar?: string;
}

// function UserProfile(VOTRE CODE ICI) {
//   return (
//     <div>
//       {/* VOTRE CODE ICI */}
//       {/* Affichez l'avatar seulement s'il existe */}
//     </div>
//   );
// }

export {};
