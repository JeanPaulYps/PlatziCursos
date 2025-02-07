import { Component, inject, signal } from '@angular/core';
import { Product } from '@/shared/models/product.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "@/shared/components/header/header.component";
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import { ProductComponent } from '@/products/components/product/product.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal <Product[]>([])
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  private cleanAndParseImageUrl(image: string): string {
    let cleanedImage = image.replace(/^\["?|"?]$/g, '');
    try {
      cleanedImage = JSON.parse(cleanedImage);
    } catch (error) {
      //
    }
    return cleanedImage;
  }

  ngOnInit () {
    this.productService.getProducts().subscribe({
      next: (sentProducts) => {
        const sanitizedProducts = sentProducts.map((product) =>
          ({ ...product,
            images: product.images.map(() =>
              'https://picsum.photos/640/640?r=' + Math.random()
            )
            }))
        this.products.set(sanitizedProducts);
        console.log(this.products)
      },
      error: () => {

      }
    });

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
