import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { routing, appRoutingProviders } from './pig.routing';

import { PigComponent } from './pig.component';
import { CardsDeckComponent } from './cards-deck/cards-deck.component';
import { CardComponent } from './cards-deck/card/card.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdDialogModule,
    SharedModule,
    routing
  ],
  exports: [
    PigComponent
  ],
  declarations: [
    PigComponent,
    CardsDeckComponent,
    CardComponent,
    ResultsComponent,
  ],
  providers: [
    appRoutingProviders
  ]
})
export class PigModule { }
