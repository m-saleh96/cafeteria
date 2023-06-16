import { CounterService } from './../services/counter.service';
import { RequestService } from './../services/request.service';
import { Component } from '@angular/core';

import { Product } from '../interfaces/product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent {
  id!:number;
  product:Product[]=[];
  counter:number = 0;
  requests:any;
  constructor(private categoryService:CategoryService , private route:ActivatedRoute, private requestService:RequestService,
  private counterService:CounterService , private authService:AuthService , private router:Router ){}
  ngOnInit(){
    this.route.params.subscribe(params=>this.id=params['id'])
    this.categoryService.getCategoryByID(this.id).subscribe((data:any)=>this.product=data);
    this.requestService.orderRequests.subscribe(res=>this.requests=res);
    this.counterService.counterVal.subscribe(res=>this.counter=res)
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
