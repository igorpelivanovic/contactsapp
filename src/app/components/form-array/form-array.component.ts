import { Component, ContentChild, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { FormArrayControlComponent } from './form-array-control/form-array-control.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { SelectOption } from '../../core/interfaces/selectOption.interface';
import { FormControlArray } from '../../core/interfaces/formControlArray.interface';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [FormArrayControlComponent, FontAwesomeModule, ReactiveFormsModule,NgTemplateOutlet],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent{

  @Input({required: true}) labelIcon !: IconDefinition
  @Input({required: true}) placeholder !: string
  @Input({required: true}) arrayName !: string
  @Input({required: true}) contentType !: string 
  @Input({required: true}) selectOptions !: SelectOption[]
  @Input() formControlValidators !: ValidatorFn[]
  @Input({required: true}) newField !: FormControlArray[] 


  private rootGroupDirective = inject(FormGroupDirective)

  private icons = {
    faPlus: faPlus
  }

  get icon(){
    return this.icons
  }

  get rootGroup(): FormGroup{
    return this.rootGroupDirective.control
  }

  get formArray(): FormArray{
    return (this.rootGroup.get(this.arrayName) as FormArray)
  }

  get formArrayGroup(): FormGroup[]{
    return this.formArray.controls as FormGroup[]
  }

  private createDynamicValue(valuesArr: any[]): any{
    let index = valuesArr.length > this.formArrayGroup.length ? this.formArrayGroup.length : valuesArr.length-1
    return valuesArr[index].value
  }

  private initFormGroup(): FormGroup{
    let group = new FormGroup({})
    this.newField.map((control: FormControlArray)=>{
      let value = Array.isArray(control.value) ? this.createDynamicValue(control.value) : control.value
      group.addControl(control.name, new FormControl(value, control.validation))
    })
    return group
  }

  private initFormControl(): FormControl{
    let value = Array.isArray(this.newField[0].value) ? this.createDynamicValue(this.newField[0].value) : this.newField[0].value
    return new FormControl(value, this.newField[0].validation)
  }

  addField(): void{
    let newField = this.newField.length > 1 ? this.initFormGroup() : this.initFormControl()
    this.formArray.push(newField)
  }
  removeField(index: number): void{
    this.formArray.removeAt(index)
  }
}
