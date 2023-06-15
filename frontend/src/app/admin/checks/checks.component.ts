import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChecksOrder } from 'src/app/interfaces/checks-order';
import { Order } from 'src/app/interfaces/order';
import { Users } from 'src/app/interfaces/users';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent {
  users !: Users[];
  checks !: ChecksOrder[];
  orders!: Order[];

  constructor(private usersService: UsersService, private orderService: OrderService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
      console.log(this.users);
    });

    // this.orderService.getOrders().subscribe((res: any) => {
    //   this.checks = res;
    //   //console.log(this.checks);


    // })
  }
  start_date: any = '';
  end_Date: any = '';
  user: any = '';
  userName: any = '';

  onSubmit(startDate: NgForm, end_Date: NgForm, user: NgForm) {
    this.start_date = startDate;
    // console.log(this.start_date);
    // console.log(end_Date);
    // console.log(user);




    if (Number(user) >= 1) {
      this.users.filter(u => { if (u.id == Number(user)) this.userName = u.Name })
      this.orderService.getOrderByUserId(Number(user)).subscribe((res: any) => {
        res.name =
          this.checks = res
        // console.log(res)
        // console.log(userName);
        
      }
      );
    }
    else {
    //  this.users.map(u =>this.userName=u.Name)

      this.orderService.getOrders().subscribe((res: any) => {
        this.checks = res
        console.log(res)
      });

    }
    let selectedMembers = this.checks.filter(m => {
      if (m.created_at > this.start_date && m.created_at < this.end_Date && m.name == this.user) // or you can cast here to Date()
        console.log(m);
    });


  }
}
