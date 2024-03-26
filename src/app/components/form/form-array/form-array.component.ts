import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RenderFormElement } from '../../../core/classes/render-form-element';
import { faFontAwesome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormComponentDirective } from '../../../core/directives/form/form-element.directive';
import { ComponetArrayParentType, FormComponentArrayGroupInterface } from '../../../core/interfaces/form/formComponents.interface';
import { FormFieldIconComponent } from '../field-icon/field-icon.component';
import { FormUtilities } from '../../../core/classes/form/form-utils';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, FormComponentDirective, FormFieldIconComponent],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent  implements OnInit, AfterViewInit, OnDestroy {
  @Input({required: true}) componentConfig !: FormComponentArrayGroupInterface 

  @ViewChild('dynamicFormField', {read: ViewContainerRef}) dynamicFormField !: ViewContainerRef

  private _cd = inject(ChangeDetectorRef)

  private _formArray !: FormArray
  private _icon = {
    faPlus: faPlus,
    faFontAwesome: faFontAwesome
  }

  private formArrayValue: unknown[] = [] 

  private _componetns: ComponentRef<any>[] = []
  private _subscriptions: Subscription[] = []


  ngOnInit(): void {
    this.initArrayFormValue()
    this.initFormArray()
    this.addFormArray()
  }

  ngAfterViewInit(): void {
    this.initChildComponents()
    this.checkValueOfArray()
    this._cd.detectChanges()
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub=>sub.unsubscribe())
  }

  private initFormArray(): void {
    this._formArray = new FormArray([], this.componentConfig.validation) as unknown as FormArray
    
  }

  private addFormArray(): void {
    this.componentConfig.parentGroup.addControl(this.componentConfig.name, this._formArray)
  }

  private initArrayFormValue(){
    if(Array.isArray(this.componentConfig.value) == true){
      this.formArrayValue = this.componentConfig.value as unknown[]
    }
  }

  private initChildComponents(): void{
    this.formArrayValue.forEach((data, index)=>{
      this.initChildComponent(index)
    })
  }

  private initChildComponent(index: number = this._componetns.length): void{ 
    let component = new RenderFormElement(this.dynamicFormField, this.initChildComponentConfig(index)).generateComponent
    this.addOutputSignalArrayElement(component)
    this._componetns.push(component)
    this._cd.detectChanges()
  }

  private addOutputSignalArrayElement(compoent: ComponentRef<any>): void{
    this._subscriptions.push(compoent.instance.removeComponent.subscribe(()=> this.removeElementFromArray(compoent)))
  }

  private removeElementFromArray(componet: ComponentRef<any>): void{
    this._formArray.markAsDirty()
    let index = this._componetns.indexOf(componet)
    this._formArray.removeAt(index)
    this._componetns.splice(index, 1)
    if(this.dynamicFormField.length > 0) this.dynamicFormField.remove(index)
    return
  }

  private checkValueOfArray(): void{
    this._subscriptions.push(this._formArray.valueChanges.subscribe(val=>{
      if(val.length == 0){
        this.dynamicFormField.clear()
        this._componetns.length = 0
      }
    }))
  }
  
  private initChildComponentConfig(index: number = this._componetns.length): ComponetArrayParentType{
    return FormUtilities.initArrayParentComponentData(this.componentConfig.controls, this.componentConfig.parentGroup, this.componentConfig.name, this.componentConfig.name.concat(index.toString()), this.formArrayValue[index])
  }

  get icon(){
    return this._icon
  }

  get data(){
    return this.formArrayValue
  }

  get formArray(): FormArray{
    return this._formArray
  }

  addField(): void{
     this.initChildComponent()
  }
}
