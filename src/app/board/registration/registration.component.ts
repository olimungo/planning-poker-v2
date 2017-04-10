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

  private _boardKey: string;

  constructor(private boarService: BoardService) { }

  createPig() {
    window.open(this.url);
  }

  retrieveAllPigs() {
    this.boarService.retrieveAllPigs$(this._boardKey).subscribe(pigs =>  {
      this.pigs = pigs.filter(pig => pig.isActive);
    });
  }
}
