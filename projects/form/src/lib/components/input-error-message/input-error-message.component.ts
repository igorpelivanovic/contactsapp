import { Component, HostBinding, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { inputErrorMessages } from './inputErrorMessages';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'lib-input-error-message',
  standalone: true,
  imports: [FontAwesomeModule, NgStyle],
  templateUrl: './input-error-message.component.html'
})
export class LibInputErrorMessageComponent {

  @Input() placeholder: string | undefined = 'field'
  @Input({required: true}) errorKey!: string 
  @Input({alias: 'containerStyle'}) styleData !: Object

  @HostBinding('class.message-container') setStyleClass : boolean = true

  private icons = {
    faCircleExclamation: faCircleExclamation
  }

  get icon(){
    return this.icons
  }

  get message(): string{
    return `${this.placeholder} ${inputErrorMessages.get(this.errorKey)}`
  }

}
