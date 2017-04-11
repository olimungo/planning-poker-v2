import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import { IPig, EStatus } from '../core/entities';

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

    if (status === EStatus.PRE_DISCUSSION) {
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

      });

    if (status === EStatus.PRE_REVOTE) {
      this.af.database.object(`boards/${boardKey}/status`).set(EStatus.VOTE);
    }

    if (status === EStatus.PRE_DISCUSSION) {
      this.af.database.object(`boards/${boardKey}/status`).set(EStatus.DISCUSSION);
    }
  }

  retrieveCountVotedPigss$(boardKey): Observable<number> {
    return this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'has-voted', equalTo: false } })
      .map((pigs: any[]) => {
        return pigs.filter(pig => pig['is-active']).length;
      });
  }

  setStatus(boardKey: string, status: number) {
    this.af.database.object(`boards/${boardKey}/status`).set(status);
  }

  retrieveAllPigs$(boardKey: string): Observable<IPig[]> {
    return this.af.database.list(`boards/${boardKey}/pigs`)
      .map((pigs: any[]) => {
        return pigs.map((pig: any) => {
          return { key: pig.$key, name: pig.name, email: pig.email, hasVoted: pig['has-voted'], isActive: pig['is-active'] };
        });
      });
  }

  deactivatePig(boardKey: string, pigKey: string) {
    this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/is-active`).set(false);
  }
}
