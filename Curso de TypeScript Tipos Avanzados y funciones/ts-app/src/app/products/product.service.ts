import { CreateProductDto, updateProductDto, FindProductDto} from './product.dto';
import { Product } from './product.model';
import { faker } from '@faker-js/faker';

export const products: Product[] = [];

export const addProduct = (data: CreateProductDto): Product => {
  const newProduct = {
    ...data,
    id: faker.datatype.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    category: {
      id: data.categoryId,
      name: faker.commerce.department(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    },
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: Product["id"] , changes: updateProductDto) => {
  const indexOfItemToUpdate = products.findIndex(
    (product) => product.id === id
  );
  const product = products[indexOfItemToUpdate];
  products[indexOfItemToUpdate] = { ...product, ...changes };
  return products[indexOfItemToUpdate];
};

export const deleteProduct = (id: Product["id"]) => {
  const indexOfItemToDelete = products.findIndex(
    (product) => product.id === id
  );
  if (indexOfItemToDelete !== -1) {
    products.splice(indexOfItemToDelete, 1);
  }
};

export const findProducts = (dto: FindProductDto): Product[] => {

  return products;
}

export const getProduct = (id: Product["id"]) =>
  products.find((product) => product.id === id);
