import { Pipe, PipeTransform } from '@angular/core';
import { ContactInterface, GroupContactsInterface } from '../interfaces/contact.interface';
import { DynamicObject } from '../interfaces/model.interface';

@Pipe({
  name: 'groupBy',
  standalone: true
})
export class GroupByPipe implements PipeTransform {

  private caracters = 'abcčćdđefghijklmnopqrsštuvwxyzž'
  private defCaracter = '&'

  transform(contactsArray: ContactInterface[]): GroupContactsInterface[] {
    let groupObj =  contactsArray.reduce((groupObj, element)=>{
      let letter = element.name.slice(0,1).toLowerCase()
      let groupKey = this.caracters.indexOf(letter) < 0 ? this.defCaracter : letter
      if(groupKey in groupObj){
        groupObj[groupKey].push(element)
      }else{
        groupObj[groupKey] = [element]
      }
      return groupObj
    }, {} as DynamicObject<ContactInterface[]>)
    return Object.keys(groupObj).map(key=>{
      return {key: key, values: groupObj[key]}
    })
  }
  
}
