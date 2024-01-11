import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {

  transform(array: any[], valueFilter: string, startWith: boolean = true, arrayKey?: string | number | undefined): any[] {
    if(array.length == 0) return []
    return array.filter((val, index)=>{
      let key = arrayKey == undefined ? index : arrayKey
      return startWith == true ? String(val[key]).toLowerCase().startsWith(valueFilter.toLowerCase()) : String(val[key]).toLowerCase() === valueFilter.toLowerCase()
    })
  }


}
