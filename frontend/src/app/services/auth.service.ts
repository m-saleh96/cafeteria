import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { userData } from '../userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUsers = new BehaviorSubject(null);
  constructor(private http:HttpClient , private router:Router) {
    if (localStorage.getItem('userData') != null) {
      let userData:any
      userData = localStorage.getItem('userData')
      userData=JSON.parse(userData)
      this.currentUsers.next(userData);
    }
  }


  register(registerFormValue:any):Observable<any>
  {
    return this.http.post('http://localhost/cafeteria/backend/users' , registerFormValue)
  }

  login(loginFormValue:any):Observable<any>
  {
    return this.http.post('http://localhost/cafeteria/backend/login' , loginFormValue)
  }

  saveCurrentUser(token:any)
  {
    let user = new userData(token);
    localStorage.setItem('userData' , JSON.stringify(token))
    this.currentUsers.next(token);
  }

  logOut(){
    this.currentUsers.next(null);
    localStorage.clear() ;
    this.router.navigate(['/login'])
  }

}
