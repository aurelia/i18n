import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";
var TBindingBehavior = /** @class */ (function () {
    function TBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    TBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
        // rewrite the expression to use the TValueConverter.
        // pass through any args to the binding behavior to the TValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new ValueConverter(expression, "t", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    TBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    TBindingBehavior.inject = [SignalBindingBehavior];
    return TBindingBehavior;
}());
export { TBindingBehavior };
//# sourceMappingURL=t-binding-behavior.js.map