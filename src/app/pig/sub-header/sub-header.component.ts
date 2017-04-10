import { Component, Input } from '@angular/core';

import { EStatus } from '../../core/entities';
import { PigService } from '../pig.service';

@Component({
  selector: 'pig-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  };

  @Input() set pigKey(value: string) {
    this._pigKey = value;
    this.setWatchers();
  };

  EStatus = EStatus;
  status: number;
  scrumMasterKey: string;
  hasVoted: boolean;

  private _boardKey: string;
  private _pigKey: string;

  constructor(private pigService: PigService) { }

  // To prevent streams to be subscribed many times in the HTML template
  setWatchers() {
    if (this._boardKey && this._pigKey) {
      this.pigService.retrieveStatus$(this._boardKey).subscribe((status: number) => {
        this.status = status;
      });

      this.pigService.retrieveScrumMaster$(this._boardKey).subscribe((scrumMasterKey: string) => {
        this.scrumMasterKey = scrumMasterKey;
      });

      this.pigService.retrieveHasVoted$(this._boardKey, this._pigKey).subscribe((hasVoted: boolean) => {
        this.hasVoted = hasVoted;
      });
    }
  }

  toggleScrumMaster() {
    this.pigService.toggleScrumMaster(this._boardKey, this._pigKey);
  }

  setStatus(status: EStatus) {
    this.pigService.setStatus(this._boardKey, status);
  }
}
