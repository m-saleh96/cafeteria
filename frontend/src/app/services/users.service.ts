import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`http://localhost/cafeteria/backend/users`)
  }

  getUser(id:number){
    return this.http.get(`http://localhost/cafeteria/backend/users/${id}`)
  }

  addUser(formData:any){
    return this.http.post(`http://localhost/cafeteria/backend/users` , formData)
  }

  updateUser(id:number , formData:any){
    return this.http.post(`http://localhost/cafeteria/backend/users/${id}` , formData)
  }

  deleteUser(id:number){
    return this.http.delete(`http://localhost/cafeteria/backend/users/${id}`)
  }

}
