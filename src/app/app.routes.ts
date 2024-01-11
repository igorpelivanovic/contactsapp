import { Routes } from '@angular/router';
import { deactivateFormGuard } from './core/guards/deactivate-form.guard';
import { ContactsListComponent } from './contactsList/contacts-list.component';
import { AddContactComponent } from './addContact/add-contact.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'contacts',
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        component: ContactsListComponent,
        data: { animationState: 'home' }
    },
    {
        path: 'add', 
        component: AddContactComponent,
        canDeactivate: [deactivateFormGuard],
        data: { animationState: 'add' }
    },
    {
        path: '**',
        redirectTo: 'contacts',
        pathMatch: 'full'
    }
];
