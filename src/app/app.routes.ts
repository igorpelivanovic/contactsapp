import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'contacts', loadComponent: ()=>import('./contactsList/contacts-list/contacts-list.component').then((m)=>m.ContactsListComponent)}
];
