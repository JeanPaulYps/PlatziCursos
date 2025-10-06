import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

 constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location
  ){}

  ngOnInit () {
    this.route.paramMap.pipe(
          map((params) => params.get('id')),
          switchMap((productId)=> {
            this.productId = productId;
            if (productId) {
              return this.productService.getOne(productId);
            } 
            return of(null);
    
          })
        ).subscribe((product) => {
          this.product = product;
        });
  }

  goBack () {
    this.location.back();
  }
}
