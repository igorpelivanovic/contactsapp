import { Component, Input, OnInit } from '@angular/core';
import { FormArrayControlSelectComponent } from '../form-array-control-select/form-array-control-select.component';
import { InputErrorMessageComponent } from '../../input-error-message/input-error-message.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectOption } from '../../../core/interfaces/selectOption.interface';

@Component({
  selector: 'app-form-array-control',
  standalone: true,
  imports: [FormArrayControlSelectComponent, InputErrorMessageComponent, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './form-array-control.component.html',
  styleUrl: './form-array-control.component.scss'
})
export class FormArrayControlComponent implements OnInit {

  @Input({required: true}) fArray !: FormArray
  @Input({required: true}) index !: number
  @Input({required: true}) fGroup !: FormGroup
  @Input({required: true}) contentType !: string
  @Input({required: true}) selectOptions !: SelectOption[]
  @Input({required: true}) placeholder !: string
  @Input({required: true}) fArrayName !: string
  

  private icons = {
    faCircleXmark: faCircleXmark,
    faTrash: faTrash
  }

  formGroup !: FormGroup

  ngOnInit(): void {
  }

  get icon(){
    return this.icons
  }

  get errorKey(){
    return Object.keys(this.getFormControl('value').errors as ValidationErrors)[0] 
  }

  getFormControl(str: string): FormControl{
    return this.fGroup.get(str) as FormControl
  }

  clearFormValue(): void{
    this.getFormControl('value').reset("")
  }

  removeField(): void{
    this.fArray.removeAt(this.index)
  }

}
