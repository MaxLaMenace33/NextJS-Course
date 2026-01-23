// ✅ Correction - Utility Types

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

// 1. Partial pour mise à jour
type UpdateProduct = Partial<Product>;

// 2. Pick pour preview
type ProductPreview = Pick<Product, "id" | "name">;

// 3. Omit pour exclure description
type ProductWithoutDesc = Omit<Product, "description">;

// 4. Readonly
type ReadonlyProduct = Readonly<Product>;

// 5. Record pour mapping
type ProductMap = Record<string, Product>;

// 6. Type guard
function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "price" in value
  );
}

// Tests
const update: UpdateProduct = { price: 99.99 };
const preview: ProductPreview = { id: "1", name: "Laptop" };
const withoutDesc: ProductWithoutDesc = {
  id: "1",
  name: "Laptop",
  price: 999,
  stock: 10
};

const productMap: ProductMap = {
  "prod1": { id: "1", name: "Laptop", price: 999, description: "Great laptop", stock: 5 }
};

console.log(isProduct({ id: "1", name: "Test", price: 10 })); // true
console.log(isProduct("not a product")); // false
