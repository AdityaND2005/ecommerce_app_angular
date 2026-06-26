import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../constants';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  products = signal<Product[]>([]);

  getProducts() {
    return this.http.get<Product[]>(`${API_URL}products`);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${API_URL}products/${id}`);
  }

  getCategories() {
    
  }
}
