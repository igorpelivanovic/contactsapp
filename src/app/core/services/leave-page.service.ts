import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PopUpModelBoxContent } from '../interfaces/popUpContent.interface';

@Injectable({
  providedIn: 'root'
})
export class PopUpPageService {

  private _content!: PopUpModelBoxContent
  private _leavePage : Subject<boolean> = new Subject()

  get status(): Observable<boolean>{
    return this._leavePage.asObservable()
  }

  get content(): PopUpModelBoxContent{
    return this._content
  }

  set renderModel(data: PopUpModelBoxContent){
    this._content = data
  }

  set status(val: boolean){
    this._leavePage.next(val)
  }
}
