import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'Email':new FormControl(null , [Validators.email , Validators.required]),
    'password':new FormControl(null , [Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    console.log(loginForm.value);

    if(loginForm.valid == true){
      this.authService.login(loginForm.value).subscribe((data)=>{
        if (data !== 'email or password is error') {
          this.authService.saveCurrentUser(data.data)
          this.router.navigate(['/home'])
        }
        else{
          this.flag = true;
          this.errorMessage = data;
        }
        // console.log(data)

      })
    }else{
      this.flag = true;
    }

  }

}
