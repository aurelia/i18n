define(['exports', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n'], function (exports, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _i18n) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var DfValueConverter = (function () {
    (0, _babelRuntimeHelpersCreateClass['default'])(DfValueConverter, null, [{
      key: 'inject',
      value: function inject() {
        return [_i18n.I18N];
      }
    }]);

    function DfValueConverter(i18n) {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, DfValueConverter);

      this.service = i18n;
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(DfValueConverter, [{
      key: 'toView',
      value: function toView(value, formatOptions, locale, dateFormat) {
        var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());

        return df.format(value);
      }
    }]);
    return DfValueConverter;
  })();

  exports.DfValueConverter = DfValueConverter;
});