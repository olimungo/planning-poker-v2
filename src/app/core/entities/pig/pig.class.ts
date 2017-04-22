import { IPig } from './pig.interface';

export class Pig implements IPig {
  key: string = null;
  name: string = null;
  badge: string = null;
  email: string = null;
  hasVoted: boolean = null;
  isActive: boolean = null;
  dateCreated: number = null;

  constructor(source?: any) {
    this.setProps(source);
  }

  setProps(source?: any) {
    for (const prop of Object.keys(source)) {
      if (this[prop] !== undefined) {
        this[prop] = source[prop];
      }
    }

    if (source.$key) {
      this.key = source.$key;
    }
  }
}
