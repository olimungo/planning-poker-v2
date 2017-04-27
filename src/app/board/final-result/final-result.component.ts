import { Component, Input } from '@angular/core';

import { BoardService } from '../board.service';

@Component({
  selector: 'board-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css']
})
export class FinalResultComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveFinalResults();
  }

  results: string[];

  private _boardKey: string;

  constructor(private boarService: BoardService) { }

  retrieveFinalResults() {
    this.boarService.retrieveFinalResult$(this._boardKey).take(1).subscribe(results => {
      this.results = results;
    });
  }
}
