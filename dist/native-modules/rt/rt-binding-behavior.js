import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";
var RtBindingBehavior = /** @class */ (function () {
    function RtBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    RtBindingBehavior.inject = function () { return [SignalBindingBehavior]; };
    RtBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal", "aurelia-relativetime-signal");
        // rewrite the expression to use the RtValueConverter.
        // pass through any args to the binding behavior to the RtValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new ValueConverter(expression, "rt", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    RtBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    return RtBindingBehavior;
}());
export { RtBindingBehavior };
//# sourceMappingURL=rt-binding-behavior.js.map