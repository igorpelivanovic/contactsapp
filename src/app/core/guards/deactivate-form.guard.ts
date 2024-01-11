import { CanDeactivateFn } from '@angular/router';
import { AddContactComponent } from '../../addContact/add-contact.component';
import { inject } from '@angular/core';
import { LeavePageService } from '../services/leave-page.service';

export const deactivateFormGuard: CanDeactivateFn<AddContactComponent> = (component: AddContactComponent) => {
  let leavePageService = inject(LeavePageService)
  if(component.isDirtyForm){
    component.renderModal = true
    return leavePageService.status
  }
  return true
};
