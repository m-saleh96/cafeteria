import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  counter:number = 0;
  constructor(private counterService:CounterService){}

  ngOnInit(){
    this.counterService.counterVal.subscribe(res=>this.counter=res);
  }
}
