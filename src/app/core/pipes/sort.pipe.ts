import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(values: any[], sortKey: string, order: 'asc' | 'dsc' = 'asc'): any[] {
    if(values.length > 0){
      let sort = values.sort((a, b)=>{
        if(a[sortKey] > b[sortKey]) return 1
        if(a[sortKey] < b[sortKey]) return -1
        return 0
      })
      return order == 'dsc' ? sort.reverse() : sort
    }
    return []
  }

}
