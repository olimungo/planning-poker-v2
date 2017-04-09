import { Component, OnInit } from '@angular/core';

import { BoardService } from '../board.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'board-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  url = '';

  constructor(private boardService: BoardService) {
    this.url = environment.backEndUrl + 'pig/' + this.boardService.getNewBoardId();
  }

  ngOnInit() {
  }

  test() {
    window.open(this.url);
    // this.boardService.register();
  }
}
