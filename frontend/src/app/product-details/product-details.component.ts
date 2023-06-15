import { Component , OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute , Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
id!:number;
product!:any;
counter:number = 0;
requests:any;

constructor(private route:ActivatedRoute, private productService:ProductsService,private router:Router , private counterService:CounterService , private requestService:RequestService ,
  private authService:AuthService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProductDetails(this.id);
    });

    this.counterService.counterVal.subscribe(res => (this.counter = res));
    this.requestService.orderRequests.subscribe(res => (this.requests = res));
  }

getProductDetails(id: number): void {
  this.productService.getProduct(id).subscribe(
    (data: any) => {
      this.product = data;
      console.log(this.product);
    },
    (error: any) => {
      console.error('Error retrieving product details:', error);
    }
  );
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
