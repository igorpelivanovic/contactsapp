import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputTextComponent } from '../components/form-input-text/form-input-text.component';
import { faUserPlus, faUser, faPhone, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { isEmptyValidator } from '../core/validators/is-empty.validator';
import { FormArrayComponent } from '../components/form-array/form-array.component';
import { JsonPipe } from '@angular/common';
import { phoneOptions } from '../core/data/selectOptions/phoneOptions';
import { SelectOption } from '../core/interfaces/selectOption.interface';
import { Router } from '@angular/router';
import { PopUpLeavePageComponent } from '../components/pop-up-leave-page/pop-up-leave-page.component';
import { popupModelAnime } from '../core/animations/popupModelAnime';
import { socialOptions } from '../core/data/selectOptions/socialOptions';
import { mailOptions } from '../core/data/selectOptions/mailOptions';
import { FormControlArray } from '../core/interfaces/formControlArray.interface';
import { selectOptionValidation } from '../core/validators/select-option';
import { StorageService } from '../core/services/storage.service';
import { DynamicObject } from '../core/interfaces/DynamicObject.inteface';
import { Contact, FormContactData } from '../core/interfaces/contact.interface';
import { SetBgColorDirective } from '../core/directives/set-bg-color.directive';


@Component({
  animations: [popupModelAnime],
  selector: 'app-add-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputTextComponent, FontAwesomeModule, FormArrayComponent, JsonPipe, PopUpLeavePageComponent, SetBgColorDirective],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent implements OnInit {

  addForm !: FormGroup

  private formGroup = inject(FormBuilder)
  private router = inject(Router)
  private storage = inject(StorageService)

  bgHueCode : number = 0

  private icons = {
    faUserPlus: faUserPlus,
    faUser: faUser,
    faPhone: faPhone,
    faGlobe: faGlobe,
    faEnvelope: faEnvelope
  }

  renderModal: boolean = false

  ngOnInit(): void {
    this.initAddForm()
    this.generateRandomBgColor()
  }

  private initAddForm(): void{
    this.addForm = this.formGroup.group({
      name: new FormControl("", {nonNullable: true, validators: [Validators.required, isEmptyValidator()]}),
      numbers: new FormArray([]),
      mails: new FormArray([]),
      socials: new FormArray([])
    })
  }

  private generateRandomBgColor(): void{
    this.bgHueCode = Number((Math.random() * 360).toFixed(2))
  }

  get numbertsTest(): FormControlArray[]{
    return [
      { name: 'type', value: this.numberSelecteOptions, validation:[Validators.required, selectOptionValidation(this.numberSelecteOptions)]},
      { name: 'value', value: "", validation:[Validators.required, isEmptyValidator(), Validators.minLength(6), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{6,10}$")] }
    ]
  }
  get mailsTest(): FormControlArray[]{
    return [
      { name: 'type', value: this.mailSelecteOptions, validation:[Validators.required, selectOptionValidation(this.mailSelecteOptions)]},
      { name: 'value', value: "", validation:[Validators.required, isEmptyValidator(), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] }
    ]
  }
  get socialsTest(): FormControlArray[]{
    return [
      { name: 'type', value: this.socialSelecteOptions, validation:[Validators.required, selectOptionValidation(this.socialSelecteOptions)]},
      { name: 'value', value: "", validation:[Validators.required, isEmptyValidator()] }
    ]
  }

  get numberSelecteOptions(): SelectOption[]{
    return phoneOptions
  }

  get socialSelecteOptions(): SelectOption[]{
    return socialOptions
  }

  get mailSelecteOptions(): SelectOption[]{
    return mailOptions
  }

  get icon(){
    return this.icons
  }

  get isDirtyForm(): boolean{
    return this.addForm.dirty
  }

  get firstLetterName(): string{
    return this.getFormControl('name').value.trim().slice(0, 1)
  }

  private get generateContactID(): number{
    return new Date().getTime()
  }

  private resetForm(): void{
    Object.keys(this.addForm.controls).map(key=>{
      this.addForm.controls[key] instanceof FormArray ? (this.addForm.controls[key] as FormArray).controls.length = 0 : this.addForm.controls[key].reset()
    })
    this.generateRandomBgColor()
  }

  getFormControl(val: string): FormControl{
    return this.addForm.get(val) as FormControl
  }

  backToContactsList(): void{
    this.router.navigate(['/contacts'])
  }
  addContact(): void{
    this.storage.addData = Object.assign(this.trimFormValues(this.addForm.value) as FormContactData , { id: this.generateContactID, iconColor: this.bgHueCode })
    this.resetForm()
  }
  deRenderPopup(): void{
    this.renderModal = false
  } 
  private trimFormValues(values: DynamicObject | string[] | string): DynamicObject | string[] | string{
    if(typeof values == "object" && !Array.isArray(values)){
        Object.keys(values).map(key=>{
          values[key] = this.trimFormValues(values[key])
        })  
        return values    
    }
    if(Array.isArray(values)){
      return values.map(val=>this.trimFormValues(val))
    }
    return values.trim()
  }

}
