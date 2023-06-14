import { Component } from '@angular/core';
import { ChecksOrder } from 'src/app/interfaces/checks-order';
import { Users } from 'src/app/interfaces/users';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent {
  users !:Users[];
  checks !:ChecksOrder[];

  constructor(private usersService:UsersService,private orderService: OrderService){}
  
  ngOnInit(){
    // this.usersService.getUsers().subscribe((res: any) => {
    //   this.users=res;
    //   // console.log(this.users);
    // });

    this.orderService.getOrders().subscribe((res:any)=>{
      this.checks=res;
console.log(this.checks);

    })
  }
}
