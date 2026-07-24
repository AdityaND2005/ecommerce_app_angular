import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TableModule, ButtonModule, CurrencyPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  private authService = inject(AuthService);
  private location = inject(Location);

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartService.cart.set(JSON.parse(cart));
    } else {
      this.cartService.cart.set({ userId: this.authService.getUserId() });
      localStorage.setItem('cart', JSON.stringify(this.cartService.cart()));
    }
  }

  goBack() {
    this.location.back();
  }
}
