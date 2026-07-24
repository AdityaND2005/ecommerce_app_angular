import { Injectable, signal } from '@angular/core';
import { Product } from './product.service';

export interface Wishlist {
  userId?: string;
  products?: Product[]
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlist = signal<Wishlist>({});

  addItem(product: Product) {
    this.wishlist.update(wishlist => {
      const products = wishlist.products ?? [];
      const updatedProducts = products.find(item => item.id === product.id) ? products : [...products, product];
      return {
        ...wishlist,
        products: updatedProducts
      }
    })
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist()))
  }
  
  deleteItem(id: number) {
    this.wishlist.update(wishlist => {
      const products = wishlist.products ?? [];
      const updatedProducts = products.filter(item => item.id !== id);
      return {
        ...wishlist,
        products: updatedProducts
      };
    });
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist()))
  }
}
