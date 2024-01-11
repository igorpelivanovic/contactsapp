import { Injectable, inject } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private itemKey : string = 'contacts'
  private _data: Contact[] = []

  constructor() { 
    this._data = this.getData()  
  }

  private getData(): Contact[]{
    let data = localStorage.getItem(this.itemKey)
    if(data == null) return []
    return JSON.parse(data)
  }

  private saveData(): void{
    localStorage.setItem(this.itemKey, JSON.stringify(this._data))
  }

  get data(): Contact[]{
    return this._data
  }

  set addData(newContact: Contact){
    this._data.push(newContact)
    this.saveData()
  }

}
