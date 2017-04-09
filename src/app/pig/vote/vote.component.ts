import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pig-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  @Output() voted: EventEmitter<string> = new EventEmitter();

  cards = [ '?', '0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'INF', 'K' ];

  constructor() { }

  ngOnInit() {
  }

  vote(label: string) {
    this.voted.emit(label);
  }
}
