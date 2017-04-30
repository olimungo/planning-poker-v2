import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';

import { IPig, Pig, EState } from './entities';

@Injectable()
export class CoreService {
  constructor(private af: AngularFire) { }

  retrievePig$(boardKey: string, pigKey: string): Observable<IPig> {
    return this.af.database.object(`boards/${boardKey}/pigs/${pigKey}`)
      .map((pig: any) => {
        return new Pig(pig);
      });
  }

  setIsActivePig(boardKey: string, pigKey: string, value: boolean) {
    this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/isActive`).set(value);
  }

  updatePig(boardKey: string, pigKey: string, name: string = null, email: string = null) {
    this.af.database.object(`boards/${boardKey}/pigs/${pigKey}`).update({ name: name, email: email });
  }

  retrieveState$(boardKey: string): Observable<number> {
    return this.af.database.object(`boards/${boardKey}/workflow/state`)
      .map((state: any) => {
        if (!state.$value) {
          return EState.REGISTRATION;
        } else {
          return state.$value;
        }
      });
  }

  setState(boardKey: string, state: number) {
    this.af.database.object(`boards/${boardKey}/workflow/state`).set(state);
  }

  retrieveScrumMaster$(boardKey: string): Observable<string> {
    return this.af.database.object(`boards/${boardKey}/scrumMaster`)
      .map((scrumMaster: any) => {
        return scrumMaster.$value;
      });
  }

  toggleScrumMaster(boardKey, pigKey) {
      const scrumMaster$ = this.af.database.object(`boards/${boardKey}/scrumMaster`);

      scrumMaster$.take(1).subscribe((scrumMaster: any) => {
        if (scrumMaster.$value) {
          if (scrumMaster.$value === pigKey) {
            scrumMaster$.set(null);
          }
        } else {
          scrumMaster$.set(pigKey);
        }
      });
  }

  retrieveHasVoted$(boardKey: string, pigKey: string): Observable<boolean> {
    return this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/hasVoted`)
      .map((hasVoted: any) => {
        return hasVoted.$value;
      });
  }

  retrieveStep$(boardKey: string): Observable<any> {
    return this.af.database.object(`boards/${boardKey}/workflow/step`)
      .map((step: any) => {
        return { story: step.story, round: step.round };
      });
  }

  retrieveStart$(boardKey: string): Observable<number> {
    return this.af.database.object(`boards/${boardKey}/workflow/time/start`)
      .map((start: any) => {
        return start.$value;
      });
  }

  retrieveTime$(boardKey: string): Observable<any> {
    return this.af.database.object(`boards/${boardKey}/workflow`)
      .map((workflow: any) => {
        const result: any = {};

        if (workflow.$exists()) {
          result.time = workflow.time ? workflow.time : null;
          result.stories = workflow.stories ? workflow.stories : null;
          result.step = workflow.step ? workflow.step : null;
        }

        return result;
      });
  }
}
