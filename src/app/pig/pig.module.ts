import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '../core/core.module';

import { routing, appRoutingProviders } from './pig.routing';

import { PigComponent } from './pig.component';
import { CardsDeckComponent } from './cards-deck/cards-deck.component';
import { CardComponent } from './cards-deck/card/card.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule,
    CoreModule,
    routing
  ],
  exports: [
    PigComponent
  ],
  declarations: [
    PigComponent,
    CardsDeckComponent,
    CardComponent,
    ResultComponent,
  ],
  providers: [
    appRoutingProviders
  ]
})
export class PigModule { }
