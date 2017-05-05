import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { IPig } from '../../core';
import { CorePigsListModalComponent } from './modal/modal.component';

@Component({
  selector: 'core-pigs-list',
  templateUrl: './pigs-list.component.html',
  styleUrls: ['./pigs-list.component.css']
})
export class CorePigsListComponent {
  @Input() pigs: IPig[];
  @Input() allowToDeactivate = false;

  @Output() deactivate = new EventEmitter<string>();

  selectedOption: string;

  constructor(public dialog: MdDialog) { }

  openDialog(pig: IPig) {
    if (this.allowToDeactivate) {
      const dialogRef = this.dialog.open(CorePigsListModalComponent, { data: { name: pig.name } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deactivate.emit(pig.key);
        }
      });
    }
  }
}
