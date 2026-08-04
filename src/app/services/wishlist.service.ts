import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product.service';
import { AuthService } from './auth.service';

export interface Wishlist {
  userId?: string;
  products: Product[]
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  authService = inject(AuthService);
  
  wishlist = signal<Wishlist>({
    products: []
  });

  addItem(product: Product) {
    if (!this.authService.isLoggedIn$()) {
      this.authService.openLoginDialog()
      return;
    }
    this.wishlist.update(wishlist => {
      const products = wishlist.products;
      const updatedProducts = products.find(item => item.id === product.id) ? products : [...products, product];
      return {
        ...wishlist,
        products: updatedProducts
      }
    })
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist()))
  }
  
  deleteItem(id: number) {
    if (!this.authService.isLoggedIn$()) {
      this.authService.openLoginDialog()
      return;
    }
    this.wishlist.update(wishlist => {
      const products = wishlist.products;
      const updatedProducts = products.filter(item => item.id !== id);
      return {
        ...wishlist,
        products: updatedProducts
      };
    });
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist()))
  }

  isPresent(p: Product) {
    return this.wishlist().products.some((prod) => prod.id === p.id);
  }
}
