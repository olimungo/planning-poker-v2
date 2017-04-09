import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardService {
  constructor(private af: AngularFire) { }

  getNewBoardId(): string {
    return this.af.database.list('boards').$ref.ref.push().key;
  }

  register() {
    console.log('XXXXX');
    this.af.database.list('/boards').subscribe((result: any[]) => {
      console.log(result);
    });

    // const userKey = this.af.database.list('boards/666/users/10').$ref.ref.push().key;

    // console.log(userKey);

    // item.subscribe((result: any[]) => {
    //   console.log(result);
    // });

    //item.update({ name: 'Oli' });
  }
}
