import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Product } from '../../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { WishlistService } from '../../../services/wishlist.service';


@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink, ButtonModule],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {
  @Input({ required: true }) categoryName!: string;
  @Input({ required: true }) products: Product[] = [];
  wishlistService = inject(WishlistService);

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 }
  ];

  formattedCategoryName(): string {
    if (!this.categoryName) return '';
    return this.categoryName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  wishBtn(p: Product) {
    const isPresent = this.wishlistService.isPresent(p);
    isPresent ? this.wishlistService.deleteItem(p.id) : this.wishlistService.addItem(p);
  }
}
