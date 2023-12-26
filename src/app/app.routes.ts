import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'contacts', pathMatch: 'full'},
    {path: 'contacts', loadComponent: ()=>import('./contactsList/contacts-list/contacts-list.component').then((m)=>m.ContactsListComponent)},
    {path: '**', redirectTo: 'contacts', pathMatch: 'full'}
];
