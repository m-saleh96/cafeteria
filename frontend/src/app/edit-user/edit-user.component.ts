import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {


  users!: Users[];
  flag: boolean = false;
  userId!: number;
  keys!:any;
  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) { }
userInfo!:any;
  ngOnInit(): void {


    this.userId = Number(this.route.snapshot.paramMap.get('id'))

    // this.userId  =this.route.snapshot.paramMap.get('id')
    console.log(typeof (this.userId));

    this.userService.getUser(this.userId).subscribe((res: any) =>{this.users = res;
      console.log(Object.values(this.users));

      
     } ) 
    

  }




  selectedFile: File | null = null;
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    addUsers:FormGroup = new FormGroup({
      'name' :new FormControl(`` , [Validators.required]),
      'email' :new FormControl(null , [Validators.required ]),
      'password' :new FormControl(null , [Validators.required ]),
      'room' :new FormControl(null , [Validators.required ]),
      'ext' :new FormControl(null , [Validators.required ]),
      'picture' :new FormControl(null , [Validators.required ]),
    })


    Update(addUsers:any)
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
          this.userService.updateUser(this.userId,formData).subscribe((data:any)=>{
              console.log(data);
              this.users=data
              this.router.navigate(['admin/users'])

              }
              )

      }
    }


}
