import { AfterViewInit, Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[SetBgColor]',
  standalone: true
})
export class SetBgColorDirective implements AfterViewInit {

  private _renderer = inject(Renderer2)

  @Input() bgHueCode: number = 0

  constructor(private el: ElementRef) {}

  private addBgColor(): void{
    this._renderer.setStyle(this.el.nativeElement, 'background-color', `hsl(${this.bgHueCode}, 50%, 50%)`)
  }
  
  ngAfterViewInit(): void {
    this.addBgColor()
  }

}
