System.register(['./i18n'], function (_export) {
  'use strict';

  var I18N, NfValueConverter;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }],
    execute: function () {
      NfValueConverter = (function () {
        NfValueConverter.inject = function inject() {
          return [I18N];
        };

        function NfValueConverter(i18n) {
          _classCallCheck(this, NfValueConverter);

          this.service = i18n;
        }

        NfValueConverter.prototype.toView = function toView(value, formatOptions, locale, numberFormat) {
          var nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());

          return nf.format(value);
        };

        return NfValueConverter;
      })();

      _export('NfValueConverter', NfValueConverter);
    }
  };
});