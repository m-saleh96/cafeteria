import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.css']
})
export class ProductsSliderComponent {
  products:Product[]=[];
  constructor(private productService:ProductsService){}

  ngOnInit(){
    this.productService.getProducts().subscribe((data:any)=>(this.products=data))
  }
}
