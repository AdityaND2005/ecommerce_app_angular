import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../../services/product.service';
import { switchMap } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  private router = inject(Router);
  cartService = inject(CartService);

  product = this.activatedRoute.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      return this.productService.getProduct(id);
    })
  );

  constructor(private location: Location) { }

  cartBtn(p: Product) {
    this.cartService.addItem(p);
    if (this.authService.isLoggedIn$()) this.router.navigate(['/cart']);
    
  }

  wishBtn(p: Product) {
    const isPresent = this.wishlistService.isPresent(p);
    isPresent ? this.wishlistService.deleteItem(p.id) : this.wishlistService.addItem(p);
    console.log(this.wishlistService.wishlist());
  }

  goBack() {
    this.location.back();
  }
}
