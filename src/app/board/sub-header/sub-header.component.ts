import { Component, Input } from '@angular/core';

import { EStatus } from '../../core/entities';
import { BoardService } from '../board.service';

@Component({
  selector: 'board-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.setWatchers();
  }

  EStatus = EStatus;
  status: number;

  private _boardKey = '';

  constructor(private boardService: BoardService) { }

  // To prevent streams to be subscribed many times in the HTML template
  setWatchers() {
    this.boardService.retrieveStatus$(this._boardKey).subscribe((status: number) => {
      this.status = status;
    });
  }
}
