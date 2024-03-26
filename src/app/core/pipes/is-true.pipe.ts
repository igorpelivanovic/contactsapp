import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isTrue',
  standalone: true
})
export class IsTruePipe implements PipeTransform {

  transform(value: boolean, positive: string, negative: string | null = null): string | null {
    if(value == true) return positive
    return negative
  }

}
