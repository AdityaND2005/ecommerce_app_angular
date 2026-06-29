import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  private activatedRoute = inject(ActivatedRoute);
  categoryName!:string | null;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
    this.categoryName = params.get('name');
  });
  }
}
