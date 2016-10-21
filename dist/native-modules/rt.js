

import { RelativeTime } from './relativeTime';

export var RtValueConverter = function () {
  RtValueConverter.inject = function inject() {
    return [RelativeTime];
  };

  function RtValueConverter(relativeTime) {
    

    this.service = relativeTime;
  }

  RtValueConverter.prototype.toView = function toView(value) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  };

  return RtValueConverter;
}();