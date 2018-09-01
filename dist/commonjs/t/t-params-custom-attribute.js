"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_metadata_1 = require("aurelia-metadata");
var aurelia_pal_1 = require("aurelia-pal");
var TParamsCustomAttribute = /** @class */ (function () {
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
exports.TParamsCustomAttribute = TParamsCustomAttribute;
//# sourceMappingURL=t-params-custom-attribute.js.map