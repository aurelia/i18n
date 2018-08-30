import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";

export class TBindingBehavior {
  public static inject = [SignalBindingBehavior];

  constructor(private signalBindingBehavior: SignalBindingBehavior) { }

  public bind(binding: any, source: any) {
    // bind the signal behavior
    (this.signalBindingBehavior.bind as any)(binding, source, "aurelia-translation-signal");
    // rewrite the expression to use the TValueConverter.
    // pass through any args to the binding behavior to the TValueConverter
    const sourceExpression = binding.sourceExpression;
    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;
    const expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression, "t", sourceExpression.args, [expression, ...sourceExpression.args]
    );
  }

  public unbind(binding: any, source: any) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }

}
