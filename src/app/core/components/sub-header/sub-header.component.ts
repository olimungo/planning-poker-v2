import { Component, Input } from '@angular/core';

import { EState } from '../../entities/state/state.enum';
import { CoreService } from '../../core.service';

@Component({
  selector: 'core-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class CoreSubHeaderComponent {
  @Input() useAccentColor = false;
  @Input() displayScrumMaster = false;

  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  };

  @Input() set pigKey(value: string) {
    this._pigKey = value;
    this.setWatchers();
  };

  EState = EState;
  state: number;
  scrumMasterKey: string;
  hasVoted: boolean;

  _boardKey: string;
  _pigKey: string;

  constructor(private coreService: CoreService) { }

  // To prevent streams to be subscribed many times in the HTML template
  setWatchers() {
    if (this._boardKey && (this._pigKey || !this.displayScrumMaster)) {
      this.coreService.retrieveState$(this._boardKey).subscribe((state: number) => {
        this.state = state;
      });

      this.coreService.retrieveScrumMaster$(this._boardKey).subscribe((scrumMasterKey: string) => {
        this.scrumMasterKey = scrumMasterKey;
      });

      if (this._pigKey) {
        this.coreService.retrieveHasVoted$(this._boardKey, this._pigKey).subscribe((hasVoted: boolean) => {
          this.hasVoted = hasVoted;
        });
      }
    }
  }

  toggleScrumMaster() {
    this.coreService.toggleScrumMaster(this._boardKey, this._pigKey);
  }

  setState(state: EState) {
    this.coreService.setState(this._boardKey, state);
  }
}
