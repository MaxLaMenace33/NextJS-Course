// 📝 Exercice : Generics

// 1. Créez une fonction identity<T> qui retourne l'argument passé
// function identity<T>(VOTRE CODE ICI) VOTRE CODE ICI {
//   return value;
// }

// 2. Créez une fonction getLastItem<T> qui retourne le dernier élément d'un tableau
// function getLastItem<T>(VOTRE CODE ICI) VOTRE CODE ICI {
//   return arr[arr.length - 1];
// }

// 3. Créez une interface Response<T> avec : data (T), status (number), message (string)
// interface Response<T> {
//   VOTRE CODE ICI
// }

// 4. Créez une fonction avec contrainte : printLength<T> qui accepte seulement les types avec .length
// function printLength<T extends VOTRE CODE ICI>(item: T): void {
//   console.log(item.length);
// }

// Test
// const apiResponse: Response<User[]> = {
//   data: [{ name: "Alice", age: 25 }],
//   status: 200,
//   message: "Success"
// };
