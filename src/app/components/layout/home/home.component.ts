import { Component, inject, OnInit } from '@angular/core';
import { Image } from 'primeng/image';
import { Product, ProductService } from '../../../services/product.service';
import { KeyValuePipe } from '@angular/common';
import { ProductCarouselComponent } from '../../features/product-carousel/product-carousel.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KeyValuePipe, ProductCarouselComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  productMap: Map<string, Product[]> = new Map<string, Product[]>();
  images: string[] = [
    'hero-banner.png',
    'hero-banner-2.png',
  ];
  ngOnInit(): void {
    this.productService.getProductsGroupedByCategory().subscribe((res) => {
      this.productMap = res
    });
    
  }
}
