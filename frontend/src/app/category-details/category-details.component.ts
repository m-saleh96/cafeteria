import { Component } from '@angular/core';

import { Product } from '../interfaces/product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent {
  id!:number;
  product:Product[]=[];
  constructor(private categoryService:CategoryService , private route:ActivatedRoute){}
  ngOnInit(){
    this.route.params.subscribe(params=>this.id=params['id'])
    this.categoryService.getCategoryByID(this.id).subscribe((data:any)=>console.log(data));

  }
}
