import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectOption } from '../../../core/interfaces/selectOption.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SelectOptLabelPipe } from '../../../core/pipes/select-opt-label.pipe';
import { ClickOutSideDirective } from '../../../core/directives/click-out-side.directive';
import { selectOptContainerAnime } from '../../../core/animations/selectOptionsContainerAnime';
import { JsonPipe } from '@angular/common';

@Component({
  animations: [selectOptContainerAnime],
  selector: 'app-form-array-control-select',
  standalone: true,
  imports: [FontAwesomeModule, SelectOptLabelPipe, ClickOutSideDirective,JsonPipe],
  templateUrl: './form-array-control-select.component.html',
  styleUrl: './form-array-control-select.component.scss'
})
export class FormArrayControlSelectComponent implements OnInit {
  
  @Input({required: true}) fControl !: FormControl
  @Input({required: true}) selectOptions !: SelectOption[]

  private icons = {
    faChevronDown: faChevronDown
  }

  private labelOpt : string = "select an option..."

  private renderSelectOptions: boolean = false

  get icon(){
    return this.icons
  }

  set labelSelectedOption(label: string){
    this.labelOpt = label
  }

  get labelSelectedOption(): string{
    return this.labelOpt
  }

  get renderOpts(): boolean{
    return this.renderSelectOptions
  }

  set selectedOption(opt: SelectOption){
    this.fControl.setValue(opt.value)
  }

  get selectedOption(): string{
    return this.fControl.value
  }

  ngOnInit(): void {
    this.initLabel()
  }

  private initLabel(): void{
    this.selectOptions.find(opt=>this.selectedOption == opt.value ? this.labelSelectedOption = opt.label : null)
  }

  toggleSelectOptions(): void{
    this.renderSelectOptions = !this.renderSelectOptions
  }

  setValue(opt: SelectOption): void{
    this.selectedOption = opt
  }

  clickOutSide(){
    this.renderSelectOptions = false
  }

}
