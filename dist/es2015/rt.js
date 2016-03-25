import { RelativeTime } from './relativeTime';

export let RtValueConverter = class RtValueConverter {
  static inject() {
    return [RelativeTime];
  }
  constructor(relativeTime) {
    this.service = relativeTime;
  }

  toView(value) {
    return this.service.getRelativeTime(value);
  }
};