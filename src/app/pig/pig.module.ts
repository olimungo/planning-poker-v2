import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { routing, appRoutingProviders } from './pig.routing';

import { PigComponent } from './pig.component';
import { RegistrationComponent } from './registration/registration.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { EndComponent } from './end/end.component';
import { VoteComponent } from './vote/vote.component';
import { WaitEndOfVotesComponent } from './wait-end-of-votes/wait-end-of-votes.component';
import { CardComponent } from './vote/card/card.component';

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
    RegistrationComponent,
    DiscussionComponent,
    EndComponent,
    VoteComponent,
    WaitEndOfVotesComponent,
    CardComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class PigModule { }
