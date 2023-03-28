export const createProduct = (
  id: string | number,
  isNew: boolean = true,
  stock: number = 10,
) => (
  {
    id,
    stock,
    isNew,
  }
)


const p1 = createProduct(1, true);
console.log(p1);

const p2 = createProduct(1);
console.log(p2);
