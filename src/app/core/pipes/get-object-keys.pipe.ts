import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getObjectKeys',
  standalone: true
})
export class GetObjectKeysPipe implements PipeTransform {

  transform(object: object): string[] {
    return Object.keys(object);
  }

}
