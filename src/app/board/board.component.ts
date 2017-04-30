import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { EState } from '../core/entities';
import { BoardService } from './board.service';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  boardKey = '';
  EState = EState;
  state: number = -1;

  constructor(private route: ActivatedRoute, private location: Location, private boardService: BoardService) {
    this.route.params.subscribe(params => {
      this.boardKey = params['boardKey'];

      if (!this.boardKey) {
        this.boardKey = this.boardService.generateBoardKey();
        this.location.replaceState(this.location.path() + `/${this.boardKey}`);
      }

      this.setWatchers();
    });
  }

  setWatchers() {
    let checkBoardSubscription: Subscription;
    let previousCount = -1;
    let previousState = -1;

    checkBoardSubscription = this.boardService.checkBoardDateCreated$(this.boardKey).subscribe(result => {
      if (result.pigs.length > 0 && !result.dateCreated) {
        this.boardService.setBoardDateCreated(this.boardKey);
        checkBoardSubscription.unsubscribe();
      }
    });

    this.boardService.retrieveState$(this.boardKey)
      .combineLatest(this.boardService.retrieveCountVotedPigs$(this.boardKey)).subscribe(([state, count]) => {
        if (count !== previousCount && state === EState.VOTE && count === 0) {
          this.boardService.setState(this.boardKey, EState.RESULTS);
        }

        if (state !== previousState) {
          switch (state) {
            case EState.PRE_DISCUSSION || EState.PRE_REVOTE:
              this.boardService.prepareVotingRound(this.boardKey, state);
              break;
            case EState.PRE_FINAL_RESULTS:
              this.boardService.finalise(this.boardKey);
              break;
            case EState.PRE_PAUSE:
              this.boardService.pause(this.boardKey);
              break;
            case EState.UNPAUSE:
              this.boardService.unpause(this.boardKey);
              break;
          }
        }

        previousState = this.state = state;
        previousCount = count;
      });
  }

  openGitHub() {
    window.open('https://github.com/olimungo/planning-poker');
  }
}
