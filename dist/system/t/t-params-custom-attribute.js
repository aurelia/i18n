System.register(["aurelia-templating", "aurelia-metadata", "aurelia-pal"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_metadata_1, aurelia_pal_1, TParamsCustomAttribute;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            }
        ],
        execute: function () {
            TParamsCustomAttribute = /** @class */ (function () {
                function TParamsCustomAttribute(element) {
                    this.element = element;
                }
                TParamsCustomAttribute_1 = TParamsCustomAttribute;
                TParamsCustomAttribute.inject = function () {
                    return [aurelia_pal_1.DOM.Element];
                };
                TParamsCustomAttribute.configureAliases = function (aliases) {
                    var r = aurelia_metadata_1.metadata.getOrCreateOwn(aurelia_metadata_1.metadata.resource, aurelia_templating_1.HtmlBehaviorResource, TParamsCustomAttribute_1);
                    r.aliases = aliases;
                };
                TParamsCustomAttribute.prototype.valueChanged = function () { };
                var TParamsCustomAttribute_1;
                TParamsCustomAttribute = TParamsCustomAttribute_1 = __decorate([
                    aurelia_templating_1.customAttribute("t-params")
                ], TParamsCustomAttribute);
                return TParamsCustomAttribute;
            }());
            exports_1("TParamsCustomAttribute", TParamsCustomAttribute);
        }
    };
});
//# sourceMappingURL=t-params-custom-attribute.js.map