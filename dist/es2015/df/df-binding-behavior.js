import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";
var DfBindingBehavior = /** @class */ (function () {
    function DfBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    DfBindingBehavior.inject = function () { return [SignalBindingBehavior]; };
    DfBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
        // rewrite the expression to use the DfValueConverter.
        // pass through any args to the binding behavior to the DfValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new ValueConverter(expression, "df", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    DfBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    return DfBindingBehavior;
}());
export { DfBindingBehavior };
//# sourceMappingURL=df-binding-behavior.js.map