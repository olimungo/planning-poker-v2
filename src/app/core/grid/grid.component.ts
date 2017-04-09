import { Component, OnInit, Input } from '@angular/core';

import { ICoreGrid } from './grid';

@Component({
  selector: 'core-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class CoreGridComponent implements OnInit {
  @Input() grid: ICoreGrid;

  constructor() { }

  ngOnInit() {
  }

}
