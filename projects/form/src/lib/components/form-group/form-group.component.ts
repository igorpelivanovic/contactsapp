import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, forwardRef, inject } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibFormFieldIconComponent } from '../field-icon/field-icon.component';
import { FormUtilities } from '../../classes/form-utils';
import { GroupControlsType } from '../../interfaces/formControls.interface';
import { LibFormElementComponent } from '../form-element/form-element.component';
import { ComponetGroupParentType, FormComponentGroupArrayInterface, FormComponentGroupGroupInterface } from '../../interfaces/formComponents.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, LibFormFieldIconComponent, forwardRef(()=>LibFormElementComponent), NgClass],
  templateUrl: './form-group.component.html',
})
export class LibFormGroupComponent implements OnInit{
  
  @Input({required: true, alias: 'componentConfig'}) componentConfigData !: FormComponentGroupGroupInterface | FormComponentGroupArrayInterface 
  @Output('removeComponent') removeComponent = new EventEmitter()
  @ViewChild("dynamicFormField", {read: ViewContainerRef}) dynamicFormField!: ViewContainerRef

  private _formGroup !: FormGroup
  private value : object = {}

  ngOnInit(): void {
    this.initFormGroup()
    this.checkValueOfComponent()
    this.addFormGroup()
  }

  private initFormGroup(): void{
    this._formGroup = new FormGroup({}, this.componentConfigData.validation)
  }

  private checkValueOfComponent(): void{
    if(typeof this.componentConfigData.value == 'object' && this.componentConfigData.value != null && !Array.isArray(this.componentConfigData.value)) this.value = this.componentConfigData.value
  }

  private addFormGroup(): void{
    if(!this.parentIsArray){
      this.componentConfigData.parentGroup.addControl((this.componentConfigData as FormComponentGroupGroupInterface).name, this._formGroup)
      return
    }
    this.formArray?.push(this._formGroup)
  }

  get parentIsArray(): boolean{
    return this.componentConfigData.parentType == 'array'
  }

  get formArray(): FormArray | undefined{
    if(this.parentIsArray) return this.componentConfigData.parentGroup.get((this.componentConfigData as FormComponentGroupArrayInterface).parentName) as FormArray
    return undefined
  }

  get formGroup(): FormGroup{
    return this._formGroup
  }

  get renderErrorMsg(): boolean{
    return this.formGroup.touched && this.formGroup.invalid
  }

  removeField(): void{
    this.removeComponent.emit()
  }

  initChildComponentConfig(controlData: GroupControlsType): ComponetGroupParentType{
    return FormUtilities.initGroupParentComponentData(controlData, this._formGroup, this.componentConfigData.elementSelector.concat(controlData.name), this.value[controlData.name as keyof typeof this.value])
  }
}
