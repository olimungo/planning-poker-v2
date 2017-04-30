import { Component, Input } from '@angular/core';

import { CoreService } from '../../../core.service';

@Component({
  selector: 'core-workflow-overview-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  }

  story: number;
  round: number;

  private _boardKey: string;

  constructor(private coreService: CoreService) { }

  setWatchers() {
    if (this._boardKey) {
      this.coreService.retrieveStep$(this._boardKey).subscribe(step => {
        this.story = step.story;
        this.round = step.round;
      });
    }
  }
}
