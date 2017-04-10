import { Component, Input } from '@angular/core';

@Component({
  selector: 'core-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() name: string;
  @Input() badge: number;
  @Input() avatarUrl: number;

  constructor() { }
}
