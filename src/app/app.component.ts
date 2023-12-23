import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWifi, faBatteryFull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  datePipe = inject(DatePipe)
  
  title = 'contactsapp';
  time = this.currentTime

  private icons = {
    faWifi: faWifi,
    faBatteryFull: faBatteryFull
  }

  get icon(){
    return this.icons
  }

  get currentTime(): string{
    return this.datePipe.transform( new Date() ,'HH:mm') as string
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.time = this.currentTime 
    }, 1000)
  }

}
