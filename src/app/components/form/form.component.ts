import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { DynamicObject } from '../../core/interfaces/model.interface';
import { FormComponentDirective } from '../../core/directives/form/form-element.directive';
import { FormConfigControls, FormInitData, GroupControlsType } from '../../core/interfaces/form/formControls.interface';
import { GetObjectKeysPipe } from '../../core/pipes/get-object-keys.pipe';
import { ComponetGroupParentType } from '../../core/interfaces/form/formComponents.interface';
import { FormUtilities } from '../../core/classes/form/form-utils';
import { TrimObjectPipe } from '../../core/pipes/trim-object.pipe';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormComponentDirective, GetObjectKeysPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  @ViewChild(FormGroupDirective) formRef !: FormGroupDirective
  @Input({required: true, alias: 'initForm'}) initFormData !: FormInitData
  @Output() formSubmit = new EventEmitter()

  private _trimObjPipe = inject(TrimObjectPipe)
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
    return this._trimObjPipe.transform(this.form.getRawValue())
  }

  submitFormEvent(): void{
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
