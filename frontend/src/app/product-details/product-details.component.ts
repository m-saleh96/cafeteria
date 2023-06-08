import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
id!:number;
product!:Product;
constructor(private route:ActivatedRoute, private productService:ProductsService){}

ngOnInit(): void {
this.route.params.subscribe(params=>this.id=params['id'])
this.productService.getProduct(this.id).subscribe((data:any)=>this.product=data)

}



}
