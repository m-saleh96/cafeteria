import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
orders:any[]=[];
userID!:number;
constructor(private authService:AuthService , private orderService:OrderService){}
ngOnInit(){
  this.authService.currentUsers.subscribe((data:any)=>this.userID=data[1].id);
  this.orderService.getOrderByUserId(this.userID).subscribe((res:any)=>this.orders=res);


}

}
