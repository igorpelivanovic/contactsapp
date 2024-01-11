import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';
import { DynamicObject } from '../interfaces/DynamicObject.inteface';
import { GroupContacts } from '../interfaces/GroupContacts.interface';

@Pipe({
  name: 'groupBy',
  standalone: true
})
export class GroupByPipe implements PipeTransform {

  transform(contactsArray: Contact[]): GroupContacts[] {
    let groupObj =  contactsArray.reduce((groupObj, element)=>{
      let groupKey = element.name.slice(0,1).toLowerCase()
      if(groupKey in groupObj){
        groupObj[groupKey].push(element)
      }else{
        groupObj[groupKey] = [element]
      }
      return groupObj
    }, {} as DynamicObject)
    return Object.keys(groupObj).map(key=>{
      return {key: key, values: groupObj[key]}
    })
  }
  
}
