import { Injectable } from '@angular/core';
import { ContactInterface } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private itemKey : string = 'contacts'
  private _data: ContactInterface[] = []

  constructor() { 
    this._data = this.getData()  
  }

  private getData(): ContactInterface[]{
    let data = localStorage.getItem(this.itemKey)
    if(data == null) return []
    return JSON.parse(data)
  }

  private saveData(): void{
    localStorage.setItem(this.itemKey, JSON.stringify(this.data))
  }

  get data(): ContactInterface[]{
    return Array.from(this._data)
  }

  set addData(newContact: ContactInterface){
    this._data.push(newContact)
    this.saveData()
  }

  set deleteData(id: number){
    this._data = this.data.filter(contact=>contact.id != id)
    this.saveData()
  }

  set editData(contact: ContactInterface){
    let index = this.data.findIndex(cont=>cont.id == contact.id)
    if(index >= 0){
      this._data[index] = contact
      this.saveData()
    }
  }

  getDataFromId(id: number): ContactInterface | undefined{
    let data = this.data.find(item => item.id == Number(id))
    return data
  }

}
