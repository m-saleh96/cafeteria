import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  sendOrder(order:any){
    return this.http.post(`http://localhost/cafeteria/backend/orders` , order)
  }

}
