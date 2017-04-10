import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';

import { IPig, IMessage, EStatus } from '../core/entities';

@Injectable()
export class PigService {
  constructor(private af: AngularFire) { }

  createPig$(boardKey: string): Observable<IPig> {
    return Observable.create((observer: Observer<IPig>) => {
      const pigs$ = this.af.database.list(`boards/${boardKey}/pigs`, { query: { orderByChild: 'date-created' } });
      const dateCreated = new Date().getTime();
      const newPig$ = pigs$.push({ 'date-created': dateCreated, 'is-active': true });
      const pig: IPig = { key: newPig$.ref.key, dateCreated: dateCreated };

      // Retrieve the new inserted pig in the ordered by created_date list, in order to assign a counter to the new pig.
      pigs$.take(1).subscribe((pigs: any[]) => {
        const pigNum = pigs.reduce((num, aPig, index) => {
          return num === -1 ? aPig.$key === newPig$.ref.key ? index + 1 : -1 : num;
        }, -1);

        pig.name = `Pig${pigNum}`;

        newPig$.update({ name: pig.name });

        this.addMessage(boardKey, `${pig.name} joined the group`);

        observer.next(pig);
      });
    });
  }

  retrievePig$(boardKey, pigKey: string): Observable<IPig> {
    let result: IPig = null;

    return this.af.database.object(`boards/${boardKey}/pigs/${pigKey}`)
      .take(1)
      .map((pig: any) => {
        if (pig.$exists()) {
          result = { key: pig.$key, name: pig.name, dateCreated: pig['date-created'] };
          this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/is-active`).set(true);
        }

        return result;
      });
  }

  retrieveAllPigs$(boardKey: string): Observable<IPig[]> {
    return this.af.database.list(`boards/${boardKey}/pigs`)
      .map((pigs: any[]) => {
        return pigs.map((pig: any) => {
          return { key: pig.$key, name: pig.name, dateCreated: pig['date-created'] };
        });
      });
  }

  retrieveAllMessages$(boardKey: string, dateThreshold: number): Observable<IMessage[]> {
    return this.af.database.list(`boards/${boardKey}/messages`, { query: { startAt: dateThreshold, orderByChild: 'date-created' } })
      .map((messages: any[]) => {
        return messages.map((message: any) => {
          return { key: message.$key, text: message.text, dateCreated: message['date-created'] };
        });
      });
  }

  addMessage(boardKey: string, text: string) {
    this.af.database.list(`boards/${boardKey}/messages`).push({ 'date-created': new Date().getTime(), text: text });
  }

  retrieveScrumMaster$(boardKey: string): Observable<string> {
    return this.af.database.object(`boards/${boardKey}/scrum-master`)
      .map((scrumMaster: any) => {
        return scrumMaster.$value;
      });
  }

  retrieveHasVoted$(boardKey: string, pigKey: string): Observable<boolean> {
    return this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/has-voted`)
      .map((hasVoted: any) => {
        return hasVoted.$value;
      });
  }

  toggleScrumMaster(boardKey, pigKey) {
      const scrumMaster$ = this.af.database.object(`boards/${boardKey}/scrum-master`);

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

  setStatus(boardKey: string, status: number) {
    this.af.database.object(`boards/${boardKey}/status`).set(status);
  }

  vote(boardKey: string, pigKey: string, label: string) {
    this.af.database.object(`boards/${boardKey}/current-story`)
      .switchMap((currentStory: any) => {
        return this.af.database.object(`boards/${boardKey}/current-round`)
          .map((currentRound: any) => {
            return { story: currentStory.$value, round: currentRound.$value };
          });
      })
      .take(1)
      .subscribe((current: any) => {
        this.af.database.object(`boards/${boardKey}/votes/${current.story}/${current.round}/${pigKey}`).set(label);
        this.af.database.object(`boards/${boardKey}/pigs/${pigKey}/has-voted`).set(true);
      });
  }
}
