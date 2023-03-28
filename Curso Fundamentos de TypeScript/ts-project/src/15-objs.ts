(() => {
  type Sizes = "S" | "M" | "L" | "XL";
  type Product = {
    title: string,
    createdAt: Date,
    stock: number,
    size?: Sizes,
  };

  const login = (data : {email:string, password?: string}) => {
    console.log(data.email, data.password);
  }

  login({
    email: "nico@nico.co",
    password: "1212121",
  });


  const products: Product[] = [];

  const addProduct = (data: Product) => {
    products.push(data);
  }

  addProduct({
    title: "Product 1",
    createdAt: new Date(),
    stock: 12,
  })
  addProduct({
    title: "Product 2",
    createdAt: new Date(),
    stock: 12,
    size: "XL",
  })
})();
