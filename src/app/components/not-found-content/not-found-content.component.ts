import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found-content',
  standalone: true,
  imports: [],
  templateUrl: './not-found-content.component.html',
  styleUrl: './not-found-content.component.scss'
})
export class NotFoundContentComponent {
    @Input({alias: 'headText'}) headText : string = ""
    @Input({alias: 'text'}) text : string = ""
}
