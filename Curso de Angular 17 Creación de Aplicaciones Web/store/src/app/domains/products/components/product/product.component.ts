import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@/shared/models/product.model';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ReversePipe } from '@/shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [CommonModule, UpperCasePipe, CurrencyPipe, DatePipe, ReversePipe, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler () {
    this.addToCart.emit(this.product);
  }
}
