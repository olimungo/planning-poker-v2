import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { QRCodeModule } from 'ng-qrcode';
import { CoreModule } from '../core/core.module';

import { routing, appRoutingProviders } from './board.routing';

import { BoardComponent } from './board.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';

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
    RegistrationComponent,
    HeaderComponent,
    SubHeaderComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class BoardModule { }
