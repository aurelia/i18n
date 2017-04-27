'use strict';

System.register(['aurelia-logging', './i18n', 'aurelia-templating-resources', 'aurelia-binding', './utils'], function (_export, _context) {
  "use strict";

  var LogManager, I18N, SignalBindingBehavior, ValueConverter, isInteger, DfValueConverter, DfBindingBehavior;

  

  return {
    setters: [function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaTemplatingResources) {
      SignalBindingBehavior = _aureliaTemplatingResources.SignalBindingBehavior;
    }, function (_aureliaBinding) {
      ValueConverter = _aureliaBinding.ValueConverter;
    }, function (_utils) {
      isInteger = _utils.isInteger;
    }],
    execute: function () {
      _export('DfValueConverter', DfValueConverter = function () {
        DfValueConverter.inject = function inject() {
          return [I18N];
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

          if (typeof value === 'string' && isNaN(value) && !isInteger(value)) {
            value = new Date(value);
          }

          return df.format(value);
        };

        return DfValueConverter;
      }());

      _export('DfValueConverter', DfValueConverter);

      _export('DfBindingBehavior', DfBindingBehavior = function () {
        DfBindingBehavior.inject = function inject() {
          return [SignalBindingBehavior];
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
          sourceExpression.expression = new ValueConverter(expression, 'df', sourceExpression.args, [expression].concat(sourceExpression.args));
        };

        DfBindingBehavior.prototype.unbind = function unbind(binding, source) {
          this.signalBindingBehavior.unbind(binding, source);
        };

        return DfBindingBehavior;
      }());

      _export('DfBindingBehavior', DfBindingBehavior);
    }
  };
});