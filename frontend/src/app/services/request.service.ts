import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requests = new BehaviorSubject([]);
  orderRequests = this.requests.asObservable();
  getReq(val:any){
    this.requests.next(val);
  }
  setReq(val:any){
    this.requests.next(val);
  }

}
