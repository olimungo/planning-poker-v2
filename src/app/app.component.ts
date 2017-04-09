import { Component } from '@angular/core';

import { ICoreGrid } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  grid: ICoreGrid = {
    model: {
      headers: [ 'id', 'Type', 'Description' ]
    },
    data: {
      columns: []
    }
  };
}
