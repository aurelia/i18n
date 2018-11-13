import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter, bindingBehavior } from "aurelia-binding";

@bindingBehavior("rt")
export class RtBindingBehavior {
  public static inject() { return [SignalBindingBehavior]; }

  constructor(private signalBindingBehavior: SignalBindingBehavior) { }

  public bind(binding: any, source: any) {
    // bind the signal behavior
    (this.signalBindingBehavior.bind as any)(
      binding, source, "aurelia-translation-signal", "aurelia-relativetime-signal"
    );
    // rewrite the expression to use the RtValueConverter.
    // pass through any args to the binding behavior to the RtValueConverter
    const sourceExpression = binding.sourceExpression;
    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;
    const expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression, "rt", sourceExpression.args, [expression, ...sourceExpression.args]
    );
  }

  public unbind(binding: any, source: any) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
