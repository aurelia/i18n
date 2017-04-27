import * as LogManager from 'aurelia-logging';
import { I18N } from './i18n';
import { SignalBindingBehavior } from 'aurelia-templating-resources';
import { ValueConverter } from 'aurelia-binding';
import { isInteger } from './utils';

export let DfValueConverter = class DfValueConverter {
  static inject() {
    return [I18N];
  }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, dfOrOptions, locale, df) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (dfOrOptions && typeof dfOrOptions.format === 'function') {
      return dfOrOptions.format(value);
    } else if (df) {
      let i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]');
    } else {
      df = this.service.df(dfOrOptions, locale || this.service.getLocale());
    }

    if (typeof value === 'string' && isNaN(value) && !isInteger(value)) {
      value = new Date(value);
    }

    return df.format(value);
  }
};

export let DfBindingBehavior = class DfBindingBehavior {
  static inject() {
    return [SignalBindingBehavior];
  }

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    let sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(expression, 'df', sourceExpression.args, [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  }
};