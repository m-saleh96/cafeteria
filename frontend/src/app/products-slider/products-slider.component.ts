import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.css']
})
export class ProductsSliderComponent {
  products:any[]=[];

  constructor(private productService:ProductsService){}
  ngOnInit():void{
    this.productService.getProducts().subscribe((res:any)=>this.products=res);
  }

}
