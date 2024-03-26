import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputErrorMessageComponent } from '../../input-error-message/input-error-message.component';
import { FormFieldBaseDirective } from '../../../../core/directives/form/form-field-base.directive';
import { FormFieldIconComponent } from '../../field-icon/field-icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-field-text',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, InputErrorMessageComponent, FormFieldIconComponent, NgClass],
  templateUrl: './form-field-input.component.html',
  styleUrl: './../form-field.scss',
})
export class FormFieldTextComponent extends FormFieldBaseDirective {}
