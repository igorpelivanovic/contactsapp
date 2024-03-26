import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveIndexContactsGroupService {

  private _subject!: Subject<string>

  constructor() {
    this._subject = new Subject()
  }

  set activeIndexContacts(val: string){
    this._subject.next(val)
  }

  get activeGroupContacts(): Observable<string>{
    return this._subject.asObservable()
  }
}
