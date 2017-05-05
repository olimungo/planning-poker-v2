import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';

import {
  CoreHeaderComponent, CoreSubHeaderComponent, CorePigComponent, CorePigsListComponent,
  StoryComponent, TimeComponent, PauseComponent
} from '.';
import { CoreHeaderModalComponent } from './header/modal/modal.component';
import { CorePigsListModalComponent } from './pigs-list/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdDialogModule
  ],
  exports: [
    CoreHeaderComponent,
    CoreSubHeaderComponent,
    CorePigComponent,
    CorePigsListComponent,
    StoryComponent,
    TimeComponent,
    PauseComponent
  ],
  declarations: [
    CoreHeaderComponent,
    CoreSubHeaderComponent,
    CorePigComponent,
    CorePigsListComponent,
    CoreHeaderModalComponent,
    CorePigsListModalComponent,
    StoryComponent,
    TimeComponent,
    PauseComponent
  ],
  entryComponents: [
    CoreHeaderModalComponent,
    CorePigsListModalComponent
  ]
})
export class SharedModule { }

