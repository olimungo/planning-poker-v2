import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { CoreGridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CoreGridComponent
  ],
  declarations: [
    CoreGridComponent
  ]
})
export class CoreModule { }
