import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BoardModule } from './board/board.module';
import { PigModule } from './pig/pig.module';

const CONFIG = {
    apiKey: 'AIzaSyB4qBbnvfmmv1nG-xoRHGynotrcWpHjZQo',
    authDomain: 'planningpoker-b35a7.firebaseapp.com',
    databaseURL: 'https://planningpoker-b35a7.firebaseio.com',
    projectId: 'planningpoker-b35a7',
    storageBucket: 'planningpoker-b35a7.appspot.com',
    messagingSenderId: '535709204855'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(CONFIG),
    routing,
    CoreModule,
    BoardModule,
    PigModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
