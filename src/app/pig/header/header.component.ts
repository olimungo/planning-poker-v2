import { Component, Input } from '@angular/core';

@Component({
  selector: 'pig-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() name: string;
}
