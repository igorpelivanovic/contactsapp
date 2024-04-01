import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faNotdef } from '@fortawesome/free-solid-svg-icons';
import { NgStyle } from '@angular/common';
import { DynamicObject } from '../../interfaces/model.interface';

@Component({
  selector: 'lib-form-field-icon',
  standalone: true,
  imports: [FontAwesomeModule, NgStyle],
  templateUrl: './field-icon.component.html',
})
export class LibFormFieldIconComponent implements OnInit {

  private defaultIcon: IconDefinition = faNotdef
  protected iconRef!: IconDefinition

  @Input({required: true, alias: 'iconDef'}) iconDef!: IconDefinition | undefined
  @Input() style: DynamicObject<string> = {}
  @HostBinding('class.icon')

  ngOnInit(): void {
    this.checkIconDef()
  }

  private checkIconDef(): void{
    if(this.iconDef == undefined){ 
      this.iconRef = this.defaultIcon
      return
    }
    this.iconRef = this.iconDef
  }

}
