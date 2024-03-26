import { Pipe, PipeTransform } from '@angular/core';
import { DynamicObject } from '../interfaces/model.interface';

@Pipe({
  name: 'getArrayOfPropertyObecktOfArray',
  standalone: true
})
export class GetArrayOfPropertyObecktOfArray implements PipeTransform {

  transform(arrayOfObject: DynamicObject<any>[], propertyKey: string): any[] {
    return arrayOfObject.map((element)=>{
      return element[propertyKey]
    })
  }

}
