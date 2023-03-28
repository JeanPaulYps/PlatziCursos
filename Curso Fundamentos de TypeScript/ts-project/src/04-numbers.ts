(() => {
  let productPrice = 100;
  productPrice = 12;
  console.log("ProductPrice", productPrice);

  let customerAge: number = 28;
  customerAge = customerAge + 1;
  console.log("customerAge", customerAge);

  let productsInStock : number;
  console.log("ProductsInStock", productsInStock);
  if (productsInStock > 10) {
    console.log("Is greater");
  }

  let discount = parseInt("200");
  console.log("discount", discount);
  if (discount < 200) {
    console.log("Apply")
  } else {
    console.log("not apply")
  }

  let hex =  0xfff;
  console.log("hex", hex);
  let bin = 0b1010101;
  console.log("bin", bin);
})();
