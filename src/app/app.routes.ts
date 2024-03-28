import { Routes } from '@angular/router';
import { deactivateFormGuard } from './core/guards/deactivate-form.guard';
import { ContactsListComponent } from './contactsList/contacts-list.component';
import { AddContactComponent } from './addContact/add-contact.component';
import { PreviewContactComponent } from './previewContact/preview-contact.component';
import { EditContactComponent } from './editContact/edit-contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
        path: 'preview/:id', 
        component: PreviewContactComponent,
        data: { animationState: 'add' }
    },
    {
        path: 'edit/:id',
        component: EditContactComponent,
        canDeactivate: [deactivateFormGuard],
        data: { animationState: 'edit'}
    },
    {
        path: 'notfound',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'contacts',
        pathMatch: 'full'
    }

];
