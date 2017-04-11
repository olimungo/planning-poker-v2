import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { IPig } from '../entities/pig.interface';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'core-pigs-list',
  templateUrl: './pigs-list.component.html',
  styleUrls: ['./pigs-list.component.css']
})
export class PigsListComponent {
  @Input() pigs: IPig[];
  @Input() allowToDeactivate = false;

  @Output() deactivate = new EventEmitter<string>();

  selectedOption: string;

  constructor(public dialog: MdDialog) { }

  openDialog(pig: IPig) {
    if (this.allowToDeactivate) {
      const dialogRef = this.dialog.open(ModalComponent, { data: { name: pig.name } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deactivate.emit(pig.key);
        }
      });
    }
  }
}
