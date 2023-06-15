import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestPasswordService } from '../services/rest-password.service';

@Component({
  selector: 'app-cheeck-numb-email',
  templateUrl: './cheeck-numb-email.component.html',
  styleUrls: ['./cheeck-numb-email.component.css']
})
export class CheeckNumbEmailComponent {

  constructor(private authService:RestPasswordService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'number':new FormControl(null , [Validators.min(100000),Validators.max(999999), Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
    const data=this.authService.getEmail_number()
        if (loginForm.value.number== data[0]) {
          this.router.navigate(['/resetPassword'])
        // console.log( data[0])
      }
        else{
          this.flag = true;
          this.errorMessage = "this number is not correct plz try again" ;
        }
    }else{
      this.flag = true;
    }

  }


}
