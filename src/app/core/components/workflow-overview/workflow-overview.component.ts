import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import * as moment from 'moment';

import { CoreHeaderModalComponent } from '..';
import { CoreService } from '../../core.service';
import { Observable, Subscription } from 'rxjs/Rx';

import { IPig, EState } from '../..';

@Component({
  selector: 'core-workflow-overview',
  templateUrl: './workflow-overview.component.html',
  styleUrls: ['./workflow-overview.component.css']
})
export class WorkflowOverviewComponent {
  @Input() useAccentColor = false;

  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  }

  pig: IPig;
  story: number;
  round: number;
  time = {
    start: null,
    duration: null,
    storyDuration: null,
    totalPause: null,
    end: null,
    pause: { duration: null, story: null }
  };

  private _boardKey: string;
  private timer: Subscription;

  constructor(public dialog: MdDialog, private coreService: CoreService) { }

  setWatchers() {
    if (this._boardKey) {
      this.coreService.retrieveStep$(this._boardKey).subscribe(step => {
        this.story = step.story;
        this.round = step.round;
      });

      this.coreService.retrieveTime$(this._boardKey).debounceTime(500).subscribe(workflow => {
        const now = new Date().getTime();

        this.time.start = this.time.end = null;

        if (workflow && workflow.time) {
          const totalPause = workflow.time.pause && workflow.time.pause.duration ? workflow.time.pause.duration : 0;
          const storyPause = workflow.stories[workflow.step.story].pauseDuration ? workflow.stories[workflow.step.story].pauseDuration : 0;

          if (workflow.time.end) {
            if (this.timer) {
              this.timer.unsubscribe();
            }

            let date = new Date(workflow.time.end);
            this.time.end = ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2);

            date = new Date(workflow.time.start);
            this.time.start = ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2);
            this.time.duration = this.formatDuration(workflow.time.end - workflow.time.start - totalPause);
            this.time.totalPause = this.formatDuration(totalPause);

          } else if (workflow.time.start) {
            const date = new Date(workflow.time.start);
            this.time.start = ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2);

            this.time.duration = this.formatDuration(now - workflow.time.start - totalPause);
            this.time.storyDuration = this.formatDuration(now - workflow.time.story - storyPause);

            if (this.timer) {
              this.timer.unsubscribe();
            }

            this.timer = Observable.timer(0, 1000).subscribe(timer => {
              if (workflow.state !== EState.PAUSE) {
                const timerNow = new Date().getTime();

                this.time.duration = this.formatDuration(timerNow - workflow.time.start - totalPause);
                this.time.storyDuration = this.formatDuration(timerNow - workflow.time.story - storyPause);
              }
            });
          }
        }
     });

    }
  }

  private formatDuration(duration: number) {
    const momentDuration = moment.duration(duration);
    const hours = ('00' + momentDuration.get('hours')).slice(-2);
    const minutes = ('00' + momentDuration.get('minutes')).slice(-2);
    const seconds = ('00' + momentDuration.get('seconds')).slice(-2);

    return hours + 'h' + minutes + 'm' + seconds + 's';
  }
}
