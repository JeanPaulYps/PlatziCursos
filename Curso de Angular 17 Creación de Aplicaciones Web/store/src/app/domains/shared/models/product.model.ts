
export interface Product {
  id: number,
  title: string,
  price: number,
  images: string[],
  creationAt: string,
  description: string,
  category: {
    name: string,
    id: number,
    image: string,
    creationAt: string,
    updatedAt: string,
  }
}
