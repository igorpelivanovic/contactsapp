import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPropertyArrayOfObject',
  standalone: true
})
export class GetPropertyArrayOfObjectPipe implements PipeTransform {

  transform(value: any, propertyKey: string, returnProperty: string, arrayOfObject: Object[], defValue: any = ''): any {
    let propertyObj = arrayOfObject.find(obj=>obj[propertyKey as keyof typeof obj] == value)
    return propertyObj ? propertyObj[returnProperty as keyof typeof propertyObj] : defValue
  }

}
