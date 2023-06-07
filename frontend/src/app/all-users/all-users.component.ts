import { Component } from '@angular/core';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
users:Users[]=[
  {
    id: "1",
    Name: "semon",
    room:9,
    Image: "https://i.pinimg.com/236x/23/b7/bf/23b7bf89972c3611f3318aef98d1fefc.jpg",
    ext:5655


},
{
  id: "2",
  Name: "semon2",
 room:9,
  Image: "https://i.pinimg.com/236x/68/cc/2e/68cc2e285303d7ec54487587ea5bd12e.jpg",
  ext:5655


},
{
  id: "3",
  Name: "semon3",
  room:9,
  Image: "https://i.pinimg.com/236x/72/5b/86/725b86d7ebdc25714922f558db8b91ca.jpg",
  ext:5655


}



]
  //Name: semon, Email: semonsaleeb@gmail.com, Password: 123456789, Confirm Password: 123456789, Image*1.jpg
}
