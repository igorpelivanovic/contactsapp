import { Component, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { Contact } from '../core/interfaces/contact.interface';
import { SetBgColorDirective } from '../core/directives/set-bg-color.directive';
import { GroupByPipe } from '../core/pipes/group-by.pipe';
import { SortPipe } from '../core/pipes/sort.pipe';
import { FilterByPipe } from '../core/pipes/filter-by.pipe';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [FontAwesomeModule, SearchFormComponent, SetBgColorDirective, GroupByPipe, SortPipe, FilterByPipe],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit{

  renderSearchFrom :boolean = false

  private router = inject(Router)

  private _contacts: Contact[] = []

  private storage = inject(StorageService)

  private icons = {
    faMagnifyingGlass: faMagnifyingGlass,
    faArrowLeft: faArrowLeft,
    faUserPlus: faUserPlus
  }

  private _searchValue = ""

  get icon(){
    return this.icons
  }

  get contacts(){
    return this._contacts
  }

  get searchValue():string{
    return this._searchValue
  }

  ngOnInit(): void {
    this.getContact()
  }

  openSearchForm(): void{
    this.renderSearchFrom = true
  }

  closeSearchForm(): void{
    this.renderSearchFrom = false
  }

  updateSearchValue($event: string): void{
    this._searchValue = $event
  }

  addNewContact(): void{
    this.router.navigate(['add'])
  }

  getContact(): void{
    this._contacts = this.storage.data
  }

}
