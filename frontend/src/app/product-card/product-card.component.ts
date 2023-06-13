import { Component , Input } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input() product!:any;
counter:number = 0;
requests:any;
constructor(private route:Router , private counterService:CounterService , private requestService:RequestService ,
  private authService:AuthService , private router:Router ){
    authService.currentUsers.subscribe((data:any)=>{
    if (data ==null) {
      this.router.navigate(['/login'])
    }
  })
}

ngOnInit(){
  this.counterService.counterVal.subscribe(res=>this.counter=res);
  this.requestService.orderRequests.subscribe(res=>this.requests=res);
};

redirectToProduct(id:number){
  this.route.navigate(['product-details' , id]);
}

addToCart(id:number){
  this.requests.push(id);
  this.requestService.getReq(this.requests);
  this.counterService.setCounter(++this.counter);
}

}
