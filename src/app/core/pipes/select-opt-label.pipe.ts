import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '../interfaces/selectOption.interface';

@Pipe({
  name: 'selectOptLabel',
  standalone: true
})
export class SelectOptLabelPipe implements PipeTransform {

  transform(value: string, selectOptions: SelectOption[], defLabel: string = 'select an option...'): string {
    selectOptions.find(opt=>opt.value == value ? defLabel = opt.label : null)
    return defLabel
  }

}
