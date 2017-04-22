import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';

import { IPig, EState } from '../core/entities';
import { PigService } from './pig.service';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent {
  boardKey: string;
  EState = EState;
  pig: IPig;
  state: number;
  scrumMasterKey: string;
  hasVoted: boolean;

  constructor(private route: ActivatedRoute, private location: Location, private pigService: PigService) {
    this.route.params.subscribe(params => {
      this.boardKey = params['boardKey'];
      const pigKey = params['pigKey'];

      this.retrieveOrCreatePig(pigKey).subscribe(pig => {
        this.pig = pig;

        if (this.pig) {
          this.setWatchers();
        } else {
          console.error('Pig doesn\'t exists');
        }
      });
    });
  }

  retrieveOrCreatePig(pigKey: string): Observable<IPig> {
    return Observable.create((observer: Observer<IPig>) => {
      if (pigKey) {
        this.pigService.retrievePig$(this.boardKey, pigKey).subscribe(pig => {
          observer.next(pig);
        });
      } else {
        this.pigService.createPig$(this.boardKey).subscribe(pig => {
          this.location.replaceState(this.location.path() + `/${pig.key}`);
          observer.next(pig);
        });
      }
    });
  }

  vote(label: string) {
    this.pigService.vote(this.boardKey, this.pig.key, label);
  }

  // To prevent streams to be subscribed many times in the HTML template
  setWatchers() {
    this.pigService.retrieveState$(this.boardKey).subscribe(state => {
      this.state = state;
    });

    this.pigService.retrieveScrumMaster$(this.boardKey).subscribe((scrumMasterKey: string) => {
      this.scrumMasterKey = scrumMasterKey;
    });

    this.pigService.retrieveHasVoted$(this.boardKey, this.pig.key).subscribe(hasVoted => {
      this.hasVoted = hasVoted;
    });
  }
}
