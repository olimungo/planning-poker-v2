import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { QRCodeModule } from 'angular2-qrcode';

import { CoreModule } from '../core/core.module';

import { routing, appRoutingProviders } from './board.routing';

import { BoardComponent } from './board.component';
import { ActivePigsListComponent } from './active-pigs-list/active-pigs-list.component';
import { VotedPigsListComponent } from './voted-pigs-list/voted-pigs-list.component';
import { VotingPigsListComponent } from './voting-pigs-list/voting-pigs-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultsComponent } from './results/results.component';
import { FinalResultsComponent } from './final-results/final-results.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    QRCodeModule,
    CoreModule,
    routing
  ],
  exports: [
    BoardComponent
  ],
  declarations: [
    BoardComponent,
    ActivePigsListComponent,
    VotedPigsListComponent,
    VotingPigsListComponent,
    RegistrationComponent,
    ResultsComponent,
    FinalResultsComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class BoardModule { }
