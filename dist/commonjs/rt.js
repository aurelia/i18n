'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _relativeTime = require('./relativeTime');

var RtValueConverter = (function () {
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
})();

exports.RtValueConverter = RtValueConverter;