import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, inject } from '@angular/core';
import { ActiveIndexContactsGroupService } from '../services/active-index-contacts-group.service';

@Directive({
  selector: '[appScrollToElement]',
  standalone: true
})
export class ScrollToElementDirective {

  private _element: ElementRef

  private _elementIntoViewServ = inject(ActiveIndexContactsGroupService)

  @Input({required: true, alias: 'sectionIndex'}) sectionIndex!: string
  @Input({required: true, alias: 'containerInFocus'}) containerInFocus: boolean = false

  constructor(@Inject(DOCUMENT) private document: Document, element:ElementRef) {
    this._element = element
  }

  @HostListener('mousedown') onMouseDown(): void{
    this.goToElement()
    return
  }

  @HostListener('mousemove') onMouseMove(): void{
    if(this.containerInFocus == true) this.goToElement()
    return
  }

  get elementRef(): ElementRef<any>{
    return this._element
  }

  goToElement(): void{
    let element = this.document.getElementById(this.sectionIndex)
    if(element != undefined){
      let elementTitle = element?.getAttribute('data-grouptitle')
      element?.scrollIntoView()
      this._elementIntoViewServ.activeIndexContacts = elementTitle || ""
    }
  }

}
