System.register(['./i18n'], function (_export) {
  'use strict';

  var I18N, DfValueConverter;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }],
    execute: function () {
      DfValueConverter = (function () {
        DfValueConverter.inject = function inject() {
          return [I18N];
        };

        function DfValueConverter(i18n) {
          _classCallCheck(this, DfValueConverter);

          this.service = i18n;
        }

        DfValueConverter.prototype.toView = function toView(value, formatOptions, locale, dateFormat) {
          var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());

          return df.format(value);
        };

        return DfValueConverter;
      })();

      _export('DfValueConverter', DfValueConverter);
    }
  };
});