import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import { IPig, Pig, EState } from '../core/entities';

@Injectable()
export class BoardService {
  constructor(private af: AngularFire) { }

  getNewBoardId(): string {
    return this.af.database.list('boards').$ref.ref.push().key;
  }

  retrieveState$(boardKey: string): Observable<number> {
    return this.af.database.object(`boards/${boardKey}/state`)
      .map((state: any) => {
        if (!state.$value) {
          return EState.REGISTRATION;
        } else {
          return state.$value;
        }
      });
  }

  checkBoardExists$(boardKey: string): Observable<boolean> {
    return this.af.database.object(`boards/${boardKey}`)
      .take(1)
      .map((board: any) => {
        return board.$exists();
      });
  }

  prepareVotingRound(boardKey: string, state: number) {
    const currentRound$ = this.af.database.object(`boards/${boardKey}/currentRound`);
    const currentStory$ = this.af.database.object(`boards/${boardKey}/currentStory`);

    if (state === EState.PRE_DISCUSSION) {
      currentStory$.take(1).subscribe((currentStory: any) => {
        if (currentStory.$value) {
          currentStory$.set(++currentStory.$value);
        } else {
          currentStory$.set(1);
        }

        currentRound$.set(1);
      });
    }

    if (state === EState.PRE_REVOTE) {
      currentRound$.take(1).subscribe((currentRound: any) => {
        currentRound$.set(++currentRound.$value);
      });
    }

    this.af.database.list(`boards/${boardKey}/pigs`)
      .take(1)
      .subscribe((pigs: any[]) => {
        pigs.map((pig: any) => {
          this.af.database.object(`boards/${boardKey}/pigs/${pig.$key}/hasVoted`).set(false);
        });

      });

    if (state === EState.PRE_REVOTE) {
      this.af.database.object(`boards/${boardKey}/state`).set(EState.VOTE);
    }

    if (state === EState.PRE_DISCUSSION) {
      this.af.database.object(`boards/${boardKey}/state`).set(EState.DISCUSSION);
    }
  }

  retrieveCountVotedPigs$(boardKey): Observable<number> {
    return this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'hasVoted', equalTo: false } })
      .map((pigs: any[]) => {
        return pigs.filter(pig => pig['isActive']).length;
      });
  }

  setState(boardKey: string, state: number) {
    this.af.database.object(`boards/${boardKey}/state`).set(state);
  }

  retrieveAllPigs$(boardKey: string): Observable<IPig[]> {
    return this.af.database.list(`boards/${boardKey}/pigs`)
      .map((pigs: any[]) => {
        return pigs.map((pig: any) => {
          return new Pig(pig);
        });
      });
  }

  retrieveResult$(boardKey: string): Observable<any[]> {
    return this.af.database.object(`boards/${boardKey}/currentStory`)
      .switchMap(currentStory => this.af.database.object(`boards/${boardKey}/currentRound`)
        .switchMap(currentRound => this.af.database.list(`boards/${boardKey}/votes/${currentStory.$value}/${currentRound.$value}`)
          .map(votes => votes.map(vote => {
            return { key: vote.$key, badge: vote.$value };
          }))));
  }

  deactivatePig(boardKey: string, pigKey: string) {
    this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/isActive`).set(false);
  }
}
