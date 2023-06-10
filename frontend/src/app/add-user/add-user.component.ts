import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Users } from '../interfaces/users';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {




users!:Users[];
flag:boolean=false;
// activeForm:boolean=false;
userId!:number;

constructor(private userService:UsersService, private router: Router ){}

selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addUsers:FormGroup = new FormGroup({
    'name' :new FormControl(null , [Validators.required]),
    'email' :new FormControl(null , [Validators.required ]),
    'password' :new FormControl(null , [Validators.required ]),
    'room' :new FormControl(null , [Validators.required ]),
    'ext' :new FormControl(null , [Validators.required ]),
    'picture' :new FormControl(null , [Validators.required ]),
  })


add(addUsers:any)
  {
      if (this.addUsers.valid && this.selectedFile) {
        console.log(addUsers.value);
        const formData = new FormData();
        formData.append('Name', this.addUsers.get('name')!.value);
        formData.append('Email', this.addUsers.get('email')!.value);
        formData.append('Password', this.addUsers.get('password')!.value);
        formData.append('Room_No', this.addUsers.get('room')!.value);
        formData.append('Ext', this.addUsers.get('ext')!.value);
        formData.append('picture', this.selectedFile);
        console.log(formData);
        // Send the formData to the server using HttpClient
        this.userService.addUser(formData).subscribe((data:any)=>{
            console.log(data);
            this.users=data
            this.router.navigate(['admin/users'])

            }
            )

    }
  }


}
