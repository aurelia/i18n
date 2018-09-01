System.register(["aurelia-templating-resources", "aurelia-binding"], function (exports_1, context_1) {
    "use strict";
    var aurelia_templating_resources_1, aurelia_binding_1, RtBindingBehavior;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_resources_1_1) {
                aurelia_templating_resources_1 = aurelia_templating_resources_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            }
        ],
        execute: function () {
            RtBindingBehavior = /** @class */ (function () {
                function RtBindingBehavior(signalBindingBehavior) {
                    this.signalBindingBehavior = signalBindingBehavior;
                }
                RtBindingBehavior.inject = function () { return [aurelia_templating_resources_1.SignalBindingBehavior]; };
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
                    sourceExpression.expression = new aurelia_binding_1.ValueConverter(expression, "rt", sourceExpression.args, [expression].concat(sourceExpression.args));
                };
                RtBindingBehavior.prototype.unbind = function (binding, source) {
                    // unbind the signal behavior
                    this.signalBindingBehavior.unbind(binding, source);
                };
                return RtBindingBehavior;
            }());
            exports_1("RtBindingBehavior", RtBindingBehavior);
        }
    };
});
//# sourceMappingURL=rt-binding-behavior.js.map