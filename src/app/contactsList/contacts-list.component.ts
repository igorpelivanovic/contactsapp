import { Component, Input, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { SetBgColorDirective } from '../core/directives/set-bg-color.directive';
import { GroupByPipe } from '../core/pipes/group-by.pipe';
import { SortPipe } from '../core/pipes/sort.pipe';
import { FilterByPipe } from '../core/pipes/filter-by.pipe';
import { ContactInterface } from '../core/interfaces/contact.interface';
import { SectionIndexContainerComponent } from "./components/section-index-container/section-index-container.component";
import { GetArrayOfPropertyObecktOfArray } from '../core/pipes/get-value-ojeckt-of-array.pipe';
import { CurentContactOfIndexComponent } from "./components/curent-contact-of-index/curent-contact-of-index.component";
import { NotFoundContentComponent } from "../components/not-found-content/not-found-content.component";
import { AddCustomAttributeDirective } from '../core/directives/add-custom-attribute.directive';

@Component({
    selector: 'app-contacts-list',
    standalone: true,
    templateUrl: './contacts-list.component.html',
    styleUrl: './contacts-list.component.scss',
    imports: [FontAwesomeModule, SearchFormComponent, SetBgColorDirective, GroupByPipe, SortPipe, FilterByPipe, SectionIndexContainerComponent, GetArrayOfPropertyObecktOfArray, CurentContactOfIndexComponent, NotFoundContentComponent, AddCustomAttributeDirective]
})
export class ContactsListComponent implements OnInit{

  renderSearchFrom: boolean = false
  private _contacts: ContactInterface[] = []

  private router = inject(Router)
  private storage = inject(StorageService)

  private icons = {
    faMagnifyingGlass: faMagnifyingGlass,
    faArrowLeft: faArrowLeft,
    faUserPlus: faUserPlus,
    faUsers: faUsers,
  }

  private _searchValue = ""

  @Input({alias: 'search'}) searchParam !: string | undefined

  ngOnInit(): void {
    this.initSearchVal()
    this.getContact()
  }

  get icon(){
    return this.icons
  }

  get contacts(){
    return this._contacts
  }

  get searchValue():string{
    return this._searchValue
  }

  get sectionIdPrefix() :string{
    return 'sectionContactIndex'
  }

  get noContentText(): string{
    if(this.searchValue.length > 0){
      return "contact not find"
    }
    return "contacts you've added will appear here."
  }

  private initSearchVal(): void{
    if(this.searchParam != undefined){
      this._searchValue = this.searchParam
    }
  }

  private getContact(): void{
    this._contacts = this.storage.data
    return
  }

  openSearchForm(): void{
    this.renderSearchFrom = true
  }

  closeSearchForm(): void{
    this.renderSearchFrom = false
    this._searchValue = ""
  }

  updateSearchValue($event: string): void{
    this._searchValue = $event
  }

  addNewContact(): void{
    this.router.navigate(['add'])
  }

  previewContact(id: number): void{
    this.router.navigate(['preview', id])
  }

}
