import { Component, Input } from '@angular/core';

import { IPig } from '../../core/entities';
import { BoardService } from '../board.service';

@Component({
  selector: 'board-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveVotes();
  }

  pigs: IPig[];

  private _boardKey: string;

  constructor(private boarService: BoardService) { }

  retrieveVotes() {
    this.boarService.retrieveAllPigs$(this._boardKey)
      .map(pigs => pigs.filter(pig => pig.isActive).filter(pig => pig.hasVoted))
      .switchMap(activeAndVotedPigs => this.boarService.retrieveResult$(this._boardKey)
        .map(votes => {
          return votes.map(vote => {
            return activeAndVotedPigs.filter(pig => {
              if (pig.key === vote.key) {
                pig.badge = vote.badge;
                return pig;
              }
            })[0];
          });
        }))
      .subscribe(pigs => {
        this.pigs = pigs;
    });
  }
}



