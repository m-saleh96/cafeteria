import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get(`http://localhost/cafeteria/backend/products`)
  }

  getProduct(id:number){
    return this.http.get(`http://localhost/cafeteria/backend/product/${id}`)
  }

  addProduct(formData:any){
    return this.http.post(`http://localhost/cafeteria/backend/products` , formData)
  }











}
