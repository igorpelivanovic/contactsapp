import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibInputErrorMessageComponent } from '../../input-error-message/input-error-message.component';
import { LibFormFieldIconComponent } from '../../field-icon/field-icon.component';
import { NgClass } from '@angular/common';
import { LibFormFieldBaseDirective } from '../../../directives/form-field-base.directive';

@Component({
  selector: 'app-form-field-input',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, LibInputErrorMessageComponent, LibFormFieldIconComponent, NgClass],
  templateUrl: './form-field-input.component.html',
})
export class LibFormFieldInputComponent extends LibFormFieldBaseDirective {}
