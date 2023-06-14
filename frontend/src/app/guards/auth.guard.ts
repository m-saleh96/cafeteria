import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAdmin!:boolean;
  constructor(private authService:AuthService , private router:Router){ }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
      this.authService.currentUsers.subscribe((data:any)=>{
        if (data !=null) {
          this.isAdmin=data[1].Is_admin
        }
      })

      if (this.isAdmin) {
        return true;
      } else {
        this.router.navigate(['/login'])
        return false;
      }


    }

}
