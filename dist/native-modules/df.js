

import * as LogManager from 'aurelia-logging';
import { I18N } from './i18n';
import { SignalBindingBehavior } from 'aurelia-templating-resources';
import { ValueConverter } from 'aurelia-binding';

export var DfValueConverter = function () {
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

    return df.format(value);
  };

  return DfValueConverter;
}();

export var DfBindingBehavior = function () {
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
}();