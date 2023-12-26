import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MobileInfoLineComponent } from './components/mobile-info-line/mobile-info-line.component';
import { ContactsListComponent } from './contactsList/contacts-list/contacts-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MobileInfoLineComponent, ContactsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = 'contactsapp';
  
}
