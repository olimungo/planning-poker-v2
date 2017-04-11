import { Component, Input } from '@angular/core';

import { IPig } from '../../core/entities';
import { BoardService } from '../board.service';

@Component({
  selector: 'board-active-pigs-list',
  templateUrl: './active-pigs-list.component.html',
  styleUrls: ['./active-pigs-list.component.css']
})
export class ActivePigsListComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveAllPigs();
  }

  pigs: IPig[];

  private _boardKey: string;

  constructor(private boarService: BoardService) { }

  retrieveAllPigs() {
    this.boarService.retrieveAllPigs$(this._boardKey).subscribe(pigs => {
      this.pigs = pigs.filter(pig => pig.isActive);
    });
  }

}
