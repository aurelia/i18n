'use strict';

System.register(['aurelia-logging', './i18n'], function (_export, _context) {
  "use strict";

  var LogManager, I18N, NfValueConverter;

  

  return {
    setters: [function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }],
    execute: function () {
      _export('NfValueConverter', NfValueConverter = function () {
        NfValueConverter.inject = function inject() {
          return [I18N];
        };

        function NfValueConverter(i18n) {
          

          this.service = i18n;
        }

        NfValueConverter.prototype.toView = function toView(value, nfOrOptions, locale, nf) {
          if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
            return value;
          }

          if (nfOrOptions && typeof nfOrOptions.format === 'function') {
            return nfOrOptions.format(value);
          } else if (nf) {
            var i18nLogger = LogManager.getLogger('i18n');
            i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
          } else {
            nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
          }

          return nf.format(value);
        };

        return NfValueConverter;
      }());

      _export('NfValueConverter', NfValueConverter);
    }
  };
});