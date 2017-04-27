define(['exports', 'aurelia-logging', './i18n', 'aurelia-templating-resources', 'aurelia-binding', './utils'], function (exports, _aureliaLogging, _i18n, _aureliaTemplatingResources, _aureliaBinding, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DfBindingBehavior = exports.DfValueConverter = undefined;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  

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

      if (typeof value === 'string' && isNaN(value) && !(0, _utils.isInteger)(value)) {
        value = new Date(value);
      }

      return df.format(value);
    };

    return DfValueConverter;
  }();

  var DfBindingBehavior = exports.DfBindingBehavior = function () {
    DfBindingBehavior.inject = function inject() {
      return [_aureliaTemplatingResources.SignalBindingBehavior];
    };

    function DfBindingBehavior(signalBindingBehavior) {
      

      this.signalBindingBehavior = signalBindingBehavior;
    }

    DfBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

      var sourceExpression = binding.sourceExpression;

      if (sourceExpression.rewritten) {
        return;
      }
      sourceExpression.rewritten = true;

      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'df', sourceExpression.args, [expression].concat(sourceExpression.args));
    };

    DfBindingBehavior.prototype.unbind = function unbind(binding, source) {
      this.signalBindingBehavior.unbind(binding, source);
    };

    return DfBindingBehavior;
  }();
});