import { Component } from '@angular/core';
import { Users } from '../interfaces/users';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  constructor(private http: HttpClient, private router: Router, private usersService:UsersService, public fb: FormBuilder){}
users !:Users[];
flag:boolean=false;
activeForm:boolean=false;
activeAddbutton:boolean = false;
activeupdatebutton:boolean = false;
productId!:number;
AddUser(){
  this.router.navigate(['addUser'])

}
ngOnInit(): void {
  
  this.usersService.getUsers().subscribe((res: any) => this.users = res);
console.log(this.users);

}
deleteUser(id: number) {
  console.log(id);  
  this.users = this.users.filter((elem:any)=>(elem.id)!=id)
  this.usersService.deleteUser(id).subscribe((res:any) => {
    console.log(res);

  });

}
editUser(id: number){
  this.router.navigate(['editUser',id])

}
}

