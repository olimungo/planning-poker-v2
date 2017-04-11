import { Component, Input } from '@angular/core';

import { IPig } from '../../core/entities';
import { BoardService } from '../board.service';

@Component({
  selector: 'board-voted-pigs-list',
  templateUrl: './voted-pigs-list.component.html',
  styleUrls: ['./voted-pigs-list.component.css']
})
export class VotedPigsListComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveVotedPigs();
  }

  pigs: IPig[];

  private _boardKey: string;

  constructor(private boarService: BoardService) { }

  retrieveVotedPigs() {
    this.boarService.retrieveAllPigs$(this._boardKey).subscribe(pigs => {
      this.pigs = pigs.filter(pig => pig.isActive).filter(pig => pig.hasVoted);
    });
  }
}


