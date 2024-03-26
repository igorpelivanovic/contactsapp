import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ActiveIndexContactsGroupService } from '../../../core/services/active-index-contacts-group.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curent-contact-of-index',
  standalone: true,
  imports: [],
  templateUrl: './curent-contact-of-index.component.html',
  styleUrl: './curent-contact-of-index.component.scss'
})
export class CurentContactOfIndexComponent implements OnInit, OnDestroy {

  renderIndicatorContainer: boolean = false
  caracter: string = ""

  private _subscriptions!: Subscription
  private timeOut!: ReturnType<typeof setTimeout>;

  private activeGroupOfContactsServ = inject(ActiveIndexContactsGroupService)

  @Input({alias: 'boxModelDuration'}) duration : number = 2000

  ngOnInit(): void {
    this._subscriptions = this.activeGroupOfContactsServ.activeGroupContacts.subscribe(val=>{
      if(this.caracter != val){
        this.renderIndicatorContainer = true
        this.caracter = val
        clearInterval(this.timeOut)
        this.timeOut = setTimeout(()=>{
          this.renderIndicatorContainer = false
        }, this.duration)
      }
    })
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }


}
