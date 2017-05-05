import { Component, Input, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'core-pigs-list-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class CorePigsListModalComponent {
  constructor(public dialogRef: MdDialogRef<CorePigsListModalComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

  deactivate() {
    this.dialogRef.close(true);
  }
}
