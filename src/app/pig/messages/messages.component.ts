import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { IMessage } from '../../core/entities';
import { PigService } from '../pig.service';

@Component({
  selector: 'pig-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  @Input() set boardKey(value: string) {
    this._boardKey = value;
    this.retrieveMessages();
  };

  @Input() set dateCreated(value: number) {
    this._dateCreated = value;
    this.retrieveMessages();
  };

  messages$: Observable<IMessage[]>;

  private _boardKey: string;
  private _dateCreated: number;

  constructor(private pigService: PigService) { }

  retrieveMessages() {
    if (this._boardKey && this._dateCreated) {
      this.messages$ = this.pigService.retrieveAllMessages$(this._boardKey, this._dateCreated);
    }
  }
}
