import { Component, Input, HostListener } from '@angular/core';

import { environment } from '../../../environments/environment';

import { BoardService } from '../board.service';

@Component({
  selector: 'board-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.url = environment.backEndUrl + 'pig/' + value;
  }

  url = '';
  size: number;

  private _boardKey: string;

  constructor(private boarService: BoardService) {
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 400) {
      this.size = 100;
    } else {
      this.size = 150;
    }
  }

  mail() {
    const subject = 'Planning poker URL';
    const message = this.url;

    window.open('mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message));
  }
}

