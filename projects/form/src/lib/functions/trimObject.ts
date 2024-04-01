import { DynamicObject } from "../interfaces/model.interface"

export function trimObject(value: unknown): unknown {
    if(typeof value === 'string'){ 
        return value.trim()
      }
    if(typeof value === 'object' && Array.isArray(value) && value != null) return value.map(val=>trimObject(val))
    if(typeof value === 'object' && !Array.isArray(value) && value != null){
        let trimData: DynamicObject<unknown> = {}
        Object.keys(value).forEach(kes=>{
            trimData[kes] = trimObject(value[kes as keyof typeof value])
        })
        return trimData
    }
    return value
}

