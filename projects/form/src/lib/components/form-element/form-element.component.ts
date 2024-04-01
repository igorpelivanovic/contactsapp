import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponentType } from '../../interfaces/formComponents.interface';
import { LibFormComponentDirective } from '../../directives/form-element.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-form-element',
  standalone: true,
  imports: [LibFormComponentDirective, FontAwesomeModule, NgClass],
  templateUrl: './form-element.component.html',
})
export class LibFormElementComponent {

  @Input({required: true, alias: 'congifData'}) componentData!: FormComponentType
  @Output() removeElementEvent = new EventEmitter(true)

  private icons = {
    faTrash: faTrash
  }

  get icon(){
    return this.icons
  }

  get configData():FormComponentType{
    return {...this.componentData}
  }

  removeElementHandle(){
    return this.removeElementEvent.emit()
  }

}
