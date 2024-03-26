import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { DataIcon } from '../../../core/data/formContact/icons';
import { faNotdef } from '@fortawesome/free-solid-svg-icons';
import { DynamicObject } from '../../../core/interfaces/model.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-form-field-icon',
  standalone: true,
  imports: [FontAwesomeModule, NgStyle],
  templateUrl: './field-icon.component.html',
  styleUrl: './field-icon.component.scss'
})
export class FormFieldIconComponent implements OnInit {

  private defaultIcon: IconDefinition = faNotdef
  protected iconRef!: IconDefinition

  @Input({required: true, alias: 'iconDef'}) iconDef!: string | IconDefinition | undefined
  @Input() style: DynamicObject<string> = {}

  ngOnInit(): void {
    this.checkIconDef()
  }

  private checkIconDef(): void{
    if(typeof this.iconDef == 'string'){ 
      this.iconRef = DataIcon.get(this.iconDef) || this.defaultIcon
      return
    }
    this.iconRef = this.iconDef || this.defaultIcon
  }

}
