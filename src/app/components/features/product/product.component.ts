import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { switchMap } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  product = this.activatedRoute.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      return this.productService.getProduct(id);
    })
  );

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
