'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RtValueConverter = undefined;

var _relativeTime = require('./relativeTime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RtValueConverter = exports.RtValueConverter = function () {
  RtValueConverter.inject = function inject() {
    return [_relativeTime.RelativeTime];
  };

  function RtValueConverter(relativeTime) {
    _classCallCheck(this, RtValueConverter);

    this.service = relativeTime;
  }

  RtValueConverter.prototype.toView = function toView(value) {
    return this.service.getRelativeTime(value);
  };

  return RtValueConverter;
}();