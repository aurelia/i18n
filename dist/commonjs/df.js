'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _i18n = require('./i18n');

var DfValueConverter = (function () {
  _createClass(DfValueConverter, null, [{
    key: 'inject',
    value: function inject() {
      return [_i18n.I18N];
    }
  }]);

  function DfValueConverter(i18n) {
    _classCallCheck(this, DfValueConverter);

    this.service = i18n;
  }

  _createClass(DfValueConverter, [{
    key: 'toView',
    value: function toView(value, formatOptions, locale, dateFormat) {
      var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());

      return df.format(value);
    }
  }]);

  return DfValueConverter;
})();

exports.DfValueConverter = DfValueConverter;