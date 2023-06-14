import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestPasswordService {
  

  constructor(private http:HttpClient , private router:Router) { }

  // localStorage: any.getItem('userData')
  
  //   // let userData:any
  //   // userData = localStorage.getItem('userData')
  //   // userData=JSON.parse(userData)
  //   // this.currentUsers.next(userData);
  // // }

  saveEmail_number(data:any)
  {
    localStorage.setItem('number' ,data[1])
    localStorage.setItem('Email' ,data[0])
  }

  getEmail_number()
  {
    return [localStorage.getItem('number'), localStorage.getItem('Email')];
  }
  send_email(Email:any):Observable<any>
  {
    return this.http.post('http://localhost/cafeteria/backend/sendEmail' , Email)
  }

  resetPassword(data:any):Observable<any>
  {
    // return data;
    return this.http.post('http://localhost/cafeteria/backend/repassword' , data)
  }

}
 