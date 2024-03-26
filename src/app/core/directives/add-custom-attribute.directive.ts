import { AfterViewInit, Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { CustomAttributeConfig } from '../interfaces/addCustomAttributeDirectives.interface';

@Directive({
  selector: '[appAddCustomAttribute]',
  standalone: true
})
export class AddCustomAttributeDirective implements AfterViewInit {

  private _element!: ElementRef<HTMLElement>

  @Input({alias: 'customAtributes'}) customAtributes : CustomAttributeConfig[] = []

  private _renderer = inject(Renderer2)

  constructor(elementRef: ElementRef) { 
    this._element = elementRef
  }

  ngAfterViewInit(): void {
    this.customAtributes.forEach(attribute=>this._renderer.setAttribute(this._element.nativeElement, 'data-'+attribute.key, attribute.value))
  }

}
