System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n'], function (_export) {
  var _createClass, _classCallCheck, I18N, DfValueConverter;

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

      DfValueConverter = (function () {
        _createClass(DfValueConverter, null, [{
          key: 'inject',
          value: function inject() {
            return [I18N];
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

      _export('DfValueConverter', DfValueConverter);
    }
  };
});