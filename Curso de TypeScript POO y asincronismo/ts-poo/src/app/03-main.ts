import { ProductHttpService } from './service/product-http.service';

(async () => {
  const productService = new ProductHttpService();

  console.log('---'.repeat(10));
  console.log("getAll")

  const products = await productService.getAll();
  console.log(products.length);
  const productId = products[0].id;

  console.log('---'.repeat(10));
  console.log("update");

  await productService.update(productId,  {
    price: 100000,
    title: "Nuevo title",
    description: "Nueva descripción"
  });

  console.log('---'.repeat(10));
  console.log("findOne");

  const product = await productService.findOne(productId);
  console.log(product);
})();
