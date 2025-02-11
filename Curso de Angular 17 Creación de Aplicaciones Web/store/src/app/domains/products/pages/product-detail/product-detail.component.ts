import { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id ?: string;

  product = signal<Product | null>(null);
  cover = signal<string>('');

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit () {
    if (this.id){
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length) {
            this.cover.set(product.images[0])
          }
        },
      }

      );
    }
  }

  handleImageclick(imageURL: string) {
    this.cover.set(imageURL);
  }

  addTocart() {
    const product = this.product();
    if(product){
      this.cartService.addToCart(product);
    }
  }


}
