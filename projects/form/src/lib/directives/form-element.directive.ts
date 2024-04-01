import { AfterViewInit, ChangeDetectorRef, Directive, Input, ViewContainerRef, inject } from '@angular/core';
import { RenderFormElement } from '../classes/render-form-element';
import { FormComponentType } from '../interfaces/formComponents.interface';


@Directive({
  selector: '[libFormComponent]',
  standalone: true
})
export class LibFormComponentDirective implements AfterViewInit{
  @Input({required: true, alias: 'componentConfigData'}) componentConfigData!: FormComponentType

  private _cd = inject(ChangeDetectorRef)

  private _viewContainer !: ViewContainerRef

  constructor(viewContainer: ViewContainerRef) { 
    this._viewContainer = viewContainer
  }

  ngAfterViewInit(): void {
    this.initComponent()
    this._cd.detectChanges()
  }

  private initComponent(){
    new RenderFormElement(this._viewContainer, this.componentConfigData).generateComponent
  }

}
