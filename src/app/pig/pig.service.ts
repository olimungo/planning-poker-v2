import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';

import { IPig, Pig, EState, CoreService } from '../core';

@Injectable()
export class PigService {
  constructor(private af: AngularFire, private coreService: CoreService) { }

  createPig$(boardKey: string): Observable<IPig> {
    return Observable.create((observer: Observer<IPig>) => {
      const pigs$ = this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'dateCreated' } });
      const now = new Date().getTime();
      const newPig$ = pigs$.push({ 'dateCreated': now, 'isActive': true });
      const pig: IPig = { key: newPig$.ref.key, dateCreated: now };

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
    return this.coreService.retrievePig$(boardKey, pigKey)
      .take(1)
      .do((pig: any) => {
        if (pig) {
          this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/isActive`).set(true);
        }
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
    return this.coreService.retrieveState$(boardKey);
  }

  vote(boardKey: string, pigKey: string, label: string) {
    this.af.database.object(`boards/${boardKey}/workflow/step`)
      .take(1)
      .subscribe((step: any) => {
        this.af.database.object(`boards/${boardKey}/workflow/votes/${step.story}/${step.round}/${pigKey}`).set(label);
        this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/hasVoted`).set(true);
      });
  }

  setResultForStory(boardKey: string, label: string) {
    this.af.database.object(`boards/${boardKey}/workflow/step`)
      .take(1)
      .subscribe((step: any) => {
        this.af.database.object(`boards/${boardKey}/workflow/results/${step.story}`).set(label);
        this.coreService.setState(boardKey, EState.PRE_DISCUSSION);
      });
  }
}
