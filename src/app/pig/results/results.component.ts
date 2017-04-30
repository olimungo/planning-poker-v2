import { Component, Input } from '@angular/core';

import { PigService } from '../pig.service';

@Component({
  selector: 'pig-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
  }

  private _boardKey: string;

  constructor(private pigService: PigService) { }

  setResultForStory(label: string) {
    this.pigService.setResultForStory(this._boardKey, label);
  }
}
