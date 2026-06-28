import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
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
    return this.http.get<string[]>(`${API_URL}products/categories`);
  }
  getProductsGroupedByCategory() {
    return this.getProducts().pipe(
      map(products => {
        return products.reduce((groupedMap, product) => {
          const slugKey = this.generateSlug(product.category);
          const categoryList = groupedMap.get(slugKey) || [];
          categoryList.push(product);
          groupedMap.set(slugKey, categoryList);
         return groupedMap;
        }, new Map<string, Product[]>());
      })
    );
  }

  generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/'/g, '')             // Removes apostrophes entirely (e.g., men's -> mens)
      .replace(/[^a-z0-9]+/g, '-')   // Replaces any non-alphanumeric character sequences with a single hyphen
      .replace(/^-+|-+$/g, '');      // Trims hyphens from the very beginning or end of the string
  }
}