import { RelativeTime } from './relativeTime';
import { SignalBindingBehavior } from 'aurelia-templating-resources';
import { ValueConverter } from 'aurelia-binding';

export let RtValueConverter = class RtValueConverter {
  static inject() {
    return [RelativeTime];
  }
  constructor(relativeTime) {
    this.service = relativeTime;
  }

  toView(value) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  }
};

export let RtBindingBehavior = class RtBindingBehavior {
  static inject() {
    return [SignalBindingBehavior];
  }

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal', 'aurelia-relativetime-signal');

    let sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(expression, 'rt', sourceExpression.args, [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  }
};