import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { map, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ButtonModule,AsyncPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  currentSlug = '';
  categoryProducts$ = this.activatedRoute.paramMap.pipe(
    switchMap(params => {
      const slug = params.get('name') || '';
      this.currentSlug = slug;

      return this.productService.getProductsGroupedByCategory().pipe(
        map(groupedMap => groupedMap.get(slug) || [])
      );
    })
  );

  get formattedCategoryName(): string {
    if (!this.currentSlug) return 'Category Not Found';
    return this.currentSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
