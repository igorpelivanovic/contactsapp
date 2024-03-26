import { Component, HostBinding, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { inputErrorMessages } from './inputErrorMessages';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './input-error-message.component.html',
  styleUrl: './input-error-message.component.scss'
})
export class InputErrorMessageComponent {

  @Input() placeholder: string | undefined = 'field'
  @Input({required: true}) errorKey!: string 

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
