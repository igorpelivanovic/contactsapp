import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormContactComponent } from '../components/form-contact/form-contact.component';
import { PopUpLeavePageComponent } from "../components/pop-up-leave-page/pop-up-leave-page.component";
import { PopUpModelBoxContent } from '../core/interfaces/popUpContent.interface';
import { StorageService } from '../core/services/storage.service';
import { ContactFormContentInterface, ContactInterface } from '../core/interfaces/contact.interface';
import { Router } from '@angular/router';
import { FormContactButtonTiTles } from '../core/interfaces/formContact.interface';
import { FormGroup } from '@angular/forms';
import { popupModelAnime } from '../core/animations/popupModelAnime';

@Component({
    animations: [popupModelAnime],
    selector: 'app-edit-contact',
    standalone: true,
    templateUrl: './edit-contact.component.html',
    imports: [FontAwesomeModule, FormContactComponent, PopUpLeavePageComponent]
})
export class EditContactComponent implements OnInit{

    private storage = inject(StorageService)
    private router = inject(Router)

    private _renderModal: boolean = false
    private _contactData: ContactInterface | undefined = undefined
    formContactButtonsTitles: FormContactButtonTiTles = {
        submit: 'save'
    }

    @Input({required: true, alias: 'id'}) userId !: number
    @ViewChild(FormContactComponent) formConponentRef !:FormContactComponent

    ngOnInit(): void {
        this.getUserData()
    }

    private getUserData(): void{
      this._contactData = this.storage.getDataFromId(this.userId)
      if(this._contactData == undefined) this.router.navigate(['/notfound'])  
      return
    }

    get formInstaceData(): FormGroup{
        return this.formConponentRef.form
    }

    get renderModal(): boolean{
        return this._renderModal
    }

    get formContactData(): ContactFormContentInterface{
        return this._contactData as ContactFormContentInterface
    }

    get modelBoxContent(): PopUpModelBoxContent{
        return {
           message: 'change that you made may not be saved',
           true: 'leave',
           false: 'cancel'
        }
    }

    set renderModal(val: boolean){
        this._renderModal = val
    }

    deRenderPopup(): void{
        this._renderModal = false
    }

    submitForm(data: ContactFormContentInterface){
        this.storage.editData = {...data, id: this.userId}
        this.formInstaceData.markAsPristine()
        this.cancelForm()
    }

    cancelForm(){
        this.router.navigate(['/preview', this.userId])
    }

}
