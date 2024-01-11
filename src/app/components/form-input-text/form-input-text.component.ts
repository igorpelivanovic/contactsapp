import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormGroupDirective, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';


@Component({
  selector: 'app-form-input-text',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, InputErrorMessageComponent],
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss'
})
export class FormInputTextComponent implements OnInit {

  @Input({required: true}) controlName !: string
  @Input({required: true}) labelIcon !: IconDefinition
  @Input({required: true}) placeholder !: string

  rootGroup = inject(FormGroupDirective)

  private icons = {
    faCircleXmark: faCircleXmark,
    faCircleExclamation: faCircleExclamation
  }

  ngOnInit(): void {
  }

  get icon(){
    return this.icons
  }

  getControl(): AbstractControl{
    return this.rootGroup.control.get(this.controlName) as AbstractControl
  }

  clearFormControl():void{
    this.getControl().setValue("")
  }

  get errorKey(){
      return Object.keys(this.getControl().errors as ValidationErrors)[0] 
  }

}
