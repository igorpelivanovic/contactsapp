import { Component, EventEmitter, Output, inject } from '@angular/core';
import { LeavePageService } from '../../core/services/leave-page.service';

@Component({
  selector: 'app-pop-up-leave-page',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-leave-page.component.html',
  styleUrl: './pop-up-leave-page.component.scss'
})
export class PopUpLeavePageComponent {

  @Output() canLeavePage = new EventEmitter()

  private _leavePageService = inject(LeavePageService)

  handle(val: boolean): void{
    this._leavePageService.status = val
    this.canLeavePage.emit()
  }
}
