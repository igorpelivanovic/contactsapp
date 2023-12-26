import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'contacts', pathMatch: 'full'},    
    {path: 'contacts', loadComponent: ()=>import('./contactsList/contacts-list.component').then((m)=>m.ContactsListComponent)},
    {path: 'add', loadComponent: ()=>import('./addContact/add-contact/add-contact.component').then((m)=>m.AddContactComponent)},
    {path: '**', redirectTo: 'contacts', pathMatch: 'full'}
];
