import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  // for cart
  private counter = new BehaviorSubject(0);
  counterVal = this.counter.asObservable();

  setCounter(newCounterVal:number){
    this.counter.next(newCounterVal);
  }

  // for orders
  private orderCounter = new BehaviorSubject(0);
  orderValCounter = this.orderCounter.asObservable();

  setCounterOrder(newCounterVal:number){
    this.orderCounter.next(newCounterVal);
  }




}
