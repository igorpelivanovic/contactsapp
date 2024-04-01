import { AfterContentChecked, ChangeDetectorRef, Component, ComponentRef, Input, OnInit, forwardRef, inject } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFontAwesome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LibFormFieldIconComponent } from '../field-icon/field-icon.component';
import { ComponetArrayParentType, FormComponentArrayGroupInterface } from '../../interfaces/formComponents.interface';
import { FormUtilities } from '../../classes/form-utils';
import { LibFormElementComponent } from '../form-element/form-element.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-form-array',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, LibFormFieldIconComponent,forwardRef(()=>LibFormElementComponent), NgClass ],
  templateUrl: './form-array.component.html',
})
export class LibFormArrayComponent  implements OnInit, AfterContentChecked {

    @Input({required: true}) set componentConfig(data: FormComponentArrayGroupInterface){
    this.config = data
    this.formArrayValue = [...data.value as unknown[]]
  }

  private _cd = inject(ChangeDetectorRef)

  private _formArray !: FormArray
  private _icon = {
    faPlus: faPlus,
    faFontAwesome: faFontAwesome
  }

  formArrayValue: unknown[] = [] 
  config !: FormComponentArrayGroupInterface 

  private _componetns: ComponentRef<any>[] = []


  ngOnInit(): void {
    this.initFormArray()
    this.addFormArray()
  }

  ngAfterContentChecked(): void {
    this._cd.detectChanges()
  }

  private initFormArray(): void {
    this._formArray = new FormArray([], this.config.validation) as unknown as FormArray
    
  }

  private addFormArray(): void {
    this.config.parentGroup.addControl(this.config.name, this._formArray)
  }

  initChildComponentConfig(index: number = this._componetns.length): ComponetArrayParentType{
    return FormUtilities.initArrayParentComponentData(this.config.controls, this.config.parentGroup, this.config.name, this.config.name.concat(index.toString()), this.formArrayValue[index])
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

  get value(): unknown[]{
    return this.formArrayValue
  }

  removeFormElementHandle(index: number): void{
    this._formArray.markAsDirty()
    this.formArrayValue.splice(index, 1)
    this.formArray.removeAt(index)
  }
  addField(): void{
    this.formArrayValue = [...this.formArrayValue, undefined]
    this._cd.detectChanges()
  }
}
