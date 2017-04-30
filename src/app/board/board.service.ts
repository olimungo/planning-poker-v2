import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

import { IPig, Pig, EState, CoreService } from '../core';

@Injectable()
export class BoardService {
  constructor(private af: AngularFire, private coreService: CoreService) { }

  getNewBoardId(): string {
    return this.af.database.list('boards').$ref.ref.push().key;
  }

  retrieveState$(boardKey: string): Observable<number> {
    return this.coreService.retrieveState$(boardKey);
  }

  setState(boardKey: string, state: number) {
    return this.coreService.setState(boardKey, state);
  }

  checkBoardExists$(boardKey: string): Observable<boolean> {
    return this.af.database.object(`boards/${boardKey}`)
      .take(1)
      .map((board: any) => {
        return board.$exists();
      });
  }

  prepareVotingRound(boardKey: string, state: number) {
    const step$ = this.af.database.object(`boards/${boardKey}/workflow/step`);

    if (state === EState.PRE_DISCUSSION) {
      step$.take(1).subscribe((step: any) => {
        const now = new Date().getTime();
        let story = 1;

        if (step.$exists()) {
          this.af.database.object(`boards/${boardKey}/workflow/stories/${step.story}/end`).set(now);
          story = step.story + 1;
        } else {
          this.af.database.object(`boards/${boardKey}/workflow/time/start`).set(now);
        }

        this.af.database.object(`boards/${boardKey}/workflow/stories/${story}/start`).set(now);
        this.af.database.object(`boards/${boardKey}/workflow/time/story`).set(now);

        step$.update({ story: story, round: 1 });
      });
    }

    if (state === EState.PRE_REVOTE) {
      step$.take(1).subscribe((workflow: any) => {
        step$.update({ story: workflow.story, round: workflow.round + 1 });
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
      this.setState(boardKey, EState.VOTE);
    }

    if (state === EState.PRE_DISCUSSION) {
      this.setState(boardKey, EState.DISCUSSION);
    }
  }

  retrieveCountVotedPigs$(boardKey): Observable<number> {
    return this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'hasVoted', equalTo: false } })
      .map((pigs: any[]) => {
        return pigs.filter(pig => pig['isActive']).length;
      });
  }

  retrieveAllPigs$(boardKey: string): Observable<IPig[]> {
    return this.af.database.list(`boards/${boardKey}/pigs`)
      .map((pigs: any[]) => {
        return pigs.map((pig: any) => {
          return new Pig(pig);
        });
      });
  }

  deactivatePig(boardKey: string, pigKey: string) {
    this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/isActive`).set(false);
    this.af.database.object(`boards/${boardKey}/scrumMaster`).take(1).subscribe(scrumMaster => {
      if (scrumMaster.$value === pigKey) {
        this.af.database.object(`boards/${boardKey}/scrumMaster`).set(null);
      }
    });
  }

  finalise(boardKey: string) {
    this.af.database.object(`boards/${boardKey}/workflow/time/end`).set(new Date().getTime());
    this.setState(boardKey, EState.FINAL_RESULTS);
  }

  pause(boardKey: string) {
    this.af.database.object(`boards/${boardKey}/workflow/time/pause/since`).set(new Date().getTime());
    this.setState(boardKey, EState.PAUSE);
  }

  unpause(boardKey: string) {
    this.af.database.object(`boards/${boardKey}/workflow`).take(1).subscribe(workflow => {
      let duration = workflow.time.pause.duration ? workflow.time.pause.duration : 0;
      const since = workflow.time.pause.since ? workflow.time.pause.since : 0;
      const ellapsed = new Date().getTime() - since;

      this.af.database.object(`boards/${boardKey}/workflow/time/pause`).set({ duration : duration + ellapsed, since: null });

      duration = workflow.stories[workflow.step.story].pauseDuration ? workflow.stories[workflow.step.story].pauseDuration : 0;
      this.af.database.object(`boards/${boardKey}/workflow/stories/${workflow.step.story}/pauseDuration`).set(duration + ellapsed);

      this.setState(boardKey, EState.DISCUSSION);
    });
  }

  retrieveResult$(boardKey: string): Observable<any[]> {
    return this.af.database.object(`boards/${boardKey}/workflow/step`)
      .switchMap(step => this.af.database.list(`boards/${boardKey}/workflow/votes/${step.story}/${step.round}`)
        .map(votes => votes.map(vote => {
          return { key: vote.$key, badge: vote.$value };
        })));
  }

  retrieveFinalResult$(boardKey: string): Observable<any[]> {
    return this.af.database.list(`boards/${boardKey}/workflow/results`)
      .map(results => results.map(result => result.$value));
  }
}
