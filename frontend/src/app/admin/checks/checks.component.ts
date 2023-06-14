import { Component } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent {
  users !:Users[];
  constructor(private usersService:UsersService){}
  
  ngOnInit(){
    this.usersService.getUsers().subscribe((res: any) => {this.users=res
    console.log(this.users);
    });
  }
}
