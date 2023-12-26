import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWifi, faBatteryFull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile-info-line',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './mobile-info-line.component.html',
  styleUrl: './mobile-info-line.component.scss'
})
export class MobileInfoLineComponent implements OnInit {
  
  private datePipe = inject(DatePipe)

  private icons = {
    faWifi: faWifi,
    faBatteryFull: faBatteryFull
  }

  time = this.currentTime

  ngOnInit(): void {
    setInterval(()=>{
      this.time = this.currentTime
    }, 1000)
  }

  get currentTime() : string{
    return this.datePipe.transform(new Date, 'HH:mm') as string
  }

  get icon(){
    return this.icons
  }

}
