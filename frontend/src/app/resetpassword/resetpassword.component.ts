import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestPasswordService } from '../services/rest-password.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
DATA:any

  constructor(private authService:RestPasswordService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'password':new FormControl(null , [Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
     const data=this.authService.getEmail_number()
      this.authService.resetPassword([data[1],loginForm.value.password]).subscribe((data)=>{
    //       // this.authService.saveCurrentUser(data)
          this.router.navigate(['/login'])
        console.log(data)

      })
    // }else{
    //   this.flag = true;
    }

  }


}
