import { Target } from '@angular/compiler';
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutSide]',
  standalone: true
})
export class ClickOutSideDirective {

  @Output() clickOutSide = new EventEmitter()

  private _element !: ElementRef

  constructor(elementRef: ElementRef) {

    this._element = elementRef

  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: Target){
    !this._element.nativeElement.contains(target) ? this.clickOutSide.emit() : null
  }

}
