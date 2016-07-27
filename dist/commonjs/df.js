'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DfValueConverter = undefined;

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _i18n = require('./i18n');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



var DfValueConverter = exports.DfValueConverter = function () {
  DfValueConverter.inject = function inject() {
    return [_i18n.I18N];
  };

  function DfValueConverter(i18n) {
    

    this.service = i18n;
  }

  DfValueConverter.prototype.toView = function toView(value, dfOrOptions, locale, df) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (dfOrOptions && typeof dfOrOptions.format === 'function') {
      return dfOrOptions.format(value);
    } else if (df) {
      var i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]');
    } else {
      df = this.service.df(dfOrOptions, locale || this.service.getLocale());
    }

    return df.format(value);
  };

  return DfValueConverter;
}();