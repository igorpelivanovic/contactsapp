import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { faArrowLeft, faFontAwesome, faTrash, faPen, IconDefinition, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactInterface } from '../core/interfaces/contact.interface';
import { GetCharactersPipe } from '../core/pipes/get-characters.pipe';
import { SetBgColorDirective } from '../core/directives/set-bg-color.directive';
import { DynamicObject } from '../core/interfaces/model.interface';
import { GetObjectKeysPipe } from '../core/pipes/get-object-keys.pipe';
import { DataIcon } from '../core/data/formContact/icons';
import { PhoneFormatPipe } from '../core/pipes/phone-format.pipe';
import { PopUpLeavePageComponent } from "../components/pop-up-leave-page/pop-up-leave-page.component";
import { PopUpModelBoxContent } from '../core/interfaces/popUpContent.interface';
import { popupModelAnime } from '../core/animations/popupModelAnime';
import { PopUpPageService } from '../core/services/leave-page.service';
import { Subscription } from 'rxjs';
import { NotFoundContentComponent } from "../components/not-found-content/not-found-content.component";

@Component({
    animations: [popupModelAnime],
    selector: 'app-preview-contact',
    standalone: true,
    templateUrl: './preview-contact.component.html',
    styleUrl: './preview-contact.component.scss',
    imports: [FontAwesomeModule, GetCharactersPipe, SetBgColorDirective, GetObjectKeysPipe, PhoneFormatPipe, PopUpLeavePageComponent, NotFoundContentComponent]
})
export class PreviewContactComponent{

  private _icons = {
    faArrowLeft: faArrowLeft,
    faTrash: faTrash,
    faFileCircleXmark: faFileCircleXmark,
    faPen: faPen,
    faFontAwesome: faFontAwesome
  }
  private _storage = inject(StorageService)
  private _router = inject(Router)
  private _popUpSer = inject(PopUpPageService)

  private _subscriptions !: Subscription
  private _contact!: ContactInterface | undefined
  private _renderModal : boolean = false
  private _modelBoxContent :PopUpModelBoxContent = {
    message: 'are you sure want to delete this contact?',
    true: 'delete',
    false: 'cancel'
  }

  @Input({required: true, alias: 'id'}) _idParams !: number

  ngOnInit(): void {
    this.getContactData()
  }

  private getContactData(): void{
      this._contact = this._storage.getDataFromId(this._idParams)
      this._contact == undefined ? this._router.navigateByUrl("notfound") : null
    }

  get contact(): ContactInterface{
    return this._contact as ContactInterface
  }

  get contactData(): DynamicObject<any>{
    let data : DynamicObject<any> = {}
    Object.keys(this.contact).forEach(key => {
      let element = this.contact[key as keyof typeof this.contact]
      if(Array.isArray(element) == true && typeof element == 'object' && element.length > 0){
        data[key] = element
      }
    });
    return data
  }

  get icon(){
    return this._icons
  }

  get renderModal(): boolean{
    return this._renderModal
  }

  get modelBoxContent(): PopUpModelBoxContent{
    return this._modelBoxContent
  }

  get noContentText(): string{
    return "contact don't have any data yet."
  }
  
  initIcon(key : string): IconDefinition{
    return DataIcon.get(key) || this.icon.faFontAwesome
  }

  goBack(): void{
    this._router.navigate(['/'])
  }

  goEdit(): void{
    this._router.navigate(['edit', this._idParams])
  }

  deleteContact():void{
    this._renderModal = true
    this._subscriptions = this._popUpSer.status.subscribe(val=>{
      this._renderModal = false
      if(val == true){
        this._storage.deleteData = this.contact.id
        this.goBack()
      }
      this._subscriptions.unsubscribe()
      return
    })
  }

}
