import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { QRCodeModule } from 'ng-qrcode';

import { routing, appRoutingProviders } from './board.routing';

import { BoardComponent } from './/board.component';
import { RegistrationComponent } from './registration/registration.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { VotesComponent } from './votes/votes.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    QRCodeModule,
    routing
  ],
  exports: [
    BoardComponent
  ],
  declarations: [
    BoardComponent,
    RegistrationComponent,
    DiscussionComponent,
    VotesComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class BoardModule { }
