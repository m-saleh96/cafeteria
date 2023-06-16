import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-all-products-card',
  templateUrl: './all-products-card.component.html',
  styleUrls: ['./all-products-card.component.css']
})
export class AllProductsCardComponent {
  @Input() product!:any;
  counter:number = 0;
  requests:any;
  constructor(private route:Router , private counterService:CounterService , private requestService:RequestService ,
    private authService:AuthService , private router:Router ){}

  ngOnInit(){
    this.counterService.counterVal.subscribe(res=>this.counter=res);
    this.requestService.orderRequests.subscribe(res=>this.requests=res);
  };

  redirectToProduct(id:number){
    this.route.navigate(['product-details' , id]);
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
