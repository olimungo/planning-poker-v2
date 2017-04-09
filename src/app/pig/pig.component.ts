import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { IPig } from './entities/pig.interface';
import { IMessage } from './entities/message.interface';
import { EStatus } from './entities/status.enum';

import { PigService } from './pig.service';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent {
  boardKey: string;
  EStatus = EStatus;
  pig: IPig;
  messages$: Observable<IMessage[]>;
  status: number;
  hasVoted: boolean;

  constructor(private route: ActivatedRoute, private location: Location, private pigService: PigService) {
    this.route.params.subscribe((params: Params) => {
      this.boardKey = params['boardKey'];
      const pigKey = params['pigKey'];

      this.retrieveOrCreatePig(pigKey).subscribe((pig: IPig) => {
        this.pig = pig;

        if (this.pig) {
          this.setWatchers();
        } else {
          console.log('Pig doesn\'t exists');
        }
      });
    });
  }

  retrieveOrCreatePig(pigKey: string): Observable<IPig> {
    return Observable.create((observer: Observer<IPig>) => {
      if (pigKey) {
        this.pigService.retrievePig$(this.boardKey, pigKey).subscribe((pig: IPig) => {
          observer.next(pig);
        });
      } else {
        this.pigService.createPig$(this.boardKey).subscribe((pig: IPig) => {
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
    this.pigService.retrieveStatus$(this.boardKey).subscribe((status: number) => {
      this.status = status;
    });

    this.pigService.retrieveHasVoted$(this.boardKey, this.pig.key).subscribe((hasVoted: boolean) => {
      this.hasVoted = hasVoted;
    });
  }
}
