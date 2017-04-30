import { Component, Input } from '@angular/core';

import { BoardService } from '../board.service';

@Component({
  selector: 'board-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.css']
})
export class FinalResultsComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveFinalResults();
  }

  results: string[];

  private _boardKey: string;

  constructor(private boarService: BoardService) {
  }

  retrieveFinalResults() {
    this.boarService.retrieveFinalResult$(this._boardKey).take(1).subscribe(results => {
      this.results = results;
    });
  }

  mail() {
    const subject = 'Planning poker estimations';
    const message = this.results.reduce((previous, current, index) => {
      return previous + 'Story ' + (index + 1) + ': ' + current + '\n';
    }, '');

    window.open('mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message));
  }
}
