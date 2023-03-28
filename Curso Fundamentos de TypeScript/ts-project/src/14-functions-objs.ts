(() => {
  const login = (data : {email:string, password?: string}) => {
    console.log(data.email, data.password);
  }

  const loginV2 = ( {email, password}: {email: string, password?: string}) => {
    console.log(email,password);
  }

  loginV2({email: "dadfas"})

  login({
    email: "nico@nico.co",
    password: "1212121",
  });

  type Sizes = "S" | "M" | "L" | "XL";

  const products: any[] = [];

  const addProduct = (data: {
    title: string,
    createdAt: Date,
    stock: number,
    size?: Sizes,
  }) => {
    products.push(data);
  }

  addProduct({
    title: "Product 1",
    createdAt: new Date(),
    stock: 12,
  })
})();
