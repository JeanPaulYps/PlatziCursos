import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@/shared/models/product.model';

const ENDPOINT_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);


  constructor() {

   }

   getProducts () {
    return this.http.get<Product []>(ENDPOINT_URL);
   }


}
