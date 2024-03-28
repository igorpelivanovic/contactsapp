import { Pipe, PipeTransform } from '@angular/core';
import { DynamicObject } from '../interfaces/model.interface';

@Pipe({
  name: 'trimObject',
  standalone: true
})
export class TrimObjectPipe implements PipeTransform {

  transform(value: DynamicObject<unknown>): DynamicObject<unknown> {
    return this.trimObject(value) as DynamicObject<unknown>;
  }

  private trimObject(value: unknown): unknown{
    if(typeof value === 'string'){ 
      let val = value.trim()
      return val
    }
    if(typeof value === 'object' && Array.isArray(value) && value != null){
      return value.map(val=>this.trimObject(val))
    }
    if(typeof value === 'object' && !Array.isArray(value) && value != null){
      let trimData: DynamicObject<unknown> = {}
      Object.keys(value).forEach(kes=>{
        trimData[kes] = this.trimObject(value[kes as keyof typeof value])
      })
      return trimData
    }
    return value
  }

}
