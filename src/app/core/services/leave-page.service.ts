import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavePageService {

  private _leavePage : Subject<boolean> = new Subject()

  get status(): Observable<boolean>{
    return this._leavePage.asObservable()
  }

  set status(val: boolean){
    console.log("boolean")
    this._leavePage.next(val)
  }
}
