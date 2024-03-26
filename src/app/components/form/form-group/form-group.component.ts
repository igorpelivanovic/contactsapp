import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetObjectKeysPipe } from '../../../core/pipes/get-object-keys.pipe';
import { FormUtilities } from '../../../core/classes/form/form-utils';
import { RenderFormElement } from '../../../core/classes/render-form-element';
import { ComponetGroupParentType, FormComponentGroupArrayInterface, FormComponentGroupGroupInterface } from '../../../core/interfaces/form/formComponents.interface';
import { GroupControlsType } from '../../../core/interfaces/form/formControls.interface';
import { FormFieldIconComponent } from '../field-icon/field-icon.component';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, GetObjectKeysPipe, FormFieldIconComponent],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss'
})
export class FormGroupComponent implements OnInit, AfterViewInit{
  
  @Input({required: true, alias: 'componentConfig'}) componentConfigData !: FormComponentGroupGroupInterface | FormComponentGroupArrayInterface 
  @Output('removeComponent') removeComponent = new EventEmitter()
  @ViewChild("dynamicFormField", {read: ViewContainerRef}) dynamicFormField!: ViewContainerRef

  private cd = inject(ChangeDetectorRef)

  private _formGroup !: FormGroup
  private value : object = {}
  private _icon = {
    faTrash: faTrash,
  }

  ngOnInit(): void {
    this.initFormGroup()
    this.checkValueOfComponent()
    this.addFormGroup()
  }

  ngAfterViewInit(): void {
      this.componentConfigData.controls.forEach(control=>{
        new RenderFormElement(this.dynamicFormField, this.initChildComponentConfig(control)).generateComponent
        this.cd.detectChanges()
      })
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
  
  get icon(){
    return this._icon
  }

  get renderIcon(): IconDefinition{
    return FormUtilities.initComponentIcon(this.componentConfigData.icon as IconDefinition | string)
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

  private initChildComponentConfig(controlData: GroupControlsType): ComponetGroupParentType{
    return FormUtilities.initGroupParentComponentData(controlData, this._formGroup, this.componentConfigData.elementSelector.concat(controlData.name), this.value[controlData.name as keyof typeof this.value])
  }
}
