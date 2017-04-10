import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';

import { CoreGridComponent } from './grid/grid.component';
import { PigsListComponent } from './pigs-list/pigs-list.component';
import { PigComponent } from './pigs-list/pig/pig.component';
import { ModalComponent } from './pigs-list/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdDialogModule
  ],
  exports: [
    CoreGridComponent,
    PigsListComponent
  ],
  declarations: [
    CoreGridComponent,
    PigsListComponent,
    PigComponent,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class CoreModule { }
