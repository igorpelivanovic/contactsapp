import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormConfigControls, FormInitData, GroupControlsType } from '../../interfaces/formControls.interface';
import { ComponetGroupParentType } from '../../interfaces/formComponents.interface';
import { FormUtilities } from '../../classes/form-utils';
import { LibFormElementComponent } from '../form-element/form-element.component';
import { trimObject } from '../../functions/trimObject';

@Component({
  selector: 'lib-form',
  standalone: true,
  imports: [ReactiveFormsModule, LibFormElementComponent],
  templateUrl: './form.component.html',
})
export class LibFormComponent {

  @ViewChild(FormGroupDirective) formRef !: FormGroupDirective
  @Input({required: true, alias: 'initForm'}) initFormData !: FormInitData
  @Output() formSubmit = new EventEmitter()

  private _formBuidler = inject(FormBuilder)
  private _form !: FormGroup 

  ngOnInit(): void {
    this.initForm()
    return
  }

  private initForm(): void{
    this._form = this._formBuidler.group({});
  }

  get form(): FormGroup{
    return this._form
  }

  get formConfig(): FormConfigControls{
    return this.initFormData.controls
  }

  get formIsValid(): boolean{
    return this.form.valid
  }
  
  submitForm(): object | null{
    this.form.markAllAsTouched()
    if(this._form.pristine) return null
    if(this._form.invalid) return null
    return trimObject(this.form.getRawValue()) as object
  }

  submitFormHandle(): void{
    this.formSubmit.emit()
  }

  getElement(controlsName: string[]): AbstractControl | null{
    let controlRoot : AbstractControl | null = this.form
    controlsName.forEach(control=>{
      controlRoot = controlRoot?.get(control) as AbstractControl
      if(controlRoot == null) return
    })
    return controlRoot
  }

  initChildComponentConfig(control: GroupControlsType): ComponetGroupParentType{
    return FormUtilities.initGroupParentComponentData(control, this._form, control.name, this.initFormData.data?.[control.name])
  }
}
