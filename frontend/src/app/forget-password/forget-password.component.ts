import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RestPasswordService } from '../services/rest-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {


  constructor(private authService:RestPasswordService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'Email':new FormControl(null , [Validators.email , Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
      this.authService.send_email(loginForm.value).subscribe((data)=>{
        if (data !== 'user not found plz create acount') {
        //   this.authService.send_email(data)
        this.authService.saveEmail_number(data)
        this.router.navigate(['/cheekNumber'])
        // console.log(data)

      }
        else{
          this.flag = true;
          this.errorMessage = "this Email not found plz create new acount";
        }

      })
    }else{
      this.flag = true;
    }

  }


}
