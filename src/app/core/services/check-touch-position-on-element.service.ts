import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckTouchPositionOnElementService {

  constructor() { }


  touchInXArea( element: HTMLElement, cordinate: number ): boolean{
    let elementData = element.getBoundingClientRect()
    let startPoint = elementData.x
    let endPoint = startPoint + elementData.width
    return cordinate >= startPoint && cordinate <= endPoint
  }

  touchInYArea( element: HTMLElement, cordinate: number ): boolean{
    let elementData  =element.getBoundingClientRect()
    let startPoint = elementData.y
    let endPoint = startPoint + elementData.height
    return cordinate >= startPoint && cordinate <= endPoint
  } 

  touchInArea( element: HTMLElement, cords: {xCord: number, yCord: number}): boolean{
    return this.touchInXArea(element, cords.xCord) && this.touchInYArea(element, cords.yCord)
  }

}
