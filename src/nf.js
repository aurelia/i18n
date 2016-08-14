import * as LogManager from 'aurelia-logging';
import {I18N} from './i18n';
import { SignalBindingBehavior } from 'aurelia-templating-resources';
import { ValueConverter } from 'aurelia-binding';

export class NfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, nfOrOptions, locale, nf) {
    if (value === null
      || typeof value === 'undefined'
      || (typeof value === 'string' && value.trim() === '')
      ) {
      return value;
    }

    if (nfOrOptions && (typeof nfOrOptions.format === 'function')) {
      return nfOrOptions.format(value);
    } else if (nf) {
      let i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
    } else {
      nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
    }

    return nf.format(value);
  }
}

export class NfBindingBehavior {
  static inject() {return [SignalBindingBehavior];}

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    // bind the signal behavior
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    // rewrite the expression to use the TValueConverter.
    // pass through any args to the binding behavior to the TValueConverter
    let sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      'nf',
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
