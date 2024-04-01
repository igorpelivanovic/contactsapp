import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibInputErrorMessageComponent } from '../../input-error-message/input-error-message.component';
import { LibFormFieldBaseDirective } from '../../../directives/form-field-base.directive';
import { SelectFieldOption } from '../../../interfaces/formContent';
import { SelectFormElementBaseInterface } from '../../../interfaces/formControls.interface';
import { LibClickOutSideDirective } from '../../../directives/click-out-side.directive';
import { LibGetPropertyArrayOfObjectPipe } from '../../../pipes/get-property-of-object.pipe';
import { libSelectOptContainerAnime } from '../../../animations/selectOptionsContainerAnime';
import { libDefaultValue } from '../../../data/defaultValue';
import { NgClass } from '@angular/common';
import { LibFormFieldIconComponent } from '../../field-icon/field-icon.component';

@Component({
    animations: [libSelectOptContainerAnime],
    selector: 'app-form-field-select',
    standalone: true,
    templateUrl: './form-field-select.component.html',
    imports: [ReactiveFormsModule, FontAwesomeModule, LibInputErrorMessageComponent, LibGetPropertyArrayOfObjectPipe, LibClickOutSideDirective, NgClass, LibFormFieldIconComponent]
})
export class LibFormFieldSelectComponent extends LibFormFieldBaseDirective {

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
    return this.initCheckOption(this.componentConfig.value) || this.initCheckOption(libDefaultValue[this.componentConfig.type]) || ''
  }
  private initCheckOption(val: unknown): string | undefined{
    if(typeof val == 'string') return val
    if(typeof val == 'number') return this.getOptionValue(val)
    return undefined
  }

}
