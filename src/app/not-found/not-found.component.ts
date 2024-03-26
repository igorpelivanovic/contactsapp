import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  private _router = inject(Router)

  private _icons = {
    faUsers: faUsers,
    faMagnifyingGlass: faMagnifyingGlass,
  }

  get icon() {
    return this._icons
  }

  goHome() :void{
    this._router.navigate([''])
  }

}
