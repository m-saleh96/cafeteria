import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  counter:number = 0 ;
  counterValOrder:number = 1;
  productsIDs:any=[];
  products:any[]=[];
  constructor(private route:Router , private counterService:CounterService , private requestService:RequestService , private productService:ProductsService){}

  ngOnInit(){
    this.counterService.counterVal.subscribe(res=>this.counter = res);
    this.counterService.counterValOrder.subscribe(res=>this.counterValOrder = res);
    this.requestService.orderRequests.subscribe(res=>this.productsIDs=res);

    this.productsIDs.forEach((elem:number) => {
      this.productService.getProduct(elem).subscribe((res:any) => {
        res.quantity =1;
        this.products.push(res)
      });
    });

    if (this.counter == 0) {
      this.route.navigate(['home'])
    }
  }



  removeProduct(id:any){
    this.products = this.products.filter(
      (elem:any) => elem.id !== id);
    this.productsIDs = this.productsIDs.filter(
      (elem:any) => elem !== id);
      this.requestService.getReq(this.productsIDs)
      console.log(this.productsIDs);
      this.counterService.setCounter(--this.counter)
  }


  increese(id:any){
    this.products.map((elem:any)=>
    {
      if(elem.id == id){
          elem.quantity++;
      }
    })
  }

  decreese(id:any){
    this.products.map((elem:any)=>
    {
      if(elem.id == id){
        if(elem.quantity>1)
        elem.count--;
      }
    })
  }

}
