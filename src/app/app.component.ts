import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data, RouterOutlet } from '@angular/router';
import { MobileInfoLineComponent } from './components/mobile-info-line/mobile-info-line.component';
import { pagesAnime } from './core/animations/pagesAnime';

@Component({
  animations: [pagesAnime],
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MobileInfoLineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = 'contactsapp';


  routerData(outlet: RouterOutlet): Data{
    return  outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState']
  }
  
}
