import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get(`http://localhost/cafeteria/backend/orders`)
  }

  addOrder(formData:any){
    return this.http.post(`http://localhost/cafeteria/backend/orders` , formData)
  }

  sendOrder(order:any){
    return this.http.post(`http://localhost/cafeteria/backend/orders` , order)
  }

  deleteOrder(order:any){
    return this.http.post(`http://localhost/cafeteria/backend/order_cansel` , order)
  }
  changeStatus(order:any){
    return this.http.post(`http://localhost/cafeteria/backend/order_Status` , order)
  }


  getOrderByUserId(id:number){
    return this.http.get(`http://localhost/cafeteria/backend/orders/${id}`)
  }
}
