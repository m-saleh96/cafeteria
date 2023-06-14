import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { Order } from '../interfaces/order';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

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
  orderPrice:number=0;
  userId!:number;
  room_no!:number;
  order: Order = {
    user_id: 1,
    products: [],
    total_price: 0,
    room_no: 1,
  };
  constructor(private route:Router , private counterService:CounterService , private requestService:RequestService ,
    private productService:ProductsService , private orderService:OrderService , private authService:AuthService){}

  ngOnInit(){
    this.counterService.counterVal.subscribe(res=>this.counter = res);
    this.counterService.counterValOrder.subscribe(res=>this.counterValOrder = res);
    this.requestService.orderRequests.subscribe(res=>this.productsIDs=res);
    this.authService.currentUsers.subscribe((data:any)=>{
      this.userId=data[1].id
      this.room_no=data[1].Room_No
    })
    this.productsIDs.forEach((elem:number) => {
      this.productService.getProduct(elem).subscribe((res:any) => {
        this.order["total_price"]+=res.price;
        this.orderPrice+=res.price;
        res.totalPrice=res.price
        res.quantity =1;
        this.products.push(res)
      });
    });

    if (this.counter == 0) {
      this.route.navigate(['home']);
    }

  }

  calcTotalPrice() {
    this.orderPrice = this.products.reduce((total, product) => total + product.totalPrice, 0);
    this.order.total_price = this.orderPrice;
  }

  removeProduct(id:any){
    this.products = this.products.filter((elem:any) => elem.id !== id);
    this.productsIDs = this.productsIDs.filter((elem:any) => elem !== id);
    this.requestService.getReq(this.productsIDs);
    this.counterService.setCounter(--this.counter);
    this.calcTotalPrice();
    if (this.counter == 0) {
      this.route.navigate(['home']);
    }

  }


  increese(id:any){
    this.products.map((elem:any)=>
    {
      if(elem.id == id){
          elem.quantity++;
          this.orderPrice+=elem.price
          elem.totalPrice+=elem.price
      }
    })
    this.calcTotalPrice();
  }

  decreese(id:any){
    this.products.map((elem:any)=>
    {
      if(elem.id == id){
        if(elem.quantity>1){
          elem.quantity--;
          this.orderPrice-=elem.price
          elem.totalPrice-=elem.price
        }
      }
    })
    this.calcTotalPrice();
  }

  sendOrder(){
    const product = this.products.map((product) => {
      return { product_id: product.id, quantity: product.quantity };
    });
    this.order["products"]=product;
    this.order["user_id"]=this.userId;
    this.order["room_no"]=this.room_no;
    this.orderService.sendOrder(this.order).subscribe((data:any)=>{
      if (data === "order created successfully") {
        alert("confirmed");
        this.counterService.setCounter(0);
        this.requestService.setReq([]);
        this.route.navigate(['my-orders']);
      }
    })
  }

}
