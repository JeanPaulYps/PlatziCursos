import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Product } from '@/shared/models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import { ProductComponent } from '@/products/components/product/product.component';
import { CategoryService } from '@/shared/services/category.service';
import { Category } from '@/shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id ?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges (changes: SimpleChanges)
  {
    if (this.category_id) {
      this.getProductsByCategory();
    }
    else {
      this.getProducts();
    }
    console.log(this.category_id);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    return this.productService.getProducts().subscribe({
      next: (sentProducts) => {
        const sanitizedProducts = sentProducts.map((product) => ({
          ...product,
          images: product.images.map(
            () => 'https://picsum.photos/640/640?r=' + Math.random()
          ),
        }));
        this.products.set(sentProducts);
        console.log(this.products);
      },
      error: () => {},
    });
  }

  private getProductsByCategory () {
    this.productService.getProductsByCategory(this.category_id).subscribe(
      {
        next: products => this.products.set(products),
        error: () => {}
      }
    );
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (fetchedCategories) => this.categories.set(fetchedCategories),
    });
  }
}
