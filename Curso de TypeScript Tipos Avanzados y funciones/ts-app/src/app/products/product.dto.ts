import { Product } from './product.model';

export interface CreateProductDto
  extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'> {
  categoryId: string;
}

export interface updateProductDto extends Partial<CreateProductDto> {}

export interface FindProductDto extends Partial<Product> {}

