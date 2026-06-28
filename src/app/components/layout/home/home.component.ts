import { Component, inject, OnInit } from '@angular/core';
import { Image } from 'primeng/image';
import { Product, ProductService } from '../../../services/product.service';
import { KeyValuePipe } from '@angular/common';
import { ProductCarouselComponent } from '../../features/product-carousel/product-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Image, KeyValuePipe, ProductCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  productMap: Map<string, Product[]> = new Map<string, Product[]>();
  ngOnInit(): void {
    this.productService.getProductsGroupedByCategory().subscribe((res) => {
      this.productMap = res
    });
    
  }
}
