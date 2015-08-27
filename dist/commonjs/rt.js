'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _relativeTime = require('./relativeTime');

var RtValueConverter = (function () {
  _createClass(RtValueConverter, null, [{
    key: 'inject',
    value: function inject() {
      return [_relativeTime.RelativeTime];
    }
  }]);

  function RtValueConverter(relativeTime) {
    _classCallCheck(this, RtValueConverter);

    this.service = relativeTime;
  }

  _createClass(RtValueConverter, [{
    key: 'toView',
    value: function toView(value) {
      return this.service.getRelativeTime(value);
    }
  }]);

  return RtValueConverter;
})();

exports.RtValueConverter = RtValueConverter;