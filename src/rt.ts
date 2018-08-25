import { RelativeTime } from "./relativeTime";
import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";

export class RtValueConverter {
  static inject() { return [RelativeTime]; }
  constructor(private service: RelativeTime) {}

  toView(value: any) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
      ) {
      return value;
    }

    if (typeof value === "string" && isNaN(value as any) && !Number.isInteger(value as any)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  }
}

export class RtBindingBehavior {
  static inject() {return [SignalBindingBehavior]; }

  constructor(private signalBindingBehavior: SignalBindingBehavior) {}

  bind(binding: any, source: any) {
    // bind the signal behavior
    (this.signalBindingBehavior.bind as any)(binding, source, "aurelia-translation-signal", "aurelia-relativetime-signal");

    // rewrite the expression to use the RtValueConverter.
    // pass through any args to the binding behavior to the RtValueConverter
    let sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      "rt",
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding: any, source: any) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
