import {
  Component,
  inject,
  signal,
  OnInit,
  input,
  linkedSignal,
  effect,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { RelatedComponent } from '@products/components/related/related.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage, RelatedComponent],
  templateUrl: './product-detail.component.html',
  standalone: true,
})
export default class ProductDetailComponent implements OnInit {
  readonly slug = input<string>();
  product = signal<Product | null>(null);
  $cover = linkedSignal(() => {
    const product = this.product();
    if (product && product.images.length > 0) {
      return product.images[0];
    }
    return '';
  });

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) {
        this.titleService.setTitle(product.title);
        this.metaService.updateTag({
          name: 'description',
          content: product.description!,
        });
        this.metaService.updateTag({
          name: 'og:title',
          content: product.title,
        });
        this.metaService.updateTag({
          name: 'og:description',
          content: product.description,
        });
        this.metaService.updateTag({
          name: 'og:url',
          content: `${environment.domain}/product/${this.slug()}`,
        });
      }
    });
  }

  ngOnInit() {
    const slug = this.slug();
    if (slug) {
      this.productService.getOne(slug).subscribe({
        next: (product) => {
          this.product.set(product);
        },
      });
    }
  }

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
