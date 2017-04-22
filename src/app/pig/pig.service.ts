import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';

import { IPig, Pig, EState } from '../core/entities';

@Injectable()
export class PigService {
  constructor(private af: AngularFire) { }

  createPig$(boardKey: string): Observable<IPig> {
    return Observable.create((observer: Observer<IPig>) => {
      const pigs$ = this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'dateCreated' } });
      const dateCreated = new Date().getTime();
      const newPig$ = pigs$.push({ 'dateCreated': dateCreated, 'isActive': true });
      const pig: IPig = { key: newPig$.ref.key, dateCreated: dateCreated };

      // Retrieve the new inserted pig in the "ordered by dateCreated" list so to assign a counter to the new pig.
      pigs$.take(1).subscribe((pigs: any[]) => {
        const pigNum = pigs.reduce((num, aPig, index) => {
          return num === -1 ? aPig.$key === newPig$.ref.key ? index + 1 : -1 : num;
        }, -1);

        pig.name = `Pig${pigNum}`;

        newPig$.update({ name: pig.name });

        observer.next(pig);
      });
    });
  }

  retrievePig$(boardKey: string, pigKey: string): Observable<IPig> {
    let result: IPig = null;

    return this.af.database.object(`boards/${boardKey}/pigs/${pigKey}`)
      .take(1)
      .map((pig: any) => {
        if (pig.$exists()) {
          result = new Pig(pig);

          this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/isActive`).set(true);
        }

        return new Pig(pig);
      });
  }

  retrieveHasVoted$(boardKey: string, pigKey: string): Observable<boolean> {
    return this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/hasVoted`)
      .map((hasVoted: any) => {
        return hasVoted.$value;
      });
  }

  retrieveScrumMaster$(boardKey: string): Observable<string> {
    return this.af.database.object(`boards/${boardKey}/scrumMaster`)
      .map((scrumMaster: any) => {
        return scrumMaster.$value;
      });
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

  vote(boardKey: string, pigKey: string, label: string) {
    this.af.database.object(`boards/${boardKey}/currentStory`)
      .switchMap((currentStory: any) => {
        return this.af.database.object(`boards/${boardKey}/currentRound`)
          .map((currentRound: any) => {
            return { story: currentStory.$value, round: currentRound.$value };
          });
      })
      .take(1)
      .subscribe((current: any) => {
        this.af.database.object(`boards/${boardKey}/votes/${current.story}/${current.round}/${pigKey}`).set(label);
        this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/hasVoted`).set(true);
      });
  }

  setResultForStory(boardKey: string, label: string) {
    this.af.database.object(`boards/${boardKey}/currentStory`)
      .switchMap((currentStory: any) => {
        return this.af.database.object(`boards/${boardKey}/currentRound`)
          .map((currentRound: any) => {
            return { story: currentStory.$value, round: currentRound.$value };
          });
      })
      .take(1)
      .subscribe((current: any) => {
        this.af.database.object(`boards/${boardKey}/results/${current.story}`).set(label);
        this.af.database.object(`boards/${boardKey}/state`).set(EState.PRE_DISCUSSION);
      });
  }
}
