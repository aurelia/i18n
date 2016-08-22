'use strict';

System.register(['aurelia-logging', './i18n', 'aurelia-templating-resources', 'aurelia-binding'], function (_export, _context) {
  "use strict";

  var LogManager, I18N, SignalBindingBehavior, ValueConverter, NfValueConverter, NfBindingBehavior;

  

  return {
    setters: [function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaTemplatingResources) {
      SignalBindingBehavior = _aureliaTemplatingResources.SignalBindingBehavior;
    }, function (_aureliaBinding) {
      ValueConverter = _aureliaBinding.ValueConverter;
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

      _export('NfBindingBehavior', NfBindingBehavior = function () {
        NfBindingBehavior.inject = function inject() {
          return [SignalBindingBehavior];
        };

        function NfBindingBehavior(signalBindingBehavior) {
          

          this.signalBindingBehavior = signalBindingBehavior;
        }

        NfBindingBehavior.prototype.bind = function bind(binding, source) {
          this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

          var sourceExpression = binding.sourceExpression;

          if (sourceExpression.rewritten) {
            return;
          }
          sourceExpression.rewritten = true;

          var expression = sourceExpression.expression;
          sourceExpression.expression = new ValueConverter(expression, 'nf', sourceExpression.args, [expression].concat(sourceExpression.args));
        };

        NfBindingBehavior.prototype.unbind = function unbind(binding, source) {
          this.signalBindingBehavior.unbind(binding, source);
        };

        return NfBindingBehavior;
      }());

      _export('NfBindingBehavior', NfBindingBehavior);
    }
  };
});