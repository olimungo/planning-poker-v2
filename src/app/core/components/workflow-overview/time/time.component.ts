import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import * as moment from 'moment';

import { CoreService } from '../../../core.service';

import { EState } from '../../..';

@Component({
  selector: 'core-workflow-overview-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  }

  isEnded = false;
  time = {
    start: null,
    duration: null,
    storyDuration: null,
    pauses: null,
    end: null
  };

  private _boardKey: string;
  private timer: Subscription;

  constructor(private coreService: CoreService) { }

  setWatchers() {
    if (this._boardKey) {
      this.coreService.retrieveTime$(this._boardKey).debounceTime(500).subscribe(workflow => {
        const now = new Date().getTime();
        const pauses = workflow.time && workflow.time.pause && workflow.time.pause.duration ? workflow.time.pause.duration : 0;
        const storyPause = workflow.stories && workflow.stories[workflow.step.story].pauseDuration ?
          workflow.stories[workflow.step.story].pauseDuration : 0;
        const isStarted = workflow && workflow.time && workflow.time.start;
        const isPaused = workflow && workflow.time && workflow.time.pause && workflow.time.pause.since;

        this.isEnded = workflow && workflow.time && workflow.time.end;
        this.time.start = this.time.end = null;

        if (this.isEnded) {
          this.stopTimer();
          this.time.start = this.formatTime(workflow.time.start);
          this.time.duration = this.formatDuration(workflow.time.end - workflow.time.start - pauses);
          this.time.end = this.formatTime(workflow.time.end);
          this.time.pauses = this.formatDuration(pauses);
        } else if (isPaused) {
          this.time.start = this.formatTime(workflow.time.start);
          this.time.duration = this.formatDuration(workflow.time.pause.since - workflow.time.start - pauses);
          this.time.storyDuration = this.formatDuration(workflow.time.pause.since - workflow.time.story - storyPause);

          this.stopTimer();
        } else if (isStarted) {
          this.time.start = this.formatTime(workflow.time.start);
          this.time.duration = this.formatDuration(now - workflow.time.start - pauses);
          this.time.storyDuration = this.formatDuration(now - workflow.time.story - storyPause);

          this.startTimer(workflow.time.start, workflow.time.story, pauses, storyPause);
        }
      });
    }
  }

  private formatDuration(duration: number) {
    const momentDuration = moment.duration(duration);
    const hours = momentDuration.get('hours');
    const minutes = ('00' + momentDuration.get('minutes')).slice(-2);
    const seconds = ('00' + momentDuration.get('seconds')).slice(-2);
    let result = minutes + 'm' + seconds + 's';

    if (hours) {
      result = hours + 'h' + result;
    }

    return result;
  }

  private formatTime(time: number) {
    const date = new Date(time);

    return ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2)
  }

  private startTimer(start: number, storyStart: number, pauses: number, storyPause: number) {
    this.stopTimer();

    this.timer = Observable.timer(0, 1000).subscribe(timer => {
      const now = new Date().getTime();

      this.time.duration = this.formatDuration(now - start - pauses);
      this.time.storyDuration = this.formatDuration(now - storyStart - storyPause);
    });
  }

  private stopTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
}
