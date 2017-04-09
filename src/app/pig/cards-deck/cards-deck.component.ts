import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pig-cards-deck',
  templateUrl: './cards-deck.component.html',
  styleUrls: ['./cards-deck.component.css']
})
export class CardsDeckComponent {
  @Output() choose: EventEmitter<string> = new EventEmitter();

  cards = [ '?', '0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'INF', 'K' ];

  chosen(label: string) {
    this.choose.emit(label);
  }
}
