import { Component, Input, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { IPig } from '../../../entities/pig/pig.interface';

@Component({
  selector: 'core-header-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class CoreHeaderModalComponent {
  name: string;
  email: string;

  constructor(public dialogRef: MdDialogRef<CoreHeaderModalComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
    } else {
      this.name = this.email = null;
    }
  }

  save() {
    this.dialogRef.close({ name: this.name, email: this.email });
  }
}
