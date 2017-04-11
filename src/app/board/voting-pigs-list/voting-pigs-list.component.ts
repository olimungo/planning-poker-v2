import { Component, Input } from '@angular/core';

import { IPig } from '../../core/entities';
import { BoardService } from '../board.service';

@Component({
  selector: 'board-voting-pigs-list',
  templateUrl: './voting-pigs-list.component.html',
  styleUrls: ['./voting-pigs-list.component.css']
})
export class VotingPigsListComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveVotingPigs();
  }

  pigs: IPig[];

  private _boardKey: string;

  constructor(private boarService: BoardService) { }

  retrieveVotingPigs() {
    this.boarService.retrieveAllPigs$(this._boardKey).subscribe(pigs => {
      this.pigs = pigs.filter(pig => pig.isActive).filter(pig => !pig.hasVoted);
    });
  }

  deactivate(pigKey: string) {
    this.boarService.deactivatePig(this._boardKey, pigKey);
  }
}

