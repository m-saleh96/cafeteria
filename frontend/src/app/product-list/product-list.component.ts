import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
products:Product[]=[];
constructor(private productService:ProductsService, private router: Router){}

ngOnInit(){
  this.productService.getProducts().subscribe((data:any)=>{this.products=data
    this.products.splice(8)
  }
  )
}

onViewAllClick() {
  this.router.navigate(['/allproducts']);
}
}
