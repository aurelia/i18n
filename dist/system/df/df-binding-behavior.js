System.register(["aurelia-templating-resources", "aurelia-binding"], function (exports_1, context_1) {
    "use strict";
    var aurelia_templating_resources_1, aurelia_binding_1, DfBindingBehavior;
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
            DfBindingBehavior = /** @class */ (function () {
                function DfBindingBehavior(signalBindingBehavior) {
                    this.signalBindingBehavior = signalBindingBehavior;
                }
                DfBindingBehavior.inject = function () { return [aurelia_templating_resources_1.SignalBindingBehavior]; };
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
                    sourceExpression.expression = new aurelia_binding_1.ValueConverter(expression, "df", sourceExpression.args, [expression].concat(sourceExpression.args));
                };
                DfBindingBehavior.prototype.unbind = function (binding, source) {
                    // unbind the signal behavior
                    this.signalBindingBehavior.unbind(binding, source);
                };
                return DfBindingBehavior;
            }());
            exports_1("DfBindingBehavior", DfBindingBehavior);
        }
    };
});
//# sourceMappingURL=df-binding-behavior.js.map