define(['exports', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n'], function (exports, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _i18n) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var NfValueConverter = (function () {
    (0, _babelRuntimeHelpersCreateClass['default'])(NfValueConverter, null, [{
      key: 'inject',
      value: function inject() {
        return [_i18n.I18N];
      }
    }]);

    function NfValueConverter(i18n) {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, NfValueConverter);

      this.service = i18n;
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(NfValueConverter, [{
      key: 'toView',
      value: function toView(value, formatOptions, locale, numberFormat) {
        var nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());

        return nf.format(value);
      }
    }]);
    return NfValueConverter;
  })();

  exports.NfValueConverter = NfValueConverter;
});