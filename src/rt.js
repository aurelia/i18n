import {RelativeTime} from './relativeTime';

export class RtValueConverter {
  static inject() { return [RelativeTime]; }
  constructor(relativeTime) {
    this.service = relativeTime;
  }

  toView(value) {
    if (value === null
      || typeof value === 'undefined'
      || (typeof value === 'string' && value.trim() === '')
      ) {
      return value;
    }

    if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  }
}
