import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  products:Product[]=[];
  constructor(private productService:ProductsService){}

  ngOnInit(){
    this.productService.getProducts().subscribe((data:any)=>{this.products=data
    }
    )
  }
}
