import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name:any='';
  email:any='';
  room:any='';
  role:any='';
  image:any='';

  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.currentUsers.subscribe((data:any)=>{
      this.name=data[1].Name
      this.email=data[1].Email
      this.room=data[1].Room_No
      if (data[1].Is_admin == 1) {
        this.role = "admin";
      } else{
        this.role = "user";
      }
      this.image=data[1].picture
    })
  }
}
