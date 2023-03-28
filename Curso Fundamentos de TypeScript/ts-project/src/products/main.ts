import {addProduct, calcStock, products} from "./products.service";

addProduct({
  title: "Product 1",
  createdAt: new Date(),
  stock: 12,
});

addProduct({
  title: "Product 2",
  createdAt: new Date(),
  stock: 12,
  size: "XL",
});

console.log(products);

const total = calcStock();

console.log(total);
