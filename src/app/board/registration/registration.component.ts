import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'board-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() set boardKey(value: string) {
    this.url = environment.backEndUrl + 'pig/' + value;
  }

  url = '';

  constructor() { }

  createPig() {
    window.open(this.url);
  }
}
