// ✅ Correction - Generics

function identity<T>(value: T): T {
  return value;
}

function getLastItem<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

interface Response<T> {
  data: T;
  status: number;
  message: string;
}

interface HasLength {
  length: number;
}

function printLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

// Tests
console.log(identity(42)); // 42
console.log(identity("hello")); // "hello"
console.log(getLastItem([1, 2, 3])); // 3
console.log(getLastItem(["a", "b", "c"])); // "c"

interface User {
  name: string;
  age: number;
}

const apiResponse: Response<User[]> = {
  data: [{ name: "Alice", age: 25 }],
  status: 200,
  message: "Success"
};

console.log(apiResponse);

printLength("hello"); // 5
printLength([1, 2, 3]); // 3
