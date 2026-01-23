// ✅ Correction - Composants et JSX

// 1. Card
interface CardProps {
  title: string;
  description: string;
}

function Card({ title, description }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// 2. ProductList
interface Product {
  id: string;
  name: string;
  price: number;
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} - {product.price}€
        </li>
      ))}
    </ul>
  );
}

// 3. StatusBadge
type Status = "success" | "warning" | "error";

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    success: { color: "green", text: "Succès" },
    warning: { color: "orange", text: "Attention" },
    error: { color: "red", text: "Erreur" }
  };

  const { color, text } = styles[status];

  return <span style={{ color }}>{text}</span>;
}

// 4. UserProfile
interface UserProfileProps {
  name: string;
  email?: string;
  avatar?: string;
}

function UserProfile({ name, email, avatar }: UserProfileProps) {
  return (
    <div className="user-profile">
      {avatar && <img src={avatar} alt={name} />}
      <h2>{name}</h2>
      {email && <p>{email}</p>}
    </div>
  );
}

// Tests
export function App() {
  const products: Product[] = [
    { id: "1", name: "Laptop", price: 999 },
    { id: "2", name: "Mouse", price: 25 }
  ];

  return (
    <div>
      <Card title="Titre" description="Description" />
      <ProductList products={products} />
      <StatusBadge status="success" />
      <UserProfile name="Alice" email="alice@test.com" />
    </div>
  );
}
