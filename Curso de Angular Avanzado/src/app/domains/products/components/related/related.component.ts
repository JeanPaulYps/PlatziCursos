import { Component, inject, input } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductComponent } from '@products/components/product/product.component';

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
  styleUrl: './related.component.css',
})
export class RelatedComponent {
  productService = inject(ProductService);
  $slug = input.required<string>({alias: 'slug'});

  relatedProducts = rxResource({
    request: () => ({
      slug: this.$slug(),
    }),
    loader: ({ request }) => this.productService.getRelated(request.slug),
  });
}
