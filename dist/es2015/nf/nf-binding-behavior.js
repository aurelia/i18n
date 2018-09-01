import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";
var NfBindingBehavior = /** @class */ (function () {
    function NfBindingBehavior(signalBindingBehavior) {
        this.signalBindingBehavior = signalBindingBehavior;
    }
    NfBindingBehavior.inject = function () { return [SignalBindingBehavior]; };
    NfBindingBehavior.prototype.bind = function (binding, source) {
        // bind the signal behavior
        this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
        // rewrite the expression to use the NfValueConverter.
        // pass through any args to the binding behavior to the NfValueConverter
        var sourceExpression = binding.sourceExpression;
        // do create the sourceExpression only once
        if (sourceExpression.rewritten) {
            return;
        }
        sourceExpression.rewritten = true;
        var expression = sourceExpression.expression;
        sourceExpression.expression = new ValueConverter(expression, "nf", sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    NfBindingBehavior.prototype.unbind = function (binding, source) {
        // unbind the signal behavior
        this.signalBindingBehavior.unbind(binding, source);
    };
    return NfBindingBehavior;
}());
export { NfBindingBehavior };
//# sourceMappingURL=nf-binding-behavior.js.map