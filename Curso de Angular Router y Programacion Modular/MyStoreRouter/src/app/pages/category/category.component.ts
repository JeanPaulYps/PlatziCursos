import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class  CategoryComponent implements OnInit {
  categoryId: string| null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ){}


  ngOnInit() {
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((categoryId)=> {
        this.categoryId = categoryId;
        if (categoryId) {
          return this.productService.getByCategory(categoryId, this.limit, this.offset);
        } 
        return of([]);
        
      })
    ).subscribe((products) => {
      this.products = products;
    });

     this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

  onLoadMoreProducts () {
    if (this.categoryId){
        this.offset += 1;
        this.productService.getByCategory(this.categoryId, this.limit, this.offset).subscribe(
          data => {
            this.products = [...this.products, ...data];
          }
        );
      }
  }
}
