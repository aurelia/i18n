'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _i18n = require('./i18n');

var NfValueConverter = (function () {
  _createClass(NfValueConverter, null, [{
    key: 'inject',
    value: function inject() {
      return [_i18n.I18N];
    }
  }]);

  function NfValueConverter(i18n) {
    _classCallCheck(this, NfValueConverter);

    this.service = i18n;
  }

  _createClass(NfValueConverter, [{
    key: 'toView',
    value: function toView(value, formatOptions, locale, numberFormat) {
      var nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());

      return nf.format(value);
    }
  }]);

  return NfValueConverter;
})();

exports.NfValueConverter = NfValueConverter;