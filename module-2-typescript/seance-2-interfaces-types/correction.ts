// ✅ Correction - Interfaces et Types

interface Product {
  id: string;
  name: string;
  price: number;
  inStock?: boolean;
}

interface Category extends Product {
  category: string;
  tags: string[];
}

type Coordinate = { x: number; y: number; z?: number };

type Role = "user" | "admin" | "moderator";

interface User {
  name: string;
  email: string;
}

type VerifiedUser = User & { isVerified: boolean };

// Tests
const product: Product = {
  id: "1",
  name: "Laptop",
  price: 999
};

const categoryProduct: Category = {
  ...product,
  category: "Electronics",
  tags: ["tech", "computer"]
};

const point: Coordinate = { x: 10, y: 20 };
const role: Role = "admin";
const verifiedUser: VerifiedUser = {
  name: "Alice",
  email: "alice@test.com",
  isVerified: true
};

console.log({ product, categoryProduct, point, role, verifiedUser });
