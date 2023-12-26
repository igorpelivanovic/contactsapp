import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { isEmptyValidator } from '../../../core/validators/is-empty.validator';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {

  @Output() updateFormValue = new EventEmitter()

  private formBuilder = inject(FormBuilder)

  private icons = {
    faCircleXmark: faCircleXmark
  }

  get icon(){
    return this.icons
  }

  searchForm !: FormGroup

  ngOnInit(): void {
    this.initSearchForm()
  }

  private initSearchForm(): void{
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl("", isEmptyValidator())
    })
    this.getControl('searchValue').valueChanges.subscribe(val=>{
      this.updateFormValue.emit(val)
      console.log(this.getControl('searchValue').errors)
    })
  }

  getControl(name: string): AbstractControl{
    return this.searchForm.get(name) as AbstractControl
  }

  clearSearchValue(): void{
    this.getControl('searchValue').reset("")
  }

}
