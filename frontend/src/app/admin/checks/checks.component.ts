import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChecksOrder } from 'src/app/interfaces/checks-order';
import { Order } from 'src/app/interfaces/order';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
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
  selectval:any='out for delivery';
  changeStatus:any={};
  token!:any;
  constructor(private usersService: UsersService, private orderService: OrderService , private authService:AuthService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
    this.authService.currentUsers.subscribe((data:any)=>this.token=data[0])

  }
  start_date: any = '';
  end_Date: any = '';
  user: any = '';
  userName: any = '';

  onSubmit() {
    if (Number(this.user) >= 1) {
      this.users.filter(u => { if (u.id == Number(this.user)) this.userName = u.Name })
      this.orderService.getOrderByUserId(Number(this.user)).subscribe((res: any) =>{
        this.checks = res.reverse();
        if (this.start_date && this.end_Date) {
          const startDate = new Date(this.start_date);
          const endDate = new Date(this.end_Date);
          this.checks = this.checks.filter((order: any) => {
            const orderDate = new Date(order.created_at);
            return orderDate >= startDate && orderDate <= endDate;
          });
          console.log(this.checks);

        }
      }
      )
    } else {
      this.orderService.getOrders().subscribe((res: any) => {
        this.checks = res.reverse();
        if (this.start_date && this.end_Date) {
          const startDate = new Date(this.start_date);
          const endDate = new Date(this.end_Date);
          this.checks = this.checks.filter((order: any) => {
            const orderDate = new Date(order.created_at);
            return orderDate >= startDate && orderDate <= endDate;
          });
        }
      });
    }
  }

  updateStatus(id:any){
    this.changeStatus.id=id
    this.changeStatus.Token=this.token
    this.changeStatus.Stutes=this.selectval
    this.orderService.changeStatus(this.changeStatus).subscribe((data:any)=>{
      if (data) {
        alert('updated Successfully');
        window.location.reload();
      }
    })
  }
}
