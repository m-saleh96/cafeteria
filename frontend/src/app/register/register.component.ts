import { Component } from '@angular/core';
import { FormGroup , FormControl ,Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService:AuthService , private router:Router){}
  errorMessage:any='';
  flag:boolean = false;

  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  registerForm:FormGroup = new FormGroup({
    'Name' :new FormControl(null , [Validators.required , Validators.minLength(3)]),
    'Email' :new FormControl(null , [Validators.required , Validators.email , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    'Password' :new FormControl(null , [Validators.required , Validators.minLength(8) , Validators.maxLength(30)]),
    'Room_No' :new FormControl(null , [Validators.required]),
    'Ext' :new FormControl(null , [Validators.required]),
    'picture' :new FormControl(null , [Validators.required])
  })



  getRegisterInfo(registerForm:any)
  {

    if (this.registerForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('Name', this.registerForm.get('Name')!.value);
      formData.append('Email', this.registerForm.get('Email')!.value);
      formData.append('Password', this.registerForm.get('Password')!.value);
      formData.append('Room_No', this.registerForm.get('Room_No')!.value);
      formData.append('Ext', this.registerForm.get('Ext')!.value);
      formData.append('picture', this.selectedFile);
      this.authService.register(formData).subscribe((data)=>{
            if (data !== "error duplicated email plz login or reset password") {
              this.router.navigate(['/login'])
            }
            else{
              this.errorMessage = data;
              this.flag = true;
            }})
    } else{
      this.flag = true
    }
  }


}
