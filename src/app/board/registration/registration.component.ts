import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IPig } from '../../core/entities';

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
    this.retrieveAllPigs();
  }

  url = '';
  pigs: IPig[];
  hideCreatePigButton = false;

  private _boardKey: string;

  constructor(private boarService: BoardService) {
    if (environment.production) {
      this.hideCreatePigButton = true;
    }
  }

  createPig() {
    // window.open(this.url);

    const subject = 'Planning poker URL';
    const message = this.url;

    window.open('mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message));
  }

  retrieveAllPigs() {
    this.boarService.retrieveAllPigs$(this._boardKey).subscribe(pigs => {
      this.pigs = pigs.filter(pig => pig.isActive);
    });
  }
}

