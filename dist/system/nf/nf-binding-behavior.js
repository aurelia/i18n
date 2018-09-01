System.register(["aurelia-templating-resources", "aurelia-binding"], function (exports_1, context_1) {
    "use strict";
    var aurelia_templating_resources_1, aurelia_binding_1, NfBindingBehavior;
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
            NfBindingBehavior = /** @class */ (function () {
                function NfBindingBehavior(signalBindingBehavior) {
                    this.signalBindingBehavior = signalBindingBehavior;
                }
                NfBindingBehavior.inject = function () { return [aurelia_templating_resources_1.SignalBindingBehavior]; };
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
                    sourceExpression.expression = new aurelia_binding_1.ValueConverter(expression, "nf", sourceExpression.args, [expression].concat(sourceExpression.args));
                };
                NfBindingBehavior.prototype.unbind = function (binding, source) {
                    // unbind the signal behavior
                    this.signalBindingBehavior.unbind(binding, source);
                };
                return NfBindingBehavior;
            }());
            exports_1("NfBindingBehavior", NfBindingBehavior);
        }
    };
});
//# sourceMappingURL=nf-binding-behavior.js.map