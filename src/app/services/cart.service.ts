import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from './product.service';
import { AuthService } from './auth.service';

export interface CartItem extends Product {
  count: number;
}

export interface Cart {
  userId?: string,
  products?: CartItem[]
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  authService = inject(AuthService);

  cart = signal<Cart>({});
  totalPrice = computed(() =>
    (this.cart().products ?? []).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    )
  );

  addItem(product: Product) {
    if (!this.authService.isLoggedIn$()) {
      this.authService.openLoginDialog()
      return;
    }
    this.cart.update(cart => {
      const products = cart.products ?? [];
      const exist = products.find(item => item.id === product.id);
      const updatedProducts = exist ? products.map(item => item.id === product.id ? { ...item, count: item.count + 1 } : item) : [...products, { ...product, count: 1 }];
      return {
        ...cart,
        products: updatedProducts
      }
    })
    localStorage.setItem('cart', JSON.stringify(this.cart()))
  }

  removeItem(id: number) {
    if (!this.authService.isLoggedIn$()) {
      this.authService.openLoginDialog()
      return;
    }
    this.cart.update(cart => {
      const products = cart.products ?? [];
      const updatedProducts = products.map(item => item.id === id ? { ...item, count: item.count - 1 } : item).filter(item => item.count > 0);
      return {
        ...cart,
        products: updatedProducts
      };
    });
    localStorage.setItem('cart', JSON.stringify(this.cart()))
  }

  deleteItem(id: number) {
    if (!this.authService.isLoggedIn$()) {
      this.authService.openLoginDialog()
      return;
    }
    this.cart.update(cart => {
      const products = cart.products ?? [];
      const updatedProducts = products.filter(item => item.id !== id);
      return {
        ...cart,
        products: updatedProducts
      };
    });
    localStorage.setItem('cart', JSON.stringify(this.cart()))
  }
}
