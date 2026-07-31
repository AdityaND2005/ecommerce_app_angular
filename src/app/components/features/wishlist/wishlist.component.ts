import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private router = inject(Router);
  private wishlistService = inject(WishlistService);
  items = this.wishlistService.wishlist().products;
  
  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
