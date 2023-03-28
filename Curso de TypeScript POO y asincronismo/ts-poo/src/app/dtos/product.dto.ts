import { Category } from '../models/category.model';
import { Product } from '../models/product.model';


export interface CreateProductDto extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'>{
  categoryId: Category["id"];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}


export interface FindProductDto extends Readonly<Partial<Omit<Product, 'tags'>>> {
  readonly tags: ReadonlyArray<string>;
}

type example3 = Readonly<Product>;
