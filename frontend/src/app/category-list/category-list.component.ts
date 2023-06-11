import { Component } from '@angular/core';
import { Category } from '../interfaces/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categories:Category[]=[];

  constructor(private categoryService:CategoryService){}

  ngOnInit(){
    this.categoryService.getCategories().subscribe((data:any)=>this.categories=data)
  }

}
