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

  getOrder(id:number){
    return this.http.get(`http://localhost/cafeteria/backend/orders${id}`)
  }

  addOrder(formData:any){
    return this.http.post(`http://localhost/cafeteria/backend/orders` , formData)
  }

  sendOrder(order:any){
    return this.http.post(`http://localhost/cafeteria/backend/orders` , order)
  }

}
