import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EStatus } from '../core/entities';
import { BoardService } from './board.service';
import { Observable  } from 'rxjs/Rx';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  boardKey = '';

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

  // To prevent streams to be subscribed many times in the HTML template
  setWatchers() {
    let previousCount = -1;
    let previousStatus = -1;

    this.boardService.retrieveStatus$(this.boardKey)
      .combineLatest(this.boardService.retrieveCountVotedPigss$(this.boardKey)).subscribe(([ status, count ]) => {
        if (count !== previousCount && status === EStatus.VOTE && count === 0) {
          this.boardService.setStatus(this.boardKey, EStatus.RESULT);
        }

        if (status !== previousStatus && (status === EStatus.PRE_VOTE || status === EStatus.PRE_REVOTE)) {
          this.boardService.prepareVotingRound(this.boardKey, status);
        }

        previousStatus = status;
        previousCount = count;
      });
  }
}
