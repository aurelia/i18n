System.register(["aurelia-templating-resources", "aurelia-binding"], function (exports_1, context_1) {
    "use strict";
    var aurelia_templating_resources_1, aurelia_binding_1, TBindingBehavior;
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
            TBindingBehavior = /** @class */ (function () {
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
                    sourceExpression.expression = new aurelia_binding_1.ValueConverter(expression, "t", sourceExpression.args, [expression].concat(sourceExpression.args));
                };
                TBindingBehavior.prototype.unbind = function (binding, source) {
                    // unbind the signal behavior
                    this.signalBindingBehavior.unbind(binding, source);
                };
                TBindingBehavior.inject = [aurelia_templating_resources_1.SignalBindingBehavior];
                return TBindingBehavior;
            }());
            exports_1("TBindingBehavior", TBindingBehavior);
        }
    };
});
//# sourceMappingURL=t-binding-behavior.js.map