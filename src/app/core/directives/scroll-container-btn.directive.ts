import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollContainerBtn]',
  standalone: true
})
export class ScrollContainerBtnDirective{

  private _elementRef !: ElementRef 
  private _interval !: ReturnType<typeof setTimeout>;

  @Input({alias: 'scrollTop'}) scrollTop : boolean = true
  @Input({alias: 'stepScroll'}) scrollValue: number = 10
  @Input({required: true, alias: 'containerRef'}) containerRef!: HTMLElement 
  @Input({required: true, alias: 'containerInFocus'}) containerInFocus: boolean = false

  private _element = inject(ElementRef)

  @HostListener('mousedown') onMouseDown(): void{
    this.onScroll()
  }

  @HostListener('touchstart') onTouchStart(): void{
    this.onScroll()
  }

  @HostListener('mouseup') onMouseUp(): void{
    this.clearScrollInterval()
  }

  @HostListener('mouseleave') onMouseLeave(): void{
    this.clearScrollInterval()
  }

  @HostListener('mousemove') onMouseMove(): void{
    if(this.containerInFocus == true){
      this.clearScrollInterval()
      this.onScroll()
    }
  }

  get elementRef(): ElementRef{
    return this._element
  }

  onScroll(): void{
    this.scrollContainer()
    this._interval = setInterval(()=>this.scrollContainer(), 40)
  }
  clearScrollInterval(): void{
    clearInterval(this._interval)
  }

  private scrollContainer(): void{
    if(this.scrollTop == true){
      this.containerRef.scrollTop += this.scrollValue
      return
    }
    this.containerRef.scrollTop -= this.scrollValue
    return
  }

}
