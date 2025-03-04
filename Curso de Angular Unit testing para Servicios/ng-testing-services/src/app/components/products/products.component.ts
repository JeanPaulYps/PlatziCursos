import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { generateManyProducts } from '../../models/product.mock';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private productService: ProductsService = inject(ProductsService);
  products = signal<Product[]>([]);
  constructor() {  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts () {
    return this.productService.
        getAllSimple().
        subscribe(response => {
          this.products.set(response as Product[])
      }) ;
  }
}
