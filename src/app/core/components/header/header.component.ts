import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { CoreHeaderModalComponent } from '..';
import { CoreService } from '../../core.service';

import { IPig } from '../../entities';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class CoreHeaderComponent {
  @Input() useAccentColor = false;
  @Input() displayAvatar = false;

  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  }

  @Input() set pigKey(value: string) {
    this._pigKey = value;
    this.setWatchers();
  }

  pig: IPig;
  story: number;
  round: number;

  private _boardKey: string;
  private _pigKey: string;

  constructor(public dialog: MdDialog, private coreService: CoreService) { }

  openDialog() {
    if (this.pig) {
      const name = this.pig.name;
      const email = this.pig.email;

      const dialogRef = this.dialog.open(CoreHeaderModalComponent, { data: { name: name, email: email } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.coreService.updatePig(this._boardKey, this._pigKey, result.name, result.email);
        }
      });
    }
  }

  setWatchers() {
    if (this._boardKey && (this._pigKey || !this.displayAvatar)) {
      this.coreService.retrieveStoryAndRound$(this._boardKey).subscribe(result => {
        this.story = result.story;
        this.round = result.round;
      });

      if (this._pigKey) {
        this.coreService.retrievePig$(this._boardKey, this._pigKey).subscribe(pig => {
          this.pig = pig;
        });
      }
    }
  }
}

