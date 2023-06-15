import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
id!:number;
product!:Product;
counter:number = 0;
requests:any;

constructor(private route:ActivatedRoute, private productService:ProductsService,private router:Router , private counterService:CounterService , private requestService:RequestService ,
  private authService:AuthService){}

ngOnInit(): void {
this.route.params.subscribe(params=>this.id=params['id'])
this.productService.getProduct(this.id).subscribe((data:any)=>this.product=data)

this.counterService.counterVal.subscribe(res=>this.counter=res);
this.requestService.orderRequests.subscribe(res=>this.requests=res);
}
addToCart(id:number){
  this.authService.currentUsers.subscribe((data:any)=>{
  if (data ==null) {
    this.router.navigate(['/login'])
  } else{
    if(this.requests.includes(id)){
      return;
    }
    this.requests.push(id);
    this.requestService.getReq(this.requests);
    this.counterService.setCounter(++this.counter);
  }
  })
}



}
