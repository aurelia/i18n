'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RtValueConverter = undefined;

var _relativeTime = require('./relativeTime');



var RtValueConverter = exports.RtValueConverter = function () {
  RtValueConverter.inject = function inject() {
    return [_relativeTime.RelativeTime];
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