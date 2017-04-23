import { Component, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'core-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class CorePigComponent {
  @Input() useAccentColor = false;
  @Input() displayName = true;
  @Input() name: string;
  @Input() badge: string;
  @Input() hasRequestedPause = false;

  @Input() set email(value: string) {
    this.gravatarUrl = null;

    if (value) {
      this.gravatarUrl = 'https://www.gravatar.com/avatar/' + new Md5().appendStr(value).end();
    }
  }

  gravatarUrl: string;

  constructor() {
    this.email = 'olivier@mungo.eu';
  }
}
