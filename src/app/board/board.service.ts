import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import { IPig, IMessage, EStatus } from '../core/entities';

@Injectable()
export class BoardService {
  constructor(private af: AngularFire) { }

  getNewBoardId(): string {
    return this.af.database.list('boards').$ref.ref.push().key;
  }

  retrieveStatus$(boardKey): Observable<number> {
    return this.af.database.object(`boards/${boardKey}/status`)
      .map((status: any) => {
        if (!status.$value) {
          return EStatus.REGISTRATION;
        } else {
          return status.$value;
        }
      });
  }

  checkBoardExists$(boardKey): Observable<boolean> {
    return this.af.database.object(`boards/${boardKey}`)
      .take(1)
      .map((board: any) => {
        return board.$exists();
      });
  }

  prepareVotingRound(boardKey: string, status: number) {
    const currentRound$ = this.af.database.object(`boards/${boardKey}/current-round`);
    const currentStory$ = this.af.database.object(`boards/${boardKey}/current-story`);

    if (status === EStatus.PRE_VOTE) {
      currentStory$.take(1).subscribe((currentStory: any) => {
        if (currentStory.$value) {
          currentStory$.set(++currentStory.$value);
        } else {
          currentStory$.set(1);
        }

        currentRound$.set(1);
      });
    }

    if (status === EStatus.PRE_REVOTE) {
      currentRound$.take(1).subscribe((currentRound: any) => {
        currentRound$.set(++currentRound.$value);
      });
    }

    this.af.database.list(`boards/${boardKey}/pigs`)
      .take(1)
      .subscribe((pigs: any[]) => {
        pigs.map((pig: any) => {
          this.af.database.object(`boards/${boardKey}/pigs/${pig.$key}/has-voted`).set(false);
        });

        this.af.database.object(`boards/${boardKey}/status`).set(EStatus.VOTE);
      });
  }

  retrieveCountVotedPigss$(boardKey): Observable<number> {
    return this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'has-voted', equalTo: false }})
      .map((pigs: any[]) => {
        return pigs.length;
      });
  }

  setStatus(boardKey: string, status: number) {
    this.af.database.object(`boards/${boardKey}/status`).set(status);
  }
}
