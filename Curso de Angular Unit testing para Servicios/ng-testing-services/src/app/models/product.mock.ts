import { faker } from '@faker-js/faker';
import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: {
      id: faker.number.int(),
      name: faker.commerce.department(),
    },
    images: [faker.image.url(), faker.image.url()]
  }
}

export const generateManyProducts = (size = 10): Product[] => {
  const products = Array(size).fill(generateOneProduct());
  return products;
}
