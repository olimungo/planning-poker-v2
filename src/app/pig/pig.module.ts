import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { routing, appRoutingProviders } from './pig.routing';

import { PigComponent } from './pig.component';
import { CardsDeckComponent } from './cards-deck/cards-deck.component';
import { CardComponent } from './cards-deck/card/card.component';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    routing
  ],
  exports: [
    PigComponent
  ],
  declarations: [
    PigComponent,
    CardsDeckComponent,
    CardComponent,
    HeaderComponent,
    SubHeaderComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class PigModule { }
