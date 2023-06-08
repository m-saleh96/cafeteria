import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
products:any[]=[];
constructor(private productService:ProductsService){}

ngOnInit(){
  this.productService.getProducts().subscribe((data:any)=>{
    this.products=data;
    console.log(this.products);

  })
}

}
