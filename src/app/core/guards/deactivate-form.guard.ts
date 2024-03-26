import { CanDeactivateFn } from '@angular/router';
import { AddContactComponent } from '../../addContact/add-contact.component';
import { inject } from '@angular/core';
import { PopUpPageService } from '../services/leave-page.service';
import { EditContactComponent } from '../../editContact/edit-contact.component';

export const deactivateFormGuard: CanDeactivateFn<AddContactComponent | EditContactComponent> = (component: AddContactComponent | EditContactComponent) => {
  let leavePageService = inject(PopUpPageService)
  if(component.formInstaceData.dirty){
    component.renderModal = true
    return leavePageService.status
  }
  return true
};
