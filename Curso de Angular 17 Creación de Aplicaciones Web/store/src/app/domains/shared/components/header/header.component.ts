import { Component,  computed,  inject,  input,  Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@/shared/services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;



  toggleSideMenu () {
    this.hideSideMenu.update((prevState) => !prevState);
  }
}
