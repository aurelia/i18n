'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NfValueConverter = undefined;

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _i18n = require('./i18n');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



var NfValueConverter = exports.NfValueConverter = function () {
  NfValueConverter.inject = function inject() {
    return [_i18n.I18N];
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
}();