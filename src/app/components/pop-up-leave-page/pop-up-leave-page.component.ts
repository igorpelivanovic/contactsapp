import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { PopUpPageService } from '../../core/services/leave-page.service';
import { PopUpModelBoxContent } from '../../core/interfaces/popUpContent.interface';

@Component({
  selector: 'app-pop-up-leave-page',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-leave-page.component.html',
  styleUrl: './pop-up-leave-page.component.scss'
})
export class PopUpLeavePageComponent{

  @Output() canLeavePage = new EventEmitter()
  @Input({required: true}) content!: PopUpModelBoxContent
  private _leavePageService = inject(PopUpPageService)

  handle(val: boolean): void{
    this._leavePageService.status = val
    this.canLeavePage.emit()
  }
}
