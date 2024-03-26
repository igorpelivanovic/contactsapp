import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpLeavePageComponent } from '../components/pop-up-leave-page/pop-up-leave-page.component';
import { popupModelAnime } from '../core/animations/popupModelAnime';
import { PopUpModelBoxContent } from '../core/interfaces/popUpContent.interface';
import { StorageService } from '../core/services/storage.service';
import { ContactFormContentInterface, ContactFormDataInterface, ContactInterface } from '../core/interfaces/contact.interface';
import { FormContactComponent } from "../components/form-contact/form-contact.component";
import { FormContactButtonTiTles } from '../core/interfaces/formContact.interface';
import { FormGroup } from '@angular/forms';


@Component({
    animations: [popupModelAnime],
    selector: 'app-add-contact',
    standalone: true,
    templateUrl: './add-contact.component.html',
    imports: [AddContactComponent, PopUpLeavePageComponent, FormContactComponent]
})
export class AddContactComponent implements OnInit{

  private storageServ = inject(StorageService)
  private _router = inject(Router)

  private _data: ContactFormDataInterface = {
    phones: [],
    mails: [],
    name: '',
    socials: []
  }

  contactFormButtonsTitle: FormContactButtonTiTles ={
    submit: 'save'
  }
  private _bgHueCode : number = 0
  private _renderModal : boolean = false

  @ViewChild(FormContactComponent) formContactInstance !: FormContactComponent

  ngOnInit(): void{
    this.generateRandomBgColor()
  }

  private generateRandomBgColor(): void{
    this._bgHueCode = Number((Math.random() * 360).toFixed(2))
  }

  get formContactData(): ContactFormContentInterface{
    return {...this._data, iconColor: this._bgHueCode}
  }

  get renderModal(): boolean{
    return this._renderModal
  }

  get modelBoxContent(): PopUpModelBoxContent{
    return {
      message: 'are you sure want to quit without saving?',
      true: 'yes',
      false: 'no'
    }
  }

  get generateId(): number{
    return new Date().getTime() 
  }

  get formInstaceData(): FormGroup{
    return this.formContactInstance.form
  }

  set renderModal(val: boolean){
    this._renderModal = val
  }

  submitForm(data: ContactFormContentInterface){
    let id = this.generateId
    this.storageServ.addData = {...data, id: id}
    this.formInstaceData.markAsPristine()
    this._router.navigate(['/preview', id])
  }

  cancelForm(){
    this._router.navigate([''])
  }

  deRenderPopup(): void{
    this._renderModal = false
  }
}
