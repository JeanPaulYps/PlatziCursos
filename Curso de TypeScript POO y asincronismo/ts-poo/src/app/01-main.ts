import axios from 'axios';
import { Product } from './models/product.model';

(async () => {
  async function getProducts() {
    const { data } : { data: Product[]} = await axios.get<Product[]>(
      'https://api.escuelajs.co/api/v1/products'
    );
    return data;
  }

  console.log('---'.repeat(10));
  const products = await getProducts();
  console.log(products.map((item) => `${item.id} - ${item.title}`));
})();
