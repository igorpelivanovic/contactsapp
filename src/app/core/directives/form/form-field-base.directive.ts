import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { IconDefinition, faChevronDown, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormUtilities } from '../../classes/form/form-utils';
import { defaultValue } from '../../data/form/defaultValue';
import { PrimitiveComponent, PrimitiveComponentArrayParent, PrimitiveComponentGroupParent } from '../../interfaces/form/formComponents.interface';

@Directive({
  selector: '[appFormFieldBase]',
  standalone: true
})
export class FormFieldBaseDirective implements OnInit {
  @Input({required: true}) componentConfig !: PrimitiveComponent
  @Output('removeComponent') removeComponent = new EventEmitter()

  formControl !: FormControl

  private _icon = {
    faCircleXmark: faCircleXmark,
    faTrash: faTrash ,
    faChevronDown: faChevronDown
  }

  ngOnInit(): void {
    this.initFormControl()
    this.addFormCormControl()
  }

  initFormControl(): void{
      this.formControl = new FormControl(this.initValue, {nonNullable: true, validators: this.componentConfig.validation})
  }

  get initValue(): any{
     if(typeof this.componentConfig.value == typeof defaultValue[this.componentConfig.type]) return this.componentConfig.value
     if(typeof this.componentConfig.defaultValue == typeof defaultValue[this.componentConfig.type]) return this.componentConfig.defaultValue
     return defaultValue[this.componentConfig.type]
  }

  private addFormCormControl(): void{
    if(!this.parentIsArray){
        this.componentConfig.parentGroup.addControl((this.componentConfig as PrimitiveComponentGroupParent).name, this.formControl)
      return 
    }
    this.formArray?.push(this.formControl)
  }

  get parentIsArray(): boolean{
    return this.componentConfig.parentType == 'array'
  }  
  get formArray(): FormArray | undefined {
    if(this.parentIsArray){
      return this.rootGroup.get((this.componentConfig as PrimitiveComponentArrayParent).parentName) as FormArray
    }
    return undefined
  }  

  get rootGroup() : FormGroup{
    return this.componentConfig.parentGroup as FormGroup
  }
  get icon() {
    return this._icon
  }  
  get fieldIsEmpty(): boolean{
    return String(this.formControl.value).length == 0
  }  
  get errorKey(): string{
    return Object.keys(this.formControl.errors as ValidationErrors).at(0) as string
  }  
  get renderErrorMsg(): boolean{
    return this.formControl.touched && this.formControl.invalid
  }

  clearFormControl(): void{
    this.formControl.setValue("")
  }   
  removeField(): void{
    this.removeComponent.emit()
  }  
}
