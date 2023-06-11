import { Component , Input} from '@angular/core';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
@Input() category!:Category;

constructor(private route:Router){}

redirectToProduct(id:number){
  this.route.navigate(['category-details' , id])
}
}
