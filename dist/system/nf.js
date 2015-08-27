System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n'], function (_export) {
  var _createClass, _classCallCheck, I18N, NfValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }],
    execute: function () {
      'use strict';

      NfValueConverter = (function () {
        _createClass(NfValueConverter, null, [{
          key: 'inject',
          value: function inject() {
            return [I18N];
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

      _export('NfValueConverter', NfValueConverter);
    }
  };
});