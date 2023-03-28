(()=> {
  let prices = [1,2,3,4,5, "Hola", true];
  prices.push(1412412);
  prices = [];

  let products = ["Hola", true];
  products.push(false);

  let mixed:(number | string | boolean | Object)[] = ["Hola", true];
  mixed.push(12);
  mixed.push({});
  mixed.push([]);

  let numbers = [1,2,3,4,5,123];
  numbers.map(item => item * 2);

  let example: (string)[];
})();
