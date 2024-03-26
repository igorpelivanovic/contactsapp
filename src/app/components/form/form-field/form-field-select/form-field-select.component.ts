import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputErrorMessageComponent } from '../../input-error-message/input-error-message.component';
import { GetPropertyArrayOfObjectPipe } from '../../../../core/pipes/get-property-of-object.pipe';
import { FormFieldBaseDirective } from '../../../../core/directives/form/form-field-base.directive';
import { selectOptContainerAnime } from '../../../../core/animations/selectOptionsContainerAnime';
import { ClickOutSideDirective } from '../../../../core/directives/click-out-side.directive';
import { SelectFormElementBaseInterface } from '../../../../core/interfaces/form/formControls.interface';
import { SelectFieldOption } from '../../../../core/interfaces/form/formContent';
import { defaultValue } from '../../../../core/data/form/defaultValue';

@Component({
    animations: [selectOptContainerAnime],
    selector: 'app-form-field-select',
    standalone: true,
    templateUrl: './form-field-select.component.html',
    styleUrl: './../form-field.scss',
    imports: [ReactiveFormsModule, FontAwesomeModule, InputErrorMessageComponent, GetPropertyArrayOfObjectPipe, ClickOutSideDirective]
})
export class FormFieldSelectComponent extends FormFieldBaseDirective {

  private _renderOptions : boolean = false

  override initFormControl(): void{
    this.formControl = new FormControl(this.initValue, {nonNullable: true, validators: this.componentConfig.validation})
  }

  private getOptionValue(index: number): string | undefined{
    return this.selectOptions[index]?.value
  }

  clickOutSide(): void{
    if(this._renderOptions == true){
      this.formControl.markAsTouched()
    }
    this._renderOptions = false
    return
  }

  toggleSelectOptions(): void{
    this._renderOptions = !this._renderOptions
    return
  }

  setValue(option: SelectFieldOption): void{
    this.formControl.setValue(option.value)
    this.formControl.markAsDirty()
    return
  }

  get renderOpts(): boolean{
    return this._renderOptions
  }

  get selectOptions(): SelectFieldOption[]{
    return (this.componentConfig as SelectFormElementBaseInterface).options
  } 
  override get initValue(): string{
    return this.initCheckOption(this.componentConfig.value) || this.initCheckOption(defaultValue[this.componentConfig.type]) || ''
  }
  private initCheckOption(val: unknown): string | undefined{
    if(typeof val == 'string') return val
    if(typeof val == 'number') return this.getOptionValue(val)
    return undefined
  }

}
