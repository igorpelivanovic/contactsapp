import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { faUserPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetBgColorDirective } from '../../core/directives/set-bg-color.directive';
import { FormContactButtonTiTles} from '../../core/interfaces/formContact.interface';
import { FormConfigControls, FormInitData } from '../../core/interfaces/form/formControls.interface';
import { SelectOptions } from '../../core/data/formContact/optionsOfTypeData';
import { isEmptyValidator } from '../../core/validators/is-empty.validator';
import { selectOptionValidation } from '../../core/validators/select-option';
import { ContactFormContentInterface, ContactFormDataInterface } from '../../core/interfaces/contact.interface';
import { CONTACT_FORM_CONGIF } from '../../core/data/formContact/formConfig';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [FontAwesomeModule, FormComponent, SetBgColorDirective],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.scss'
})
export class FormContactComponent implements OnInit, AfterViewInit, OnDestroy {

  private _cd = inject(ChangeDetectorRef)

  private _initFormButtonsTitles: FormContactButtonTiTles = {
    submit: 'submit'
  }

  private _icon = {
    faUserPlus: faUserPlus,
    faArrowLeft: faArrowLeft
  }

  private _subscription !: Subscription
  private _letterIcon: string = ""
  bgCode!: number
  
  formConfigData : FormConfigControls = CONTACT_FORM_CONGIF

  @ViewChild(FormComponent, {static: true}) formInstance!: FormComponent
  @Input() set formData(data: ContactFormContentInterface){
    this.formInit.data = data
    this.letterIcon = data.name
    this.bgCode = data.iconColor
  }
  @Input() buttonsTitle: FormContactButtonTiTles = this._initFormButtonsTitles
  @Input() onSubmitSetNewDefValue: boolean = false
  @Output() formSubmit = new EventEmitter<ContactFormContentInterface>()
  @Output() cancle = new EventEmitter()

  formInit: FormInitData = {
    controls: this.formConfigData
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getFirstLetter()
    this._cd.detectChanges()
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }


  private getFirstLetter(){
    let control : AbstractControl | null = this.formInstance.getElement(['name'])
    if(control != null){
      this.letterIcon = control.value
      this._subscription = control.valueChanges.subscribe(val=>this.letterIcon = val)
    }
  }

  set letterIcon(string: string){
    this._letterIcon = string.trim().slice(0, 1)
  }

  get letter(): string{
    return this._letterIcon
  }

  get icon(){
    return this._icon
  }

  get form(): FormGroup{
    return this.formInstance.form
  }

  submitForm(): void{
    let formData = this.formInstance.submitForm()
    if(formData == null) return
    this.formSubmit.emit({...formData as ContactFormDataInterface, iconColor: this.bgCode} )
  }

  cancelForm() {  
    this.cancle.emit()
  }

 

}
