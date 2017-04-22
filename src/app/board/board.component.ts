import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EState } from '../core/entities';
import { BoardService } from './board.service';
import { Observable  } from 'rxjs/Rx';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  boardKey = '';
  EState = EState;
  state: number = -1;

  constructor(private route: ActivatedRoute, private boardService: BoardService) {
    this.route.params.subscribe(params => {
      this.boardKey = params['boardKey'];

      if (this.boardKey) {
        this.boardService.checkBoardExists$(this.boardKey).subscribe(exists => {
          if (exists) {
            this.setWatchers();
          }  else {
            console.error('Board doesn\'t exists');
          }
        });
      } else {
        this.boardKey = this.boardService.getNewBoardId();
        this.setWatchers();
      }
    });
  }

  setWatchers() {
    let previousCount = -1;
    let previousState = -1;

    this.boardService.retrieveState$(this.boardKey)
      .combineLatest(this.boardService.retrieveCountVotedPigs$(this.boardKey)).subscribe(([ state, count ]) => {
        if (count !== previousCount && state === EState.VOTE && count === 0) {
          this.boardService.setState(this.boardKey, EState.RESULT);
        }

        if (state !== previousState && (state === EState.PRE_DISCUSSION || state === EState.PRE_REVOTE)) {
          this.boardService.prepareVotingRound(this.boardKey, state);
        }

        previousState = this.state = state;
        previousCount = count;
      });
  }
}
