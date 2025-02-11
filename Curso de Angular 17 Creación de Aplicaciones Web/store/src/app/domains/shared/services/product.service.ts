import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@/shared/models/product.model';
import { ENDPOINT_URL } from './constants';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

   getProducts () {
    return this.http.get<Product []>(`${ENDPOINT_URL}/products?offset=0&limit=10`);
   }

   getOne (id: string) {
    return this.http.get<Product>(`${ENDPOINT_URL}/products/${id}`);
   }

   getProductsByCategory (category_id?: string) {
    const url = new URL(`${ENDPOINT_URL}/products`);
    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }
    return this.http.get<Product []>(url.toString())
   }

}
