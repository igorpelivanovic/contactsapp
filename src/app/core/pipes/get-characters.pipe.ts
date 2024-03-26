import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCharacters',
  standalone: true
})
export class GetCharactersPipe implements PipeTransform {

  transform(value: string, start: number, end: number | undefined = undefined): string {
    return value.slice(start, end)
  }

}
