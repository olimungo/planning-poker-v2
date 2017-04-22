import { Component, Input } from '@angular/core';

import { PigService } from '../pig.service';

@Component({
  selector: 'pig-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
  }

  private _boardKey: string;

  constructor(private pigService: PigService) { }

  setResultForStory(label: string) {
    this.pigService.setResultForStory(this._boardKey, label);
  }
}
