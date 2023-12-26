import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [FontAwesomeModule, SearchFormComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {

  renderSearchFrom :boolean = true

  private router = inject(Router)

  private icons = {
    faMagnifyingGlass: faMagnifyingGlass,
    faArrowLeft: faArrowLeft,
    faUserPlus: faUserPlus
  }

  get icon(){
    return this.icons
  }

  openSearchForm(): void{
    this.renderSearchFrom = true
  }

  closeSearchForm(): void{
    this.renderSearchFrom = false
  }

  updateSearchValue($event: Event): void{
    console.log($event)
  }

  addNewContact(): void{
    this.router.navigate(['add'])
  }

}
